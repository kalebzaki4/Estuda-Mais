import { LuBadge, LuStar, LuTarget } from 'react-icons/lu'

export default function AchievementsSection({ points, weeklyStreak }) {
  const achievements = [
    {
      id: 1,
      name: 'Primeiro Passo',
      description: 'Complete sua primeira sessão de estudo',
      icon: '🎯',
      earned: true,
      progress: 100,
    },
    {
      id: 2,
      name: 'Sequência Semanal',
      description: 'Estude 7 dias seguidos',
      icon: '🔥',
      earned: weeklyStreak >= 7,
      progress: Math.round((weeklyStreak / 7) * 100),
    },
    {
      id: 3,
      name: 'Estudante Dedicado',
      description: 'Estude 100 horas no total',
      icon: '📚',
      earned: false,
      progress: 65,
    },
    {
      id: 4,
      name: 'Conquistador de Pontos',
      description: 'Ganhe 1000 pontos',
      icon: '🏆',
      earned: points >= 1000,
      progress: Math.round((points / 1000) * 100),
    },
    {
      id: 5,
      name: 'Pomodoro Master',
      description: 'Complete 50 sessões Pomodoro',
      icon: '⏱️',
      earned: false,
      progress: 40,
    },
    {
      id: 6,
      name: 'Roadmap Completo',
      description: 'Conclua um roadmap inteiro',
      icon: '🎓',
      earned: false,
      progress: 0,
    },
  ]

  const userLevel = Math.floor(points / 500) + 1
  const levelProgress = ((points % 500) / 500) * 100

  return (
    <div className="space-y-6">
      {/* User Level */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-300/30 rounded-2xl p-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LuStar size={32} className="text-yellow-400" />
            <span className="text-5xl font-bold text-white">Level {userLevel}</span>
            <LuStar size={32} className="text-yellow-400" />
          </div>
          <p className="text-white/70 mb-6">Você está no caminho certo! Continue estudando para subir de nível.</p>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Progresso para próximo nível</span>
              <span className="text-white text-sm font-semibold">{Math.round(levelProgress)}%</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <LuBadge size={24} className="text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Conquistas Desbloqueadas</h3>
        </div>
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
                <div
                  className={`h-full transition-all duration-500 ${
                    achievement.earned
                      ? 'bg-gradient-to-r from-brand-500 to-purple-500'
                      : 'bg-white/20'
                  }`}
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
              <p className="text-white/50 text-xs mt-2">{achievement.progress}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Daily & Weekly Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <span className="text-white/50 text-sm">45 min / 60 min</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '75%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Completar 1 sessão Pomodoro</span>
                <span className="text-white/50 text-sm">0 / 1</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '0%' }} />
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
                <span className="text-white/50 text-sm">6.5 h / 10 h</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '65%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Manter sequência 7 dias</span>
                <span className="text-white/50 text-sm">{weeklyStreak} / 7</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                  style={{ width: `${(weeklyStreak / 7) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
