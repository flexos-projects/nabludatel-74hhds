import { defineEventHandler, getRouterParam, readBody, createError } from 'h3';
import { db } from '../../../db';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing anomaly ID' });
  }

  const status = body?.status;
  if (!['verified', 'false_positive'].includes(status)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid status' });
  }

  db.prepare('UPDATE anomalies SET review_status = ? WHERE id = ?').run(status, id);
  
  return { success: true };
});
