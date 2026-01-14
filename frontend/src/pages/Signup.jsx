import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom' 
import { LuBookOpen, LuShieldCheck } from 'react-icons/lu'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { SiGoogle, SiGithub } from 'react-icons/si'
import { useAuth } from '../contexts/AuthContextCore.jsx'
import styles from '../styles/Login.module.css'
import * as FM from 'framer-motion'

const Motion = FM.motion
const AnimatePresence = FM.AnimatePresence

const container = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.05, delayChildren: 0.05 } },
  exit: { opacity: 0 }
}
const panelVariant = {
  initial: { y: 20, opacity: 0, scale: 0.985, filter: 'blur(8px)' },
  animate: { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 380, damping: 24 } },
  exit: { y: -16, opacity: 0, scale: 0.99, transition: { duration: 0.28, ease: 'easeIn' } }
}
const leftVariant = { initial: { x: -16, opacity: 0, scale: 0.99 }, animate: { x: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 420, damping: 26 } } }
const rightVariant = { initial: { x: 16, opacity: 0, scale: 0.99 }, animate: { x: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 420, damping: 26, delay: 0.03 } } }
const childVariant = { initial: { opacity: 0, y: 14, scale: 0.985 }, animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } } }

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
    if (strength < 40) return '#ef4444'
    if (strength < 70) return '#f59e0b'
    return '#22c55e'
  }

  const validateForm = () => {
    const newErrors = {}
    if (!name) newErrors.name = 'Nome é obrigatório.'
    else if (name.length < 4) newErrors.name = 'Nome deve ter pelo menos 4 caracteres.'
    else if (!/^[a-zA-Z0-9_]+$/.test(name)) newErrors.name = 'Nome não deve conter caracteres especiais.'

    if (!email) newErrors.email = 'Email é obrigatório.'
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) newErrors.email = 'Email inválido.'

    if (!password) newErrors.password = 'Senha é obrigatória.'
    else if (password.length < 8) newErrors.password = 'Senha deve ter pelo menos 8 caracteres.'
    else if (!/[A-Z]/.test(password)) newErrors.password = 'Senha deve conter pelo menos 1 letra maiúscula.'
    else if (!/[0-9]/.test(password)) newErrors.password = 'Senha deve conter pelo menos 1 número.'
    else if (!/[^A-Za-z0-9]/.test(password)) newErrors.password = 'Senha deve conter pelo menos 1 caractere especial.'

    if (!confirmPassword) newErrors.confirmPassword = 'Confirmação de senha é obrigatória.'
    else if (password !== confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem.'

    if (!termsAccepted) newErrors.terms = 'Você deve aceitar os termos de serviço.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const makeRegisterPayload = ({ name, email, password }) => ({
    name: String(name || '').trim(),
    email: String(email || '').trim(),
    password: String(password || ''),
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true, confirmPassword: true, terms: true })

    if (!validateForm()) return

    setLoading(true)
    setErrors(prev => ({ ...prev, general: undefined }))
    try {
      const payload = makeRegisterPayload({ name, email, password })
      const result = await register(payload.name, payload.email, payload.password)

      if (result && result.success) navigate('/dashboard')
      else setErrors(prev => ({ ...prev, general: result?.error || 'Erro ao cadastrar. Tente novamente.' }))
    } catch (error) {
      setErrors(prev => ({ ...prev, general: 'Erro ao cadastrar. Tente novamente.' }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Motion.main
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
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <div key={n} className={`${styles.particle} ${styles.particleWhite} ${styles['particle'+n]}`}></div>
          ))}
        </div>
      </div>

      <div className={styles.loginAmbientGlow} aria-hidden="true" />

      <section aria-label="Painel de autenticação" className={`${styles.loginPanelRoot} ${styles.loginPanel} animate-fade-in`}>
        <div className={styles.textureSubtle} aria-hidden="true" />

        <div className={styles.leftPanel}>
          <div className={styles.panelOverlayWrap} aria-hidden="true" />
          <div className={styles.leftPanelContent}>
            
            {/* Ícone agora envolvido por Link para a home */}
            <div className={styles.heroIcon}>
              <Link to="/">
                <LuBookOpen size={48} className={styles.iconBlack} aria-hidden="true" />
              </Link>
            </div>

            <h2 className={styles.heroTitle}>Conhecimento que inspira</h2>
            <p className={styles.heroLead}>Aprenda continuamente com conteúdos selecionados e avance na sua jornada.</p>

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
            <SocialButton icon={<SiGoogle className={styles.socialIcon} />} label="Cadastrar com Google" onClick={() => window.location.href = import.meta.env.VITE_GOOGLE_OAUTH_URL || 'http://localhost:8080/oauth2/authorization/google'} />
            <SocialButton icon={<SiGithub className={styles.socialIcon} />} label="Cadastrar com GitHub" onClick={() => window.location.href = import.meta.env.VITE_GITHUB_OAUTH_URL || 'http://localhost:8080/oauth2/authorization/github'} />
          </div>

          <Divider label="Ou" />

          <form onSubmit={handleSubmit} className={`${styles.form} ${styles.relativeZ10} ${styles.spaceY4}`} aria-label="Formulário de cadastro">
            
            {/* NOME */}
            <div>
              <label htmlFor="name" className="sr-only">Nome</label>
              <div className={styles.inputWrapper}>
                <input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, name: true }))}
                  className={`${styles.inputBase} ${styles.inputLight} ${touched.name && errors.name ? styles.inputLightError : ''}`}
                />
                <span className={styles.inputIcon}>
                  <LuBookOpen className={styles.iconBlack} aria-hidden="true" />
                </span>
              </div>
              {touched.name && errors.name && (
                <p className={styles.fieldError}>{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className={styles.inputWrapper}>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, email: true }))}
                  className={`${styles.inputBase} ${styles.inputLight} ${touched.email && errors.email ? styles.inputLightError : ''}`}
                />
                <span className={styles.inputIcon}>
                  <FiMail className={styles.iconBlack} aria-hidden="true" />
                </span>
              </div>
              {touched.email && errors.email && (
                <p className={styles.fieldError}>{errors.email}</p>
              )}
            </div>

            {/* SENHA */}
            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <div className={styles.inputWrapper}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, password: true }))}
                  className={`${styles.inputBase} ${styles.inputLight} ${touched.password && errors.password ? styles.inputLightError : ''}`}
                />
                <FiLock className={`${styles.inputIcon} ${styles.iconBlack}`} aria-hidden="true" />

                <button type="button" onClick={() => setShowPassword(v => !v)} className={styles.inputAction}>
                  <AnimatePresence mode="wait" initial={false}>
                    {showPassword ? (
                      <Motion.span
                        key="eye-off"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <FiEyeOff className={styles.iconBlack} />
                      </Motion.span>
                    ) : (
                      <Motion.span
                        key="eye-on"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <FiEye className={styles.iconBlack} />
                      </Motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
              {touched.password && errors.password && (
                <p className={styles.fieldError}>{errors.password}</p>
              )}
            </div>

            {/* CONFIRMAR SENHA */}
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirmar Senha</label>
              <div className={styles.inputWrapper}>
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, confirmPassword: true }))}
                  className={`${styles.inputBase} ${styles.inputLight} ${touched.confirmPassword && errors.confirmPassword ? styles.inputLightError : ''}`}
                />
                <FiLock className={`${styles.inputIcon} ${styles.iconBlack}`} aria-hidden="true" />

                <button type="button" onClick={() => setShowConfirmPassword(v => !v)} className={styles.inputAction}>
                  <AnimatePresence mode="wait" initial={false}>
                    {showConfirmPassword ? (
                      <Motion.span
                        key="eye-off-confirm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <FiEyeOff className={styles.iconBlack} />
                      </Motion.span>
                    ) : (
                      <Motion.span
                        key="eye-on-confirm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <FiEye className={styles.iconBlack} />
                      </Motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className={styles.fieldError}>{errors.confirmPassword}</p>
              )}
            </div>

            {/* TERMOS */}
            <div className={styles.rowBetween}>
              <label className={`inline-flex ${styles.rememberLabel}`} htmlFor="terms">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                Eu concordo com os <a href="#" className={styles.link}>Termos de Serviço</a>.
              </label>
            </div>

            {errors.general && (
              <p role="alert" className={styles.fieldError}>{errors.general}</p>
            )}

            <button type="submit" disabled={loading || !termsAccepted} className={`${styles.submitButton} ${styles.submitFull}`}>
              {loading && <span className={styles.submitSpinner} />}
              <span>{loading ? 'Cadastrando...' : 'Cadastrar'}</span>
            </button>
          </form>

          <p className={`${styles.footerText} ${styles.relativeZ10}`}>
            Já tem uma conta? <Link to="/login" className={styles.link}>Entrar</Link>
          </p>
        </div>
      </section>
    </Motion.main>
  )
}

function SocialButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.socialButton} ${styles.socialBtn}`}
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