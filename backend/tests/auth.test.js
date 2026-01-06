import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/User.js';
import { createTestUser, getAuthToken } from './helpers/testUtils.js';

describe('Auth API Tests', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.user.name).toBe(userData.name);
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.password).toBeUndefined();
      expect(response.body.token).toBeDefined();
    });

    it('should not register user with existing email', async () => {
      await createTestUser({ email: 'existing@example.com' });

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Another User',
          email: 'existing@example.com',
          password: 'password123'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already registered');
    });

    it('should not register user without required fields', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'John Doe'
          // Missing email and password
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should not register user with invalid email', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'John Doe',
          email: 'invalid-email',
          password: 'password123'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should not register user with short password', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: '12345' // Less than 6 characters
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login user with correct credentials', async () => {
      const user = await createTestUser({
        email: 'login@example.com',
        password: 'password123'
      });

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.user.email).toBe('login@example.com');
      expect(response.body.token).toBeDefined();
    });

    it('should not login with incorrect password', async () => {
      await createTestUser({
        email: 'user@example.com',
        password: 'password123'
      });

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'user@example.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Invalid');
    });

    it('should not login with non-existent email', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should not login without email or password', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'user@example.com'
          // Missing password
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/auth/me', () => {
    it('should get user profile when authenticated', async () => {
      const user = await createTestUser();
      const token = getAuthToken(user);

      const response = await request(app)
        .get('/api/v1/auth/me')
        .set('Cookie', [`token=${token}`])
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.user.email).toBe(user.email);
    });

    it('should not get profile without authentication', async () => {
      const response = await request(app).get('/api/v1/auth/me').expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('login');
    });

    it('should not get profile with invalid token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/me')
        .set('Cookie', ['token=invalid_token'])
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/auth/password/update', () => {
    it('should update password with correct old password', async () => {
      const user = await createTestUser({ password: 'oldpassword123' });
      const token = getAuthToken(user);

      const response = await request(app)
        .put('/api/v1/auth/password/update')
        .set('Cookie', [`token=${token}`])
        .send({
          oldPassword: 'oldpassword123',
          newPassword: 'newpassword123'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('updated');

      // Verify new password works
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: user.email,
          password: 'newpassword123'
        })
        .expect(200);

      expect(loginResponse.body.success).toBe(true);
    });

    it('should not update password with incorrect old password', async () => {
      const user = await createTestUser({ password: 'oldpassword123' });
      const token = getAuthToken(user);

      const response = await request(app)
        .put('/api/v1/auth/password/update')
        .set('Cookie', [`token=${token}`])
        .send({
          oldPassword: 'wrongpassword',
          newPassword: 'newpassword123'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('incorrect');
    });
  });

  describe('PUT /api/v1/auth/me/update', () => {
    it('should update user profile', async () => {
      const user = await createTestUser();
      const token = getAuthToken(user);

      const response = await request(app)
        .put('/api/v1/auth/me/update')
        .set('Cookie', [`token=${token}`])
        .send({
          name: 'Updated Name',
          email: 'updated@example.com'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.user.name).toBe('Updated Name');
      expect(response.body.user.email).toBe('updated@example.com');
    });
  });

  describe('GET /api/v1/auth/logout', () => {
    it('should logout user', async () => {
      const user = await createTestUser();
      const token = getAuthToken(user);

      const response = await request(app)
        .get('/api/v1/auth/logout')
        .set('Cookie', [`token=${token}`])
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('Logged out');
    });
  });
});