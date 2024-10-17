/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,}",
  ],
  theme: {
    extend: {

      colors: {
        'bg-linear': '#000000', // Replace with your primary background color
      },

      boxShadow: {
        'light': '0 2px 4px var(--color-light)',

        'dark': '0 2px 4px var(--color-dark)',
        'custom-primary': '0 2px 4px var(--color-primary)',

      },
      keyframes: {
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'var(--bg-light)' },
        },
      },
      animation: {
        blink: 'blink 1.5s infinite',
      },
    },
  },
  plugins: [],
}