import { FaAward, FaStar, FaBullseye } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function AchievementsSection({ 
  points, 
  weeklyStreak,
  achievements = [], // Pass empty array by default
  dailyGoal = { current: 0, target: 60 },
  weeklyGoal = { current: 0, target: 10 }
}) {
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

  const userLevel = Math.floor(points / 500) + 1
  const levelProgress = ((points % 500) / 500) * 100

  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* User Level */}
      <motion.div 
        variants={item}
        className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-300/30 rounded-2xl p-8"
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaStar size={32} className="text-yellow-400" />
            <span className="text-5xl font-bold text-white">Level {userLevel}</span>
            <FaStar size={32} className="text-yellow-400" />
          </div>
          <p className="text-white/70 mb-6">Você está no caminho certo! Continue estudando para subir de nível.</p>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Progresso para próximo nível</span>
              <span className="text-white text-sm font-semibold">{Math.round(levelProgress)}%</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Achievements Grid */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2 mb-6">
          <FaAward size={24} className="text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Conquistas Desbloqueadas</h3>
        </div>
        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`rounded-xl p-6 transition-all ${
                  achievement.earned
                    ? 'bg-gradient-to-br from-brand-500/20 to-purple-500/20 border border-brand-300/30'
                    : 'bg-white/5 border border-white/10 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{achievement.icon}</span>
                  {achievement.earned && (
                    <span className="text-xs font-bold text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded-full">
                      ✓ DESBLOQUEADO
                    </span>
                  )}
                </div>
                <h4 className={`font-semibold mb-1 ${achievement.earned ? 'text-white' : 'text-white/70'}`}>
                  {achievement.name}
                </h4>
                <p className="text-white/50 text-sm mb-4">{achievement.description}</p>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full transition-all duration-500 ${
                      achievement.earned
                        ? 'bg-gradient-to-r from-brand-500 to-purple-500'
                        : 'bg-white/20'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${achievement.progress}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <p className="text-white/50 text-xs mt-2">{achievement.progress}%</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            <p className="text-white/50">Nenhuma conquista para exibir.</p>
          </div>
        )}
      </motion.div>

      {/* Daily & Weekly Goals */}
      <motion.div 
        variants={item}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Daily Goals */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">🎯 Meta Diária</h3>
            <LuTarget size={20} className="text-brand-300" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Estudar 1 hora</span>
                <span className="text-white/50 text-sm">{dailyGoal.current} min / {dailyGoal.target} min</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (dailyGoal.current / dailyGoal.target) * 100)}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Goals */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">📅 Meta Semanal</h3>
            <LuTarget size={20} className="text-brand-300" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Estudar 10 horas</span>
                <span className="text-white/50 text-sm">{weeklyGoal.current} h / {weeklyGoal.target} h</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500" 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (weeklyGoal.current / weeklyGoal.target) * 100)}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Manter sequência 7 dias</span>
                <span className="text-white/50 text-sm">{weeklyStreak} / 7</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (weeklyStreak / 7) * 100)}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
