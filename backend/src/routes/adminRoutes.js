import express from 'express';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorHandler from '../utils/errorHandler.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Get All Users (Admin)
router.get(
  '/users',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  asyncHandler(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users
    });
  })
);

// Get Single User (Admin)
router.get(
  '/user/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      user
    });
  })
);

// Update User Role (Admin) - UPDATED WITH AVATAR
router.put(
  '/user/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  asyncHandler(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    };

    // Handle avatar update
    if (req.body.avatar && req.body.avatar.url) {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
        );
      }

      // Delete old avatar from Cloudinary if it exists
      if (user.avatar && user.avatar.public_id && user.avatar.public_id !== 'default_avatar') {
        try {
          await cloudinary.uploader.destroy(user.avatar.public_id);
        } catch (error) {
          console.log('Old avatar deletion failed:', error.message);
        }
      }

      // Upload new avatar
      try {
        const result = await cloudinary.uploader.upload(req.body.avatar.url, {
          folder: 'avatars',
          width: 150,
          crop: 'scale'
        });

        newUserData.avatar = {
          public_id: result.public_id,
          url: result.secure_url
        };
      } catch (error) {
        return next(new ErrorHandler('Avatar upload failed', 500));
      }
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return next(
        new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user
    });
  })
);

// Delete User (Admin)
router.delete(
  '/user/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
      );
    }

    // Delete avatar from Cloudinary if it exists
    if (user.avatar && user.avatar.public_id && user.avatar.public_id !== 'default_avatar') {
      try {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      } catch (error) {
        console.log('Avatar deletion failed:', error.message);
      }
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  })
);

export default router;