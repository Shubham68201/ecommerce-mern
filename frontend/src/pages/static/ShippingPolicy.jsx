import { FiPackage, FiTruck, FiMapPin, FiClock } from 'react-icons/fi';

const ShippingPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Shipping Policy</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Learn about our shipping methods, delivery times, and charges.
          </p>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPackage className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders above ₹999</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">3-5 business days</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="text-purple-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Pan India</h3>
              <p className="text-sm text-gray-600">Delivery nationwide</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="text-yellow-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Real-time Tracking</h3>
              <p className="text-sm text-gray-600">Track your order</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 pb-16 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Shipping Methods */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Shipping Methods
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Standard Delivery
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Delivery Time: 3-5 business days</li>
                  <li>• Shipping Charge: ₹50 (FREE on orders above ₹999)</li>
                  <li>• Available: All over India</li>
                  <li>• Tracking: Available</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Express Delivery
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Delivery Time: 1-2 business days</li>
                  <li>• Shipping Charge: ₹150</li>
                  <li>• Available: Select metro cities only</li>
                  <li>• Tracking: Real-time tracking available</li>
                </ul>
              </div>
            </div>

            {/* Shipping Charges */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Shipping Charges
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left">Order Value</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Standard Delivery</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Express Delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Below ₹999</td>
                      <td className="border border-gray-300 px-4 py-3">₹50</td>
                      <td className="border border-gray-300 px-4 py-3">₹150</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">₹999 and above</td>
                      <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">FREE</td>
                      <td className="border border-gray-300 px-4 py-3">₹150</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Delivery Timeline */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Delivery Timeline
              </h2>
              <p className="text-gray-600 mb-4">
                Delivery times are estimated and may vary based on:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Product availability</li>
                <li>Your location</li>
                <li>Weather conditions</li>
                <li>Public holidays</li>
                <li>Customs clearance (for certain products)</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-blue-800">
                  <strong>Note:</strong> Business days exclude Sundays and public holidays.
                </p>
              </div>
            </div>

            {/* Order Processing */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Order Processing
              </h2>
              <p className="text-gray-600 mb-4">
                Orders are processed within 24 hours of placement. You will receive:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Order confirmation email immediately after purchase</li>
                <li>Shipping confirmation email when order is dispatched</li>
                <li>Tracking details via SMS and email</li>
                <li>Delivery notification before delivery attempt</li>
              </ol>
            </div>

            {/* Tracking Your Order */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Tracking Your Order
              </h2>
              <p className="text-gray-600 mb-4">
                Once your order is shipped, you can track it by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Visiting "My Orders" section in your account</li>
                <li>Using the tracking link sent via email</li>
                <li>Using the tracking number with the courier's website</li>
              </ul>
            </div>

            {/* Delivery Issues */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Delivery Issues
              </h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What if I'm not available?
              </h3>
              <p className="text-gray-600 mb-4">
                Our delivery partner will attempt delivery up to 3 times. You can:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Reschedule delivery to a convenient time</li>
                <li>Authorize someone else to receive the package</li>
                <li>Provide alternate delivery instructions</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Delayed Delivery
              </h3>
              <p className="text-gray-600 mb-4">
                If your order is delayed beyond the estimated delivery date:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Check tracking status for updates</li>
                <li>Contact our customer support</li>
                <li>We'll investigate and provide a solution</li>
              </ul>
            </div>

            {/* Packaging */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Packaging
              </h2>
              <p className="text-gray-600 mb-4">
                We take great care in packaging your orders:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>All products are securely packed</li>
                <li>Fragile items receive extra cushioning</li>
                <li>Tamper-proof packaging for security</li>
                <li>Eco-friendly packaging materials where possible</li>
              </ul>
            </div>

            {/* International Shipping */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                International Shipping
              </h2>
              <p className="text-gray-600">
                Currently, we only ship within India. We're working on expanding our services internationally. Please check back for updates or contact us for special requests.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Need Help with Shipping?
              </h3>
              <p className="text-gray-600 mb-4">
                If you have questions about shipping or need assistance with your delivery, please contact our customer support team.
              </p>
              
              <a
                href="/contact"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShippingPolicy;