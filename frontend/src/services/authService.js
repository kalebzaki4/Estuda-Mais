import {
  API_BASE_URL,
  AUTH_LOGIN_ENDPOINT,
  AUTH_REGISTER_ENDPOINT,
  AUTH_LOGOUT_ENDPOINT,
  AUTH_ME_ENDPOINT,
  loginRequestConfig,
  registerRequestConfig,
  makeLoginPayload,
  makeRegisterPayload,
} from '../config/apiEndpoints.js'
import { isTokenValid, getUserFromToken } from '../utils/auth.js'

const storageTokenKey = 'jwtToken'

function getAuthHeaders() {
  const token = localStorage.getItem(storageTokenKey);
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
}

async function request(url, opts = {}) {
  try {
    const res = await fetch(url, opts)
    // Check if response has content before parsing JSON
    const text = await res.text();
    let json = null;
    try {
        json = text ? JSON.parse(text) : null;
    } catch (e) {
        // If not JSON, use text as error or data
        json = { message: text };
    }

    if (!res.ok) return { success: false, status: res.status, error: (json && json.message) || res.statusText || text }
    return { success: true, data: json }
  } catch (e) {
    return { success: false, error: "Erro de conexão" }
  }
}

const authService = {
  isAuthenticated() {
    const token = this.getToken()
    return isTokenValid(token)
  },

  getToken() {
    return localStorage.getItem(storageTokenKey)
  },

  setAuthData(token) {
    if (token) localStorage.setItem(storageTokenKey, token)
  },

  clearAuthData() {
    localStorage.removeItem(storageTokenKey)
    localStorage.removeItem('userData') // Clean legacy data
    // Clean user-specific local stats
    localStorage.removeItem('userPoints')
    localStorage.removeItem('studyMinutesToday')
    localStorage.removeItem('pomodoroHistory')
    localStorage.removeItem('studyHistory')
    localStorage.removeItem('studyDay')
  },

  async getCurrentUser() {
    const token = this.getToken();
    if (!token) return { success: false, error: "No token found" };
    
    // If backend has ME endpoint, use it.
    if (AUTH_ME_ENDPOINT) {
        try {
            const headers = getAuthHeaders()
            const res = await request(`${API_BASE_URL}${AUTH_ME_ENDPOINT}`, { method: 'GET', headers })
            return res
        } catch (e) {
            return { success: false, error: e.message || String(e) }
        }
    }

    // Fallback: decode token
    const user = getUserFromToken(token);
    if (user) {
        return { success: true, data: user };
    }
    return { success: false, error: "Invalid token" };
  },

  async login(email, password) {
    try {
      const body = JSON.stringify(makeLoginPayload({ email, password }))
      const res = await request(`${API_BASE_URL}${AUTH_LOGIN_ENDPOINT}`, { ...loginRequestConfig, body })
      
      let token = null;
      if (res.success) {
          // Backend returns { token: "..." }
          if (res.data && res.data.token) {
              token = res.data.token;
          } else if (res.data && res.data.data && res.data.data.token) {
               token = res.data.data.token;
          }
      }

      if (token) {
        this.setAuthData(token)
        return { success: true, token, ...res }
      }
      
      return res
    } catch (e) {
      return { success: false, error: e.message || String(e) }
    }
  },

  async register(name, email, password) {
    try {
      const body = JSON.stringify(makeRegisterPayload({ name, email, password }))
      const res = await request(`${API_BASE_URL}${AUTH_REGISTER_ENDPOINT}`, { ...registerRequestConfig, body })
      return res
    } catch (e) {
      return { success: false, error: e.message || String(e) }
    }
  },

  async logout() {
    try {
      if (AUTH_LOGOUT_ENDPOINT) {
        const headers = getAuthHeaders()
        await request(`${API_BASE_URL}${AUTH_LOGOUT_ENDPOINT}`, { method: 'POST', headers })
      }
    } catch (e) {
      // ignore
    } finally {
      this.clearAuthData()
    }
  },
}

export default authService
