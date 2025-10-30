import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaUser, FaEnvelope, FaLock, FaSeedling, FaLeaf, FaTractor, FaArrowRight, FaCamera, FaMapMarkerAlt, FaPhone, FaCheck } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(email, password);
      } else {
        result = await signup(email, password, name, location, phone, profileImage);
      }

      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-green via-green-50 to-agri-gold relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10">
          <FaLeaf className="text-6xl text-white transform rotate-45" />
        </div>
        <div className="absolute top-40 right-20">
          <FaSeedling className="text-8xl text-white" />
        </div>
        <div className="absolute bottom-20 left-1/4">
          <FaTractor className="text-5xl text-white transform -rotate-12" />
        </div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full mb-6 shadow-lg">
              <FaSeedling className="text-4xl text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              AgriScan AI
            </h1>
            <p className="text-green-100 text-lg">
              Smart Farming Solutions
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
            {/* Tab Switcher */}
            <div className="flex bg-gray-100 bg-opacity-50">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 ${
                  isLogin
                    ? 'bg-white text-agri-green shadow-sm'
                    : 'text-gray-600 hover:text-agri-green'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 ${
                  !isLogin
                    ? 'bg-white text-agri-green shadow-sm'
                    : 'text-gray-600 hover:text-agri-green'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isLogin ? 'Welcome Back!' : 'Join Our Community'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {isLogin ? 'Sign in to your account' : 'Create your farming account'}
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
                    {/* Profile Image Upload */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-agri-green to-agri-gold rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                          {profileImage ? (
                            <img
                              src={URL.createObjectURL(profileImage)}
                              alt="Profile Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaUser className="text-2xl text-white" />
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          className="absolute -bottom-2 -right-2 w-8 h-8 bg-agri-green text-white rounded-full flex items-center justify-center shadow-lg hover:bg-agri-gold transition-colors duration-200"
                        >
                          <FaCamera className="text-xs" />
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaUser className="text-gray-400 text-sm" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required={!isLogin}
                          className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-agri-green transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Location Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaMapMarkerAlt className="text-gray-400 text-sm" />
                        </div>
                        <input
                          id="location"
                          name="location"
                          type="text"
                          required={!isLogin}
                          className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-agri-green transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="e.g., Lilongwe, Malawi"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaPhone className="text-gray-400 text-sm" />
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required={!isLogin}
                          className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-agri-green transition-all duration-200 bg-gray-50 focus:bg-white"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400 text-sm" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-agri-green transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400 text-sm" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-agri-green transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-agri-green to-agri-gold hover:from-agri-gold hover:to-agri-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-agri-green disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <FaArrowRight className="ml-2 text-sm" />
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-white text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-semibold text-agri-gold hover:text-white transition-colors duration-200 underline"
              >
                {isLogin ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
