export const welcomeEmailTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          color: #4F46E5;
          margin-bottom: 30px;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background-color: #4F46E5;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <div class="header">
            <h1>🎉 Welcome to E-Commerce!</h1>
          </div>
          <p>Hi ${name},</p>
          <p>Thank you for registering with us! We're excited to have you as part of our community.</p>
          <p>You can now:</p>
          <ul>
            <li>Browse thousands of products</li>
            <li>Add items to your cart</li>
            <li>Track your orders</li>
            <li>Leave reviews</li>
          </ul>
          <center>
            <a href="${process.env.FRONTEND_URL}" class="button">Start Shopping</a>
          </center>
          <p style="margin-top: 30px;">If you have any questions, feel free to reach out to our support team.</p>
          <p>Happy shopping!</p>
          <p><strong>The E-Commerce Team</strong></p>
        </div>
        <div class="footer">
          <p>&copy; 2024 E-Commerce. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const orderConfirmationTemplate = (order, user) => {
  const orderItems = order.orderItems
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          color: #10B981;
          margin-bottom: 30px;
        }
        .order-id {
          background-color: #f0f9ff;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
          text-align: center;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th {
          background-color: #4F46E5;
          color: white;
          padding: 12px;
          text-align: left;
        }
        .total-row {
          font-weight: bold;
          background-color: #f9fafb;
        }
        .shipping-info {
          background-color: #f9fafb;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <div class="header">
            <h1>✅ Order Confirmed!</h1>
          </div>
          <p>Hi ${user.name},</p>
          <p>Thank you for your order! We've received your payment and are processing your order.</p>
          
          <div class="order-id">
            <p style="margin: 0; font-size: 14px; color: #666;">Order ID</p>
            <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">#${order._id}</p>
          </div>

          <h3>Order Details:</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th style="text-align: center;">Quantity</th>
                <th style="text-align: right;">Price</th>
                <th style="text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${orderItems}
              <tr class="total-row">
                <td colspan="3" style="padding: 10px; text-align: right;">Items Price:</td>
                <td style="padding: 10px; text-align: right;">₹${order.itemsPrice.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td colspan="3" style="padding: 10px; text-align: right;">Tax (18%):</td>
                <td style="padding: 10px; text-align: right;">₹${order.taxPrice.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td colspan="3" style="padding: 10px; text-align: right;">Shipping:</td>
                <td style="padding: 10px; text-align: right;">₹${order.shippingPrice.toFixed(2)}</td>
              </tr>
              <tr class="total-row" style="background-color: #10B981; color: white;">
                <td colspan="3" style="padding: 15px; text-align: right; font-size: 16px;">Total:</td>
                <td style="padding: 15px; text-align: right; font-size: 16px;">₹${order.totalPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div class="shipping-info">
            <h3 style="margin-top: 0;">Shipping Address:</h3>
            <p style="margin: 5px 0;">${order.shippingInfo.address}</p>
            <p style="margin: 5px 0;">${order.shippingInfo.city}, ${order.shippingInfo.state}</p>
            <p style="margin: 5px 0;">${order.shippingInfo.country} - ${order.shippingInfo.pinCode}</p>
            <p style="margin: 5px 0;">Phone: ${order.shippingInfo.phoneNo}</p>
          </div>

          <p><strong>Payment Status:</strong> <span style="color: #10B981;">Paid</span></p>
          <p><strong>Order Status:</strong> ${order.orderStatus}</p>

          <p style="margin-top: 30px;">We'll send you another email when your order ships.</p>
          <p>Thank you for shopping with us!</p>
          <p><strong>The E-Commerce Team</strong></p>
        </div>
        <div class="footer">
          <p>&copy; 2024 E-Commerce. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const orderShippedTemplate = (order, user) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          color: #3B82F6;
          margin-bottom: 30px;
        }
        .tracking-box {
          background-color: #eff6ff;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
          margin: 20px 0;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background-color: #3B82F6;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <div class="header">
            <h1>📦 Your Order Has Shipped!</h1>
          </div>
          <p>Hi ${user.name},</p>
          <p>Good news! Your order <strong>#${order._id}</strong> has been shipped and is on its way to you.</p>
          
          <div class="tracking-box">
            <p style="margin: 0; font-size: 14px; color: #666;">Order ID</p>
            <p style="margin: 5px 0; font-size: 18px; font-weight: bold;">#${order._id}</p>
          </div>

          <p><strong>Shipping Address:</strong></p>
          <p style="margin: 5px 0 5px 20px;">${order.shippingInfo.address}<br>
          ${order.shippingInfo.city}, ${order.shippingInfo.state}<br>
          ${order.shippingInfo.country} - ${order.shippingInfo.pinCode}</p>

          <center>
            <a href="${process.env.FRONTEND_URL}/orders/${order._id}" class="button">Track Order</a>
          </center>

          <p style="margin-top: 30px;">Expected delivery: 3-5 business days</p>
          <p>Thank you for your patience!</p>
          <p><strong>The E-Commerce Team</strong></p>
        </div>
        <div class="footer">
          <p>&copy; 2024 E-Commerce. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const passwordResetTemplate = (name, resetUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          color: #EF4444;
          margin-bottom: 30px;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background-color: #EF4444;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
        .warning {
          background-color: #fef2f2;
          padding: 15px;
          border-left: 4px solid #EF4444;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <div class="header">
            <h1>🔐 Password Reset Request</h1>
          </div>
          <p>Hi ${name},</p>
          <p>You have requested to reset your password. Click the button below to proceed:</p>
          
          <center>
            <a href="${resetUrl}" class="button">Reset Password</a>
          </center>

          <div class="warning">
            <p style="margin: 0;"><strong>⚠️ Important:</strong></p>
            <p style="margin: 5px 0 0 0;">This link will expire in 30 minutes. If you didn't request this, please ignore this email.</p>
          </div>

          <p>Or copy and paste this URL in your browser:</p>
          <p style="word-break: break-all; color: #4F46E5;">${resetUrl}</p>

          <p style="margin-top: 30px;">If you have any questions, contact our support team.</p>
          <p><strong>The E-Commerce Team</strong></p>
        </div>
        <div class="footer">
          <p>&copy; 2024 E-Commerce. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};