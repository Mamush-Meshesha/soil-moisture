import { Router } from 'express';
import irrigationController from '../controllers/irrigation.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/events', authenticate, irrigationController.getEvents);
router.post('/events', authenticate, irrigationController.logEvent);
router.get('/guidance', authenticate, irrigationController.getGuidance);

export default router;
