import request from 'supertest';
import app from '../src/app.js';
import Product from '../src/models/Product.js';
import {
  createTestUser,
  createTestAdmin,
  createTestProduct,
  getAuthToken
} from './helpers/testUtils.js';

describe('Product API Tests', () => {
  let adminToken, userToken, admin, user;

  beforeEach(async () => {
    admin = await createTestAdmin();
    user = await createTestUser();
    adminToken = getAuthToken(admin);
    userToken = getAuthToken(user);
  });

  describe('POST /api/v1/admin/product/new', () => {
    it('should create product as admin', async () => {
      const productData = {
        name: 'New Product',
        description: 'Test description',
        price: 999,
        category: 'Electronics',
        brand: 'Test Brand',
        stock: 50,
        images: [
          {
            public_id: 'test_id',
            url: 'https://test.com/image.jpg'
          }
        ]
      };

      const response = await request(app)
        .post('/api/v1/admin/product/new')
        .set('Cookie', [`token=${adminToken}`])
        .send(productData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.product.name).toBe(productData.name);
      expect(response.body.product.seller.toString()).toBe(admin._id.toString());
    });

    it('should not create product without admin role', async () => {
      const productData = {
        name: 'New Product',
        description: 'Test description',
        price: 999,
        category: 'Electronics',
        brand: 'Test Brand',
        stock: 50
      };

      const response = await request(app)
        .post('/api/v1/admin/product/new')
        .set('Cookie', [`token=${userToken}`])
        .send(productData)
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('not allowed');
    });

    it('should not create product without authentication', async () => {
      const response = await request(app)
        .post('/api/v1/admin/product/new')
        .send({ name: 'Product' })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should not create product with missing required fields', async () => {
      const response = await request(app)
        .post('/api/v1/admin/product/new')
        .set('Cookie', [`token=${adminToken}`])
        .send({
          name: 'Product'
          // Missing other required fields
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/products', () => {
    it('should get all products', async () => {
      await createTestProduct(admin, { name: 'Product 1' });
      await createTestProduct(admin, { name: 'Product 2' });
      await createTestProduct(admin, { name: 'Product 3' });

      const response = await request(app).get('/api/v1/products').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.products).toHaveLength(3);
      expect(response.body.productsCount).toBe(3);
    });

    it('should search products by keyword', async () => {
      await createTestProduct(admin, { name: 'MacBook Pro' });
      await createTestProduct(admin, { name: 'iPhone 15' });
      await createTestProduct(admin, { name: 'MacBook Air' });

      const response = await request(app)
        .get('/api/v1/products')
        .query({ keyword: 'MacBook' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.products).toHaveLength(2);
    });

    it('should filter products by category', async () => {
      await createTestProduct(admin, { category: 'Laptops' });
      await createTestProduct(admin, { category: 'Laptops' });
      await createTestProduct(admin, { category: 'Electronics' });

      const response = await request(app)
        .get('/api/v1/products')
        .query({ category: 'Laptops' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.products).toHaveLength(2);
    });

    it('should filter products by price range', async () => {
      await createTestProduct(admin, { price: 500 });
      await createTestProduct(admin, { price: 1500 });
      await createTestProduct(admin, { price: 2500 });

      const response = await request(app)
        .get('/api/v1/products')
        .query({ 'price[gte]': 1000, 'price[lte]': 2000 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.products).toHaveLength(1);
      expect(response.body.products[0].price).toBe(1500);
    });

    it('should paginate products', async () => {
      // Create 10 products
      for (let i = 1; i <= 10; i++) {
        await createTestProduct(admin, { name: `Product ${i}` });
      }

      const response = await request(app)
        .get('/api/v1/products')
        .query({ page: 2 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.products).toHaveLength(2);
    });
  });

  describe('GET /api/v1/product/:id', () => {
    it('should get single product', async () => {
      const product = await createTestProduct(admin);

      const response = await request(app)
        .get(`/api/v1/product/${product._id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.product._id).toBe(product._id.toString());
      expect(response.body.product.name).toBe(product.name);
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = '507f1f77bcf86cd799439011';

      const response = await request(app)
        .get(`/api/v1/product/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('not found');
    });

    it('should return 400 for invalid product ID', async () => {
      const response = await request(app)
        .get('/api/v1/product/invalid-id')
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/admin/product/:id', () => {
    it('should update product as admin', async () => {
      const product = await createTestProduct(admin);

      const response = await request(app)
        .put(`/api/v1/admin/product/${product._id}`)
        .set('Cookie', [`token=${adminToken}`])
        .send({
          name: 'Updated Product',
          price: 1999
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.product.name).toBe('Updated Product');
      expect(response.body.product.price).toBe(1999);
    });

    it('should not update product without admin role', async () => {
      const product = await createTestProduct(admin);

      const response = await request(app)
        .put(`/api/v1/admin/product/${product._id}`)
        .set('Cookie', [`token=${userToken}`])
        .send({ name: 'Updated' })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/v1/admin/product/:id', () => {
    it('should delete product as admin', async () => {
      const product = await createTestProduct(admin);

      const response = await request(app)
        .delete(`/api/v1/admin/product/${product._id}`)
        .set('Cookie', [`token=${adminToken}`])
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('deleted');

      // Verify product is deleted
      const deletedProduct = await Product.findById(product._id);
      expect(deletedProduct).toBeNull();
    });

    it('should not delete product without admin role', async () => {
      const product = await createTestProduct(admin);

      const response = await request(app)
        .delete(`/api/v1/admin/product/${product._id}`)
        .set('Cookie', [`token=${userToken}`])
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/review', () => {
    it('should create product review', async () => {
      const product = await createTestProduct(admin);

      const response = await request(app)
        .put('/api/v1/review')
        .set('Cookie', [`token=${userToken}`])
        .send({
          rating: 5,
          comment: 'Excellent product!',
          productId: product._id
        })
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verify review was added
      const updatedProduct = await Product.findById(product._id);
      expect(updatedProduct.reviews).toHaveLength(1);
      expect(updatedProduct.reviews[0].rating).toBe(5);
      expect(updatedProduct.numOfReviews).toBe(1);
      expect(updatedProduct.ratings).toBe(5);
    });

    it('should update existing review', async () => {
      const product = await createTestProduct(admin);

      // Create first review
      await request(app)
        .put('/api/v1/review')
        .set('Cookie', [`token=${userToken}`])
        .send({
          rating: 4,
          comment: 'Good product',
          productId: product._id
        });

      // Update review
      const response = await request(app)
        .put('/api/v1/review')
        .set('Cookie', [`token=${userToken}`])
        .send({
          rating: 5,
          comment: 'Actually, excellent product!',
          productId: product._id
        })
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verify review was updated, not duplicated
      const updatedProduct = await Product.findById(product._id);
      expect(updatedProduct.reviews).toHaveLength(1);
      expect(updatedProduct.reviews[0].rating).toBe(5);
    });

    it('should not create review without authentication', async () => {
      const product = await createTestProduct(admin);

      const response = await request(app)
        .put('/api/v1/review')
        .send({
          rating: 5,
          comment: 'Great!',
          productId: product._id
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/products/top', () => {
    it('should get top rated products', async () => {
      const product1 = await createTestProduct(admin, { name: 'Product 1' });
      const product2 = await createTestProduct(admin, { name: 'Product 2' });
      const product3 = await createTestProduct(admin, { name: 'Product 3' });

      // Add ratings
      product1.ratings = 4.8;
      product2.ratings = 4.5;
      product3.ratings = 4.9;
      await product1.save();
      await product2.save();
      await product3.save();

      const response = await request(app)
        .get('/api/v1/products/top')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.products).toHaveLength(3);
      expect(response.body.products[0].ratings).toBe(4.9);
      expect(response.body.products[1].ratings).toBe(4.8);
    });
  });
});