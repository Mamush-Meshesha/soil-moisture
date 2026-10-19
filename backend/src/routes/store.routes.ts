import { Router } from 'express';
import storeController from '../controllers/store.controller';

const router = Router();

router.get('/products', storeController.getProducts);
router.get('/products/:slug', storeController.getProductBySlug);
router.post('/checkout', storeController.checkout);
router.get('/orders/:id', storeController.getOrderById);

export default router;
