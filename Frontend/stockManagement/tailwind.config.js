/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {
      colors:{
        "primary":"#BE3455" , 
        "secondary":"#BE3448"
      }
    },
    screens: {
      'xs': '360px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}

