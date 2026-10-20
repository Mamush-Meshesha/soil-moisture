import { Router } from 'express';
import storeController from '../controllers/store.controller';

const router = Router();

router.get('/products', storeController.getProducts);
router.get('/products/:slug', storeController.getProductBySlug);
router.post('/products', storeController.createProduct);
router.put('/products/:id', storeController.updateProduct);
router.delete('/products/:id', storeController.deleteProduct);

router.post('/checkout', storeController.checkout);
router.get('/orders/:id', storeController.getOrderById);

export default router;

