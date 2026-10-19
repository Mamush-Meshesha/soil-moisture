import { Request, Response, NextFunction } from 'express';
import storeService from '../services/store.service';

export class StoreController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.query;
      const products = await storeService.getProducts(category as string | undefined);
      return res.json({ products });
    } catch (error) {
      next(error);
    }
  }

  async getProductBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await storeService.getProductBySlug(req.params.slug);
      return res.json({ product });
    } catch (error) {
      next(error);
    }
  }

  async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await storeService.checkout(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await storeService.getOrderById(req.params.id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const storeController = new StoreController();
export default storeController;
