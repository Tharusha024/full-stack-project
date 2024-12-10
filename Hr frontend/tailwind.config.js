/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        menu:["Calistoga", "serif"],
        smartforce:["Charm", "cursive"],
        subtop:["Lora","serif"],
        average:["Average", "serif"]
      },
      colors:{
        'custom-blue': '#0F55FA',
        'custom-pink':'#FF00A6',
        'custom-green':'#06B532',
        'custom-red':'#FF0000',
        'custom-yellow':'#FBFF00'

      }
    },
  },
  plugins: [],
}

