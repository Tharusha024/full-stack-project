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
        'custom-yellow':'#FBFF00',
        'custom-blue-2':'#B1ECFE',
        'custom-blue-3':'#A6D2F5',
        'custom-purple':'#AB01BA',
        'custom-blue-4':'#00BED4'

      }
    },
  },
  plugins: [],
}

