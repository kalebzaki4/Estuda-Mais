import { FaChartLine, FaBook, FaCheck, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import ProgressOverview from './ProgressOverview'

export default function StudyStatistics({ 
  pomodoroHistory, 
  subjectStats = [], // Default to empty if not provided
  completionStats = { completed: 0, remaining: 0 }, // Default to 0
  studyMinutesToday = 0,
  weeklyStreak = 0,
  totalSessions = 0,
  totalHours = 0,
  bestDay = { minutes: 0, day: '-' },
  dailyAverage = 0,
  initialFilter = null
}) {
  const [filter, setFilter] = useState(initialFilter)

  // Calculate statistics from pomodoro history
  const filteredHistory = filter === 'today' 
    ? pomodoroHistory.filter(entry => new Date(entry.finishedAt).toDateString() === new Date().toDateString())
    : pomodoroHistory;

  const thisWeekSessions = filteredHistory.filter(entry => {
    const entryDate = new Date(entry.finishedAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return entryDate > weekAgo && entry.type === 'work'
  }).length

  const thisWeekMinutes = filteredHistory
    .filter(entry => {
      const entryDate = new Date(entry.finishedAt)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return entryDate > weekAgo && entry.type === 'work'
    })
    .reduce((sum, entry) => sum + entry.minutes, 0)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  }

  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {filter === 'today' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
              <p className="text-brand-300 font-medium">Filtrando estatísticas de: <span className="font-bold uppercase">Hoje</span></p>
            </div>
            <button 
              onClick={() => setFilter(null)}
              className="text-brand-300/50 hover:text-brand-300 transition-colors p-1"
              title="Limpar Filtro"
            >
              <FaTimes size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stats (Moved from Overview) */}
      <ProgressOverview
        studyMinutesToday={studyMinutesToday}
        weeklyStreak={weeklyStreak}
        totalSessions={totalSessions}
        totalHours={totalHours}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Stats */}
        <motion.div 
          variants={item}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Esta Semana</h3>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FaChartLine size={16} className="text-blue-400" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-white/70 text-sm mb-1">Sessões de Estudo</p>
              <p className="text-3xl font-bold text-white">{thisWeekSessions}</p>
            </div>
            <div>
              <p className="text-white/70 text-sm mb-1">Tempo Total</p>
              <p className="text-2xl font-bold text-white">{thisWeekMinutes} <span className="text-sm text-white/50">min</span></p>
            </div>
          </div>
        </motion.div>

        {/* Completion Stats */}
        <motion.div 
          variants={item}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Conclusões</h3>
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <FaCheck size={16} className="text-green-400" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Aulas Completadas</span>
              <span className="text-2xl font-bold text-white">{completionStats.completed}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Faltando Completar</span>
              <span className="text-2xl font-bold text-white/50">{completionStats.remaining}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Week Summary (Moved from Overview) */}
      <motion.div 
        variants={item}
        className="bg-white/5 border border-white/10 rounded-2xl p-8"
      >
        <h2 className="text-xl font-semibold text-white mb-6">📊 Resumo da Semana</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="text-center">
            <p className="text-white/70 mb-2">Melhor Dia</p>
            <p className="text-3xl font-bold text-white">
              {bestDay.minutes} <span className="text-sm font-normal text-white/50">min</span>
            </p>
            <p className="text-white/50 text-sm mt-1">{bestDay.day}</p>
          </div>
          <div className="text-center">
            <p className="text-white/70 mb-2">Média Diária</p>
            <p className="text-3xl font-bold text-white">
              {dailyAverage} <span className="text-sm font-normal text-white/50">min</span>
            </p>
            <p className="text-white/50 text-sm mt-1">Registrada</p>
          </div>
        </div>
      </motion.div>

      {/* Subject Progress */}
      <motion.div 
        variants={item}
        className="bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Progresso por Matéria</h3>
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <FaBook size={16} className="text-purple-400" />
          </div>
        </div>
        <div className="space-y-5">
          {subjectStats.length > 0 ? (
            subjectStats.map((subject, idx) => {
              const percentage = Math.round((subject.completed / subject.total) * 100)
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-medium">{subject.name}</span>
                    <span className="text-white/50 text-xs">{subject.completed}/{subject.total}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${subject.color || 'from-brand-500 to-purple-500'} transition-all duration-500`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 + (idx * 0.1) }}
                    />
                  </div>
                  <p className="text-white/50 text-xs mt-1">{percentage}% concluído</p>
                </div>
              )
            })
          ) : (
            <div className="text-center py-8 text-white/50">
              Nenhuma matéria iniciada ainda.
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
