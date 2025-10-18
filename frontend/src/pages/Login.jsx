import { useState } from 'react'
import { SiGoogle, SiGithub } from 'react-icons/si'
import { LuBookOpen, LuShieldCheck } from 'react-icons/lu'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

const brandPurple = '#7b2ff7'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="page-radial-animated min-h-screen w-full grid place-items-center px-4 relative">
      {/* Glow ambiente abaixo do card */}
      <div className="absolute -z-0 w-[min(92vw,80rem)] h-[min(38vw,28rem)] card-ambient-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} aria-hidden="true" />

      {/* Super Card */}
      <section
        aria-label="Painel de autenticação"
        className="relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-soft overflow-hidden bg-surface-800 enter-fade-up"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        {/* Textura sutil aplicada ao card inteiro */}
        <div className="pointer-events-none absolute inset-0 texture-subtle" aria-hidden="true" />

        {/* Coluna Esquerda — Visual Roxo Vibrante */}
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
            <h1 className="text-3xl font-semibold text-white">Entrar</h1>
            <p className="mt-2 text-sm text-white/70">Bem-vindo de volta. Faça login para continuar.</p>
          </header>

          {/* Social Login */}
          <div className="relative z-10 grid grid-cols-1 gap-3">
            <SocialButton icon={<SiGoogle className="social-icon text-white" aria-hidden="true" />} label="Entrar com Google" />
            <SocialButton icon={<SiGithub className="social-icon text-white" aria-hidden="true" />} label="Entrar com GitHub" />
          </div>

          {/* Divisor */}
          <Divider label="Ou" />

          {/* Form */}
          <form className="relative z-10 space-y-4" aria-label="Formulário de login">
            <FormField id="email" label="Email" type="email" placeholder="seu@email.com" icon={<FiMail className="text-white/90" aria-hidden="true" />} />

            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  aria-required="true"
                  placeholder="Sua senha"
                  className="w-full rounded-xl bg-[#282828] text-white placeholder:text-white/60 border border-white/10 focus:border-brand-500 focus:outline-none transition-[border,opacity] duration-300 px-4 py-3 pr-12"
                />
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/90" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/90 hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2 text-white/80">
                  <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-[#282828]" />
                  Lembrar-me
                </label>
                <a href="#" className="text-brand-300 hover:text-brand-200">Esqueceu a senha?</a>
              </div>
            </div>

            <button type="submit" className="pressable ripple w-full rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-medium py-3 transition-colors">
              Entrar
            </button>
          </form>

          {/* Acesso alternativo */}
          <p className="mt-6 text-sm text-white/70 relative z-10">
            Não tem uma conta?{' '}
            <a href="/signup" className="text-brand-300 hover:text-brand-200">Crie uma agora</a>
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

function FormField({ id, label, type = 'text', placeholder, icon }) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">{label}</label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          required
          aria-required="true"
          placeholder={placeholder}
          className="w-full rounded-xl bg-[#282828] text-white placeholder:text-white/60 border border-white/10 focus:border-brand-500 focus:outline-none transition-[border,opacity] duration-300 px-4 py-3 pl-10"
        />
        {icon ? (
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            {icon}
          </span>
        ) : null}
      </div>
    </div>
  )
}