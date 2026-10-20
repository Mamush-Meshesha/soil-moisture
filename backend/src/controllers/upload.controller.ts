import { Request, Response, NextFunction } from 'express';
import cloudinaryService from '../services/cloudinary.service';

export class UploadController {
  async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { image, folder = 'aquascope' } = req.body;

      if (!image) {
        return res.status(400).json({
          success: false,
          error: 'Image data is required (data URL, base64, or remote URL).',
        });
      }

      const result = await cloudinaryService.uploadImage(image, folder);

      return res.status(200).json({
        success: true,
        message: 'Image successfully uploaded to Cloudinary.',
        url: result.url,
        publicId: result.publicId,
        format: result.format,
        width: result.width,
        height: result.height,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const uploadController = new UploadController();
export default uploadController;
