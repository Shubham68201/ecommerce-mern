import ErrorHandler from '../utils/errorHandler.js';

const notFound = (req, res, next) => {
  const error = new ErrorHandler(
    `Route not found: ${req.originalUrl}`,
    404
  );
  next(error);
};

export default notFound;