import Product from '../models/Product.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorHandler from '../utils/errorHandler.js';
import ApiFeatures from '../utils/apiFeatures.js';

// Create Product (Admin)
export const createProduct = asyncHandler(async (req, res, next) => {
  req.body.seller = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product
  });
});

// Get All Products (with filtering, sorting, pagination)
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const resultsPerPage = 8;

  // Total products (no filters)
  const productsCount = await Product.countDocuments();

  // Apply search & filter ONLY (no pagination)
  const apiFeaturesForCount = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  const filteredProducts = await apiFeaturesForCount.query;
  const filteredProductsCount = filteredProducts.length;

  // Apply pagination
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    productsCount,
    resultsPerPage,
    filteredProductsCount,
    products,
  });
});


// Get All Products (Admin - No filters)
export const getAdminProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find().populate('seller', 'name email');

  res.status(200).json({
    success: true,
    products
  });
});

// Get Single Product
export const getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate(
    'seller',
    'name email'
  );

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product
  });
});

// Update Product (Admin)
export const updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    product
  });
});

// Delete Product (Admin)
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
});

// Create/Update Product Review
export const createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    // Update existing review
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    // Add new review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // Calculate average rating
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Review added successfully'
  });
});

// Get All Reviews of a Product
export const getProductReviews = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate(
    'reviews.user',
    'name avatar'
  );

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews
  });
});

// Delete Review
export const deleteReview = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = reviews.length > 0 ? avg / reviews.length : 0;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    message: 'Review deleted successfully'
  });
});

// Get Top Rated Products
export const getTopProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find().sort({ ratings: -1 }).limit(5);

  res.status(200).json({
    success: true,
    products
  });
});

// Get Featured Products
export const getFeaturedProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({ isFeatured: true }).limit(10);

  res.status(200).json({
    success: true,
    products
  });
});