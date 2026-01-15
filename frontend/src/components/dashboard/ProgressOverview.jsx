import { LuTrendingUp, LuFlame, LuClock, LuCalendar } from 'react-icons/lu'

export default function ProgressOverview({ studyMinutesToday, weeklyStreak, totalSessions, totalHours }) {
  const freeDailyLimit = 60
  const progressPercent = Math.min(100, Math.round((100 * studyMinutesToday) / freeDailyLimit))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Today's Progress */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-white/70">Hoje</h3>
          <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
            <LuClock size={16} className="text-brand-300" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white mb-2">{studyMinutesToday}m</p>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-white/50 text-xs mt-2">{progressPercent}% da meta</p>
      </div>

      {/* Weekly Streak */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-white/70">Sequência</h3>
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <LuFlame size={16} className="text-orange-400" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white mb-2">{weeklyStreak}</p>
        <p className="text-white/50 text-xs">dias consecutivos</p>
      </div>

      {/* Total Sessions */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-white/70">Sessões</h3>
          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
            <LuTrendingUp size={16} className="text-green-400" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white mb-2">{totalSessions}</p>
        <p className="text-white/50 text-xs">estudos concluídos</p>
      </div>

      {/* Total Hours */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-white/70">Horas</h3>
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <LuCalendar size={16} className="text-purple-400" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white mb-2">{totalHours}h</p>
        <p className="text-white/50 text-xs">total estudado</p>
      </div>
    </div>
  )
}
