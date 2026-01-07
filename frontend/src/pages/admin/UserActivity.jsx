import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../services/api';
import Loader from '../../components/ui/Loader';
import {
  FiShoppingBag,
  FiMessageSquare,
  FiDollarSign,
  FiPackage,
  FiArrowLeft,
  FiCalendar,
  FiStar,
} from 'react-icons/fi';

const UserActivity = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchUserActivity();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchUserActivity = async () => {
    try {
      const [userRes, ordersRes] = await Promise.all([
        API.get(`/admin/user/${id}`),
        API.get(`/admin/orders`),
      ]);

      setUser(userRes.data.user);
      
      // Filter orders for this user
      const userOrders = ordersRes.data.orders.filter(
        (order) => order.user?._id === id || order.user === id
      );
      setOrders(userOrders);

      // Extract reviews from orders (products purchased and reviewed)
      const allReviews = [];
      userOrders.forEach((order) => {
        // eslint-disable-next-line no-unused-vars
        order.orderItems.forEach((item) => {
          // This is a placeholder - in real implementation, fetch from products
          // For now, we'll just track purchased products
        });
      });
      setReviews(allReviews);
    } catch (error) {
      console.error('Error fetching user activity:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">User not found</p>
      </div>
    );
  }

  // Calculate statistics
  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalProducts = orders.reduce(
    (sum, order) => sum + order.orderItems.length,
    0
  );
  const averageOrderValue = orders.length > 0 ? totalSpent / orders.length : 0;

  const ordersByStatus = {
    Processing: orders.filter((o) => o.orderStatus === 'Processing').length,
    Shipped: orders.filter((o) => o.orderStatus === 'Shipped').length,
    Delivered: orders.filter((o) => o.orderStatus === 'Delivered').length,
    Cancelled: orders.filter((o) => o.orderStatus === 'Cancelled').length,
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom max-w-6xl">
        {/* Back Button */}
        <Link
          to="/admin/users"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <FiArrowLeft />
          Back to Users
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {user.avatar?.url ? (
                <img
                  src={user.avatar.url}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center border-4 border-primary-200">
                  <span className="text-primary-600 text-3xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user.name}
              </h1>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.role === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {user.role === 'admin' ? '👑 Admin' : 'User'}
                </span>
                <div className="flex items-center gap-2 text-gray-600">
                  <FiCalendar size={16} />
                  <span className="text-sm">
                    Member since{' '}
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex-shrink-0">
              <Link
                to={`/admin/user/${id}`}
                className="btn-primary inline-block"
              >
                Edit User
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiShoppingBag className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiDollarSign className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{totalSpent.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiPackage className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Products Bought</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalProducts}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FiMessageSquare className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{averageOrderValue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Order Status Breakdown
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">
                {ordersByStatus.Processing}
              </p>
              <p className="text-sm text-gray-600 mt-1">Processing</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-3xl font-bold text-yellow-600">
                {ordersByStatus.Shipped}
              </p>
              <p className="text-sm text-gray-600 mt-1">Shipped</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">
                {ordersByStatus.Delivered}
              </p>
              <p className="text-sm text-gray-600 mt-1">Delivered</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-3xl font-bold text-red-600">
                {ordersByStatus.Cancelled}
              </p>
              <p className="text-sm text-gray-600 mt-1">Cancelled</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Order History
          </h2>
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Items
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono">
                        #{order._id.slice(-8)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {order.orderItems.length} item(s)
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                        ₹{order.totalPrice.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.orderStatus === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : order.orderStatus === 'Shipped'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.orderStatus === 'Cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Link
                          to={`/admin/order/${order._id}`}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FiShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">No orders yet</p>
            </div>
          )}
        </div>

        {/* Products Purchased */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Products Purchased
          </h2>
          {orders.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.flatMap((order) =>
                order.orderItems.map((item) => (
                  <div
                    key={`${order._id}-${item._id}`}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900 line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <FiPackage className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">No products purchased yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserActivity;