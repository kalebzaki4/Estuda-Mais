import { FaCheck, FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function RoadmapsSection({ roadmaps = [] }) {
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

  const recommendedRoadmaps = roadmaps.filter((rm) => rm.recommended)
  const otherRoadmaps = roadmaps.filter((rm) => !rm.recommended)

  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Recommended Roadmaps */}
      <motion.div variants={item}>
        <h3 className="text-lg font-semibold text-white mb-4">⭐ Recomendado Para Você</h3>
        {recommendedRoadmaps.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendedRoadmaps.map((roadmap) => (
              <button
                key={roadmap.id}
                className="bg-gradient-to-br from-brand-500/20 to-purple-500/20 border border-brand-300/30 rounded-2xl p-6 hover:from-brand-500/30 hover:to-purple-500/30 hover:border-brand-300/50 transition-all group text-left"
              >
                <div className="flex items-start justify-between mb-4">
                  <p className="text-4xl">{roadmap.icon}</p>
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full font-medium">
                    Recomendado
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-300 transition-colors">
                  {roadmap.title}
                </h4>
                <p className="text-white/70 text-sm mb-4">
                  {roadmap.completed} de {roadmap.topics} tópicos concluídos
                </p>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70 text-sm">Progresso</span>
                    <span className="text-white text-sm font-semibold">{roadmap.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${roadmap.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">{roadmap.status}</span>
                  <FaArrowRight size={18} className="text-brand-300 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            <p className="text-white/50">Nenhuma recomendação disponível no momento.</p>
          </div>
        )}
      </motion.div>

      {/* All Roadmaps */}
      <motion.div variants={item}>
        <h3 className="text-lg font-semibold text-white mb-4">Todos os Roadmaps</h3>
        {otherRoadmaps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherRoadmaps.map((roadmap) => (
              <button
                key={roadmap.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-brand-300/50 transition-all group text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="text-2xl">{roadmap.icon}</p>
                  <span className="text-white/50 text-xs">{roadmap.progress}%</span>
                </div>
                <h4 className="text-white font-semibold text-sm mb-2 group-hover:text-brand-300 transition-colors">
                  {roadmap.title}
                </h4>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${roadmap.progress}%` }}
                  />
                </div>
                <p className="text-white/50 text-xs">
                  {roadmap.completed}/{roadmap.topics}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            <p className="text-white/50">Nenhum roadmap encontrado.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
