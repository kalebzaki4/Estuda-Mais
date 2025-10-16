import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function DecorativeLeftPanel({ disableAnimation = false, variant = "circuit" }) {
  const prefersReducedMotion = useReducedMotion();
  const animationsEnabled = !disableAnimation && !prefersReducedMotion;

  // Responsividade adicional: reduzir elementos quando width < 900px.
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    const update = () => setIsNarrow(typeof window !== "undefined" && window.innerWidth < 900);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Paleta e opacidades sutilmente controladas
  const colors = {
    baseDarkA: "#0b0b0b",
    baseDarkB: "#0f0b12",
    violetA: "#7b2ff7",
    violetB: "#9d4edd",
    violetC: "#a259ff",
    violetD: "#6b21a8",
    line: "rgba(255,255,255,0.15)",
  };

  // Partículas (bubbles): máximo 80, usaremos <= 40 por padrão
  const particles = useMemo(() => {
    const maxCount = isNarrow ? 0 : 40;
    const arr = [];
    for (let i = 0; i < maxCount; i++) {
      arr.push({
        key: i,
        xPercent: Math.random() * 100, // posição em % na largura
        size: 2 + Math.random() * 4, // 2px a 6px
        delay: Math.random() * 2,
        duration: 6 + Math.random() * 6, // 6s a 12s
        opacity: 0.1 + Math.random() * 0.25,
      });
    }
    return arr;
  }, [isNarrow]);

  const renderCircuit = () => (
    <svg
      className="w-[120%] md:w-full h-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="gradViolet" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={colors.violetA} />
          <stop offset="50%" stopColor={colors.violetB} />
          <stop offset="100%" stopColor={colors.violetC} />
        </linearGradient>
        <radialGradient id="softGlow" cx="20%" cy="15%" r="60%">
          <stop offset="0%" stopColor={colors.violetB} stopOpacity="0.25" />
          <stop offset="70%" stopColor={colors.violetB} stopOpacity="0.05" />
          <stop offset="100%" stopColor={colors.violetB} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow radial sutil */}
      <rect x="0" y="0" width="1200" height="800" fill="url(#softGlow)" />

      {/* Linhas tipo circuito com animação suave de dash (micro-animation) */}
      {(() => {
        const PathComp = animationsEnabled ? motion.path : "path";
        return (
          <PathComp
            d="M80,120 H400 V220 H700 V320 H900"
            stroke="url(#gradViolet)"
            strokeWidth={1.5}
            fill="none"
            opacity={0.25}
            {...(animationsEnabled
              ? {
                  initial: { pathLength: 0, strokeDasharray: "4 8", strokeDashoffset: 48 },
                  animate: { pathLength: 1, strokeDashoffset: 0 },
                  transition: { duration: 4, repeat: Infinity, ease: "linear" },
                }
              : {})}
          />
        );
      })()}

      {(() => {
        const PathComp = animationsEnabled ? motion.path : "path";
        return (
          <PathComp
            d="M150,500 H380 V420 H520 V360 H760"
            stroke={colors.line}
            strokeWidth={1.2}
            fill="none"
            opacity={0.2}
            {...(animationsEnabled
              ? {
                  initial: { strokeDasharray: "3 6", strokeDashoffset: 36 },
                  animate: { strokeDashoffset: 0 },
                  transition: { duration: 6, repeat: Infinity, ease: "linear" },
                }
              : {})}
          />
        );
      })()}

      {(() => {
        const PathComp = animationsEnabled ? motion.path : "path";
        return (
          <PathComp
            d="M220,300 H480 V260 H640 V240 H980"
            stroke={colors.violetD}
            strokeWidth={1}
            fill="none"
            opacity={0.18}
            {...(animationsEnabled
              ? {
                  initial: { strokeDasharray: "2 5", strokeDashoffset: 25 },
                  animate: { strokeDashoffset: 0 },
                  transition: { duration: 5, repeat: Infinity, ease: "linear" },
                }
              : {})}
          />
        );
      })()}

      {/* Shapes geométricos discretos */}
      <circle cx="260" cy="200" r="34" fill={colors.violetA} opacity="0.12" />
      <rect x="780" y="140" width="80" height="80" rx="8" fill={colors.violetC} opacity="0.08" />
    </svg>
  );

  const renderBubbles = () => (
    <svg
      className="w-[120%] md:w-full h-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      role="presentation"
    >
      {particles.map((p) => {
        const CircleComp = animationsEnabled ? motion.circle : "circle";
        return (
          <CircleComp
            key={p.key}
            cx={(p.xPercent / 100) * 1200}
            cy={animationsEnabled ? 850 : 760 - (p.key % 120)}
            r={p.size}
            fill={colors.violetB}
            opacity={p.opacity}
            {...(animationsEnabled
              ? {
                  initial: { cy: 850 },
                  animate: { cy: -50 },
                  transition: {
                    delay: p.delay,
                    duration: p.duration,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }
              : {})}
          />
        );
      })}
      {/* Halo leve com blur próximo ao centro para profundidade */}
      <defs>
        <radialGradient id="bubbleGlow" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor={colors.violetA} stopOpacity="0.2" />
          <stop offset="70%" stopColor={colors.violetA} stopOpacity="0.06" />
          <stop offset="100%" stopColor={colors.violetA} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="1200" height="800" fill="url(#bubbleGlow)" />
    </svg>
  );

  const renderRadial = () => (
    <div className="absolute inset-0">
      {/* Gradiente radial e linear combinados, estático */}
      <div
        className="absolute inset-0"
        style={{
          background:
            `radial-gradient(800px 600px at 20% 15%, ${colors.violetB}33, transparent 70%),
             linear-gradient(135deg, ${colors.baseDarkA}, ${colors.baseDarkB})`,
        }}
      />
      {/* Forma geométrica discreta */}
      <svg
        className="w-[120%] md:w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        role="presentation"
      >
        <polygon points="200,300 240,360 180,360" fill={colors.violetC} opacity="0.08" />
        <circle cx="960" cy="200" r="28" fill={colors.violetA} opacity="0.1" />
      </svg>
    </div>
  );

  return (
    <aside className="relative w-full h-full min-h-screen hidden md:block bg-[#0b0b0b]">
      {/* Camada base de gradiente escuro */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b0b] to-[#0f0b12]" />

      {/* Conteúdo decorativo: pointer-events-none, z-0, acessível como apresentação */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden -translate-x-8 md:translate-x-0 scale-[0.9] md:scale-100 opacity-80"
        aria-hidden="true"
        role="presentation"
      >
        {variant === "circuit" && renderCircuit()}
        {variant === "bubbles" && renderBubbles()}
        {variant === "radial" && renderRadial()}
      </div>

      {/* Notas de performance:
          - pointer-events-none evita interações acidentais e melhora acessibilidade.
          - aria-hidden e role="presentation" marcam elementos como puramente decorativos.
          - prefers-reduced-motion desativa micro animações de forma responsável.
          - Partículas limitadas (<= 40) e SVG simples com poucas paths para manter FPS.
          - Escalas/responsividade via Tailwind e preserveAspectRatio previnem overflow. */}
    </aside>
  );
}