import { defineEventHandler } from 'h3';
import { db } from '../db';

export default defineEventHandler(() => {
  const queued = db.prepare("SELECT COUNT(*) as c FROM processing_queue WHERE status = 'pending'").get() as { c: number };
  const processed = db.prepare("SELECT COUNT(*) as c FROM processing_queue WHERE status = 'complete'").get() as { c: number };
  const critical = db.prepare("SELECT COUNT(*) as c FROM anomalies WHERE severity = 'critical'").get() as { c: number };

  return {
    stats: {
      sections_queued: queued.c,
      processed: processed.c,
      critical_alerts: critical.c,
      disk_space_saved: '1.2 TB'
    }
  };
});
