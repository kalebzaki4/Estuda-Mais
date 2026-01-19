export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const AUTH_LOGIN_ENDPOINT = "/usuarios/login";
export const AUTH_REGISTER_ENDPOINT = "/usuarios/cadastrar";
export const AUTH_LOGOUT_ENDPOINT = null; // Backend sem endpoint de logout
export const AUTH_ME_ENDPOINT = null; // Backend sem endpoint de me

export function makeLoginPayload({ email, password }) {
  return {
    email: String(email || "").trim(),
    senha: String(password || ""),
  };
}

export function makeRegisterPayload({ name, email, password }) {
  return {
    nome: String(name || "").trim(),
    email: String(email || "").trim(),
    senha: String(password || ""),
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


