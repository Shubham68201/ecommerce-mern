import dotenv from 'dotenv';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import connectDB from '../config/database.js';

dotenv.config();

const seedOrders = async () => {
  try {
    await connectDB();

    // Get a user and product
    const user = await User.findOne();
    const product = await Product.findOne();

    if (!user || !product) {
      console.log('Please create user and product first');
      process.exit(1);
    }

    const orders = [
      {
        shippingInfo: {
          address: '123 Main St',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          pinCode: '400001',
          phoneNo: '9876543210'
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
          id: 'pay_' + Date.now(),
          status: 'succeeded'
        },
        paidAt: Date.now(),
        itemsPrice: product.price,
        taxPrice: product.price * 0.18,
        shippingPrice: 50,
        totalPrice: product.price * 1.18 + 50,
        orderStatus: 'Processing'
      }
    ];

    await Order.deleteMany();
    console.log('Orders deleted');

    await Order.insertMany(orders);
    console.log('Orders added');

    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedOrders();