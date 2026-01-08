import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../redux/slices/productSlice';
import { getAllOrders } from '../../redux/slices/orderSlice';
import API from '../../services/api';
import Loader from '../../components/ui/Loader';
import {
  FiShoppingBag,
  FiPackage,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiArrowRight,
} from 'react-icons/fi';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, loading: productsLoading } = useSelector(
    (state) => state.product
  );
  const { orders, loading: ordersLoading } = useSelector(
    (state) => state.order
  );

  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch initial data
  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  // Fetch users count
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRes = await API.get('/admin/users');
        setTotalUsers(usersRes.data.users.length);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Calculate stats using useMemo instead of useState
  const stats = useMemo(() => {
    const totalRevenue = orders?.reduce(
      (acc, order) => acc + order.totalPrice,
      0
    ) || 0;

    return {
      totalRevenue,
      totalOrders: orders?.length || 0,
      totalProducts: products?.length || 0,
      totalUsers,
      recentOrders: orders?.slice(0, 5) || [],
    };
  }, [orders, products, totalUsers]);

  // Order Status Chart Data
  const orderStatusData = useMemo(() => ({
    labels: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    datasets: [
      {
        data: [
          orders?.filter((o) => o.orderStatus === 'Processing').length || 0,
          orders?.filter((o) => o.orderStatus === 'Shipped').length || 0,
          orders?.filter((o) => o.orderStatus === 'Delivered').length || 0,
          orders?.filter((o) => o.orderStatus === 'Cancelled').length || 0,
        ],
        backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'],
        borderWidth: 0,
      },
    ],
  }), [orders]);

  // Monthly Revenue Chart Data
  const monthlyRevenueData = useMemo(() => {
    const monthlyData = {};
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Initialize all months with 0
    months.forEach((month) => {
      monthlyData[month] = 0;
    });

    // Calculate revenue for each month
    orders?.forEach((order) => {
      const month = months[new Date(order.createdAt).getMonth()];
      monthlyData[month] += order.totalPrice;
    });

    return {
      labels: months,
      datasets: [
        {
          label: 'Revenue (₹)',
          data: months.map((month) => monthlyData[month]),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }, [orders]);

  if (productsLoading || ordersLoading) return <Loader />;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiDollarSign className="text-green-600" size={24} />
              </div>
              <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                <FiTrendingUp size={16} />
                +12.5%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Total Revenue
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              ₹{stats.totalRevenue.toFixed(2)}
            </p>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiShoppingBag className="text-blue-600" size={24} />
              </div>
              <span className="text-blue-600 text-sm font-semibold flex items-center gap-1">
                <FiTrendingUp size={16} />
                +8.2%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Total Orders
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalOrders}
            </p>
          </div>

          {/* Total Products */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiPackage className="text-purple-600" size={24} />
              </div>
              <span className="text-purple-600 text-sm font-semibold flex items-center gap-1">
                <FiTrendingUp size={16} />
                +5.1%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Total Products
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalProducts}
            </p>
          </div>

          {/* Total Users */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FiUsers className="text-yellow-600" size={24} />
              </div>
              <span className="text-yellow-600 text-sm font-semibold flex items-center gap-1">
                <FiTrendingUp size={16} />
                +15.3%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Total Users
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalUsers}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Monthly Revenue
            </h2>
            <Line
              data={monthlyRevenueData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>

          {/* Order Status Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Order Status
            </h2>
            <Doughnut
              data={orderStatusData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/products"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Manage Products
                </h3>
                <p className="text-sm text-gray-600">
                  View and edit all products
                </p>
              </div>
              <FiArrowRight className="text-primary-600" size={24} />
            </div>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Manage Orders
                </h3>
                <p className="text-sm text-gray-600">Process and track orders</p>
              </div>
              <FiArrowRight className="text-primary-600" size={24} />
            </div>
          </Link>

          <Link
            to="/admin/users"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Manage Users
                </h3>
                <p className="text-sm text-gray-600">View and manage users</p>
              </div>
              <FiArrowRight className="text-primary-600" size={24} />
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              View All
            </Link>
          </div>

          {stats.recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">#{order._id.slice(-8)}</td>
                      <td className="py-3 px-4 text-sm">{order.user?.name}</td>
                      <td className="py-3 px-4 text-sm font-semibold">
                        ₹{order.totalPrice.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.orderStatus === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : order.orderStatus === 'Shipped'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
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
            <p className="text-center text-gray-600 py-8">No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;