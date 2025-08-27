/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coffee: {
          light: '#D7C0AE',
          DEFAULT: '#6F4E37',
          dark: '#3E2723',
        },
      },
    },
  },
  plugins: [],
};
