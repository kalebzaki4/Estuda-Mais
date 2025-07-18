// src/components/Auth/LoginPage.js
import React, { useState } from 'react';
import RegisterPage from './RegisterPage'; // Certifique-se de que RegisterPage está no mesmo diretório

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email || !password) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Simulação de login - em um backend real, você faria uma chamada API aqui
      if (email === 'test@example.com' && password === 'password123') {
        setMessage('Login bem-sucedido! Redirecionando...');
        setTimeout(() => {
          onLoginSuccess();
        }, 1000);
      } else {
        setMessage('Email ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMessage('Ocorreu um erro ao tentar fazer login. Tente novamente.');
    }
  };

  const handleGoToRegister = () => {
    setShowRegister(true);
    setMessage('');
  };

  const handleGoToLogin = () => {
    setShowRegister(false);
    setMessage('');
  };

  if (showRegister) {
    return <RegisterPage onRegisterSuccess={handleGoToLogin} onGoToLogin={handleGoToLogin} />;
  }

  return (
    // Container principal com fundo escuro
    <div className="min-h-screen flex items-center justify-center bg-bg-dark-primary text-text-light p-4 font-inter antialiased">
      {/* Card de login com fundo secundário escuro e sombra */}
      <div className="bg-bg-dark-secondary p-8 rounded-lg shadow-custom-dark-lg max-w-md w-full border border-border-dark transform hover:scale-[1.01] transition duration-300 ease-in-out">
        <h2 className="text-4xl font-extrabold text-accent-purple mb-6 text-center tracking-wide">Estuda+</h2>
        <p className="text-xl font-semibold text-text-light mb-8 text-center">Acesse sua conta</p>

        {message && (
          <div className={`mb-6 p-4 rounded-md text-center font-medium ${message.includes('sucesso') ? 'bg-success-green' : 'bg-error-red'} text-text-light animate-fade-in`}>
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-text-muted-dark text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-bg-dark-tertiary border border-border-dark rounded-md text-text-light placeholder-text-muted-dark focus:outline-none focus:ring-1 focus:ring-accent-purple focus:border-accent-purple transition duration-200"
              placeholder="seuemail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-text-muted-dark text-sm font-medium mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 bg-bg-dark-tertiary border border-border-dark rounded-md text-text-light placeholder-text-muted-dark focus:outline-none focus:ring-1 focus:ring-accent-purple focus:border-accent-purple transition duration-200"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-accent-purple-dark hover:bg-accent-purple text-text-light font-semibold rounded-md shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-bg-dark-secondary"
          >
            Entrar
          </button>
        </form>

        <div className="mt-8 text-center space-y-2">
          <button
            type="button"
            onClick={() => setMessage('Funcionalidade de "Esqueceu a senha" em desenvolvimento.')}
            className="text-accent-purple hover:text-accent-purple-light text-sm font-medium transition duration-200 focus:outline-none focus:ring-1 focus:ring-accent-purple focus:ring-offset-1 focus:ring-offset-bg-dark-secondary"
          >
            Esqueceu sua senha?
          </button>
          <p className="text-text-muted-dark text-sm">
            Não tem uma conta?{' '}
            <button
              type="button"
              onClick={handleGoToRegister}
              className="text-accent-purple hover:text-accent-purple-light font-medium transition duration-200 focus:outline-none focus:ring-1 focus:ring-accent-purple focus:ring-offset-1 focus:ring-offset-bg-dark-secondary"
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
