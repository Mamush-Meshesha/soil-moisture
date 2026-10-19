import { Router } from 'express';
import fieldController from '../controllers/field.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, fieldController.getAllFields);
router.get('/:id', authenticate, fieldController.getFieldById);
router.post('/', authenticate, fieldController.createField);
router.put('/:id', authenticate, fieldController.updateField);
router.delete('/:id', authenticate, fieldController.deleteField);

export default router;
