import User from '../../src/models/User.js';
import Product from '../../src/models/Product.js';
import Order from '../../src/models/Order.js';

// Create test user
export const createTestUser = async (overrides = {}) => {
  const defaultUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    role: 'user'
  };

  const user = await User.create({ ...defaultUser, ...overrides });
  return user;
};

// Create test admin
export const createTestAdmin = async (overrides = {}) => {
  return await createTestUser({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    ...overrides
  });
};

// Create test product
export const createTestProduct = async (seller, overrides = {}) => {
  const defaultProduct = {
    name: 'Test Product',
    description: 'This is a test product description',
    price: 999,
    category: 'Electronics',
    brand: 'Test Brand',
    stock: 50,
    images: [
      {
        public_id: 'test_image_id',
        url: 'https://via.placeholder.com/500'
      }
    ],
    seller: seller._id
  };

  const product = await Product.create({ ...defaultProduct, ...overrides });
  return product;
};

// Create test order
export const createTestOrder = async (user, product, overrides = {}) => {
  const defaultOrder = {
    shippingInfo: {
      address: '123 Test Street',
      city: 'Test City',
      state: 'Test State',
      country: 'India',
      pinCode: '123456',
      phoneNo: '1234567890'
    },
    user: user._id,
    orderItems: [
      {
        name: product.name,
        quantity: 1,
        image: product.images[0].url,
        price: product.price,
        product: product._id
      }
    ],
    paymentInfo: {
      id: 'test_payment_id',
      status: 'succeeded'
    },
    paidAt: Date.now(),
    itemsPrice: product.price,
    taxPrice: product.price * 0.18,
    shippingPrice: 50,
    totalPrice: product.price * 1.18 + 50,
    orderStatus: 'Processing'
  };

  const order = await Order.create({ ...defaultOrder, ...overrides });
  return order;
};

// Get auth token for user
export const getAuthToken = (user) => {
  return user.getJWTToken();
};

// Login helper
export const loginUser = async (request, email, password) => {
  const response = await request.post('/api/v1/auth/login').send({
    email,
    password
  });

  return {
    token: response.body.token,
    user: response.body.user
  };
};