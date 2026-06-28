/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./public/**/*.html",
    "./public*.html"],
  theme: {
    extend: {
      backgroundImage: {
        'dark-bg-image': "url('./images/Code Academia darkBg-image.png')",
      }
    },
  },
  plugins: [],
}

