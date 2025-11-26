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
const storageUserKey = 'userData'

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

  getUserData() {
    try {
      const raw = localStorage.getItem(storageUserKey)
      return raw ? JSON.parse(raw) : null
    } catch (e) {
      return null
    }
  },

  setAuthData(token, userData) {
    if (token) localStorage.setItem(storageTokenKey, token)
    if (userData) localStorage.setItem(storageUserKey, JSON.stringify(userData))
  },

  clearAuthData() {
    localStorage.removeItem(storageTokenKey)
    localStorage.removeItem(storageUserKey)
  },

  async getCurrentUser() {
    try {
      const headers = getAuthHeaders()
      const res = await request(`${API_BASE_URL}${AUTH_ME_ENDPOINT}`, { method: 'GET', headers })
      if (res.success && res.data) {
        // server may return user object directly or wrapped in { data: ... }
        const payload = res.data.data || res.data
        if (payload) localStorage.setItem(storageUserKey, JSON.stringify(payload))
      }
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
        // try common shapes: { token, data: user } or { data: { token, data: user } }
        const bodyData = res.data.data || res.data
        const token = res.data.token || (bodyData && bodyData.token) || null
        const user = (bodyData && bodyData.data) || (bodyData && bodyData.user) || null

        if (token) localStorage.setItem(storageTokenKey, token)
        if (user) localStorage.setItem(storageUserKey, JSON.stringify(user))
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
        const user = (bodyData && bodyData.data) || (bodyData && bodyData.user) || null

        if (token) localStorage.setItem(storageTokenKey, token)
        if (user) localStorage.setItem(storageUserKey, JSON.stringify(user))
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
