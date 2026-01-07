import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../redux/slices/productSlice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
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

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);

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
  const [imagesPreviews, setImagesPreviews] = useState([]);

  const { name, description, price, discountPrice, category, brand, stock } =
    formData;

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

    if (!name || !description || !price || !category || !brand || !stock) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    const productData = {
      name,
      description,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      category,
      brand,
      stock: Number(stock),
      images: images.map((image, index) => ({
        public_id: `product_${Date.now()}_${index}`,
        url: image,
      })),
    };

    try {
      await dispatch(createProduct(productData)).unwrap();
      toast.success('Product created successfully!');
      navigate('/admin/products');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Product
          </h1>
          <p className="text-gray-600">
            Add a new product to your inventory
          </p>
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
                value={name}
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
                  value={description}
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
                  value={brand}
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
                    value={category}
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
                value={price}
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
                value={discountPrice}
                onChange={handleChange}
                placeholder="0.00 (Optional)"
                min="0"
                step="0.01"
              />

              <Input
                label="Stock"
                type="number"
                name="stock"
                value={stock}
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
                    Click to upload product images
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, WEBP up to 5MB (Max 5 images)
                  </p>
                </label>
              </div>

              {/* Image Previews */}
              {imagesPreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {imagesPreviews.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200"
                    >
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
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
                  Creating...
                </span>
              ) : (
                'Create Product'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;