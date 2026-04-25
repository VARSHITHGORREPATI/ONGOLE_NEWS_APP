import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';

// Lazy configuration
let configured = false;

function ensureConfigured() {
  if (!configured) {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('Cloudinary credentials not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in environment variables.');
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret
    });

    configured = true;
  }
}

export interface CloudinaryUploadResult {
  url: string;
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}

/**
 * Upload image to Cloudinary from URL
 */
export async function uploadImageFromUrl(
  imageUrl: string,
  folder: string = 'ongole-connect/posts'
): Promise<CloudinaryUploadResult> {
  try {
    ensureConfigured();

    // Download image first
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const buffer = Buffer.from(response.data);
    const base64Image = `data:${response.headers['content-type']};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: folder,
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 675, crop: 'fill', gravity: 'auto' }, // 16:9 ratio
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ],
      overwrite: false,
      unique_filename: true
    });

    return {
      url: result.url,
      secureUrl: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format
    };
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Upload image from buffer/base64
 */
export async function uploadImageFromBuffer(
  buffer: Buffer,
  folder: string = 'ongole-connect/posts'
): Promise<CloudinaryUploadResult> {
  try {
    ensureConfigured();

    const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: folder,
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 675, crop: 'fill', gravity: 'auto' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ],
      overwrite: false,
      unique_filename: true
    });

    return {
      url: result.url,
      secureUrl: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format
    };
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Delete image from Cloudinary
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    ensureConfigured();

    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary Delete Error:', error);
    return false;
  }
}

/**
 * Get optimized image URL
 */
export function getOptimizedImageUrl(
  publicId: string,
  width?: number,
  height?: number
): string {
  ensureConfigured();

  const transformations = [];
  
  if (width && height) {
    transformations.push(`w_${width},h_${height},c_fill,g_auto`);
  } else if (width) {
    transformations.push(`w_${width},c_scale`);
  }
  
  transformations.push('q_auto:good', 'f_auto');
  
  return cloudinary.url(publicId, {
    transformation: transformations
  });
}

/**
 * Generate responsive image URLs
 */
export function getResponsiveImageUrls(publicId: string): {
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  original: string;
} {
  ensureConfigured();

  return {
    thumbnail: getOptimizedImageUrl(publicId, 150, 150),
    small: getOptimizedImageUrl(publicId, 400, 225),
    medium: getOptimizedImageUrl(publicId, 800, 450),
    large: getOptimizedImageUrl(publicId, 1200, 675),
    original: cloudinary.url(publicId)
  };
}

/**
 * Validate image URL
 */
export async function validateImageUrl(url: string): Promise<boolean> {
  try {
    const response = await axios.head(url, {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    
    const contentType = response.headers['content-type'];
    return contentType?.startsWith('image/') || false;
  } catch (error) {
    return false;
  }
}

/**
 * Extract image from HTML content
 */
export function extractImageFromHtml(html: string): string | null {
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = html.match(imgRegex);
  return match ? match[1] : null;
}

/**
 * Get placeholder image URL
 */
export function getPlaceholderImage(): string {
  return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=675&fit=crop';
}
