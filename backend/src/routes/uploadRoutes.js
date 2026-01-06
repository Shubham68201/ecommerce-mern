import express from 'express';
import {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  uploadAvatar
} from '../controllers/uploadController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Single image upload
router.post(
  '/upload/image',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  upload.single('image'),
  uploadImage
);

// Multiple images upload
router.post(
  '/upload/images',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  upload.array('images', 5),
  uploadMultipleImages
);

// Delete image
router.delete(
  '/upload/image',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  deleteImage
);

// Upload avatar
router.put(
  '/upload/avatar',
  isAuthenticatedUser,
  upload.single('avatar'),
  uploadAvatar
);

export default router;