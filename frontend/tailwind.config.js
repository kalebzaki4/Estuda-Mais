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
        soft: '0 20px 50px rgba(0,0,0,0.35)',
        glow: '0 0 0 4px rgba(123,47,247,0.15)',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}