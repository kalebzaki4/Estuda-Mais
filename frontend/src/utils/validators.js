export function isValidEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(String(email).trim());
}

export function getPasswordIssues(password) {
  const issues = [];
  const value = String(password || "");
  if (value.length < 8) issues.push("A senha deve ter pelo menos 8 caracteres.");
  if (!/[a-z]/.test(value)) issues.push("Inclua pelo menos uma letra minúscula.");
  if (!/[A-Z]/.test(value)) issues.push("Inclua pelo menos uma letra maiúscula.");
  if (!/[0-9]/.test(value)) issues.push("Inclua pelo menos um número.");
  if (!/[!@#$%^&*()[\]{};:'",.<>/?\\|\-_=+]/.test(value)) {
    issues.push("Recomendado: um caractere especial para maior segurança.");
  }
  return issues;
}

export function isValidPassword(password) {
  return getPasswordIssues(password).filter(
    (msg) => !msg.startsWith("Recomendado:")
  ).length === 0;
}