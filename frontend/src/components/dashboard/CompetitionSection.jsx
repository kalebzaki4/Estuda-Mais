import { LuMedal, LuTrendingUp } from 'react-icons/lu'

export default function CompetitionSection({ points }) {
  const leaderboard = [
    { rank: 1, name: 'Pedro Silva', points: 4850, avatar: '👤', isYou: false },
    { rank: 2, name: 'Marina Costa', points: 4320, avatar: '👤', isYou: false },
    { rank: 3, name: 'João Santos', points: 3890, avatar: '👤', isYou: false },
    { rank: 4, name: 'Você', points: points, avatar: '⭐', isYou: true },
    { rank: 5, name: 'Ana Oliveira', points: 3210, avatar: '👤', isYou: false },
    { rank: 6, name: 'Lucas Ferreira', points: 2890, avatar: '👤', isYou: false },
  ]

  const friendsProgress = [
    { name: 'Pedro Silva', studyToday: '3h 45m', streak: 23, points: 4850 },
    { name: 'Marina Costa', studyToday: '2h 30m', streak: 18, points: 4320 },
    { name: 'João Santos', studyToday: '1h 20m', streak: 12, points: 3890 },
  ]

  const recentActivity = [
    { user: 'Pedro Silva', action: 'estudou 3h de Java', time: 'há 2 horas', icon: '📚' },
    { user: 'Marina Costa', action: 'completou React Avançado', time: 'há 5 horas', icon: '✅' },
    { user: 'João Santos', action: 'ganhou 150 pontos', time: 'há 1 dia', icon: '🏆' },
    { user: 'Ana Oliveira', action: 'iniciou novo roadmap', time: 'há 1 dia', icon: '🚀' },
  ]

  return (
    <div className="space-y-6">
      {/* Ranking */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">🏆 Ranking Semanal</h3>
          <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
            <LuMedal size={16} className="text-yellow-400" />
          </div>
        </div>
        <div className="space-y-3">
          {leaderboard.map((user) => {
            const positionChange = Math.random() > 0.5 ? 'up' : 'down'
            return (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                  user.isYou
                    ? 'bg-brand-500/20 border border-brand-300/50'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-white w-6">#{user.rank}</span>
                  <span className="text-2xl">{user.avatar}</span>
                  <div>
                    <p className={`font-medium ${user.isYou ? 'text-brand-300' : 'text-white'}`}>
                      {user.name}
                    </p>
                    {user.isYou && <p className="text-white/50 text-xs">Sua posição</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">{user.points}</span>
                  {positionChange === 'up' && (
                    <LuTrendingUp size={16} className="text-green-400" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Friends Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Friends Activity */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">👥 Progresso dos Amigos</h3>
          <div className="space-y-3">
            {friendsProgress.map((friend, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div>
                  <p className="text-white font-medium">{friend.name}</p>
                  <p className="text-white/50 text-xs">Estudou {friend.studyToday}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-orange-400">🔥</span>
                    <span className="text-white text-sm">{friend.streak}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">📡 Feed de Atividades</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-xl">{activity.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-white/50 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Friends CTA */}
      <div className="bg-gradient-to-r from-brand-500/10 to-purple-500/10 border border-brand-300/30 rounded-2xl p-6 text-center">
        <p className="text-white/70 mb-4">Convide amigos para competir e estudar juntos</p>
        <button className="px-6 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium">
          Adicionar Amigos
        </button>
      </div>
    </div>
  )
}
