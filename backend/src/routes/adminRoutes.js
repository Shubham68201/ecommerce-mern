import express from 'express';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorHandler from '../utils/errorHandler.js';

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

// Update User Role (Admin)
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

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  })
);

export default router;