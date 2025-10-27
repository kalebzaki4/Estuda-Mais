export const AUTH_LOGIN_ENDPOINT = "/api/auth/login"; // placeholder

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