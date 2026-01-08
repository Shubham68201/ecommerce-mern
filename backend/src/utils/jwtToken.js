/**
 * Creates JWT token and sets it in HTTP-only cookie
 */
const sendToken = (user, statusCode, res, message = 'Success') => {
  const token = user.getJWTToken();

  // Cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/'
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    message,
    user,
    token
  });
};

export default sendToken;