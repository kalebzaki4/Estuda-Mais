import { LuTrendingUp, LuBook, LuCheck } from 'react-icons/lu'

export default function StudyStatistics({ pomodoroHistory }) {
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

  const subjectStats = [
    { name: 'JavaScript', completed: 8, total: 12, color: 'from-yellow-500 to-orange-500' },
    { name: 'React', completed: 6, total: 10, color: 'from-blue-500 to-cyan-500' },
    { name: 'Python', completed: 10, total: 10, color: 'from-green-500 to-emerald-500' },
    { name: 'Banco de Dados', completed: 4, total: 8, color: 'from-purple-500 to-pink-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Stats */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Esta Semana</h3>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <LuTrendingUp size={16} className="text-blue-400" />
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
        </div>

        {/* Completion Stats */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Conclusões</h3>
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <LuCheck size={16} className="text-green-400" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Aulas Completadas</span>
              <span className="text-2xl font-bold text-white">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Faltando Completar</span>
              <span className="text-2xl font-bold text-white/50">12</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Progresso por Matéria</h3>
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <LuBook size={16} className="text-purple-400" />
          </div>
        </div>
        <div className="space-y-5">
          {subjectStats.map((subject, idx) => {
            const percentage = Math.round((subject.completed / subject.total) * 100)
            return (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">{subject.name}</span>
                  <span className="text-white/50 text-xs">{subject.completed}/{subject.total}</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${subject.color} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-white/50 text-xs mt-1">{percentage}% concluído</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
