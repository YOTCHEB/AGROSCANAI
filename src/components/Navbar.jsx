import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaBars, FaTimes, FaLeaf, FaUser, FaSignOutAlt, FaHome, FaSearch, FaRobot, FaChartLine, FaCalendarAlt, FaUsers, FaInfoCircle, FaEnvelope, FaBlog } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navItems = user ? [
    { to: '/', label: 'Dashboard', icon: FaHome },
  ] : [];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="bg-gradient-to-r from-agri-green to-agri-gold p-2 rounded-lg">
                <FaLeaf className="text-white text-xl" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gray-900">AgriScan</span>
                <span className="text-sm text-agri-green font-medium block">AI</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {user ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-all duration-200"
                  >
                    <item.icon className="text-sm" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-all duration-200">
                    <FaSearch className="text-sm" />
                    <span className="text-sm font-medium">Services</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link
                        to="/scan"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-agri-green hover:text-white transition-colors"
                      >
                        <FaSearch className="text-sm" />
                        <span>Crop Scan</span>
                      </Link>
                      <Link
                        to="/advice"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-agri-green hover:text-white transition-colors"
                      >
                        <FaRobot className="text-sm" />
                        <span>Farming Advice</span>
                      </Link>
                      <Link
                        to="/market"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-agri-green hover:text-white transition-colors"
                      >
                        <FaChartLine className="text-sm" />
                        <span>Market Prices</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-all duration-200">
                    <FaInfoCircle className="text-sm" />
                    <span className="text-sm font-medium">More</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link
                        to="/about"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-agri-green hover:text-white transition-colors"
                      >
                        <FaInfoCircle className="text-sm" />
                        <span>About Us</span>
                      </Link>
                      <Link
                        to="/contact"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-agri-green hover:text-white transition-colors"
                      >
                        <FaEnvelope className="text-sm" />
                        <span>Contact Us</span>
                      </Link>
                      <Link
                        to="/blog"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-agri-green hover:text-white transition-colors"
                      >
                        <FaBlog className="text-sm" />
                        <span>Blog</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-all duration-200">
                    <FaUsers className="text-sm" />
                    <span className="text-sm font-medium">Community</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link
                        to="/forum"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-agri-green hover:text-white transition-colors"
                      >
                        <FaUsers className="text-sm" />
                        <span>Community Forum</span>
                      </Link>
                      <Link
                        to="/calendar"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-agri-green hover:text-white transition-colors"
                      >
                        <FaCalendarAlt className="text-sm" />
                        <span>Planting Calendar</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-all duration-200">
                    <FaUser className="text-sm" />
                    <span className="text-sm font-medium">Account</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-agri-green hover:text-white transition-colors"
                      >
                        <FaUser className="text-sm" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <FaSignOutAlt className="text-sm" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-agri-green to-agri-gold text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-colors duration-200"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMenu}
                      className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-all duration-200"
                    >
                      <item.icon className="text-lg" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    to="/scan"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-all duration-200"
                  >
                    <FaSearch className="text-lg" />
                    <span className="font-medium">Crop Scan</span>
                  </Link>
                  <Link
                    to="/advice"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-all duration-200"
                  >
                    <FaRobot className="text-lg" />
                    <span className="font-medium">Farming Advice</span>
                  </Link>
                  <Link
                    to="/market"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-all duration-200"
                  >
                    <FaChartLine className="text-lg" />
                    <span className="font-medium">Market Prices</span>
                  </Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    to="/forum"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-all duration-200"
                  >
                    <FaUsers className="text-lg" />
                    <span className="font-medium">Community Forum</span>
                  </Link>
                  <Link
                    to="/calendar"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-all duration-200"
                  >
                    <FaCalendarAlt className="text-lg" />
                    <span className="font-medium">Planting Calendar</span>
                  </Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    to="/about"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-all duration-200"
                  >
                    <FaInfoCircle className="text-lg" />
                    <span className="font-medium">About Us</span>
                  </Link>
                  <Link
                    to="/contact"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-all duration-200"
                  >
                    <FaEnvelope className="text-lg" />
                    <span className="font-medium">Contact Us</span>
                  </Link>
                  <Link
                    to="/blog"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-all duration-200"
                  >
                    <FaBlog className="text-lg" />
                    <span className="font-medium">Blog</span>
                  </Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-agri-green hover:bg-agri-green/10 transition-all duration-200"
                  >
                    <FaUser className="text-lg" />
                    <span className="font-medium">Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-3 py-3 text-left text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center space-x-2 w-full px-3 py-3 bg-gradient-to-r from-agri-green to-agri-gold text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  <span className="font-medium">Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
