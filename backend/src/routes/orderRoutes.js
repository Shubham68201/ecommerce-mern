import express from 'express';
import {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  createRazorpayOrder,
  verifyRazorpayPayment,
  getRazorpayApiKey,
  getOrderStats,
  getRecentOrders
} from '../controllers/orderController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

// User routes
router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);
router.get('/orders/me', isAuthenticatedUser, myOrders);

// Payment routes
router.post('/payment/razorpay/order', isAuthenticatedUser, createRazorpayOrder);
router.post('/payment/razorpay/verify', isAuthenticatedUser, verifyRazorpayPayment);
router.get('/payment/razorpay/key', getRazorpayApiKey);

// Admin routes
router.get(
  '/admin/orders',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  getAllOrders
);
router.get(
  '/admin/orders/stats',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  getOrderStats
);
router.get(
  '/admin/orders/recent',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  getRecentOrders
);
router
  .route('/admin/order/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

export default router;