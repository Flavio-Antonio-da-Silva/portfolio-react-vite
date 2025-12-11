// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Adicionado: Supondo que você usa o modo dark baseado em classe
  theme: {
    extend: {
      fontFamily: {
        
        'alfa': ['"Alfa Slab One"', 'serif'],
        
      },
    },
  },
  plugins: [],
}