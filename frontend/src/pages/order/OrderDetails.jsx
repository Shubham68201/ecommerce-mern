import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../redux/slices/orderSlice';
import Loader from '../../components/ui/Loader';
import { FiMapPin, FiPackage, FiCreditCard, FiCheck } from 'react-icons/fi';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  if (loading || !order) return <Loader />;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Details
          </h1>
          <p className="text-gray-600">Order ID: #{order._id}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Order Status
                  </h2>
                  <p className="text-gray-600">
                    Placed on{' '}
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </div>

              {/* Progress Tracker */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  {['Processing', 'Shipped', 'Delivered'].map((status, index) => (
                    <div key={status} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            order.orderStatus === status ||
                            (order.orderStatus === 'Delivered' && index < 3) ||
                            (order.orderStatus === 'Shipped' && index < 2)
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          <FiCheck />
                        </div>
                        <span className="text-xs mt-2 text-gray-600">
                          {status}
                        </span>
                      </div>
                      {index < 2 && (
                        <div
                          className={`flex-1 h-1 ${
                            (order.orderStatus === 'Delivered' && index < 2) ||
                            (order.orderStatus === 'Shipped' && index < 1)
                              ? 'bg-green-500'
                              : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <FiMapPin className="text-primary-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">
                  Shipping Address
                </h2>
              </div>
              <div className="text-gray-600">
                <p className="font-semibold text-gray-900">{order.user?.name}</p>
                <p>{order.shippingInfo.address}</p>
                <p>
                  {order.shippingInfo.city}, {order.shippingInfo.state}
                </p>
                <p>
                  {order.shippingInfo.country} - {order.shippingInfo.pinCode}
                </p>
                <p className="mt-2">Phone: {order.shippingInfo.phoneNo}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <FiPackage className="text-primary-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">
                  Order Items ({order.orderItems.length})
                </h2>
              </div>
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="flex gap-4 pb-4 border-b last:border-b-0">
                    <Link to={`/product/${item.product}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product}`}
                        className="font-semibold text-gray-900 hover:text-primary-600 line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-gray-600 mt-1">
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Payment Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FiCreditCard className="text-primary-600" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">
                    Payment Info
                  </h2>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`font-semibold ${
                        order.paymentInfo.status === 'succeeded'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {order.paymentInfo.status === 'succeeded'
                        ? 'Paid'
                        : 'Not Paid'}
                    </span>
                  </div>
                  {order.paidAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paid on:</span>
                      <span>
                        {new Date(order.paidAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{order.itemsPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (18%)</span>
                    <span>₹{order.taxPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>₹{order.shippingPrice.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>₹{order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;