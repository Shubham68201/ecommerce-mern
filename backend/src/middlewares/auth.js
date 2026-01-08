import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorHandler from '../utils/errorHandler.js';

// Check if user is authenticated
export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Try to get token from cookie (primary method)
  token = req.cookies.token;

  // 2. If no cookie, try Authorization header (backup method)
  if (!token && req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 3. No token found
  if (!token) {
    return next(new ErrorHandler('Please login to access this resource', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return next(new ErrorHandler('User not found', 404));
    }
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new ErrorHandler('Invalid token', 401));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new ErrorHandler('Token expired, please login again', 401));
    }
    return next(new ErrorHandler('Authentication failed', 401));
  }
});

// Authorize roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler('User not authenticated', 401));
    }
    
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};