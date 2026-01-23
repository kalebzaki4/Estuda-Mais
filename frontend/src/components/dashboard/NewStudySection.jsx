import { FaPlus, FaSearch, FaStopwatch, FaBook, FaJava, FaReact, FaCode, FaPython, FaJsSquare, FaDatabase, FaTerminal } from 'react-icons/fa'
import { HiXMark } from 'react-icons/hi2'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sanitizeInput } from '../../utils/validators.js'
import PomodoroTimer from './PomodoroTimer.jsx'
import studyService from '../../services/studyService.js'

const subjectConfig = {
  'Java': { icon: FaJava, color: 'text-orange-500', glow: 'group-hover:border-orange-500/50 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]', active: 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)]' },
  'React': { icon: FaReact, color: 'text-blue-400', glow: 'group-hover:border-blue-400/50 group-hover:shadow-[0_0_15px_rgba(96,165,250,0.3)]', active: 'border-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.4)]' },
  'JavaScript': { icon: FaJsSquare, color: 'text-yellow-400', glow: 'group-hover:border-yellow-400/50 group-hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]', active: 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]' },
  'Python': { icon: FaPython, color: 'text-blue-500', glow: 'group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]', active: 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]' },
  'SQL': { icon: FaDatabase, color: 'text-green-400', glow: 'group-hover:border-green-400/50 group-hover:shadow-[0_0_15px_rgba(74,222,128,0.3)]', active: 'border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.4)]' },
  'Terminal': { icon: FaTerminal, color: 'text-purple-400', glow: 'group-hover:border-purple-400/50 group-hover:shadow-[0_0_15px_rgba(192,132,252,0.3)]', active: 'border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.4)]' },
  'default': { icon: FaCode, color: 'text-gray-400', glow: 'group-hover:border-brand-500/50 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]', active: 'border-brand-500 shadow-[0_0_20px_rgba(139,92,246,0.4)]' }
}

export default function NewStudySection({ 
  user,
  onSessionComplete,
  suggestedTopics = [], 
  recentStudies = [] 
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMateria, setSelectedMateria] = useState(null)
  const [showTimer, setShowTimer] = useState(false)
  const [materias, setMaterias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [topics, setTopics] = useState([])
  const [currentTopic, setCurrentTopic] = useState('')
  const [sessionId, setSessionId] = useState(null)
  const [startingSession, setStartingSession] = useState(false)

  // Carregar matérias do Backend Java ao iniciar
  const carregarDados = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await studyService.listarMaterias()
      if (result.success) {
        setMaterias(result.data)
      } else {
        setError(result.error || "Erro ao carregar matérias")
      }
    } catch (err) {
      setError("Não foi possível conectar ao servidor. Verifique sua conexão.")
    } finally {
      setLoading(false)
    }
  }

  const handleResetStudy = () => {
    setSelectedMateria(null)
    setTopics([])
    setCurrentTopic('')
    setSearchQuery('')
    setShowTimer(false)
    setSessionId(null)
    setStartingSession(false)
    
    // Opcional: recarregar matérias para garantir que os ícones e cores estejam corretos
    carregarDados()
  }

  useEffect(() => {
    carregarDados()
  }, [])

  const handleStartFocus = async () => {
    if (!selectedMateria) return
    
    setStartingSession(true)
    try {
      // Passo 1: Preparar sessão
      const resPrep = await studyService.prepararSessao(selectedMateria.nome, user?.id || 1)
      if (!resPrep.success) throw new Error(resPrep.error)

      const sid = resPrep.data.id
      
      // Passo 2: Iniciar sessão com tópicos iniciais e tempo (ex: 25 min padrão)
      const resInit = await studyService.iniciarSessao(sid, 25, topics)
      if (!resInit.success) throw new Error(resInit.error)

      setSessionId(sid)
      setShowTimer(true)
    } catch (err) {
      console.error("Erro ao iniciar sessão:", err)
      // Aqui poderíamos mostrar um toast ou alerta
    } finally {
      setStartingSession(false)
    }
  }

  const handleAddTopic = (e) => {
    if (e) e.preventDefault()
    const sanitized = sanitizeInput(currentTopic).trim()
    
    // Validação Anti-Cheat: 2 palavras ou 10 caracteres, sem caracteres repetidos 5+ vezes
    const topicRegex = /^(?=(?:.*\s.*){1,}|.{10,})(?!.*(.)\1{4,}).*$/
    
    if (!topicRegex.test(sanitized)) {
      alert("Tópico inválido! Use pelo menos 10 caracteres ou 2 palavras, e evite repetições.")
      return
    }

    if (sanitized && !topics.includes(sanitized)) {
      setTopics([...topics, sanitized])
      setCurrentTopic('')
    }
  }

  const removeTopic = (topicToRemove) => {
    setTopics(topics.filter(t => t !== topicToRemove))
  }

  const selectMateria = (materia) => {
    setSelectedMateria(materia)
    setSearchQuery(materia.nome)
  }

  const materiasFiltradas = materias.filter(m => 
    m.nome.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const getSubjectIcon = (nome) => {
    const config = subjectConfig[nome] || subjectConfig['default']
    return <config.icon className={`text-4xl opacity-20 absolute -right-2 -bottom-2 transition-transform group-hover:scale-110 ${config.color}`} />
  }

  const getSubjectStyles = (nome) => {
    const isSelected = selectedMateria?.nome === nome
    const config = subjectConfig[nome] || subjectConfig['default']
    return `${isSelected ? config.active : 'border-white/10'} ${config.glow}`
  }

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      
      <AnimatePresence>
        {!showTimer && (
          <motion.div
            initial={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="space-y-8"
          >
            {/* Seção de Busca Glassmorphism */}
            <motion.div variants={item} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
              <div className="relative bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">O que vamos aprender hoje?</h3>
                    <p className="text-white/50">Selecione uma matéria ou digite o que deseja estudar</p>
                  </div>
                </div>
                
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Ex: Programação Java, React Hooks..."
                    value={searchQuery}
                    onChange={(e) => {
                      const val = sanitizeInput(e.target.value)
                      setSearchQuery(val)
                      if (selectedMateria && val !== selectedMateria.nome) setSelectedMateria(null)
                    }}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand-500/50 focus:bg-white/10 transition-all shadow-inner"
                  />
                </div>
              </div>
            </motion.div>

            {/* Matérias do Banco de Dados */}
            <motion.div variants={item} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-brand-500 rounded-full" />
                <h3 className="text-lg font-semibold text-white/90">Matérias Sugeridas</h3>
              </div>
              
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse border border-white/5" />
                  ))}
                </div>
              ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
                  <p className="text-red-400 mb-4">{error}</p>
                  <button 
                    onClick={carregarDados}
                    className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-xl transition-all"
                  >
                    Tentar Novamente
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {materiasFiltradas.slice(0, 6).map((materia) => (
                      <motion.button
                        layout
                        key={materia.id}
                        onClick={() => selectMateria(materia)}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative overflow-hidden bg-white/5 backdrop-blur-sm border rounded-2xl p-5 transition-all text-left group ${getSubjectStyles(materia.nome)}`}
                      >
                        <div className="relative z-10">
                          <h4 className="text-white font-bold group-hover:text-brand-300 transition-colors">
                            {materia.nome}
                          </h4>
                          <p className="text-white/40 text-xs mt-1">Clique para selecionar</p>
                        </div>
                        {getSubjectIcon(materia.nome)}
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>

            {/* Nova Seção: Tópicos de Estudo (Tags) */}
            <motion.div variants={item} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-purple-500 rounded-full" />
                <h3 className="text-lg font-semibold text-white/90">Tópicos Específicos</h3>
              </div>
              
              <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-md transition-all ${!selectedMateria ? 'opacity-50 grayscale-[0.5]' : ''}`}>
                <form onSubmit={handleAddTopic} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={selectedMateria ? "O que exatamente você vai estudar? (Enter para adicionar)" : "Selecione uma matéria acima primeiro..."}
                    value={currentTopic}
                    onChange={(e) => setCurrentTopic(e.target.value)}
                    disabled={!selectedMateria}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="submit"
                    disabled={!selectedMateria}
                    className="p-3 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 border border-purple-500/30 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaPlus />
                  </button>
                </form>

                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {topics.map((topic) => (
                      <motion.span
                        key={topic}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-brand-500/10 border border-brand-500/30 text-brand-300 rounded-full text-sm font-medium group"
                      >
                        {topic}
                        <button 
                          onClick={() => removeTopic(topic)}
                          className="hover:text-white transition-colors"
                        >
                          <HiXMark size={16} />
                        </button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                  {topics.length === 0 && (
                    <p className="text-white/20 text-sm italic">Nenhum tópico adicionado ainda...</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timer Pomodoro Refatorado */}
      <motion.div variants={item}>
        <AnimatePresence mode="wait">
          {!showTimer ? (
            <div className="relative group overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-[#0f111a]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                    <FaStopwatch size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Pronto para começar?</h3>
                    <p className="text-white/50">
                      {selectedMateria ? (
                        <>Estudando: <span className="text-brand-400 font-semibold">{selectedMateria.nome}</span></>
                      ) : 'Selecione uma matéria acima'}
                    </p>
                    {topics.length > 0 && (
                      <p className="text-white/30 text-xs mt-1 italic">
                        Focando em: {topics.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                
                <motion.button
                  onClick={handleStartFocus}
                  disabled={!selectedMateria || startingSession}
                  whileHover={selectedMateria && !startingSession ? { scale: 1.05, shadow: "0 0 20px rgba(139, 92, 246, 0.4)" } : {}}
                  whileTap={selectedMateria && !startingSession ? { scale: 0.95 } : {}}
                  className={`px-10 py-4 rounded-2xl font-black text-lg tracking-wider transition-all duration-300 ${
                    selectedMateria && !startingSession
                      ? 'bg-gradient-to-r from-brand-500 to-purple-600 text-white shadow-xl shadow-brand-500/20' 
                      : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                  }`}
                >
                  {startingSession ? 'INICIANDO...' : 'INICIAR SESSÃO'}
                </motion.button>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0f111a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 relative shadow-2xl"
            >
              <button 
                onClick={() => setShowTimer(false)} 
                className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
              >
                <HiXMark size={24} />
              </button>
              <PomodoroTimer 
                user={user} 
                onSessionComplete={onSessionComplete} 
                onReset={handleResetStudy}
                initialSubject={selectedMateria?.nome || searchQuery} 
                sessionId={sessionId}
                initialTopics={topics}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
