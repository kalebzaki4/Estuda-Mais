import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContextCore.jsx";
import Layout from './components/layout/Layout.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler.jsx'

export default function App() {
  return (
    <AuthProvider>
      {/* HashRouter é a melhor prática para GitHub Pages para evitar erros 404 de rotas */}
      <HashRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}