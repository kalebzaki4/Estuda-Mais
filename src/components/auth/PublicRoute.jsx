import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextCore.jsx";

export default function PublicRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    // Fallback de segurança: Loading neutro enquanto verifica estado
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
        <div className="animate-pulse">Carregando...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Se estiver logado, redireciona silenciosamente para o dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
