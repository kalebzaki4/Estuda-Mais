import api from './api';

/**
 * Serviço de autenticação
 * Centraliza todas as operações relacionadas à autenticação
 */
class AuthService {
  constructor() {
    this.tokenKey = 'token';
    this.userKey = 'user';
  }

  // Login do usuário
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;
      
      if (token) {
        this.setToken(token);
        this.setUser(user);
      }

      return {
        success: true,
        data: response.data,
        message: 'Login realizado com sucesso!'
      };
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  }

  // Registro de novo usuário
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);

      const { token, user } = response.data;
      
      if (token) {
        this.setToken(token);
        this.setUser(user);
      }

      return {
        success: true,
        data: response.data,
        message: 'Conta criada com sucesso!'
      };
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  }

  // Logout do usuário
  async logout() {
    try {
      // Tentar fazer logout no servidor
      await api.post('/auth/logout');
    } catch (error) {
      console.warn('Erro ao fazer logout no servidor:', error);
    } finally {
      // Sempre limpar dados locais
      this.clearAuthData();
    }
  }

  // Verificar se o usuário está autenticado
  isAuthenticated() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Obter token atual
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // Definir token
  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Obter usuário atual
  getCurrentUser() {
    const userStr = localStorage.getItem(this.userKey);
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Erro ao parsear dados do usuário:', error);
      return null;
    }
  }

  // Definir usuário
  setUser(user) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Limpar dados de autenticação
  clearAuthData() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  // Verificar se o token expirou
  isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Erro ao verificar expiração do token:', error);
      return true;
    }
  }

  // Renovar token
  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh');
      const { token } = response.data;
      
      if (token) {
        this.setToken(token);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      this.clearAuthData();
      return false;
    }
  }

  // Verificar token e renovar se necessário
  async validateAndRefreshToken() {
    const token = this.getToken();
    
    if (!token) {
      return false;
    }

    if (this.isTokenExpired(token)) {
      return await this.refreshToken();
    }

    return true;
  }

  // Obter perfil do usuário
  async getProfile() {
    try {
      const response = await api.get('/auth/profile');
      const user = response.data;
      this.setUser(user);
      return {
        success: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  }

  // Atualizar perfil do usuário
  async updateProfile(userData) {
    try {
      const response = await api.put('/auth/profile', userData);
      const user = response.data;
      this.setUser(user);
      return {
        success: true,
        data: user,
        message: 'Perfil atualizado com sucesso!'
      };
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  }

  // Alterar senha
  async changePassword(currentPassword, newPassword) {
    try {
      await api.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
      
      return {
        success: true,
        message: 'Senha alterada com sucesso!'
      };
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  }

  // Solicitar redefinição de senha
  async requestPasswordReset(email) {
    try {
      await api.post('/auth/forgot-password', { email });
      
      return {
        success: true,
        message: 'Email de redefinição enviado com sucesso!'
      };
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  }

  // Redefinir senha
  async resetPassword(token, newPassword) {
    try {
      await api.post('/auth/reset-password', {
        token,
        newPassword
      });
      
      return {
        success: true,
        message: 'Senha redefinida com sucesso!'
      };
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  }

  // Extrair mensagem de erro
  getErrorMessage(error) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    
    if (error.response?.status === 401) {
      return 'Credenciais inválidas';
    }
    
    if (error.response?.status === 403) {
      return 'Acesso negado';
    }
    
    if (error.response?.status === 404) {
      return 'Usuário não encontrado';
    }
    
    if (error.response?.status >= 500) {
      return 'Erro interno do servidor. Tente novamente mais tarde.';
    }
    
    if (error.code === 'NETWORK_ERROR') {
      return 'Erro de conexão. Verifique sua internet.';
    }
    
    return 'Erro inesperado. Tente novamente.';
  }
}

// Exportar instância única do serviço
const authService = new AuthService();
export default authService;