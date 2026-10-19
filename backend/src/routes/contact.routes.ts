import { Router } from 'express';
import contactController from '../controllers/contact.controller';

const router = Router();

router.post('/', contactController.submitInquiry);

export default router;
