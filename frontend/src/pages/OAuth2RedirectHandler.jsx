import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuth2RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const user = urlParams.get('user');

    if (token) {
      localStorage.setItem('jwtToken', token); 
      if (user) {
        localStorage.setItem('userData', user);
      }
      navigate('/dashboard'); 
    } else {
      const error = urlParams.get('error');
      if (error) {
        navigate(`/login?error=${error}`);
      } else {
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