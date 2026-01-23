import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaComment, FaShare, FaPlus, FaClock, FaTrophy, FaBook, FaFire } from 'react-icons/fa'
import { FaJava, FaReact, FaJsSquare, FaPython, FaDatabase, FaTerminal, FaCode } from 'react-icons/fa'
import axios from 'axios'

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

  const fetchFeed = async () => {
    try {
      const response = await axios.get('http://localhost:8080/posts')
      const feedPosts = response.data.map(post => ({
        id: post.id,
        user: {
          name: post.usuario?.nome || 'Estudante',
          avatar: post.usuario?.avatar || null
        },
        subject: post.sessao?.materia?.nome || 'Estudo Geral',
        duration: post.sessao?.duracaoRealizada || 0,
        xp: post.sessao?.xpGanhosTotal || 0,
        topics: post.sessao?.topicosEstudados || [],
        summary: post.conteudo || '',
        createdAt: post.dataCriacao,
        likes: post.curtidas || 0,
        comments: post.comentarios?.map(c => ({ user: 'Estudante', text: c })) || [],
        isLiked: false,
        showComments: false
      }))
      setPosts(feedPosts)
    } catch (err) {
      console.error("Erro ao carregar feed:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeed()
  }, [user])

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:8080/posts/${postId}/curtir`)
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1, isLiked: true }
          : post
      ))
    } catch (error) {
      console.error("Erro ao curtir:", error)
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
      await axios.post(`http://localhost:8080/posts/${postId}/comentar`, { comentario: text })
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
              className="bg-[#1a1a2e]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-[#8a2be2]/30 transition-all group"
            >
              {/* Header do Post */}
              <div className="p-6 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    {post.user.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{post.user.name}</h4>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-black">
                      {new Date(post.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                  {getSubjectIcon(post.subject)}
                  <span className="text-white/70 text-xs font-bold">{post.subject}</span>
                </div>
              </div>

              {/* Conteúdo do Post */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/30 uppercase font-black">Tempo</span>
                      <span className="text-lg font-bold text-white">{post.duration} min</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/30 uppercase font-black">XP Ganho</span>
                      <span className="text-lg font-bold text-amber-400">+{post.xp} XP</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaFire className="text-orange-500" />
                    <span className="text-sm font-black text-white">CONCLUÍDO</span>
                  </div>
                </div>

                {post.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.topics.map((topic, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/50 font-bold">
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}

                {post.summary && (
                  <p className="text-white/60 text-sm line-clamp-3 italic">
                    "{post.summary}"
                  </p>
                )}
              </div>

              {/* Footer do Post (Interações) */}
              <div className="px-6 py-4 bg-white/5 flex items-center gap-6 border-t border-white/5">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 transition-colors ${post.isLiked ? 'text-red-500' : 'text-white/40 hover:text-white'}`}
                >
                  <FaHeart className={post.isLiked ? 'scale-110 animate-bounce' : ''} />
                  <span className="text-xs font-bold">{post.likes}</span>
                </button>
                <button 
                  onClick={() => toggleComments(post.id)}
                  className={`flex items-center gap-2 transition-colors ${post.showComments ? 'text-[#8a2be2]' : 'text-white/40 hover:text-white'}`}
                >
                  <FaComment />
                  <span className="text-xs font-bold">{post.comments.length}</span>
                </button>
                <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors ml-auto">
                  <FaShare />
                </button>
              </div>

              {/* Seção de Comentários */}
              <AnimatePresence>
                {post.showComments && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-[#0a0a0f]/50 border-t border-white/5"
                  >
                    <div className="p-6 space-y-4">
                      {post.comments.map((comment, cIdx) => (
                        <div key={cIdx} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                            {comment.user.charAt(0)}
                          </div>
                          <div className="bg-white/5 rounded-2xl px-4 py-2 flex-1">
                            <p className="text-white font-bold text-xs mb-1">{comment.user}</p>
                            <p className="text-white/70 text-sm">{comment.text}</p>
                          </div>
                        </div>
                      ))}

                      <div className="flex gap-3 pt-2">
                        <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                          {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            placeholder="Escreva um comentário..."
                            value={commentText[post.id] || ''}
                            onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#8a2be2]/50"
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            className="px-4 py-2 bg-[#8a2be2]/20 hover:bg-[#8a2be2]/40 text-[#8a2be2] rounded-xl text-xs font-bold transition-colors"
                          >
                            Postar
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <FaTrophy className="text-white/10 text-6xl mx-auto mb-4" />
            <h3 className="text-white font-bold">Nenhuma atividade recente</h3>
            <p className="text-white/30 text-sm">Seja o primeiro a compartilhar seu progresso!</p>
          </div>
        )}
      </div>
    </div>
  )
}
