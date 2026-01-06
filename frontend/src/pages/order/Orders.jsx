import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../redux/slices/orderSlice';
import Loader from '../../components/ui/Loader';
import { FiPackage, FiEye } from 'react-icons/fi';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

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

  if (loading) return <Loader />;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-semibold text-gray-900">
                        #{order._id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="font-bold text-xl text-gray-900">
                        ₹{order.totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FiPackage className="text-gray-600" />
                      <span className="font-semibold text-gray-900">
                        {order.orderItems.length} Item(s)
                      </span>
                    </div>
                    <div className="space-y-3">
                      {order.orderItems.slice(0, 2).map((item) => (
                        <div key={item._id} className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 line-clamp-1">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                      {order.orderItems.length > 2 && (
                        <p className="text-sm text-gray-600">
                          +{order.orderItems.length - 2} more item(s)
                        </p>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="mt-4 pt-4 border-t">
                    <Link
                      to={`/order/${order._id}`}
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <FiEye />
                      View Order Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FiPackage size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start shopping to see your orders here
            </p>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;