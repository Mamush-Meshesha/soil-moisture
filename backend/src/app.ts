import express from 'express';
import cors from 'cors';
import apiRouter from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: '[Platform Name] Smart Agriculture & Soil Telemetry Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Consolidated API routes
app.use('/api', apiRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
export { app };
