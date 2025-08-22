// src/components/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Componente de gráfico moderno para visualização
const MiniGraph = ({ color = 'var(--accent-purple)', height = 40, type = 'line' }) => {
  if (type === 'bar') {
    return (
      <div className="w-20 h-10 relative">
        <div className="flex h-full items-end space-x-1">
          <div className="w-2 bg-accent-purple-dark rounded-t-sm h-[60%] animate-pulse-subtle"></div>
          <div className="w-2 bg-accent-purple rounded-t-sm h-[80%] animate-pulse-subtle"></div>
          <div className="w-2 bg-accent-purple-dark rounded-t-sm h-[40%] animate-pulse-subtle"></div>
          <div className="w-2 bg-accent-purple rounded-t-sm h-[90%] animate-pulse-subtle"></div>
          <div className="w-2 bg-accent-purple-dark rounded-t-sm h-[50%] animate-pulse-subtle"></div>
          <div className="w-2 bg-accent-purple rounded-t-sm h-[70%] animate-pulse-subtle"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-20 h-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-accent-purple/10 to-transparent rounded-md"></div>
      <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.5"/>
            <stop offset="100%" stopColor={color} stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        <polygon 
          fill="url(#graphGradient)" 
          points="0,40 10,35 20,30 30,32 40,25 50,28 60,20 70,15 80,18 90,10 100,15 100,40 0,40"
        />
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="0,35 10,30 20,25 30,27 40,20 50,23 60,15 70,10 80,13 90,5 100,10"
        />
      </svg>
    </div>
  );
};

// Componente de progresso circular
const CircularProgress = ({ progress, size = 40, strokeWidth = 4, color = 'var(--accent-purple)' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        {/* Círculo de fundo */}
        <circle
          className="text-bg-dark-tertiary"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Círculo de progresso */}
        <circle
          className="text-accent-purple transition-all duration-1000 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ color }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-text-light">
        {progress}%
      </div>
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, isLoggedIn, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de dados
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Verificar se o usuário está logado
    if (!loading && !isLoggedIn) {
      // Se não estiver logado, redirecionar para a página de login
      console.log('Usuário não está logado. Redirecionando...');
      navigate('/login');
    }
  }, [isLoggedIn, loading, navigate]);

  // Mostrar tela de carregamento enquanto verifica o login
  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-bg-dark-primary">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent-purple"></div>
          <p className="mt-4 text-text-muted-dark animate-pulse">Carregando seu ambiente de estudos...</p>
        </div>
      </div>
    );
  }

  // Dados simulados para o dashboard
  const studyItems = [
    { id: 1, title: 'Matemática', detail: 'Cálculo Diferencial', icon: '📊', progress: 75, lastStudy: '2h atrás' },
    { id: 2, title: 'Física', detail: 'Mecânica Quântica', icon: '⚛️', progress: 60, lastStudy: 'Ontem' },
    { id: 3, title: 'Programação', detail: 'React & Node.js', icon: '💻', progress: 40, lastStudy: '3h atrás' },
    { id: 4, title: 'Biologia', detail: 'Genética', icon: '🧬', progress: 25, lastStudy: '2 dias atrás' },
    { id: 5, title: 'História', detail: 'Revolução Industrial', icon: '📚', progress: 90, lastStudy: 'Hoje' },
  ];

  const friendActivities = [
    { id: 1, name: 'João Silva', activity: 'completou 2h de estudos', time: '5 min atrás', avatar: 'JS' },
    { id: 2, name: 'Maria Souza', activity: 'estudou "Redes Neurais"', time: '30 min atrás', avatar: 'MS' },
    { id: 3, name: 'Pedro Alves', activity: 'foi promovido de nível', time: '3h atrás', avatar: 'PA' },
    { id: 4, name: 'Ana Costa', activity: 'revisou CSS Grid', time: 'Ontem', avatar: 'AC' },
  ];

  const yourStudySummary = [
    { id: 1, topic: 'Matemática', time: '2h 30min', lastSession: 'Hoje', progress: 75, avatar: 'MA' },
    { id: 2, topic: 'Programação', time: '1h 15min', lastSession: 'Ontem', progress: 60, avatar: 'PR' },
    { id: 3, topic: 'Inteligência Artificial', time: '1h 45min', lastSession: '2 dias atrás', progress: 40, avatar: 'AI' },
    { id: 4, topic: 'Design UX/UI', time: '1h 00min', lastSession: '3 dias atrás', progress: 25, avatar: 'UX' },
  ];
  
  // Dados para o gráfico de progresso semanal
  const weeklyProgress = [
    { day: 'Seg', hours: 1.5 },
    { day: 'Ter', hours: 2.0 },
    { day: 'Qua', hours: 0.5 },
    { day: 'Qui', hours: 3.0 },
    { day: 'Sex', hours: 2.5 },
    { day: 'Sáb', hours: 1.0 },
    { day: 'Dom', hours: 0.0 },
  ];
  
  // Estatísticas rápidas
  const quickStats = [
    { label: 'Tempo Total', value: '10h 45min', icon: '⏱️', color: 'bg-accent-purple' },
    { label: 'Sessões', value: '8 sessões', icon: '📚', color: 'bg-info-blue' },
    { label: 'Streak', value: '5 dias', icon: '🔥', color: 'bg-success-green' },
    { label: 'Nível', value: 'Intermediário', icon: '🏆', color: 'bg-accent-purple-light' },
  ];

  return (
    <div className="min-h-screen bg-bg-dark-primary text-text-light p-4 md:p-6 lg:p-8">
      {/* Header com saudação e estatísticas rápidas */}
      <div className="mb-8 animate-fade-in">
        {currentUser && (
          <div className="mb-6 transform transition-all duration-500 hover:scale-[1.01]">
            <h1 className="text-3xl md:text-4xl font-bold text-text-light">
              Olá, <span className="text-accent-purple animate-pulse-subtle inline-block">{currentUser.name}</span>!
            </h1>
            <p className="text-text-muted-dark mt-1 text-lg">
              Bem-vindo de volta ao seu dashboard de estudos. Vamos continuar aprendendo?
            </p>
          </div>
        )}
        
        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 animate-slide-in-right">
          {quickStats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="bg-bg-dark-secondary p-4 rounded-xl shadow-custom-dark border border-border-dark flex items-center space-x-3 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-accent-purple/10 hover:border-accent-purple/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-text-light text-xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-text-muted-dark text-xs">{stat.label}</p>
                <p className="text-text-light font-semibold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navegação principal */}
      <div className="bg-bg-dark-secondary rounded-xl p-1 mb-8 shadow-custom-dark border border-border-dark animate-slide-in-left">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 text-center text-base font-semibold rounded-lg transition-all duration-300 ${
              activeTab === 'overview' ? 'bg-accent-purple text-text-light shadow-inner' : 'hover:bg-bg-dark-tertiary text-text-muted-dark'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex-1 py-3 text-center text-base font-semibold rounded-lg transition-all duration-300 ${
              activeTab === 'exercises' ? 'bg-accent-purple text-text-light shadow-inner' : 'hover:bg-bg-dark-tertiary text-text-muted-dark'
            }`}
          >
            Meus Estudos
          </button>
          <button
            onClick={() => setActiveTab('measurements')}
            className={`flex-1 py-3 text-center text-base font-semibold rounded-lg transition-all duration-300 ${
              activeTab === 'measurements' ? 'bg-accent-purple text-text-light shadow-inner' : 'hover:bg-bg-dark-tertiary text-text-muted-dark'
            }`}
          >
            Amigos
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex-1 py-3 text-center text-base font-semibold rounded-lg transition-all duration-300 ${
              activeTab === 'photos' ? 'bg-accent-purple text-text-light shadow-inner' : 'hover:bg-bg-dark-tertiary text-text-muted-dark'
            }`}
          >
            Conquistas
          </button>
        </div>
      </div>

      {/* Conteúdo da Aba Visão Geral */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* Gráfico de progresso semanal */}
          <div className="bg-bg-dark-secondary p-6 rounded-xl shadow-custom-dark border border-border-dark transform transition-all duration-500 hover:shadow-lg hover:shadow-accent-purple/20 hover:scale-[1.01] hover:border-accent-purple/30 animate-pop-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-text-light">Progresso Semanal</h2>
              <div className="text-accent-purple text-sm font-medium bg-accent-purple/10 px-3 py-1 rounded-full">
                Total: 10h 30min
              </div>
            </div>
            
            <div className="h-48 mt-4">
              <div className="flex h-40 items-end justify-between">
                {weeklyProgress.map((day, index) => {
                  const height = day.hours > 0 ? (day.hours / 3) * 100 : 5; // 3h é o máximo (100%)
                  return (
                    <div key={day.day} className="flex flex-col items-center space-y-2 w-1/7" style={{ animationDelay: `${index * 100}ms` }}>
                      <div 
                        className={`w-12 rounded-t-lg ${day.hours > 0 ? 'bg-accent-purple' : 'bg-bg-dark-tertiary'} transition-all duration-500 animate-slide-up`} 
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-text-muted-dark text-xs">{day.day}</span>
                      <span className="text-text-light text-xs font-medium">{day.hours}h</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Seção de duas colunas: Resumo de Estudos e Atividades dos Amigos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resumo de Estudos */}
            <div className="bg-bg-dark-secondary p-6 rounded-xl shadow-custom-dark border border-border-dark transform transition-all duration-500 hover:shadow-lg hover:shadow-accent-purple/20 hover:scale-[1.01] hover:border-accent-purple/30 animate-slide-in-left">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-text-light">Seus Tópicos de Estudo</h2>
                <button className="text-accent-purple hover:text-accent-purple-light transition-colors duration-200 text-sm font-medium">
                  Ver todos
                </button>
              </div>
              
              <div className="space-y-4 mt-4">
                {yourStudySummary.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-3 bg-bg-dark-tertiary rounded-lg hover:bg-bg-dark-hover transition-all duration-300 transform hover:scale-[1.01] cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent-purple/20 rounded-lg flex items-center justify-center text-accent-purple font-bold">
                        {item.avatar}
                      </div>
                      <div>
                        <h3 className="text-text-light font-medium">{item.topic}</h3>
                        <p className="text-text-muted-dark text-xs">{item.time} • {item.lastSession}</p>
                      </div>
                    </div>
                    <CircularProgress progress={item.progress} size={36} />
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-3 bg-accent-purple hover:bg-accent-purple-dark text-text-light font-semibold rounded-lg transition-all duration-300 transform hover:translate-y-[-2px]">
                Iniciar Nova Sessão
              </button>
            </div>
            
            {/* Atividades dos Amigos */}
            <div className="bg-bg-dark-secondary p-6 rounded-xl shadow-custom-dark border border-border-dark transform transition-all duration-500 hover:shadow-lg hover:shadow-accent-purple/20 hover:scale-[1.01] hover:border-accent-purple/30 animate-slide-in-right">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-text-light">Atividade dos Amigos</h2>
                <button className="text-accent-purple hover:text-accent-purple-light transition-colors duration-200 text-sm font-medium">
                  Ver todos
                </button>
              </div>
              
              <div className="space-y-4 mt-4">
                {friendActivities.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className="flex items-center justify-between p-3 bg-bg-dark-tertiary rounded-lg hover:bg-bg-dark-hover transition-all duration-300 transform hover:scale-[1.01] cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent-purple/20 rounded-lg flex items-center justify-center text-accent-purple font-bold">
                        {activity.avatar}
                      </div>
                      <div>
                        <h3 className="text-text-light font-medium">{activity.name}</h3>
                        <p className="text-text-muted-dark text-xs">{activity.activity}</p>
                      </div>
                    </div>
                    <span className="text-text-muted-dark text-xs">{activity.time}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-3 bg-bg-dark-tertiary hover:bg-bg-dark-hover text-text-light font-semibold rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] border border-border-dark">
                Encontrar Amigos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba Meus Estudos */}
      {activeTab === 'exercises' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-text-light">Meus Tópicos de Estudo</h2>
            <button className="px-4 py-2 bg-accent-purple hover:bg-accent-purple-dark text-text-light font-semibold rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span>Novo Tópico</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyItems.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-bg-dark-secondary p-5 rounded-xl shadow-custom-dark border border-border-dark transform transition-all duration-500 hover:shadow-lg hover:shadow-accent-purple/20 hover:scale-[1.03] hover:border-accent-purple/30 animate-pop-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-light">{item.title}</h3>
                      <p className="text-text-muted-dark text-sm">{item.detail}</p>
                    </div>
                  </div>
                  <div className="bg-bg-dark-tertiary p-1 rounded-md">
                    <svg className="w-5 h-5 text-text-muted-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                    </svg>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-text-muted-dark text-xs">Progresso</span>
                    <span className="text-text-light text-xs font-medium">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-bg-dark-tertiary rounded-full h-2">
                    <div 
                      className="bg-accent-purple h-2 rounded-full transition-all duration-1000 ease-in-out" 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-text-muted-dark text-xs">Última sessão: {item.lastStudy}</span>
                  <button className="px-3 py-1 bg-accent-purple/20 text-accent-purple text-sm font-medium rounded-lg hover:bg-accent-purple/30 transition-colors duration-200">
                    Continuar
                  </button>
                </div>
              </div>
            ))}
            
            {/* Card para adicionar novo tópico */}
            <div className="bg-bg-dark-tertiary p-5 rounded-xl border border-dashed border-border-dark flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:bg-bg-dark-hover transition-all duration-300 animate-pop-in" style={{ animationDelay: `${studyItems.length * 100}ms` }}>
              <div className="w-14 h-14 bg-accent-purple/10 rounded-full flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <p className="text-text-light font-medium">Adicionar Tópico</p>
              <p className="text-text-muted-dark text-sm text-center mt-1">Crie um novo tópico de estudo personalizado</p>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba Amigos */}
      {activeTab === 'measurements' && (
        <div className="bg-bg-dark-secondary p-6 rounded-xl shadow-custom-dark border border-border-dark animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-text-light">Seus Amigos</h2>
            <div className="flex space-x-2">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar amigos..." 
                  className="pl-10 pr-4 py-2 bg-bg-dark-tertiary border border-border-dark rounded-lg text-text-light placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-accent-purple transition-all duration-300"
                />
                <svg className="w-5 h-5 text-text-muted-dark absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <button className="p-2 bg-accent-purple hover:bg-accent-purple-dark text-text-light font-semibold rounded-lg transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {friendActivities.map((friend, index) => (
              <div 
                key={friend.id} 
                className="bg-bg-dark-tertiary p-4 rounded-xl transform transition-all duration-500 hover:shadow-lg hover:shadow-accent-purple/20 hover:scale-[1.02] hover:border-accent-purple/30 animate-pop-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 bg-accent-purple/20 rounded-xl flex items-center justify-center text-accent-purple text-xl font-bold">
                    {friend.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-light">{friend.name}</h3>
                    <p className="text-text-muted-dark text-sm">{friend.activity}</p>
                    <p className="text-accent-purple text-xs mt-1">{friend.time}</p>
                  </div>
                </div>
                
                <div className="flex justify-between mt-4">
                  <button className="flex-1 mr-2 py-2 bg-accent-purple hover:bg-accent-purple-dark text-text-light text-sm font-medium rounded-lg transition-all duration-300">
                    Ver Perfil
                  </button>
                  <button className="flex-1 ml-2 py-2 bg-bg-dark-secondary hover:bg-bg-dark-hover text-text-light text-sm font-medium rounded-lg transition-all duration-300 border border-border-dark">
                    Mensagem
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo da Aba Conquistas */}
      {activeTab === 'photos' && (
        <div className="bg-bg-dark-secondary p-6 rounded-xl shadow-custom-dark border border-border-dark animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-text-light">Suas Conquistas</h2>
            <div className="text-accent-purple text-sm font-medium bg-accent-purple/10 px-3 py-1 rounded-full">
              12 Conquistas
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Conquistas desbloqueadas */}
            <div className="bg-bg-dark-tertiary p-4 rounded-xl flex flex-col items-center text-center transform transition-all duration-500 hover:shadow-lg hover:shadow-accent-purple/20 hover:scale-[1.05] animate-pop-in">
              <div className="w-16 h-16 bg-accent-purple/20 rounded-full flex items-center justify-center text-2xl mb-3 animate-pulse-subtle">
                🔥
              </div>
              <h3 className="text-text-light font-bold">Streak Master</h3>
              <p className="text-text-muted-dark text-xs mt-1">5 dias consecutivos de estudo</p>
              <div className="mt-2 px-3 py-1 bg-success-green/20 text-success-green text-xs font-medium rounded-full">
                Desbloqueado
              </div>
            </div>
            
            <div className="bg-bg-dark-tertiary p-4 rounded-xl flex flex-col items-center text-center transform transition-all duration-500 hover:shadow-lg hover:shadow-accent-purple/20 hover:scale-[1.05] animate-pop-in" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-accent-purple/20 rounded-full flex items-center justify-center text-2xl mb-3 animate-pulse-subtle">
                📚
              </div>
              <h3 className="text-text-light font-bold">Estudioso</h3>
              <p className="text-text-muted-dark text-xs mt-1">Completou 10 horas de estudo</p>
              <div className="mt-2 px-3 py-1 bg-success-green/20 text-success-green text-xs font-medium rounded-full">
                Desbloqueado
              </div>
            </div>
            
            {/* Conquistas bloqueadas */}
            <div className="bg-bg-dark-tertiary p-4 rounded-xl flex flex-col items-center text-center transform transition-all duration-500 hover:shadow-lg hover:shadow-accent-purple/20 hover:scale-[1.05] animate-pop-in opacity-60" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-bg-dark-secondary rounded-full flex items-center justify-center text-2xl mb-3 relative">
                🧠
                <div className="absolute inset-0 bg-bg-dark-primary/70 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-text-muted-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-text-light font-bold">Gênio</h3>
              <p className="text-text-muted-dark text-xs mt-1">Complete 50 horas de estudo</p>
              <div className="mt-2 px-3 py-1 bg-bg-dark-secondary text-text-muted-dark text-xs font-medium rounded-full">
                Bloqueado
              </div>
            </div>
            
            <div className="bg-bg-dark-tertiary p-4 rounded-xl flex flex-col items-center text-center transform transition-all duration-500 hover:shadow-lg hover:shadow-accent-purple/20 hover:scale-[1.05] animate-pop-in opacity-60" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 bg-bg-dark-secondary rounded-full flex items-center justify-center text-2xl mb-3 relative">
                🌟
                <div className="absolute inset-0 bg-bg-dark-primary/70 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-text-muted-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-text-light font-bold">Especialista</h3>
              <p className="text-text-muted-dark text-xs mt-1">Domine 3 tópicos diferentes</p>
              <div className="mt-2 px-3 py-1 bg-bg-dark-secondary text-text-muted-dark text-xs font-medium rounded-full">
                Bloqueado
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
