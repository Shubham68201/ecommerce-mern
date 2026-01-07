import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, deleteOrder } from '../../redux/slices/orderSlice';
import Loader from '../../components/ui/Loader';
import toast from 'react-hot-toast';
import { FiEye, FiTrash2, FiFilter } from 'react-icons/fi';

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      if (filterStatus === 'all') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFilteredOrders(orders);
      } else {
        const filtered = orders.filter(
          (order) => order.orderStatus === filterStatus
        );
        setFilteredOrders(filtered);
      }
    }
  }, [orders, filterStatus]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await dispatch(deleteOrder(id)).unwrap();
        toast.success('Order deleted successfully');
        dispatch(getAllOrders());
      } catch (error) {
        toast.error(error);
      }
    }
  };

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Orders Management
          </h1>
          <p className="text-gray-600">
            Manage all customer orders ({orders?.length || 0} orders)
          </p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center gap-4">
            <FiFilter className="text-gray-600" />
            <label className="text-sm font-medium text-gray-700">
              Filter by Status:
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="all">All Orders</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <span className="text-sm text-gray-600">
              Showing {filteredOrders.length} order(s)
            </span>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredOrders && filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Order ID
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Customer
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Items
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Amount
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <p className="font-mono text-sm">
                          #{order._id.slice(-8)}
                        </p>
                      </td>

                      <td className="py-4 px-6">
                        <p className="font-semibold text-gray-900">
                          {order.user?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.user?.email}
                        </p>
                      </td>

                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-600">
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                      </td>

                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-900">
                          {order.orderItems.length} item(s)
                        </p>
                      </td>

                      <td className="py-4 px-6">
                        <p className="font-bold text-gray-900">
                          ₹{order.totalPrice.toFixed(2)}
                        </p>
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <Link to={`/admin/order/${order._id}`}>
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <FiEye size={18} />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(order._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;