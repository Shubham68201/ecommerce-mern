import { FiShield, FiLock, FiEye, FiDatabase } from 'react-icons/fi';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
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
                <FiShield className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Data Protection</h3>
              <p className="text-sm text-gray-600">We use industry-standard encryption</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiLock className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Secure Storage</h3>
              <p className="text-sm text-gray-600">Your data is encrypted at rest</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiEye className="text-purple-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Transparency</h3>
              <p className="text-sm text-gray-600">Clear data usage policies</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiDatabase className="text-red-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Your Control</h3>
              <p className="text-sm text-gray-600">Manage your data anytime</p>
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
                1. Introduction
              </h2>
              <p className="text-gray-600 mb-4">
                Welcome to E-Shop ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
              <p className="text-gray-600">
                This privacy policy applies to information we collect when you use our e-commerce platform, mobile application, or interact with us in other ways.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                2. Information We Collect
              </h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2.1 Information You Provide to Us
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li><strong>Account Information:</strong> Name, email address, password, phone number</li>
                <li><strong>Profile Information:</strong> Profile picture, preferences, interests</li>
                <li><strong>Payment Information:</strong> Credit card details, billing address (processed through secure payment gateways)</li>
                <li><strong>Shipping Information:</strong> Delivery address, contact details</li>
                <li><strong>Communication Data:</strong> Messages, reviews, feedback, customer support inquiries</li>
                <li><strong>Order History:</strong> Products purchased, order dates, transaction details</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2.2 Information We Collect Automatically
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                <li><strong>Usage Data:</strong> Pages viewed, time spent, click patterns, search queries</li>
                <li><strong>Location Data:</strong> General location based on IP address</li>
                <li><strong>Cookies and Tracking:</strong> Session data, preferences, analytics (see Cookie Policy)</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2.3 Information from Third Parties
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Payment processors (Razorpay) for transaction verification</li>
                <li>Social media platforms (if you choose to connect accounts)</li>
                <li>Analytics providers (Google Analytics)</li>
                <li>Marketing partners (with your consent)</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-4">
                We use the information we collect for the following purposes:
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3.1 To Provide Our Services
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Process and fulfill your orders</li>
                <li>Manage your account and provide customer support</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Process payments and prevent fraud</li>
                <li>Communicate about your orders and account</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3.2 To Improve Our Platform
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Analyze usage patterns and trends</li>
                <li>Conduct research and development</li>
                <li>Test new features and functionality</li>
                <li>Personalize your shopping experience</li>
                <li>Improve website performance and security</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3.3 Marketing and Communications
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Send promotional emails (with your consent)</li>
                <li>Show personalized recommendations</li>
                <li>Notify you about special offers and new products</li>
                <li>Conduct surveys and gather feedback</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3.4 Legal and Security
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and unauthorized transactions</li>
                <li>Protect our rights and property</li>
                <li>Resolve disputes and enforce our terms</li>
              </ul>
            </div>

            {/* Data Sharing */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                4. How We Share Your Information
              </h2>
              <p className="text-gray-600 mb-4">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                4.1 Service Providers
              </h3>
              <p className="text-gray-600 mb-4">
                We share information with third-party service providers who perform services on our behalf:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Payment processors (Razorpay)</li>
                <li>Shipping and logistics partners</li>
                <li>Cloud storage providers</li>
                <li>Email service providers</li>
                <li>Analytics and marketing platforms</li>
                <li>Customer support tools</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                4.2 Legal Requirements
              </h3>
              <p className="text-gray-600 mb-6">
                We may disclose your information if required by law, court order, or government request, or to protect our rights and safety.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                4.3 Business Transfers
              </h3>
              <p className="text-gray-600">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                5. Data Security
              </h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational measures to protect your personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Encrypted storage of sensitive data</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Employee training on data protection</li>
                <li>Secure payment processing (PCI DSS compliant)</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-yellow-800">
                  <strong>Note:</strong> While we strive to protect your data, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                6. Data Retention
              </h2>
              <p className="text-gray-600 mb-4">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations (e.g., tax records: 7 years)</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Improve our platform and services</li>
              </ul>
              <p className="text-gray-600">
                When your data is no longer needed, we will securely delete or anonymize it.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                7. Your Rights and Choices
              </h2>
              <p className="text-gray-600 mb-4">
                You have the following rights regarding your personal data:
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                7.1 Access and Portability
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Request a copy of your personal data</li>
                <li>Download your data in a machine-readable format</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                7.2 Correction and Update
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Update your profile information anytime</li>
                <li>Correct inaccurate data</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                7.3 Deletion
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Request deletion of your account and data</li>
                <li>Note: Some data may be retained for legal compliance</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                7.4 Marketing Preferences
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Opt-out of promotional emails (unsubscribe link in emails)</li>
                <li>Manage cookie preferences</li>
                <li>Control personalized advertising</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                7.5 Object and Restrict
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Object to certain data processing activities</li>
                <li>Request restriction of processing</li>
              </ul>

              <p className="text-gray-600 mt-6">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:privacy@eshop.com" className="text-primary-600 hover:underline">
                  privacy@eshop.com
                </a>
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                8. Children's Privacy
              </h2>
              <p className="text-gray-600 mb-4">
                Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you believe we have collected information from a child under 18, please contact us immediately.
              </p>
              <p className="text-gray-600">
                If you are under 18, you may only use our services with the involvement and consent of a parent or guardian.
              </p>
            </div>

            {/* International Transfers */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                9. International Data Transfers
              </h2>
              <p className="text-gray-600 mb-4">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws.
              </p>
              <p className="text-gray-600">
                When we transfer data internationally, we ensure appropriate safeguards are in place, such as standard contractual clauses or adequacy decisions.
              </p>
            </div>

            {/* Third-Party Links */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                10. Third-Party Links
              </h2>
              <p className="text-gray-600 mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to read their privacy policies.
              </p>
            </div>

            {/* Changes to Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-600 mb-4">
                We may update this privacy policy from time to time. We will notify you of any material changes by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                <li>Posting the updated policy on this page</li>
                <li>Updating the "Last Updated" date</li>
                <li>Sending you an email notification (for significant changes)</li>
              </ul>
              <p className="text-gray-600">
                Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </div>

            {/* Contact Us */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                12. Contact Us
              </h2>
              <p className="text-gray-600 mb-4">
                If you have questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2"><strong>E-Shop Privacy Team</strong></p>
                <p className="text-gray-600 mb-2">Email: <a href="mailto:privacy@eshop.com" className="text-primary-600 hover:underline">privacy@eshop.com</a></p>
                <p className="text-gray-600 mb-2">Phone: +91 98765 43210</p>
                <p className="text-gray-600 mb-2">Address: 123 E-Commerce Street, Mumbai, Maharashtra 400001, India</p>
                <p className="text-gray-600">Response Time: Within 30 days</p>
              </div>
            </div>

            {/* Indian Laws */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                13. Compliance with Indian Laws
              </h2>
              <p className="text-gray-600 mb-4">
                This privacy policy complies with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
              </p>
              <p className="text-gray-600">
                We are committed to protecting your personal data in accordance with Indian data protection laws and regulations.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Your Privacy?</h2>
          <p className="text-xl text-primary-100 mb-8">
            We're here to help. Contact our privacy team anytime.
          </p>
          
          <a
            href="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;