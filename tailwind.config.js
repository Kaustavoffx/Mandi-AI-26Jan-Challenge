/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          soil: '#3D2914',
          'soil-light': '#5D4037',
          'soil-dark': '#2E1A0A',
        },
        leaf: {
          green: '#4CAF50',
          'green-light': '#81C784',
          'green-dark': '#2E7D32',
          fresh: '#8BC34A',
        },
        clay: {
          white: '#F5F5DC',
          'white-soft': '#FEFEFE',
          cream: '#FFF8DC',
        },
        sun: {
          yellow: '#FFC107',
          'yellow-light': '#FFEB3B',
          'yellow-warm': '#FF9800',
        },
        guide: {
          pulse: '#FF6B6B',
          'pulse-light': '#FFE0E0',
        }
      },
      fontFamily: {
        'rounded': ['Inter', 'system-ui', 'sans-serif'],
        'hindi': ['Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        'bengali': ['Noto Sans Bengali', 'system-ui', 'sans-serif'],
        'tamil': ['Noto Sans Tamil', 'system-ui', 'sans-serif'],
        'telugu': ['Noto Sans Telugu', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'organic': '2rem',
        'soft': '1.5rem',
        'gentle': '1rem',
      },
      boxShadow: {
        'earth': '0 8px 32px rgba(61, 41, 20, 0.15)',
        'leaf': '0 4px 20px rgba(76, 175, 80, 0.2)',
        'clay': '0 2px 16px rgba(245, 245, 220, 0.3)',
        'organic': '0 12px 40px rgba(0, 0, 0, 0.1)',
        'guide-pulse': '0 0 0 4px rgba(255, 107, 107, 0.3)',
      },
      animation: {
        'sway': 'sway 6s ease-in-out infinite',
        'grow': 'grow 0.8s ease-out',
        'fade-up': 'fade-up 0.6s ease-out',
        'pulse-guide': 'pulse-guide 2s ease-in-out infinite',
        'organic-bounce': 'organic-bounce 0.5s ease-out',
      },
      keyframes: {
        'sway': {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateX(2px) rotate(0.5deg)' },
          '75%': { transform: 'translateX(-2px) rotate(-0.5deg)' }
        },
        'grow': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'fade-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'pulse-guide': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' }
        },
        'organic-bounce': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}