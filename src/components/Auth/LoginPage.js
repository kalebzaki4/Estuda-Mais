import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
// Ensure we're using the AuthContext version, not the empty hook

export default function LoginPage({ onLoginSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (!email || !password) {
      setMessage('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      const result = await login(email, password);
      
      if (result.success) {
        setMessage(result.message);
        setTimeout(() => onLoginSuccess?.(), 500);
      } else {
        setMessage(result.message);
      }
    } catch (err) {
      setMessage('Erro de conexão com o servidor. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark-primary text-text-light flex flex-col md:flex-row">
      {/* Seção de boas-vindas e ilustração - Lado esquerdo */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center p-8 bg-accent-purple rounded-none">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">Estuda<span className="text-white">+</span></h1>
          <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta!</h2>
          <p className="text-base text-white/80 mb-6">Continue sua jornada de aprendizado e alcance seus objetivos acadêmicos.</p>
          
          {/* Ilustração estilo Lyfta */}
          <div className="w-full max-w-md mx-auto my-8 relative">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <div className="w-full h-6 bg-white/20 rounded-full mb-4"></div>
              <div className="w-3/4 h-6 bg-white/20 rounded-full mb-4"></div>
              <div className="w-1/2 h-6 bg-white/20 rounded-full"></div>
            </div>
          </div>
          
          <div className="flex space-x-4 mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white/80 text-sm">Estudos personalizados</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white/80 text-sm">Progresso em tempo real</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Formulário de login - Lado direito */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md p-6 bg-bg-dark-secondary rounded-xl shadow-custom-dark-lg animate-fade-in">
          <div className="md:hidden text-center mb-8">
            <h1 className="text-4xl font-bold text-accent-purple mb-2">Estuda<span className="text-text-light">+</span></h1>
            <p className="text-text-muted-dark">Acesse sua conta</p>
          </div>
          
          <h2 className="text-xl font-semibold mb-6 hidden md:block">Entrar na sua conta</h2>
          <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-text-muted-dark">E-mail</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-text-muted-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 px-4 py-3 bg-bg-dark-tertiary border-0 rounded-lg text-text-light placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all duration-300"
                aria-label="E-mail"
                required
              />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-text-muted-dark">Senha</label>
              <a href="#" className="text-xs text-accent-purple hover:text-accent-purple-light transition-colors duration-200">Esqueceu a senha?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-text-muted-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 px-4 py-3 bg-bg-dark-tertiary border-0 rounded-lg text-text-light placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all duration-300 pr-12"
                aria-label="Senha"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-text-muted-dark hover:text-accent-purple transition-colors duration-200"
                aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 0112 5c.424 0 .84.053 1.25.158M12 5v14M3 12c.877 2.062 2.378 3.733 4.238 4.67M2.458 12C3.732 7.857 7.522 5 12 5s8.268 2.857 9.542 7c-.63 1.983-1.66 3.655-2.923 5.011M21 21l-7.795-7.795"></path>
                  ) : (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.857 7.522 5 12 5s8.268 2.857 9.542 7c-1.274 4.143-5.064 7-9.542 7-4.478 0-8.268-2.857-9.542-7z"></path>
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 bg-bg-dark-tertiary border-border-dark rounded focus:ring-accent-purple text-accent-purple"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text-muted-dark">
                Lembrar-me
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-4 py-3 bg-accent-purple text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-accent-purple/90 disabled:bg-accent-purple/50 disabled:text-white/70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-text-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
        
        {message && (
          <div className={`mt-4 p-3 rounded-lg ${message.includes('sucesso') ? 'bg-success-green bg-opacity-20 text-success-green' : 'bg-error-red bg-opacity-20 text-error-red'} animate-fade-in`}>
            <p className="text-center text-sm font-medium">{message}</p>
          </div>
        )}
        
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-dark"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-bg-dark-secondary text-text-muted-dark">Ou continue com</span>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center space-x-4">
            <button type="button" className="flex justify-center items-center w-12 h-12 rounded-full bg-bg-dark-tertiary hover:bg-bg-dark-hover transition-colors duration-200">
              <svg className="h-5 w-5 text-text-muted-dark" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </button>
            <button type="button" className="flex justify-center items-center w-12 h-12 rounded-full bg-bg-dark-tertiary hover:bg-bg-dark-hover transition-colors duration-200">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
            <button type="button" className="flex justify-center items-center w-12 h-12 rounded-full bg-bg-dark-tertiary hover:bg-bg-dark-hover transition-colors duration-200">
              <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-text-muted-dark">
          Não tem conta?{' '}
          <Link to="/register" className="text-accent-purple hover:text-accent-purple-light transition-colors duration-200 font-semibold">
            Cadastre-se
          </Link>
        </p>
        
        <div className="mt-6 pt-4 border-t border-border-dark/30">
          <p className="text-xs text-center text-text-muted-dark">
            Ao continuar, você concorda com os <a href="#" className="text-accent-purple hover:text-accent-purple-light">Termos</a> e <a href="#" className="text-accent-purple hover:text-accent-purple-light">Privacidade</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}