import { FiAward, FiUsers, FiShoppingBag, FiTrendingUp } from 'react-icons/fi';

const About = () => {
  const stats = [
    { icon: FiUsers, label: 'Happy Customers', value: '50,000+' },
    { icon: FiShoppingBag, label: 'Products Sold', value: '100,000+' },
    { icon: FiAward, label: 'Years Experience', value: '5+' },
    { icon: FiTrendingUp, label: 'Growth Rate', value: '200%' },
  ];

  const team = [
    {
      name: 'John Doe',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Jane Smith',
      role: 'Chief Technology Officer',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      name: 'Mike Johnson',
      role: 'Head of Operations',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      name: 'Sarah Williams',
      role: 'Customer Success Manager',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">About E-Shop</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Your trusted online shopping destination for quality products at
            competitive prices. We're committed to delivering excellence in
            every order.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-primary-600" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Founded in 2019, E-Shop began with a simple mission: to make
                quality products accessible to everyone at competitive prices.
                What started as a small online store has grown into a trusted
                e-commerce platform serving thousands of customers across the
                country.
              </p>
              <p>
                We believe in the power of technology to transform shopping
                experiences. Our platform combines cutting-edge technology with
                personalized customer service to ensure every purchase is
                smooth, secure, and satisfying.
              </p>
              <p>
                Today, we offer thousands of products across multiple
                categories, from electronics to fashion, all carefully curated
                to meet our high standards of quality. Our commitment to
                customer satisfaction drives everything we do, from product
                selection to after-sales support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <FiAward className="text-blue-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To provide customers with a seamless online shopping experience,
                offering quality products, competitive prices, and exceptional
                customer service. We strive to be the preferred choice for
                online shopping in India.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <FiTrendingUp className="text-purple-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To become India's most trusted and innovative e-commerce
                platform, known for quality, reliability, and customer
                satisfaction. We envision a future where online shopping is
                effortless and enjoyable for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Customer First
              </h3>
              <p className="text-gray-600">
                Every decision we make starts with our customers' needs and
                satisfaction in mind.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality</h3>
              <p className="text-gray-600">
                We never compromise on product quality and only partner with
                trusted brands.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Integrity
              </h3>
              <p className="text-gray-600">
                We operate with transparency, honesty, and ethical practices in
                all our dealings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the best in
            online shopping.
          </p>
          
          <a
            href="/products"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Browse Products
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;