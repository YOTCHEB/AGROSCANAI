import { useState, useEffect } from 'react';
import { getMarketPrices } from '../utils/api';
import { FaSearch, FaFilter, FaLeaf, FaChartLine, FaPhone, FaEnvelope, FaCalendarAlt, FaCoins, FaMapMarkerAlt, FaArrowUp, FaArrowDown, FaMinus, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

const MarketPrices = () => {
  const [prices, setPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cropFilter, setCropFilter] = useState('');
  const [marketFilter, setMarketFilter] = useState('');

  useEffect(() => {
    fetchPrices();
  }, []);

  useEffect(() => {
    filterPrices();
  }, [prices, cropFilter, marketFilter]);

  const fetchPrices = async () => {
    try {
      setLoading(true);
      const data = await getMarketPrices();
      setPrices(data);
    } catch (err) {
      console.error('Error fetching prices:', err);
      setError('Failed to load market prices. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterPrices = () => {
    let filtered = prices;

    if (cropFilter) {
      filtered = filtered.filter(price =>
        price.crop.toLowerCase().includes(cropFilter.toLowerCase())
      );
    }

    if (marketFilter) {
      filtered = filtered.filter(price =>
        price.market.toLowerCase().includes(marketFilter.toLowerCase())
      );
    }

    setFilteredPrices(filtered);
  };

  const clearFilters = () => {
    setCropFilter('');
    setMarketFilter('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-agri-green mx-auto mb-4" />
          <p className="text-gray-600">Loading market prices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Market Prices</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={fetchPrices}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center mx-auto"
          >
            <FaSpinner className="mr-2" />
            Retry
          </button>
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
              <FaCoins className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Market Prices</h1>
          <p className="text-green-100 text-lg">
            Current crop prices in Malawi markets. Stay updated with the latest market trends.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <FaFilter className="text-agri-green text-2xl mr-3" />
          <h3 className="text-xl font-semibold text-gray-900">Filter Prices</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative">
            <label htmlFor="crop" className="block text-sm font-medium text-gray-700 mb-2">
              Crop Type
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLeaf className="text-gray-400" />
              </div>
              <input
                type="text"
                id="crop"
                value={cropFilter}
                onChange={(e) => setCropFilter(e.target.value)}
                placeholder="e.g., Maize, Rice"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-agri-green transition-colors"
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="market" className="block text-sm font-medium text-gray-700 mb-2">
              Market Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <input
                type="text"
                id="market"
                value={marketFilter}
                onChange={(e) => setMarketFilter(e.target.value)}
                placeholder="e.g., Lilongwe, Blantyre"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-agri-green transition-colors"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <FaFilter className="mr-2" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Prices Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center mb-2">
            <FaChartLine className="text-agri-green text-2xl mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">
              Current Market Prices
            </h3>
          </div>
          <p className="text-gray-600">
            Prices are updated regularly. Contact local markets for the most current rates.
          </p>
        </div>
        <ul className="divide-y divide-gray-100">
          {filteredPrices.length > 0 ? (
            filteredPrices.map((price, index) => (
              <li key={index} className="hover:bg-gray-50 transition-colors">
                <div className="px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-agri-green to-agri-gold rounded-full flex items-center justify-center">
                        <FaLeaf className="text-white text-lg" />
                      </div>
                      <div className="ml-4">
                        <div className="text-lg font-semibold text-gray-900">
                          {price.crop}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaMapMarkerAlt className="mr-1" />
                          {price.market} Market
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-agri-green mb-1">
                        {price.price} {price.unit}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <FaCalendarAlt className="mr-1" />
                        {new Date(price.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li>
              <div className="px-8 py-12 text-center text-gray-500">
                <FaSearch className="mx-auto text-4xl mb-4 text-gray-300" />
                <p className="text-lg">
                  {prices.length === 0 ? 'No prices available.' : 'No prices match your filters.'}
                </p>
              </div>
            </li>
          )}
        </ul>
      </div>

      {/* Market Insights */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center mb-6">
          <FaChartLine className="text-blue-600 text-2xl mr-3" />
          <h4 className="text-xl font-semibold text-blue-900">Market Insights</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white bg-opacity-70 rounded-xl p-6">
            <h5 className="font-semibold text-blue-800 mb-4 flex items-center">
              <FaArrowUp className="text-green-500 mr-2" />
              Price Trends
            </h5>
            <ul className="text-sm text-blue-700 space-y-3">
              <li className="flex items-start">
                <span className="text-agri-green mr-2">•</span>
                Maize prices typically peak during the dry season
              </li>
              <li className="flex items-start">
                <span className="text-agri-green mr-2">•</span>
                Tobacco commands premium prices in international markets
              </li>
              <li className="flex items-start">
                <span className="text-agri-green mr-2">•</span>
                Groundnut prices fluctuate with export demand
              </li>
            </ul>
          </div>
          <div className="bg-white bg-opacity-70 rounded-xl p-6">
            <h5 className="font-semibold text-blue-800 mb-4 flex items-center">
              <FaCoins className="text-yellow-500 mr-2" />
              Trading Tips
            </h5>
            <ul className="text-sm text-blue-700 space-y-3">
              <li className="flex items-start">
                <span className="text-agri-green mr-2">•</span>
                Visit markets early for best prices
              </li>
              <li className="flex items-start">
                <span className="text-agri-green mr-2">•</span>
                Check quality standards for exports
              </li>
              <li className="flex items-start">
                <span className="text-agri-green mr-2">•</span>
                Consider storage options for price stabilization
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <FaPhone className="text-agri-green text-2xl mr-3" />
          <h4 className="text-xl font-semibold text-gray-900">Contact Market Authorities</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
              <FaLeaf className="text-agri-green mr-2" />
              Ministry of Agriculture
            </h5>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 flex items-center">
                <FaPhone className="text-gray-400 mr-2" />
                +265 1 789 123
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <FaEnvelope className="text-gray-400 mr-2" />
                info@agriculture.gov.mw
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
              <FaCoins className="text-agri-gold mr-2" />
              Agricultural Development
            </h5>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 flex items-center">
                <FaPhone className="text-gray-400 mr-2" />
                +265 1 789 456
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <FaEnvelope className="text-gray-400 mr-2" />
                support@agricdev.mw
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;
