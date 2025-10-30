import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CropScan from './pages/CropScan';
import FarmingAdvice from './pages/FarmingAdvice';
import MarketPrices from './pages/MarketPrices';
import PlantingCalendar from './pages/PlantingCalendar';
import CommunityForum from './pages/CommunityForum';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Blog from './pages/Blog';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="scan" element={<CropScan />} />
            <Route path="advice" element={<FarmingAdvice />} />
            <Route path="market" element={<MarketPrices />} />
            <Route path="calendar" element={<PlantingCalendar />} />
            <Route path="forum" element={<CommunityForum />} />
            <Route path="profile" element={<Profile />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="blog" element={<Blog />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
