import { API_BASE_URL, AUTH_LOGIN_ENDPOINT, AUTH_REGISTER_ENDPOINT, AUTH_LOGOUT_ENDPOINT, AUTH_ME_ENDPOINT, getAuthHeaders } from '../config/apiEndpoints.js';

class AuthService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async login(email, password) {
    try {
      const response = await fetch(`${this.baseURL}${AUTH_LOGIN_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token and user data
        localStorage.setItem('jwtToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.data));
        return { success: true, data };
      } else {
        return { success: false, error: data.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Network error' };
    }
  }

  async register(name, email, password) {
    try {
      const response = await fetch(`${this.baseURL}${AUTH_REGISTER_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token and user data
        localStorage.setItem('jwtToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.data));
        return { success: true, data };
      } else {
        return { success: false, error: data.message || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Network error' };
    }
  }

  async logout() {
    try {
      const response = await fetch(`${this.baseURL}${AUTH_LOGOUT_ENDPOINT}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      // Clear local storage regardless of response
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userData');

      return { success: true, data };
    } catch (error) {
      // Clear local storage even if request fails
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userData');
      return { success: true, error: error.message };
    }
  }

  async getCurrentUser() {
    try {
      const response = await fetch(`${this.baseURL}${AUTH_ME_ENDPOINT}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return { success: true, data: data.data };
      } else {
        return { success: false, error: data.message || 'Failed to get user data' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Network error' };
    }
  }

  isAuthenticated() {
    const token = localStorage.getItem('jwtToken');
    const userData = localStorage.getItem('userData');
    return !!(token && userData);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  clearAuthData() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userData');
  }
}

export default new AuthService();