import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContextCore.jsx'
import { FaBookOpen, FaTachometerAlt, FaMap, FaUser, FaCog, FaSignOutAlt, FaPlus } from 'react-icons/fa'

export default function Layout({ children }) {
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // Não mostrar header nas páginas de login/signup
  const hideHeaderPaths = ['/login', '/signup', '/oauth2/redirect']
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!shouldShowHeader) {
    return <>{children}</>
  }

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  }

  const navLinkClass = (path) => `
    flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200
    ${isActive(path) 
      ? 'bg-white/10 text-white font-medium' 
      : 'text-white/70 hover:text-white hover:bg-white/5'}
  `

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header Único */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to={isAuthenticated ? "/dashboard" : "/"} 
              className="flex items-center space-x-2 text-white hover:text-brand-300 transition-colors"
            >
              <FaBookOpen size={24} className="text-brand-400" />
              <span className="font-bold text-lg tracking-tight">Estuda+</span>
            </Link>

            {/* Navigation - Muda conforme autenticação */}
            <nav className="hidden md:flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                    <FaTachometerAlt size={18} />
                    <span>Visão Geral</span>
                  </Link>
                  
                  <Link to="/dashboard/novo-estudo" className={navLinkClass('/dashboard/novo-estudo')}>
                    <FaPlus size={18} />
                    <span>Novo Estudo</span>
                  </Link>

                  <Link to="/dashboard/roadmaps" className={navLinkClass('/dashboard/roadmaps')}>
                    <FaMap size={18} />
                    <span>Roadmaps</span>
                  </Link>
                </>
              ) : null}
            </nav>

            {/* User Menu - Renderiza APENAS conforme autenticação */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/configuracoes"
                    className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-300 group-hover:bg-brand-500 group-hover:text-white transition-all">
                      <FaUser size={16} />
                    </div>
                    <span className="text-sm font-medium hidden sm:block">{user?.name?.split(' ')[0] || 'Conta'}</span>
                  </Link>

                  <div className="h-6 w-px bg-white/10 mx-2" />

                  <button
                    onClick={handleLogout}
                    className="p-2 text-white/50 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
                    title="Sair"
                  >
                    <FaSignOutAlt size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-white/70 hover:text-white font-medium transition-colors">
                    Entrar
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-brand-500/20"
                  >
                    Começar Agora
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        {children}
      </main>
    </div>
  )
}