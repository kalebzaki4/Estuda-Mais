import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LuBookOpen, LuArrowLeft } from 'react-icons/lu'
import { useAuth } from '../contexts/AuthContextCore.js'
import Card from '../components/ui/Card'
import TabNavigation from '../components/ui/TabNavigation'

const brandPurple = '#7b2ff7'

export default function Dashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('estudos')

  const tabs = [
    { id: 'estudos', label: 'Estudos' },
    { id: 'roadmaps', label: 'Roadmaps' },
    { id: 'pomodoro', label: 'Pomodoro' },
    { id: 'competicao', label: 'Competição' },
    { id: 'monitoramento', label: 'Monitoramento' },
  ]

  const [learningResources] = useState([
    { id: 1, title: 'Java Fundamentos', type: 'Curso', progress: 68 },
    { id: 2, title: 'Estruturas de Dados', type: 'Aulas', progress: 40 },
    { id: 3, title: 'Algoritmos', type: 'Trilha', progress: 82 },
    { id: 4, title: 'Git e Versionamento', type: 'Módulo', progress: 25 },
  ])

  const [roadmaps] = useState([
    { id: 'frontend', name: 'Frontend', completed: 12, total: 20 },
    { id: 'backend', name: 'Backend', completed: 7, total: 18 },
    { id: 'devops', name: 'DevOps', completed: 4, total: 12 },
  ])

  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [mode, setMode] = useState('work')
  const [secondsRemaining, setSecondsRemaining] = useState(workMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [pomodoroHistory, setPomodoroHistory] = useState(() => {
    const raw = localStorage.getItem('pomodoroHistory')
    return raw ? JSON.parse(raw) : []
  })
  const timerRef = useRef(null)

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const ss = String(s % 60).padStart(2, '0')
    return `${String(m).padStart(2, '0')}:${ss}`
  }

  useEffect(() => {
    if (!isRunning) {
      setSecondsRemaining((mode === 'work' ? workMinutes : breakMinutes) * 60)
    }
  }, [workMinutes, breakMinutes, mode, isRunning])

  useEffect(() => {
    if (!isRunning) return
    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          const entry = {
            id: Date.now(),
            type: mode,
            minutes: mode === 'work' ? workMinutes : breakMinutes,
            finishedAt: new Date().toISOString(),
          }
          const updated = [entry, ...pomodoroHistory].slice(0, 20)
          setPomodoroHistory(updated)
          localStorage.setItem('pomodoroHistory', JSON.stringify(updated))
          const nextMode = mode === 'work' ? 'break' : 'work'
          setMode(nextMode)
          return (nextMode === 'work' ? workMinutes : breakMinutes) * 60
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [isRunning, mode, workMinutes, breakMinutes, pomodoroHistory])

  const startTimer = () => setIsRunning(true)
  const pauseTimer = () => {
    setIsRunning(false)
    clearInterval(timerRef.current)
  }
  const resetTimer = () => {
    setIsRunning(false)
    clearInterval(timerRef.current)
    setMode('work')
    setSecondsRemaining(workMinutes * 60)
  }

  const totalProgress = Math.round(
    learningResources.reduce((acc, r) => acc + r.progress, 0) / learningResources.length
  )

  return (
    <main className="page-radial-animated min-h-screen w-full grid place-items-center px-4 relative">
      <div className="background-elements">
        <div className="floating-orbs">
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
        </div>
        <div className="particles">
          <div className="particle" style={{ left: '10%', animationDelay: '0s' }}></div>
          <div className="particle" style={{ left: '20%', animationDelay: '2s' }}></div>
          <div className="particle" style={{ left: '30%', animationDelay: '4s' }}></div>
          <div className="particle" style={{ left: '40%', animationDelay: '6s' }}></div>
          <div className="particle" style={{ left: '50%', animationDelay: '8s' }}></div>
          <div className="particle" style={{ left: '60%', animationDelay: '10s' }}></div>
          <div className="particle" style={{ left: '70%', animationDelay: '12s' }}></div>
          <div className="particle" style={{ left: '80%', animationDelay: '14s' }}></div>
          <div className="particle" style={{ left: '90%', animationDelay: '16s' }}></div>
        </div>
      </div>

      <section className="relative w-full max-w-6xl rounded-3xl shadow-soft overflow-hidden bg-surface-800 enter-fade-up" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="absolute top-4 left-4 z-20">
          <Link to="/" className="flex items-center space-x-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm">
            <LuArrowLeft size={16} />
            <span>Voltar</span>
          </Link>
        </div>
        <div className="pointer-events-none absolute inset-0 texture-subtle" aria-hidden="true" />

        <div className="relative items-center justify-center p-10 animated-gradient" style={{ backgroundImage: `linear-gradient(135deg, ${brandPurple}, #6a24d9 60%, #2d0a66)` }}>
          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-glow breathing">
              <LuBookOpen size={48} className="text-white" aria-hidden="true" />
            </div>
            <h2 className="text-white text-3xl font-semibold">Seu Hub de Estudos</h2>
            <p className="text-white/85 max-w-xl">Organize seus estudos, acompanhe seu progresso, otimize seu foco com Pomodoro e compare desempenho com amigos.</p>
          </div>
        </div>

        <div className="relative p-6 sm:p-10">
          <div className="grid gap-4 sm:gap-6 mb-8">
            <Card className="p-0">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-semibold">Experimente grátis por 7 dias</h3>
                  <p className="text-white/80 mt-1">R$19,99/mês após o período de teste.</p>
                  <ul className="text-white/80 mt-3 text-sm space-y-1">
                    <li>Acesso completo a todos os conteúdos</li>
                    <li>Recursos avançados de estudo</li>
                    <li>Estatísticas detalhadas</li>
                  </ul>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link to="/signup" className="pressable ripple px-6 py-3 rounded-xl bg-brand-500 text-white hover:bg-brand-600">Começar agora</Link>
                  <Link to="/signup?plan=premium" className="pressable ripple px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20">Assinar R$19,99/mês</Link>
                </div>
              </div>
            </Card>
          </div>

          <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'estudos' && (
            <div className="grid gap-6">
              <Card>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white">Recursos de Aprendizagem</h3>
                    <p className="text-white/70">Disponíveis para você continuar evoluindo</p>
                  </div>
                  <div className="text-white/80">Progresso médio: {totalProgress}%</div>
                </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {learningResources.map((r) => (
                    <div key={r.id} className="rounded-xl bg-[#1f1f1f] p-4 border border-white/10">
                      <div className="text-white font-medium">{r.title}</div>
                      <div className="text-white/60 text-sm">{r.type}</div>
                      <div className="mt-3 h-2 rounded-full bg-surface-900 overflow-hidden">
                        <div className="h-full bg-brand-500" style={{ width: `${r.progress}%` }} />
                      </div>
                      <div className="mt-2 text-white/70 text-sm">{r.progress}%</div>
                      <Link to="/signup" className="mt-3 inline-flex items-center px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20">Continuar estudando</Link>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'roadmaps' && (
            <div className="grid gap-6">
              <Card>
                <h3 className="text-xl font-semibold text-white">Caminhos de Aprendizagem</h3>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roadmaps.map((r) => {
                    const pct = Math.round((r.completed / r.total) * 100)
                    return (
                      <div key={r.id} className="rounded-xl bg-[#1f1f1f] p-4 border border-white/10">
                        <div className="flex items-center justify-between">
                          <div className="text-white font-medium">{r.name}</div>
                          <div className="text-white/60 text-sm">{r.completed}/{r.total}</div>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-surface-900 overflow-hidden">
                          <div className="h-full bg-brand-500" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="mt-2 text-white/70 text-sm">{pct}%</div>
                        <Link to="/signup" className="mt-3 inline-flex items-center px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20">Ver roadmap</Link>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'pomodoro' && (
            <div className="grid gap-6">
              <Card>
                <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-48 h-48 rounded-full bg-[#1f1f1f] border border-white/10 flex items-center justify-center text-white text-4xl font-semibold">
                      {formatTime(secondsRemaining)}
                    </div>
                    <div className="mt-2 text-white/70 text-sm">{mode === 'work' ? 'Foco' : 'Pausa'}</div>
                    <div className="mt-4 flex items-center gap-3">
                      {!isRunning ? (
                        <button onClick={startTimer} className="pressable ripple px-5 py-2 rounded-lg bg-brand-500 text-white hover:bg-brand-600">Iniciar</button>
                      ) : (
                        <button onClick={pauseTimer} className="pressable ripple px-5 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20">Pausar</button>
                      )}
                      <button onClick={resetTimer} className="pressable ripple px-5 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20">Resetar</button>
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-xl bg-[#1f1f1f] p-4 border border-white/10">
                        <div className="text-white/80 text-sm">Tempo de foco (min)</div>
                        <input type="number" min="10" max="60" value={workMinutes} onChange={(e) => setWorkMinutes(Number(e.target.value))} className="mt-2 w-full rounded-lg bg-surface-900 text-white border border-white/10 px-3 py-2" />
                      </div>
                      <div className="rounded-xl bg-[#1f1f1f] p-4 border border-white/10">
                        <div className="text-white/80 text-sm">Tempo de pausa (min)</div>
                        <input type="number" min="3" max="30" value={breakMinutes} onChange={(e) => setBreakMinutes(Number(e.target.value))} className="mt-2 w-full rounded-lg bg-surface-900 text-white border border-white/10 px-3 py-2" />
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="text-white font-medium mb-3">Histórico de sessões</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {pomodoroHistory.length === 0 ? (
                          <div className="text-white/70">Nenhuma sessão registrada</div>
                        ) : (
                          pomodoroHistory.map((h) => (
                            <div key={h.id} className="rounded-lg bg-[#1f1f1f] p-3 border border-white/10 text-white/80 text-sm">
                              <div className="flex items-center justify-between">
                                <span>{h.type === 'work' ? 'Foco' : 'Pausa'}</span>
                                <span>{h.minutes} min</span>
                              </div>
                              <div className="text-white/60 mt-1">{new Date(h.finishedAt).toLocaleString()}</div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'competicao' && (
            <div className="grid gap-6">
              <Card>
                <h3 className="text-xl font-semibold text-white">Ranking entre amigos</h3>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    {[
                      { name: user?.name || 'Você', points: 1240, minutes: 560 },
                      { name: 'Ana', points: 1380, minutes: 620 },
                      { name: 'Bruno', points: 990, minutes: 420 },
                      { name: 'Carlos', points: 860, minutes: 380 },
                    ]
                      .sort((a, b) => b.points - a.points)
                      .map((p, i) => (
                        <div key={p.name} className={`flex items-center justify-between rounded-xl bg-[#1f1f1f] p-4 border ${p.name === (user?.name || 'Você') ? 'border-brand-500' : 'border-white/10'} mb-3`}>
                          <div className="text-white">{i + 1}. {p.name}</div>
                          <div className="text-white/70 text-sm">{p.points} pts • {p.minutes} min</div>
                        </div>
                      ))}
                  </div>
                  <div>
                    <div className="text-white font-medium mb-2">Métricas comparativas</div>
                    <div className="space-y-3">
                      {[
                        { label: 'Tempo de estudo semanal', you: 560, best: 620 },
                        { label: 'Módulos concluídos', you: 18, best: 22 },
                        { label: 'Dias ativos no mês', you: 16, best: 20 },
                      ].map((m) => (
                        <div key={m.label} className="rounded-xl bg-[#1f1f1f] p-4 border border-white/10">
                          <div className="text-white/80 text-sm">{m.label}</div>
                          <div className="mt-2 h-2 rounded-full bg-surface-900 overflow-hidden">
                            <div className="h-full bg-brand-500" style={{ width: `${Math.min(100, Math.round((m.you / m.best) * 100))}%` }} />
                          </div>
                          <div className="mt-1 text-white/60 text-xs">Você: {m.you} • Melhor: {m.best}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'monitoramento' && (
            <div className="grid gap-6">
              <Card>
                <h3 className="text-xl font-semibold text-white">Análises de estudo</h3>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-xl bg-[#1f1f1f] p-4 border border-white/10">
                    <div className="text-white/80 text-sm">Tempo por tópico</div>
                    <div className="mt-4 space-y-3">
                      {[
                        { topic: 'Java', min: 180 },
                        { topic: 'Estruturas de Dados', min: 140 },
                        { topic: 'Algoritmos', min: 120 },
                        { topic: 'Git', min: 60 },
                      ].map((t) => {
                        const max = 180
                        const pct = Math.round((t.min / max) * 100)
                        return (
                          <div key={t.topic}>
                            <div className="flex items-center justify-between text-white/70 text-sm">
                              <span>{t.topic}</span>
                              <span>{t.min} min</span>
                            </div>
                            <div className="mt-2 h-2 rounded-full bg-surface-900 overflow-hidden">
                              <div className="h-full bg-brand-500" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#1f1f1f] p-4 border border-white/10">
                    <div className="text-white/80 text-sm">Tempo por dia da semana</div>
                    <div className="mt-4 flex items-end gap-3 h-40">
                      {[
                        { d: 'S', v: 80 },
                        { d: 'T', v: 60 },
                        { d: 'Q', v: 100 },
                        { d: 'Q', v: 70 },
                        { d: 'S', v: 90 },
                        { d: 'S', v: 50 },
                        { d: 'D', v: 40 },
                      ].map((b, i) => {
                        const h = Math.max(8, Math.round((b.v / 100) * 150))
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center">
                            <div className="w-7 rounded-lg bg-brand-500" style={{ height: h }} />
                            <div className="text-white/60 text-xs mt-1">{b.d}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}