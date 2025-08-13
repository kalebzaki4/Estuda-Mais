import React, { useState } from 'react';

export default function LoginPage({ onLoginSuccess, onGoToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'http://localhost:8080';

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Agora, usamos as credenciais digitadas pelo usuário
          username: username,
          password: password
        }),
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        setMessage('Login bem-sucedido!');
        setTimeout(() => onLoginSuccess(data), 1000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Credenciais inválidas.');
      }
    } catch (error) {
      setLoading(false);
      setMessage('Ocorreu um erro de rede. Verifique se o backend está rodando.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark-primary text-text-light p-4 font-inter antialiased">
      <div className="bg-bg-dark-secondary p-8 rounded-lg shadow-custom-dark-lg max-w-md w-full border border-border-dark transform hover:scale-[1.01] transition duration-300 ease-in-out">
        <h2 className="text-4xl font-extrabold text-accent-purple mb-6 text-center tracking-wide">Estuda+</h2>
        <p className="text-xl font-semibold text-text-light mb-8 text-center">Acesse sua conta</p>

        {message && (
          <div className={`mb-6 p-4 rounded-md text-center font-medium ${message.includes('bem-sucedido') ? 'bg-success-green' : 'bg-error-red'} text-text-light animate-fade-in`}>
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
              placeholder="Digite seu nome de usuário"
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
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-accent-purple-dark hover:bg-accent-purple text-text-light font-semibold rounded-md shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-bg-dark-secondary"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-4 text-center text-text-muted-dark text-sm">
          <button
            type="button"
            className="hover:text-accent-purple transition duration-200 focus:outline-none focus:ring-1 focus:ring-accent-purple focus:ring-offset-1 focus:ring-offset-bg-dark-secondary"
            onClick={() => {
              // TODO: Implementar a lógica para recuperar a senha
              console.log('Botão "Esqueceu sua senha?" clicado.');
            }}
          >
            Esqueceu sua senha?
          </button>
        </div>
        <div className="mt-8 text-center">
          <p className="text-text-muted-dark text-sm">
            Não tem uma conta?{' '}
            <button
              type="button"
              onClick={onGoToRegister}
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
