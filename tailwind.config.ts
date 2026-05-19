/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        'black-900': '#111111',
        'black-800': '#1A1A1A',
        gray: {
          '100': '#F5F5F5',
          '200': '#CCCCCC',
          '300': '#AAAAAA',
          '400': '#333333',
          '500': '#222222',
        },
        white: '#FFFFFF',
        tech: {
          javascript: '#F59E0B',
          react: '#06B6D4',
          python: '#3B82F6',
          java: '#EF4444',
          sql: '#10B981',
        },
        // Keep brand for gradual migration
        brand: {
          50: '#f5f0ff',
          100: '#e9dcff',
          200: '#d1baff',
          300: '#b894ff',
          400: '#9d4edd',
          500: '#7b2ff7',
          600: '#6a24d9',
          700: '#5319b2',
          800: '#40108b',
          900: '#2d0a66',
        },
        surface: {
          900: '#0d0d0d',
          800: '#1a1a1a',
          700: '#2c2c2c',
          600: '#3a3a3a',
        },
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        soft: '0 4px 12px rgba(0, 0, 0, 0.15)',
        'soft-sm': '0 2px 6px rgba(0, 0, 0, 0.1)',
        glow: '0 0 0 4px rgba(123,47,247,0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%, 20%, 40%, 60%, 80%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-in-up': 'slideInUp 0.6s ease-out forwards',
        'bounce-in': 'bounceIn 1s infinite',
      },
    },
  },
  plugins: [],
}
