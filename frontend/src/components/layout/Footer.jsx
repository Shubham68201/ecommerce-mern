import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">About E-Shop</h3>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted online shopping destination for electronics,
              fashion, and more. We deliver quality products at competitive
              prices.
            </p>

            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-primary-600 transition-colors"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-primary-600 transition-colors"
              >
                <FaTwitter size={16} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-primary-600 transition-colors"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-primary-600 transition-colors"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-primary-400">All Products</Link></li>
              <li><Link to="/orders" className="hover:text-primary-400">Track Order</Link></li>
              <li><Link to="/profile" className="hover:text-primary-400">My Account</Link></li>
              <li><Link to="/cart" className="hover:text-primary-400">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-primary-400">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-400">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-primary-400">Returns & Refunds</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MdLocationOn size={20} className="text-primary-400 mt-1" />
                <span>123 E-Commerce Street, Mumbai, Maharashtra 400001</span>
              </li>

              <li className="flex items-center gap-3">
                <MdPhone size={20} className="text-primary-400" />
                <a href="tel:+919876543210" className="hover:text-primary-400">
                  +91 98765 43210
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MdEmail size={20} className="text-primary-400" />
                <a
                  href="mailto:support@eshop.com"
                  className="hover:text-primary-400"
                >
                  support@eshop.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; 2024 E-Shop. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-primary-400">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary-400">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-primary-400">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
