/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFF5E6',
          DEFAULT: '#FFD6A5',
          dark: '#FFB347',
        },
        secondary: {
          light: '#7A9D96',
          DEFAULT: '#4A7C59',
          dark: '#2C5530',
        },
        accent: {
          light: '#FDF6E3',
          DEFAULT: '#F9E7B0',
          dark: '#F5D76E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 