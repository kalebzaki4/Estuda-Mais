import {
  API_BASE_URL,
  AUTH_LOGIN_ENDPOINT,
  AUTH_REGISTER_ENDPOINT,
  AUTH_LOGOUT_ENDPOINT,
  AUTH_ME_ENDPOINT,
  loginRequestConfig,
  registerRequestConfig,
  getAuthHeaders,
} from '../config/apiEndpoints.js'

const storageTokenKey = 'jwtToken'

async function request(url, opts = {}) {
  const res = await fetch(url, opts)
  const json = await res.json().catch(() => null)
  if (!res.ok) return { success: false, status: res.status, error: json || res.statusText }
  return { success: true, data: json }
}

const authService = {
  isAuthenticated() {
    return !!localStorage.getItem(storageTokenKey)
  },

  setAuthData(token) {
    if (token) localStorage.setItem(storageTokenKey, token)
  },

  clearAuthData() {
    localStorage.removeItem(storageTokenKey)
  },

  async getCurrentUser() {
    try {
      const headers = getAuthHeaders()
      const res = await request(`${API_BASE_URL}${AUTH_ME_ENDPOINT}`, { method: 'GET', headers })
      // No longer storing user data in localStorage here
      return res
    } catch (e) {
      return { success: false, error: e.message || String(e) }
    }
  },

  async login(email, password) {
    try {
      const body = JSON.stringify({ email, password })
      const res = await request(`${API_BASE_URL}${AUTH_LOGIN_ENDPOINT}`, { ...loginRequestConfig, body })
      if (res.success && res.data) {
        const bodyData = res.data.data || res.data
        const token = res.data.token || (bodyData && bodyData.token) || null

        if (token) localStorage.setItem(storageTokenKey, token)
      }
      return res
    } catch (e) {
      return { success: false, error: e.message || String(e) }
    }
  },

  async register(name, email, password) {
    try {
      const body = JSON.stringify({ name, email, password })
      const res = await request(`${API_BASE_URL}${AUTH_REGISTER_ENDPOINT}`, { ...registerRequestConfig, body })
      if (res.success && res.data) {
        const bodyData = res.data.data || res.data
        const token = res.data.token || (bodyData && bodyData.token) || null

        if (token) localStorage.setItem(storageTokenKey, token)
      }
      return res
    } catch (e) {
      return { success: false, error: e.message || String(e) }
    }
  },

  async logout() {
    try {
      const headers = getAuthHeaders()
      await request(`${API_BASE_URL}${AUTH_LOGOUT_ENDPOINT}`, { method: 'POST', headers })
    } catch (e) {
      // ignore
    } finally {
      this.clearAuthData()
    }
  },
}

export default authService
