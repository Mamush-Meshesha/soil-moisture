import { Router } from 'express';
import telemetryController from '../controllers/telemetry.controller';

const router = Router();

router.post('/ingest', telemetryController.ingest);
router.get('/latest', telemetryController.getLatest);
router.get('/history', telemetryController.getHistory);
router.get('/analytics', telemetryController.getAnalytics);

export default router;
