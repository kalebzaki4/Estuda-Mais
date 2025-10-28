// Helpers de validação
function isValidEmail(email) {
  const value = String(email || '').trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(value);
}

function isValidName(name) {
  const value = String(name || '').trim();
  if (value.length < 3) return false;
  const words = value.split(/\s+/);
  return words.length >= 2;
}

function passwordScore(pwd) {
  const value = String(pwd || '');
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[a-z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score += 0.5; // bônus
  return Math.min(4, Math.floor(score));
}

function strengthLabel(score) {
  return ['muito fraca', 'fraca', 'média', 'forte', 'muito forte'][score] || 'muito fraca';
}

// DOM
const body = document.body;
const themeModernBtn = document.getElementById('themeModernBtn');
const themeMinimalBtn = document.getElementById('themeMinimalBtn');
const signupForm = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirm = document.getElementById('toggleConfirm');
const submitBtn = document.getElementById('submitBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

// Alternância de tema
function setTheme(theme) {
  body.classList.remove('theme-modern', 'theme-minimal');
  body.classList.add(theme);
  const modern = theme === 'theme-modern';
  themeModernBtn.setAttribute('aria-pressed', modern);
  themeMinimalBtn.setAttribute('aria-pressed', !modern);
}

themeModernBtn.addEventListener('click', () => setTheme('theme-modern'));
themeMinimalBtn.addEventListener('click', () => setTheme('theme-minimal'));

// Toggle mostrar/esconder senha
function toggleType(input, btn) {
  const isPassword = input.getAttribute('type') === 'password';
  input.setAttribute('type', isPassword ? 'text' : 'password');
  btn.setAttribute('aria-label', isPassword ? 'Ocultar' : 'Mostrar');
  btn.textContent = isPassword ? 'Ocultar' : 'Mostrar';
}

togglePassword.addEventListener('click', () => toggleType(passwordInput, togglePassword));
toggleConfirm.addEventListener('click', () => toggleType(confirmInput, toggleConfirm));

// Medidor de força
function updateStrength() {
  const score = passwordScore(passwordInput.value);
  const pct = (score / 4) * 100;
  strengthBar.style.setProperty('--pct', pct + '%');
  strengthBar.style.setProperty('width', '100%');
  strengthBar.style.setProperty('background', '#3a3a3a');
  strengthBar.style.setProperty('position', 'relative');
  strengthBar.style.setProperty('overflow', 'hidden');
  strengthBar.style.setProperty('borderRadius', '4px');
  strengthBar.style.setProperty('boxShadow', 'none');
  strengthBar.style.setProperty('--bar', pct);
  // Move via pseudo-element (CSS usa ::after para width)
  strengthBar.style.setProperty('--afterWidth', pct + '%');
  strengthText.textContent = `Força: ${strengthLabel(score)}`;
  strengthBar.setAttribute('aria-valuenow', String(score));
}

passwordInput.addEventListener('input', updateStrength);

// Feedback inline e acessibilidade
function setFieldError(input, errorId, msg) {
  const el = document.getElementById(errorId);
  el.textContent = msg || '';
  input.setAttribute('aria-invalid', String(!!msg));
}

function validateAll() {
  let ok = true;
  if (!isValidName(nameInput.value)) {
    setFieldError(nameInput, 'nameError', 'Insira seu nome completo (mín. 2 palavras).');
    ok = false;
  } else setFieldError(nameInput, 'nameError', '');

  if (!isValidEmail(emailInput.value)) {
    setFieldError(emailInput, 'emailError', 'Insira um email válido.');
    ok = false;
  } else setFieldError(emailInput, 'emailError', '');

  const score = passwordScore(passwordInput.value);
  if (score < 3) {
    setFieldError(passwordInput, 'passwordError', 'Senha fraca. Inclua maiúscula, minúscula, número e 8+ caracteres.');
    ok = false;
  } else setFieldError(passwordInput, 'passwordError', '');

  if (confirmInput.value !== passwordInput.value) {
    setFieldError(confirmInput, 'confirmError', 'As senhas não conferem.');
    ok = false;
  } else setFieldError(confirmInput, 'confirmError', '');

  return ok;
}

nameInput.addEventListener('blur', () => validateAll());
emailInput.addEventListener('blur', () => validateAll());
passwordInput.addEventListener('blur', () => validateAll());
confirmInput.addEventListener('blur', () => validateAll());

// Submit com bloqueio e spinner
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateAll()) return;

  // Bloqueio
  submitBtn.setAttribute('disabled', 'true');
  submitBtn.setAttribute('aria-busy', 'true');

  // Simula processamento
  setTimeout(() => {
    submitBtn.removeAttribute('disabled');
    submitBtn.setAttribute('aria-busy', 'false');
    alert('Cadastro pronto para integrar ao backend.');
  }, 1200);
});

// Recomendações de segurança e integrações (comentários inline para devs)
// - Backend: hash de senhas com bcrypt/argon2; cookies HttpOnly + SameSite; rate-limit por IP/email; verificação de email
// - OAuth: integrar Google/GitHub com botões secundários e branding distinto; diferenciar visual (btn-secondary) vs. formulário (btn-primary)