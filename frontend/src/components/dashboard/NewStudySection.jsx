import { FaPlus, FaSearch, FaLightbulb, FaStopwatch } from 'react-icons/fa'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sanitizeInput } from '../../utils/validators.js'
import PomodoroTimer from './PomodoroTimer.jsx'

export default function NewStudySection({ 
  user,
  onSessionComplete,
  suggestedTopics = [], 
  recentStudies = [] 
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showTimer, setShowTimer] = useState(false)

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
      {/* Create New Study */}
      <motion.div 
        variants={item}
        className="bg-gradient-to-r from-brand-500/20 to-purple-500/20 border border-brand-500/30 rounded-2xl p-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Comece um Novo Estudo</h3>
            <p className="text-white/70">Escolha um tópico e comece a aprender agora</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center">
            <FaPlus size={20} className="text-white" />
          </div>
        </div>
        <input
          type="text"
          placeholder="Buscar ou criar novo estudo..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(sanitizeInput(e.target.value))}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-brand-300 focus:bg-white/15"
        />
      </motion.div>

      {/* Pomodoro Focus Session */}
      <motion.div variants={item}>
        <AnimatePresence mode="wait">
          {!showTimer ? (
            <motion.div
              key="pomodoro-promo"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-br from-indigo-500/20 to-brand-500/20 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/30 flex items-center justify-center text-brand-300">
                  <FaStopwatch size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Sessão de Foco</h3>
                  <p className="text-white/60 text-sm">Use o Pomodoro para maximizar sua produtividade.</p>
                </div>
              </div>
              <button
                onClick={() => setShowTimer(true)}
                className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2 whitespace-nowrap"
              >
                Iniciar Pomodoro
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="pomodoro-timer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 relative"
            >
              <button
                onClick={() => setShowTimer(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                Fechar
              </button>
              <PomodoroTimer 
                user={user} 
                onSessionComplete={onSessionComplete}
                initialSubject={searchQuery || 'Estudo Geral'}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Suggested Topics */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2 mb-4">
          <FaLightbulb size={20} className="text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">Sugestões Inteligentes</h3>
        </div>
        {suggestedTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedTopics.map((topic, idx) => (
              <button
                key={idx}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-brand-300/50 transition-all group"
              >
                <p className="text-3xl mb-2">{topic.icon}</p>
                <h4 className="text-white font-semibold text-sm text-left group-hover:text-brand-300 transition-colors">
                  {topic.title}
                </h4>
                <p className="text-white/50 text-xs text-left mt-1">{topic.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            <p className="text-white/50">Nenhuma sugestão disponível no momento.</p>
          </div>
        )}
      </motion.div>

      {/* Recent Studies */}
      <motion.div 
        variants={item}
        className="bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Estudos Recentes</h3>
        {recentStudies.length > 0 ? (
          <div className="space-y-3">
            {recentStudies.map((study) => (
              <button
                key={study.id}
                className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-brand-300/50 transition-all group"
              >
                <div className="text-left">
                  <p className="text-white font-medium group-hover:text-brand-300 transition-colors">
                    {study.title}
                  </p>
                  <p className="text-white/50 text-sm">{study.time}</p>
                </div>
                <span className="px-3 py-1 bg-brand-500/20 text-brand-300 text-xs rounded-full">
                  {study.subject}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-white/50">
            Nenhum estudo recente encontrado.
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
