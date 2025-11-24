/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'lumio-neon': '#4dffbA',
        'lumio-hot': '#ff3b8d',
      },
      fontFamily: {
        'display': ['"Exo 2"', 'sans-serif'],
      },
      textGlow: {
        'neon': '0 0 5px #4dffbA, 0 0 10px #4dffbA, 0 0 20px #4dffbA',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-glow-neon': {
          textShadow: '0 0 5px #4dffbA, 0 0 10px #4dffbA, 0 0 20px #4dffbA'
        }
      })
    }
  ],
}
