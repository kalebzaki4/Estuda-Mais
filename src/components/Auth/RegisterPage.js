import React, { useState } from 'react';

export default function RegisterPage({ onRegisterSuccess, onGoToLogin }) {
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');


  const BASE_URL = 'http://localhost:8080';

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!username || !email || !password || !confirmPassword) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      setMessage('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }), 
      });

      if (response.ok && response.status === 201) {
        const data = await response.json();
        setMessage(`Usuário ${data.username} registrado com sucesso! Faça login agora.`);
        setTimeout(() => {
          onRegisterSuccess(); 
        }, 1500);
      } else {
        const errorText = await response.text(); 
        console.error('Erro na resposta do backend:', errorText);
        let errorMessage = 'Ocorreu um erro ao registrar. Tente novamente.';
        if (errorText.includes("Nome de usuário ou email já em uso.")) {
            errorMessage = "Nome de usuário ou email já em uso.";
        } else if (response.status === 400) {
            errorMessage = "Dados inválidos fornecidos.";
        }
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setMessage('Ocorreu um erro de rede. Verifique se o backend está rodando.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark-primary text-text-light p-4 font-inter antialiased">
      <div className="bg-bg-dark-secondary p-8 rounded-lg shadow-custom-dark-lg max-w-md w-full border border-border-dark transform hover:scale-[1.01] transition duration-300 ease-in-out">
        <h2 className="text-4xl font-extrabold text-accent-purple mb-6 text-center tracking-wide">Estuda+</h2>
        <p className="text-xl font-semibold text-text-light mb-8 text-center">Crie sua conta</p>

        {message && (
          <div className={`mb-6 p-4 rounded-md text-center font-medium ${message.includes('sucesso') ? 'bg-success-green' : 'bg-error-red'} text-text-light animate-fade-in`}>
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-text-muted-dark text-sm font-medium mb-2">
              Nome de Usuário
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 bg-bg-dark-tertiary border border-border-dark rounded-md text-text-light placeholder-text-muted-dark focus:outline-none focus:ring-1 focus:ring-accent-purple focus:border-accent-purple transition duration-200"
              placeholder="Escolha um nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-text-muted-dark text-sm font-medium mb-2">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 bg-bg-dark-tertiary border border-border-dark rounded-md text-text-light placeholder-text-muted-dark focus:outline-none focus:ring-1 focus:ring-accent-purple focus:border-accent-purple transition duration-200"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-accent-purple-dark hover:bg-accent-purple text-text-light font-semibold rounded-md shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-bg-dark-secondary"
          >
            Cadastrar
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-text-muted-dark text-sm">
            Já tem uma conta?{' '}
            <button
              type="button"
              onClick={onGoToLogin}
              className="text-accent-purple hover:text-accent-purple-light font-medium transition duration-200 focus:outline-none focus:ring-1 focus:ring-accent-purple focus:ring-offset-1 focus:ring-offset-bg-dark-secondary"
            >
              Faça Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
