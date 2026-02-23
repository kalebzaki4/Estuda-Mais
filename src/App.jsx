import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContextCore.jsx";
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import Layout from './components/layout/Layout.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import PublicRoute from './components/auth/PublicRoute.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import Settings from './pages/Settings.jsx'
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } 
        />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        
        <Route 
          path="/dashboard"  
          element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/:tab"  
          element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/configuracoes" 
          element={
            <ProtectedRoute>
              <Layout><Settings /></Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route path="/pomodoro" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <HashRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
          <AnimatedRoutes />
          <Toaster
            theme="dark"
            position="top-right"
            richColors
            closeButton
            expand={true}
            duration={4000}
            visibleToasts={3}
            containerAriaLabel="Toast Notifications"
          />
        </HashRouter>
      </AuthProvider>
    </ErrorBoundary>
  )
}