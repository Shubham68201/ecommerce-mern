import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, resetOrderCreated } from '../../redux/slices/orderSlice';
import { clearCart } from '../../redux/slices/cartSlice';
import CheckoutSteps from '../../components/cart/CheckoutSteps';
import Button from '../../components/ui/Button';
import API from '../../services/api';
import toast from 'react-hot-toast';

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { items, shippingInfo } = useSelector((state) => state.cart);
  const { loading, orderCreated } = useSelector((state) => state.order);

  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
    if (!shippingInfo.address) {
      navigate('/shipping');
      return;
    }
  }, [items, shippingInfo, navigate]);

  useEffect(() => {
    if (orderCreated) {
      dispatch(resetOrderCreated());
      dispatch(clearCart());
      navigate('/orders/success');
    }
  }, [orderCreated, navigate, dispatch]);

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  if (!orderInfo) {
    navigate('/cart');
    return null;
  }

  const { itemsPrice, taxPrice, shippingPrice, totalPrice } = orderInfo;

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);

      // Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error('Razorpay SDK failed to load. Please check your internet connection.');
        setPaymentLoading(false);
        return;
      }

      // Get Razorpay key
      const { data: keyData } = await API.get('/payment/razorpay/key');
      const razorpayKey = keyData.key;

      // Create Razorpay order
      const { data: orderData } = await API.post('/payment/razorpay/order', {
        amount: totalPrice,
      });

      const options = {
        key: razorpayKey,
        amount: orderData.order.amount,
        currency: 'INR',
        name: 'E-Shop',
        description: 'Order Payment',
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            // Verify payment
            await API.post('/payment/razorpay/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            // Create order in database
            const order = {
              shippingInfo,
              orderItems: items.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                image: item.image,
                price: item.price,
                product: item.product,
              })),
              paymentInfo: {
                id: response.razorpay_payment_id,
                status: 'succeeded',
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              itemsPrice,
              taxPrice,
              shippingPrice,
              totalPrice,
            };

            await dispatch(createOrder(order)).unwrap();
            toast.success('Payment successful! Order placed.');
          } catch (error) {
            toast.error('Payment verification failed');
            console.error(error);
          } finally {
            setPaymentLoading(false);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNo,
        },
        theme: {
          color: '#3b82f6',
        },
        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
            toast.error('Payment cancelled');
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setPaymentLoading(false);
      toast.error(error.message || 'Payment failed. Please try again.');
      console.error('Payment error:', error);
    }
  };

  // Test/Demo payment (without Razorpay)
  const handleTestPayment = async () => {
    try {
      setPaymentLoading(true);

      const order = {
        shippingInfo,
        orderItems: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item.product,
        })),
        paymentInfo: {
          id: 'test_payment_' + Date.now(),
          status: 'succeeded',
        },
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      };

      await dispatch(createOrder(order)).unwrap();
      toast.success('Test payment successful! Order placed.');
    } catch (error) {
      toast.error(error);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom max-w-2xl">
        <CheckoutSteps currentStep={3} />

        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Items</span>
                <span>₹{itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span>₹{taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shippingPrice.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-gray-900 text-lg">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Select Payment Method
            </h3>
            <div className="space-y-3">
              <div className="border-2 border-primary-600 rounded-lg p-4 bg-primary-50">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="razorpay"
                    name="payment"
                    defaultChecked
                    className="radio radio-primary"
                  />
                  <label
                    htmlFor="razorpay"
                    className="flex-1 cursor-pointer font-medium"
                  >
                    Razorpay (UPI, Cards, Netbanking, Wallets)
                  </label>
                </div>
                <p className="text-sm text-gray-600 mt-2 ml-8">
                  Secure payment powered by Razorpay
                </p>
              </div>
            </div>
          </div>

          {/* Payment Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handlePayment}
              disabled={paymentLoading || loading}
              variant="primary"
              className="w-full"
            >
              {paymentLoading || loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="spinner w-5 h-5"></div>
                  Processing...
                </span>
              ) : (
                `Pay ₹${totalPrice.toFixed(2)}`
              )}
            </Button>

            {/* Test Payment Button (for development) */}
            {import.meta.env.MODE === 'development' && (
              <Button
                onClick={handleTestPayment}
                disabled={paymentLoading || loading}
                variant="secondary"
                className="w-full"
              >
                Test Payment (Development Only)
              </Button>
            )}

            <Button
              onClick={() => navigate('/order/confirm')}
              variant="outline"
              className="w-full"
            >
              Back to Confirm Order
            </Button>
          </div>

          {/* Security Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              🔒 Your payment information is secure and encrypted. We do not
              store your card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;