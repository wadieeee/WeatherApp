/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      backgroundColor: {
        'violet': '#21193a',
      },
      backgroundImage: {
        'clouds': "url('/src/assets/images/Cloud-background.png')",
      },
      fontFamily: {
        'body': ['Nunito'],
      },
    
    },
  },
  plugins: [],
}

