import { motion } from 'framer-motion'
import { FaBook, FaClock, FaTrophy, FaCalendarAlt, FaChartBar, FaPlus } from 'react-icons/fa'

export default function StudySummaryComponent({ 
  data, 
  onViewStats, 
  onNewStudy 
}) {
  const { subject, minutes, xp, finishedAt, topics = [] } = data

  const container = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      } 
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const formattedDate = new Date(finishedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-2xl mx-auto"
    >
      <div className="relative group">
        {/* Efeito de brilho ao fundo */}
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-[#0f111a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
          <motion.div variants={item} className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 text-white mb-6 shadow-xl shadow-brand-500/20">
              <FaTrophy size={40} />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Resumo do Estudo</h2>
            <p className="text-white/50">Excelente trabalho! Veja o que você conquistou hoje.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {/* Matéria */}
            <motion.div variants={item} className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <FaBook size={24} />
              </div>
              <div>
                <p className="text-xs text-white/30 uppercase font-bold tracking-widest">Matéria</p>
                <p className="text-lg font-bold text-white">{subject}</p>
              </div>
            </motion.div>

            {/* Tempo */}
            <motion.div variants={item} className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                <FaClock size={24} />
              </div>
              <div>
                <p className="text-xs text-white/30 uppercase font-bold tracking-widest">Tempo Total</p>
                <p className="text-lg font-bold text-white">{minutes} minutos</p>
              </div>
            </motion.div>

            {/* XP */}
            <motion.div variants={item} className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <FaTrophy size={24} />
              </div>
              <div>
                <p className="text-xs text-white/30 uppercase font-bold tracking-widest">XP Ganho</p>
                <p className="text-lg font-bold text-amber-400">+{xp} XP</p>
              </div>
            </motion.div>

            {/* Data */}
            <motion.div variants={item} className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <FaCalendarAlt size={24} />
              </div>
              <div>
                <p className="text-xs text-white/30 uppercase font-bold tracking-widest">Data</p>
                <p className="text-lg font-bold text-white">Hoje</p>
              </div>
            </motion.div>
          </div>

          {topics.length > 0 && (
            <motion.div variants={item} className="mb-10 bg-white/5 border border-white/5 rounded-2xl p-6">
              <p className="text-xs text-white/30 uppercase font-bold tracking-widest mb-4">Tópicos Estudados</p>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-brand-500/10 border border-brand-500/20 text-brand-300 rounded-lg text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onViewStats}
              className="flex-1 flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-brand-500 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-brand-500/20 hover:scale-[1.02] transition-all active:scale-95"
            >
              <FaChartBar />
              VER ESTATÍSTICAS DE HOJE
            </button>
            <button
              onClick={onNewStudy}
              className="flex-1 flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all active:scale-95"
            >
              <FaPlus />
              INICIAR NOVO ESTUDO
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
