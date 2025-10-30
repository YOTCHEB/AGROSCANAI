# AgriScan AI Web App Development TODO

## 1. Update Dependencies
- [x] Update `package.json` to add new dependencies: @tensorflow/tfjs, axios, react-router-dom, react-dropzone, date-fns

## 2. Update HTML and Config
- [x] Update `index.html` to change title to "AgriScan AI" and ensure mobile-friendly meta tags
- [x] Update `src/lib/appwrite.js` to include Storage and Functions

## 3. Setup Routing and Layout
- [x] Replace `src/App.jsx` with new root component that sets up React Router, includes responsive layout with navigation
- [ ] Update `src/App.css` for any custom styles (e.g., chat bubbles, TensorFlow canvas)

## 4. Create Directory Structure
- [x] Create directories: `src/pages/`, `src/components/`, `src/hooks/`, `src/utils/`, `src/models/`
- [x] Create `.env` file for API keys (ZhipuAI, OpenWeatherMap, Appwrite)

## 5. Implement Authentication
- [x] Create Login/Signup pages using Appwrite Auth
- [x] Create useAuth hook for authentication state management

## 6. Implement Pages
- [x] Home Dashboard: Overview cards, fetch data from Appwrite DB
- [x] Crop Scan: File upload with react-dropzone, TensorFlow.js prediction, upload to Appwrite Storage
- [x] Farming Advice: Chat interface with ZhipuAI API, store in Appwrite DB
- [x] Market Prices: Display prices, filter functionality
- [x] Planting Calendar: Calendar view with OpenWeatherMap integration
- [x] Community Forum: Post/list threads, AI summaries via Appwrite DB
- [x] Profile & Settings: User profile management
- [x] About Us: Enhanced with modern design, statistics, features grid, and call-to-action
- [x] Contact Us: Enhanced with quick stats, improved form, contact info, FAQ section
- [x] Blog: Enhanced with featured articles, search/filter, newsletter signup, improved cards

## 7. Integrate AI and APIs
- [x] Load TensorFlow.js model in CropScan page (use placeholder or pre-trained model)
- [x] Implement ZhipuAI API calls in Farming Advice
- [x] Integrate OpenWeatherMap for weather data in Calendar

## 8. Add Offline Support
- [ ] Implement caching for scans/advice using localStorage/IndexedDB
- [ ] Add sync logic with Appwrite when online

## 9. Ensure Responsiveness
- [ ] Use Tailwind classes for mobile-first design across all components
- [ ] Test and adjust for small screens

## 10. Followup Steps
- [x] Install new dependencies via npm install
- [ ] Set up Appwrite project and configure environment variables
- [ ] Test integrations: Appwrite auth, TensorFlow.js, ZhipuAI, OpenWeatherMap
- [ ] Run app locally with `npm run dev`; verify responsiveness
- [ ] Add error handling, loading states, and accessibility
