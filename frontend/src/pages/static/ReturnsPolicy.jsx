import { FiRefreshCw, FiDollarSign, FiClock, FiCheckCircle } from 'react-icons/fi';

const ReturnsPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Returns & Refunds Policy</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Easy returns within 7 days. Your satisfaction is our priority.
          </p>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">7-Day Returns</h3>
              <p className="text-sm text-gray-600">Easy return policy</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiRefreshCw className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Free Pickup</h3>
              <p className="text-sm text-gray-600">We collect from you</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiDollarSign className="text-purple-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Quick Refunds</h3>
              <p className="text-sm text-gray-600">5-7 business days</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="text-yellow-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Easy Process</h3>
              <p className="text-sm text-gray-600">Simple steps</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 pb-16 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Return Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Return Policy
              </h2>
              <p className="text-gray-600 mb-4">
                We want you to be completely satisfied with your purchase. If you're not happy with your order, you can return it within 7 days of delivery for a full refund or exchange.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
                Eligibility for Returns
              </h3>
              <p className="text-gray-600 mb-4">To be eligible for a return:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Item must be unused and in the same condition as received</li>
                <li>Original packaging must be intact</li>
                <li>All tags and labels must be attached</li>
                <li>Return initiated within 7 days of delivery</li>
                <li>Item must not be in the non-returnable category (see below)</li>
              </ul>
            </div>

            {/* Non-Returnable Items */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Non-Returnable Items
              </h2>
              <p className="text-gray-600 mb-4">
                The following items cannot be returned:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Intimate wear and lingerie</li>
                <li>Consumable items (food, beverages)</li>
                <li>Personal care products (opened)</li>
                <li>Customized or personalized items</li>
                <li>Digital products and gift cards</li>
                <li>Items marked as "non-returnable" on product page</li>
              </ul>
            </div>

            {/* How to Return */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                How to Return an Item
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Log into Your Account</h4>
                    <p className="text-gray-600">Go to "My Orders" and select the order you want to return.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Initiate Return</h4>
                    <p className="text-gray-600">Click "Return Item" and select a reason for return.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Schedule Pickup</h4>
                    <p className="text-gray-600">Choose a convenient time for pickup from your address.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Hand Over Package</h4>
                    <p className="text-gray-600">Our delivery partner will collect the item. No need to pack it separately.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Receive Refund</h4>
                    <p className="text-gray-600">Once we receive and inspect the item, your refund will be processed.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Process */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Refund Process
              </h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Refund Timeline
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Item inspection: 1-2 business days after receipt</li>
                <li>Refund initiation: Within 24 hours of approval</li>
                <li>Credit to original payment method: 5-7 business days</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Refund Methods
              </h3>
              <p className="text-gray-600 mb-4">
                Refunds are processed to your original payment method:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Credit/Debit Card: 5-7 business days</li>
                <li>Net Banking: 5-7 business days</li>
                <li>UPI: 3-5 business days</li>
                <li>Wallets: 1-3 business days</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
                <p className="text-yellow-800">
                  <strong>Note:</strong> Refund timelines may vary depending on your bank's processing time.
                </p>
              </div>
            </div>

            {/* Exchange Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Exchange Policy
              </h2>
              <p className="text-gray-600 mb-4">
                We offer exchanges for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Size issues (clothing, footwear)</li>
                <li>Color preference changes</li>
                <li>Model/variant changes (if available)</li>
              </ul>
              <p className="text-gray-600">
                To exchange an item, initiate a return and place a new order for the desired variant. Once your return is approved, you'll receive a refund, which you can use for the new purchase.
              </p>
            </div>

            {/* Damaged or Defective Items */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Damaged or Defective Items
              </h2>
              <p className="text-gray-600 mb-4">
                If you receive a damaged or defective product:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Take photos/videos of the damaged item and packaging</li>
                <li>Contact us within 48 hours of delivery</li>
                <li>Share order details and evidence</li>
                <li>We'll arrange immediate replacement or full refund</li>
              </ol>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-6">
                <p className="text-red-800">
                  <strong>Important:</strong> Claims for damaged items must be reported within 48 hours of delivery with photographic evidence.
                </p>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Cancellation Policy
              </h2>
              <p className="text-gray-600 mb-4">
                You can cancel your order:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Within 24 hours of placement (before shipment)</li>
                <li>From "My Orders" section</li>
                <li>Full refund will be processed immediately</li>
              </ul>
              <p className="text-gray-600">
                Once an order is shipped, cancellation is not possible. You can refuse delivery or initiate a return after receiving the item.
              </p>
            </div>

            {/* Contact Support */}
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Need Help with Returns?
              </h3>
              <p className="text-gray-600 mb-4">
                Our customer support team is here to assist you with returns, refunds, or exchanges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                
                <a
                  href="/contact"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
                >
                  Contact Support
                </a>
                
                <a
                  href="/faq"
                  className="inline-block bg-white text-primary-600 border-2 border-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-center"
                >
                  View FAQ
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReturnsPolicy;