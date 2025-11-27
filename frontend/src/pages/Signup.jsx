import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuBookOpen, LuShieldCheck } from 'react-icons/lu'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { SiGoogle, SiGithub } from 'react-icons/si'
import { useAuth } from '../contexts/AuthContextCore.js'
import styles from '../styles/Login.module.css'
import { motion, AnimatePresence } from 'framer-motion'

export default function Signup() {
  const { register } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    validateForm()
  }, [name, email, password, confirmPassword, termsAccepted])

  useEffect(() => {
    calculatePasswordStrength(password)
  }, [password])

  const calculatePasswordStrength = (pwd) => {
    let strength = 0
    if (pwd.length > 5) strength += 20
    if (pwd.length > 8) strength += 20
    if (/[A-Z]/.test(pwd)) strength += 20
    if (/[a-z]/.test(pwd)) strength += 20
    if (/[0-9]/.test(pwd)) strength += 20
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 20
    setPasswordStrength(Math.min(strength, 100))
  }

  const getPasswordStrengthText = (strength) => {
    if (strength < 40) return 'Fraca'
    if (strength < 70) return 'Média'
    return 'Forte'
  }

  const getPasswordStrengthColor = (strength) => {
    if (strength < 40) return '#ef4444' // Red
    if (strength < 70) return '#f59e0b' // Orange
    return '#22c55e' // Green
  }

  const validateForm = () => {
    const newErrors = {}
    if (!name) {
      newErrors.name = 'Nome é obrigatório.'
    } else if (name.length < 4) {
      newErrors.name = 'Nome deve ter pelo menos 4 caracteres.'
    } else if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      newErrors.name = 'Nome não deve conter caracteres especiais.'
    }

    if (!email) {
      newErrors.email = 'Email é obrigatório.'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      newErrors.email = 'Email inválido.'
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória.'
    } else if (password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres.'
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Senha deve conter pelo menos 1 letra maiúscula.'
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Senha deve conter pelo menos 1 número.'
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      newErrors.password = 'Senha deve conter pelo menos 1 caractere especial.'
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória.'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.'
    }

    if (!termsAccepted) {
      newErrors.terms = 'Você deve aceitar os termos de serviço.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const makeRegisterPayload = ({ name, email, password }) => {
    return {
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      password: String(password || ''),
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true, confirmPassword: true, terms: true })

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrors(prev => ({ ...prev, general: undefined }))
    try {
      const payload = makeRegisterPayload({ name, email, password })
      const result = await register(payload.name, payload.email, payload.password)

      if (result && result.success) {
        navigate('/dashboard')
      } else {
        const message = result?.error || 'Erro ao cadastrar. Tente novamente.'
        setErrors(prev => ({ ...prev, general: message }))
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, general: 'Erro ao cadastrar. Tente novamente.' }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.main
      className={`page-login ${styles.loginPage} ${styles.pageRoot}`}
      initial={{ opacity: 0, y: -50, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -50, rotateX: 15 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    >
      <div className={styles.backgroundElements}>
        <div className={styles.floatingOrbs}>
          <div className={styles.floatingOrb}></div>
          <div className={styles.floatingOrb}></div>
          <div className={styles.floatingOrb}></div>
          <div className={styles.floatingOrb}></div>
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
          <div className={styles.panelOverlayWrap} aria-hidden="true" />

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
            <h1 className={styles.title}>Criar Conta</h1>
            <p className={styles.subtitle}>Bem-vindo! Crie sua conta para continuar.</p>
            {errors.general && (
              <div className={`${styles.errorMessageLight} ${styles.errorAlert}`} role="alert">
                {errors.general}
              </div>
            )}
          </header>

          <div className={`${styles.relativeZ10} ${styles.socialGrid} animate-slide-in-up delay-200`}>
            <SocialButton icon={<SiGoogle className={styles.socialIcon} aria-hidden="true" />} label="Cadastrar com Google" onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'} />
            <SocialButton icon={<SiGithub className={styles.socialIcon} aria-hidden="true" />} label="Cadastrar com GitHub" onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/github'} />
          </div>

          <Divider label="Ou" />

          <form
            onSubmit={handleSubmit}
            className={`${styles.form} ${styles.relativeZ10} ${styles.spaceY4}`}
            aria-label="Formulário de cadastro"
          >
            <div>
              <label htmlFor="name" className="sr-only">Nome</label>
              <div className={styles.inputWrapper}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={touched.name && !!errors.name}
                  aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, name: true }))}
                  className={`${styles.inputBase} ${styles.inputLight} ${touched.name && errors.name ? styles.inputLightError : ''} ${styles.placeholderLight}`}
                />
                <span className={styles.inputIcon}>
                  <LuBookOpen className={styles.iconBlack} aria-hidden="true" />
                </span>
              </div>
              {touched.name && errors.name ? (
                <p id="name-error" role="alert" className={styles.fieldError}>{errors.name}</p>
              ) : null}
            </div>

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
              <div className={styles.inputWrapper}>
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
              </div>
              {touched.password && errors.password ? (
                <p id="password-error" role="alert" className={styles.fieldError}>{errors.password}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirmar Senha</label>
              <div className={styles.inputWrapper}>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  aria-required="true"
                  aria-invalid={touched.confirmPassword && !!errors.confirmPassword}
                  aria-describedby={touched.confirmPassword && errors.confirmPassword ? 'confirm-password-error' : undefined}
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, confirmPassword: true }))}
                  className={`${styles.inputBase} ${styles.inputLight} ${touched.confirmPassword && errors.confirmPassword ? styles.inputLightError : ''} ${styles.placeholderLight}`}
                />
                <FiLock className={`${styles.inputIcon} ${styles.iconBlack}`} aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(v => !v)}
                  aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className={styles.inputAction}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {showConfirmPassword ? (
                      <motion.span
                        key="eye-off-confirm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <FiEyeOff className={styles.iconBlack} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="eye-on-confirm"
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
              </div>
              {touched.confirmPassword && errors.confirmPassword ? (
                <p id="confirm-password-error" role="alert" className={styles.fieldError}>{errors.confirmPassword}</p>
              ) : null}
            </div>

            <div className={styles.rowBetween}>
              <label className={`inline-flex ${styles.rememberLabel}`} htmlFor="terms">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                Eu concordo com os <a href="#" className={styles.link}>Termos de Serviço</a>.
              </label>
            </div>

            {errors.general && (
              <p role="alert" className={styles.fieldError}>{errors.general}</p>
            )}

            <button
              type="submit"
              disabled={loading || !termsAccepted}
              className={`${styles.submitButton} ${styles.submitFull}`}
              data-testid="submit-signup"
            >
              {loading ? (
                <span className={styles.submitSpinner} aria-hidden="true" />
              ) : null}
              <span>{loading ? 'Cadastrando...' : 'Cadastrar'}</span>
            </button>
          </form>

          <p className={`${styles.footerText} ${styles.relativeZ10}`}>
            Já tem uma conta?{' '}
            <a href="/login" className={styles.link}>Entrar</a>
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
