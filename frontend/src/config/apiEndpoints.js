export const AUTH_LOGIN_ENDPOINT = "/auth/login";
export const AUTH_REGISTER_ENDPOINT = "/auth/register";

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

// Monitoring Endpoints
export const MONITORING_PLATFORM_USAGE_ENDPOINT = "/monitoramento/uso-plataforma";
export const MONITORING_BACKEND_PERFORMANCE_ENDPOINT = "/monitoramento/desempenho-backend";
export const MONITORING_RESOURCE_MONITORING_ENDPOINT = "/monitoramento/monitoramento-recursos";