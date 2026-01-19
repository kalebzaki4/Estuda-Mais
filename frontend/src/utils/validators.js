import DOMPurify from 'dompurify';

export function isValidEmail(email) {
  if (!email) return false;
  // Basic email regex
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  // Prevent common injection chars in email (though technically some are allowed in quotes, we simplify)
  if (/[<>;]/.test(email)) return false;
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

export function validateName(name) {
    if (!name || name.trim().length < 3) return false;
    // Block common dangerous chars in name
    if (/[<>;]/.test(name)) return false;
    return true;
}

export function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return DOMPurify.sanitize(input);
}

export function hasDangerousPatterns(input) {
    if (!input) return false;
    // Check for HTML tags, script patterns, or common SQL injection markers
    // Note: SQL injection prevention is best done on backend, this is just a first line of defense
    const dangerous = /<script\b[^>]*>|javascript:|on\w+=|(\b(SELECT|DROP|UNION|INSERT|DELETE|UPDATE)\b.*--)|(--\s)/i;
    return dangerous.test(input);
}
