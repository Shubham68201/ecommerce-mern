import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      category: 'Orders & Payment',
      questions: [
        {
          question: 'How do I place an order?',
          answer:
            'To place an order, browse our products, add items to your cart, proceed to checkout, enter shipping information, and complete payment. You\'ll receive an order confirmation email once your order is placed successfully.',
        },
        {
          question: 'What payment methods do you accept?',
          answer:
            'We accept all major payment methods through Razorpay including Credit/Debit Cards, Net Banking, UPI, and various digital wallets. All payments are secure and encrypted.',
        },
        {
          question: 'Can I cancel or modify my order?',
          answer:
            'You can cancel your order within 24 hours of placing it if it hasn\'t been shipped yet. To cancel, go to "My Orders", select the order, and click "Cancel Order". For modifications, please contact our customer support.',
        },
        {
          question: 'How do I track my order?',
          answer:
            'Once your order is shipped, you\'ll receive a tracking number via email. You can also track your order by logging into your account and visiting "My Orders" section.',
        },
      ],
    },
    {
      category: 'Shipping & Delivery',
      questions: [
        {
          question: 'What are the shipping charges?',
          answer:
            'We offer FREE shipping on orders above ₹999. For orders below ₹999, a flat shipping charge of ₹50 applies across India.',
        },
        {
          question: 'How long does delivery take?',
          answer:
            'Standard delivery typically takes 3-5 business days. Express delivery (available in select cities) takes 1-2 business days. Delivery times may vary based on your location and product availability.',
        },
        {
          question: 'Do you deliver internationally?',
          answer:
            'Currently, we only deliver within India. We\'re working on expanding our services internationally. Please check back for updates.',
        },
        {
          question: 'What if I\'m not available during delivery?',
          answer:
            'Our delivery partner will attempt delivery up to 3 times. If you\'re unavailable, you can reschedule delivery or arrange for someone else to receive the package. You\'ll receive SMS/email notifications before each delivery attempt.',
        },
      ],
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          question: 'What is your return policy?',
          answer:
            'We offer a 7-day return policy for most products. Items must be unused, in original packaging, and with all tags intact. Some products like intimate wear, consumables, and customized items are not eligible for return.',
        },
        {
          question: 'How do I return a product?',
          answer:
            'To initiate a return, go to "My Orders", select the order, and click "Return Item". Choose a reason for return and schedule a pickup. Our delivery partner will collect the item from your address.',
        },
        {
          question: 'When will I receive my refund?',
          answer:
            'Once we receive and inspect the returned item, your refund will be processed within 5-7 business days. The amount will be credited to your original payment method.',
        },
        {
          question: 'Can I exchange a product?',
          answer:
            'Yes, we offer exchanges for size/color variations. To exchange, initiate a return and place a new order for the desired variant. Contact our support team for assistance with exchanges.',
        },
      ],
    },
    {
      category: 'Account & Security',
      questions: [
        {
          question: 'How do I create an account?',
          answer:
            'Click on "Register" at the top of the page, fill in your details (name, email, password), and click "Create Account". You\'ll receive a verification email to activate your account.',
        },
        {
          question: 'I forgot my password. What should I do?',
          answer:
            'Click on "Forgot Password" on the login page, enter your registered email address, and you\'ll receive a password reset link. Click the link to set a new password.',
        },
        {
          question: 'Is my personal information secure?',
          answer:
            'Yes, we use industry-standard encryption to protect your personal information. We never share your data with third parties without your consent. Read our Privacy Policy for more details.',
        },
        {
          question: 'How do I update my profile information?',
          answer:
            'Log into your account, go to "My Profile", and click "Edit Profile". You can update your name, email, phone number, and shipping addresses.',
        },
      ],
    },
    {
      category: 'Products & Stock',
      questions: [
        {
          question: 'Are your products genuine?',
          answer:
            'Yes, all products sold on E-Shop are 100% genuine and sourced directly from authorized distributors and brands. We have a zero-tolerance policy for counterfeit products.',
        },
        {
          question: 'What if a product is out of stock?',
          answer:
            'If a product is out of stock, you can click "Notify Me" to receive an email when it\'s back in stock. We regularly restock popular items.',
        },
        {
          question: 'Do you provide product warranties?',
          answer:
            'Yes, products come with manufacturer warranties. Warranty details are mentioned on each product page. For warranty claims, please contact our customer support with your order details.',
        },
        {
          question: 'Can I see product reviews before buying?',
          answer:
            'Yes, each product page displays customer reviews and ratings. You can also write reviews for products you\'ve purchased to help other customers make informed decisions.',
        },
      ],
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filter FAQs based on search
  const filteredFAQs = faqCategories.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Find answers to common questions about shopping, shipping, returns,
            and more.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8">
        <div className="container-custom max-w-3xl">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              placeholder="Search for questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-8 pb-16">
        <div className="container-custom max-w-4xl">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, index) => {
                    const globalIndex = `${categoryIndex}-${index}`;
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </span>
                          {openIndex === globalIndex ? (
                            <FiChevronUp className="text-primary-600 flex-shrink-0" size={24} />
                          ) : (
                            <FiChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                          )}
                        </button>
                        {openIndex === globalIndex && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">
                No results found for "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our customer support team
            is here to help!
          </p>
          
          <a
            href="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;