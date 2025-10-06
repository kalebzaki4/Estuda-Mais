import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

// Importando componentes de autenticação
import Login from './components/auth/Login'
import Register from './components/auth/Register'

// Componente de proteção de rotas
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Componente de Dashboard temporário
const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Dashboard do Estuda+</h1>
      <p>Bem-vindo ao seu painel de controle!</p>
      <button 
        onClick={handleLogout}
        style={{
          background: '#f44336',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Sair
      </button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
