/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        crimson: 'rgb(217 4 41)',
        ocean: 'rgb(0 119 182)',
        pearl: 'rgb(250 250 252)',
        gold: 'rgb(245 158 11)',
      },
    },
  },
  plugins: [],
};
