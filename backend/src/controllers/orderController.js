import Order from '../models/Order.js';
import Product from '../models/Product.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorHandler from '../utils/errorHandler.js';
import razorpayInstance from '../config/razorpay.js';
import crypto from 'crypto';

/* =========================
   CREATE NEW ORDER
========================= */
export const newOrder = asyncHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
    paidAt: paymentInfo?.status === 'succeeded' ? Date.now() : null
  });

  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    order
  });
});

/* =========================
   GET SINGLE ORDER
========================= */
export const getSingleOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  res.status(200).json({
    success: true,
    order
  });
});

/* =========================
   LOGGED-IN USER ORDERS
========================= */
export const myOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1
  });

  res.status(200).json({
    success: true,
    orders
  });
});

/* =========================
   GET ALL ORDERS (ADMIN)
========================= */
export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().populate('user', 'name email');

  const totalAmount = orders.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );

  res.status(200).json({
    success: true,
    totalAmount,
    orders
  });
});

/* =========================
   UPDATE ORDER STATUS (ADMIN)
========================= */
export const updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('Order already delivered', 400));
  }

  if (req.body.status === 'Shipped') {
    for (const item of order.orderItems) {
      await updateStock(item.product, item.quantity);
    }
  }

  order.orderStatus = req.body.status;

  if (req.body.status === 'Delivered') {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Order status updated successfully'
  });
});

/* =========================
   UPDATE PRODUCT STOCK
========================= */
async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);

  if (!product) return;

  product.stock = Math.max(0, product.stock - quantity);
  await product.save({ validateBeforeSave: false });
}

/* =========================
   DELETE ORDER (ADMIN)
========================= */
export const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Order deleted successfully'
  });
});

/* =========================
   RAZORPAY CREATE ORDER
========================= */
export const createRazorpayOrder = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    notes: {
      user_id: req.user._id.toString()
    }
  };

  const order = await razorpayInstance.orders.create(options);

  res.status(200).json({
    success: true,
    order
  });
});

/* =========================
   VERIFY RAZORPAY PAYMENT
========================= */
export const verifyRazorpayPayment = asyncHandler(async (req, res, next) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return next(new ErrorHandler('Payment verification failed', 400));
  }

  // 👉 Best practice: update order paymentInfo here

  res.status(200).json({
    success: true,
    message: 'Payment verified successfully'
  });
});

/* =========================
   GET RAZORPAY API KEY
========================= */
export const getRazorpayApiKey = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_KEY_ID
  });
});

/* =========================
   ORDER STATS (ADMIN)
========================= */
export const getOrderStats = asyncHandler(async (req, res, next) => {
  const totalOrders = await Order.countDocuments();

  const revenueData = await Order.aggregate([
    { $match: { 'paymentInfo.status': 'succeeded' } },
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
  ]);

  const totalRevenue = revenueData[0]?.totalRevenue || 0;

  const ordersByStatus = await Order.aggregate([
    {
      $group: {
        _id: '$orderStatus',
        count: { $sum: 1 }
      }
    }
  ]);

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const monthlyRevenue = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: sixMonthsAgo },
        'paymentInfo.status': 'succeeded'
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        revenue: { $sum: '$totalPrice' },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ]);

  res.status(200).json({
    success: true,
    stats: {
      totalOrders,
      totalRevenue,
      ordersByStatus,
      monthlyRevenue
    }
  });
});

/* =========================
   RECENT ORDERS (ADMIN)
========================= */
export const getRecentOrders = asyncHandler(async (req, res, next) => {
  const limit = Number(req.query.limit) || 10;

  const orders = await Order.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .limit(limit);

  res.status(200).json({
    success: true,
    orders
  });
});
