import { useNavigate } from 'react-router-dom'
import { LuUser, LuMail, LuLogOut } from 'react-icons/lu'
import { useAuth } from '../contexts/AuthContextCore.jsx'

export default function Settings() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setTimeout(() => {
      window.location.href = '/'
    }, 0)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-12">Configurações</h1>

          {/* User Info Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Informações da Conta</h2>

            <div className="space-y-6">
              {/* Nome do Usuário */}
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <LuUser size={24} className="text-brand-300 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white/70 text-sm mb-1">Nome do Usuário</p>
                  <p className="text-white font-medium">{user?.name || 'Não disponível'}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <LuMail size={24} className="text-brand-300 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white/70 text-sm mb-1">Email</p>
                  <p className="text-white font-medium">{user?.email || 'Não disponível'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Sair da Conta</h2>
            <p className="text-white/70 mb-6">
              Clique no botão abaixo para sair de sua conta. Você será redirecionado para a página de login.
            </p>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <LuLogOut size={18} />
              <span>Sair da Conta</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
