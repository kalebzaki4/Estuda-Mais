/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Cores de fundo (preto/cinza escuro)
        'bg-dark-primary': '#121212', // Fundo principal, quase preto
        'bg-dark-secondary': '#1e1e1e', // Fundo para cards, cabeçalhos, rodapés
        'bg-dark-tertiary': '#2a2a2a', // Fundo para inputs, hover states, elementos internos
        'bg-dark-hover': '#3a3a3a', // Para estados de hover em fundos escuros

        // Cores de texto (branco/roxo claro)
        'text-light': '#ffffff', // Texto principal (branco puro)
        'text-muted-dark': '#b0b0b0', // Texto secundário/mutado (cinza claro)

        // Cores de destaque (roxo)
        'accent-purple': '#8a2be2', // Roxo principal
        'accent-purple-dark': '#6a1aae', // Roxo mais escuro para botões/hover
        'accent-purple-light': '#b366ff', // Roxo mais claro para detalhes

        // Cores de borda
        'border-dark': '#444444', // Borda escura

        // Cores de feedback (ajustadas para tema escuro)
        'success-green': '#28a745', // Verde para sucesso
        'error-red': '#dc3545',     // Vermelho para erro
        'info-blue': '#007bff',     // Azul para informação
      },
      boxShadow: {
        'custom-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.24)',
        'custom-dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite ease-in-out',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'bounce-slow': 'bounceSlow 3s infinite ease-in-out',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pop-in': 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'glow': 'glow 2s infinite alternate',
        'rotate-3d': 'rotate3d 8s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.01)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) rotate(1deg)' },
          '50%': { transform: 'translateY(0) rotate(0deg)' },
          '75%': { transform: 'translateY(5px) rotate(-1deg)' },
        },
        popIn: {
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '80%': { transform: 'scale(1.05)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(138, 43, 226, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(138, 43, 226, 0.6)' },
        },
        rotate3d: {
          '0%': { transform: 'perspective(1000px) rotateY(0deg)' },
          '50%': { transform: 'perspective(1000px) rotateY(180deg)' },
          '100%': { transform: 'perspective(1000px) rotateY(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
