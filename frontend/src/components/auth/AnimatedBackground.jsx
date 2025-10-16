import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    // Componente puramente decorativo: não intercepta cliques e fica atrás do conteúdo
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Gradiente e textura base */}
      <motion.div
        className="absolute inset-0 bg-gradient-cyber"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {/* Wrapper com transform para limitar shapes grandes e evitar overflow */}
      <div className="absolute inset-0 w-[120%] max-w-none transform -translate-x-12 -translate-y-8 scale-[0.75] md:scale-100">
        {/* Brumas com blur para profundidade */}
        <motion.div
          className="absolute -top-24 -left-24 h-96 w-96 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(157,78,221,0.25), transparent 65%)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(123,47,247,0.18), transparent 60%)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />

        {/* Linhas de circuito sutis */}
        <motion.svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {[40, 120, 60].map((y, i) => (
            <motion.path
              key={i}
              d={`M${y} ${80 + i * 40} H${240 + i * 80} V${140 + i * 80} H${400 + i * 120}`}
              fill="none"
              stroke="url(#grad)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 + i * 0.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
            />
          ))}

          <defs>
            <linearGradient id="grad" x1="0" x2="1">
              <stop offset="0%" stopColor="#7b2ff7" />
              <stop offset="100%" stopColor="#a259ff" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </div>
  );
};

export default AnimatedBackground;