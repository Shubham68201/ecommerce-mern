import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ProductDetails from '../pages/product/ProductDetails';
import Products from '../pages/product/Products';
import Cart from '../pages/cart/Cart';
import Shipping from '../pages/cart/Shipping';
import ConfirmOrder from '../pages/cart/ConfirmOrder';
import Payment from '../pages/cart/Payment';
import Orders from '../pages/order/Orders';
import OrderDetails from '../pages/order/OrderDetails';
import Profile from '../pages/user/Profile';
import UpdateProfile from '../pages/user/UpdateProfile';
import UpdatePassword from '../pages/user/UpdatePassword';
import Dashboard from '../pages/admin/Dashboard';
import ProductList from '../pages/admin/ProductList';
import NewProduct from '../pages/admin/NewProduct';
import UpdateProduct from '../pages/admin/UpdateProduct';
import OrderList from '../pages/admin/OrderList';
import ProcessOrder from '../pages/admin/ProcessOrder';
import UserList from '../pages/admin/UserList';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'product/:id',
        element: <ProductDetails />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      // Protected Routes
      {
        path: 'shipping',
        element: (
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        ),
      },
      {
        path: 'order/confirm',
        element: (
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payment',
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: 'order/:id',
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile/update',
        element: (
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'password/update',
        element: (
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        ),
      },
      // Admin Routes
      {
        path: 'admin/dashboard',
        element: (
          <ProtectedRoute isAdmin={true}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/products',
        element: (
          <ProtectedRoute isAdmin={true}>
            <ProductList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/product/new',
        element: (
          <ProtectedRoute isAdmin={true}>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/product/:id',
        element: (
          <ProtectedRoute isAdmin={true}>
            <UpdateProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/orders',
        element: (
          <ProtectedRoute isAdmin={true}>
            <OrderList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/order/:id',
        element: (
          <ProtectedRoute isAdmin={true}>
            <ProcessOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/users',
        element: (
          <ProtectedRoute isAdmin={true}>
            <UserList />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;