import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LuBookOpen, LuUser, LuLogOut, LuLayoutDashboard } from 'react-icons/lu'
import { useState, useEffect } from 'react'

export default function Layout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    const userData = localStorage.getItem('userData')
    
    if (token && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('userData')
    setIsAuthenticated(false)
    setUser(null)
    navigate('/login')
  }

  const isActivePath = (path) => {
    return location.pathname === path
  }

  // Não mostrar header nas páginas de login/signup
  const hideHeaderPaths = ['/login', '/signup', '/oauth2/redirect']
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname)

  if (!shouldShowHeader) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-brand-300 transition-colors">
              <LuBookOpen size={24} />
              <span className="font-semibold text-lg">Estuda+</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isActivePath('/dashboard') 
                    ? 'text-brand-300 bg-white/5' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <LuLayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-white/70">
                    <LuUser size={18} />
                    <span className="text-sm">{user?.name || 'Usuário'}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <LuLogOut size={18} />
                    <span className="text-sm">Sair</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isActivePath('/login')
                        ? 'text-brand-300 bg-white/5'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                  >
                    Criar Conta
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}