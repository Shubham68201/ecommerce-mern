import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

let razorpayInstance = null;

// The "your_" check remains a great safety net
if (keyId && keySecret && !keyId.includes("your_")) {
  razorpayInstance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
  console.log("✅ Razorpay initialized");
} else {
  console.warn("⚠️ Razorpay disabled (keys not found)");
}

export default razorpayInstance;