import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { databases, storage } from '../lib/appwrite';
import { Query } from 'appwrite';
import { FaUser, FaCamera, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaSignOutAlt, FaLeaf, FaRobot, FaUsers, FaCrown, FaCheckCircle, FaStar, FaShieldAlt, FaPhone } from 'react-icons/fa';

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ scans: 0, advice: 0, posts: 0 });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', bio: '', location: '', phone: '' });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchStats();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      // Try to get existing profile
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'profilesdb',
        [Query.equal('userId', user.$id)]
      );

      if (response.documents.length > 0) {
        const userProfile = response.documents[0];
        setProfile(userProfile);
        setFormData({
          name: userProfile.name || user.name,
          bio: userProfile.bio || '',
          location: userProfile.location || '',
          phone: userProfile.phone || '',
          ImageUrl: userProfile.profileImageUrl || null
        });
      } else {
        // Create default profile
        setFormData({
          name: user.name,
          bio: '',
          location: '',
          phone: ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const [scansRes, adviceRes, postsRes] = await Promise.all([
        databases.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, 'scansdb', [Query.equal('userId', user.$id)]),
        databases.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, 'advicedb', [Query.equal('userId', user.$id)]),
        databases.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, 'postsdb', [Query.equal('userId', user.$id)])
      ]);

      setStats({
        scans: scansRes.total,
        advice: adviceRes.total,
        posts: postsRes.total
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const profileData = {
        userId: user.$id,
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
        phone: formData.phone,
        profileImageUrl: profile?.profileImageUrl || null,
        updatedAt: new Date().toISOString()
      };

      if (profile) {
        await databases.updateDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          'profilesdb',
          profile.$id,
          profileData
        );
      } else {
        await databases.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          'profilesdb',
          user.$id,
          profileData
        );
      }

      setEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agri-green"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-agri-green to-agri-gold rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                {profile?.profileImageUrl ? (
                  <img
                    src={profile.profileImageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg">
                <FaCamera className="text-agri-green text-lg" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              {editing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl px-4 py-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    placeholder="Your name"
                  />
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl px-4 py-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 resize-none"
                    rows={3}
                    placeholder="Tell us about your farming experience..."
                  />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl px-4 py-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    placeholder="Your location (e.g., Lilongwe, Malawi)"
                  />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl px-4 py-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    placeholder="Your phone number"
                  />
                  <div className="flex space-x-3 justify-center lg:justify-start">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center space-x-2 bg-white text-agri-green px-6 py-3 rounded-xl hover:bg-opacity-90 transition-all duration-200 shadow-lg"
                    >
                      <FaSave className="text-sm" />
                      <span className="font-medium">Save Profile</span>
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="flex items-center space-x-2 bg-white bg-opacity-20 text-white px-6 py-3 rounded-xl hover:bg-opacity-30 transition-all duration-200"
                    >
                      <FaTimes className="text-sm" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {profile?.name || user?.name || 'User'}
                  </h1>
                  <p className="text-green-100 text-lg mb-3">
                    {profile?.bio || 'No bio yet. Tell us about your farming journey!'}
                  </p>
                  {profile?.location && (
                    <div className="flex items-center justify-center lg:justify-start text-green-100 mb-4">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile?.phone && (
                    <div className="flex items-center justify-center lg:justify-start text-green-100 mb-4">
                      <FaPhone className="mr-2" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center space-x-2 bg-white bg-opacity-20 text-white px-6 py-3 rounded-xl hover:bg-opacity-30 transition-all duration-200 mx-auto lg:mx-0"
                  >
                    <FaEdit className="text-sm" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100 hover:shadow-2xl transition-shadow duration-200">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaLeaf className="text-2xl text-agri-green" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.scans}</div>
          <div className="text-gray-600 font-medium">Crop Scans</div>
          <div className="text-sm text-gray-500 mt-1">Disease detections performed</div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100 hover:shadow-2xl transition-shadow duration-200">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaRobot className="text-2xl text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.advice}</div>
          <div className="text-gray-600 font-medium">AI Consultations</div>
          <div className="text-sm text-gray-500 mt-1">Farming advice sessions</div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100 hover:shadow-2xl transition-shadow duration-200">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaUsers className="text-2xl text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.posts}</div>
          <div className="text-gray-600 font-medium">Community Posts</div>
          <div className="text-sm text-gray-500 mt-1">Forum contributions</div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <FaShieldAlt className="text-agri-green text-2xl mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Account Settings</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-900 font-medium">{user?.email}</span>
                <FaCheckCircle className="text-green-500 ml-auto" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Account Created</label>
              <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-900 font-medium">
                  {user?.$createdAt ? new Date(user.$createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Unknown'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Account Status</label>
              <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-xl">
                <FaCheckCircle className="text-green-600 mr-3" />
                <span className="text-green-800 font-medium">Active Account</span>
              </div>
            </div>
            <div className="pt-4 border-t">
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors duration-200 w-full justify-center"
              >
                <FaSignOutAlt className="text-lg" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Status */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center mb-2">
              <FaCrown className="text-yellow-600 text-xl mr-3" />
              <h3 className="text-xl font-bold text-gray-900">Free Plan</h3>
            </div>
            <p className="text-gray-600">
              You're currently on the free plan with basic features. Upgrade for unlimited access!
            </p>
          </div>
          <button className="bg-gradient-to-r from-agri-green to-agri-gold text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
            <FaStar className="text-sm" />
            <span className="font-medium">Upgrade to Premium</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-60 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">5</div>
            <div className="text-sm text-gray-600 font-medium">Scans/month</div>
          </div>
          <div className="bg-white bg-opacity-60 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">10</div>
            <div className="text-sm text-gray-600 font-medium">AI Consultations</div>
          </div>
          <div className="bg-white bg-opacity-60 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">Basic</div>
            <div className="text-sm text-gray-600 font-medium">Market Data</div>
          </div>
          <div className="bg-white bg-opacity-60 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">Community</div>
            <div className="text-sm text-gray-600 font-medium">Access</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
