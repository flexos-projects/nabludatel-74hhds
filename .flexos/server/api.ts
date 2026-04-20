import { Router } from 'express';
import { db } from './db';

export const apiRouter = Router();

apiRouter.get('/stats', (req, res) => {
  const queued = db.prepare("SELECT COUNT(*) as c FROM processing_queue WHERE status = 'pending'").get() as { c: number };
  const processed = db.prepare("SELECT COUNT(*) as c FROM processing_queue WHERE status = 'complete'").get() as { c: number };
  const critical = db.prepare("SELECT COUNT(*) as c FROM anomalies WHERE severity = 'critical'").get() as { c: number };

  res.json({
    sections_queued: queued.c,
    processed: processed.c,
    critical_alerts: critical.c,
    disk_saved: '1.2 TB'
  });
});

apiRouter.get('/anomalies', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 50;
  const anomalies = db.prepare(\`
    SELECT a.*, s.settlement, s.region, s.municipality 
    FROM anomalies a
    JOIN sections s ON a.section_id = s.section_id
    ORDER BY a.created_at DESC
    LIMIT ?
  \`).all(limit);

  res.json(anomalies);
});

apiRouter.get('/sections', (req, res) => {
  const sections = db.prepare(\`
    SELECT s.*, q.status, 
           (SELECT COUNT(*) FROM anomalies a WHERE a.section_id = s.section_id) as alert_count
    FROM sections s
    JOIN processing_queue q ON s.section_id = q.section_id
  \`).all();

  res.json(sections);
});

apiRouter.get('/sections/:id', (req, res) => {
  const { id } = req.params;
  const section = db.prepare('SELECT * FROM sections WHERE section_id = ?').get(id);
  const anomalies = db.prepare('SELECT * FROM anomalies WHERE section_id = ?').all(id);
  const transcript = db.prepare('SELECT * FROM transcripts WHERE section_id = ?').get(id);

  if (!section) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.json({
    section,
    anomalies,
    transcript
  });
});

apiRouter.post('/anomalies/:id/review', (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'verified' or 'false_positive'

  if (!['verified', 'false_positive'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  db.prepare('UPDATE anomalies SET review_status = ? WHERE id = ?').run(status, id);
  res.json({ success: true });
});
