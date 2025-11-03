import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuth2RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('jwtToken', token); // Armazena o token JWT
      navigate('/dashboard'); // Redireciona para o dashboard
    } else {
      const error = urlParams.get('error');
      if (error) {
        navigate(`/login?error=${error}`);
      } else {
        // Lidar com o caso em que nenhum token é recebido (erro ou cancelamento)
        navigate('/login?error=oauth_failed');
      }
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <p>Processando autenticação...</p>
    </div>
  );
}