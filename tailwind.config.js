/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      Roboto:['Roboto', 'sans-serif']
    },
    extend: {
      keyframes: {
        slideBottom: {
          "0%" :{
            "-webkit-transform": "translateY(0)",
              transform: "translateY(0)",
          },
          "100%":{
            "-webkit-transform": "translateY(5px)",
            transform: "translateY(5px)"
          }
        }
      },
      animation: {
        slideBottom: 'slideBottom 1s ease-in-out',
      },
      colors: {
        'white': '#fff',
        'green':'#186E25',
        'black':'#000'
      },
    },
  },
  plugins: [],
}

