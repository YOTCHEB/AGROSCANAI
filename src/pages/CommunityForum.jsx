import { useState, useEffect } from 'react';
import { databases } from '../lib/appwrite';
import { useAuth } from '../hooks/useAuth';
import { ID, Query } from 'appwrite';
import { FaUsers, FaPlus, FaHeart, FaComment, FaCalendarAlt, FaUser, FaSpinner, FaExclamationTriangle, FaCheckCircle, FaFire, FaLightbulb, FaShieldAlt, FaTag } from 'react-icons/fa';

const CommunityForum = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'posts', // Replace with your collection ID
        [Query.orderDesc('$createdAt'), Query.limit(20)]
      );
      setPosts(response.documents);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load forum posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !user) return;

    setPosting(true);
    try {
      const postData = {
        userId: user.$id,
        authorName: user.name,
        content: newPost.trim(),
        likes: 0,
        replies: []
      };

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'posts',
        ID.unique(),
        postData
      );

      setNewPost('');
      fetchPosts(); // Refresh posts
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post');
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId, currentLikes) => {
    if (!user) return;

    try {
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'posts',
        postId,
        { likes: currentLikes + 1 }
      );
      fetchPosts(); // Refresh posts
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-agri-green mx-auto mb-4" />
          <p className="text-gray-600">Loading community posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-agri-green to-agri-gold rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-full">
              <FaUsers className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Community Forum</h1>
          <p className="text-green-100 text-lg">
            Connect with fellow farmers, share experiences, and get advice from the community.
          </p>
        </div>
      </div>

      {/* New Post Form */}
      {user && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <FaPlus className="text-agri-green text-2xl mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Share your thoughts</h3>
          </div>
          <form onSubmit={handleSubmitPost}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind? Ask questions, share tips, or discuss farming topics..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-agri-green resize-none transition-colors"
              rows={4}
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">{newPost.length}/1000</span>
              <button
                type="submit"
                disabled={posting || !newPost.trim()}
                className="bg-gradient-to-r from-agri-green to-agri-gold text-white px-6 py-3 rounded-lg hover:from-agri-gold hover:to-agri-green disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
              >
                {posting ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Posting...
                  </>
                ) : (
                  <>
                    <FaPlus className="mr-2" />
                    Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-800">{error}</div>
        </div>
      )}

      {/* Posts */}
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.$id} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-agri-green to-agri-gold rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-lg" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {post.authorName || 'Anonymous'}
                    </h4>
                    <div className="flex items-center text-gray-500 text-sm">
                      <FaCalendarAlt className="mr-1" />
                      {new Date(post.$createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed mb-4">{post.content}</p>
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(post.$id, post.likes || 0)}
                      className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <FaHeart className="text-lg" />
                      <span className="font-medium">{post.likes || 0}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-agri-green transition-colors">
                      <FaComment className="text-lg" />
                      <span className="font-medium">{post.replies?.length || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
            <FaUsers className="text-6xl text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">No posts yet</h3>
            <p className="text-gray-500 text-lg">Be the first to start a conversation!</p>
          </div>
        )}
      </div>

      {/* Community Guidelines */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center mb-6">
          <FaShieldAlt className="text-blue-600 text-2xl mr-3" />
          <h4 className="text-xl font-semibold text-blue-900">Community Guidelines</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white bg-opacity-70 rounded-xl p-6">
            <h5 className="font-semibold text-blue-800 mb-4 flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              Do's
            </h5>
            <ul className="text-sm text-blue-700 space-y-3">
              <li className="flex items-start">
                <span className="text-agri-green mr-2">•</span>
                Share farming experiences and tips
              </li>
              <li className="flex items-start">
                <span className="text-agri-green mr-2">•</span>
                Ask questions about crops and techniques
              </li>
              <li className="flex items-start">
                <span className="text-agri-green mr-2">•</span>
                Help fellow farmers with advice
              </li>
              <li className="flex items-start">
                <span className="text-agri-green mr-2">•</span>
                Respect different farming methods
              </li>
            </ul>
          </div>
          <div className="bg-white bg-opacity-70 rounded-xl p-6">
            <h5 className="font-semibold text-blue-800 mb-4 flex items-center">
              <FaExclamationTriangle className="text-red-500 mr-2" />
              Don'ts
            </h5>
            <ul className="text-sm text-blue-700 space-y-3">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Post inappropriate or offensive content
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Share unverified information
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Spam or promote commercial products
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Engage in arguments or conflicts
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <FaFire className="text-orange-500 text-2xl mr-3" />
          <h4 className="text-xl font-semibold text-gray-900">Popular Topics</h4>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            'Maize Diseases',
            'Organic Farming',
            'Irrigation Tips',
            'Market Prices',
            'Seed Selection',
            'Pest Control',
            'Soil Management',
            'Weather Impact'
          ].map((topic, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-sm hover:from-agri-green hover:to-agri-gold hover:text-white transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
            >
              <FaTag className="mr-2" />
              #{topic.toLowerCase().replace(' ', '')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;
