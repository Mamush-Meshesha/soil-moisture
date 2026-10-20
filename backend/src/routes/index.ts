import { Router } from 'express';
import authRoutes from './auth.routes';
import farmRoutes from './farm.routes';
import fieldRoutes from './field.routes';
import deviceRoutes from './device.routes';
import telemetryRoutes from './telemetry.routes';
import alertRoutes from './alert.routes';
import irrigationRoutes from './irrigation.routes';
import storeRoutes from './store.routes';
import projectRoutes from './project.routes';
import reportRoutes from './report.routes';
import contactRoutes from './contact.routes';
import uploadRoutes from './upload.routes';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/farms', farmRoutes);
apiRouter.use('/fields', fieldRoutes);
apiRouter.use('/devices', deviceRoutes);
apiRouter.use('/telemetry', telemetryRoutes);
apiRouter.use('/alerts', alertRoutes);
apiRouter.use('/irrigation', irrigationRoutes);
apiRouter.use('/store', storeRoutes);
apiRouter.use('/projects', projectRoutes);
apiRouter.use('/reports', reportRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.use('/upload', uploadRoutes);

export default apiRouter;
