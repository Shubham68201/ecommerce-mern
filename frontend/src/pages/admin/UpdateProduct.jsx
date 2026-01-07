import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductDetails,
  updateProduct,
  clearProduct,
} from '../../redux/slices/productSlice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import toast from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';

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

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    brand: '',
    stock: '',
  });

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreviews, setImagesPreviews] = useState([]);

  useEffect(() => {
  dispatch(getProductDetails(id));

  return () => {
    dispatch(clearProduct());
  };
}, [dispatch, id]);

  

  useEffect(() => {
  if (!product) return;
// eslint-disable-next-line react-hooks/set-state-in-effect
  setFormData({
    name: product.name || '',
    description: product.description || '',
    price: product.price || '',
    discountPrice: product.discountPrice || '',
    category: product.category || '',
    brand: product.brand || '',
    stock: product.stock || '',
  });

  setOldImages(product.images || []);
}, [product]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }

    setImages([]);
    setImagesPreviews([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreviews((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      discountPrice: formData.discountPrice
        ? Number(formData.discountPrice)
        : undefined,
      category: formData.category,
      brand: formData.brand,
      stock: Number(formData.stock),
    };

    if (images.length > 0) {
      productData.images = images.map((image, index) => ({
        public_id: `product_${Date.now()}_${index}`,
        url: image,
      }));
    }

    try {
      await dispatch(updateProduct({ id, productData })).unwrap();
      toast.success('Product updated successfully!');
      navigate('/admin/products');
    } catch (error) {
      toast.error(error);
    }
  };

  if (loading || !product) return <Loader />;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Update Product
          </h1>
          <p className="text-gray-600">Modify product details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Basic Information
            </h2>

            <div className="space-y-6">
              <Input
                label="Product Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  rows="4"
                  className="input-field resize-none"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Brand"
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Enter brand name"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Pricing & Stock
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Input
                label="Price (₹)"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />

              <Input
                label="Discount Price (₹)"
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                placeholder="0.00 (Optional)"
                min="0"
                step="0.01"
              />

              <Input
                label="Stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Product Images
            </h2>

            <div className="space-y-4">
              {/* Current Images */}
              {oldImages.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-3">Current Images:</p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    {oldImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200"
                      >
                        <img
                          src={image.url}
                          alt={`Current ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload New Images */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="images"
                  max="5"
                />
                <label
                  htmlFor="images"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <FiUpload size={48} className="text-gray-400" />
                  <p className="text-gray-600">
                    Click to upload new images
                  </p>
                  <p className="text-sm text-gray-500">
                    This will replace existing images
                  </p>
                </label>
              </div>

              {/* New Image Previews */}
              {imagesPreviews.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-3">New Images:</p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {imagesPreviews.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden border-2 border-primary-500"
                      >
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={() => navigate('/admin/products')}
              variant="secondary"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="spinner w-5 h-5"></div>
                  Updating...
                </span>
              ) : (
                'Update Product'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;