import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContextCore.jsx'
import { LuBookOpen, LuTrendingUp, LuFlame, LuClock, LuTarget, LuAward } from 'react-icons/lu'

export default function Dashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('visao-geral')
  const [points, setPoints] = useState(() => {
    try {
      const raw = localStorage.getItem('userPoints')
      return raw ? parseInt(raw, 10) || 0 : 0
    } catch {
      return 0
    }
  })
  const [studyMinutesToday, setStudyMinutesToday] = useState(() => {
    try {
      const d = localStorage.getItem('studyDay')
      const m = localStorage.getItem('studyMinutesToday')
      const today = new Date().toDateString()
      if (d !== today) {
        localStorage.setItem('studyDay', today)
        localStorage.setItem('studyMinutesToday', '0')
        return 0
      }
      return m ? parseInt(m, 10) || 0 : 0
    } catch {
      return 0
    }
  })
  const [topics, setTopics] = useState(() => {
    try {
      const raw = localStorage.getItem('learningTopics')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [pomodoroHistory, setPomodoroHistory] = useState(() => {
    try {
      const raw = localStorage.getItem('pomodoroHistory')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [studyHistory, setStudyHistory] = useState(() => {
    try {
      const raw = localStorage.getItem('studyHistory')
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  })

  const [mode, setMode] = useState('work')
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [secondsRemaining, setSecondsRemaining] = useState(workMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef(null)
  const freeDailyLimit = 60

  useEffect(() => {
    setSecondsRemaining((mode === 'work' ? workMinutes : breakMinutes) * 60)
  }, [mode, workMinutes, breakMinutes])

  useEffect(() => {
    if (!isRunning) return
    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          const finishedAt = new Date().toISOString()
          const entry = { id: Date.now(), type: mode, minutes: mode === 'work' ? workMinutes : breakMinutes, finishedAt }
          const updated = [entry, ...pomodoroHistory].slice(0, 40)
          setPomodoroHistory(updated)
          try {
            localStorage.setItem('pomodoroHistory', JSON.stringify(updated))
          } catch {}
          const nextMode = mode === 'work' ? 'break' : 'work'
          if (mode === 'work') {
            const addMin = workMinutes
            const newToday = studyMinutesToday + addMin
            setStudyMinutesToday(newToday)
            try {
              localStorage.setItem('studyMinutesToday', String(newToday))
            } catch {}
            const gained = addMin * 10
            setPoints(points + gained)
            try {
              localStorage.setItem('userPoints', String(points + gained))
            } catch {}
          }
          setMode(nextMode)
          return (nextMode === 'work' ? workMinutes : breakMinutes) * 60
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [isRunning, mode, workMinutes, breakMinutes, pomodoroHistory, studyMinutesToday, points])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const weeklyStreak = (() => {
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
  })()

  const progressPercent = Math.min(100, Math.round((100 * studyMinutesToday) / freeDailyLimit))

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Olá{user?.name ? `, ${user.name}` : ''}
            </h1>
            <p className="text-lg text-white/70">
              Acompanhe seu progresso e mantenha seu ritmo de aprendizado
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-white/10">
            {['visao-geral', 'pomodoro', 'topicos'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-4 font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-brand-300 border-b-2 border-brand-300'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {tab === 'visao-geral' && 'Visão Geral'}
                {tab === 'pomodoro' && 'Pomodoro'}
                {tab === 'topicos' && 'Tópicos'}
              </button>
            ))}
          </div>

          {/* Visão Geral Tab */}
          {activeTab === 'visao-geral' && (
            <div className="space-y-6">
              {/* Today's Progress Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-1">Meta de Hoje</h2>
                    <p className="text-white/70">Progresso diário de estudo</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-brand-500/20 flex items-center justify-center">
                    <LuTrendingUp size={24} className="text-brand-300" />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">{studyMinutesToday} minutos</span>
                    <span className="text-white/70 text-sm">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="text-white/70 text-sm mt-3">
                    {studyMinutesToday >= freeDailyLimit
                      ? '🎉 Meta do dia concluída!'
                      : `Faltam ${freeDailyLimit - studyMinutesToday} minutos para completar`}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Streak Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm text-white/70 mb-1">Sequência Atual</h3>
                      <p className="text-3xl font-bold text-white">{weeklyStreak}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <LuFlame size={20} className="text-orange-400" />
                    </div>
                  </div>
                  <p className="text-white/70 text-sm">dias consecutivos</p>
                </div>

                {/* Points Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm text-white/70 mb-1">Pontos Ganhos</h3>
                      <p className="text-3xl font-bold text-white">{points}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                      <LuAward size={20} className="text-yellow-400" />
                    </div>
                  </div>
                  <p className="text-white/70 text-sm">total acumulado</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-xl font-semibold text-white mb-6">Ações Rápidas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    to="/configuracoes"
                    className="px-4 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium text-center"
                  >
                    Minhas Configurações
                  </Link>
                  <button
                    onClick={() => setActiveTab('pomodoro')}
                    className="px-4 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors font-medium"
                  >
                    Iniciar Sessão de Estudo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pomodoro Tab */}
          {activeTab === 'pomodoro' && (
            <div className="space-y-6">
              {/* Timer Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-xl font-semibold text-white mb-8 text-center">Pomodoro</h2>

                {/* Timer Display */}
                <div className="text-center mb-8">
                  <div className="text-7xl font-bold text-brand-300 font-mono mb-4">
                    {formatTime(secondsRemaining)}
                  </div>
                  <p className="text-white/70 text-lg">
                    {mode === 'work' ? '⏱️ Tempo de Estudo' : '☕ Tempo de Pausa'}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex gap-4 justify-center mb-8">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium"
                  >
                    {isRunning ? 'Pausar' : 'Iniciar'}
                  </button>
                  <button
                    onClick={() => {
                      setIsRunning(false)
                      setMode('work')
                      setSecondsRemaining(workMinutes * 60)
                    }}
                    className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors font-medium"
                  >
                    Resetar
                  </button>
                </div>

                {/* Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Tempo de Estudo</label>
                    <input
                      type="number"
                      value={workMinutes}
                      onChange={(e) => setWorkMinutes(Math.max(1, parseInt(e.target.value || '25', 10)))}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-brand-300"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Tempo de Pausa</label>
                    <input
                      type="number"
                      value={breakMinutes}
                      onChange={(e) => setBreakMinutes(Math.max(1, parseInt(e.target.value || '5', 10)))}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-brand-300"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* Histórico Card */}
              {pomodoroHistory.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h2 className="text-xl font-semibold text-white mb-6">Histórico da Sessão</h2>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {pomodoroHistory.slice(0, 10).map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-white">
                          {entry.type === 'work' ? '📚 Estudo' : '☕ Pausa'} • {entry.minutes} min
                        </span>
                        <span className="text-white/70 text-sm">
                          {new Date(entry.finishedAt).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tópicos Tab */}
          {activeTab === 'topicos' && (
            <div className="space-y-6">
              {topics.length > 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h2 className="text-xl font-semibold text-white mb-6">Tópicos em Estudo</h2>
                  <div className="flex flex-wrap gap-3">
                    {topics.map((topic) => (
                      <div
                        key={topic}
                        className="px-4 py-2 bg-brand-500/20 border border-brand-400/30 rounded-full text-white text-sm font-medium"
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                  <div className="w-12 h-12 rounded-lg bg-brand-500/20 flex items-center justify-center mx-auto mb-4">
                    <LuBookOpen size={24} className="text-brand-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Nenhum tópico selecionado</h3>
                  <p className="text-white/70 mb-6">
                    Escolha tópicos de estudo para personalizar seu aprendizado
                  </p>
                  <Link
                    to="/configuracoes"
                    className="inline-block px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium"
                  >
                    Ir para Configurações
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

