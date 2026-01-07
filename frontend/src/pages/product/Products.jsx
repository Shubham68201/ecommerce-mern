import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/slices/productSlice';
import ProductCard from '../../components/product/ProductCard';
import Loader from '../../components/ui/Loader';
import Pagination from '../../components/ui/Pagination';
import { FiFilter, FiX } from 'react-icons/fi';

const categories = [
  'Electronics',
  'Cameras',
  'Laptops',
  'Accessories',
  'Headphones',
  'Food',
  'Books',
  'Clothes/Shoes',
  'Beauty/Health',
  'Sports',
  'Outdoor',
  'Home',
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') || '',
    price: [0, 25000],
    page: parseInt(searchParams.get('page')) || 1,
  });
  
  useEffect(() => {
  const updatedFilters = {
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') || '',
    price: [0, 25000],
    page: parseInt(searchParams.get('page')) || 1,
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  setFilters(updatedFilters);
}, [searchParams]);


  const [showFilters, setShowFilters] = useState(false);

//   const { products, loading, productsCount, resultPerPage, filteredProductsCount } =
const { products, loading, resultPerPage, filteredProductsCount } =
    useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value, page: 1 };
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.keyword) params.set('keyword', newFilters.keyword);
    if (newFilters.category) params.set('category', newFilters.category);
    params.set('page', newFilters.page);
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({
      keyword: '',
      category: '',
      price: [0, 25000],
      page: 1,
    });
    setSearchParams({});
  };

  const hasActiveFilters = filters.category || filters.keyword;

  if (loading) return <Loader />;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {filters.keyword
              ? `Search Results for "${filters.keyword}"`
              : filters.category
              ? filters.category
              : 'All Products'}
          </h1>
          <p className="text-gray-600">
            Showing {products?.length || 0} of {filteredProductsCount || 0} products
          </p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="radio"
                      name="category"
                      checked={!filters.category}
                      onChange={() => handleFilterChange('category', '')}
                      className="radio radio-primary radio-sm"
                    />
                    <span className="ml-2 text-sm">All Categories</span>
                  </label>
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === cat}
                        onChange={() => handleFilterChange('category', cat)}
                        className="radio radio-primary radio-sm"
                      />
                      <span className="ml-2 text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="25000"
                  value={filters.price[1]}
                  onChange={(e) =>
                    handleFilterChange('price', [0, parseInt(e.target.value)])
                  }
                  className="range range-primary range-sm"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>₹0</span>
                  <span>₹{filters.price[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg z-40 hover:bg-primary-700"
          >
            <FiFilter size={24} />
          </button>

          {/* Mobile Filters Drawer */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
              <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                {/* Same filter content as desktop */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="category-mobile"
                        checked={!filters.category}
                        onChange={() => {
                          handleFilterChange('category', '');
                          setShowFilters(false);
                        }}
                        className="radio radio-primary radio-sm"
                      />
                      <span className="ml-2 text-sm">All Categories</span>
                    </label>
                    {categories.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                      >
                        <input
                          type="radio"
                          name="category-mobile"
                          checked={filters.category === cat}
                          onChange={() => {
                            handleFilterChange('category', cat);
                            setShowFilters(false);
                          }}
                          className="radio radio-primary radio-sm"
                        />
                        <span className="ml-2 text-sm">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {products && products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {resultPerPage < filteredProductsCount && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={filters.page}
                      totalPages={Math.ceil(filteredProductsCount / resultPerPage)}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-xl text-gray-600 mb-4">No products found</p>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="btn-primary">
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;