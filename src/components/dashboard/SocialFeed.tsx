import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaClock, FaTrophy, FaBook, FaFire, FaJava, FaReact, FaJsSquare, FaPython, FaDatabase, FaTerminal, FaCode } from 'react-icons/fa'
import { Heart, MessageCircle, Share2, Sparkles } from 'lucide-react'
// TODO: Conectar com novo backend para obter feed e posts reais
// import axios from 'axios'

const subjectConfig = {
  'Java': { icon: FaJava, color: 'text-orange-500' },
  'React': { icon: FaReact, color: 'text-blue-400' },
  'JavaScript': { icon: FaJsSquare, color: 'text-yellow-400' },
  'Python': { icon: FaPython, color: 'text-blue-500' },
  'SQL': { icon: FaDatabase, color: 'text-green-400' },
  'Terminal': { icon: FaTerminal, color: 'text-purple-400' },
  'default': { icon: FaCode, color: 'text-brand-400' }
}

export default function SocialFeed({ user, onStartNewStudy }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState({})

  // TODO: Implementar chamada ao novo backend para obter feed
  // Mock data - remover quando backend estiver pronto
  const mockPosts = [
    {
      id: 1,
      user: { name: 'João Silva', avatar: '👨‍💻' },
      subject: 'JavaScript',
      duration: 45,
      xp: 120,
      topics: ['ES6', 'Async', 'Promises'],
      summary: 'Estudei conceitos avançados de JavaScript, especialmente promises e async/await. Muito produtivo!',
      createdAt: new Date(Date.now() - 600000),
      likes: 8,
      comments: [
        { user: 'Maria', text: 'Parabéns! Esses conceitos são importantes mesmo.' },
        { user: 'Pedro', text: 'Legal demais!' }
      ],
      isLiked: false,
      showComments: false,
      isLiking: false
    },
    {
      id: 2,
      user: { name: 'Maria Santos', avatar: '👩‍💻' },
      subject: 'React',
      duration: 60,
      xp: 150,
      topics: ['Hooks', 'State', 'Context'],
      summary: 'Aprendendo sobre React Hooks. Agora consigo gerenciar estado de forma muito mais elegante!',
      createdAt: new Date(Date.now() - 1800000),
      likes: 12,
      comments: [
        { user: 'João', text: 'Hooks mudaram minha vida de dev!' }
      ],
      isLiked: false,
      showComments: false,
      isLiking: false
    },
    {
      id: 3,
      user: { name: 'Pedro Costa', avatar: '👨‍🎓' },
      subject: 'Python',
      duration: 30,
      xp: 80,
      topics: ['OOP', 'Classes', 'Herança'],
      summary: 'Estudei programação orientada a objetos em Python. Finalmente entendi herança múltipla!',
      createdAt: new Date(Date.now() - 3600000),
      likes: 5,
      comments: [],
      isLiked: false,
      showComments: false,
      isLiking: false
    }
  ]

  useEffect(() => {
    // TODO: Remover este bloco mock quando backend estiver pronto
    // Simular carregamento
    const timer = setTimeout(() => {
      setPosts(mockPosts)
      setLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [user])

  const handleLike = async (postId) => {
    try {
      // Otimistic UI - atualizar localmente primeiro
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiking: true
            }
          : post
      ))

      // TODO: Implementar chamada ao novo backend para curtir
      // Remover este setTimeout quando backend estiver pronto
      setTimeout(() => {
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, isLiking: false }
            : post
        ))
      }, 300)
    } catch (error) {
      console.error("Erro ao curtir:", error)
      // Revert em caso de erro
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiking: false
            }
          : post
      ))
    }
  }

  const toggleComments = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, showComments: !post.showComments } : post
    ))
  }

  const handleAddComment = async (postId) => {
    const text = commentText[postId]
    if (!text?.trim()) return

    try {
      // TODO: Implementar chamada ao novo backend para adicionar comentário
      // Mock - apenas atualizar localmente
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, { user: user?.name || 'Você', text }],
          }
        }
        return post
      }))
      setCommentText(prev => ({ ...prev, [postId]: '' }))
    } catch (error) {
      console.error("Erro ao comentar:", error)
    }
  }

  const getSubjectIcon = (nome) => {
    const config = subjectConfig[nome] || subjectConfig['default']
    return <config.icon className={`text-2xl ${config.color}`} />
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Botão de Destaque "Iniciar Novo Estudo" (Estilo Lyfta) */}
      <motion.button
        onClick={onStartNewStudy}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-[#8a2be2] to-[#2575fc] p-[2px] rounded-3xl shadow-xl shadow-purple-500/20 group"
      >
        <div className="bg-[#0a0a0f] rounded-[22px] p-6 flex items-center justify-between group-hover:bg-transparent transition-colors duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
              <FaPlus size={20} />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-black text-white tracking-tight">Iniciar Novo Estudo</h3>
              <p className="text-white/50 text-sm">Pronto para bater sua meta de hoje?</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/30 group-hover:text-white transition-colors">
            <FaClock size={18} />
          </div>
        </div>
      </motion.button>

      {/* Feed Centralizado */}
      <div className="space-y-6">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6 animate-pulse h-64" />
          ))
        ) : posts.length > 0 ? (
          posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-black border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-600/50 transition-all duration-300 group shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
            >
              {/* Header do Post */}
              <div className="p-6 flex items-center justify-between border-b border-zinc-800/50">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-bold text-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    {post.user.name.charAt(0).toUpperCase()}
                  </motion.div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{post.user.name}</h4>
                    <p className="text-zinc-400 text-xs">
                      {new Date(post.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="bg-purple-900/30 px-3 py-1.5 rounded-full border border-purple-500/30 flex items-center gap-2 group-hover:border-purple-500/60 transition-colors">
                  {getSubjectIcon(post.subject)}
                  <span className="text-purple-400 text-xs font-semibold">{post.subject}</span>
                </div>
              </div>

              {/* Conteúdo do Post */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-6">
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-500 uppercase font-semibold tracking-wide">Tempo</span>
                      <span className="text-2xl font-bold text-white">{post.duration}min</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-500 uppercase font-semibold tracking-wide">XP</span>
                      <span className="text-2xl font-bold text-purple-400">+{post.xp}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/30">
                    <FaFire className="text-orange-400 text-sm" />
                    <span className="text-xs font-bold text-white">COMPLETO</span>
                  </div>
                </div>

                {post.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.topics.map((topic, tIdx) => (
                      <motion.span 
                        key={tIdx}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-zinc-900/50 border border-zinc-700/50 rounded-full text-xs text-zinc-300 font-medium hover:border-purple-500/50 transition-colors cursor-default"
                      >
                        #{topic}
                      </motion.span>
                    ))}
                  </div>
                )}

                {post.summary && (
                  <p className="text-zinc-400 text-sm leading-relaxed italic border-l-2 border-purple-600/50 pl-3">
                    "{post.summary}"
                  </p>
                )}
              </div>

              {/* Footer do Post (Interações) */}
              <div className="px-6 py-4 bg-zinc-900/30 flex items-center gap-6 border-t border-zinc-800/50">
                {/* Like Button */}
                <motion.button 
                  onClick={() => handleLike(post.id)}
                  whileTap={{ scale: 1.2 }}
                  disabled={post.isLiking}
                  className={`flex items-center gap-2 transition-all duration-300 ${
                    post.isLiked 
                      ? 'text-purple-500' 
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  <motion.div
                    animate={post.isLiked ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart 
                      size={20}
                      className={post.isLiked ? 'fill-purple-500' : ''}
                    />
                  </motion.div>
                  <span className="text-sm font-semibold">{post.likes}</span>
                </motion.button>

                {/* Comment Button */}
                <motion.button 
                  onClick={() => toggleComments(post.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 transition-all duration-300 ${
                    post.showComments 
                      ? 'text-purple-500' 
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  <MessageCircle size={20} />
                  <span className="text-sm font-semibold">{post.comments.length}</span>
                </motion.button>

                {/* Share Button */}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all duration-300 ml-auto"
                >
                  <Share2 size={20} />
                </motion.button>
              </div>

              {/* Seção de Comentários */}
              <AnimatePresence>
                {post.showComments && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-zinc-900/20 border-t border-zinc-800/50"
                  >
                    <div className="p-6 space-y-4">
                      {post.comments.length > 0 ? (
                        post.comments.map((comment, cIdx) => (
                          <div key={cIdx} className="flex gap-3">
                            <div className="w-9 h-9 rounded-full bg-purple-600/20 flex items-center justify-center text-xs font-bold text-purple-400 shrink-0 border border-purple-500/30">
                              {comment.user.charAt(0).toUpperCase()}
                            </div>
                            <div className="bg-zinc-900/50 rounded-xl px-4 py-2 flex-1 border border-zinc-800/50">
                              <p className="text-white font-semibold text-xs mb-1">{comment.user}</p>
                              <p className="text-zinc-300 text-sm">{comment.text}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-zinc-400 text-sm text-center py-4 italic">Nenhum comentário ainda. Seja o primeiro!</p>
                      )}

                      <div className="flex gap-3 pt-4 border-t border-zinc-800/50">
                        <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                          {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            placeholder="Deixe um comentário..."
                            value={commentText[post.id] || ''}
                            onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                            className="flex-1 bg-zinc-900/50 border border-zinc-700/50 rounded-lg px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-600/50 transition-colors"
                          />
                          <motion.button
                            onClick={() => handleAddComment(post.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 rounded-lg text-xs font-bold transition-colors border border-purple-500/30"
                          >
                            Enviar
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-800">
            <FaTrophy className="text-zinc-700 text-5xl mx-auto mb-4" />
            <h3 className="text-white font-bold">Nenhuma atividade recente</h3>
            <p className="text-zinc-400 text-sm">Seja o primeiro a compartilhar seu progresso!</p>
          </div>
        )}
      </div>
    </div>
  )
}
