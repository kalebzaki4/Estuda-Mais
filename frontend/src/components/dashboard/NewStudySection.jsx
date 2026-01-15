import { LuPlus, LuSearch, LuLightbulb } from 'react-icons/lu'
import { useState } from 'react'

export default function NewStudySection() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const suggestedTopics = [
    { icon: '🚀', title: 'Frontend Avançado', description: 'React, Vue, Angular' },
    { icon: '🔧', title: 'DevOps & Cloud', description: 'Docker, Kubernetes, AWS' },
    { icon: '📊', title: 'Data Science', description: 'Python, Machine Learning' },
    { icon: '🎮', title: 'Game Development', description: 'Unity, Godot' },
    { icon: '🔐', title: 'Segurança', description: 'Criptografia, Pentest' },
    { icon: '📱', title: 'Mobile', description: 'Flutter, React Native' },
  ]

  const recentStudies = [
    { id: 1, title: 'React Hooks Avançado', time: 'há 2 horas', subject: 'React' },
    { id: 2, title: 'Algoritmos em JavaScript', time: 'há 1 dia', subject: 'JavaScript' },
    { id: 3, title: 'SQL Performance', time: 'há 3 dias', subject: 'Banco de Dados' },
  ]

  return (
    <div className="space-y-6">
      {/* Create New Study */}
      <div className="bg-gradient-to-r from-brand-500/20 to-purple-500/20 border border-brand-500/30 rounded-2xl p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Comece um Novo Estudo</h3>
            <p className="text-white/70">Escolha um tópico e comece a aprender agora</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center">
            <LuPlus size={20} className="text-white" />
          </div>
        </div>
        <input
          type="text"
          placeholder="Buscar ou criar novo estudo..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-brand-300 focus:bg-white/15"
        />
      </div>

      {/* Suggested Topics */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <LuLightbulb size={20} className="text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">Sugestões Inteligentes</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestedTopics.map((topic, idx) => (
            <button
              key={idx}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-brand-300/50 transition-all group"
            >
              <p className="text-3xl mb-2">{topic.icon}</p>
              <h4 className="text-white font-semibold text-sm text-left group-hover:text-brand-300 transition-colors">
                {topic.title}
              </h4>
              <p className="text-white/50 text-xs text-left mt-1">{topic.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Studies */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Estudos Recentes</h3>
        <div className="space-y-3">
          {recentStudies.map((study) => (
            <button
              key={study.id}
              className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-brand-300/50 transition-all group"
            >
              <div className="text-left">
                <p className="text-white font-medium group-hover:text-brand-300 transition-colors">
                  {study.title}
                </p>
                <p className="text-white/50 text-sm">{study.time}</p>
              </div>
              <span className="px-3 py-1 bg-brand-500/20 text-brand-300 text-xs rounded-full">
                {study.subject}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
