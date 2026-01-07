import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { FiShoppingCart, FiUser, FiSearch, FiMenu } from 'react-icons/fi';
import { MdLogout, MdDashboard } from 'react-icons/md';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const [keyword, setKeyword] = useState('');

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${keyword}`);
    } else {
      navigate('/products');
    }
  };

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container-custom">
          <div className="flex justify-between items-center text-sm">
            <p>Welcome to our E-Commerce Store!</p>
            <div className="flex gap-4">
              <Link to="/products" className="hover:text-primary-200">
                Shop Now
              </Link>
              <Link to="/orders" className="hover:text-primary-200">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            E-Shop
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full px-4 py-2 pr-12 text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700"
              >
                <FiSearch size={20} />
              </button>
            </div>
          </form>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    {user?.avatar?.url ? (
                      <img src={user.avatar.url} alt={user.name} />
                    ) : (
                      <FiUser size={20} className="text-primary-600" />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-lg w-52 border border-gray-200"
                >
                  <li className="menu-title">
                    <span className="text-gray-900">{user?.name}</span>
                  </li>
                  <li>
                    <Link to="/profile" className="hover:bg-primary-50">
                      <FiUser size={16} />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="hover:bg-primary-50">
                      <FiShoppingCart size={16} />
                      My Orders
                    </Link>
                  </li>
                  {user?.role === 'admin' && (
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="hover:bg-primary-50"
                      >
                        <MdDashboard size={16} />
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="hover:bg-red-50 text-red-600"
                    >
                      <MdLogout size={16} />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary text-white px-6 py-2 rounded-lg"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 border-t border-gray-200">
        <div className="container-custom">
          <ul className="flex items-center gap-8 py-3 text-sm font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-primary-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-primary-600 transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Electronics"
                className="hover:text-primary-600 transition-colors"
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Laptops"
                className="hover:text-primary-600 transition-colors"
              >
                Laptops
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Headphones"
                className="hover:text-primary-600 transition-colors"
              >
                Headphones
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Accessories"
                className="hover:text-primary-600 transition-colors"
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;