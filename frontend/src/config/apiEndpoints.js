export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const AUTH_LOGIN_ENDPOINT = "/auth/login";
export const AUTH_REGISTER_ENDPOINT = "/auth/register";
export const AUTH_LOGOUT_ENDPOINT = "/auth/logout";
export const AUTH_ME_ENDPOINT = "/auth/me";

export function makeLoginPayload({ email, password }) {
  return {
    email: String(email || "").trim(),
    password: String(password || ""),
  };
}



export const loginRequestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export const registerRequestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('jwtToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

