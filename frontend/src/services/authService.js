const API_BASE_URL = 'http://localhost:8080';

class AuthService {
  // Login do usuário
  async login(email, senha) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Erro ao fazer login');
      }

      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', email);
      }
      
      return data;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async register(nome, email, senha) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Erro ao criar conta');
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', nome);
      }
      
      return data;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  }

  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  getUserInfo() {
    return {
      email: localStorage.getItem('userEmail'),
      name: localStorage.getItem('userName'),
    };
  }


  async authenticatedRequest(url, options = {}) {
    const token = this.getToken();
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, mergedOptions);
      
      if (response.status === 401) {
        // Token expirado ou inválido
        this.logout();
        window.location.href = '/login';
        throw new Error('Sessão expirada. Faça login novamente.');
      }

      return response;
    } catch (error) {
      console.error('Erro na requisição autenticada:', error);
      throw error;
    }
  }
}

export default new AuthService();