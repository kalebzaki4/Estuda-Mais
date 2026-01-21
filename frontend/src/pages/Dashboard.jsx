import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContextCore.jsx'
import { FaBookOpen, FaChartLine, FaFire, FaClock, FaBullseye, FaTrophy, FaPlay, FaChevronRight, FaBook } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import studyService from '../services/studyService.js'
import ProgressOverview from '../components/dashboard/ProgressOverview.jsx'
import StudyStatistics from '../components/dashboard/StudyStatistics.jsx'
import NewStudySection from '../components/dashboard/NewStudySection.jsx'
import RoadmapsSection from '../components/dashboard/RoadmapsSection.jsx'
import CompetitionSection from '../components/dashboard/CompetitionSection.jsx'
import AchievementsSection from '../components/dashboard/AchievementsSection.jsx'

export default function Dashboard() {
  const { user } = useAuth()
  const { tab } = useParams()
  const navigate = useNavigate()
  
  // Mapeamento de abas válidas
  const validTabs = ['visao-geral', 'estatisticas', 'novo-estudo', 'roadmaps', 'competicao', 'conquistas']
  const initialTab = validTabs.includes(tab) ? tab : 'visao-geral'
  
  const [activeTab, setActiveTab] = useState(initialTab)

  // Sincronizar URL com activeTab se o parametro mudar (navegação externa/menu)
  useEffect(() => {
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab)
    } else if (!tab && activeTab !== 'visao-geral') {
       // Se estiver na raiz /dashboard, pode manter a última ou ir para visao-geral
       // Vamos forçar visao-geral se não tiver tab para consistência
       setActiveTab('visao-geral')
    }
  }, [tab])

  // Função para mudar aba e atualizar URL
  const handleTabChange = (newTabId) => {
    setActiveTab(newTabId)
    navigate(`/dashboard/${newTabId}`)
  }
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

  const handleSessionComplete = (entry) => {
    const updatedHistory = [entry, ...pomodoroHistory].slice(0, 40)
    setPomodoroHistory(updatedHistory)
    try {
      localStorage.setItem('pomodoroHistory', JSON.stringify(updatedHistory))
    } catch {}

    const todayKey = new Date().toDateString()
    const updatedStudyHistory = { ...studyHistory }
    updatedStudyHistory[todayKey] = (updatedStudyHistory[todayKey] || 0) + (entry.type === 'work' ? entry.minutes : 0)
    setStudyHistory(updatedStudyHistory)
    try {
      localStorage.setItem('studyHistory', JSON.stringify(updatedStudyHistory))
    } catch {}

    if (entry.type === 'work') {
      const newToday = studyMinutesToday + entry.minutes
      setStudyMinutesToday(newToday)
      try {
        localStorage.setItem('studyMinutesToday', String(newToday))
      } catch {}

      const gained = entry.minutes * 10
      const newPoints = points + gained
      setPoints(newPoints)
      try {
        localStorage.setItem('userPoints', String(newPoints))
      } catch {}
    }
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

  // Calculate Real Stats
  const bestDay = (() => {
    const entries = Object.entries(studyHistory)
    if (entries.length === 0) return { minutes: 0, day: '-' }
    
    // Sort by minutes desc
    const sorted = entries.sort(([, a], [, b]) => b - a)
    const [dateStr, minutes] = sorted[0]
    
    // Get day name (e.g. "Quinta-feira")
    const date = new Date(dateStr)
    const dayName = date.toLocaleDateString('pt-BR', { weekday: 'long' })
    
    return { 
      minutes, 
      day: dayName.charAt(0).toUpperCase() + dayName.slice(1) 
    }
  })()

  const dailyAverage = (() => {
    const entries = Object.entries(studyHistory)
    if (entries.length === 0) return 0
    
    const total = entries.reduce((sum, [, minutes]) => sum + minutes, 0)
    // Average over recorded days
    return Math.round(total / entries.length) || 0
  })()

  // Animation Variants
  const tabContentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-3"
            >
              Olá{user?.name ? `, ${user.name}` : ''}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-white/70"
            >
              Seu hub de estudos completo. Aprenda, compita e alcance seus objetivos.
            </motion.p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-12 border-b border-white/10 overflow-x-auto scrollbar-hide">
            {[
              { id: 'visao-geral', label: 'Visão Geral', icon: FaChartLine },
              { id: 'estatisticas', label: 'Estatísticas', icon: FaChevronRight },
              { id: 'novo-estudo', label: 'Novo Estudo', icon: FaBullseye },
              { id: 'roadmaps', label: 'Roadmaps', icon: FaBookOpen },
              { id: 'competicao', label: 'Competição', icon: FaTrophy },
              { id: 'conquistas', label: 'Conquistas', icon: FaChartLine },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id)}
                className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap relative flex items-center gap-2 ${
                  activeTab === t.id
                    ? 'text-brand-300'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <t.icon size={16} />
                {t.label}
                {activeTab === t.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-300"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content Sections */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-8"
            >
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
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="bg-gradient-to-r from-brand-500/20 to-purple-500/20 border border-brand-300/30 rounded-2xl p-8"
                  >
                    <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-white mb-6">⚡ Ações Rápidas</motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { id: 'novo-estudo', label: 'Novo Estudo', icon: FaBullseye, action: () => handleTabChange('novo-estudo'), primary: true },
                        { id: 'roadmaps', label: 'Ver Roadmaps', icon: FaBookOpen, action: () => handleTabChange('roadmaps') },
                        { id: 'config', label: 'Configurações', icon: FaTrophy, to: '/configuracoes' }
                      ].map((btn, idx) => (
                        <motion.div key={btn.id} variants={itemVariants}>
                          {btn.to ? (
                            <Link
                              to={btn.to}
                              className={`w-full px-6 py-4 rounded-xl transition-all font-medium flex items-center justify-center gap-2 group ${
                                btn.primary 
                                  ? 'bg-brand-500 text-white hover:bg-brand-600' 
                                  : 'border border-white/20 text-white hover:bg-white/5'
                              }`}
                            >
                              <btn.icon size={18} className="group-hover:scale-110 transition-transform" />
                              {btn.label}
                            </Link>
                          ) : (
                            <button
                              onClick={btn.action}
                              className={`w-full px-6 py-4 rounded-xl transition-all font-medium flex items-center justify-center gap-2 group ${
                                btn.primary 
                                  ? 'bg-brand-500 text-white hover:bg-brand-600' 
                                  : 'border border-white/20 text-white hover:bg-white/5'
                              }`}
                            >
                              <btn.icon size={18} className="group-hover:scale-110 transition-transform" />
                              {btn.label}
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Recent Activity */}
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="bg-white/5 border border-white/10 rounded-2xl p-8"
                  >
                    <motion.h2 variants={itemVariants} className="text-xl font-semibold text-white mb-6">📊 Sua Semana</motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants} className="text-center">
                        <p className="text-white/70 mb-2">Melhor Dia</p>
                        <p className="text-3xl font-bold text-white">
                          {bestDay.minutes} <span className="text-sm font-normal text-white/50">min</span>
                        </p>
                        <p className="text-white/50 text-sm mt-1">{bestDay.day}</p>
                      </motion.div>
                      <motion.div variants={itemVariants} className="text-center">
                        <p className="text-white/70 mb-2">Média Diária</p>
                        <p className="text-3xl font-bold text-white">
                          {dailyAverage} <span className="text-sm font-normal text-white/50">min</span>
                        </p>
                        <p className="text-white/50 text-sm mt-1">Registrada</p>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Estatísticas Tab */}
              {activeTab === 'estatisticas' && (
                <StudyStatistics pomodoroHistory={pomodoroHistory} />
              )}

              {/* Novo Estudo Tab */}
              {activeTab === 'novo-estudo' && (
                <NewStudySection 
                  user={user} 
                  onSessionComplete={handleSessionComplete} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
