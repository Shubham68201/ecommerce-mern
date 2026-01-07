import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrderDetails,
  updateOrder,
} from '../../redux/slices/orderSlice';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const ProcessOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, loading } = useSelector((state) => state.order);

  const [status, setStatus] = useState('');
  const isInitialized = useRef(false);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  // Initialize status only once when order loads
  useEffect(() => {
    if (order && !isInitialized.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus(order.orderStatus);
      isInitialized.current = true;
    }
  }, [order]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!status) {
      toast.error('Please select a status');
      return;
    }

    if (status === order.orderStatus) {
      toast.error('Status is already the same');
      return;
    }

    try {
      await dispatch(updateOrder({ id, status })).unwrap();
      toast.success('Order status updated successfully');
      dispatch(getOrderDetails(id));
    } catch (error) {
      toast.error(error);
    }
  };

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
      <div className="container-custom max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Process Order
          </h1>
          <p className="text-gray-600">Order ID: #{order._id}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Customer Information
              </h2>
              <div className="space-y-3 text-gray-600">
                <p>
                  <span className="font-semibold">Name:</span>{' '}
                  {order.user?.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{' '}
                  {order.user?.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{' '}
                  {order.shippingInfo.phoneNo}
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Shipping Address
              </h2>
              <div className="text-gray-600">
                <p>{order.shippingInfo.address}</p>
                <p>
                  {order.shippingInfo.city}, {order.shippingInfo.state}
                </p>
                <p>
                  {order.shippingInfo.country} - {order.shippingInfo.pinCode}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Items
              </h2>
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 pb-4 border-b last:border-b-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">
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

          {/* Update Status */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Status
              </h2>

              {/* Current Status */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Current Status:</p>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </div>

              {/* Payment Status */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Payment Status:</p>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    order.paymentInfo.status === 'succeeded'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {order.paymentInfo.status === 'succeeded'
                    ? 'Paid'
                    : 'Not Paid'}
                </span>
              </div>

              {/* Order Total */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">
                  ₹{order.totalPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Total Amount</p>
              </div>

              {/* Update Status Form */}
              {order.orderStatus !== 'Delivered' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Update Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                      <option value="">Select Status</option>
                      {order.orderStatus === 'Processing' && (
                        <>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </>
                      )}
                      {order.orderStatus === 'Shipped' && (
                        <>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </>
                      )}
                    </select>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="spinner w-5 h-5"></div>
                        Updating...
                      </span>
                    ) : (
                      'Update Status'
                    )}
                  </Button>
                </form>
              )}

              <Button
                onClick={() => navigate('/admin/orders')}
                variant="secondary"
                className="w-full mt-4"
              >
                Back to Orders
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessOrder;