import { LuCheck, LuArrowRight } from 'react-icons/lu'

export default function RoadmapsSection() {
  const roadmaps = [
    {
      id: 1,
      title: 'Frontend Developer',
      icon: '🎨',
      progress: 65,
      topics: 24,
      completed: 16,
      recommended: true,
      status: 'em andamento',
    },
    {
      id: 2,
      title: 'Backend com Node.js',
      icon: '⚙️',
      progress: 45,
      topics: 20,
      completed: 9,
      recommended: false,
      status: 'em andamento',
    },
    {
      id: 3,
      title: 'Mobile Flutter',
      icon: '📱',
      progress: 20,
      topics: 18,
      completed: 4,
      recommended: false,
      status: 'não iniciado',
    },
    {
      id: 4,
      title: 'ENEM 2025',
      icon: '📚',
      progress: 80,
      topics: 30,
      completed: 24,
      recommended: true,
      status: 'em andamento',
    },
    {
      id: 5,
      title: 'Python Data Science',
      icon: '📊',
      progress: 0,
      topics: 22,
      completed: 0,
      recommended: false,
      status: 'não iniciado',
    },
    {
      id: 6,
      title: 'DevOps & Cloud',
      icon: '☁️',
      progress: 35,
      topics: 19,
      completed: 7,
      recommended: false,
      status: 'em andamento',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Recommended Roadmaps */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">⭐ Recomendado Para Você</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {roadmaps
            .filter((rm) => rm.recommended)
            .map((roadmap) => (
              <button
                key={roadmap.id}
                className="bg-gradient-to-br from-brand-500/20 to-purple-500/20 border border-brand-300/30 rounded-2xl p-6 hover:from-brand-500/30 hover:to-purple-500/30 hover:border-brand-300/50 transition-all group text-left"
              >
                <div className="flex items-start justify-between mb-4">
                  <p className="text-4xl">{roadmap.icon}</p>
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full font-medium">
                    Recomendado
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-300 transition-colors">
                  {roadmap.title}
                </h4>
                <p className="text-white/70 text-sm mb-4">
                  {roadmap.completed} de {roadmap.topics} tópicos concluídos
                </p>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70 text-sm">Progresso</span>
                    <span className="text-white text-sm font-semibold">{roadmap.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${roadmap.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">{roadmap.status}</span>
                  <LuArrowRight size={18} className="text-brand-300 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
        </div>
      </div>

      {/* All Roadmaps */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Todos os Roadmaps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roadmaps
            .filter((rm) => !rm.recommended)
            .map((roadmap) => (
              <button
                key={roadmap.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-brand-300/50 transition-all group text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="text-2xl">{roadmap.icon}</p>
                  <span className="text-white/50 text-xs">{roadmap.progress}%</span>
                </div>
                <h4 className="text-white font-semibold text-sm mb-2 group-hover:text-brand-300 transition-colors">
                  {roadmap.title}
                </h4>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${roadmap.progress}%` }}
                  />
                </div>
                <p className="text-white/50 text-xs">
                  {roadmap.completed}/{roadmap.topics}
                </p>
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}
