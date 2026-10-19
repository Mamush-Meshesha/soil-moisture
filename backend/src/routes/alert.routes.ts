import { Router } from 'express';
import alertController from '../controllers/alert.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, alertController.getAllAlerts);
router.put('/:id/acknowledge', authenticate, alertController.acknowledgeAlert);
router.put('/:id/resolve', authenticate, alertController.resolveAlert);
router.get('/rules', authenticate, alertController.getAlertRules);
router.post('/rules', authenticate, alertController.createAlertRule);
router.delete('/rules/:id', authenticate, alertController.deleteAlertRule);

export default router;
