import { Router } from 'express';
import farmController from '../controllers/farm.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, farmController.getAllFarms);
router.get('/:id', authenticate, farmController.getFarmById);
router.post('/', authenticate, farmController.createFarm);
router.put('/:id', authenticate, farmController.updateFarm);
router.delete('/:id', authenticate, farmController.deleteFarm);

export default router;
