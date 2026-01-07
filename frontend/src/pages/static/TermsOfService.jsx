import { FiFileText, FiShield, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const TermsOfService = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Please read these terms carefully before using our platform.
          </p>
          <p className="text-sm text-primary-200 mt-4">
            Last Updated: January 7, 2026
          </p>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiFileText className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">User Agreement</h3>
              <p className="text-sm text-gray-600">Binding contract terms</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Your Rights</h3>
              <p className="text-sm text-gray-600">What you can do</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAlertCircle className="text-yellow-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Restrictions</h3>
              <p className="text-sm text-gray-600">What you cannot do</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="text-purple-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Protection</h3>
              <p className="text-sm text-gray-600">Your account security</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 pb-16 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                1. Introduction and Acceptance
              </h2>
              <p className="text-gray-600 mb-4">
                Welcome to E-Shop. These Terms of Service ("Terms") govern your access to and use of our e-commerce platform, mobile application, and related services (collectively, the "Services").
              </p>
              <p className="text-gray-600 mb-4">
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use our Services.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-blue-800">
                  <strong>Important:</strong> These Terms constitute a legally binding agreement between you and E-Shop.
                </p>
              </div>
            </div>

            {/* Eligibility */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                2. Eligibility
              </h2>
              <p className="text-gray-600 mb-4">
                To use our Services, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Be at least 18 years of age</li>
                <li>Have the legal capacity to enter into a binding contract</li>
                <li>Not be prohibited from using our Services under Indian law</li>
                <li>Provide accurate and complete registration information</li>
              </ul>
              <p className="text-gray-600">
                If you are under 18, you may only use our Services with the involvement and consent of a parent or legal guardian who agrees to be bound by these Terms.
              </p>
            </div>

            {/* Account Registration */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                3. Account Registration and Security
              </h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3.1 Account Creation
              </h3>
              <p className="text-gray-600 mb-4">
                To access certain features, you must create an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information</li>
                <li>Keep your password secure and confidential</li>
                <li>Not share your account with others</li>
                <li>Notify us immediately of unauthorized access</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3.2 Account Responsibility
              </h3>
              <p className="text-gray-600">
                You are responsible for all activities that occur under your account. We are not liable for any loss or damage arising from your failure to maintain account security.
              </p>
            </div>

            {/* Use of Services */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                4. Use of Services
              </h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                4.1 Permitted Uses
              </h3>
              <p className="text-gray-600 mb-4">
                You may use our Services to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Browse and search for products</li>
                <li>Purchase products for personal use</li>
                <li>Create wish lists and shopping carts</li>
                <li>Write reviews and provide feedback</li>
                <li>Track your orders</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                4.2 Prohibited Activities
              </h3>
              <p className="text-gray-600 mb-4">
                You agree NOT to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Post false, misleading, or fraudulent content</li>
                <li>Engage in unauthorized commercial activities</li>
                <li>Use automated systems (bots, scrapers) without permission</li>
                <li>Attempt to hack, disrupt, or compromise our Services</li>
                <li>Upload viruses, malware, or harmful code</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Impersonate any person or entity</li>
                <li>Manipulate prices, reviews, or ratings</li>
                <li>Resell products for commercial purposes without authorization</li>
              </ul>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-800">
                  <strong>Warning:</strong> Violation of these prohibitions may result in immediate account termination and legal action.
                </p>
              </div>
            </div>

            {/* Orders and Payments */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                5. Orders and Payments
              </h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                5.1 Placing Orders
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>All orders are subject to acceptance and availability</li>
                <li>We reserve the right to refuse or cancel any order</li>
                <li>Product descriptions and images are for reference only</li>
                <li>Prices are in Indian Rupees (₹) and include applicable taxes</li>
                <li>Prices may change without notice</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                5.2 Payment
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Payment must be made at the time of purchase</li>
                <li>We accept payment through Razorpay (cards, UPI, net banking, wallets)</li>
                <li>You authorize us to charge your payment method</li>
                <li>All payments are processed securely</li>
                <li>Payment failures may result in order cancellation</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                5.3 Order Confirmation
              </h3>
              <p className="text-gray-600">
                Receipt of an order confirmation does not constitute our acceptance of your order. We reserve the right to cancel orders due to pricing errors, product unavailability, or suspected fraud.
              </p>
            </div>

            {/* Shipping and Delivery */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                6. Shipping and Delivery
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Delivery times are estimates and not guaranteed</li>
                <li>We are not liable for delays beyond our control</li>
                <li>You must inspect items upon delivery</li>
                <li>Risk of loss passes to you upon delivery</li>
                <li>See our <a href="/shipping" className="text-primary-600 hover:underline">Shipping Policy</a> for details</li>
              </ul>
            </div>

            {/* Returns and Refunds */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                7. Returns and Refunds
              </h2>
              <p className="text-gray-600 mb-4">
                We offer a 7-day return policy for eligible products. Please refer to our{' '}
                <a href="/returns" className="text-primary-600 hover:underline">Returns & Refunds Policy</a>{' '}
                for complete details on:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Return eligibility and conditions</li>
                <li>Non-returnable items</li>
                <li>Return process and timelines</li>
                <li>Refund methods and processing times</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                8. Intellectual Property Rights
              </h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                8.1 Our Content
              </h3>
              <p className="text-gray-600 mb-4">
                All content on our platform (text, graphics, logos, images, software) is owned by E-Shop or our licensors and protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-600 mb-6">
                You may not copy, modify, distribute, or create derivative works without our written permission.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                8.2 User Content
              </h3>
              <p className="text-gray-600 mb-4">
                When you post reviews, comments, or other content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display that content.
              </p>
              <p className="text-gray-600">
                You represent that you own or have the right to post such content and that it does not violate any third-party rights.
              </p>
            </div>

            {/* User Content and Reviews */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                9. User Content and Reviews
              </h2>
              <p className="text-gray-600 mb-4">
                When posting reviews or content, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Provide honest and accurate reviews</li>
                <li>Only review products you've actually purchased</li>
                <li>Not post offensive, defamatory, or inappropriate content</li>
                <li>Not post fake reviews or manipulate ratings</li>
                <li>Respect others' privacy and rights</li>
              </ul>
              <p className="text-gray-600">
                We reserve the right to remove any content that violates these Terms or is otherwise objectionable.
              </p>
            </div>

            {/* Disclaimers */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                10. Disclaimers
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="text-yellow-800 font-semibold mb-2">
                  OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.
                </p>
              </div>
              <p className="text-gray-600 mb-4">
                We disclaim all warranties, express or implied, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Merchantability and fitness for a particular purpose</li>
                <li>Non-infringement of third-party rights</li>
                <li>Accuracy, reliability, or completeness of information</li>
                <li>Uninterrupted or error-free service</li>
                <li>Security of data transmission</li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                11. Limitation of Liability
              </h2>
              <p className="text-gray-600 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, E-SHOP SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, data, or goodwill</li>
                <li>Service interruptions or system failures</li>
                <li>Unauthorized access to your account</li>
                <li>Third-party actions or content</li>
              </ul>
              <p className="text-gray-600">
                Our total liability shall not exceed the amount you paid for the specific product or service, or ₹10,000, whichever is lower.
              </p>
            </div>

            {/* Indemnification */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                12. Indemnification
              </h2>
              <p className="text-gray-600">
                You agree to indemnify, defend, and hold harmless E-Shop, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
                <li>Your use of our Services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Your user content</li>
              </ul>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                13. Termination
              </h2>
              <p className="text-gray-600 mb-4">
                We may suspend or terminate your account and access to our Services at any time, with or without notice, for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Violation of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Abuse of our Services</li>
                <li>Non-payment</li>
                <li>Any other reason at our discretion</li>
              </ul>
              <p className="text-gray-600">
                Upon termination, your right to use our Services will immediately cease. Provisions that should survive termination will remain in effect.
              </p>
            </div>

            {/* Dispute Resolution */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                14. Dispute Resolution and Governing Law
              </h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                14.1 Governing Law
              </h3>
              <p className="text-gray-600 mb-6">
                These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                14.2 Dispute Resolution
              </h3>
              <p className="text-gray-600 mb-4">
                Before filing any legal claim, you agree to first contact us to attempt to resolve the dispute informally. We'll work in good faith to resolve the issue.
              </p>
              <p className="text-gray-600">
                If informal resolution fails, disputes may be resolved through arbitration in accordance with Indian arbitration laws.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                15. Changes to Terms
              </h2>
              <p className="text-gray-600 mb-4">
                We may modify these Terms at any time. We will notify you of material changes by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Posting the updated Terms on this page</li>
                <li>Updating the "Last Updated" date</li>
                <li>Sending email notification (for significant changes)</li>
              </ul>
              <p className="text-gray-600">
                Continued use of our Services after changes constitutes acceptance of the updated Terms.
              </p>
            </div>

            {/* Miscellaneous */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                16. Miscellaneous
              </h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                16.1 Entire Agreement
              </h3>
              <p className="text-gray-600 mb-4">
                These Terms constitute the entire agreement between you and E-Shop regarding our Services.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                16.2 Severability
              </h3>
              <p className="text-gray-600 mb-4">
                If any provision is found unenforceable, the remaining provisions will remain in full effect.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                16.3 Waiver
              </h3>
              <p className="text-gray-600 mb-4">
                Our failure to enforce any right or provision does not constitute a waiver of that right.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                16.4 Assignment
              </h3>
              <p className="text-gray-600">
                You may not assign these Terms without our consent. We may assign these Terms without restriction.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                17. Contact Information
              </h3>
              <p className="text-gray-600 mb-4">
                For questions about these Terms, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>E-Shop Legal Department</strong></p>
                <p>Email: <a href="mailto:legal@eshop.com" className="text-primary-600 hover:underline">legal@eshop.com</a></p>
                <p>Phone: +91 98765 43210</p>
                <p>Address: 123 E-Commerce Street, Mumbai, Maharashtra 400001, India</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;