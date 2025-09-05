import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useStudy } from '../../contexts/StudyContext';

// Dados mock (simulados) para as abas
const studyItems = [
  { id: 1, title: 'Anatomia Humana', category: 'Biologia', detail: 'Foco em sistema esquelético.', progress: 75, lastStudy: '3 dias atrás', icon: '🧠' },
  { id: 2, title: 'Cálculo I', category: 'Matemática', detail: 'Limites e derivadas.', progress: 45, lastStudy: 'Ontem', icon: '📐' },
  { id: 3, title: 'React.js', category: 'Programação', detail: 'Hooks e Context API.', progress: 90, lastStudy: 'Hoje', icon: '⚛️' },
  { id: 4, title: 'História do Brasil', category: 'História', detail: 'Período Colonial.', progress: 20, lastStudy: '1 semana atrás', icon: '📜' },
];

const friendActivities = [
  { id: 1, name: 'Ana Souza', avatar: 'AS', activity: 'Concluiu o estudo "Física Quântica".', time: '5min atrás' },
  { id: 2, name: 'Carlos Silva', avatar: 'CS', activity: 'Iniciou um estudo sobre "História da Arte".', time: '15min atrás' },
  { id: 3, name: 'Mariana Lima', avatar: 'ML', activity: 'Bateu seu recorde de 7 dias de streak.', time: '1h atrás' },
  { id: 4, name: 'Pedro Martins', avatar: 'PM', activity: 'Adicionou um novo estudo.', time: '3h atrás' },
];

// Componentes Reutilizáveis
const CircularProgress = ({ progress, size = 60, strokeWidth = 6, color = '#0ea5e9' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full rotate-[-90deg]" viewBox={`0 0 ${size} ${size}`}>
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
        <circle
          className="text-primary transition-all duration-1000 ease-in-out"
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
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-text-light">
        {progress}%
      </div>
    </div>
  );
};

const ProgressBar = ({ progress, height = 8 }) => {
  return (
    <div className="w-full bg-bg-dark-tertiary rounded-full overflow-hidden" style={{ height }}>
      <div
        className="bg-primary h-full rounded-full transition-all duration-1000 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color = 'bg-primary' }) => {
  return (
    <div className="bg-bg-dark-secondary p-4 rounded-2xl shadow-lg border border-border-dark flex items-center space-x-4 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/20">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-text-light text-xl shadow-inner`}>
        {icon}
      </div>
      <div>
        <p className="text-text-muted-dark text-xs font-medium">{label}</p>
        <p className="text-text-light text-lg font-bold">{value}</p>
      </div>
    </div>
  );
};

const ExerciseCard = ({ title, subtitle, icon, progress, lastSession }) => {
  return (
    <div className="bg-bg-dark-secondary p-5 rounded-2xl shadow-lg border border-border-dark transform transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/20">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white text-xl shadow-inner">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-light">{title}</h3>
            <p className="text-text-muted-dark text-sm">{subtitle}</p>
          </div>
        </div>
        <div className="bg-bg-dark-tertiary p-1 rounded-full">
          <svg className="w-6 h-6 text-text-muted-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
          </svg>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-text-muted-dark text-xs font-medium">Progresso</span>
          <span className="text-text-light text-xs font-bold">{progress}%</span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-text-muted-dark text-xs">Última sessão: {lastSession}</span>
        <button className="px-4 py-1.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors duration-200 shadow-md">
          Iniciar
        </button>
      </div>
    </div>
  );
};

// Componente Principal
export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, isLoggedIn, loading } = useAuth();
  const { studies, loading: studiesLoading } = useStudy();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      console.log('Usuário não está logado. Redirecionando...');
      navigate('/login');
    }
  }, [isLoggedIn, loading, navigate]);

  if (loading || isLoading || studiesLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-bg-dark-primary">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-text-muted-dark animate-pulse">Carregando seu ambiente de estudos...</p>
        </div>
      </div>
    );
  }

  const formatTotalTime = (totalMinutes) => {
    if (!totalMinutes) return '0min';

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes > 0 ? `${minutes}min` : ''}`;
    }
    return `${minutes}min`;
  };

  const formatLastSession = (dateString) => {
    if (!dateString) return 'Nunca';

    const lastSession = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - lastSession);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Hoje';
    } else if (diffDays === 1) {
      return 'Ontem';
    } else if (diffDays < 7) {
      return `${diffDays} dias atrás`;
    } else {
      return lastSession.toLocaleDateString('pt-BR');
    }
  };

  const getTopicInitial = (title) => {
    if (!title) return '?';
    return title.charAt(0).toUpperCase();
  };

  const totalTimeMinutes = studies.reduce((total, study) => total + (study.totalTimeMinutes || 0), 0);
  const totalSessions = studies.length;

  const quickStats = [
    { label: 'Tempo Total', value: formatTotalTime(totalTimeMinutes), icon: '⏱️', color: 'bg-primary' },
    { label: 'Estudos', value: `${totalSessions} ${totalSessions === 1 ? 'estudo' : 'estudos'}`, icon: '📚', color: 'bg-secondary' },
    { label: 'Streak', value: '1 dia', icon: '🔥', color: 'bg-accent' },
    { label: 'Nível', value: 'Iniciante', icon: '🏆', color: 'bg-info' },
  ];

  return (
    <div className="min-h-screen bg-bg-dark-primary text-text-light">
      <div className="sticky top-0 z-10 bg-bg-dark-secondary shadow-lg border-b border-border-dark px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-inner">
              {currentUser?.name?.charAt(0) || 'E'}
            </div>
            <div>
              <h1 className="text-lg font-bold text-text-light">Estuda+</h1>
              <p className="text-text-muted-dark text-xs">Seu ambiente de estudos</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 bg-bg-dark-tertiary rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-text-muted-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </button>
            <button className="w-10 h-10 bg-bg-dark-tertiary rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-text-muted-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat, index) => (
            <StatCard key={index} icon={stat.icon} label={stat.label} value={stat.value} color={stat.color} />
          ))}
        </div>

        <div className="bg-bg-dark-secondary rounded-2xl p-1 mb-6 shadow-lg">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-3 text-center text-sm font-bold rounded-xl transition-all duration-300 ${
                activeTab === 'overview' ? 'bg-primary text-white shadow-inner' : 'text-text-muted-dark'
              }`}
            >
              Hoje
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`flex-1 py-3 text-center text-sm font-bold rounded-xl transition-all duration-300 ${
                activeTab === 'exercises' ? 'bg-primary text-white shadow-inner' : 'text-text-muted-dark'
              }`}
            >
              Estudos
            </button>
            <button
              onClick={() => setActiveTab('measurements')}
              className={`flex-1 py-3 text-center text-sm font-bold rounded-xl transition-all duration-300 ${
                activeTab === 'measurements' ? 'bg-primary text-white shadow-inner' : 'text-text-muted-dark'
              }`}
            >
              Amigos
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex-1 py-3 text-center text-sm font-bold rounded-xl transition-all duration-300 ${
                activeTab === 'photos' ? 'bg-primary text-white shadow-inner' : 'text-text-muted-dark'
              }`}
            >
              Perfil
            </button>
          </div>
        </div>

        {/* Conteúdo da Aba "Hoje" */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-text-light">Estudos de Hoje</h2>
                <button className="px-3 py-1 bg-primary rounded-lg text-white text-sm font-bold shadow-md">
                  + Adicionar
                </button>
              </div>

              <div className="space-y-3">
                {studies.length > 0 ? (
                  studies.slice(0, 3).map((study) => (
                    <div key={study.id} className="bg-bg-dark-secondary p-4 rounded-2xl shadow-lg border border-border-dark">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white text-xl shadow-inner">
                            {getTopicInitial(study.title)}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-text-light">{study.title}</h3>
                            <p className="text-text-muted-dark text-sm">{study.description || 'Sem descrição'}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-accent-purple text-xs font-bold">{formatTotalTime(study.totalTimeMinutes)}</span>
                          <span className="text-text-muted-dark text-xs">{formatLastSession(study.lastSession)}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-text-muted-dark text-xs">Progresso</span>
                          <span className="text-text-light text-xs font-bold">{study.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-bg-dark-tertiary rounded-full h-1.5">
                          <div
                            className="bg-accent-purple h-1.5 rounded-full"
                            style={{ width: `${study.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-bg-dark-tertiary rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-text-muted-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                          <span className="text-text-muted-dark text-xs">{formatLastSession(study.lastSession)}</span>
                        </div>
                        <button className="px-4 py-1.5 bg-accent-purple text-white text-xs font-bold rounded-lg shadow-md">
                          Iniciar
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-bg-dark-secondary p-6 rounded-xl shadow-custom-dark border border-border-dark text-center">
                    <svg className="w-12 h-12 mx-auto mb-4 text-text-muted-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    <h3 className="text-xl font-bold text-text-light mb-2">Nenhum estudo encontrado</h3>
                    <p className="text-text-muted-dark mb-4">Você ainda não iniciou nenhum estudo.</p>
                    <button className="px-4 py-2 bg-accent-purple text-white text-sm font-bold rounded-lg hover:bg-accent-purple-dark transition-colors duration-200 shadow-md">
                      Iniciar um estudo
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-text-light">Dicas de Estudo</h2>
              </div>

              <div className="bg-bg-dark-secondary p-6 rounded-xl shadow-custom-dark border border-border-dark">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent-purple rounded-xl flex items-center justify-center text-white text-xl shadow-inner">
                    💡
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-light mb-2">Técnica Pomodoro</h3>
                    <p className="text-text-muted-dark text-sm mb-4">
                      A técnica Pomodoro é um método de gerenciamento de tempo que sugere trabalhar em blocos de 25 minutos, seguidos por intervalos de 5 minutos. Após 4 blocos, faça uma pausa mais longa de 15-30 minutos.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-bg-dark-tertiary rounded-full text-text-muted-dark text-xs">Produtividade</span>
                      <span className="px-3 py-1 bg-bg-dark-tertiary rounded-full text-text-muted-dark text-xs">Foco</span>
                      <span className="px-3 py-1 bg-bg-dark-tertiary rounded-full text-text-muted-dark text-xs">Gerenciamento de tempo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bg-dark-secondary rounded-2xl shadow-lg border border-border-dark overflow-hidden">
              {friendActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`p-4 flex justify-between items-center ${index !== friendActivities.length - 1 ? 'border-b border-border-dark' : ''}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent-purple rounded-full flex items-center justify-center text-white font-bold shadow-inner">
                      {activity.avatar}
                    </div>
                    <div>
                      <h3 className="text-text-light font-bold">{activity.name}</h3>
                      <p className="text-text-muted-dark text-xs">{activity.activity}</p>
                    </div>
                  </div>
                  <span className="text-text-muted-dark text-xs font-medium">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conteúdo da Aba Estudos */}
        {activeTab === 'exercises' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-text-light">Meus Estudos</h2>
              <button className="px-3 py-1.5 bg-accent-purple rounded-lg text-white text-sm font-bold shadow-md flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Adicionar</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studyItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-bg-dark-secondary p-4 rounded-2xl shadow-lg border border-border-dark"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-accent-purple rounded-xl flex items-center justify-center text-white text-xl shadow-inner">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-bold text-text-light">{item.title}</h3>
                          <span className="text-xs font-medium px-2 py-0.5 bg-accent-purple/20 text-accent-purple rounded-md">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-text-muted-dark text-xs">{item.detail}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      {/* Ajuste: Substituído `sets` e `reps` por um dado mais genérico ou removido */}
                      <span className="text-accent-purple text-xs font-bold">12 aulas</span>
                      <span className="text-text-muted-dark text-xs">5h</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-text-muted-dark text-xs">Progresso</span>
                      <span className="text-text-light text-xs font-bold">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-bg-dark-tertiary rounded-full h-1.5">
                      <div
                        className="bg-accent-purple h-1.5 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-bg-dark-tertiary rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-text-muted-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <span className="text-text-muted-dark text-xs">{item.lastStudy}</span>
                    </div>
                    <button className="px-4 py-1.5 bg-accent-purple text-white text-xs font-bold rounded-lg shadow-md">
                      Iniciar
                    </button>
                  </div>
                </div>
              ))}

              {/* Card para adicionar novo tópico */}
              <div className="bg-bg-dark-secondary p-4 rounded-2xl border border-dashed border-accent-purple/30 flex items-center justify-center h-20 cursor-pointer hover:bg-bg-dark-tertiary transition-colors duration-200">
                <div className="flex items-center space-x-2 text-accent-purple">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span className="font-bold text-sm">Adicionar Novo Estudo</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Conteúdo da Aba Amigos */}
        {activeTab === 'measurements' && (
          <div className="space-y-6">
            {/* Barra de busca */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Buscar amigos..."
                className="w-full bg-bg-dark-secondary border border-border-dark text-text-light py-3 px-4 pr-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-purple/50"
              />
              <svg className="w-5 h-5 text-text-muted-dark absolute right-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>

            {/* Amigos Sugeridos */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-text-light">Sugestões para Você</h2>
                <button className="text-accent-purple text-xs font-bold">
                  Ver todos
                </button>
              </div>

              <div className="flex space-x-4 overflow-x-auto pb-2">
                {friendActivities.slice(0, 4).map((friend) => (
                  <div
                    key={friend.id}
                    className="flex-shrink-0 w-32 bg-bg-dark-secondary p-3 rounded-2xl flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-accent-purple rounded-full flex items-center justify-center text-white text-xl mb-2 shadow-inner">
                      {friend.avatar}
                    </div>
                    <h3 className="text-text-light font-bold text-sm text-center">{friend.name.split(' ')[0]}</h3>
                    <p className="text-text-muted-dark text-xs text-center truncate w-full">{friend.activity.split(' ').slice(0, 3).join(' ')}</p>
                    <button className="mt-2 w-full py-1.5 bg-accent-purple text-white text-xs font-bold rounded-lg shadow-md">
                      Seguir
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Lista de Amigos */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-text-light">Seus Amigos</h2>
                <span className="text-accent-purple text-xs font-bold bg-accent-purple/10 px-3 py-1 rounded-full">
                  {friendActivities.length} amigos
                </span>
              </div>

              <div className="space-y-3">
                {friendActivities.map((friend) => (
                  <div
                    key={friend.id}
                    className="bg-bg-dark-secondary p-3 rounded-2xl shadow-lg border border-border-dark flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner">
                        {friend.avatar}
                      </div>
                      <div>
                        <h3 className="text-text-light font-bold">{friend.name}</h3>
                        <p className="text-text-muted-dark text-xs">{friend.activity}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="w-8 h-8 bg-bg-dark-tertiary rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-text-muted-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                      </button>
                      <button className="w-8 h-8 bg-accent-purple rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Conteúdo da Aba Perfil */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            {/* Perfil do Usuário */}
            <div className="bg-bg-dark-secondary p-5 rounded-2xl shadow-lg border border-border-dark mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-accent-purple rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-inner">
                  {currentUser?.name?.charAt(0) || 'JD'}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text-light">{currentUser?.name || 'João Doe'}</h2>
                  <p className="text-text-muted-dark text-sm">Estudante de Programação</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="px-2 py-0.5 bg-accent-purple/20 rounded-md flex items-center space-x-1">
                      <svg className="w-3 h-3 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="text-xs font-bold text-accent-purple">Nível 8</span>
                    </div>
                    <div className="px-2 py-0.5 bg-accent-purple/20 rounded-md flex items-center space-x-1">
                      <svg className="w-3 h-3 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <span className="text-xs font-bold text-accent-purple">120 pontos</span>
                    </div>
                  </div>
                </div>
                <button className="ml-auto px-3 py-1.5 bg-accent-purple rounded-lg text-white text-xs font-bold shadow-md">
                  Editar Perfil
                </button>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-bg-dark-secondary p-4 rounded-2xl shadow-lg border border-border-dark">
                <h3 className="text-sm font-bold text-text-muted-dark mb-2">Total de Estudos</h3>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-text-light">42h</span>
                  <span className="text-xs text-accent-purple font-bold">+15% esta semana</span>
                </div>
              </div>
              <div className="bg-bg-dark-secondary p-4 rounded-2xl shadow-lg border border-border-dark">
                <h3 className="text-sm font-bold text-text-muted-dark mb-2">Sequência Atual</h3>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-text-light">7 dias</span>
                  <span className="text-xs text-accent-purple font-bold">Recorde: 14 dias</span>
                </div>
              </div>
            </div>

            {/* Conquistas */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-text-light">Suas Conquistas</h2>
                <div className="text-accent-purple text-xs font-bold bg-accent-purple/10 px-3 py-1 rounded-full">
                  12 Conquistas
                </div>
              </div>

              <div className="space-y-3">
                {/* Conquista desbloqueada 1 */}
                <div className="p-3 rounded-2xl bg-bg-dark-secondary shadow-lg border border-border-dark flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center text-2xl">
                    🌟
                  </div>
                  <div>
                    <h4 className="text-text-light font-bold">Início Brilhante</h4>
                    <p className="text-text-muted-dark text-xs">Complete seu primeiro estudo.</p>
                  </div>
                </div>
                {/* Conquista desbloqueada 2 */}
                <div className="p-3 rounded-2xl bg-bg-dark-secondary shadow-lg border border-border-dark flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-purple rounded-full flex items-center justify-center text-2xl">
                    🔥
                  </div>
                  <div>
                    <h4 className="text-text-light font-bold">Primeira Sequência</h4>
                    <p className="text-text-muted-dark text-xs">Estude por 3 dias seguidos.</p>
                  </div>
                </div>
                {/* Conquista bloqueada */}
                <div className="p-3 rounded-2xl bg-bg-dark-secondary/50 shadow-lg border border-dashed border-border-dark flex items-center space-x-4 opacity-50">
                  <div className="w-12 h-12 bg-bg-dark-tertiary rounded-full flex items-center justify-center text-2xl">
                    🔒
                  </div>
                  <div>
                    <h4 className="text-text-muted-dark font-bold">Maratonista</h4>
                    <p className="text-text-muted-dark text-xs">Estude por 100 horas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}