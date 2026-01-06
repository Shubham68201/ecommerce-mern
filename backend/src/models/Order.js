import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: [true, 'Please provide shipping address']
      },
      city: {
        type: String,
        required: [true, 'Please provide city']
      },
      state: {
        type: String,
        required: [true, 'Please provide state']
      },
      country: {
        type: String,
        required: [true, 'Please provide country'],
        default: 'India'
      },
      pinCode: {
        type: String,
        required: [true, 'Please provide pin code']
      },
      phoneNo: {
        type: String,
        required: [true, 'Please provide phone number']
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        image: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        }
      }
    ],
    paymentInfo: {
      id: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      razorpay_order_id: String,
      razorpay_payment_id: String,
      razorpay_signature: String
    },
    paidAt: {
      type: Date
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing'
    },
    deliveredAt: Date
  },
  {
    timestamps: true
  }
);

// Indexes for better query performance
orderSchema.index({ user: 1, createdAt: -1 }); // User's orders sorted by date
orderSchema.index({ orderStatus: 1 }); // Filter by status
orderSchema.index({ 'paymentInfo.status': 1 }); // Filter by payment status

export default mongoose.model('Order', orderSchema);