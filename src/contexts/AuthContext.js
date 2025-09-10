import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inicializar estado do usuário
  const initializeAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Verificar se há token válido
      const isValid = await authService.validateAndRefreshToken();
      
      if (isValid) {
        const user = authService.getCurrentUser();
        if (user) {
          setCurrentUser(user);
          setIsLoggedIn(true);
        } else {
          // Tentar buscar perfil do servidor
          const profileResult = await authService.getProfile();
          if (profileResult.success) {
            setCurrentUser(profileResult.data);
            setIsLoggedIn(true);
          } else {
            // Token inválido, fazer logout
            await authService.logout();
            setCurrentUser(null);
            setIsLoggedIn(false);
          }
        }
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Erro ao inicializar autenticação:', error);
      setError('Erro ao verificar autenticação');
      setCurrentUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await authService.login(email, password);
      
      if (result.success) {
        setCurrentUser(result.user);
        setIsLoggedIn(true);
        return { success: true, message: result.message || 'Login realizado com sucesso!' };
      } else {
        setError(result.message || 'Erro no login');
        return { success: false, message: result.message || 'Credenciais inválidas' };
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      const errorMessage = 'Erro interno. Tente novamente.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await authService.register(userData);
      
      if (result.success) {
        // Auto-login após registro bem-sucedido
        const loginResult = await authService.login(userData.email, userData.password);
        if (loginResult.success) {
          setCurrentUser(loginResult.user);
          setIsLoggedIn(true);
          return { success: true, message: 'Cadastro realizado com sucesso! Você foi logado automaticamente.' };
        } else {
          return { success: true, message: 'Cadastro realizado com sucesso! Faça login para continuar.' };
        }
      } else {
        setError(result.message || 'Erro no cadastro');
        return { success: false, message: result.message || 'Erro ao criar conta' };
      }
    } catch (error) {
      console.error('Erro durante o cadastro:', error);
      const errorMessage = 'Erro interno. Tente novamente.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Erro durante logout:', error);
    } finally {
      setCurrentUser(null);
      setIsLoggedIn(false);
      setError(null);
    }
  };

  // Função para verificar se o usuário tem permissão para acessar uma rota
  const hasAccess = (requiredRole) => {
    if (!isLoggedIn) return false;
    if (!requiredRole) return true; // Se não há papel requerido, qualquer usuário logado pode acessar
    return currentUser?.role === requiredRole;
  };

  const value = {
    currentUser,
    isLoggedIn,
    loading,
    error,
    login,
    register,
    logout,
    hasAccess,
    clearError: () => setError(null),
    refreshAuth: initializeAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};