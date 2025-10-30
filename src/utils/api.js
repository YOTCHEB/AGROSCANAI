import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const ZHIPUAI_API_KEY = import.meta.env.VITE_ZHIPUAI_API_KEY;
const ZHIPUAI_API_URL = "https://open.bigmodel.cn/api/paas/v4";

// Mock data for development
const mockMarketPrices = [
  {
    crop: 'Maize',
    market: 'Lilongwe',
    price: 250,
    unit: 'MWK/kg',
    date: new Date().toISOString()
  },
  {
    crop: 'Rice',
    market: 'Blantyre',
    price: 180,
    unit: 'MWK/kg',
    date: new Date().toISOString()
  },
  {
    crop: 'Tobacco',
    market: 'Limbe',
    price: 1200,
    unit: 'MWK/kg',
    date: new Date().toISOString()
  }
];

// API functions
export const getWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Weather API error:', error);
    // Return mock data for development
    return {
      weather: [{ main: 'Clear', description: 'clear sky' }],
      main: { temp: 25, humidity: 60 },
      wind: { speed: 3.5 }
    };
  }
};

export const getMarketPrices = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return mock data for development
  return mockMarketPrices;
};

export const getFarmingAdvice = async (question, conversation = []) => {
  try {
    const response = await axios.post(ZHIPUAI_API_URL, {
      model: "gml-4.5V",
      messages: [
        {
          role: "system",
          content: "You are an expert agricultural advisor specializing in farming practices in Malawi. Provide practical, evidence-based advice for farmers. Focus on sustainable farming methods, local crop varieties, and Malawi-specific agricultural challenges."
        },
        ...conversation,
        { role: "user", content: question }
      ],
      max_tokens: 1000,
      temperature: 0.7
    }, {
      headers: {
        "Authorization": `Bearer ${ZHIPUAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('ZhipuAI API error:', error);
    // Fallback to mock responses if API fails
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('maize') && lowerQuestion.includes('disease')) {
      return "For maize diseases, common issues include maize streak virus and gray leaf spot. To prevent these: 1) Use certified seeds, 2) Practice crop rotation, 3) Apply fungicides when necessary, 4) Remove infected plants immediately. If you see yellow streaks on leaves, it might be maize streak virus - consult your local extension officer.";
    }

    if (lowerQuestion.includes('fertilizer') || lowerQuestion.includes('soil')) {
      return "Soil fertility is crucial for good yields. Test your soil pH first - most crops prefer pH 6.0-7.0. Use organic matter like compost, and consider balanced NPK fertilizers. For maize, apply 100-150kg/ha of compound fertilizer. Always follow recommended application rates to avoid nutrient burn.";
    }

    if (lowerQuestion.includes('water') || lowerQuestion.includes('irrigation')) {
      return "Proper irrigation is essential, especially during dry spells. Maize needs about 500-800mm of water throughout the growing season. Water deeply but infrequently to encourage deep root growth. Consider drip irrigation for water efficiency. Monitor soil moisture regularly.";
    }

    if (lowerQuestion.includes('pest') || lowerQuestion.includes('insect')) {
      return "Integrated Pest Management (IPM) is recommended. Common maize pests include stem borers, aphids, and armyworms. Use neem-based products, introduce beneficial insects, and practice companion planting. Always identify the pest correctly before applying pesticides.";
    }

    // Default response
    return "That's a great question about farming! Based on Malawi's agricultural context, I'd recommend consulting with your local agricultural extension officer for specific advice tailored to your location and current season. They can provide the most accurate and up-to-date information for your farming needs.";
  }
};

// Plant disease detection using TensorFlow.js
export const analyzeCropImage = async (imageFile) => {
  try {
    // This is a placeholder for actual ML model integration
    // In a real implementation, you would load a trained model
    // and process the image through it

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock results - in reality, this would come from your ML model
    const mockResults = [
      { disease: 'Healthy', confidence: 0.85 },
      { disease: 'Leaf Blight', confidence: 0.12 },
      { disease: 'Rust', confidence: 0.03 }
    ];

    return {
      results: mockResults,
      imageUrl: URL.createObjectURL(imageFile),
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Image analysis error:', error);
    throw new Error('Failed to analyze image. Please try again.');
  }
};
