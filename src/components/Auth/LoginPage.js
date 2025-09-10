import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Input, Loading } from '../common';
import { useForm } from '../../hooks';

export default function LoginPage({ onLoginSuccess }) {
  const { login, loading: authLoading, error } = useAuth();
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useForm({
    initialValues: { email: '', password: '' },
    onSubmit: handleLogin
  });
  
  async function handleLogin(formData) {
    setMessage('');
    
    if (!formData.email || !formData.password) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        setMessage(result.message);
        setTimeout(() => onLoginSuccess?.(), 500);
      } else {
        setMessage(result.message);
      }
    } catch (err) {
      setMessage('Erro de conexão com o servidor. Tente novamente mais tarde.');
    }
  }



  return (
    <div className="min-h-screen bg-dark-900 text-white flex flex-col md:flex-row">
      {/* Seção de boas-vindas e ilustração - Lado esquerdo */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center p-8 bg-primary-600 rounded-none">
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
        <div className="w-full max-w-md p-6 bg-dark-800 rounded-xl shadow-lg animate-fade-in">
          <div className="md:hidden text-center mb-8">
            <h1 className="text-4xl font-bold text-primary-500 mb-2">Estuda<span className="text-white">+</span></h1>
            <p className="text-gray-400">Acesse sua conta</p>
          </div>
          
          <h2 className="text-xl font-semibold mb-6 hidden md:block text-white">Entrar na sua conta</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-mail"
              type="email"
              name="email"
              placeholder="seu.email@exemplo.com"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              }
              required
            />
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="block text-sm font-medium text-gray-300">Senha</span>
                <a href="#" className="text-xs text-primary-400 hover:text-primary-300 transition-colors duration-200">Esqueceu a senha?</a>
              </div>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={values.password}
                onChange={handleChange}
                error={errors.password}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                }
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                    aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                }
                required
              />
            </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 bg-dark-700 border-gray-600 rounded focus:ring-primary-500 text-primary-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Lembrar-me
              </label>
            </div>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            size="large"
            loading={isSubmitting || authLoading}
            disabled={isSubmitting || authLoading}
            className="w-full mt-6"
          >
            {isSubmitting || authLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
        
        {(message || error) && (
          <div className={`mt-4 p-3 rounded-lg ${(message && message.includes('sucesso')) ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-red-500 bg-opacity-20 text-red-400'} animate-fade-in`}>
            <p className="text-center text-sm font-medium">{message || error}</p>
          </div>
        )}
        
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-800 text-gray-400">Ou continue com</span>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center space-x-4">
            <button type="button" className="flex justify-center items-center w-12 h-12 rounded-full bg-dark-700 hover:bg-dark-600 transition-colors duration-200">
              <svg className="h-5 w-5 text-text-muted-dark" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </button>
            <button type="button" className="flex justify-center items-center w-12 h-12 rounded-full bg-dark-700 hover:bg-dark-600 transition-colors duration-200">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
            <button type="button" className="flex justify-center items-center w-12 h-12 rounded-full bg-dark-700 hover:bg-dark-600 transition-colors duration-200">
              <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-gray-400">
          Não tem conta?{' '}
          <Link to="/register" className="text-primary-400 hover:text-primary-300 transition-colors duration-200 font-semibold">
            Cadastre-se
          </Link>
        </p>
        
        <div className="mt-6 pt-4 border-t border-gray-700/30">
          <p className="text-xs text-center text-gray-400">
            Ao continuar, você concorda com os <a href="#" className="text-primary-400 hover:text-primary-300">Termos</a> e <a href="#" className="text-primary-400 hover:text-primary-300">Privacidade</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}