import { FaChartLine, FaFire, FaClock, FaCalendarAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function ProgressOverview({ studyMinutesToday, weeklyStreak, totalSessions, totalHours }) {
  const freeDailyLimit = 60
  const progressPercent = Math.min(100, Math.round((100 * studyMinutesToday) / freeDailyLimit))

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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Today's Progress */}
      <motion.div 
        variants={item}
        whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-white/70">Hoje</h3>
          <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
            <FaClock size={16} className="text-brand-300" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white mb-2">
          {studyMinutesToday}
          <span className="text-sm font-normal text-white/50 ml-1">min</span>
        </p>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          />
        </div>
        <p className="text-white/50 text-xs mt-2">{progressPercent}% da meta</p>
      </motion.div>

      {/* Weekly Streak */}
      <motion.div 
        variants={item}
        whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-white/70">Sequência</h3>
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <FaFire size={16} className="text-orange-400" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white mb-2">{weeklyStreak}</p>
        <p className="text-white/50 text-xs">dias consecutivos</p>
      </motion.div>

      {/* Total Sessions */}
      <motion.div 
        variants={item}
        whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-white/70">Sessões</h3>
          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
            <FaChartLine size={16} className="text-green-400" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white mb-2">{totalSessions}</p>
        <p className="text-white/50 text-xs">estudos concluídos</p>
      </motion.div>

      {/* Total Hours */}
      <motion.div 
        variants={item}
        whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-white/70">Horas</h3>
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <FaCalendarAlt size={16} className="text-purple-400" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white mb-2">
          {totalHours}
          <span className="text-sm font-normal text-white/50 ml-1">h</span>
        </p>
        <p className="text-white/50 text-xs">total estudado</p>
      </motion.div>
    </motion.div>
  )
}
