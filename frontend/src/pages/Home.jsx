import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTopProducts,
//   getFeaturedProducts,
} from '../redux/slices/productSlice';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/ui/Loader';
import { FiArrowRight, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h1 className="text-5xl font-bold mb-6">
                Welcome to E-Shop
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Discover amazing products at unbeatable prices. Shop now and
                enjoy fast, free delivery on orders over ₹999!
              </p>
              <div className="flex gap-4">
                <Link to="/products" className="btn-primary">
                  Shop Now
                  <FiArrowRight className="inline ml-2" />
                </Link>
                <Link to="/products?category=Electronics" className="btn-secondary">
                  Browse Categories
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop"
                alt="Shopping"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Free delivery on orders over ₹999
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                100% secure payment processing
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeadphones className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Dedicated customer support team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Products */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Top Rated Products
              </h2>
              <p className="text-gray-600 mt-2">
                Check out our best-selling products
              </p>
            </div>
            <Link
              to="/products"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
            >
              View All
              <FiArrowRight />
            </Link>
          </div>

          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No products available</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: 'Electronics',
                image:
                  'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop',
              },
              {
                name: 'Laptops',
                image:
                  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
              },
              {
                name: 'Headphones',
                image:
                  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
              },
              {
                name: 'Accessories',
                image:
                  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
              },
            ].map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h3 className="text-white font-bold text-xl p-4">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of happy customers today
          </p>
          <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;