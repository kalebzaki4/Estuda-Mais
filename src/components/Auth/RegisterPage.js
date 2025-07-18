// src/components/Auth/RegisterPage.js
import React, { useState } from 'react';

// RegisterPage component handles new user registration
export default function RegisterPage({ onRegisterSuccess, onGoToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  // Handles the form submission for registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    // Basic client-side validation
    if (!name || !email || !password || !confirmPassword) {
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

    // Simulate API call to backend for registration
    // In a real application, this would be a fetch or axios call to your Java backend
    try {
      // Placeholder for actual API call
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password }),
      // });
      // const data = await response.json();

      // For demonstration:
      // Simulate successful registration after a delay
      setMessage('Cadastro bem-sucedido! Redirecionando para o login...');
      setTimeout(() => {
        onRegisterSuccess(); // Call this to go back to login or directly to dashboard
      }, 1500);

      // In a real app, you might want to automatically log them in or redirect to login page
      // For now, we'll just go back to the login page.

    } catch (error) {
      console.error('Erro ao registrar:', error);
      setMessage('Ocorreu um erro ao tentar registrar. Tente novamente.');
    }
  };

  return (
    // Full screen container with dark background
    <div className="min-h-screen flex items-center justify-center bg-bg-dark-primary text-text-light p-4 font-inter antialiased">
      {/* Registration form container with dark background, rounded corners, subtle shadow, and border */}
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
            <label htmlFor="name" className="block text-text-muted-dark text-sm font-medium mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 bg-bg-dark-tertiary border border-border-dark rounded-md text-text-light placeholder-text-muted-dark focus:outline-none focus:ring-1 focus:ring-accent-purple focus:border-accent-purple transition duration-200"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
