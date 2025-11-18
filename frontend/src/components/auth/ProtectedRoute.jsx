import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen w-full grid place-items-center bg-[#0a0a0a] text-white">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-brand-300 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}