import { useState, useRef, useEffect } from 'react';
import { getFarmingAdvice } from '../utils/api';
import { databases } from '../lib/appwrite';
import { useAuth } from '../hooks/useAuth';
import { ID, Query } from 'appwrite';
import { FaRobot, FaUser, FaPaperPlane, FaTrash, FaQuestionCircle, FaLightbulb } from 'react-icons/fa';

const FarmingAdvice = () => {
  const { user } = useAuth();
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    // Load previous conversations from database
    if (user) {
      loadConversationHistory();
    }
  }, [user]);

  const loadConversationHistory = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'advice', // Replace with your collection ID
        [Query.equal('userId', user.$id), Query.orderDesc('$createdAt'), Query.limit(50)]
      );

      // Group conversations by session or load the latest one
      if (response.documents.length > 0) {
        const latestConversation = response.documents[0].conversation || [];
        setConversation(latestConversation);
      }
    } catch (error) {
      console.error('Error loading conversation history:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    const userMessage = { role: 'user', content: question.trim(), timestamp: new Date() };
    const newConversation = [...conversation, userMessage];
    setConversation(newConversation);
    setQuestion('');
    setLoading(true);
    setError('');

    try {
      const advice = await getFarmingAdvice(question, conversation);

      const aiMessage = { role: 'assistant', content: advice, timestamp: new Date() };
      const updatedConversation = [...newConversation, aiMessage];
      setConversation(updatedConversation);

      // Save to database
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'advice',
        ID.unique(),
        {
          userId: user.$id,
          question: question.trim(),
          answer: advice,
          conversation: updatedConversation,
          timestamp: new Date().toISOString()
        }
      );
    } catch (err) {
      console.error('Advice error:', err);
      setError('Failed to get farming advice. Please try again.');
      // Remove the user message if AI failed
      setConversation(conversation);
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = async () => {
    setConversation([]);
    // Optionally clear from database
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-agri-green to-agri-gold rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8 text-center">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="bg-white bg-opacity-20 p-3 sm:p-4 rounded-full">
              <FaRobot className="text-2xl sm:text-3xl lg:text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Farming Advice</h1>
          <p className="text-green-100 text-sm sm:text-base lg:text-lg">
            Get personalized farming advice from our AI assistant. Ask questions about crops, soil, weather, and more.
          </p>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-2xl shadow-xl h-96 sm:h-[500px] flex flex-col border border-gray-100">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {conversation.length === 0 ? (
            <div className="text-center text-gray-500 py-8 sm:py-12">
              <div className="text-4xl sm:text-5xl mb-4">💬</div>
              <p className="text-lg sm:text-xl font-medium">Ask me anything about farming!</p>
              <p className="text-sm sm:text-base mt-2 text-gray-400">Examples: "How to treat tomato blight?" or "Best time to plant maize in Malawi?"</p>
            </div>
          ) : (
            conversation.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-agri-green rounded-full flex items-center justify-center">
                    <FaRobot className="text-white text-sm" />
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${
                    message.role === 'user'
                      ? 'bg-agri-green text-white ml-auto'
                      : 'bg-gray-50 text-gray-900 border border-gray-200'
                  }`}
                >
                  <p className="text-sm sm:text-base">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <FaUser className="text-gray-600 text-sm" />
                  </div>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="flex items-start space-x-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 bg-agri-green rounded-full flex items-center justify-center">
                <FaRobot className="text-white text-sm" />
              </div>
              <div className="bg-gray-50 px-4 py-3 rounded-2xl border border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-agri-green"></div>
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about farming, crops, soil, weather..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="bg-agri-green text-white px-6 py-3 rounded-xl hover:bg-agri-gold transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <FaPaperPlane className="text-sm" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
          {conversation.length > 0 && (
            <button
              onClick={clearConversation}
              className="mt-3 text-sm text-gray-500 hover:text-red-500 flex items-center space-x-1 transition-colors"
            >
              <FaTrash className="text-xs" />
              <span>Clear conversation</span>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-800">{error}</div>
        </div>
      )}

      {/* Quick Questions */}
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
        <div className="flex items-center mb-4 sm:mb-6">
          <FaQuestionCircle className="text-agri-green text-xl sm:text-2xl mr-3" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Quick Questions</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            "How to improve soil fertility?",
            "Best pesticides for maize?",
            "Watering schedule for tomatoes?",
            "Signs of nutrient deficiency?",
            "Weather impact on crop yield?",
            "Organic farming tips?"
          ].map((q, index) => (
            <button
              key={index}
              onClick={() => setQuestion(q)}
              className="text-left p-3 sm:p-4 border border-gray-200 rounded-xl hover:bg-gradient-to-r hover:from-agri-green hover:to-agri-gold hover:text-white hover:border-agri-green transition-all duration-200 group"
            >
              <span className="text-sm sm:text-base text-gray-700 group-hover:text-white">{q}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 sm:p-6 lg:p-8">
        <div className="flex items-center mb-4">
          <FaLightbulb className="text-yellow-500 text-xl sm:text-2xl mr-3" />
          <h4 className="font-semibold text-blue-900 text-base sm:text-lg">Tips for better advice</h4>
        </div>
        <ul className="space-y-2 sm:space-y-3">
          <li className="flex items-start text-sm sm:text-base text-blue-800">
            <span className="text-blue-500 mr-2 mt-0.5">•</span>
            <span>Be specific about your crop type and location</span>
          </li>
          <li className="flex items-start text-sm sm:text-base text-blue-800">
            <span className="text-blue-500 mr-2 mt-0.5">•</span>
            <span>Mention the season and current weather conditions</span>
          </li>
          <li className="flex items-start text-sm sm:text-base text-blue-800">
            <span className="text-blue-500 mr-2 mt-0.5">•</span>
            <span>Describe any visible symptoms or problems</span>
          </li>
          <li className="flex items-start text-sm sm:text-base text-blue-800">
            <span className="text-blue-500 mr-2 mt-0.5">•</span>
            <span>Ask follow-up questions for more detailed guidance</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FarmingAdvice;
