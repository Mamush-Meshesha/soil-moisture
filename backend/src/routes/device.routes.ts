import { Router } from 'express';
import deviceController from '../controllers/device.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, deviceController.getAllDevices);
router.get('/:id', authenticate, deviceController.getDeviceById);
router.post('/', authenticate, deviceController.registerDevice);
router.put('/:id', authenticate, deviceController.updateDevice);
router.post('/:id/maintenance', authenticate, deviceController.addMaintenance);
router.delete('/:id', authenticate, deviceController.deleteDevice);

export default router;
