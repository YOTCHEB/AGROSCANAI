import { FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaHeart, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-agri-green to-agri-gold p-3 rounded-xl">
                <FaLeaf className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AgriScan</h3>
                <p className="text-agri-green text-sm font-medium">AI</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Empowering farmers in Malawi with AI-driven agricultural solutions for better crop yields and sustainable farming practices.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-agri-green transition-colors duration-200">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-agri-green transition-colors duration-200">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-agri-green transition-colors duration-200">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-agri-green transition-colors duration-200">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Features Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Features</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-agri-green transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-agri-green rounded-full mr-3"></span>
                  Crop Disease Detection
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-agri-green transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-agri-green rounded-full mr-3"></span>
                  AI Farming Advice
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-agri-green transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-agri-green rounded-full mr-3"></span>
                  Market Price Tracking
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-agri-green transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-agri-green rounded-full mr-3"></span>
                  Planting Calendar
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-agri-green transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-agri-green rounded-full mr-3"></span>
                  Community Forum
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-agri-green transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-agri-green rounded-full mr-3"></span>
                  Farming Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-agri-green transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-agri-green rounded-full mr-3"></span>
                  Weather Updates
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-agri-green transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-agri-green rounded-full mr-3"></span>
                  Market Trends
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-agri-green transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-agri-green rounded-full mr-3"></span>
                  Research Papers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-agri-green transition-colors duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-agri-green rounded-full mr-3"></span>
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-agri-green mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">support@agriscan.ai</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaPhone className="text-agri-green mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">+265 1 234 567</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-agri-green mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Lilongwe, Malawi</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaGlobe className="text-agri-green mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">www.agriscan.ai</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h5 className="text-lg font-semibold mb-2 text-white">Stay Updated</h5>
            <p className="text-gray-300 text-sm mb-4">Get the latest farming tips and updates delivered to your inbox.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-agri-green to-agri-gold text-white px-6 py-2 rounded-r-lg hover:shadow-lg transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <p className="text-gray-300 text-sm">
                © 2024 AgriScan AI. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <span>Made with</span>
              <FaHeart className="text-red-500" />
              <span>for Malawi's farmers</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start space-x-6 text-xs text-gray-400">
            <a href="#" className="hover:text-agri-green transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-agri-green transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-agri-green transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
