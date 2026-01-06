import request from 'supertest';
import app from '../src/app.js';
import Order from '../src/models/Order.js';
import Product from '../src/models/Product.js';
import {
  createTestUser,
  createTestAdmin,
  createTestProduct,
  createTestOrder,
  getAuthToken
} from './helpers/testUtils.js';

describe('Order API Tests', () => {
  let adminToken, userToken, admin, user, product;

  beforeEach(async () => {
    admin = await createTestAdmin();
    user = await createTestUser();
    product = await createTestProduct(admin);
    adminToken = getAuthToken(admin);
    userToken = getAuthToken(user);
  });

  describe('POST /api/v1/order/new', () => {
    it('should create new order', async () => {
      const orderData = {
        shippingInfo: {
          address: '123 Test St',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          pinCode: '400001',
          phoneNo: '9876543210'
        },
        orderItems: [
          {
            name: product.name,
            quantity: 2,
            image: product.images[0].url,
            price: product.price,
            product: product._id
          }
        ],
        paymentInfo: {
          id: 'test_payment_123',
          status: 'succeeded'
        },
        itemsPrice: product.price * 2,
        taxPrice: product.price * 2 * 0.18,
        shippingPrice: 50,
        totalPrice: product.price * 2 * 1.18 + 50
      };

      const response = await request(app)
        .post('/api/v1/order/new')
        .set('Cookie', [`token=${userToken}`])
        .send(orderData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.order.user.toString()).toBe(user._id.toString());
      expect(response.body.order.orderItems).toHaveLength(1);
      expect(response.body.order.orderStatus).toBe('Processing');
    });

    it('should not create order without authentication', async () => {
      const response = await request(app)
        .post('/api/v1/order/new')
        .send({})
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/order/:id', () => {
    it('should get single order', async () => {
      const order = await createTestOrder(user, product);

      const response = await request(app)
        .get(`/api/v1/order/${order._id}`)
        .set('Cookie', [`token=${userToken}`])
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.order._id).toBe(order._id.toString());
    });

    it('should return 404 for non-existent order', async () => {
      const fakeId = '507f1f77bcf86cd799439011';

      const response = await request(app)
        .get(`/api/v1/order/${fakeId}`)
        .set('Cookie', [`token=${userToken}`])
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/orders/me', () => {
    it('should get logged in user orders', async () => {
      await createTestOrder(user, product);
      await createTestOrder(user, product);

      const response = await request(app)
        .get('/api/v1/orders/me')
        .set('Cookie', [`token=${userToken}`])
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.orders).toHaveLength(2);
      expect(response.body.orders[0].user.toString()).toBe(user._id.toString());
    });

    it('should return empty array if user has no orders', async () => {
      const response = await request(app)
        .get('/api/v1/orders/me')
        .set('Cookie', [`token=${userToken}`])
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.orders).toHaveLength(0);
    });
  });

  describe('GET /api/v1/admin/orders', () => {
    it('should get all orders as admin', async () => {
      await createTestOrder(user, product);
      await createTestOrder(user, product);

      const response = await request(app)
        .get('/api/v1/admin/orders')
        .set('Cookie', [`token=${adminToken}`])
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.orders).toHaveLength(2);
      expect(response.body.totalAmount).toBeGreaterThan(0);
    });

    it('should not get orders without admin role', async () => {
      const response = await request(app)
        .get('/api/v1/admin/orders')
        .set('Cookie', [`token=${userToken}`])
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/admin/order/:id', () => {
    it('should update order status as admin', async () => {
      const order = await createTestOrder(user, product);
      const initialStock = product.stock;

      const response = await request(app)
        .put(`/api/v1/admin/order/${order._id}`)
        .set('Cookie', [`token=${adminToken}`])
        .send({ status: 'Shipped' })
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verify order status updated
      const updatedOrder = await Order.findById(order._id);
      expect(updatedOrder.orderStatus).toBe('Shipped');

      // Verify stock reduced
      const updatedProduct = await Product.findById(product._id);
      expect(updatedProduct.stock).toBe(initialStock - 1);
    });

    it('should not update already delivered order', async () => {
      const order = await createTestOrder(user, product, {
        orderStatus: 'Delivered'
      });

      const response = await request(app)
        .put(`/api/v1/admin/order/${order._id}`)
        .set('Cookie', [`token=${adminToken}`])
        .send({ status: 'Cancelled' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already delivered');
    });

    it('should set deliveredAt when marking as delivered', async () => {
      const order = await createTestOrder(user, product);

      await request(app)
        .put(`/api/v1/admin/order/${order._id}`)
        .set('Cookie', [`token=${adminToken}`])
        .send({ status: 'Delivered' })
        .expect(200);

      const updatedOrder = await Order.findById(order._id);
      expect(updatedOrder.deliveredAt).toBeDefined();
    });
  });

  describe('DELETE /api/v1/admin/order/:id', () => {
    it('should delete order as admin', async () => {
      const order = await createTestOrder(user, product);

      const response = await request(app)
        .delete(`/api/v1/admin/order/${order._id}`)
        .set('Cookie', [`token=${adminToken}`])
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verify order deleted
      const deletedOrder = await Order.findById(order._id);
      expect(deletedOrder).toBeNull();
    });
  });

  describe('GET /api/v1/admin/orders/stats', () => {
    it('should get order statistics', async () => {
      await createTestOrder(user, product);
      await createTestOrder(user, product, { orderStatus: 'Shipped' });
      await createTestOrder(user, product, { orderStatus: 'Delivered' });

      const response = await request(app)
        .get('/api/v1/admin/orders/stats')
        .set('Cookie', [`token=${adminToken}`])
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.stats.totalOrders).toBe(3);
      expect(response.body.stats.totalRevenue).toBeGreaterThan(0);
      expect(response.body.stats.ordersByStatus).toBeDefined();
    });
  });
});