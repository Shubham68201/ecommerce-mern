import express from 'express';
import {
  createProduct,
  getAllProducts,
  getAdminProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getTopProducts,
  getFeaturedProducts
} from '../controllers/productController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/products', getAllProducts);
router.get('/product/:id', getSingleProduct);
router.get('/products/top', getTopProducts);
router.get('/products/featured', getFeaturedProducts);
router.get('/reviews', getProductReviews);

// User routes (authenticated)
router.put('/review', isAuthenticatedUser, createProductReview);
router.delete('/reviews', isAuthenticatedUser, deleteReview);

// Admin routes
router.post(
  '/admin/product/new',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  createProduct
);
router.get(
  '/admin/products',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  getAdminProducts
);
router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

export default router;