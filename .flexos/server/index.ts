import express from 'express';
import path from 'path';
import { apiRouter } from './api';
import { startOrchestrator } from './orchestrator';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from public
app.use(express.static(path.join(process.cwd(), 'public')));

// API routes
app.use('/api', apiRouter);

// Fallback for SPA-like routing if needed, though we use .html files directly
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(\`[Server] Listening on http://localhost:\${PORT}\`);
  
  // Start the background orchestrator loop
  startOrchestrator();
});
