/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}", // Added CSS files to content
  ],
  theme: {
    extend: {
      colors: {
        'agri-green': '#16a34a',
        'agri-gold': '#f59e0b',
      },
      backgroundImage: {
        'gradient-agri-primary': 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
      }
    },
  },
  plugins: [],
}
