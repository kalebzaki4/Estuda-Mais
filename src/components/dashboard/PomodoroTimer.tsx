import { useState, useEffect, useRef } from 'react'
import { FaClock, FaBook, FaPlay, FaPause, FaRedo, FaPlus, FaTrophy, FaChartBar, FaUsers, FaArrowUp } from 'react-icons/fa'
import { HiXMark } from 'react-icons/hi2'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import confetti from 'canvas-confetti'
// TODO: Conectar com novo backend para salvar sessão de estudo
// import studyService from '../../services/studyService.js'

export default function PomodoroTimer({ 
  user, 
  onSessionComplete,
  onReset,
  initialSubject = 'Estudo Geral',
  sessionId = null,
  initialTopics = []
}) {
  const navigate = useNavigate()
  const [mode, setMode] = useState('work')
  const [workMinutes] = useState(25) // Tempo imutável
  const [breakMinutes] = useState(5) // Tempo imutável
  const [cycles, setCycles] = useState(1)
  const [currentCycle, setCurrentCycle] = useState(1)
  const [secondsRemaining, setSecondsRemaining] = useState(workMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(initialSubject)
  const [topics, setTopics] = useState(initialTopics)
  const [newTopic, setNewTopic] = useState('')
  const [showSummaryModal, setShowSummaryModal] = useState(false)
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [xpGained, setXpGained] = useState(0)
  const [summaryText, setSummaryText] = useState('')
  const [isFinishing, setIsFinishing] = useState(false)
  const [displayXp, setDisplayXp] = useState(0)
  const [showXpParticles, setShowXpParticles] = useState(false)
  const timerRef = useRef(null)

  // Som de conquista via Web Audio API
  const playDing = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime) // C5
      oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.5) // C6

      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5)

      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)

      oscillator.start()
      oscillator.stop(audioCtx.currentTime + 0.5)
    } catch (e) {
      console.warn("Audio Context não suportado", e)
    }
  }

  useEffect(() => {
    if (showRewardModal) {
      playDing()
      // Animação do contador de XP
      let start = 0
      const duration = 1500
      const increment = xpGained / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= xpGained) {
          setDisplayXp(xpGained)
          clearInterval(timer)
        } else {
          setDisplayXp(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    } else {
      setDisplayXp(0)
    }
  }, [showRewardModal, xpGained])

  useEffect(() => {
    setSecondsRemaining((mode === 'work' ? workMinutes : breakMinutes) * 60)
  }, [mode, workMinutes, breakMinutes])

  useEffect(() => {
    if (!isRunning) return
    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          handleSessionFinished()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [isRunning, mode, workMinutes, breakMinutes, sessionId, onSessionComplete, topics])

  const handleSessionFinished = async () => {
    if (mode === 'work') {
      if (currentCycle < cycles) {
        setMode('break')
        setSecondsRemaining(breakMinutes * 60)
        // Opcional: Notificar que o ciclo terminou e a pausa começou
      } else {
        setIsRunning(false)
        setShowSummaryModal(true)
      }
    } else {
      // Terminou a pausa
      setMode('work')
      setCurrentCycle(prev => prev + 1)
      setSecondsRemaining(workMinutes * 60)
    }
  }

  const handleConfirmSummary = async () => {
    if (summaryText.length < 100) return

    setIsFinishing(true)
    try {
      const finishedAt = new Date().toISOString()
      const totalWorkMinutes = workMinutes * cycles
      
      // Garantir que selectedSubject seja uma string
      const subjectName = typeof selectedSubject === 'object' ? selectedSubject.nome : selectedSubject;
      
      // Cálculo local para animação (deve bater com o backend)
      const calculatedXp = (cycles * 50) + (topics.length * 10)
      
      // TODO: Conectar com novo backend para salvar sessão de estudo
      // Finalizar sessão no backend
      // if (sessionId) {
      //   await studyService.finalizarSessao(sessionId, totalWorkMinutes, summaryText, topics)
      // }

      setXpGained(calculatedXp)
      setShowSummaryModal(false)
      setShowRewardModal(true)
      setShowXpParticles(true)

      // Disparar confetes com proteção contra erros
      try {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8a2be2', '#2575fc', '#facc15']
        })
      } catch (confettiError) {
        console.warn('⚠️ Confetti falhou, continuando sem efeitos visuais:', confettiError)
      }
      
      // Desativar partículas após a animação
      setTimeout(() => setShowXpParticles(false), 2000)

      // Notificar conclusão (pode ser usado para atualizar o perfil globalmente)
      if (onSessionComplete) {
        onSessionComplete({
          type: 'work',
          minutes: totalWorkMinutes,
          finishedAt,
          topics: topics,
          summary: summaryText,
          xp: calculatedXp,
          subject: subjectName
        })
      }
    } catch (error) {
      console.error("Erro ao finalizar sessão:", error)
      toast.error("Erro ao salvar sessão", {
        description: "Verifique o resumo e tente novamente.",
        style: {
          background: '#000000',
          color: '#FFFFFF',
          border: '1px solid #7c3aed',
        },
        duration: 5000
      })
    } finally {
      setIsFinishing(false)
    }
  }

  const handleAddTopic = (e) => {
    if (e) e.preventDefault()
    const sanitized = newTopic.trim()
    
    // Validação Anti-Cheat: 2 palavras ou 10 caracteres, sem caracteres repetidos 5+ vezes
    const topicRegex = /^(?=(?:.*\s.*){1,}|.{10,})(?!.*(.)\1{4,}).*$/
    
    if (!topicRegex.test(sanitized)) {
      toast.error("Tópico inválido!", {
        description: "Use pelo menos 10 caracteres ou 2 palavras. Evite repetições.",
        style: {
          background: '#000000',
          color: '#FFFFFF',
          border: '1px solid #7c3aed',
        },
        duration: 4000
      })
      return
    }

    if (sanitized && !topics.includes(sanitized)) {
      setTopics(prev => [...prev, sanitized])
      setNewTopic('')
    }
  }

  const removeTopic = (topicToRemove) => {
    setTopics(topics.filter(t => t !== topicToRemove))
  }

  const handleToggleTimer = () => {
    setIsRunning(!isRunning)
  }

  // Função Temporária para Modo de Teste
  const handleSkipTime = () => {
    if (process.env.NODE_ENV === 'development' || true) { // Mantendo true para você testar
      setSecondsRemaining(5)
    }
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  // Garantir que o nome da matéria seja uma string para exibição
  const displaySubjectName = typeof selectedSubject === 'object' ? selectedSubject.nome : selectedSubject;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        borderColor: isRunning ? 'rgba(138, 43, 226, 0.4)' : 'rgba(255, 255, 255, 0.1)',
        boxShadow: isRunning ? '0 0 30px rgba(138, 43, 226, 0.1)' : '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}
      className="bg-[#1a1a2e] border rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden transition-all duration-700"
    >
      {/* Efeitos de Fundo Neon */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#8a2be2]/10 blur-[100px] rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[100px] rounded-full" />

      <div className="relative z-10">
        <div className="flex flex-col items-center mb-6">
          <h3 className="text-xl font-bold text-white mb-1">{displaySubjectName}</h3>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 w-full max-w-xs mx-auto">
            <button
              onClick={() => {
                if (isRunning) return
                setMode('work')
                setSecondsRemaining(workMinutes * 60)
              }}
              disabled={isRunning}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                mode === 'work' ? 'bg-[#8a2be2] text-white shadow-lg shadow-[#8a2be2]/20' : 'text-white/50 hover:text-white disabled:opacity-30'
              }`}
            >
              Foco (25m)
            </button>
            <button
              onClick={() => {
                if (isRunning) return
                setMode('break')
                setSecondsRemaining(breakMinutes * 60)
              }}
              disabled={isRunning}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                mode === 'break' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-white/50 hover:text-white disabled:opacity-30'
              }`}
            >
              Pausa (5m)
            </button>
          </div>
        </div>

        {/* Seletor de Ciclos (Preset Anti-Cheat) */}
        <div className="flex flex-col items-center mb-10">
          <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-3 font-bold">Meta de Sessão</span>
          <div className="flex gap-3">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => {
                  if (isRunning) return
                  setCycles(num)
                  setCurrentCycle(1)
                  setMode('work')
                  setSecondsRemaining(workMinutes * 60)
                }}
                disabled={isRunning}
                className={`w-14 h-14 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                  cycles === num 
                    ? 'border-[#8a2be2] bg-[#8a2be2] text-white shadow-lg shadow-[#8a2be2]/20' 
                    : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 disabled:opacity-30'
                }`}
              >
                <span className="text-lg font-black">{num}</span>
                <span className="text-[9px] uppercase font-bold tracking-tighter">ciclo{num > 1 ? 's' : ''}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Topics Management (Glassmorphism) - Esconde quando o timer está rodando para "Limpeza de Tela" */}
        <AnimatePresence>
          {!isRunning && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-10 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white/70 uppercase tracking-widest">Tópicos da Sessão</h4>
                <span className="text-[10px] bg-[#8a2be2]/20 text-[#a855f7] px-2 py-0.5 rounded-full border border-[#8a2be2]/30">AO VIVO</span>
              </div>
              
              <form onSubmit={handleAddTopic} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Adicionar tópico agora..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-[#8a2be2]/50 outline-none transition-all"
                />
                <button
                  type="submit"
                  className="p-2 bg-[#8a2be2]/20 text-[#a855f7] border border-[#8a2be2]/30 rounded-xl hover:bg-[#8a2be2]/30 transition-all"
                >
                  <FaPlus size={14} />
                </button>
              </form>
    
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                  {topics.map((topic) => (
                    <motion.span
                      key={topic}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-white/70 rounded-lg text-xs font-medium group hover:border-[#8a2be2]/30 hover:text-[#a855f7] transition-all"
                    >
                      {topic}
                      <button onClick={() => removeTopic(topic)} className="hover:text-red-400 transition-colors">
                        <HiXMark size={14} />
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>
                {topics.length === 0 && <p className="text-white/20 text-xs italic">Nenhum tópico definido...</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timer Display */}
        <div className="text-center mb-10">
          <div className="flex flex-col items-center mb-4">
            <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black mb-1">
              {mode === 'work' ? `CICLO ${currentCycle} DE ${cycles}` : 'TEMPO DE DESCANSO'}
            </span>
            <div className="text-8xl font-bold text-white font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              {formatTime(secondsRemaining)}
            </div>
          </div>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${
            mode === 'work' ? 'bg-[#8a2be2]/20 text-[#a855f7]' : 'bg-blue-500/20 text-blue-400'
          }`}>
            {mode === 'work' ? '📚 Foco Total' : '☕ Descanso'}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleToggleTimer}
            className={`flex items-center gap-3 px-12 py-4 rounded-full font-black text-xl tracking-wider transition-all active:scale-95 ${
              isRunning 
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/10' 
                : 'bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white shadow-lg shadow-blue-500/10'
            }`}
          >
            {isRunning ? <FaPause /> : <FaPlay />}
            {isRunning ? 'PAUSAR' : 'INICIAR'}
          </button>

          {/* Botão de Teste (Remover em Produção) */}
          {isRunning && (
            <button 
              onClick={handleSkipTime}
              className="text-[10px] text-white/20 hover:text-white/40 uppercase tracking-widest font-bold transition-colors"
            >
              Pular para 5s (Teste)
            </button>
          )}
        </div>

        {/* Modal de Resumo (Exigência Anti-Cheat) */}
        <AnimatePresence>
          {showSummaryModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl p-8 flex flex-col justify-center"
            >
              <div className="max-w-md mx-auto w-full space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Prova de Estudo 📝</h3>
                  <p className="text-white/50 text-sm">Para validar seu XP, descreva o que você aprendeu nesta sessão.</p>
                </div>

                <div className="space-y-2">
                  <textarea
                    value={summaryText}
                    onChange={(e) => setSummaryText(e.target.value)}
                    placeholder="Resumo do seu aprendizado (mínimo 100 caracteres)..."
                    className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:border-[#8a2be2]/50 outline-none transition-all resize-none"
                  />
                  <div className="flex justify-between items-center px-1">
                    <span className={`text-xs font-bold ${summaryText.length >= 100 ? 'text-green-400' : 'text-amber-400'}`}>
                      {summaryText.length} / 100 caracteres
                    </span>
                    {summaryText.length < 100 && (
                      <span className="text-[10px] text-white/30 uppercase tracking-tighter">Escreva mais um pouco...</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleConfirmSummary}
                  disabled={summaryText.length < 100 || isFinishing}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                    summaryText.length >= 100 && !isFinishing
                      ? 'bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white shadow-lg shadow-blue-500/20'
                      : 'bg-white/5 text-white/20 cursor-not-allowed'
                  }`}
                >
                  {isFinishing ? 'VALIDANDO...' : 'CONFIRMAR E GANHAR XP'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Modal de Recompensa (XP Reward) */}
        <AnimatePresence>
          {showRewardModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] bg-[#0a0a0f]/98 backdrop-blur-2xl p-8 flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Brilho de Fundo Dourado/Roxo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-amber-500/20 to-purple-600/20 blur-[120px] rounded-full animate-pulse" />
              
              {/* Partículas de XP Voando para o Perfil */}
              {showXpParticles && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        x: '50vw', 
                        y: '50vh', 
                        opacity: 1, 
                        scale: 1 
                      }}
                      animate={{ 
                        x: '90vw', 
                        y: '20px', 
                        opacity: 0, 
                        scale: 0.5 
                      }}
                      transition={{ 
                        duration: 1.2, 
                        delay: i * 0.1,
                        ease: "easeIn"
                      }}
                      className="absolute w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-[10px] font-black text-amber-900 shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                    >
                      +{Math.round(xpGained / 8)}
                    </motion.div>
                  ))}
                </div>
              )}
              
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="relative z-10 w-full max-w-sm text-center space-y-8"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ rotate: -10, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.4)] border border-amber-300/30"
                  >
                    <FaTrophy className="text-white text-4xl" />
                  </motion.div>
                  <h2 className="text-3xl font-black text-white tracking-tight">Sessão Concluída!</h2>
                  <p className="text-white/50 font-medium">Você está cada vez mais perto do seu objetivo.</p>
                </div>

                {/* Contador de XP */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <motion.div
                      initial={{ y: 0, opacity: 1 }}
                      animate={showRewardModal ? { 
                        y: [0, -40, -100], 
                        opacity: [1, 1, 0],
                        scale: [1, 1.2, 0.8]
                      } : {}}
                      transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                    >
                      <div className="flex items-center gap-2 bg-amber-500 text-white px-3 py-1 rounded-full shadow-lg shadow-amber-500/40">
                        <FaArrowUp className="text-[10px]" />
                        <span className="text-sm font-black">+{xpGained}</span>
                      </div>
                    </motion.div>

                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200"
                    >
                      +{displayXp} XP
                    </motion.span>
                    <div className="text-[10px] text-amber-500/60 uppercase tracking-[0.3em] font-bold mt-2">Recompensa Total</div>
                  </div>
                </div>

                {/* Barra de Progresso Estilizada */}
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-widest px-1">
                    <span>Nível Atual</span>
                    <span className="text-amber-500">Próximo Nível</span>
                  </div>
                  <div className="h-4 bg-white/5 border border-white/10 rounded-full overflow-hidden p-1 relative">
                    <motion.div 
                      initial={{ width: "30%" }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-purple-500 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.5)] relative"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_2s_infinite]" />
                    </motion.div>
                  </div>
                </div>

                {/* Ações Post-Study */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button
                    onClick={() => navigate('/dashboard/estatisticas')}
                    className="flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold text-sm transition-all"
                  >
                    <FaChartBar className="text-brand-400" />
                    Estatísticas
                  </button>
                  <button
                    onClick={() => navigate('/dashboard/competicao')}
                    className="flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold text-sm transition-all"
                  >
                    <FaUsers className="text-blue-400" />
                    Ranking
                  </button>
                  <button
                    onClick={() => {
                      if (onReset) {
                        onReset()
                      } else {
                        setShowRewardModal(false)
                        setMode('break')
                        setSecondsRemaining(breakMinutes * 60)
                        setIsRunning(false)
                        setSummaryText('')
                      }
                    }}
                    className="col-span-2 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black rounded-2xl shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                  >
                    CONTINUAR JORNADA
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
