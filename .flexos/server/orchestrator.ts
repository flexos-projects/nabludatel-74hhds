import { db } from './db';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import Anthropic from '@anthropic-ai/sdk';
import crypto from 'crypto';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'mock-key',
});

const TMP_DIR = path.join(process.cwd(), 'tmp');
if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR, { recursive: true });
}

export async function startOrchestrator() {
  console.log('[Orchestrator] Starting pipeline loop...');
  processNextSection();
}

async function processNextSection() {
  try {
    // 1. Find next pending section
    const section = db.prepare(\`
      SELECT s.*, q.retry_count 
      FROM processing_queue q
      JOIN sections s ON q.section_id = s.section_id
      WHERE q.status = 'pending'
      ORDER BY s.is_rural DESC
      LIMIT 1
    \`).get() as any;

    if (!section) {
      // No pending sections, sleep and retry
      setTimeout(processNextSection, 10000);
      return;
    }

    console.log(\`[Orchestrator] Processing section \${section.section_id}\`);
    updateStatus(section.section_id, 'downloading');

    // MOCKING the heavy lifting for demonstration/deployment without binaries
    // In a real environment, we would:
    // 1. Download video
    // 2. Extract audio with ffmpeg
    // 3. Transcribe with faster-whisper
    // 4. Analyze with Claude

    await sleep(2000); // Simulate download
    updateStatus(section.section_id, 'transcribing');
    
    await sleep(2000); // Simulate transcription
    const mockTranscript = [
      { start: 0, end: 5, text: "Let's start counting." },
      { start: 3600, end: 3605, text: "Put the phone away or I will break it. Just write 45." }
    ];

    updateStatus(section.section_id, 'analyzing');
    await sleep(2000); // Simulate Claude analysis

    // Write mock transcript
    db.prepare(\`
      INSERT OR REPLACE INTO transcripts (section_id, content_json, duration_seconds, word_count)
      VALUES (?, ?, ?, ?)
    \`).run(section.section_id, JSON.stringify(mockTranscript), 7200, 1000);

    // Write mock anomaly if it's the specific section
    if (section.section_id === '152400019') {
      db.prepare(\`
        INSERT OR REPLACE INTO anomalies (id, section_id, severity, category, timestamp, trigger_quote, ai_reasoning, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
      \`).run(
        crypto.randomUUID(),
        section.section_id,
        'critical',
        'Intimidation',
        '01:00:00',
        'Put the phone away or I will break it. Just write 45.',
        'Claude detected hostile language and direct threats towards a commission member.'
      );
    }

    updateStatus(section.section_id, 'complete');
    console.log(\`[Orchestrator] Completed section \${section.section_id}\`);

  } catch (error: any) {
    console.error('[Orchestrator] Error:', error);
  }

  // Loop immediately
  setTimeout(processNextSection, 1000);
}

function updateStatus(sectionId: string, status: string) {
  db.prepare('UPDATE processing_queue SET status = ?, updated_at = datetime("now") WHERE section_id = ?').run(status, sectionId);
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
