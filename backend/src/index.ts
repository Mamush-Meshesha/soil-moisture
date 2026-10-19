import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { initDatabase } from './db';
import authRoutes from './routes/auth';
import farmsRoutes from './routes/farms';
import fieldsRoutes from './routes/fields';
import devicesRoutes from './routes/devices';
import telemetryRoutes from './routes/telemetry';
import alertsRoutes from './routes/alerts';
import irrigationRoutes from './routes/irrigation';
import storeRoutes from './routes/store';
import reportsRoutes from './routes/reports';
import contactRoutes from './routes/contact';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
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

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/farms', farmsRoutes);
app.use('/api/fields', fieldsRoutes);
app.use('/api/devices', devicesRoutes);
app.use('/api/telemetry', telemetryRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/irrigation', irrigationRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/contact', contactRoutes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Start server
async function startServer() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`[Platform Name] Backend Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

// Only start when not imported for testing
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
