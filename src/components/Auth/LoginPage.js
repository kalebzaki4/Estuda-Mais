import React, { useState } from 'react';
import RegisterPage from './RegisterPage';

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const BASE_URL = 'http://localhost:8080';

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!username || !password) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Login bem-sucedido (status 200 OK)
        const data = await response.json(); // Espera JSON para sucesso
        setMessage(`Login bem-sucedido! Bem-vindo, ${data.user || username}!`);
        setTimeout(() => {
          onLoginSuccess();
        }, 1000);
      } else {
        // Erro no login (ex: 401 Unauthorized, 400 Bad Request)
        let errorMessage = 'Ocorreu um erro. Tente novamente.';
        try {
          // Tenta ler a resposta como JSON primeiro
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          // Se falhar, lê a resposta como texto simples
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMessage('Ocorreu um erro de rede. Verifique se o backend está rodando e acessível.');
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
    <div className="min-h-screen flex items-center justify-center bg-bg-dark-primary text-text-light p-4 font-inter antialiased">
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
            <label htmlFor="username" className="block text-text-muted-dark text-sm font-medium mb-2">
              Nome de Usuário
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 bg-bg-dark-tertiary border border-border-dark rounded-md text-text-light placeholder-text-muted-dark focus:outline-none focus:ring-1 focus:ring-accent-purple focus:border-accent-purple transition duration-200"
              placeholder="Seu nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
