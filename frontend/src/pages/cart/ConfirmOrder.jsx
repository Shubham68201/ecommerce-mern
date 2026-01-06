import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutSteps from '../../components/cart/CheckoutSteps';
import Button from '../../components/ui/Button';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { items, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
    if (!shippingInfo.address) {
      navigate('/shipping');
    }
  }, [items, shippingInfo, navigate]);

  // Calculations
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.18;
  const shipping = subtotal > 999 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handleProceedToPayment = () => {
    const orderData = {
      itemsPrice: subtotal,
      taxPrice: tax,
      shippingPrice: shipping,
      totalPrice: total,
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(orderData));
    navigate('/payment');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom max-w-5xl">
        <CheckoutSteps currentStep={2} />

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Shipping Information
              </h2>
              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-semibold">Name:</span> {user?.name}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{' '}
                  {shippingInfo.phoneNo}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{' '}
                  {shippingInfo.address}, {shippingInfo.city},{' '}
                  {shippingInfo.state}, {shippingInfo.country} -{' '}
                  {shippingInfo.pinCode}
                </p>
              </div>
              <Link
                to="/shipping"
                className="text-primary-600 hover:text-primary-700 text-sm mt-4 inline-block"
              >
                Change Address
              </Link>
            </div>

            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Items ({items.length})
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product}
                    className="flex gap-4 pb-4 border-b last:border-b-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product}`}
                        className="font-semibold text-gray-900 hover:text-primary-600 line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-gray-600 text-sm mt-1">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleProceedToPayment}
                  variant="primary"
                  className="w-full"
                >
                  Proceed to Payment
                </Button>
                <Button
                  onClick={() => navigate('/shipping')}
                  variant="secondary"
                  className="w-full"
                >
                  Back to Shipping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;