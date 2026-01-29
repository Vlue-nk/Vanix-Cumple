/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-main': '#000000',
        'white-off': '#f0f0f0',
        'neon-blue': '#2924ff',
        'neon-orange': '#ff3d00',
        'pastel-lilac': '#e6e6fa',
        'blood-red': '#8a0303',
        'dark-gray': '#1a1a1a',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      cursor: {
        none: 'none',
      },
    },
  },
  plugins: [],
}

