import { FaLeaf, FaUsers, FaRocket, FaShieldAlt, FaHandshake, FaAward, FaGlobe, FaHeart, FaUserTie, FaUser, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-agri-green to-agri-gold rounded-full mb-6">
            <FaLeaf className="text-white text-3xl" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About AgroSense</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Empowering farmers with AI-driven crop disease detection and smart farming solutions for a sustainable future.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-agri-green mb-2">10K+</div>
            <div className="text-gray-600">Farmers Served</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-agri-gold mb-2">95%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Crop Types</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-agri-green/10 rounded-full mb-6">
              <FaLeaf className="text-3xl text-agri-green" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainable Farming</h3>
            <p className="text-gray-600 leading-relaxed">Promoting eco-friendly farming practices that protect our environment and ensure long-term agricultural viability.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-agri-gold/10 rounded-full mb-6">
              <FaUsers className="text-3xl text-agri-gold" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Community Driven</h3>
            <p className="text-gray-600 leading-relaxed">Building a supportive community of farmers sharing knowledge, experiences, and best practices worldwide.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <FaRocket className="text-3xl text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">AI Powered</h3>
            <p className="text-gray-600 leading-relaxed">Leveraging cutting-edge AI technology for accurate crop disease detection and predictive farming insights.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <FaShieldAlt className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Reliable Solutions</h3>
            <p className="text-gray-600 leading-relaxed">Providing trustworthy tools and advice for farmers worldwide with enterprise-grade reliability.</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white p-12 rounded-2xl shadow-xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-agri-green to-agri-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-agri-green to-agri-gold rounded-full mb-6">
                <FaUserTie className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Yotcheb Kandolo Jean</h3>
              <p className="text-lg text-agri-green font-semibold mb-4">CEO & Founder</p>
              <p className="text-gray-600 leading-relaxed">
                Visionary leader with a passion for revolutionizing agriculture through technology.
                Founded AgroSense to bridge the gap between traditional farming and AI innovation.
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <a href="#" className="text-agri-green hover:text-agri-gold transition-colors">
                  <FaLinkedin className="text-2xl" />
                </a>
                <a href="#" className="text-agri-green hover:text-agri-gold transition-colors">
                  <FaTwitter className="text-2xl" />
                </a>
                <a href="#" className="text-agri-green hover:text-agri-gold transition-colors">
                  <FaGithub className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-agri-gold to-blue-600 rounded-full mb-6">
                <FaUser className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">IRA Desire</h3>
              <p className="text-lg text-agri-gold font-semibold mb-4">Marketing Assistant & Customer Service</p>
              <p className="text-gray-600 leading-relaxed">
                Dedicated to building strong relationships with our farming community and ensuring
                exceptional customer experiences through innovative marketing strategies.
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <a href="#" className="text-agri-green hover:text-agri-gold transition-colors">
                  <FaLinkedin className="text-2xl" />
                </a>
                <a href="#" className="text-agri-green hover:text-agri-gold transition-colors">
                  <FaTwitter className="text-2xl" />
                </a>
                <a href="#" className="text-agri-green hover:text-agri-gold transition-colors">
                  <FaGithub className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white p-12 rounded-2xl shadow-xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-agri-green to-agri-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At AgroSense, we believe that technology should serve humanity, especially those who feed the world.
                Our mission is to democratize access to advanced farming tools, making AI-powered crop disease detection
                and farming advice available to farmers of all sizes.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                By combining machine learning with agricultural expertise, we&apos;re helping farmers increase yields,
                reduce losses, and build more sustainable farming practices that benefit both people and the planet.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-agri-green/10 rounded-full mb-4">
                  <FaHandshake className="text-xl text-agri-green" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Partnership</h4>
                <p className="text-sm text-gray-600">Collaborating with farmers and experts</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-agri-gold/10 rounded-full mb-4">
                  <FaAward className="text-xl text-agri-gold" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Excellence</h4>
                <p className="text-sm text-gray-600">Delivering top-tier solutions</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <FaGlobe className="text-xl text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Global Reach</h4>
                <p className="text-sm text-gray-600">Supporting farmers worldwide</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <FaHeart className="text-xl text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Passion</h4>
                <p className="text-sm text-gray-600">Committed to agricultural innovation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-agri-green to-agri-gold p-12 rounded-2xl text-white">
            <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
            <p className="text-xl mb-8 opacity-90">Be part of the future of smart farming</p>
            <button className="bg-white text-agri-green px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
