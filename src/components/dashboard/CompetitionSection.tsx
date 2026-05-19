import { useState, useEffect } from 'react'
import { FaMedal, FaChartLine } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function CompetitionSection({ 
  user: currentUser,
  points: initialPoints,
}) {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get('http://localhost:8080/usuarios/ranking')
        const data = response.data.map((user, index) => ({
          rank: index + 1,
          name: user.nome,
          points: user.xp || 0,
          avatar: user.avatar || '👤',
          isYou: user.id === currentUser?.id,
          trend: 'up'
        }))
        setLeaderboard(data)
      } catch (error) {
        console.error('Erro ao buscar ranking:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRanking()
  }, [currentUser])

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
      {/* Ranking */}
      <motion.div 
        variants={item}
        className="bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">🏆 Ranking Global</h3>
          <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
            <FaMedal size={16} className="text-yellow-400" />
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-8 text-white/50">
            Carregando ranking...
          </div>
        ) : leaderboard.length > 0 ? (
          <div className="space-y-3">
            {leaderboard.map((user) => (
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
                  <span className="text-white font-semibold">{user.points} XP</span>
                  {user.trend === 'up' && (
                    <FaChartLine size={16} className="text-green-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-white/50">
            Ranking indisponível no momento.
          </div>
        )}
      </motion.div>

      {/* Friends Progress */}
      <motion.div 
        variants={item}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Friends Activity */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">👥 Progresso dos Amigos</h3>
          {friendsProgress.length > 0 ? (
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
          ) : (
            <div className="text-center py-8 text-white/50">
              Nenhum amigo ativo recentemente.
            </div>
          )}
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">📡 Feed de Atividades</h3>
          {recentActivity.length > 0 ? (
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
          ) : (
            <div className="text-center py-8 text-white/50">
              Nenhuma atividade recente.
            </div>
          )}
        </div>
      </motion.div>

      {/* Add Friends CTA */}
      <motion.div 
        variants={item}
        className="bg-gradient-to-r from-brand-500/10 to-purple-500/10 border border-brand-300/30 rounded-2xl p-6 text-center"
      >
        <p className="text-white/70 mb-4">Convide amigos para competir e estudar juntos</p>
        <button className="px-6 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium">
          Adicionar Amigos
        </button>
      </motion.div>
    </motion.div>
  )
}
