/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./index.jsx",
    "./FF6PortfolioApp.jsx",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        '8bit': ['Courier New', 'monospace'],
      }
    }
  },
  plugins: [],
}
