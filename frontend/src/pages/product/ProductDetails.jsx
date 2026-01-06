import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductDetails,
  createReview,
  clearProduct,
} from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import ReviewCard from '../../components/product/ReviewCard';
import ReviewModal from '../../components/product/ReviewModal';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiStar, FiTruck, FiShield } from 'react-icons/fi';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    dispatch(getProductDetails(id));

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error('Product out of stock');
      return;
    }

    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.images[0].url,
        stock: product.stock,
        quantity,
      })
    );
    toast.success('Added to cart');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      await dispatch(createReview(reviewData)).unwrap();
      toast.success('Review submitted successfully');
      setShowReviewModal(false);
      dispatch(getProductDetails(id));
    } catch (error) {
      toast.error(error);
    }
  };

  if (loading || !product) return <Loader />;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-6">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>{product.name}</li>
          </ul>
        </div>

        {/* Product Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Images */}
            <div>
              {/* Main Image */}
              <div className="mb-4">
                <img
                  src={product.images[selectedImage]?.url}
                  alt={product.name}
                  className="w-full h-96 object-contain bg-gray-50 rounded-lg"
                />
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index
                          ? 'border-primary-600'
                          : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-contain bg-gray-50"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              {/* Brand */}
              <p className="text-primary-600 font-medium mb-2">{product.brand}</p>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`${
                        i < Math.round(product.ratings)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                      size={20}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.ratings.toFixed(1)} ({product.numOfReviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{product.discountPrice || product.price}
                </span>
                {product.discountPrice && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">
                      ₹{product.price}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-bold">
                      {Math.round(
                        ((product.price - product.discountPrice) / product.price) *
                          100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <p className="text-sm">
                  Status:{' '}
                  <span
                    className={`font-semibold ${
                      product.stock > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {product.stock > 0
                      ? `In Stock (${product.stock} available)`
                      : 'Out of Stock'}
                  </span>
                </p>
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={decreaseQuantity}
                      className="btn btn-outline btn-sm"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      className="btn btn-outline btn-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  variant="outline"
                  className="flex-1"
                >
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  variant="primary"
                  className="flex-1"
                >
                  Buy Now
                </Button>
              </div>

              {/* Features */}
              <div className="border-t pt-6 space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <FiTruck className="text-primary-600" size={24} />
                  <span>Free delivery on orders over ₹999</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiShield className="text-primary-600" size={24} />
                  <span>1 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Customer Reviews
            </h2>
            {isAuthenticated && (
              <Button onClick={() => setShowReviewModal(true)}>
                Write a Review
              </Button>
            )}
          </div>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal
          productId={product._id}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
};

export default ProductDetails;