import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { databases } from '../lib/appwrite';
import { Query } from 'appwrite';
import {
  FaCamera,
  FaComments,
  FaUsers,
  FaLeaf,
  FaChartLine,
  FaRocket,
  FaCalendarAlt,
  FaSeedling,
  FaCheckCircle,
  FaArrowRight,
  FaCloudSun,
  FaThermometerHalf,
  FaTint,
  FaWind,
  FaSun,
  FaCloudRain,
  FaExclamationTriangle,
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaBell,
  FaCog,
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaShoppingCart,
  FaNewspaper
} from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    scans: 0,
    advice: 0,
    posts: 0
  });
  const [recentScans, setRecentScans] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch scan history
      const scansResponse = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'scans', // Replace with your collection ID
        [Query.equal('userId', user.$id), Query.limit(5), Query.orderDesc('$createdAt')]
      );

      // Fetch advice history
      const adviceResponse = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'advice', // Replace with your collection ID
        [Query.equal('userId', user.$id), Query.limit(5), Query.orderDesc('$createdAt')]
      );

      // Fetch forum posts
      const postsResponse = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'posts', // Replace with your collection ID
        [Query.equal('userId', user.$id), Query.limit(5), Query.orderDesc('$createdAt')]
      );

      setStats({
        scans: scansResponse.total,
        advice: adviceResponse.total,
        posts: postsResponse.total
      });

      setRecentScans(scansResponse.documents);

      // Mock weather data for Malawi (Lilongwe coordinates)
      setWeather({
        temp: 28,
        humidity: 65,
        description: 'Partly cloudy',
        icon: '02d',
        location: 'Lilongwe, Malawi'
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-agri-green to-agri-gold">
          <div className="flex items-center">
            <FaSeedling className="text-2xl text-white mr-2" />
            <span className="text-xl font-bold text-white">AgroSense</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-3 text-gray-700 bg-agri-green bg-opacity-10 rounded-lg hover:bg-agri-green hover:text-white transition-colors"
            >
              <FaHome className="mr-3" />
              Dashboard
            </Link>
            <Link
              to="/scan"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-agri-green hover:text-white transition-colors"
            >
              <FaCamera className="mr-3" />
              Crop Scan
            </Link>
            <Link
              to="/advice"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-agri-green hover:text-white transition-colors"
            >
              <FaComments className="mr-3" />
              Farming Advice
            </Link>
            <Link
              to="/calendar"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-agri-green hover:text-white transition-colors"
            >
              <FaCalendarAlt className="mr-3" />
              Planting Calendar
            </Link>
            <Link
              to="/market"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-agri-green hover:text-white transition-colors"
            >
              <FaShoppingCart className="mr-3" />
              Market Prices
            </Link>
            <Link
              to="/forum"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-agri-green hover:text-white transition-colors"
            >
              <FaUsers className="mr-3" />
              Community Forum
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-agri-green hover:text-white transition-colors"
            >
              <FaUser className="mr-3" />
              Profile
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <FaBars className="text-xl" />
            </button>
            <div className="flex items-center space-x-4">
              <FaBell className="text-gray-400 hover:text-gray-600 cursor-pointer" />
              <FaCog className="text-gray-400 hover:text-gray-600 cursor-pointer" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-agri-green rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-700 font-medium">{user?.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100">
              <div className="bg-gradient-to-r from-agri-green to-agri-gold p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-white bg-opacity-20 p-3 rounded-full">
                      <FaSeedling className="text-3xl text-white" />
                    </div>
                  </div>
                  <div className="ml-6 w-0 flex-1">
                    <h1 className="text-2xl font-bold text-white">
                      Welcome back, {user?.name}!
                    </h1>
                    <p className="mt-2 text-green-100 text-lg">
                      Here's what's happening with your farm today.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center flex flex-col items-center">
                    <FaLeaf className="text-3xl text-agri-green mb-2" />
                    <div className="text-sm text-gray-600">Healthy Crops</div>
                  </div>
                  <div className="text-center flex flex-col items-center">
                    <FaChartLine className="text-3xl text-agri-gold mb-2" />
                    <div className="text-sm text-gray-600">Data-Driven</div>
                  </div>
                  <div className="text-center flex flex-col items-center">
                    <FaRocket className="text-3xl text-blue-600 mb-2" />
                    <div className="text-sm text-gray-600">AI Powered</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Link to="/scan" className="group">
                <div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-agri-green to-agri-gold p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-white bg-opacity-20 p-3 rounded-full">
                          <FaCamera className="text-3xl text-agri-green" />
                        </div>
                      </div>
                      <div className="ml-4 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-semibold text-green-100 uppercase tracking-wide">
                            Crop Scans
                          </dt>
                          <dd className="text-3xl font-bold text-white">
                            {stats.scans}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4">
                    <div className="text-sm font-semibold text-agri-green group-hover:text-agri-gold flex items-center">
                      Scan new crop <FaArrowRight className="ml-2" />
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/advice" className="group">
                <div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-white bg-opacity-20 p-3 rounded-full">
                          <FaComments className="text-3xl text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-semibold text-blue-100 uppercase tracking-wide">
                            Advice Sessions
                          </dt>
                          <dd className="text-3xl font-bold text-white">
                            {stats.advice}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4">
                    <div className="text-sm font-semibold text-blue-700 group-hover:text-blue-800 flex items-center">
                      Get farming advice <FaArrowRight className="ml-2" />
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/forum" className="group">
                <div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-white bg-opacity-20 p-3 rounded-full">
                          <FaUsers className="text-3xl text-purple-600" />
                        </div>
                      </div>
                      <div className="ml-4 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-semibold text-purple-100 uppercase tracking-wide">
                            Forum Posts
                          </dt>
                          <dd className="text-3xl font-bold text-white">
                            {stats.posts}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4">
                    <div className="text-sm font-semibold text-purple-700 group-hover:text-purple-800 flex items-center">
                      Visit community <FaArrowRight className="ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Weather Widget and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Widget */}
        <div className="bg-white shadow-xl overflow-hidden rounded-2xl border border-gray-100">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5 border-b border-gray-200">
            <h3 className="text-xl font-bold text-white flex items-center">
              <FaCloudSun className="mr-3" />
              Weather Today
            </h3>
            <p className="mt-1 text-sm text-blue-100">
              Current conditions in your area
            </p>
          </div>
          <div className="p-6">
            {weather ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">
                    {weather.icon.includes('01') || weather.icon.includes('02') ? (
                      <FaSun className="text-yellow-500" />
                    ) : weather.icon.includes('03') || weather.icon.includes('04') ? (
                      <FaCloudSun className="text-gray-500" />
                    ) : (
                      <FaCloudRain className="text-blue-500" />
                    )}
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{weather.temp}°C</div>
                    <div className="text-sm text-gray-600 capitalize">{weather.description}</div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaMapMarkerAlt className="mr-1" />
                      {weather.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <FaTint className="mr-1 text-blue-500" />
                    {weather.humidity}% humidity
                  </div>
                  <div className="text-sm text-gray-500">
                    Perfect for farming
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FaCloudSun className="text-4xl text-gray-400 mb-4 mx-auto" />
                <div className="text-gray-500">Loading weather data...</div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow-xl overflow-hidden rounded-2xl border border-gray-100">
          <div className="bg-gradient-to-r from-agri-green to-agri-gold px-6 py-5 border-b border-gray-200">
            <h3 className="text-xl font-bold text-white flex items-center">
              <FaRocket className="mr-3" />
              Quick Actions
            </h3>
            <p className="mt-1 text-sm text-green-100">
              Jump into your farming tasks
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/scan"
                className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-md transition-all duration-200 group"
              >
                <FaCamera className="text-2xl text-agri-green mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Scan Crop</span>
              </Link>
              <Link
                to="/advice"
                className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-all duration-200 group"
              >
                <FaComments className="text-2xl text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Get Advice</span>
              </Link>
              <Link
                to="/calendar"
                className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition-all duration-200 group"
              >
                <FaCalendarAlt className="text-2xl text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Planting Calendar</span>
              </Link>
              <Link
                to="/market"
                className="flex flex-col items-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl hover:shadow-md transition-all duration-200 group"
              >
                <FaChartLine className="text-2xl text-yellow-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Market Prices</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Scans */}
      <div className="bg-white shadow-xl overflow-hidden rounded-2xl border border-gray-100">
        <div className="bg-gradient-to-r from-agri-green to-agri-gold px-6 py-5 border-b border-gray-200">
          <h3 className="text-xl font-bold text-white flex items-center">
            <FaCamera className="mr-3" />
            Recent Crop Scans
          </h3>
          <p className="mt-1 text-sm text-green-100">
            Your latest crop disease detections and solutions.
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {recentScans.length > 0 ? (
            recentScans.map((scan) => (
              <li key={scan.$id} className="hover:bg-gray-50 transition-colors">
                <div className="px-6 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-agri-green bg-opacity-20 p-3 rounded-full">
                          <FaLeaf className="text-2xl text-agri-green" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-semibold text-gray-900">
                          {scan.disease || 'Disease Detected'}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <FaCalendarAlt className="mr-2 text-agri-gold" />
                          {new Date(scan.$createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {scan.confidence && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-agri-green bg-opacity-20 text-agri-green">
                          <FaCheckCircle className="mr-1" />
                          {Math.round(scan.confidence * 100)}% confidence
                        </span>
                      )}
                      <FaArrowRight className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li>
              <div className="px-6 py-8 text-center">
                <FaCamera className="text-4xl text-gray-400 mb-4 mx-auto" />
                <div className="text-gray-500 mb-4">No scans yet. Start your first crop analysis!</div>
                <Link
                  to="/scan"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-agri-green hover:bg-agri-gold transition-colors shadow-md hover:shadow-lg"
                >
                  <FaCamera className="mr-2" />
                  Start Scanning Crops
                </Link>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  </main>
  </div>
</div>
  );
};

export default Dashboard;
