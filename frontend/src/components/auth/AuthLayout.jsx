import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DecorativeLeftPanel from '../DecorativeLeftPanel.jsx';

const AuthLayout = ({ title, subtitle, children, footerLinks }) => {
  return (
    // Container principal: duas colunas, ajustando proporção 65/35 em telas grandes.
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[65%_35%] 2xl:grid-cols-[60%_40%] overflow-x-hidden bg-neutral-900 text-white">
      {/* Painel ilustrativo (apenas decorativo) */}
      <div className="relative overflow-hidden hidden md:block">
        <DecorativeLeftPanel
          variant="mesh"
          headline="Seu Futuro Começa Aqui"
          subheadline="Aprenda com uma plataforma moderna, rápida e focada em resultado."
          compactOnMobile={false}
        />
      </div>

      {/* Painel do formulário */}
      <main className="flex items-center justify-center p-6">
        <div className="w-full max-w-md z-20">
          <motion.div
            className="w-full rounded-3xl bg-surface-800/80 backdrop-blur-sm border border-neutral-700 shadow-soft"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="px-6 py-12">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-400" />
                  <span className="text-sm md:text-base text-neutral-300">Estuda+</span>
                </div>
                <h1 className="font-semibold text-[clamp(1.5rem,4vw,2.5rem)]">{title}</h1>
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
      </main>
    </div>
  );
};

export default AuthLayout;