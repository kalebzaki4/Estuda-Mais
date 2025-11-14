import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    const userData = localStorage.getItem('userData')
    
    if (token && userData) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen w-full grid place-items-center bg-[#0a0a0a] text-white">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-brand-300 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}