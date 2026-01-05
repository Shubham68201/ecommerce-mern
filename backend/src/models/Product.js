import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
      maxLength: [200, 'Product name cannot exceed 200 characters']
    },
    description: {
      type: String,
      required: [true, 'Please enter product description'],
      maxLength: [4000, 'Description cannot exceed 4000 characters']
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      maxLength: [8, 'Price cannot exceed 8 digits'],
      default: 0.0
    },
    discountPrice: {
      type: Number,
      maxLength: [8, 'Discount price cannot exceed 8 digits']
    },
    images: [
      {
        public_id: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }
    ],
    category: {
      type: String,
      required: [true, 'Please select product category'],
      enum: {
        values: [
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
          'Home'
        ],
        message: 'Please select correct category'
      }
    },
    brand: {
      type: String,
      required: [true, 'Please enter product brand'],
      trim: true
    },
    stock: {
      type: Number,
      required: [true, 'Please enter product stock'],
      maxLength: [5, 'Stock cannot exceed 5 digits'],
      default: 0
    },
    ratings: {
      type: Number,
      default: 0
    },
    numOfReviews: {
      type: Number,
      default: 0
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        name: {
          type: String,
          required: true
        },
        rating: {
          type: Number,
          required: true
        },
        comment: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text' }); // Text search
productSchema.index({ category: 1, price: 1 }); // Compound index
productSchema.index({ ratings: -1 }); // Sort by ratings
productSchema.index({ createdAt: -1 }); // Sort by newest
productSchema.index({ seller: 1 }); // Filter by seller

export default mongoose.model('Product', productSchema);