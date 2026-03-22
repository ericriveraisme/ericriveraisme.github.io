/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
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
