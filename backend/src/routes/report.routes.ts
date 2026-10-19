import { Router } from 'express';
import reportController from '../controllers/report.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/csv', authenticate, reportController.getCsv);
router.get('/summary', authenticate, reportController.getSummary);

export default router;
