import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane, FaHeadset, FaGlobe, FaStar } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-agri-green to-agri-gold rounded-full mb-6">
            <FaEnvelope className="text-white text-3xl" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Get in touch with our team. We&apos;re here to help you with your farming needs and answer any questions you may have.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-agri-green mb-2">1hr</div>
            <div className="text-gray-600">Response Time</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-agri-gold mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Languages</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.9</div>
            <div className="text-gray-600 flex items-center justify-center">
              <FaStar className="text-yellow-400 mr-1" />
              Rating
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-10 rounded-2xl shadow-xl">
            <div className="flex items-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-agri-green/10 rounded-full mr-4">
                <FaPaperPlane className="text-2xl text-agri-green" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Send us a message</h2>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-3">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent transition-all"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent transition-all resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-agri-green to-agri-gold text-white py-4 px-8 rounded-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg flex items-center justify-center"
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information & Support */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white p-10 rounded-2xl shadow-xl">
              <div className="flex items-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4">
                  <FaGlobe className="text-2xl text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Contact Information</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-agri-green/10 rounded-full flex-shrink-0">
                    <FaEnvelope className="text-xl text-agri-green" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Email</h3>
                    <p className="text-gray-600">support@agrosense.com</p>
                    <p className="text-sm text-gray-500 mt-1">We respond within 1 hour</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-agri-gold/10 rounded-full flex-shrink-0">
                    <FaPhone className="text-xl text-agri-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri 9AM-6PM PST</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full flex-shrink-0">
                    <FaMapMarkerAlt className="text-xl text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Address</h3>
                    <p className="text-gray-600">123 Agriculture Street<br />Farmville, CA 90210<br />United States</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full flex-shrink-0">
                    <FaClock className="text-xl text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Business Hours</h3>
                    <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM PST<br />Sat: 10:00 AM - 4:00 PM PST<br />Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Urgent Support */}
            <div className="bg-gradient-to-r from-agri-green to-agri-gold p-10 rounded-2xl text-white">
              <div className="flex items-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mr-4">
                  <FaHeadset className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold">Need immediate help?</h3>
              </div>
              <p className="mb-8 text-lg opacity-90 leading-relaxed">
                For urgent farming advice or technical support, our expert team is available to assist you 24/7.
              </p>
              <div className="space-y-4">
                <button className="w-full bg-white text-agri-green py-4 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg flex items-center justify-center">
                  <FaPhone className="mr-2" />
                  Call Now: +1 (555) 123-4567
                </button>
                <button className="w-full border-2 border-white text-white py-4 px-6 rounded-lg hover:bg-white/10 transition-all duration-300 font-semibold text-lg flex items-center justify-center">
                  <FaEnvelope className="mr-2" />
                  Live Chat Support
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white p-10 rounded-2xl shadow-xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-4 border-agri-green pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How accurate is the disease detection?</h3>
              <p className="text-gray-600">Our AI model achieves 95% accuracy across 50+ crop types and diseases.</p>
            </div>
            <div className="border-l-4 border-agri-gold pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is my data secure?</h3>
              <p className="text-gray-600">Yes, we use enterprise-grade encryption and never share your personal information.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Do you offer training?</h3>
              <p className="text-gray-600">We provide comprehensive training programs and documentation for all our tools.</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What languages do you support?</h3>
              <p className="text-gray-600">Our platform supports over 50 languages with 24/7 multilingual support.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
