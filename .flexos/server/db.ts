import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'nabludatel.db');
export const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('busy_timeout = 5000');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS sections (
    section_id TEXT PRIMARY KEY,
    region TEXT NOT NULL,
    municipality TEXT NOT NULL,
    settlement TEXT NOT NULL,
    is_rural BOOLEAN NOT NULL,
    video_url TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_sections_is_rural ON sections(is_rural);
  CREATE INDEX IF NOT EXISTS idx_sections_region ON sections(region);

  CREATE TABLE IF NOT EXISTS processing_queue (
    section_id TEXT PRIMARY KEY,
    status TEXT NOT NULL,
    retry_count INTEGER NOT NULL DEFAULT 0,
    error_log TEXT,
    updated_at TEXT NOT NULL,
    FOREIGN KEY(section_id) REFERENCES sections(section_id)
  );

  CREATE INDEX IF NOT EXISTS idx_queue_status ON processing_queue(status);

  CREATE TABLE IF NOT EXISTS transcripts (
    section_id TEXT PRIMARY KEY,
    content_json TEXT NOT NULL,
    duration_seconds INTEGER NOT NULL,
    word_count INTEGER NOT NULL,
    FOREIGN KEY(section_id) REFERENCES sections(section_id)
  );

  CREATE TABLE IF NOT EXISTS anomalies (
    id TEXT PRIMARY KEY,
    section_id TEXT NOT NULL,
    severity TEXT NOT NULL,
    category TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    trigger_quote TEXT NOT NULL,
    ai_reasoning TEXT NOT NULL,
    review_status TEXT NOT NULL DEFAULT 'unreviewed',
    created_at TEXT NOT NULL,
    FOREIGN KEY(section_id) REFERENCES sections(section_id)
  );

  CREATE INDEX IF NOT EXISTS idx_anomalies_severity ON anomalies(severity);
  CREATE INDEX IF NOT EXISTS idx_anomalies_review_status ON anomalies(review_status);
  CREATE INDEX IF NOT EXISTS idx_anomalies_created_at ON anomalies(created_at);
`);

// Seed data if empty
const count = db.prepare('SELECT COUNT(*) as c FROM sections').get() as { c: number };
if (count.c === 0) {
  const insertSection = db.prepare(\`
    INSERT INTO sections (section_id, region, municipality, settlement, is_rural, video_url)
    VALUES (?, ?, ?, ?, ?, ?)
  \`);
  const insertQueue = db.prepare(\`
    INSERT INTO processing_queue (section_id, status, updated_at)
    VALUES (?, 'pending', datetime('now'))
  \`);

  const seedData = [
    { id: '152400019', region: 'Pleven', municipality: 'Pleven', settlement: 'Gorno Uino', is_rural: 1, url: 'https://evideo.bg/pe202604/15/1524/152400019.mp4' },
    { id: '030600045', region: 'Varna', municipality: 'Varna', settlement: 'Varna', is_rural: 0, url: 'https://evideo.bg/pe202604/03/0306/030600045.mp4' }
  ];

  db.transaction(() => {
    for (const s of seedData) {
      insertSection.run(s.id, s.region, s.municipality, s.settlement, s.is_rural, s.url);
      insertQueue.run(s.id);
    }
  })();
}
