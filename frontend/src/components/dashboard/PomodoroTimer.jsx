import { useState, useEffect, useRef } from 'react'
import { FaClock, FaBook, FaPlay, FaPause, FaRedo } from 'react-icons/fa'
import { motion } from 'framer-motion'
import studyService from '../../services/studyService.js'

export default function PomodoroTimer({ 
  user, 
  onSessionComplete,
  initialSubject = 'Estudo Geral'
}) {
  const [mode, setMode] = useState('work')
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [secondsRemaining, setSecondsRemaining] = useState(workMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(initialSubject)
  const timerRef = useRef(null)

  useEffect(() => {
    setSecondsRemaining((mode === 'work' ? workMinutes : breakMinutes) * 60)
  }, [mode, workMinutes, breakMinutes])

  useEffect(() => {
    if (!isRunning) return
    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          const finishedAt = new Date().toISOString()
          const currentMode = mode
          const currentWorkMinutes = workMinutes
          const currentSessionIdToFinish = currentSessionId

          // Finalizar sessão no backend se for modo de trabalho
          if (currentMode === 'work' && currentSessionIdToFinish) {
            studyService.finalizarSessao(currentSessionIdToFinish, currentWorkMinutes)
              .then(res => {
                if (res.success) {
                  console.log('Sessão finalizada no backend com sucesso')
                } else {
                  console.error('Erro ao finalizar sessão no backend:', res.error)
                }
              })
            setCurrentSessionId(null)
          }

          // Notificar conclusão para atualização de estados globais/estatísticas
          if (onSessionComplete) {
            onSessionComplete({
              type: currentMode,
              minutes: currentMode === 'work' ? currentWorkMinutes : breakMinutes,
              finishedAt
            })
          }

          const nextMode = currentMode === 'work' ? 'break' : 'work'
          setMode(nextMode)
          return (nextMode === 'work' ? currentWorkMinutes : breakMinutes) * 60
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [isRunning, mode, workMinutes, breakMinutes, currentSessionId, onSessionComplete])

  const handleToggleTimer = async () => {
    if (!isRunning && mode === 'work' && !currentSessionId) {
      // Iniciar nova sessão no backend
      const resPrep = await studyService.prepararSessao(selectedSubject, user?.id || 1)
      if (resPrep.success) {
        const sessionId = resPrep.data.id
        const resInit = await studyService.iniciarSessao(sessionId, workMinutes)
        if (resInit.success) {
          setCurrentSessionId(sessionId)
        }
      }
    }
    setIsRunning(!isRunning)
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm"
    >
      <div className="flex items-center justify-center gap-2 mb-8">
        <FaClock className="text-brand-300" size={24} />
        <h2 className="text-2xl font-semibold text-white">Pomodoro</h2>
      </div>

      {/* Timer Display */}
      <div className="text-center mb-10">
        <div className="text-8xl font-bold text-brand-300 font-mono mb-4 tracking-tighter">
          {formatTime(secondsRemaining)}
        </div>
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${
          mode === 'work' ? 'bg-brand-500/20 text-brand-300' : 'bg-green-500/20 text-green-400'
        }`}>
          {mode === 'work' ? '📚 Foco Total' : '☕ Descanso'}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 justify-center mb-10">
        <button
          onClick={handleToggleTimer}
          className={`flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 ${
            isRunning 
              ? 'bg-amber-500 hover:bg-amber-600 text-white' 
              : 'bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25'
          }`}
        >
          {isRunning ? <FaPause /> : <FaPlay />}
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button
          onClick={() => {
            setIsRunning(false)
            setMode('work')
            setSecondsRemaining(workMinutes * 60)
            setCurrentSessionId(null)
          }}
          className="flex items-center gap-2 px-8 py-4 border border-white/10 text-white/70 rounded-xl hover:bg-white/5 hover:text-white transition-all font-medium"
        >
          <FaRedo />
          Resetar
        </button>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
        <div>
          <label className="block text-white/50 text-xs uppercase tracking-wider font-bold mb-3">Matéria</label>
          <div className="relative">
            <FaBook className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
            <input
              type="text"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              placeholder="Ex: Matemática"
              disabled={isRunning}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:border-brand-300 focus:bg-white/10 outline-none transition-all disabled:opacity-50"
            />
          </div>
        </div>
        <div>
          <label className="block text-white/50 text-xs uppercase tracking-wider font-bold mb-3">Estudo (min)</label>
          <input
            type="number"
            value={workMinutes}
            onChange={(e) => setWorkMinutes(Number(e.target.value))}
            min="1"
            disabled={isRunning}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-300 focus:bg-white/10 outline-none transition-all disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-white/50 text-xs uppercase tracking-wider font-bold mb-3">Pausa (min)</label>
          <input
            type="number"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(Number(e.target.value))}
            min="1"
            disabled={isRunning}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-300 focus:bg-white/10 outline-none transition-all disabled:opacity-50"
          />
        </div>
      </div>
    </motion.div>
  )
}
