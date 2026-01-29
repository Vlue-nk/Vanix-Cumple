/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // === PREMIUM OFF-COLORS (No pure black/white) ===
        'vania-black': '#0a0a0a',      // Soft black (not harsh #000)
        'vania-dark': '#1a1a1a',       // Carbon grey for secondary BG
        'vania-charcoal': '#121212',   // Deep charcoal
        'vania-paper': '#f4f4f0',      // Bone white for art sections
        'vania-cream': '#f5f5dc',      // Soft cream text

        // === ACCENT COLORS (Sophisticated, not saturated) ===
        'accent-red': '#8a0303',       // Dried blood (Pennywise)
        'accent-blue': '#2c3e50',      // Slate blue (Gaze/Deftones)
        'accent-steel': '#4682b4',     // Steel blue
        'accent-gold': '#d4af37',      // Subtle gold for highlights
        'accent-orange': '#cc5500',    // Burnt orange (Committed)
        'accent-lilac': '#e6e6fa',     // Pastel lilac (Multiverse)

        // === LEGACY (keep for compatibility) ===
        'neon-blue': '#2E5CFF',
        'neon-orange': '#FF4D00',
        'cooky-pink': '#FFB6C1',
        'bts-purple': '#9D7CFA',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'heartbeat': 'heartbeat 1.2s ease-in-out infinite',
        'reveal-up': 'revealUp 0.8s ease-out forwards',
        'reveal-scale': 'revealScale 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        heartbeat: {
          '0%, 40%, 100%': { transform: 'scale(1)' },
          '20%, 60%': { transform: 'scale(1.06)' },
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealScale: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'out-circ': 'cubic-bezier(0, 0.55, 0.45, 1)',
      },
    },
  },
  plugins: [],
}
