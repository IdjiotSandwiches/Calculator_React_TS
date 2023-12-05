/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '400': '40rem',
        '373': '37.3rem',
        '184': '18.4rem',
        '300': '30rem',
        '320': '32rem'
      },
      height: {
        '277': '27.7rem',
        '300': '30rem',
        '320': '32rem'
      },
      backgroundColor: {
        'greycustom': 'rgba(88,86,87,255)'
      },
      textColor: {
        'greycustom': 'rgba(88,86,87,255)'
      }
    },
  },
  plugins: [],
}