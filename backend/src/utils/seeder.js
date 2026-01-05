import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import connectDB from '../config/database.js';

dotenv.config();

const products = [
  {
    name: 'MacBook Pro 16 inch',
    description: 'Apple M2 Max chip, 32GB RAM, 1TB SSD',
    price: 2499,
    discountPrice: 2299,
    category: 'Laptops',
    brand: 'Apple',
    stock: 25,
    images: [
      {
        public_id: 'products/macbook',
        url: 'https://via.placeholder.com/500'
      }
    ],
    seller: '60d5ec49f1b2c72b8c8e4f1a' // Replace with actual admin user ID
  },
  {
    name: 'iPhone 15 Pro Max',
    description: 'A17 Pro chip, 256GB, Titanium Blue',
    price: 1199,
    discountPrice: 1099,
    category: 'Electronics',
    brand: 'Apple',
    stock: 50,
    images: [
      {
        public_id: 'products/iphone',
        url: 'https://via.placeholder.com/500'
      }
    ],
    seller: '60d5ec49f1b2c72b8c8e4f1a'
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Premium noise cancelling headphones',
    price: 399,
    discountPrice: 349,
    category: 'Headphones',
    brand: 'Sony',
    stock: 100,
    images: [
      {
        public_id: 'products/headphones',
        url: 'https://via.placeholder.com/500'
      }
    ],
    seller: '60d5ec49f1b2c72b8c8e4f1a'
  }
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log('Products deleted');

    await Product.insertMany(products);
    console.log('Products added');

    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedProducts();