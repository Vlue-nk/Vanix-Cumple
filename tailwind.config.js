/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // O usa una fuente premium como 'Neue Montreal'
        display: ['Playfair Display', 'serif'], // Para toques editoriales
      },
      colors: {
        'vania-black': '#050505',
        'vania-gray': '#121212',
        'neon-blue': '#2E5CFF',
        'neon-orange': '#FF4D00',
        'cooky-pink': '#FFB6C1', // Color BT21 Cooky
        'bts-purple': '#9D7CFA',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
