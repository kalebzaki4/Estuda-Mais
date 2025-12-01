import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContextCore.jsx'
import styles from '../styles/Dashboard.module.css'

export default function Dashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('novo')
  const [onboardingOpen, setOnboardingOpen] = useState(false)
  const [topics, setTopics] = useState(() => {
    try { const raw = localStorage.getItem('learningTopics'); return raw ? JSON.parse(raw) : [] } catch { return [] }
  })
  const [points, setPoints] = useState(() => {
    try { const raw = localStorage.getItem('userPoints'); return raw ? parseInt(raw, 10) || 0 : 0 } catch { return 0 }
  })
  const [premium] = useState(() => {
    try { const raw = localStorage.getItem('premium'); return raw === '1' } catch { return false }
  })
  const [studyMinutesToday, setStudyMinutesToday] = useState(() => {
    try {
      const d = localStorage.getItem('studyDay'); const m = localStorage.getItem('studyMinutesToday');
      const today = new Date().toDateString();
      if (d !== today) { localStorage.setItem('studyDay', today); localStorage.setItem('studyMinutesToday', '0'); return 0 }
      return m ? parseInt(m, 10) || 0 : 0
    } catch { return 0 }
  })
  const [studyHistory, setStudyHistory] = useState(() => {
    try { const raw = localStorage.getItem('studyHistory'); return raw ? JSON.parse(raw) : {} } catch { return {} }
  })
  const [topicProgress, setTopicProgress] = useState(() => {
    try { const raw = localStorage.getItem('topicProgress'); return raw ? JSON.parse(raw) : {} } catch { return {} }
  })
  const freeDailyLimit = 60

  useEffect(() => {
    const pending = (() => { try { return localStorage.getItem('onboardingPending') === '1' } catch { return false } })()
    setOnboardingOpen(pending || topics.length === 0)
  }, [topics.length])

  useEffect(() => {
    try { localStorage.setItem('learningTopics', JSON.stringify(topics)) } catch { void 0 }
  }, [topics])

  useEffect(() => {
    try { localStorage.setItem('userPoints', String(points)) } catch { void 0 }
  }, [points])

  useEffect(() => {
    try { localStorage.setItem('studyMinutesToday', String(studyMinutesToday)) } catch { void 0 }
    setStudyHistory(prev => {
      const today = new Date().toDateString()
      const next = { ...prev, [today]: studyMinutesToday }
      try { localStorage.setItem('studyHistory', JSON.stringify(next)) } catch { void 0 }
      return next
    })
  }, [studyMinutesToday])

  const [mode, setMode] = useState('work')
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [secondsRemaining, setSecondsRemaining] = useState(workMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef(null)
  const [pomodoroHistory, setPomodoroHistory] = useState(() => {
    try { const raw = localStorage.getItem('pomodoroHistory'); return raw ? JSON.parse(raw) : [] } catch { return [] }
  })
  const canStudy = premium || studyMinutesToday < freeDailyLimit
  const tabs = useMemo(() => ([
    { id: 'novo', label: 'Novo Estudo' },
    { id: 'estudos', label: 'Estudos' },
    { id: 'roadmaps', label: 'Roadmaps' },
    { id: 'pomodoro', label: 'Pomodoro' },
    { id: 'competicao', label: 'Competição' },
    { id: 'monitoramento', label: 'Monitoramento' },
  ]), [])

  useEffect(() => {
    setSecondsRemaining((mode === 'work' ? workMinutes : breakMinutes) * 60)
  }, [mode, workMinutes, breakMinutes])

  useEffect(() => {
    if (!isRunning) return
    if (!canStudy) { setIsRunning(false); return }
    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          const finishedAt = new Date().toISOString()
          const entry = { id: Date.now(), type: mode, minutes: mode === 'work' ? workMinutes : breakMinutes, finishedAt }
          const updated = [entry, ...pomodoroHistory].slice(0, 40)
          setPomodoroHistory(updated)
          try { localStorage.setItem('pomodoroHistory', JSON.stringify(updated)) } catch { void 0 }
          const nextMode = mode === 'work' ? 'break' : 'work'
          if (mode === 'work') {
            const addMin = workMinutes
            const newToday = studyMinutesToday + addMin
            setStudyMinutesToday(newToday)
            const gained = addMin * 10
            setPoints(points + gained)
          }
          setMode(nextMode)
          return (nextMode === 'work' ? workMinutes : breakMinutes) * 60
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [isRunning, mode, workMinutes, breakMinutes, pomodoroHistory, canStudy, studyMinutesToday, points])

  const toggleTopic = (t) => {
    if (topics.includes(t)) setTopics(topics.filter(x => x !== t))
    else setTopics([...topics, t])
  }

  const confirmOnboarding = () => {
    if (topics.length === 0) return
    setOnboardingOpen(false)
    try { localStorage.removeItem('onboardingPending') } catch { void 0 }
    setActiveTab('novo')
  }

  const contentByTopic = (t) => {
    const map = {
      'JavaScript': ['Fundamentos', 'Promises', 'Async/Await', 'ES6+'],
      'React': ['Componentes', 'Hooks', 'Estado', 'Roteamento'],
      'Node.js': ['HTTP', 'Express', 'Autenticação', 'BDD'],
      'Python': ['Sintaxe', 'Pandas', 'NumPy', 'APIs'],
      'Java': ['OOP', 'Streams', 'Spring', 'JPA'],
      'C#': ['.NET', 'LINQ', 'ASP.NET', 'EF Core'],
      'Go': ['Goroutines', 'Channels', 'HTTP', 'Testing'],
      'Rust': ['Ownership', 'Borrowing', 'Traits', 'Async'],
      'HTML/CSS': ['Semântica', 'Flexbox', 'Grid', 'Animações'],
      'AI': ['Conceitos', 'Modelos', 'Fine-tuning', 'Ferramentas'],
      'Data Science': ['Estatística', 'Visualização', 'Modelagem', 'Produção'],
    }
    return map[t] || ['Introdução', 'Prática', 'Projeto', 'Revisão']
  }

  const RoadmapList = ({ topic }) => (
    <ul>
      {contentByTopic(topic).map((step, idx) => (
        <li key={idx}>{step}</li>
      ))}
    </ul>
  )

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = Math.floor(s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  const lastNDays = (n) => {
    const days = []
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      days.push(d)
    }
    return days
  }

  const heatmapData = useMemo(() => {
    return lastNDays(30).map(d => {
      const key = d.toDateString()
      const minutes = studyHistory[key] || 0
      const level = minutes >= 60 ? 3 : minutes >= 30 ? 2 : minutes > 0 ? 1 : 0
      return { date: key, minutes, level }
    })
  }, [studyHistory])

  const weeklyStreak = useMemo(() => {
    let streak = 0
    for (let i = 0; i < 7; i++) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toDateString()
      const minutes = studyHistory[key] || 0
      if (minutes > 0) streak++
      else break
    }
    return streak
  }, [studyHistory])

  const nextLesson = useMemo(() => {
    const t = topics[0]
    if (!t) return null
    const steps = contentByTopic(t)
    const idx = Math.min(topicProgress[t] || 0, steps.length - 1)
    return { topic: t, step: steps[idx], idx, total: steps.length }
  }, [topics, topicProgress])

  const completeNextLesson = () => {
    if (!nextLesson) return
    const t = nextLesson.topic
    const nextIdx = Math.min(nextLesson.idx + 1, nextLesson.total)
    const updated = { ...topicProgress, [t]: nextIdx }
    setTopicProgress(updated)
    try { localStorage.setItem('topicProgress', JSON.stringify(updated)) } catch { void 0 }
    setPoints(points + 25)
  }

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>Estuda Mais</div>
        <nav>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('novo') }} className={activeTab === 'novo' ? 'active' : ''}>Novo Estudo</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('pomodoro') }} className={activeTab === 'pomodoro' ? 'active' : ''}>Pomodoro</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('roadmaps') }} className={activeTab === 'roadmaps' ? 'active' : ''}>Roadmaps</a>
        </nav>
      </header>

      <aside className={styles.sidebar}>
        <h3>Menu</h3>
        <ul>
          {tabs.map(t => (
            <li key={t.id}>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab(t.id) }} className={activeTab === t.id ? 'active' : ''}>{t.label}</a>
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.welcomeCard}>
          <h1>Olá{user?.name ? `, ${user.name}` : ''}</h1>
          <p>Pontos: {points} • Minutos hoje: {studyMinutesToday}/{freeDailyLimit} {premium ? '(Premium)' : '(Grátis)'} </p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <h2>Hoje</h2>
            <p>Meta diária</p>
            <div className={styles.progressWrap}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${Math.min(100, Math.round(100 * (studyMinutesToday / freeDailyLimit)))}%` }} />
              </div>
              <div className={styles.progressText}>{studyMinutesToday}/{freeDailyLimit} min {premium ? '(Premium)' : '(Grátis)'}{studyMinutesToday >= freeDailyLimit ? ' • Meta concluída' : ''}</div>
            </div>
            {studyMinutesToday >= freeDailyLimit && (<div className={styles.badge}>Meta do dia concluída</div>)}
          </div>

          <div className={styles.statBox}>
            <h2>Ações rápidas</h2>
            <div className={styles.quickActions}>
              <button className={styles.quickBtn} onClick={() => { setActiveTab('pomodoro'); setMode('work'); setSecondsRemaining(workMinutes * 60); setIsRunning(true) }}>Estudar {workMinutes}min</button>
              <button className={styles.quickBtn} onClick={() => setActiveTab('roadmaps')}>Abrir roadmaps</button>
              <button className={styles.quickBtn} onClick={() => setOnboardingOpen(true)}>Escolher tópicos</button>
            </div>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <h2>Streak</h2>
            <p>{weeklyStreak} dias</p>
            <div className={styles.streakRow}>
              {lastNDays(7).map((d, i) => {
                const key = d.toDateString()
                const minutes = studyHistory[key] || 0
                const on = minutes > 0
                return <span key={i} className={`${styles.streakDot} ${on ? styles.streakDotOn : ''}`} />
              })}
            </div>
          </div>

          <div className={styles.statBox}>
            <h2>Heatmap</h2>
            <div className={styles.heatmapGrid}>
              {heatmapData.map((d, i) => (
                <span key={i} className={`${styles.heatDay} ${styles['heat' + d.level]}`} />
              ))}
            </div>
          </div>

          <div className={styles.statBox}>
            <h2>Próxima lição</h2>
            {nextLesson ? (
              <div className={styles.mt8}>
                <p className={styles.strong}>{nextLesson.topic}</p>
                <p>{nextLesson.step} ({nextLesson.idx + 1}/{nextLesson.total})</p>
                <div className={styles.actionRow}>
                  <button className={styles.btn} onClick={completeNextLesson}>Concluir</button>
                </div>
              </div>
            ) : (
              <p>Escolha tópicos para começar</p>
            )}
          </div>
        </div>

        {activeTab === 'novo' && (
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <h2>{formatTime(secondsRemaining)}</h2>
              <p>Modo: {mode === 'work' ? 'Estudo' : 'Pausa'}</p>
              <div className={styles.actionRow}>
                <button className={styles.btn} onClick={() => setIsRunning(true)} disabled={!canStudy}>Iniciar</button>
                <button className={styles.btn} onClick={() => setIsRunning(false)}>Pausar</button>
              </div>
              {!canStudy && (
                <div className={styles.mt12}>
                  Limite diário de {freeDailyLimit} min atingido. <Link to="/signup?plan=premium">Ative o Premium</Link>.
                </div>
              )}
            </div>
            <div className={styles.statBox}>
              <h2>Roadmap</h2>
              {topics.slice(0, 2).map(t => (
                <div key={t}>
                  <p className={`${styles.strong} ${styles.mt8}`}>{t}</p>
                  <RoadmapList topic={t} />
                </div>
              ))}
            </div>
            <div className={styles.statBox}>
              <h2>Escolher tópicos</h2>
              <div className={styles.wrapRow}>
                {topics.map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
                <button className={styles.btn} onClick={() => setOnboardingOpen(true)}>Escolher tópicos</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'estudos' && (
          <div className={styles.statsGrid}>
            {topics.length === 0 ? (
              <div className={styles.statBox}><p>Nenhum tópico selecionado</p></div>
            ) : (
              topics.map(t => (
                <div key={t} className={styles.statBox}>
                  <p className={styles.strong}>{t}</p>
                  <ul>
                    {contentByTopic(t).map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'roadmaps' && (
          <div className={styles.statsGrid}>
            {topics.map(t => (
                <div key={t} className={styles.statBox}>
                <p className={styles.strong}>{t}</p>
                <RoadmapList topic={t} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'pomodoro' && (
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
                <p className={styles.strong}>Pomodoro</p>
              <h2>{formatTime(secondsRemaining)}</h2>
              <p>Modo: {mode === 'work' ? 'Estudo' : 'Pausa'}</p>
              <div className={styles.actionRow}>
                <button className={styles.btn} onClick={() => setIsRunning(true)} disabled={!canStudy}>Iniciar</button>
                <button className={styles.btn} onClick={() => setIsRunning(false)}>Pausar</button>
                <button className={styles.btn} onClick={() => { setIsRunning(false); setMode('work'); setSecondsRemaining(workMinutes * 60) }}>Resetar</button>
              </div>
              {!canStudy && (
                <div className={styles.mt12}>
                  Limite diário de {freeDailyLimit} min atingido. <Link to="/signup?plan=premium">Ative o Premium</Link>.
                </div>
              )}
              <div className={styles.gridTwoCols}>
                <div>
                  <p>Estudo</p>
                  <input type="number" value={workMinutes} onChange={e => setWorkMinutes(Math.max(1, parseInt(e.target.value || '25', 10)))} />
                </div>
                <div>
                  <p>Pausa</p>
                  <input type="number" value={breakMinutes} onChange={e => setBreakMinutes(Math.max(1, parseInt(e.target.value || '5', 10)))} />
                </div>
              </div>
            </div>
            <div className={styles.statBox}>
              <p className={styles.strong}>Histórico</p>
              <ul>
                {pomodoroHistory.map(h => (
                  <li key={h.id} className={styles.flexBetween}>
                    <span>{h.type === 'work' ? 'Estudo' : 'Pausa'} • {h.minutes} min</span>
                    <span>{new Date(h.finishedAt).toLocaleTimeString()}</span>
                  </li>
                ))}
                {pomodoroHistory.length === 0 && <li>Nenhuma sessão</li>}
              </ul>
            </div>
            <div className={styles.statBox}>
              <p className={styles.strong}>Status</p>
              <p>Pontos: {points}</p>
              <p>Minutos hoje: {studyMinutesToday}/{freeDailyLimit} {premium ? '(Premium)' : '(Grátis)'}</p>
            </div>
          </div>
        )}

        {activeTab === 'competicao' && (
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <p className={styles.strong}>Ranking de amigos</p>
              <ul>
                {[{ name: 'Ana', pts: 820 }, { name: 'Bruno', pts: 690 }, { name: 'Você', pts: points }, { name: 'Carla', pts: 550 }].sort((a,b)=>b.pts-a.pts).map((f, i) => (
                  <li key={i} className={styles.flexBetween}>
                    <span>{f.name}</span>
                    <span>{f.pts} pts</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.statBox}>
              <p className={styles.strong}>Status público</p>
              <p>{canStudy ? 'Ativo' : 'Limite diário atingido'}</p>
              <p>{premium ? 'Plano Premium' : 'Plano Gratuito'}</p>
            </div>
          </div>
        )}

        {activeTab === 'monitoramento' && (
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <p className={styles.strong}>Resumo</p>
              <p>Pontos: {points}</p>
              <p>Sessões: {pomodoroHistory.filter(h=>h.type==='work').length}</p>
            </div>
            <div className={styles.statBox}>
              <p className={styles.strong}>Tópicos</p>
              <div className={styles.wrapRow}>
                {topics.map(t => (<span key={t} className={styles.tag}>{t}</span>))}
              </div>
            </div>
            <div className={styles.statBox}>
              <p className={styles.strong}>Plano</p>
              <p>{premium ? 'Premium' : 'Gratuito'}</p>
              {!premium && (
                <div className={styles.mt12}>
                  <Link to="/signup?plan=premium">Ativar Premium</Link>
                </div>
              )}
            </div>
          </div>
        )}

        {onboardingOpen && (
          <div className={styles.modalBackdrop}>
            <div className={styles.modalBox}>
              <div className={styles.modalInner}>
                <h2>O que você quer aprender?</h2>
                <p>Escolha tecnologias para personalizarmos seu conteúdo.</p>
                <div className={styles.topicButtons}>
                  {['JavaScript','React','Node.js','Python','Java','C#','Go','Rust','HTML/CSS','AI','Data Science'].map(t => (
                    <button key={t} onClick={() => toggleTopic(t)} className={`${styles.topicToggle} ${topics.includes(t) ? styles.topicToggleActive : ''}`}>{t}</button>
                  ))}
                </div>
                <div className={styles.actionRow}>
                  <button className={styles.btn} onClick={confirmOnboarding}>Confirmar</button>
                  <button className={styles.btn} onClick={() => setOnboardingOpen(false)}>Depois</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
