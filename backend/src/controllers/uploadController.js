import cloudinary from '../config/cloudinary.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorHandler from '../utils/errorHandler.js';
import { Readable } from 'stream';

// Upload single image
export const uploadImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorHandler('Please upload an image', 400));
  }

  // Convert buffer to stream
  const stream = Readable.from(req.file.buffer);

  // Upload to cloudinary
  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: 'ecommerce/products',
      width: 800,
      crop: 'scale',
      quality: 'auto:good'
    },
    (error, result) => {
      if (error) {
        return next(new ErrorHandler('Image upload failed', 500));
      }

      res.status(200).json({
        success: true,
        message: 'Image uploaded successfully',
        image: {
          public_id: result.public_id,
          url: result.secure_url
        }
      });
    }
  );

  stream.pipe(uploadStream);
});

// Upload multiple images
export const uploadMultipleImages = asyncHandler(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(new ErrorHandler('Please upload at least one image', 400));
  }

  const uploadPromises = req.files.map((file) => {
    return new Promise((resolve, reject) => {
      const stream = Readable.from(file.buffer);
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'ecommerce/products',
          width: 800,
          crop: 'scale',
          quality: 'auto:good'
        },
        (error, result) => {
          if (error) reject(error);
          else
            resolve({
              public_id: result.public_id,
              url: result.secure_url
            });
        }
      );
      stream.pipe(uploadStream);
    });
  });

  try {
    const images = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      images
    });
  } catch (error) {
    return next(new ErrorHandler('Image upload failed', 500));
  }
});

// Delete image from cloudinary
export const deleteImage = asyncHandler(async (req, res, next) => {
  const { public_id } = req.body;

  if (!public_id) {
    return next(new ErrorHandler('Please provide image public_id', 400));
  }

  try {
    await cloudinary.uploader.destroy(public_id);

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    return next(new ErrorHandler('Image deletion failed', 500));
  }
});

// Upload avatar
export const uploadAvatar = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorHandler('Please upload an image', 400));
  }

  const stream = Readable.from(req.file.buffer);

  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: 'ecommerce/avatars',
      width: 150,
      height: 150,
      crop: 'fill',
      gravity: 'face',
      quality: 'auto:good'
    },
    async (error, result) => {
      if (error) {
        return next(new ErrorHandler('Avatar upload failed', 500));
      }

      // Delete old avatar if exists
      if (req.user.avatar && req.user.avatar.public_id) {
        await cloudinary.uploader.destroy(req.user.avatar.public_id);
      }

      // Update user avatar
      req.user.avatar = {
        public_id: result.public_id,
        url: result.secure_url
      };

      await req.user.save();

      res.status(200).json({
        success: true,
        message: 'Avatar updated successfully',
        user: req.user
      });
    }
  );

  stream.pipe(uploadStream);
});