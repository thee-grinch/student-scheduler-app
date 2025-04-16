module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // Include all Vue and JavaScript files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ebf5ff',
          100: '#d0eaff',
          600: '#1d4ed8',
        },
        accent: {
          emerald: '#10b981',
          rose: '#f43f5e',
          yellow: '#facc15',
        },
      },
    },
  },
  // darkMode: 'class', // Enable dark mode using the 'class' strategy
  plugins: [],
};