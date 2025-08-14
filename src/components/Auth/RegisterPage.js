import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage({ onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'http://localhost:8080';

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Cadastro realizado com sucesso!');
        onRegisterSuccess?.();
      } else {
        setMessage(data.message || 'Erro ao registrar');
      }
    } catch (err) {
      setMessage('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Já tem conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
}
