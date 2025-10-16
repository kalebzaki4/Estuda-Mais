import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function DecorativeLeftPanel({
  disableAnimation = false,
  variant = "mesh", // padrão atualizado para o novo hero
  headline = "Domine o Conhecimento",
  subheadline = "Seu futuro começa aqui. Aprenda com foco e qualidade.",
  logoSrc,
  compactOnMobile = false,
}) {
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
    navy: "#0a1a2b",
    cyan: "#34d5ff",
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

  const renderOrganic = () => (
    <svg
      className="w-[120%] md:w-full h-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="organicStroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={colors.violetA} />
          <stop offset="50%" stopColor={colors.navy} />
          <stop offset="100%" stopColor={colors.cyan} />
        </linearGradient>
      </defs>
      {(() => {
        const PathComp = animationsEnabled ? motion.path : "path";
        const paths = [
          "M0,500 C200,450 300,520 450,480 C600,440 700,500 900,460 C1050,430 1150,470 1200,440",
          "M0,600 C180,560 320,610 480,580 C640,550 760,610 920,580 C1080,550 1160,590 1200,560",
          "M0,700 C160,660 360,720 520,690 C680,660 800,720 980,690 C1140,660 1180,700 1200,680",
        ];
        return paths.map((d, i) => (
          <PathComp
            key={i}
            d={d}
            stroke="url(#organicStroke)"
            strokeWidth={i === 0 ? 1.6 : 1.2}
            fill="none"
            opacity={0.18 - i * 0.04}
            {...(animationsEnabled
              ? {
                  initial: { strokeDasharray: "3 8", strokeDashoffset: 80 },
                  animate: { strokeDashoffset: 0 },
                  transition: { duration: 8 + i * 2, repeat: Infinity, ease: "linear" },
                }
              : {})}
          />
        ));
      })()}
    </svg>
  );

  const renderMesh = () => {
    const spots = [
      { color: `${colors.violetB}`, opacity: 0.22, size: 420, x: "20%", y: "18%" },
      { color: `${colors.navy}`, opacity: 0.22, size: 520, x: "70%", y: "35%" },
      { color: `${colors.violetA}`, opacity: 0.18, size: 360, x: "40%", y: "70%" },
      { color: `${colors.cyan}`, opacity: 0.12, size: 300, x: "80%", y: "75%" },
    ];
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b0b] to-[#0f0b12]" />
        {spots.map((s, idx) => {
          const SpotComp = animationsEnabled ? motion.div : "div";
          return (
            <SpotComp
              key={idx}
              className="absolute pointer-events-none"
              style={{
                left: s.x,
                top: s.y,
                width: s.size,
                height: s.size,
                borderRadius: "9999px",
                background: `radial-gradient(circle at center, ${s.color}${Math.round(s.opacity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
                filter: "blur(40px) saturate(120%)",
              }}
              {...(animationsEnabled
                ? {
                    initial: { x: 0, y: 0, scale: 1 },
                    animate: { x: idx % 2 ? 8 : -6, y: idx % 2 ? -6 : 10, scale: 1.02 },
                    transition: { duration: 10 + idx * 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                  }
                : {})}
            />
          );
        })}
      </div>
    );
  };

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
    <aside className={`${compactOnMobile ? "block" : "hidden"} md:block relative w-full h-full min-h-screen bg-[#0b0b0b]`}>
      {/* Fundo base + variantes */}
      {variant === "mesh" && renderMesh()}
      {variant === "organic" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b0b] to-[#0f0b12]" />
          <div
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden -translate-x-8 md:translate-x-0 scale-[0.9] md:scale-100 opacity-80"
            aria-hidden="true"
            role="presentation"
          >
            {renderOrganic()}
          </div>
        </>
      )}
      {variant === "circuit" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b0b] to-[#0f0b12]" />
          <div
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden -translate-x-8 md:translate-x-0 scale-[0.9] md:scale-100 opacity-80"
            aria-hidden="true"
            role="presentation"
          >
            {renderCircuit()}
          </div>
        </>
      )}
      {variant === "bubbles" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b0b] to-[#0f0b12]" />
          <div
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden -translate-x-8 md:translate-x-0 scale-[0.9] md:scale-100 opacity-80"
            aria-hidden="true"
            role="presentation"
          >
            {renderBubbles()}
          </div>
        </>
      )}

      {/* Conteúdo de texto (Hero): centralizado, alto contraste */}
      <div className={`absolute inset-0 flex items-center justify-center ${compactOnMobile ? "h-32 md:h-auto" : ""}`}>
        <div className="text-center px-6 md:px-8 lg:px-12 max-w-xl z-10">
          {logoSrc && (
            <img
              src={logoSrc}
              alt="Logo Estuda+"
              className="mx-auto mb-4 h-10 w-auto"
              loading="lazy"
              decoding="async"
            />
          )}
          <motion.h1
            className="font-bold text-white tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            initial={animationsEnabled ? { opacity: 0, y: 8 } : false}
            animate={animationsEnabled ? { opacity: 1, y: 0 } : false}
            transition={animationsEnabled ? { duration: 0.8, ease: "easeOut" } : undefined}
          >
            {headline}
          </motion.h1>
          <motion.p
            className="mt-3 text-neutral-300"
            style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.15rem)" }}
            initial={animationsEnabled ? { opacity: 0 } : false}
            animate={animationsEnabled ? { opacity: 1 } : false}
            transition={animationsEnabled ? { delay: 0.1, duration: 0.8, ease: "easeOut" } : undefined}
          >
            {subheadline}
          </motion.p>
        </div>
      </div>

      {/* Notas de performance:
          - pointer-events-none nos elementos puramente decorativos evita interferência com o usuário e melhora acessibilidade.
          - prefers-reduced-motion desativa micro animações de forma responsável.
          - Partículas limitadas e SVG simples com poucas paths para manter FPS.
          - Escalas/responsividade via Tailwind e preserveAspectRatio previnem overflow. */}
    </aside>
  );
}