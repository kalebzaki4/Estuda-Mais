import { useState, useEffect } from 'react'
import { SiGoogle, SiGithub } from 'react-icons/si'
import { LuBookOpen, LuShieldCheck } from 'react-icons/lu'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { isValidEmail, getPasswordIssues } from '../utils/validators'
import { useAuth } from '../contexts/AuthContextCore.js'
import styles from '../styles/Login.module.css'
import { motion, AnimatePresence } from 'framer-motion'

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
    <motion.main
      className={`page-login ${styles.loginPage} ${styles.pageRoot}`}
      initial={{ opacity: 0, y: -50, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -50, rotateX: 15 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    >      <div className={styles.backgroundElements}>
        <div className={styles.floatingOrbs}>
          <div className={`${styles.floatingOrb} ${styles.floatingOrbLight}`}></div>
          <div className={`${styles.floatingOrb} ${styles.floatingOrbLight}`}></div>
          <div className={`${styles.floatingOrb} ${styles.floatingOrbLight}`}></div>
          <div className={`${styles.floatingOrb} ${styles.floatingOrbLight}`}></div>
        </div>
        <div className={styles.particles}>
          <div className={`${styles.particle} ${styles.particleWhite} ${styles.particle1}`}></div>
          <div className={`${styles.particle} ${styles.particleWhite} ${styles.particle2}`}></div>
          <div className={`${styles.particle} ${styles.particleWhite} ${styles.particle3}`}></div>
          <div className={`${styles.particle} ${styles.particleWhite} ${styles.particle4}`}></div>
          <div className={`${styles.particle} ${styles.particleWhite} ${styles.particle5}`}></div>
          <div className={`${styles.particle} ${styles.particleWhite} ${styles.particle6}`}></div>
          <div className={`${styles.particle} ${styles.particleWhite} ${styles.particle7}`}></div>
          <div className={`${styles.particle} ${styles.particleWhite} ${styles.particle8}`}></div>
          <div className={`${styles.particle} ${styles.particleWhite} ${styles.particle9}`}></div>
        </div>
      </div>

      <div className={styles.loginAmbientGlow} aria-hidden="true" />

      <section
        aria-label="Painel de autenticação"
        className={`${styles.loginPanelRoot} ${styles.loginPanel} animate-fade-in`}
      >
        <div className={styles.textureSubtle} aria-hidden="true" />

        <div className={styles.leftPanel}>
          <div className={`${styles.panelOverlayWrap} ${styles.panelOverlayLight}`} aria-hidden="true" />

          <div className={styles.leftPanelContent}>
            <div className={styles.heroIcon}>
              <LuBookOpen size={48} className={styles.iconBlack} aria-hidden="true" />
            </div>

            <h2 className={styles.heroTitle}>Conhecimento que inspira</h2>
            <p className={styles.heroLead}>
              Aprenda continuamente com conteúdos selecionados e avance na sua jornada.
            </p>

            <div className={styles.heroInfo}>
              <LuShieldCheck aria-hidden="true" />
              <span>Segurança e privacidade garantidas</span>
            </div>
          </div>

          <div className={`${styles.haloWrap} ${styles.shadowHalo}`} aria-hidden="true" />
        </div>

        <div className={`${styles.rightPanel} animate-slide-in-up`}>
          <div className={`${styles.rightPanelOverlayWrap} ${styles.rightPanelOverlay}`} aria-hidden="true" />

          <header className={`${styles.header} ${styles.relativeZ10}`}>
            <h1 className={styles.title}>Entrar</h1>
            <p className={styles.subtitle}>Bem-vindo de volta. Faça login para continuar.</p>
            {errors.general && (
              <div className={`${styles.errorMessageLight} ${styles.errorAlert}`} role="alert">
                {errors.general}
              </div>
            )}
          </header>

          <div className={`${styles.relativeZ10} ${styles.socialGrid} animate-slide-in-up delay-200`}>
            <SocialButton icon={<SiGoogle className={styles.socialIcon} aria-hidden="true" />} label="Entrar com Google" onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'} />
            <SocialButton icon={<SiGithub className={styles.socialIcon} aria-hidden="true" />} label="Entrar com GitHub" onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/github'} />
          </div>

          <Divider label="Ou" />

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
            className={`${styles.form} ${styles.relativeZ10} ${styles.spaceY4}`}
            aria-label="Formulário de login"
          >
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className={styles.inputWrapper}>
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
                  className={`${styles.inputBase} ${styles.inputLight} ${touched.email && errors.email ? styles.inputLightError : ''} ${styles.placeholderLight}`}
                />
                <span className={styles.inputIcon}>
                  <FiMail className={styles.iconBlack} aria-hidden="true" />
                </span>
              </div>
              {touched.email && errors.email ? (
                <p id="email-error" role="alert" className={styles.fieldError}>{errors.email}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <motion.div
                key={showPassword ? "password-visible" : "password-hidden"}
                initial={{ x: 0 }}
                animate={{ x: [0, -2, 2, -2, 2, 0] }}
                transition={{ duration: 0.3 }}
                className={styles.inputWrapper}
              >
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
                  className={`${styles.inputBase} ${styles.inputLight} ${touched.password && errors.password ? styles.inputLightError : ''} ${styles.placeholderLight}`}
                />
                <FiLock className={`${styles.inputIcon} ${styles.iconBlack}`} aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className={styles.inputAction}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {showPassword ? (
                      <motion.span
                        key="eye-off"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <FiEyeOff className={styles.iconBlack} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="eye-on"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <FiEye className={styles.iconBlack} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
              {touched.password && errors.password ? (
                <p id="password-error" role="alert" className={styles.fieldError}>{errors.password}</p>
              ) : null}
              <div className={styles.rowBetween}>
                <label className={`inline-flex ${styles.rememberLabel}`}>
                  <input type="checkbox" />
                  Lembrar-me
                </label>
                <a href="#" className={styles.link}>Esqueci minha senha</a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${styles.submitButton} ${styles.submitFull}`}
            >
              {loading ? (
                <span className={styles.submitSpinner} aria-hidden="true" />
              ) : null}
              <span>{loading ? 'Entrando...' : 'Entrar'}</span>
            </button>
          </form>

        <p className={`${styles.footerText} ${styles.relativeZ10}`}>
          Não tem uma conta?{' '}
          <a href="/signup" className={styles.link}>Crie uma agora</a>
        </p>
      </div>
    </section>
  </motion.main>
  )
}

function SocialButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.socialButton} ${styles.socialBtn}`}
      aria-label={label}
      onClick={onClick}
    >
      <span className={styles.socialIcon}>{icon}</span>
      <span className={styles.socialLabel}>{label}</span>
    </button>
  )
}
 
function Divider({ label }) {
  return (
    <div className={styles.dividerWrap} aria-hidden="true">
      <div className={styles.dividerLine} />
      <span className={styles.dividerLabel}>{label}</span>
      <div className={styles.dividerLine} />
    </div>
  )
}
