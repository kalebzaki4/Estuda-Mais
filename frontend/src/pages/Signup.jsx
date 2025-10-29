import { useState } from 'react'
import { SiGoogle, SiGithub } from 'react-icons/si'
import { LuBookOpen, LuShieldCheck } from 'react-icons/lu'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useNavigate, Link } from 'react-router-dom'
import { isValidEmail, getPasswordIssues, isValidPassword, validateName } from '../utils/validators'
import { AUTH_REGISTER_ENDPOINT } from '../config/apiEndpoints'
import axios from 'axios'

const brandPurple = '#7b2ff7'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [touched, setTouched] = useState({ name: false, email: false, password: false, confirmPassword: false })
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '', general: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true, confirmPassword: true })
    const newErrors = { name: '', email: '', password: '', confirmPassword: '', general: '' }

    if (!validateName(name)) {
      newErrors.name = 'Nome é obrigatório e deve ter pelo menos 3 caracteres.'
    }
    if (!isValidEmail(email)) {
      newErrors.email = 'Insira um email válido.'
    }
    if (!isValidPassword(password)) {
      const pwdIssues = getPasswordIssues(password)
      newErrors.password = pwdIssues.filter(msg => !msg.startsWith('Recomendado:'))[0] || 'Senha inválida.'
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.'
    }

    setErrors(newErrors)
    if (Object.values(newErrors).some(error => error !== '')) {
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(AUTH_REGISTER_ENDPOINT, {
        nome: name,
        email,
        senha: password,
      })
      console.log('Registration successful:', response.data)
      navigate('/login') // Redirect to login after successful registration
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ ...newErrors, general: error.response?.data?.message || 'Erro ao cadastrar. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
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
        className="relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-soft overflow-hidden bg-surface-800 enter-fade-up"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        <div className="pointer-events-none absolute inset-0 texture-subtle" aria-hidden="true" />

        <div
          className="hidden md:flex relative items-center justify-center p-10 animated-gradient"
          style={{ backgroundImage: `linear-gradient(135deg, ${brandPurple}, #6a24d9 60%, #2d0a66)` }}
        >
          <div className="absolute inset-0 opacity-20" aria-hidden="true"
               style={{ background: 'radial-gradient(800px 400px at 20% 20%, rgba(255,255,255,0.15), transparent 60%)' }} />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-glow breathing">
              <LuBookOpen size={48} className="text-white" aria-hidden="true" />
            </div>

            <h2 className="text-white text-3xl font-semibold hover-jitter">Conhecimento que inspira</h2>
            <p className="text-white/85 max-w-md">
              Aprenda continuamente com conteúdos selecionados e avance na sua jornada.
            </p>

            <div className="mt-6 flex items-center gap-3 text-white/80">
              <LuShieldCheck aria-hidden="true" />
              <span>Segurança e privacidade garantidas</span>
            </div>
          </div>

          {/* Sutil glow na base do card */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-16 rounded-full" aria-hidden="true"
               style={{ boxShadow: '0 40px 80px rgba(123,47,247,0.35)' }} />
        </div>

        {/* Coluna Direita — Formulário Dark Mode */}
        <div className="relative p-8 sm:p-10">
          {/* Iluminação ambiente roxa suave */}
          <div className="absolute inset-0 ambient-radial pointer-events-none" aria-hidden="true" />

          <header className="mb-8 relative z-10">
            <h1 className="text-3xl font-semibold text-white">Criar Conta</h1>
            <p className="mt-2 text-sm text-white/70">Crie sua conta para começar a aprender.</p>
          </header>

          {/* Social Login */}
          <div className="relative z-10 grid grid-cols-1 gap-3">
            <SocialButton icon={<SiGoogle className="social-icon text-white" aria-hidden="true" />} label="Cadastrar com Google" />
            <SocialButton icon={<SiGithub className="social-icon text-white" aria-hidden="true" />} label="Cadastrar com GitHub" />
          </div>

          {/* Divisor */}
          <Divider label="Ou" />

          {/* Form */}
          <form
            onSubmit={handleSignup}
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
                  className={`input-focus-glow w-full rounded-xl bg-[#282828] text-white placeholder:text-white/60 border ${touched.name && errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-500'} focus:outline-none transition-[border,opacity] duration-300 px-4 py-3 pl-12`}
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
                  className={`input-focus-glow w-full rounded-xl bg-[#282828] text-white placeholder:text-white/60 border ${touched.email && errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-500'} focus:outline-none transition-[border,opacity] duration-300 px-4 py-3 pl-12`}
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
                  className={`input-focus-glow w-full rounded-xl bg-[#282828] text-white placeholder:text-white/60 border ${touched.password && errors.password ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-500'} focus:outline-none transition-[border,opacity] duration-300 px-4 py-3 pl-12 pr-12`}
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
                  className={`input-focus-glow w-full rounded-xl bg-[#282828] text-white placeholder:text-white/60 border ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-500'} focus:outline-none transition-[border,opacity] duration-300 px-4 py-3 pl-12 pr-12`}
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

            {errors.general && (
              <p role="alert" className="mt-2 text-sm text-red-400">{errors.general}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`pressable ripple w-full rounded text-white font-medium py-3 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg btn-primary`}
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/60 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              ) : null}
              <span>{loading ? 'Cadastrando...' : 'Cadastrar'}</span>
            </button>
          </form>

          <p className="mt-6 text-sm text-white/70 relative z-10">
            Já tem uma conta?{' '}
            <a href="/login" className="text-brand-300 hover:text-brand-200">Faça login aqui</a>
          </p>
        </div>
      </section>
    </main>
  )
}

function SocialButton({ icon, label }) {
  return (
    <button
      type="button"
      className="social-btn w-full flex items-center gap-3 rounded-xl bg-[#282828] text-white px-4 py-3 border border-white/10 hover:border-white/20 hover:shadow-soft transition-[colors,box-shadow] duration-300"
      aria-label={label}
    >
      <span className="inline-flex items-center justify-center w-6 h-6">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}

function Divider({ label }) {
  return (
    <div className="my-6 flex items-center gap-3" aria-hidden="true">
      <div className="h-px w-full bg-white/10" />
      <span className="text-white/60 text-xs uppercase tracking-wider">{label}</span>
      <div className="h-px w-full bg-white/10" />
    </div>
  )
}