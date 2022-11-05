/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif']
      },
      colors: {
        primary: 'var(--primary)',
        completed: 'var(--completed)',
        progress: 'var(--progress)'

      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
