import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContextCore.jsx'
import { LuBookOpen, LuTrendingUp, LuFlame, LuClock, LuTarget, LuAward, LuPlay, LuChevronRight } from 'react-icons/lu'
import ProgressOverview from '../components/dashboard/ProgressOverview.jsx'
import StudyStatistics from '../components/dashboard/StudyStatistics.jsx'
import NewStudySection from '../components/dashboard/NewStudySection.jsx'
import RoadmapsSection from '../components/dashboard/RoadmapsSection.jsx'
import CompetitionSection from '../components/dashboard/CompetitionSection.jsx'
import AchievementsSection from '../components/dashboard/AchievementsSection.jsx'

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

  // Calculate statistics
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

  const totalSessions = pomodoroHistory.filter((entry) => entry.type === 'work').length
  const totalHours = Math.round(pomodoroHistory
    .filter((entry) => entry.type === 'work')
    .reduce((sum, entry) => sum + entry.minutes, 0) / 60)

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Olá{user?.name ? `, ${user.name}` : ''}
            </h1>
            <p className="text-lg text-white/70">
              Seu hub de estudos completo. Aprenda, compita e alcance seus objetivos.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-12 border-b border-white/10 overflow-x-auto">
            {[
              { id: 'visao-geral', label: 'Visão Geral', icon: LuTrendingUp },
              { id: 'estatisticas', label: 'Estatísticas', icon: LuChevronRight },
              { id: 'novo-estudo', label: 'Novo Estudo', icon: LuTarget },
              { id: 'roadmaps', label: 'Roadmaps', icon: LuBookOpen },
              { id: 'competicao', label: 'Competição', icon: LuAward },
              { id: 'conquistas', label: 'Conquistas', icon: LuTrendingUp },
              { id: 'pomodoro', label: 'Pomodoro', icon: LuClock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-brand-300 border-b-2 border-brand-300'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Visão Geral Tab */}
            {activeTab === 'visao-geral' && (
              <div className="space-y-8">
                {/* Quick Stats */}
                <ProgressOverview
                  studyMinutesToday={studyMinutesToday}
                  weeklyStreak={weeklyStreak}
                  totalSessions={totalSessions}
                  totalHours={totalHours}
                />

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-brand-500/20 to-purple-500/20 border border-brand-300/30 rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold text-white mb-6">⚡ Ações Rápidas</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                      onClick={() => setActiveTab('pomodoro')}
                      className="px-6 py-4 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-colors font-medium flex items-center justify-center gap-2 group"
                    >
                      <LuPlay size={18} className="group-hover:scale-110 transition-transform" />
                      Iniciar Pomodoro
                    </button>
                    <button
                      onClick={() => setActiveTab('novo-estudo')}
                      className="px-6 py-4 border border-brand-300/50 text-white rounded-xl hover:bg-brand-500/20 transition-colors font-medium flex items-center justify-center gap-2 group"
                    >
                      <LuTarget size={18} className="group-hover:scale-110 transition-transform" />
                      Novo Estudo
                    </button>
                    <button
                      onClick={() => setActiveTab('roadmaps')}
                      className="px-6 py-4 border border-white/20 text-white rounded-xl hover:bg-white/5 transition-colors font-medium flex items-center justify-center gap-2 group"
                    >
                      <LuBookOpen size={18} className="group-hover:scale-110 transition-transform" />
                      Ver Roadmaps
                    </button>
                    <Link
                      to="/configuracoes"
                      className="px-6 py-4 border border-white/20 text-white rounded-xl hover:bg-white/5 transition-colors font-medium flex items-center justify-center gap-2 group"
                    >
                      <LuAward size={18} className="group-hover:scale-110 transition-transform" />
                      Configurações
                    </Link>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h2 className="text-xl font-semibold text-white mb-6">📊 Sua Semana</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="text-center">
                      <p className="text-white/70 mb-2">Melhor Dia</p>
                      <p className="text-3xl font-bold text-white">120 min</p>
                      <p className="text-white/50 text-sm mt-1">Quinta-feira</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/70 mb-2">Média Diária</p>
                      <p className="text-3xl font-bold text-white">87 min</p>
                      <p className="text-white/50 text-sm mt-1">Esta semana</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Estatísticas Tab */}
            {activeTab === 'estatisticas' && (
              <StudyStatistics pomodoroHistory={pomodoroHistory} />
            )}

            {/* Novo Estudo Tab */}
            {activeTab === 'novo-estudo' && (
              <NewStudySection />
            )}

            {/* Roadmaps Tab */}
            {activeTab === 'roadmaps' && (
              <RoadmapsSection />
            )}

            {/* Competição Tab */}
            {activeTab === 'competicao' && (
              <CompetitionSection points={points} />
            )}

            {/* Conquistas Tab */}
            {activeTab === 'conquistas' && (
              <AchievementsSection points={points} weeklyStreak={weeklyStreak} />
            )}

            {/* Pomodoro Tab */}
            {activeTab === 'pomodoro' && (
              <div className="space-y-6">
                {/* Timer Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold text-white mb-8 text-center">⏱️ Pomodoro</h2>

                  {/* Timer Display */}
                  <div className="text-center mb-8">
                    <div className="text-7xl font-bold text-brand-300 font-mono mb-4">
                      {formatTime(secondsRemaining)}
                    </div>
                    <p className="text-white/70 text-lg">
                      {mode === 'work' ? '📚 Tempo de Estudo' : '☕ Tempo de Pausa'}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex gap-4 justify-center mb-8">
                    <button
                      onClick={() => setIsRunning(!isRunning)}
                      className="px-8 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium"
                    >
                      {isRunning ? 'Pausar' : 'Iniciar'}
                    </button>
                    <button
                      onClick={() => {
                        setIsRunning(false)
                        setMode('work')
                        setSecondsRemaining(workMinutes * 60)
                      }}
                      className="px-8 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors font-medium"
                    >
                      Resetar
                    </button>
                  </div>

                  {/* Settings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Tempo de Estudo (min)</label>
                      <input
                        type="number"
                        value={workMinutes}
                        onChange={(e) => setWorkMinutes(Math.max(1, parseInt(e.target.value || '25', 10)))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-brand-300"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Tempo de Pausa (min)</label>
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
                    <h2 className="text-xl font-semibold text-white mb-6">📜 Histórico da Sessão</h2>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {pomodoroHistory.slice(0, 15).map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                          <span className="text-white font-medium">
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
          </div>
        </div>
      </section>
    </div>
  )
}

