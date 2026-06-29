/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
<<<<<<< HEAD
    "./public/**/*.{html,js}"],
  theme: {
    extend: {},
=======
    "./public/**/*.html",
    "./public*.html"],
  theme: {
    extend: {
      backgroundImage: {
        'dark-bg-image': "url('./images/Code Academia darkBg-image.png')",
      }
    },
>>>>>>> 7292115 (Initial Commit)
  },
  plugins: [],
}

