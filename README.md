# 🛒 MERN E-Commerce Platform

A full-stack E-Commerce web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring comprehensive user authentication, product management, shopping cart, secure payment integration, admin dashboard with analytics, and complete order processing system.

![GitHub stars](https://img.shields.io/github/stars/Shubham68201/ecommerce-mern?style=social)
![GitHub forks](https://img.shields.io/github/forks/Shubham68201/ecommerce-mern?style=social)
![GitHub issues](https://img.shields.io/github/issues/Shubham68201/ecommerce-mern)
![GitHub license](https://img.shields.io/github/license/Shubham68201/ecommerce-mern)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Docker Setup](#-docker-setup)
- [Testing](#-testing)
- [API Documentation](#-api-documentation)
- [Admin Access](#-admin-access)
- [Deployment](#-deployment)
- [Database Schema](#-database-schema)
- [Configuration](#️-configuration)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 👤 Customer Features

#### Authentication & Profile
- ✅ User registration with email verification
- ✅ Secure login/logout (JWT authentication)
- ✅ Profile management with avatar upload
- ✅ Password update & forgot password flow
- ✅ Persistent sessions with auto-login

#### Shopping Experience
- ✅ **Browse products with advanced filtering**
  - Search by name/description
  - Filter by category (12+ categories)
  - Price range slider (₹0 - ₹25,000)
  - Sort by price, rating, popularity

- ✅ **Detailed product pages**
  - High-quality image gallery with zoom
  - Product specifications & description
  - Customer reviews & ratings
  - Stock availability indicator

- ✅ **Shopping cart management**
  - Add/remove/update quantities
  - Real-time price calculations
  - Cart persistence across sessions
  - Stock validation

#### Checkout & Orders
- ✅ **Multi-step checkout process**
  - Shipping address form with validation
  - Order review & confirmation
  - Secure payment integration (Razorpay)

- ✅ **Payment methods supported**
  - Credit/Debit Cards
  - UPI (PhonePe, Google Pay, Paytm)
  - Net Banking
  - Digital Wallets

- ✅ **Order management**
  - Order history with status tracking
  - Detailed order information
  - Invoice generation
  - Email confirmations

#### Reviews & Ratings
- ✅ Write product reviews
- ✅ Star ratings (1-5 stars)
- ✅ View all customer reviews
- ✅ Verified purchase badges

---

### 🛠️ Admin Features

#### Dashboard & Analytics
- ✅ Interactive admin dashboard
- ✅ **Revenue analytics with Chart.js**
  - Monthly revenue line chart
  - Order status distribution (doughnut chart)

- ✅ **Key metrics display**
  - Total revenue
  - Total orders
  - Total products
  - Total users

- ✅ Recent orders overview

#### Product Management
- ✅ **Complete CRUD operations**
  - Create new products
  - Update product details
  - Delete products
  - Bulk operations

- ✅ **Image upload to Cloudinary**
  - Multiple images per product (up to 5)
  - Image preview before upload
  - Drag & drop support

- ✅ **Product organization**
  - Categories & brands
  - Stock management
  - Discount pricing
  - SEO-friendly URLs

#### Order Management
- ✅ View all customer orders
- ✅ **Filter orders by status**
  - Processing
  - Shipped
  - Delivered
  - Cancelled

- ✅ Update order status
- ✅ Order details & customer info
- ✅ Delete orders

#### User Management
- ✅ View all registered users
- ✅ User search & filtering
- ✅ **Update user details**
  - Name & email
  - Role (User/Admin)
  - Avatar upload

- ✅ **User activity tracking**
  - Order history
  - Total spent
  - Products purchased

- ✅ Delete users (non-admin only)

---

### 🎨 Additional Features

#### Customer Service Pages
- ✅ About Us
- ✅ Contact Us with form
- ✅ FAQ with search
- ✅ Shipping Policy
- ✅ Returns & Refunds Policy

#### Legal Pages
- ✅ Privacy Policy
- ✅ Terms of Service
- ✅ Cookie Policy

#### UI/UX Enhancements
- ✅ Fully responsive design (mobile-first)
- ✅ Dark/light mode toggle
- ✅ Loading skeletons
- ✅ Toast notifications
- ✅ Smooth animations
- ✅ Breadcrumb navigation
- ✅ Back-to-top button

---

## 🧰 Tech Stack

### Frontend

| Technology | Purpose |
|-----------|---------|
| React 18 + Vite | UI framework & build tool |
| Redux Toolkit | State management |
| React Router v6 | Client-side routing |
| Axios | HTTP client |
| Tailwind CSS | Utility-first CSS |
| DaisyUI | Component library |
| React Icons | Icon library |
| React Hot Toast | Notifications |
| Chart.js | Data visualization |

### Backend

| Technology | Purpose |
|-----------|---------|
| Node.js 18+ | Runtime environment |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication |
| Bcrypt | Password hashing |
| Cloudinary | Image storage |
| Nodemailer | Email service |
| Razorpay | Payment gateway |

### DevOps & Tools

| Tool | Purpose |
|------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Nginx | Reverse proxy |
| GitHub Actions | CI/CD pipeline |
| Jest | Backend testing |
| ESLint | Code linting |
| Prettier | Code formatting |

---

## 📂 Project Structure

```
ecommerce-mern/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # MongoDB connection
│   │   │   └── cloudinary.js        # Cloudinary config
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js    # Auth logic
│   │   │   ├── productController.js # Product CRUD
│   │   │   ├── orderController.js   # Order management
│   │   │   └── paymentController.js # Payment processing
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.js              # JWT verification
│   │   │   ├── error.js             # Error handler
│   │   │   └── asyncHandler.js      # Async wrapper
│   │   │
│   │   ├── models/
│   │   │   ├── User.js              # User schema
│   │   │   ├── Product.js           # Product schema
│   │   │   └── Order.js             # Order schema
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Auth endpoints
│   │   │   ├── productRoutes.js     # Product endpoints
│   │   │   ├── orderRoutes.js       # Order endpoints
│   │   │   ├── paymentRoutes.js     # Payment endpoints
│   │   │   └── adminRoutes.js       # Admin endpoints
│   │   │
│   │   ├── templates/
│   │   │   └── emailTemplates.js    # HTML email templates
│   │   │
│   │   ├── utils/
│   │   │   ├── jwtToken.js          # Token generation
│   │   │   ├── sendEmail.js         # Email utility
│   │   │   ├── asyncHandler.js      # Async error handler
│   │   │   └── errorHandler.js      # Custom error class
│   │   │
│   │   └── tests/
│   │       ├── auth.test.js         # Auth tests
│   │       ├── product.test.js      # Product tests
│   │       └── order.test.js        # Order tests
│   │
│   ├── app.js                       # Express app setup
│   ├── server.js                    # Server entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx       # Navigation bar
│   │   │   │   ├── Footer.jsx       # Footer
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   │
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx       # Reusable button
│   │   │   │   ├── Input.jsx        # Form input
│   │   │   │   ├── Loader.jsx       # Loading spinner
│   │   │   │   └── Pagination.jsx   # Page navigation
│   │   │   │
│   │   │   ├── product/
│   │   │   │   ├── ProductCard.jsx  # Product grid item
│   │   │   │   ├── ReviewCard.jsx   # Review display
│   │   │   │   └── ReviewModal.jsx  # Review form
│   │   │   │
│   │   │   └── cart/
│   │   │       └── CheckoutSteps.jsx # Progress indicator
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   │
│   │   │   ├── product/
│   │   │   │   ├── Products.jsx     # Product listing
│   │   │   │   └── ProductDetails.jsx
│   │   │   │
│   │   │   ├── cart/
│   │   │   │   ├── Cart.jsx
│   │   │   │   ├── Shipping.jsx
│   │   │   │   ├── ConfirmOrder.jsx
│   │   │   │   └── Payment.jsx
│   │   │   │
│   │   │   ├── order/
│   │   │   │   ├── Orders.jsx       # Order history
│   │   │   │   ├── OrderDetails.jsx
│   │   │   │   └── OrderSuccess.jsx
│   │   │   │
│   │   │   ├── user/
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── UpdateProfile.jsx
│   │   │   │   └── UpdatePassword.jsx
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx    # Admin dashboard
│   │   │   │   ├── ProductList.jsx
│   │   │   │   ├── NewProduct.jsx
│   │   │   │   ├── UpdateProduct.jsx
│   │   │   │   ├── OrderList.jsx
│   │   │   │   ├── ProcessOrder.jsx
│   │   │   │   ├── UserList.jsx
│   │   │   │   ├── UpdateUser.jsx
│   │   │   │   └── UserActivity.jsx
│   │   │   │
│   │   │   ├── static/
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Contact.jsx
│   │   │   │   ├── FAQ.jsx
│   │   │   │   ├── ShippingPolicy.jsx
│   │   │   │   ├── ReturnsPolicy.jsx
│   │   │   │   ├── PrivacyPolicy.jsx
│   │   │   │   ├── TermsOfService.jsx
│   │   │   │   └── CookiePolicy.jsx
│   │   │   │
│   │   │   ├── Home.jsx             # Landing page
│   │   │   └── NotFound.jsx         # 404 page
│   │   │
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js     # Auth state
│   │   │   │   ├── productSlice.js  # Product state
│   │   │   │   ├── cartSlice.js     # Cart state
│   │   │   │   └── orderSlice.js    # Order state
│   │   │   │
│   │   │   └── store.js             # Redux store
│   │   │
│   │   ├── services/
│   │   │   └── api.js               # Axios instance
│   │   │
│   │   ├── routes/
│   │   │   └── index.jsx            # Route configuration
│   │   │
│   │   ├── App.jsx                  # Root component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
├── .github/
│   └── workflows/
│       └── ci.yml                   # CI/CD pipeline
│
├── docker-compose.yml               # Docker orchestration
├── nginx.conf                       # Nginx configuration
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (v6 or higher)
- **npm** or **yarn**
- **Git**

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Shubham68201/ecommerce-mern.git
cd ecommerce-mern
```

#### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration
```

**Backend .env Configuration:**

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/ecommerce
# Or MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay (for payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

#### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration
```

**Frontend .env Configuration:**

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

#### 4. Run the Application

**Start Backend (Terminal 1):**

```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Start Frontend (Terminal 2):**

```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

#### 5. Seed Database (Optional)

```bash
cd backend
npm run seed
```

---

## 🐳 Docker Setup

### Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

**Services Available:**

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **MongoDB:** http://localhost:27017

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

**Test Coverage:**
- Authentication: 95%
- Products: 90%
- Orders: 88%
- Overall: 92%

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/logout` | Logout user | Yes |
| GET | `/auth/me` | Get user profile | Yes |
| PUT | `/auth/me/update` | Update profile | Yes |
| PUT | `/auth/password/update` | Update password | Yes |
| POST | `/auth/password/forgot` | Forgot password | No |
| PUT | `/auth/password/reset/:token` | Reset password | No |

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products | No |
| GET | `/products/:id` | Get product details | No |
| POST | `/products/:id/review` | Create review | Yes |
| GET | `/products/top` | Get top products | No |
| POST | `/admin/products` | Create product | Admin |
| PUT | `/admin/products/:id` | Update product | Admin |
| DELETE | `/admin/products/:id` | Delete product | Admin |

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/orders` | Create new order | Yes |
| GET | `/orders/my` | Get user orders | Yes |
| GET | `/orders/:id` | Get order details | Yes |
| GET | `/admin/orders` | Get all orders | Admin |
| PUT | `/admin/orders/:id` | Update order status | Admin |
| DELETE | `/admin/orders/:id` | Delete order | Admin |

### Payment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/payment/razorpay/order` | Create Razorpay order | Yes |
| POST | `/payment/razorpay/verify` | Verify payment | Yes |
| GET | `/payment/razorpay/key` | Get Razorpay key | No |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/users` | Get all users | Admin |
| GET | `/admin/user/:id` | Get user details | Admin |
| PUT | `/admin/user/:id` | Update user | Admin |
| DELETE | `/admin/user/:id` | Delete user | Admin |

---

## 🔑 Admin Access

### Create Admin User

**Option 1: Via MongoDB**

```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

**Option 2: Via Seed Script**

```bash
cd backend
npm run seed
# Creates admin user: admin@example.com / Admin@123
```

---

## 🌐 Deployment

This guide covers deploying your MERN E-Commerce application with **Backend on Render** and **Frontend on Vercel**.

### 📋 Deployment Overview

- **Backend API:** Render (Free tier available)
- **Frontend:** Vercel (Free tier available)
- **Database:** MongoDB Atlas (Free tier available)

---

### 🗄️ Step 1: Setup MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select your preferred region
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Setup Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority`

---

### 🔧 Step 2: Deploy Backend to Render

1. **Prepare Backend for Deployment**
   
   Update `backend/package.json` to include:
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     },
     "engines": {
       "node": ">=18.0.0"
     }
   }
   ```

2. **Create Render Account**
   - Go to [Render](https://render.com)
   - Sign up with GitHub

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

4. **Configure Web Service**
   - **Name:** `ecommerce-backend` (or your choice)
   - **Region:** Select closest to your users
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

5. **Add Environment Variables**
   
   Click "Advanced" → "Add Environment Variable" and add:

   ```env
   NODE_ENV=production
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_EMAIL=your_email@gmail.com
   SMTP_PASSWORD=your_gmail_app_password
   FRONTEND_URL=https://your-app.vercel.app
   ```

   > ⚠️ **Important:** Replace all placeholder values with your actual credentials

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL (e.g., `https://ecommerce-backend.onrender.com`)

7. **Enable CORS** (if needed)
   
   In `backend/app.js`, ensure CORS is configured:
   ```javascript
   const cors = require('cors');
   
   app.use(cors({
     origin: process.env.FRONTEND_URL,
     credentials: true
   }));
   ```

---

### ⚡ Step 3: Deploy Frontend to Vercel

1. **Update Frontend Environment**
   
   Create/Update `frontend/.env.production`:
   ```env
   VITE_API_URL=https://your-backend.onrender.com/api/v1
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

2. **Install Vercel CLI** (Optional - for CLI deployment)
   ```bash
   npm install -g vercel
   ```

3. **Deploy via Vercel Dashboard** (Recommended)
   
   - Go to [Vercel](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure project:
     - **Framework Preset:** Vite
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

4. **Add Environment Variables**
   
   In Vercel dashboard → Settings → Environment Variables:
   ```
   VITE_API_URL = https://your-backend.onrender.com/api/v1
   VITE_RAZORPAY_KEY_ID = your_razorpay_key_id
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build (2-5 minutes)
   - Get your live URL (e.g., `https://your-app.vercel.app`)

6. **Alternative: Deploy via CLI**
   ```bash
   cd frontend
   vercel login
   vercel --prod
   ```

---

### 🔄 Step 4: Update CORS and URLs

1. **Update Backend FRONTEND_URL**
   - Go to Render dashboard
   - Navigate to your backend service
   - Environment → Edit `FRONTEND_URL`
   - Set to your Vercel URL: `https://your-app.vercel.app`
   - Save changes (auto-redeploys)

2. **Update Frontend API URL**
   - Go to Vercel dashboard
   - Settings → Environment Variables
   - Update `VITE_API_URL` with your Render backend URL
   - Redeploy from Deployments tab

3. **Test CORS**
   - Visit your Vercel frontend URL
   - Try logging in or making API calls
   - Check browser console for CORS errors

---

### ✅ Step 5: Post-Deployment Checklist

- [ ] Backend is live and accessible
- [ ] Frontend is live and loading correctly
- [ ] Database connection is working
- [ ] User registration/login works
- [ ] Image uploads work (Cloudinary)
- [ ] Email notifications work
- [ ] Payment gateway works (test mode)
- [ ] All API endpoints respond correctly
- [ ] No CORS errors in browser console
- [ ] Mobile responsive design works

---

### 🔍 Step 6: Testing Your Deployment

```bash
# Test Backend Health
curl https://your-backend.onrender.com/api/v1/health

# Test Frontend
curl https://your-app.vercel.app

# Test API Connection from Frontend
# Open browser console on your Vercel site and run:
fetch('https://your-backend.onrender.com/api/v1/products')
  .then(res => res.json())
  .then(data => console.log(data))
```

---

### 🚨 Common Deployment Issues

#### 1. **Render Backend Not Starting**
```
Error: Cannot find module 'express'
```
**Solution:** Ensure `package.json` is in the root directory of backend folder

#### 2. **CORS Error on Frontend**
```
Access to fetch blocked by CORS policy
```
**Solution:** 
- Check `FRONTEND_URL` in Render environment variables
- Verify CORS configuration in backend
- Ensure credentials: true if using cookies

#### 3. **Environment Variables Not Working**
**Solution:**
- Verify all variables are set in Render/Vercel dashboards
- Check for typos in variable names
- Redeploy after adding new variables

#### 4. **Database Connection Failed**
```
MongoServerError: bad auth
```
**Solution:**
- Verify MongoDB Atlas credentials
- Check if IP whitelist includes 0.0.0.0/0
- Ensure connection string has correct password (no special characters need URL encoding)

#### 5. **Vercel Build Failed**
```
Error: Command "npm run build" exited with 1
```
**Solution:**
- Check build logs for specific errors
- Verify all dependencies are in `package.json`
- Test build locally: `npm run build`

#### 6. **Images Not Loading (Cloudinary)**
**Solution:**
- Verify Cloudinary credentials in Render
- Check Cloudinary dashboard for upload quota
- Test upload manually

---

### 🔄 Continuous Deployment

Both Render and Vercel support automatic deployments:

**Render:**
- Auto-deploys on push to `main` branch
- Can configure auto-deploy branch in settings

**Vercel:**
- Auto-deploys on push to any branch
- Production deployment on `main` branch
- Preview deployments for other branches

---

### 💰 Pricing Considerations

**Render Free Tier:**
- ✅ 750 hours/month free
- ✅ Automatic sleep after 15 min inactivity
- ⚠️ Cold starts (10-30 seconds to wake up)
- 💡 Upgrade to paid plan ($7/month) for always-on

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Always online (no cold starts)

**MongoDB Atlas Free Tier:**
- ✅ 512MB storage
- ✅ Shared RAM
- ✅ Good for development/small projects

---

### 📊 Monitoring Your Deployment

**Render:**
- View logs: Dashboard → Your Service → Logs
- Monitor metrics: CPU, Memory usage
- Set up alerts for downtime

**Vercel:**
- Analytics: Dashboard → Analytics
- View deployment logs
- Monitor Web Vitals

**MongoDB Atlas:**
- Monitor connections and queries
- Set up alerts for storage limits
- View performance metrics

---

### 🔐 Security Best Practices

1. **Never commit `.env` files**
2. **Use strong JWT secrets** (minimum 32 characters)
3. **Enable MongoDB IP whitelist** (only when needed)
4. **Use HTTPS only** (Render and Vercel provide this)
5. **Rotate secrets regularly**
6. **Monitor for suspicious activity**
7. **Keep dependencies updated**

---

### 📞 Need Help?

If you encounter issues during deployment:

1. Check the [Render Documentation](https://render.com/docs)
2. Check the [Vercel Documentation](https://vercel.com/docs)
3. Open an issue on the [GitHub repository](https://github.com/Shubham68201/ecommerce-mern/issues)
4. Contact: [ramp68201@gmail.com](mailto:ramp68201@gmail.com)

---

## 📊 Database Schema

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: {
    public_id: String,
    url: String
  },
  role: String (user/admin),
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: Date
}
```

### Product Model

```javascript
{
  name: String,
  description: String,
  price: Number,
  discountPrice: Number,
  images: [{
    public_id: String,
    url: String
  }],
  category: String,
  brand: String,
  stock: Number,
  ratings: Number,
  numOfReviews: Number,
  reviews: [{
    user: ObjectId,
    name: String,
    rating: Number,
    comment: String,
    createdAt: Date
  }],
  createdAt: Date
}
```

### Order Model

```javascript
{
  user: ObjectId,
  orderItems: [{
    product: ObjectId,
    name: String,
    quantity: Number,
    image: String,
    price: Number
  }],
  shippingInfo: {
    address: String,
    city: String,
    state: String,
    country: String,
    pinCode: String,
    phoneNo: String
  },
  paymentInfo: {
    id: String,
    status: String
  },
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  orderStatus: String,
  deliveredAt: Date,
  createdAt: Date
}
```

---

## 🛠️ Configuration

### Cloudinary Setup

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get Cloud Name, API Key, API Secret
3. Add to `.env`

### Razorpay Setup

1. Create account at [razorpay.com](https://razorpay.com)
2. Get Key ID and Key Secret
3. Add to both backend and frontend `.env`

### Email Setup (Gmail)

1. Enable 2-factor authentication
2. Generate App Password
3. Add to `.env`:

```env
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_16_digit_app_password
```

---

## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:** Ensure MongoDB is running

```bash
# Start MongoDB
sudo systemctl start mongodb
# Or
brew services start mongodb-community
```

**2. Port Already in Use**

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:** Kill process or change port

```bash
# Find process
lsof -ti:5000
# Kill process
kill -9 <PID>
```

**3. Cloudinary Upload Failed**

**Solution:**
- Check credentials in `.env`
- Verify Cloudinary dashboard

**4. Payment Not Working**

**Solution:**
- Verify Razorpay keys
- Check test/live mode
- Use test card: `4111 1111 1111 1111`

---

## 📝 Scripts

### Backend Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server
npm test           # Run tests
npm run test:coverage  # Test with coverage
npm run seed       # Seed database
npm run lint       # Run ESLint
```

### Frontend Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**. See [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Razorpay](https://razorpay.com/)
- [Cloudinary](https://cloudinary.com/)

---

## 👨‍💻 Author

**Shubham Bharti**  
Full-Stack MERN Developer

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shubham68201)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shubham-bharti-079870252/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ramp68201@gmail.com)

---

## 📞 Support

If you have any questions or need help, feel free to:

- 📧 Email: [ramp68201@gmail.com](mailto:ramp68201@gmail.com)
- 💼 LinkedIn: [Shubham Bharti](https://www.linkedin.com/in/shubham-bharti-079870252/)
- 🐛 Open an issue on [GitHub](https://github.com/Shubham68201/ecommerce-mern/issues)

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐️!

---

<div align="center">
  <p>Made with ❤️ by Shubham Bharti</p>
  <p>© 2026 MERN E-Commerce Platform. All Rights Reserved.</p>
</div>