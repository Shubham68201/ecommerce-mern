import { Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage } from 'react-icons/fi';
import Button from '../../components/ui/Button';

const OrderSuccess = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <FiCheckCircle className="text-green-600" size={48} />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and will
            be shipped soon.
          </p>

          {/* Animation */}
          <div className="mb-8">
            <div className="animate-bounce">
              <FiPackage className="text-primary-600 mx-auto" size={64} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link to="/orders" className="block">
              <Button variant="primary" className="w-full">
                View My Orders
              </Button>
            </Link>
            <Link to="/products" className="block">
              <Button variant="secondary" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t text-left">
            <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>You'll receive an order confirmation email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Track your order status in "My Orders"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Get shipping updates via email</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;