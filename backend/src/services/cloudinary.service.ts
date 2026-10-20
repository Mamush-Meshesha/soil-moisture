import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../config/env';

// Configure Cloudinary SDK
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
  secure: true,
});

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
}

export class CloudinaryService {
  /**
   * Upload an image (data URI, base64, or remote URL) to Cloudinary
   */
  async uploadImage(
    fileStr: string,
    folder: string = 'aquascope'
  ): Promise<CloudinaryUploadResult> {
    if (!fileStr) {
      const err: any = new Error('No image payload provided for upload.');
      err.statusCode = 400;
      throw err;
    }

    try {
      const result: UploadApiResponse = await cloudinary.uploader.upload(fileStr, {
        folder,
        resource_type: 'image',
        transformation: [
          { quality: 'auto', fetch_format: 'auto' },
        ],
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
      };
    } catch (error: any) {
      console.error('Cloudinary upload error:', error);
      const err: any = new Error(error.message || 'Failed to upload image to Cloudinary.');
      err.statusCode = 500;
      throw err;
    }
  }

  /**
   * Delete an image from Cloudinary by public ID
   */
  async deleteImage(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === 'ok';
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      return false;
    }
  }
}

export const cloudinaryService = new CloudinaryService();
export default cloudinaryService;
