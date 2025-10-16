import { motion } from 'framer-motion';

const baseBtn =
  'flex items-center gap-3 w-full justify-center rounded-2xl py-3 px-4 border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-800';

const SocialLoginButtons = ({ onProviderClick }) => {
  return (
    <div className="space-y-3">
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        className={`${baseBtn} bg-white text-black border-neutral-200`}
        onClick={() => onProviderClick?.('google')}
        aria-label="Entrar com Google"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.35 12.2c0-.7-.06-1.2-.17-1.7H12v3.2h5.3c-.1.9-.7 2.3-2.1 3.2l-.02.1 3 .23.2-.02c1.8-1.6 2.77-3.9 2.77-5.3z" fill="#4285F4"/>
          <path d="M12 22c2.7 0 5-0.9 6.7-2.4l-3.1-2.4c-.9.6-2.1 1-3.6 1-2.74 0-5.07-1.85-5.9-4.35H2.9v2.74C4.6 19.8 8.1 22 12 22z" fill="#34A853"/>
          <path d="M6.1 13.8c-.2-.6-.4-1.2-.4-1.8s.1-1.2.3-1.8V7.46H2.9A9.99 9.99 0 0 0 2 12c0 1.58.37 3.07 1.03 4.36l3.07-2.56z" fill="#FBBC05"/>
          <path d="M12 4.7c1.46 0 2.78.5 3.82 1.48l2.87-2.8C17 1.7 14.7.8 12 .8 8.1.8 4.6 3 2.9 6.26l3.2 2.56C6.9 6.52 9.24 4.7 12 4.7z" fill="#EA4335"/>
        </svg>
        <span className="font-medium">Entrar com Google</span>
      </motion.button>

      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        className={`${baseBtn} bg-neutral-800 text-white border-neutral-700`}
        onClick={() => onProviderClick?.('github')}
        aria-label="Entrar com GitHub"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#c9d1d9" d="M12 .5a11.5 11.5 0 0 0-3.64 22.43c.58.11.8-.25.8-.56v-2.06c-3.28.72-3.97-1.58-3.97-1.58-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.77.41-1.27.75-1.56-2.62-.3-5.38-1.31-5.38-5.82 0-1.29.47-2.35 1.24-3.18-.12-.3-.54-1.5.12-3.12 0 0 1-.32 3.3 1.22.96-.27 1.98-.4 3-.4 1.02 0 2.04.14 3 .4 2.28-1.54 3.28-1.22 3.28-1.22.66 1.62.24 2.82.12 3.12.77.83 1.24 1.89 1.24 3.18 0 4.52-2.77 5.52-5.41 5.81.42.36.8 1.07.8 2.16v3.2c0 .31.21.67.81.56A11.5 11.5 0 0 0 12 .5Z" />
        </svg>
        <span className="font-medium">Entrar com GitHub</span>
      </motion.button>

      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        className={`${baseBtn} bg-gradient-to-r from-brand-500 to-brand-400 text-white border-transparent`}
        onClick={() => onProviderClick?.('discord')}
        aria-label="Entrar com Discord"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ffffff" d="M19.5 5.5c-1.5-.7-3-.9-4.5-1.1l-.4.7c-1.3-.2-2.6-.2-3.9 0l-.4-.7c-1.6.2-3.1.4-4.6 1.1-2.9 4.3-3.7 8.5-3.3 13.1 1.7 1.3 3.6 2.2 5.7 2.5l.7-1.8c-1-.4-1.9-.9-2.7-1.5l.6-.5c1.8 1.3 3.9 2 6.1 2 2.2 0 4.3-.7 6.1-2l.6.5c-.8.6-1.8 1.1-2.7 1.5l.7 1.8c2.1-.4 4-1.2 5.7-2.5.5-4.8-.4-8.9-3.3-13.1zM9.3 13.5c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8zm5.4 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8z" />
        </svg>
        <span className="font-medium">Entrar com Discord</span>
      </motion.button>

      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        className={`${baseBtn} bg-neutral-900 text-white border-neutral-700`}
        onClick={() => onProviderClick?.('apple')}
        aria-label="Entrar com Apple"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ffffff" d="M16.6 8.3c-.9 0-2 .5-2.6.5-.6 0-1.7-.5-2.6-.5-2 0-3.9 1.6-3.9 4.6 0 2.1 1.5 5.2 3.6 5.2.8 0 1.1-.5 2.2-.5s1.4.5 2.3.5c2.1 0 3.5-3 3.5-5.1-.1-3-2.5-4.6-2.5-4.6zM14.7 6.2c.5-.6.9-1.4.9-2.2-.7.1-1.4.5-1.8 1.1-.5.6-.9 1.4-.9 2.2.7-.1 1.4-.5 1.8-1.1z" />
        </svg>
        <span className="font-medium">Entrar com Apple</span>
      </motion.button>
    </div>
  );
};

export default SocialLoginButtons;