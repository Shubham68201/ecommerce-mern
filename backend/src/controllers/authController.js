import sendEmail from '../utils/sendEmail.js';
import {
  welcomeEmailTemplate,
  passwordResetTemplate
} from '../templates/emailTemplates.js';

import crypto from 'crypto';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorHandler from '../utils/errorHandler.js';
import sendToken from '../utils/jwtToken.js';
import cloudinary from '../config/cloudinary.js'; // ADD THIS IMPORT

// Register User (Updated with email AND avatar)
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, avatar } = req.body; // Add avatar

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler('Email already registered', 400));
  }

  // Handle avatar upload
  let avatarData = {
    public_id: 'default_avatar',
    url: 'https://via.placeholder.com/150'
  };

  if (avatar && avatar.url) {
    try {
      const result = await cloudinary.uploader.upload(avatar.url, {
        folder: 'avatars',
        width: 150,
        crop: 'scale'
      });

      avatarData = {
        public_id: result.public_id,
        url: result.secure_url
      };
    } catch (error) {
      console.log('Avatar upload failed:', error.message);
      // Continue with default avatar if upload fails
    }
  }

  // Create user with avatar
  const user = await User.create({
    name,
    email,
    password,
    avatar: avatarData // Add avatar
  });

  // Hide password for response
  user.password = undefined;

  // Send welcome email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Welcome to E-Commerce!',
      message: welcomeEmailTemplate(user.name)
    });
  } catch (error) {
    console.log('Email sending failed:', error.message);
    // Don't stop registration if email fails
  }

  sendToken(user, 201, res, 'User registered successfully');
});

// Login User
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is entered
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email and password', 400));
  }

  // Find user in database (include password field)
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  // Check if password is correct
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  // Hide password before sending
  user.password = undefined;
  
  sendToken(user, 200, res, 'Login successful');
});

// Logout User
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Get Current User Profile
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  });
});

// Update Password
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select('+password');

  // Check old password
  const isMatched = await user.comparePassword(oldPassword);

  if (!isMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }

  user.password = newPassword;
  await user.save();

  sendToken(user, 200, res, 'Password updated successfully');
});

// Forgot Password
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found with this email', 404));
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash and set to resetPasswordToken
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set token expire time (30 minutes)
  user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message: passwordResetTemplate(user.name, resetUrl)
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler('Email could not be sent', 500));
  }
});

// Reset Password
export const resetPassword = asyncHandler(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(
      new ErrorHandler('Password reset token is invalid or has expired', 400)
    );
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res, 'Password reset successfully');
});

// Update User Profile (Updated with avatar)
export const updateProfile = asyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email
  };

  // Handle avatar update
  if (req.body.avatar && req.body.avatar.url) {
    const user = await User.findById(req.user.id);

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

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user
  });
});