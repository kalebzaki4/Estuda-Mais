import { useEffect, useRef, useState } from 'react'
import { LuChevronLeft, LuChevronRight, LuBookOpen, LuUsers, LuTrophy, LuMapPin } from 'react-icons/lu'
import { GiTomato, GiTargetPrize } from 'react-icons/gi'
import styles from '../../styles/HighlightsCarousel.module.css'

const DEFAULT_ITEMS = [
  {
    id: 'courses',
    title: 'Cursos & Trilhas',
    Icon: LuBookOpen,
    description: 'Aulas práticas com projetos que transformam teoria em experiência — aprenda fazendo, crie um portfólio e comprove suas habilidades.',
    bullets: ['Projetos hands-on', 'Exercícios automatizados']
  },
  {
    id: 'roadmaps',
    title: 'Roadmaps Profissionais',
    Icon: LuMapPin,
    description: 'Trilhas passo-a-passo para funções reais. Checkpoints, tempo estimado e recomendações de prática para cada etapa.',
    bullets: ['Trilhas por objetivos', 'Checkpoints mensuráveis']
  },
  {
    id: 'pomodoro',
    title: 'Pomodoro & Foco',
    Icon: GiTomato,
    description: 'Sessões cronometradas para aumentar concentração — acompanhe progresso, histórico e métricas de estudo.',
    bullets: ['Foco por sessões', 'Histórico e métricas', 'Recomenda com objetivos']
  },
  {
    id: 'challenges',
    title: 'Desafios Semanais',
    Icon: GiTargetPrize,
    description: 'Problemas reais e curados para exercitar pensamento crítico — ganhe pontos, feedback e destaque no ranking.',
    bullets: ['Problemas práticos', 'Feedback automático']
  },
  {
    id: 'community',
    title: 'Comunidade & Mentoria',
    Icon: LuUsers,
    description: 'Grupos de estudo, sessões de revisão e suporte de mentores — aprenda com pares e acelere sua curva de aprendizado.',
    bullets: ['Grupos por tema', 'Mentoria pontual'],
  },
  {
    id: 'certificates',
    title: 'Certificações',
    Icon: LuTrophy,
    description: 'Avaliações práticas e certificados verificáveis para comprovar competências e valorizar seu currículo.',
    bullets: ['Avaliações práticas', 'Certificado verificável', 'Sugestão de portfólio']
  }
]

export default function HighlightsCarousel({ items = DEFAULT_ITEMS, autoPlay = true, interval = 4500 }) {
  const [index, setIndex] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(1)
  const total = items.length
  const timerRef = useRef(null)
  const rootRef = useRef(null)

  // responsive slides count
  useEffect(() => {
    function update() {
      const w = window.innerWidth
      let desired = 1
      if (w >= 1280) desired = 3
      else if (w >= 768) desired = 2
      else desired = 1
      setSlidesToShow(Math.min(desired, total))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [total])

  // autoplay with pause on hover
  useEffect(() => {
    if (!autoPlay) return
    clearInterval(timerRef.current)
    const maxStart = Math.max(0, total - slidesToShow)
    timerRef.current = setInterval(() => {
      setIndex(i => Math.min(maxStart, i + 1))
    }, interval)
    return () => clearInterval(timerRef.current)
  }, [autoPlay, interval, total, slidesToShow])

  useEffect(() => {
    // clamp index when total/slidesToShow changes
    const maxStart = Math.max(0, total - slidesToShow)
    setIndex(i => Math.min(i, maxStart))
  }, [slidesToShow, total])

  const maxStart = Math.max(0, total - slidesToShow)
  const prev = () => setIndex(i => (i <= 0 ? maxStart : i - 1))
  const next = () => setIndex(i => (i >= maxStart ? 0 : i + 1))

  function onKey(e) {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  const transform = slidesToShow ? index * (96 / slidesToShow) : 0

  return (
    <div
      className={`w-full ${styles.root}`}
      aria-roledescription="carousel"
      role="region"
      aria-label="Destaques do Estuda+"
      tabIndex={0}
      onKeyDown={onKey}
      ref={rootRef}
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={() => {
        if (!autoPlay) return
        clearInterval(timerRef.current)
        const maxStart = Math.max(0, total - slidesToShow)
        timerRef.current = setInterval(() => setIndex(i => Math.min(maxStart, i + 1)), interval)
      }}
    >
      <div className={`relative ${styles.frame}`}>
        <div className={styles.track} style={{ transform: `translateX(-${transform}%)` }}>
          {items.map((it) => (
            <div key={it.id} className={styles.slide} style={{ flex: `0 0 ${100 / Math.max(1, slidesToShow)}%` }}>
              <article className={styles.card}>
                <div className={styles.cardLeft}>
                  <div className={styles.iconBox}>
                    {it.Icon ? <it.Icon size={26} /> : it.title.slice(0,2)}
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{it.title}</h3>
                  <p className={styles.cardLead}>{it.description}</p>
                  {it.bullets && (
                    <ul className={styles.bullets}>
                      {it.bullets.map(b => <li key={b}>{b}</li>)}
                    </ul>
                  )}
                  <div className={styles.cardCtaWrap}>
                    <button className={styles.cardCta}>{it.cta}</button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* nav */}
        {maxStart > 0 && (
          <>
            <button className={styles.prev} aria-label="Anterior" onClick={prev}><LuChevronLeft size={18} /></button>
            <button className={styles.next} aria-label="Próximo" onClick={next}><LuChevronRight size={18} /></button>
          </>
        )}

        {/* dots */}
        <div className={styles.dots} role="tablist" aria-label="Navegação do carrossel">
          {Array.from({ length: Math.max(1, maxStart + 1) }).map((_, i) => (
            <button key={i} role="tab" aria-label={`Página ${i+1}`} aria-selected={i === index} onClick={() => setIndex(i)} className={`${styles.dot} ${i === index ? styles.dotActive : ''}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
