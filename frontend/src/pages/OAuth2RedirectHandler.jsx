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
          // Store token and try to fetch user information
          localStorage.setItem('jwtToken', token)

          // Attempt to get current user from API so the app can initialize user data
          try {
            const result = await authService.getCurrentUser()
            if (result.success && result.data) {
              localStorage.setItem('userData', JSON.stringify(result.data))
            }
          } catch (e) {
            // Ignore errors here — token is set and the app will check auth status later
            console.warn('Failed to fetch current user after OAuth redirect', e)
          }

          // Navigate to dashboard after login
          navigate('/dashboard', { replace: true })
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
        console.error('Error handling OAuth2 redirect', ex)
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
