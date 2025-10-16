import { useLocation, Navigate, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'

const PageTransition = ({ children }) => (
  <motion.main
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
    {children}
  </motion.main>
)

export default function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  )
}