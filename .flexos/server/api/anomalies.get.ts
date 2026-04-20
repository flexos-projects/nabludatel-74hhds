import { defineEventHandler, getQuery } from 'h3';
import { db } from '../db';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const limit = query.limit ? parseInt(query.limit as string, 10) : 50;
  
  const anomalies = db.prepare(`
    SELECT a.*, s.settlement, s.region, s.municipality 
    FROM anomalies a
    JOIN sections s ON a.section_id = s.section_id
    ORDER BY a.created_at DESC
    LIMIT ?
  `).all(limit);

  return { anomalies };
});
