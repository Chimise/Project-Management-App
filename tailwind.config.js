/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif']
      },
      colors: {
        primary: '#14b8a6',
        completed: '#fb923c',
        progress: '#15803d'

      },
      fontSize: {
        'xxs': ['0.625rem', '0.75rem']
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

