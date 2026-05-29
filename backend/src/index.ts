import express from 'express';
import cors from 'cors';
import complaintsRouter from './routes/complaints';
import agentsRouter from './routes/agents';
import dncRouter from './routes/dnc';
import templatesRouter from './routes/templates';
import { startDeadlineChecker } from './jobs/deadlineChecker';


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/complaints', complaintsRouter);
app.use('/api/agents', agentsRouter);
app.use('/api/dnc', dncRouter);
app.use('/api/templates', templatesRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

startDeadlineChecker();

app.listen(PORT, () => {
  console.log(`CompliantIQ API running on port ${PORT}`);
});
