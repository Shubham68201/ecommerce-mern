import { FiInfo, FiSettings, FiToggleLeft, FiTrash2 } from 'react-icons/fi';

const CookiePolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Learn how we use cookies and similar technologies to improve your experience.
          </p>
          <p className="text-sm text-primary-200 mt-4">
            Last Updated: January 7, 2026
          </p>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiInfo className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">What Are Cookies</h3>
              <p className="text-sm text-gray-600">Small text files</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSettings className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Cookie Types</h3>
              <p className="text-sm text-gray-600">Essential & optional</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiToggleLeft className="text-purple-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Your Control</h3>
              <p className="text-sm text-gray-600">Manage preferences</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-red-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Delete Cookies</h3>
              <p className="text-sm text-gray-600">Clear anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 pb-16 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            
            {/* What Are Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                1. What Are Cookies?
              </h2>
              <p className="text-gray-600 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
              <p className="text-gray-600 mb-4">
                Cookies help us:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Remember your login information</li>
                <li>Keep items in your shopping cart</li>
                <li>Understand how you use our website</li>
                <li>Personalize your experience</li>
                <li>Improve our services</li>
              </ul>
            </div>

            {/* Types of Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                2. Types of Cookies We Use
              </h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2.1 Essential Cookies
              </h3>
              <p className="text-gray-600 mb-4">
                These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take, such as logging in or filling in forms.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 font-semibold mb-2">Examples:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Authentication cookies (keeping you logged in)</li>
                  <li>Security cookies (preventing fraud)</li>
                  <li>Shopping cart cookies (remembering items)</li>
                  <li>Session cookies (maintaining your session)</li>
                </ul>
              </div>
              <p className="text-gray-600 mb-6">
                <strong>Duration:</strong> Session cookies (deleted when you close browser) or persistent (stored for a set period)
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2.2 Functional Cookies
              </h3>
              <p className="text-gray-600 mb-4">
                These cookies enable enhanced functionality and personalization, such as remembering your preferences.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 font-semibold mb-2">Examples:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Language preferences</li>
                  <li>Region or location settings</li>
                  <li>Display preferences (grid/list view)</li>
                  <li>Saved searches and filters</li>
                </ul>
              </div>
              <p className="text-gray-600 mb-6">
                <strong>Duration:</strong> Typically persistent (up to 1 year)
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2.3 Analytics and Performance Cookies
              </h3>
              <p className="text-gray-600 mb-4">
                These cookies help us understand how visitors interact with our website by collecting anonymous information.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 font-semibold mb-2">Examples:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Google Analytics (visitor statistics)</li>
                  <li>Page views and time spent</li>
                  <li>Click patterns and navigation paths</li>
                  <li>Error tracking and performance monitoring</li>
                </ul>
              </div>
              <p className="text-gray-600 mb-6">
                <strong>Duration:</strong> Typically 2 years
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2.4 Advertising and Marketing Cookies
              </h3>
              <p className="text-gray-600 mb-4">
                These cookies track your browsing activity to show you relevant advertisements and measure campaign effectiveness.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 font-semibold mb-2">Examples:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Facebook Pixel (retargeting ads)</li>
                  <li>Google Ads conversion tracking</li>
                  <li>Product recommendations</li>
                  <li>Personalized offers</li>
                </ul>
              </div>
              <p className="text-gray-600">
                <strong>Duration:</strong> Typically 1-2 years
              </p>
            </div>

            {/* Third-Party Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                3. Third-Party Cookies
              </h2>
              <p className="text-gray-600 mb-4">
                Some cookies are placed by third-party services that appear on our pages. We use the following third-party services:
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left">Service</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Purpose</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Privacy Policy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Google Analytics</td>
                      <td className="border border-gray-300 px-4 py-3">Website analytics</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                          View Policy
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Razorpay</td>
                      <td className="border border-gray-300 px-4 py-3">Payment processing</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                          View Policy
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Facebook</td>
                      <td className="border border-gray-300 px-4 py-3">Social sharing & ads</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <a href="https://www.facebook.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                          View Policy
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600">
                We do not control these third-party cookies. Please refer to the respective third parties' privacy policies for more information.
              </p>
            </div>

            {/* Managing Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                4. How to Manage Cookies
              </h2>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                4.1 Browser Settings
              </h3>
              <p className="text-gray-600 mb-4">
                Most browsers allow you to control cookies through their settings. Here's how to manage cookies in popular browsers:
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">Google Chrome</p>
                  <p className="text-gray-600 text-sm">Settings → Privacy and security → Cookies and other site data</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">Mozilla Firefox</p>
                  <p className="text-gray-600 text-sm">Options → Privacy & Security → Cookies and Site Data</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">Safari</p>
                  <p className="text-gray-600 text-sm">Preferences → Privacy → Cookies and website data</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">Microsoft Edge</p>
                  <p className="text-gray-600 text-sm">Settings → Cookies and site permissions → Cookies and site data</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                4.2 Cookie Preferences
              </h3>
              <p className="text-gray-600 mb-4">
                You can manage your cookie preferences directly on our website:
              </p>
              <div className="bg-primary-50 rounded-lg p-6 mb-6">
                <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                  Manage Cookie Preferences
                </button>
                <p className="text-gray-600 text-sm mt-4">
                  Click this button to customize which cookies you allow
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                4.3 Opt-Out of Third-Party Cookies
              </h3>
              <p className="text-gray-600 mb-4">
                To opt out of third-party advertising cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Google Ads: <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Ad Settings</a></li>
                <li>Facebook: <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Ad Preferences</a></li>
                <li>Network Advertising Initiative: <a href="http://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Opt-Out Tool</a></li>
              </ul>
            </div>

            {/* Impact of Blocking Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                5. What Happens If You Block Cookies?
              </h2>
              <p className="text-gray-600 mb-4">
                If you block or delete cookies, some features of our website may not work properly:
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                <p className="text-yellow-800 font-semibold mb-2">Potential Issues:</p>
                <ul className="list-disc list-inside space-y-2 text-yellow-700">
                  <li>You may need to log in every time you visit</li>
                  <li>Your shopping cart may not work properly</li>
                  <li>Preferences may not be saved</li>
                  <li>Some pages may not display correctly</li>
                  <li>Personalized features will be limited</li>
                </ul>
              </div>
              <p className="text-gray-600">
                Essential cookies cannot be blocked as they are necessary for the website to function.
              </p>
            </div>

            {/* Other Tracking Technologies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                6. Other Tracking Technologies
              </h2>
              <p className="text-gray-600 mb-4">
                In addition to cookies, we may use other tracking technologies:
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                6.1 Web Beacons (Pixels)
              </h3>
              <p className="text-gray-600 mb-6">
                Small transparent images embedded in web pages or emails to track user behavior and email opens.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                6.2 Local Storage
              </h3>
              <p className="text-gray-600 mb-6">
                Browser storage that allows websites to store data locally on your device for improved performance.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                6.3 Session Storage
              </h3>
              <p className="text-gray-600">
                Temporary storage that is cleared when you close your browser, used for maintaining session state.
              </p>
            </div>

            {/* Updates */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                7. Updates to This Cookie Policy
              </h2>
              <p className="text-gray-600 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in technology or legal requirements. We will notify you of significant changes by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Posting the updated policy on this page</li>
                <li>Updating the "Last Updated" date</li>
                <li>Displaying a notice on our website</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                8. Contact Us
              </h3>
              <p className="text-gray-600 mb-4">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p>Email: <a href="mailto:privacy@eshop.com" className="text-primary-600 hover:underline">privacy@eshop.com</a></p>
                <p>Phone: +91 98765 43210</p>
                <p>Address: 123 E-Commerce Street, Mumbai, Maharashtra 400001, India</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Policies */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Related Policies
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            
            <a
              href="/privacy"
              className="bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow font-semibold text-gray-900"
            >
              Privacy Policy
            </a>
            
            <a
              href="/terms"
              className="bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow font-semibold text-gray-900"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;