import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const BASE_URL = 'http://localhost:8080';

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (!email || !password) {
      setMessage('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setMessage('Login realizado com sucesso!');
        setTimeout(() => onLoginSuccess?.(data), 500);
      } else {
        setMessage(data.message || 'Erro ao fazer login. Verifique seu e-mail e senha.');
      }
    } catch (err) {
      setMessage('Erro de conexão com o servidor. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-dark-primary text-text-light p-4">
      <div className="w-full max-w-md p-8 bg-bg-dark-secondary rounded-xl shadow-custom-dark-lg animate-fade-in">
        <h1 className="text-4xl font-extrabold text-accent-purple text-center mb-6">Estuda+</h1>
        <p className="text-center text-text-muted-dark mb-8">Faça login para continuar</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-bg-dark-tertiary border border-border-dark rounded-lg text-text-light placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all duration-300"
            aria-label="E-mail"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-bg-dark-tertiary border border-border-dark rounded-lg text-text-light placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all duration-300 pr-12"
              aria-label="Senha"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-text-muted-dark hover:text-accent-purple transition-colors duration-200"
              aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {showPassword ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 0112 5c.424 0 .84.053 1.25.158M12 5v14M3 12c.877 2.062 2.378 3.733 4.238 4.67M2.458 12C3.732 7.857 7.522 5 12 5s8.268 2.857 9.542 7c-.63 1.983-1.66 3.655-2.923 5.011M21 21l-7.795-7.795"></path>
                ) : (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.857 7.522 5 12 5s8.268 2.857 9.542 7c-1.274 4.143-5.064 7-9.542 7-4.478 0-8.268-2.857-9.542-7z"></path>
                  </>
                )}
              </svg>
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-accent-purple-dark text-text-light font-semibold rounded-lg transition-colors duration-300 ease-in-out hover:bg-accent-purple disabled:bg-bg-dark-tertiary disabled:text-text-muted-dark disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-text-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center text-sm font-medium ${message.includes('sucesso') ? 'text-green-400' : 'text-red-400'} animate-fade-in-down`}>
            {message}
          </p>
        )}
        <p className="mt-6 text-center text-text-muted-dark">
          Não tem conta?{' '}
          <Link to="/register" className="text-accent-purple hover:underline font-semibold">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}