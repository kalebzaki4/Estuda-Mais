import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuBookOpen, LuShieldCheck } from 'react-icons/lu'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { SiGoogle, SiGithub } from 'react-icons/si'
import { useAuth } from '../contexts/AuthContextCore.js'

// const brandPurple = '#7b2ff7'

class SignupErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen w-full grid place-items-center bg-[#0a0a0a] text-white">
          <div>
            <h1 className="text-2xl font-semibold">Ocorreu um erro</h1>
            <p className="mt-2 text-white/70">Tente recarregar a página.</p>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}

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
    <SignupErrorBoundary>
    <main className="page-radial-animated page-login min-h-screen w-full grid place-items-center px-4 relative">
      <div className="background-elements">
        <div className="floating-orbs">
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
        </div>
        <div className="particles">
          <div className="particle" style={{ left: '10%', animationDelay: '0s' }}></div>
          <div className="particle" style={{ left: '20%', animationDelay: '2s' }}></div>
          <div className="particle" style={{ left: '30%', animationDelay: '4s' }}></div>
          <div className="particle" style={{ left: '40%', animationDelay: '6s' }}></div>
          <div className="particle" style={{ left: '50%', animationDelay: '8s' }}></div>
          <div className="particle" style={{ left: '60%', animationDelay: '10s' }}></div>
          <div className="particle" style={{ left: '70%', animationDelay: '12s' }}></div>
          <div className="particle" style={{ left: '80%', animationDelay: '14s' }}></div>
          <div className="particle" style={{ left: '90%', animationDelay: '16s' }}></div>
        </div>
      </div>

      <div className="absolute -z-0 w-[min(92vw,80rem)] h-[min(38vw,28rem)] card-ambient-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} aria-hidden="true" />

      <section
        aria-label="Painel de autenticação"
        className="relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-soft overflow-hidden bg-surface-800 animate-fade-in"
      >
        <div className="pointer-events-none absolute inset-0 texture-subtle" aria-hidden="true" />

        <div
          className="hidden md:flex relative items-center justify-center p-10 animated-gradient"
          style={{ backgroundImage: `linear-gradient(135deg, #7b2ff7, #6a24d9 60%, #2d0a66)` }}
        >
          <div className="absolute inset-0 opacity-20" aria-hidden="true"
               style={{ background: 'radial-gradient(800px 400px at 20% 20%, rgba(255,255,255,0.15), transparent 60%)' }} />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-glow breathing">
              <LuBookOpen size={48} className="text-white" aria-hidden="true" />
            </div>

            <h2 className="text-white text-3xl font-semibold animate-slide-in-up">Conhecimento que inspira</h2>
            <p className="text-white/85 max-w-md animate-slide-in-up delay-100">
              Aprenda continuamente com conteúdos selecionados e avance na sua jornada.
            </p>

            <div className="mt-6 flex items-center gap-3 text-white/80 animate-slide-in-up delay-200">
              <LuShieldCheck aria-hidden="true" />
              <span>Segurança e privacidade garantidas</span>
            </div>
          </div>

          {/* Sutil glow na base do card */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-16 rounded-full" aria-hidden="true"
               style={{ boxShadow: '0 40px 80px rgba(123,47,247,0.35)' }} />
        </div>

        {/* Coluna Direita — Formulário Dark Mode */}
        <div className="relative p-8 sm:p-10 animate-slide-in-up">
          {/* Iluminação ambiente roxa suave */}
          <div className="absolute inset-0 ambient-radial pointer-events-none" aria-hidden="true" />

          <header className="mb-8 relative z-10">
            <h1 className="text-3xl font-semibold text-white">Criar Conta</h1>
            <p className="mt-2 text-sm text-white/70">Crie sua conta para começar a aprender.</p>
            {errors.general && (
              <div className="mt-4 p-3 bg-red-800 text-white text-sm rounded-lg shadow-soft" role="alert">
                {errors.general}
              </div>
            )}
          </header>

          {/* Social Login */}
          <div className="relative z-10 grid grid-cols-1 gap-3 animate-slide-in-up delay-200">
            <SocialButton icon={<SiGoogle className="social-icon text-white" aria-hidden="true" />} label="Cadastrar com Google" />
            <SocialButton icon={<SiGithub className="social-icon text-white" aria-hidden="true" />} label="Cadastrar com GitHub" />
          </div>

          {/* Divisor */}
          <Divider label="Ou" />

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 space-y-4"
            aria-label="Formulário de cadastro"
          >
            <div>
              <label htmlFor="name" className="sr-only">Nome</label>
              <div className="relative">
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
                  className={`input-focus-glow w-full rounded-xl bg-surface-900 text-white placeholder:text-white/60 border ${touched.name && errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-500'} focus:outline-none transition-[border,opacity] duration-300 px-4 py-3 pl-12`}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <LuBookOpen className="text-white/90" aria-hidden="true" />
                </span>
              </div>
              {touched.name && errors.name ? (
                <p id="name-error" role="alert" className="mt-2 text-sm text-red-400">{errors.name}</p>
              ) : null}
            </div>

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
                  className={`input-focus-glow w-full rounded-xl bg-surface-900 text-white placeholder:text-white/60 border ${touched.email && errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-500'} focus:outline-none transition-[border,opacity] duration-300 px-4 py-3 pl-12`}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FiMail className="text-white/90" aria-hidden="true" />
                </span>
              </div>
              {touched.email && errors.email ? (
                <p id="email-error" role="alert" className="mt-2 text-sm text-red-400">{errors.email}</p>
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
                  className={`input-focus-glow w-full rounded-xl bg-surface-900 text-white placeholder:text-white/60 border ${touched.password && errors.password ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-500'} focus:outline-none transition-[border,opacity] duration-300 px-4 py-3 pl-12 pr-12`}
                />
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/90" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/90 hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {touched.password && errors.password ? (
                <p id="password-error" role="alert" className="mt-2 text-sm text-red-400">{errors.password}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirmar Senha</label>
              <div className="relative">
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
                  className={`input-focus-glow w-full rounded-xl bg-surface-900 text-white placeholder:text-white/60 border ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-500'} focus:outline-none transition-[border,opacity] duration-300 px-4 py-3 pl-12 pr-12`}
                />
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/90" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(v => !v)}
                  aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/90 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword ? (
                <p id="confirm-password-error" role="alert" className="mt-2 text-sm text-red-400">{errors.confirmPassword}</p>
              ) : null}
            </div>

            {/* Password Strength Indicator */}
            <div className="relative z-10 animate-slide-in-up delay-300">
              <div className="h-2 w-full rounded-full bg-surface-900 overflow-hidden">
                <div
                  className="h-full transition-all duration-500 ease-out"
                  style={{ width: `${passwordStrength}%`, backgroundColor: getPasswordStrengthColor(passwordStrength) }}
                />
              </div>
              <p className="mt-2 text-sm text-white/70">Força da senha: {getPasswordStrengthText(passwordStrength)}</p>
            </div>

            {/* Terms of Service Checkbox */}
            <div className="relative z-10 flex items-start gap-3 animate-slide-in-up delay-400">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 rounded-md border-white/20 bg-surface-900 text-brand-500 focus:ring-brand-500"
              />
              <label htmlFor="terms" className="text-sm text-white/70">
                Eu concordo com os <a href="#" className="text-brand-300 hover:text-brand-200">Termos de Serviço</a> e <a href="#" className="text-brand-300 hover:text-brand-200">Política de Privacidade</a>.
              </label>
            </div>

            {errors.general && (
              <p role="alert" className="mt-2 text-sm text-red-400">{errors.general}</p>
            )}

            <button
              type="submit"
              disabled={loading || !termsAccepted}
              className={`pressable ripple w-full rounded-xl text-white font-medium py-3 transition-all duration-300 flex items-center justify-center gap-2 shadow-soft hover:shadow-lg btn-primary bg-brand-500 hover:bg-brand-600`}
              data-testid="submit-signup"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/60 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              ) : null}
              <span>{loading ? 'Cadastrando...' : 'Cadastrar'}</span>
            </button>
          </form>

          <p className="mt-6 text-sm text-white/70 relative z-10 animate-fade-in delay-300">
            Já tem uma conta?{' '}
            <a href="/login" className="text-brand-300 hover:text-brand-200">Faça login aqui</a>
          </p>
        </div>
      </section>
    </main>
    </SignupErrorBoundary>
  )
}

function SocialButton({ icon, label }) {
  return (
    <button
      type="button"
      className="social-btn w-full flex items-center gap-3 rounded-xl bg-surface-900 text-white px-4 py-3 border border-white/10 hover:border-white/20 hover:shadow-soft transition-[colors,box-shadow] duration-300 animate-slide-in-up"
      aria-label={label}
    >
      <span className="inline-flex items-center justify-center w-6 h-6">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}

function Divider({ label }) {
  return (
    <div className="my-6 flex items-center gap-3 animate-fade-in delay-200" aria-hidden="true">
      <div className="h-px w-full bg-white/10" />
      <span className="text-white/60 text-xs uppercase tracking-wider">{label}</span>
      <div className="h-px w-full bg-white/10" />
    </div>
  )
}