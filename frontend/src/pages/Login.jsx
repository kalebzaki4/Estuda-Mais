import { useState, useEffect } from 'react'
import { SiGoogle, SiGithub } from 'react-icons/si'
import { LuBookOpen, LuShieldCheck } from 'react-icons/lu'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { isValidEmail, getPasswordIssues } from '../utils/validators'
import { useAuth } from '../contexts/AuthContextCore.js'
import styles from '../styles/Login.module.css'

export default function Login() {
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({ email: false, password: false })
  const [errors, setErrors] = useState({ email: '', password: '', general: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const oauthError = urlParams.get('error');
    if (oauthError) {
      let errorMessage = "Erro de autenticação OAuth. Tente novamente.";
      if (oauthError === "oauth_failed") {
        errorMessage = "Falha na autenticação OAuth. Por favor, tente novamente.";
      } else if (oauthError === "email_already_registered") {
        errorMessage = "Este e-mail já está registrado com outro provedor. Por favor, use o login social correspondente ou faça login com e-mail/senha.";
      } else if (oauthError === "email_not_found") {
        errorMessage = "E-mail não encontrado. Por favor, registre-se ou tente outro provedor.";
      }
      setErrors(prevErrors => ({ ...prevErrors, general: errorMessage }));
    }
  }, [location]);

  return (
    <main className={`page-login ${styles.loginPage} min-h-screen w-full grid place-items-center px-4 relative`}>
      <div className="background-elements">
        <div className="floating-orbs">
          <div className={`floating-orb ${styles.floatingOrbLight}`}></div>
          <div className={`floating-orb ${styles.floatingOrbLight}`}></div>
          <div className={`floating-orb ${styles.floatingOrbLight}`}></div>
          <div className={`floating-orb ${styles.floatingOrbLight}`}></div>
        </div>
        <div className="particles">
          <div className={`particle particleWhite ${styles.particle1}`}></div>
          <div className={`particle particleWhite ${styles.particle2}`}></div>
          <div className={`particle particleWhite ${styles.particle3}`}></div>
          <div className={`particle particleWhite ${styles.particle4}`}></div>
          <div className={`particle particleWhite ${styles.particle5}`}></div>
          <div className={`particle particleWhite ${styles.particle6}`}></div>
          <div className={`particle particleWhite ${styles.particle7}`}></div>
          <div className={`particle particleWhite ${styles.particle8}`}></div>
          <div className={`particle particleWhite ${styles.particle9}`}></div>
        </div>
      </div>

      <div className={`absolute -z-0 w-[min(92vw,80rem)] h-[min(38vw,28rem)] ${styles.loginAmbientGlow}`} aria-hidden="true" />

      <section
        aria-label="Painel de autenticação"
        className={`relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-soft overflow-hidden ${styles.loginPanel} animate-fade-in`}
      >
        <div className="pointer-events-none absolute inset-0 texture-subtle" aria-hidden="true" />

        <div
          className="hidden md:flex relative items-center justify-center p-10 bg-white"
        >
          <div className={`absolute inset-0 opacity-20 ${styles.panelOverlayLight}`} aria-hidden="true" />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center shadow-soft">
              <LuBookOpen size={48} className="text-black" aria-hidden="true" />
            </div>

            <h2 className="text-black text-3xl font-semibold animate-slide-in-up">Conhecimento que inspira</h2>
            <p className="text-black max-w-md animate-slide-in-up delay-100">
              Aprenda continuamente com conteúdos selecionados e avance na sua jornada.
            </p>

            <div className="mt-6 flex items-center gap-3 text-black animate-slide-in-up delay-200">
              <LuShieldCheck aria-hidden="true" />
              <span>Segurança e privacidade garantidas</span>
            </div>
          </div>

          <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-16 rounded-full ${styles.shadowHalo}`} aria-hidden="true" />
        </div>

        <div className="relative p-8 sm:p-10 animate-slide-in-up">
          <div className={`absolute inset-0 pointer-events-none ${styles.rightPanelOverlay}`} aria-hidden="true" />

          <header className="mb-8 relative z-10">
            <h1 className="text-3xl font-semibold text-white">Entrar</h1>
            <p className="mt-2 text-sm text-white">Bem-vindo de volta. Faça login para continuar.</p>
            {errors.general && (
              <div className={`mt-4 p-3 text-sm rounded-lg shadow-soft ${styles.errorMessageLight}`} role="alert">
                {errors.general}
              </div>
            )}
          </header>

          {/* Social Login */}
          <div className="relative z-10 grid grid-cols-1 gap-3 animate-slide-in-up delay-200">
            <SocialButton icon={<SiGoogle className="social-icon text-black" aria-hidden="true" />} label="Entrar com Google" onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'} />
            <SocialButton icon={<SiGithub className="social-icon text-black" aria-hidden="true" />} label="Entrar com GitHub" onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/github'} />
          </div>

          {/* Divisor */}
          <Divider label="Ou" />

          {/* Form */}
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              setTouched({ email: true, password: true })
              const newErrors = { email: '', password: '', general: '' }
              if (!isValidEmail(email)) {
                newErrors.email = 'Insira um email válido.'
              }
              const pwdIssues = getPasswordIssues(password)
              const blockingIssues = pwdIssues.filter(msg => !msg.startsWith('Recomendado:'))
              if (blockingIssues.length > 0) {
                newErrors.password = blockingIssues[0]
              }
              setErrors(newErrors)
              if (newErrors.email || newErrors.password) {
                return
              }
              setLoading(true)
              
              const result = await login(email, password)
              
              if (result.success) {
                navigate("/dashboard")
              } else {
                setErrors({ ...newErrors, general: result.error || "Erro ao fazer login. Tente novamente." })
              }
              
              setLoading(false)
            }}
            className="relative z-10 space-y-4"
            aria-label="Formulário de login"
          >
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  aria-invalid={touched.email && !!errors.email}
                  aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, email: true }))}
                  className={`input-focus-glow w-full rounded-xl ${styles.inputLight} ${touched.email && errors.email ? styles.inputLightError : ''} focus:outline-none transition-[border,opacity] duration-300 px-4 py-3 pl-12 ${styles.placeholderLight}`}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FiMail className="text-black" aria-hidden="true" />
                </span>
              </div>
              {touched.email && errors.email ? (
                <p id="email-error" role="alert" className="mt-2 text-sm text-black bg-white px-3 py-2 rounded">{errors.email}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  aria-required="true"
                  aria-invalid={touched.password && !!errors.password}
                  aria-describedby={touched.password && errors.password ? 'password-error' : undefined}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, password: true }))}
                  className={`input-focus-glow w-full rounded-xl ${styles.inputLight} ${touched.password && errors.password ? styles.inputLightError : ''} focus:outline-none transition-[border,opacity] duration-300 px-4 py-3 pl-12 pr-12 ${styles.placeholderLight}`}
                />
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-black" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:text-black transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {touched.password && errors.password ? (
                <p id="password-error" role="alert" className="mt-2 text-sm text-black bg-white px-3 py-2 rounded">{errors.password}</p>
              ) : null}
              <div className="mt-2 flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2 text-white">
                  <input type="checkbox" className="h-4 w-4 rounded border-white bg-white accent-black" />
                  Lembrar-me
                </label>
                <a href="#" className="text-white underline">Esqueci minha senha</a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`pressable ripple w-full rounded-xl font-medium py-3 transition-all duration-300 flex items-center justify-center gap-2 shadow-soft hover:shadow-lg ${styles.submitButton}`}
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              ) : null}
              <span>{loading ? 'Entrando...' : 'Entrar'}</span>
            </button>
          </form>

        <p className="mt-6 text-sm text-white relative z-10 animate-fade-in delay-300">
          Não tem uma conta?{' '}
          <a href="/signup" className="text-white underline">Crie uma agora</a>
        </p>
      </div>
    </section>
  </main>
  )
}

function SocialButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      className={`social-btn ${styles.socialButton} w-full flex items-center gap-3 rounded-xl px-4 py-3 transition-[colors,box-shadow] duration-300 animate-slide-in-up`}
      aria-label={label}
      onClick={onClick}
    >
      <span className="inline-flex items-center justify-center w-6 h-6">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}
 
function Divider({ label }) {
  return (
    <div className="my-6 flex items-center gap-3 animate-fade-in delay-200" aria-hidden="true">
      <div className="h-px w-full bg-white" />
      <span className="text-white text-xs uppercase tracking-wider">{label}</span>
      <div className="h-px w-full bg-white" />
    </div>
  )
}
