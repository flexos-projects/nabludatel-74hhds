import { defineEventHandler, getRouterParam, createError } from 'h3';
import { db } from '../../db';

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id');
  
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing section ID' });
  }

  const section = db.prepare('SELECT * FROM sections WHERE section_id = ?').get(id);
  const anomalies = db.prepare('SELECT * FROM anomalies WHERE section_id = ?').all(id);
  const transcript = db.prepare('SELECT * FROM transcripts WHERE section_id = ?').get(id);

  if (!section) {
    throw createError({ statusCode: 404, statusMessage: 'Section not found' });
  }

  return {
    section,
    anomalies,
    transcript
  };
});
