import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiStar } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error('Product out of stock');
      return;
    }

    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0].url,
        stock: product.stock,
        quantity: 1,
      })
    );
    toast.success('Added to cart');
  };

  return (
    <div className="card group overflow-hidden">
      {/* Image */}
      <Link to={`/product/${product._id}`} className="block relative">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
              Out of Stock
            </span>
          </div>
        )}
        {product.discountPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
            {Math.round(
              ((product.price - product.discountPrice) / product.price) * 100
            )}
            % OFF
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>

        {/* Title */}
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <FiStar className="text-yellow-400 fill-yellow-400" size={16} />
            <span className="text-sm font-medium">{product.ratings.toFixed(1)}</span>
          </div>
          <span className="text-sm text-gray-500">
            ({product.numOfReviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.discountPrice || product.price}
          </span>
          {product.discountPrice && (
            <span className="text-lg text-gray-500 line-through">
              ₹{product.price}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;