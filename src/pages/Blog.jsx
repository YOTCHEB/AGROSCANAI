import { FaCalendarAlt, FaUser, FaTag, FaArrowRight, FaLeaf, FaSearch, FaFilter, FaNewspaper, FaLightbulb, FaShieldAlt, FaWater } from 'react-icons/fa';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Agriculture",
      excerpt: "Discover how artificial intelligence is revolutionizing farming practices and crop management with cutting-edge technology.",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      category: "Technology",
      readTime: "5 min read",
      image: "/api/placeholder/400/250",
      featured: true
    },
    {
      id: 2,
      title: "Sustainable Farming: Best Practices for 2024",
      excerpt: "Learn about the latest sustainable farming techniques that can help you reduce costs and increase yields while protecting the environment.",
      author: "Mike Chen",
      date: "2024-01-10",
      category: "Sustainability",
      readTime: "7 min read",
      image: "/api/placeholder/400/250",
      featured: false
    },
    {
      id: 3,
      title: "Common Crop Diseases and How to Prevent Them",
      excerpt: "A comprehensive guide to identifying and preventing the most common crop diseases in your region with early detection strategies.",
      author: "Dr. Emily Rodriguez",
      date: "2024-01-05",
      category: "Disease Prevention",
      readTime: "6 min read",
      image: "/api/placeholder/400/250",
      featured: false
    },
    {
      id: 4,
      title: "Maximizing Crop Yields with Smart Irrigation",
      excerpt: "Explore innovative irrigation techniques that can help you optimize water usage and boost productivity in water-scarce regions.",
      author: "Tom Wilson",
      date: "2023-12-28",
      category: "Irrigation",
      readTime: "4 min read",
      image: "/api/placeholder/400/250",
      featured: false
    },
    {
      id: 5,
      title: "Organic Farming: Myths vs Reality",
      excerpt: "Debunking common misconceptions about organic farming and exploring its benefits for soil health and long-term sustainability.",
      author: "Lisa Park",
      date: "2023-12-20",
      category: "Organic Farming",
      readTime: "8 min read",
      image: "/api/placeholder/400/250",
      featured: false
    },
    {
      id: 6,
      title: "Climate Change Impact on Crop Production",
      excerpt: "Understanding how climate change affects agricultural productivity and strategies for building resilient farming systems.",
      author: "Dr. Robert Kim",
      date: "2023-12-15",
      category: "Climate Change",
      readTime: "10 min read",
      image: "/api/placeholder/400/250",
      featured: false
    }
  ];

  const categories = ["All", "Technology", "Sustainability", "Disease Prevention", "Irrigation", "Organic Farming", "Climate Change"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-agri-green to-agri-gold rounded-full mb-6">
            <FaNewspaper className="text-white text-3xl" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">AgroSense Blog</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Stay updated with the latest trends, tips, and insights in modern agriculture and farming technology.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <FaFilter className="text-gray-400" />
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent">
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Article */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 hover:shadow-2xl transition-all duration-300">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-br from-agri-green to-agri-gold flex items-center justify-center">
                  <div className="text-center text-white">
                    <FaLeaf className="text-6xl mx-auto mb-4 opacity-80" />
                    <span className="text-2xl font-bold">Featured Article</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-agri-green bg-opacity-20 text-agri-green">
                    <FaTag className="mr-2" />
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-agri-green to-agri-gold rounded-full flex items-center justify-center">
                      <FaUser className="text-white text-sm" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-900">{post.author}</span>
                      <p className="text-xs text-gray-500">{post.readTime}</p>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-agri-green to-agri-gold text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold flex items-center">
                    Read More <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-agri-green to-agri-gold flex items-center justify-center relative">
                <div className="text-center text-white">
                  {post.category === 'Technology' && <FaLightbulb className="text-4xl mx-auto mb-2 opacity-80" />}
                  {post.category === 'Sustainability' && <FaLeaf className="text-4xl mx-auto mb-2 opacity-80" />}
                  {post.category === 'Disease Prevention' && <FaShieldAlt className="text-4xl mx-auto mb-2 opacity-80" />}
                  {post.category === 'Irrigation' && <FaWater className="text-4xl mx-auto mb-2 opacity-80" />}
                  <span className="text-lg font-semibold">Article Image</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                    <FaTag className="mr-1" />
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500 flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-agri-green to-agri-gold rounded-full flex items-center justify-center">
                      <FaUser className="text-white text-xs" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{post.author}</span>
                  </div>
                  <button className="text-agri-green hover:text-agri-gold font-semibold flex items-center transition-colors text-sm">
                    Read More <FaArrowRight className="ml-1 text-xs" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-agri-green to-agri-gold p-12 rounded-2xl text-white text-center">
          <FaNewspaper className="text-5xl mx-auto mb-6 opacity-80" />
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-xl mb-8 opacity-90">Subscribe to our newsletter for the latest farming insights and tips</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-agri-green px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Subscribe
            </button>
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-white text-agri-green border-2 border-agri-green px-8 py-4 rounded-lg hover:bg-agri-green hover:text-white transition-all duration-300 font-semibold text-lg">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
