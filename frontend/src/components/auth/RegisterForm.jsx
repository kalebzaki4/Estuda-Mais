import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import authService from '../../services/authService.js';

const fieldBase = 'block w-full max-w-full rounded-lg bg-neutral-900/60 border border-neutral-700 px-4 py-3 text-white placeholder:text-neutral-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-surface-800';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    let t;
    if (success) t = setTimeout(() => setSuccess(''), 2500);
    return () => clearTimeout(t);
  }, [success]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const errors = {};
    if (!formData.nome.trim()) errors.nome = 'Nome é obrigatório';
    if (!formData.email.trim()) errors.email = 'E-mail é obrigatório';
    else if (!validateEmail(formData.email)) errors.email = 'E-mail inválido';
    if (!formData.senha.trim()) errors.senha = 'Senha é obrigatória';
    else if (formData.senha.length < 8) errors.senha = 'Mínimo de 8 caracteres';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validateForm()) return;
    setLoading(true);
    try {
      await authService.register(formData.nome, formData.email, formData.senha);
      setSuccess('Conta criada com sucesso!');
    } catch (err) {
      setError(err.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Mensagens */}
      <div className="min-h-[28px] mb-3">
        {error && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-red-400">
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-green-400">
            {success}
          </motion.div>
        )}
      </div>

      <motion.form onSubmit={handleSubmit} noValidate initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <label htmlFor="nome" className="block text-sm text-neutral-300 mb-1">Nome completo</label>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <input id="nome" name="nome" type="text" placeholder="Seu nome" className={`${fieldBase} pl-11`} value={formData.nome} onChange={handleChange} aria-invalid={!!fieldErrors.nome} aria-describedby={fieldErrors.nome ? 'nome-err' : undefined} />
        </div>
        {fieldErrors.nome && <div id="nome-err" className="mt-1 text-xs text-red-400">{fieldErrors.nome}</div>}

        <div className="mt-4">
          <label htmlFor="email" className="block text-sm text-neutral-300 mb-1">E-mail</label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="5" width="18" height="14" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input id="email" name="email" type="email" placeholder="Seu melhor e-mail" className={`${fieldBase} pl-11`} value={formData.email} onChange={handleChange} aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? 'email-err' : undefined} />
          </div>
          {fieldErrors.email && <div id="email-err" className="mt-1 text-xs text-red-400">{fieldErrors.email}</div>}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="senha" className="block text-sm text-neutral-300">Senha</label>
            <div className="text-xs text-neutral-400" title="A senha deve ter ao menos 8 caracteres">Requisitos</div>
          </div>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="10" width="14" height="10" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input id="senha" name="senha" type={showPassword ? 'text' : 'password'} placeholder="Crie uma senha" className={`${fieldBase} pl-11 pr-12`} value={formData.senha} onChange={handleChange} aria-invalid={!!fieldErrors.senha} aria-describedby={fieldErrors.senha ? 'senha-err' : undefined} />
            <button type="button" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 z-30 text-neutral-300 hover:text-white transition"><svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">{showPassword ? (<path fill="currentColor" d="M12 5c-7 0-10 7-10 7s3 7 10 7a10.7 10.7 0 0 0 5.2-1.5l-1.7-1.7A8.7 8.7 0 0 1 12 18c-5.5 0-8-6-8-6s2.5-6 8-6c2.2 0 4 .7 5.4 1.7l1.5-1.5A11.7 11.7 0 0 0 12 5Zm0 4a3 3 0 0 0-3 3c0 .5.1 1 .3 1.4l4.1-4.1c-.4-.2-.9-.3-1.4-.3Zm0 6a3 3 0 0 0 3-3c0-.5-.1-1-.3-1.4l-4.1 4.1c.4.2.9.3 1.4.3Z" />) : (<path fill="currentColor" d="M1.5 12s3.5-7 10.5-7 10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Zm10.5-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />)}</svg></button>
          </div>
          {fieldErrors.senha && <div id="senha-err" className="mt-1 text-xs text-red-400">{fieldErrors.senha}</div>}
        </div>

        <div className="mt-5">
          <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-500 to-brand-400 px-5 py-3 font-semibold text-white shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed">
            {loading && <motion.span className="h-4 w-4 rounded-full border-2 border-white/60 border-t-transparent" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} />}
            {loading ? 'Criando...' : 'Criar conta'}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default RegisterForm;