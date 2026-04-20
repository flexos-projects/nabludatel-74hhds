import { defineEventHandler } from 'h3';
import { db } from '../../db';

export default defineEventHandler(() => {
  const sections = db.prepare(`
    SELECT s.*, q.status, 
           (SELECT COUNT(*) FROM anomalies a WHERE a.section_id = s.section_id) as alert_count
    FROM sections s
    JOIN processing_queue q ON s.section_id = q.section_id
  `).all();

  return { sections };
});
