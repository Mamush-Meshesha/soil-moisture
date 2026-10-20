import { Router } from 'express';
import uploadController from '../controllers/upload.controller';

const router = Router();

router.post('/', uploadController.uploadImage);

export default router;
