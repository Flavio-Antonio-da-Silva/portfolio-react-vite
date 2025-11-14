/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chonburi: ['chonburi', 'serif'],
        domine: ['domine', 'serif'],
      },
    },
  },
  plugins: [],
}
