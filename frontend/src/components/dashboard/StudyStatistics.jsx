import { FaChartLine, FaBook, FaCheck } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function StudyStatistics({ 
  pomodoroHistory, 
  subjectStats = [], // Default to empty if not provided
  completionStats = { completed: 0, remaining: 0 } // Default to 0
}) {
  // Calculate statistics from pomodoro history
  const thisWeekSessions = pomodoroHistory.filter(entry => {
    const entryDate = new Date(entry.finishedAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return entryDate > weekAgo && entry.type === 'work'
  }).length

  const thisWeekMinutes = pomodoroHistory
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
