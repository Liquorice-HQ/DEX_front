/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        grey: {
          100: '#ffffff',
          500: '#C8C8C8',
          700: 'rgba(238, 238, 238, 0.1)',
          800: 'rgba(255, 255, 255, 0.11)',
        },
        brand: {
          primary: '#B01FE2',
          gradient: 'linear-gradient(97.27deg, #B01FE2 2.83%, #BA01FA 137.81%)',
          shade: 'rgba(176, 31, 226, 0.17)',
        },
        success: '#00E45B',
      },
    },
  },
  plugins: [],
};
