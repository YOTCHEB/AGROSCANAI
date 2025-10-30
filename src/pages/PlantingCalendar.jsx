import { useState, useEffect } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { getWeatherData } from '../utils/api';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaSeedling, FaCheckCircle, FaCloudSun, FaTint, FaWind, FaLightbulb, FaLeaf, FaSun, FaCloudRain, FaSnowflake } from 'react-icons/fa';

const PlantingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ lat: -13.9626, lon: 33.7741 }); // Default to Lilongwe, Malawi

  // Malawi crop planting calendar data
  const plantingCalendar = {
    1: { month: 'January', crops: ['Maize (late)', 'Beans', 'Groundnuts'], activities: ['Land preparation', 'Planting'] },
    2: { month: 'February', crops: ['Maize (late)', 'Beans', 'Groundnuts'], activities: ['Planting', 'Weeding'] },
    3: { month: 'March', crops: ['Maize (late)', 'Rice', 'Tobacco'], activities: ['Planting', 'Irrigation setup'] },
    4: { month: 'April', crops: ['Maize', 'Rice', 'Tobacco'], activities: ['Planting', 'Fertilizer application'] },
    5: { month: 'May', crops: ['Maize', 'Rice', 'Tobacco'], activities: ['Planting', 'Pest control'] },
    6: { month: 'June', crops: ['Maize', 'Rice', 'Tobacco'], activities: ['Planting', 'Weeding'] },
    7: { month: 'July', crops: ['Maize', 'Rice', 'Tobacco'], activities: ['Harvesting', 'Storage preparation'] },
    8: { month: 'August', crops: ['Maize', 'Rice', 'Tobacco'], activities: ['Harvesting', 'Post-harvest'] },
    9: { month: 'September', crops: ['Maize', 'Rice', 'Tobacco'], activities: ['Harvesting', 'Land preparation'] },
    10: { month: 'October', crops: ['Maize (early)', 'Beans', 'Groundnuts'], activities: ['Planting', 'Weeding'] },
    11: { month: 'November', crops: ['Maize (early)', 'Beans', 'Groundnuts'], activities: ['Planting', 'Irrigation'] },
    12: { month: 'December', crops: ['Maize (early)', 'Beans', 'Groundnuts'], activities: ['Planting', 'Fertilizer'] }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchWeatherData();
    }
  }, [selectedDate]);

  const fetchWeatherData = async () => {
    if (!selectedDate) return;

    setLoading(true);
    try {
      const data = await getWeatherData(location.lat, location.lon);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const getPlantingInfo = (month) => {
    return plantingCalendar[month] || { crops: [], activities: [] };
  };

  const currentMonthInfo = getPlantingInfo(currentDate.getMonth() + 1);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-agri-green to-agri-gold rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8 text-center">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="bg-white bg-opacity-20 p-3 sm:p-4 rounded-full">
              <FaCalendarAlt className="text-2xl sm:text-3xl lg:text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Planting Calendar</h1>
          <p className="text-green-100 text-sm sm:text-base lg:text-lg">
            Plan your farming activities with weather insights and optimal planting times for Malawi.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <button
                onClick={previousMonth}
                className="p-2 sm:p-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaChevronLeft className="text-lg sm:text-xl text-gray-600" />
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 sm:p-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaChevronRight className="text-lg sm:text-xl text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 sm:p-3 text-center text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {monthDays.map(day => (
                <button
                  key={day.toISOString()}
                  onClick={() => handleDateClick(day)}
                  className={`p-2 sm:p-3 text-center text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-105 ${
                    !isSameMonth(day, currentDate) ? 'text-gray-300' :
                    isToday(day) ? 'bg-gradient-to-br from-agri-green to-agri-gold text-white shadow-lg' :
                    selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                      ? 'bg-agri-green bg-opacity-20 text-agri-green border-2 border-agri-green'
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {format(day, 'd')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Monthly Info */}
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
            <div className="flex items-center mb-4 sm:mb-6">
              <FaSeedling className="text-agri-green text-xl sm:text-2xl mr-3" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {currentMonthInfo.month} Activities
              </h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center text-sm sm:text-base">
                  <FaLeaf className="text-agri-green mr-2" />
                  Recommended Crops:
                </h4>
                <ul className="space-y-2">
                  {currentMonthInfo.crops.map((crop, index) => (
                    <li key={index} className="text-xs sm:text-sm text-gray-600 flex items-center bg-gray-50 rounded-lg p-2 sm:p-3">
                      <FaSeedling className="text-agri-green mr-2 sm:mr-3" />
                      {crop}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center text-sm sm:text-base">
                  <FaCheckCircle className="text-blue-500 mr-2" />
                  Activities:
                </h4>
                <ul className="space-y-2">
                  {currentMonthInfo.activities.map((activity, index) => (
                    <li key={index} className="text-xs sm:text-sm text-gray-600 flex items-center bg-blue-50 rounded-lg p-2 sm:p-3">
                      <FaCheckCircle className="text-blue-500 mr-2 sm:mr-3" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Weather Info */}
          {selectedDate && (
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
              <div className="flex items-center mb-4 sm:mb-6">
                <FaCloudSun className="text-blue-500 text-xl sm:text-2xl mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Weather for {format(selectedDate, 'MMM d, yyyy')}
                </h3>
              </div>
              {loading ? (
                <div className="flex justify-center py-6 sm:py-8">
                  <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-agri-green"></div>
                </div>
              ) : weatherData ? (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4">
                    <div className="text-3xl sm:text-4xl mr-3 sm:mr-4">
                      {weatherData.weather[0].main === 'Clear' ? <FaSun className="text-yellow-500" /> :
                       weatherData.weather[0].main === 'Clouds' ? <FaCloudSun className="text-gray-500" /> :
                       weatherData.weather[0].main === 'Rain' ? <FaCloudRain className="text-blue-500" /> :
                       <FaCloudSun className="text-gray-400" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-base sm:text-lg">{weatherData.weather[0].description}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{Math.round(weatherData.main.temp)}°C</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 flex items-center">
                      <FaTint className="text-blue-500 text-lg sm:text-xl mr-2 sm:mr-3" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Humidity</p>
                        <p className="font-semibold text-gray-900">{weatherData.main.humidity}%</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 flex items-center">
                      <FaWind className="text-gray-500 text-lg sm:text-xl mr-2 sm:mr-3" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Wind Speed</p>
                        <p className="font-semibold text-gray-900">{weatherData.wind.speed} m/s</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <FaCloudSun className="text-gray-300 text-3xl sm:text-4xl mx-auto mb-3" />
                  <p className="text-gray-500">Weather data not available</p>
                </div>
              )}
            </div>
          )}

          {/* Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <FaLightbulb className="text-yellow-500 text-xl sm:text-2xl mr-3" />
              <h4 className="font-semibold text-blue-900 text-base sm:text-lg">Planting Tips</h4>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start text-xs sm:text-sm text-blue-800">
                <FaCheckCircle className="text-blue-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <span>Check soil moisture before planting</span>
              </li>
              <li className="flex items-start text-xs sm:text-sm text-blue-800">
                <FaCheckCircle className="text-blue-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <span>Use certified seeds for better yields</span>
              </li>
              <li className="flex items-start text-xs sm:text-sm text-blue-800">
                <FaCheckCircle className="text-blue-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <span>Follow recommended spacing</span>
              </li>
              <li className="flex items-start text-xs sm:text-sm text-blue-800">
                <FaCheckCircle className="text-blue-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <span>Monitor weather forecasts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Seasonal Overview */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <FaSun className="text-yellow-500 text-2xl mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">Malawi Farming Seasons</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <FaCloudRain className="text-green-600 text-xl mr-3" />
              <h4 className="font-semibold text-green-800">Rainy Season</h4>
            </div>
            <p className="text-sm text-green-600 font-medium mb-2">November - April</p>
            <p className="text-sm text-gray-600">Main planting period for most crops</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <FaSun className="text-yellow-600 text-xl mr-3" />
              <h4 className="font-semibold text-yellow-800">Dry Season</h4>
            </div>
            <p className="text-sm text-yellow-600 font-medium mb-2">May - October</p>
            <p className="text-sm text-gray-600">Harvesting and irrigation farming</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <FaSnowflake className="text-blue-600 text-xl mr-3" />
              <h4 className="font-semibold text-blue-800">Cool Dry Season</h4>
            </div>
            <p className="text-sm text-blue-600 font-medium mb-2">May - August</p>
            <p className="text-sm text-gray-600">Best for certain vegetables</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantingCalendar;
