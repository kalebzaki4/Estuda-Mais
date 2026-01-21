import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaSignOutAlt, FaShieldAlt, FaTrash, FaSave, FaLock, FaExclamationTriangle } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContextCore.jsx'
import userService from '../services/userService.js'
import { motion } from 'framer-motion'

export default function Settings() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)

    try {
      // Simula update chamando API
      const res = await userService.updateProfile({ name: formData.name })
      if (res.success) {
        setMessage('Perfil atualizado com sucesso!')
        // Idealmente atualizaria o contexto aqui, mas vamos pedir pro usuário relogar ou atualizar a pagina
        // Ou o backend retorna o novo user e atualizamos o estado local
      } else {
        setError(res.error || 'Erro ao atualizar perfil')
      }
    } catch (err) {
      setError('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError('As novas senhas não coincidem')
      return
    }
    
    setLoading(true)
    setMessage(null)
    setError(null)

    try {
      const res = await userService.changePassword(formData.currentPassword, formData.newPassword)
      if (res.success) {
        setMessage('Senha alterada com sucesso!')
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmNewPassword: '' }))
      } else {
        setError(res.error || 'Erro ao alterar senha')
      }
    } catch (err) {
      setError('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setLoading(true)
    try {
      const res = await userService.deleteAccount()
      if (res.success) {
        logout()
        navigate('/login')
      } else {
        setError(res.error || 'Erro ao excluir conta')
        setShowDeleteConfirm(false)
      }
    } catch (err) {
      setError('Erro de conexão')
      setShowDeleteConfirm(false)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Configurações</h1>
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-white/50 hover:text-white transition-colors text-sm"
            >
              Voltar ao Dashboard
            </button>
          </div>

          {/* Feedback Messages */}
          {message && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-lg flex items-center gap-2"
            >
              <FaShieldAlt size={20} />
              {message}
            </motion.div>
          )}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-2"
            >
              <FaExclamationTriangle size={20} />
              {error}
            </motion.div>
          )}

          {/* Profile Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <FaUser size={24} className="text-brand-400" />
              <h2 className="text-xl font-semibold text-white">Perfil</h2>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Nome Completo</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Email (Não editável)</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-white/50 cursor-not-allowed"
                    />
                    <FaLock size={16} className="absolute right-4 top-3.5 text-white/30" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSave size={18} />
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>

          {/* Security Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <FaShieldAlt size={24} className="text-brand-400" />
              <h2 className="text-xl font-semibold text-white">Segurança</h2>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">Senha Atual</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Nova Senha</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Confirmar Nova Senha</label>
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleInputChange}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex justify-end items-center gap-4">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  Encerrar Sessão
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.currentPassword || !formData.newPassword}
                  className="flex items-center gap-2 px-6 py-2 border border-white/20 hover:bg-white/5 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaLock size={18} />
                  Alterar Senha
                </button>
              </div>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-red-500/10 pb-4">
              <FaExclamationTriangle size={24} className="text-red-500" />
              <h2 className="text-xl font-semibold text-red-500">Zona de Perigo</h2>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-white font-medium mb-1">Excluir Conta</h3>
                <p className="text-white/50 text-sm">
                  Esta ação é irreversível. Todos os seus dados, histórico e progressos serão perdidos permanentemente.
                </p>
              </div>
              
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Excluir minha conta
                </button>
              ) : (
                <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
                  <span className="text-white/70 text-sm">Tem certeza?</span>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 text-white/70 hover:text-white text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-red-900/20"
                  >
                    <FaTrash size={16} />
                    Sim, excluir tudo
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
