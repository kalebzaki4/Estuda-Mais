import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground.jsx';

const AuthLayout = ({ title, subtitle, children, footerLinks }) => {
  return (
    <div className="min-h-screen w-full bg-surface-900 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Painel ilustrativo esquerdo */}
        <div className="relative hidden lg:block">
          <AnimatedBackground />
          <div className="absolute inset-0 p-8 flex flex-col">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-400" />
              <div className="text-xl font-semibold">Estuda+</div>
            </div>
            <div className="mt-auto max-w-md">
              <motion.h3
                className="text-2xl font-semibold"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Painel de aprendizado moderno
              </motion.h3>
              <motion.p
                className="mt-2 text-neutral-300"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Tecnologia, comunidade e conteúdo atualizado para você evoluir.
              </motion.p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {['Certificados digitais', 'Conteúdo prático', 'Comunidade ativa', 'Suporte dedicado'].map((t, i) => (
                  <motion.div
                    key={t}
                    className="rounded-2xl bg-surface-800/60 border border-neutral-700 px-4 py-3 text-sm text-neutral-300"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
                  >
                    {t}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Formulário direito */}
        <div className="flex items-center justify-center p-6 lg:p-10">
          <motion.div
            className="w-full max-w-md rounded-3xl bg-surface-800/80 backdrop-blur-sm border border-neutral-700 shadow-soft"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-400" />
                  <span className="text-base text-neutral-300">Estuda+</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
                {subtitle && <p className="mt-2 text-neutral-300">{subtitle}</p>}
              </div>

              {children}

              <div className="mt-6 text-center text-sm text-neutral-400">
                {footerLinks?.map((l, i) => (
                  <span key={l.to}>
                    <Link className="underline decoration-neutral-600 hover:decoration-brand-500 transition-colors" to={l.to}>{l.label}</Link>
                    {i < footerLinks.length - 1 && <span className="mx-2">•</span>}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Rodapé discreto */}
      <footer className="px-6 py-6 text-center text-xs text-neutral-500">
        <Link to="/terms" className="hover:text-neutral-300 transition-colors">Termos de uso</Link>
        <span className="mx-2">•</span>
        <Link to="/privacy" className="hover:text-neutral-300 transition-colors">Política de privacidade</Link>
      </footer>
    </div>
  );
};

export default AuthLayout;