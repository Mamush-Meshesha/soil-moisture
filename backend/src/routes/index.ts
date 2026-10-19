import { Router } from 'express';
import authRoutes from './auth.routes';
import farmRoutes from './farm.routes';
import fieldRoutes from './field.routes';
import deviceRoutes from './device.routes';
import telemetryRoutes from './telemetry.routes';
import alertRoutes from './alert.routes';
import irrigationRoutes from './irrigation.routes';
import storeRoutes from './store.routes';
import reportRoutes from './report.routes';
import contactRoutes from './contact.routes';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/farms', farmRoutes);
apiRouter.use('/fields', fieldRoutes);
apiRouter.use('/devices', deviceRoutes);
apiRouter.use('/telemetry', telemetryRoutes);
apiRouter.use('/alerts', alertRoutes);
apiRouter.use('/irrigation', irrigationRoutes);
apiRouter.use('/store', storeRoutes);
apiRouter.use('/reports', reportRoutes);
apiRouter.use('/contact', contactRoutes);

export default apiRouter;
