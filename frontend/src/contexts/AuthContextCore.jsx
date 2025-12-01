import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar usuário REAL do backend (/me)
  useEffect(() => {
    async function loadUser() {
      const hasToken = authService.isAuthenticated();
      if (!hasToken) {
        setLoading(false);
        return;
      }

      const response = await authService.getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        // Token inválido → remover
        authService.clearAuthData();
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  const login = async (email, password) => {
    const result = await authService.login(email, password);

    if (result.success) {
      // Buscar o usuário após salvar o token
      const me = await authService.getCurrentUser();
      if (me.success) {
        setUser(me.data);
        return { success: true };
      }
    }

    return { success: false, error: result.error };
  };

  const register = async (name, email, password) => {
    const result = await authService.register(name, email, password);

    if (result.success) {
      const me = await authService.getCurrentUser();
      if (me.success) {
        setUser(me.data);
        return { success: true };
      }
    }

    return { success: false, error: result.error };
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
