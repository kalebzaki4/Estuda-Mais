import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import authService from '../services/authService.js'
import styles from '../styles/OAuth2RedirectHandler.module.css'

export default function OAuth2RedirectHandler() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function handleRedirect() {
      try {
        // Parse query params that the backend may append after OAuth flow
        const params = new URLSearchParams(location.search)

        // Common keys that backends may use: token, access_token, id_token
        const token = params.get('token') || params.get('access_token') || params.get('id_token')
        const error = params.get('error') || null
        const errorKey = params.get('error_key') || null

        if (token) {
          // Store token using service
          authService.setAuthData(token)
          
          // Verify if token is valid before proceeding
          if (authService.isAuthenticated()) {
             navigate('/dashboard', { replace: true })
          } else {
             authService.logout()
             navigate('/login?error=invalid_token', { replace: true })
          }
          return
        }

        // If backend redirected with an error key / message, forward it to the login page
        if (error || errorKey) {
          // Try to keep the same semantic key so Login can show contextual messages
          const query = errorKey || error
          navigate(`/login?error=${encodeURIComponent(query)}`, { replace: true })
          return
        }

        // No token or error — just go to login safe fallback
        navigate('/login', { replace: true })
      } catch (ex) {
        // Silently fail to login page to avoid exposing error details in console
        navigate('/login', { replace: true })
      }
    }

    handleRedirect()
  }, [location, navigate])

  return (
    <main className={`page-login ${styles.container}`}>
      <div className={styles.box}>
        <h2 className={styles.title}>Processando login...</h2>
        <p className={styles.subtitle}>Aguarde enquanto finalizamos sua autenticação.</p>
      </div>
    </main>
  )
}
