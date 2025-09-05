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
        'bg-dark-primary': '#0f0f0f', // Fundo principal, preto mais profundo
        'bg-dark-secondary': '#1a1a1a', // Fundo para cards, cabeçalhos, rodapés
        'bg-dark-tertiary': '#262626', // Fundo para inputs, hover states, elementos internos
        'bg-dark-hover': '#333333', // Para estados de hover em fundos escuros

        // Cores de texto
        'text-light': '#ffffff', // Texto principal (branco puro)
        'text-muted-dark': '#a3a3a3', // Texto secundário/mutado (cinza claro)
        'text-secondary': '#d4d4d4', // Texto secundário mais claro

        // Cores primárias modernas (azul/teal)
        'primary': '#0ea5e9', // Azul moderno principal
        'primary-dark': '#0284c7', // Azul mais escuro para hover
        'primary-light': '#38bdf8', // Azul mais claro para detalhes
        
        // Cores secundárias (teal/verde-azulado)
        'secondary': '#14b8a6', // Teal moderno
        'secondary-dark': '#0f766e', // Teal mais escuro
        'secondary-light': '#2dd4bf', // Teal mais claro

        // Cores de destaque (roxo reduzido)
        'accent': '#8b5cf6', // Roxo mais suave
        'accent-dark': '#7c3aed', // Roxo mais escuro
        'accent-light': '#a78bfa', // Roxo mais claro

        // Cores de borda
        'border-dark': '#404040', // Borda escura mais suave
        'border-light': '#525252', // Borda mais clara

        // Cores de feedback (modernas)
        'success': '#10b981', // Verde moderno para sucesso
        'error': '#ef4444',   // Vermelho moderno para erro
        'warning': '#f59e0b', // Amarelo moderno para aviso
        'info': '#3b82f6',    // Azul moderno para informação
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
