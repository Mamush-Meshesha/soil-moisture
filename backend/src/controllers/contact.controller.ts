import { Request, Response, NextFunction } from 'express';
import contactService from '../services/contact.service';

export class ContactController {
  async submitInquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await contactService.submitInquiry(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const contactController = new ContactController();
export default contactController;
