// src/components/Dashboard/Dashboard.js
import React, { useState } from 'react';

// Componente para simular um pequeno gráfico de linha usando SVG com área preenchida
const MiniGraph = ({ color = 'var(--accent-purple)' }) => {
  const points = [
    { x: 0, y: 80 }, { x: 20, y: 40 }, { x: 40, y: 70 },
    { x: 60, y: 30 }, { x: 80, y: 60 }, { x: 100, y: 20 },
  ];
  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');
  const areaPoints = `0,100 ${polylinePoints} 100,100`;

  return (
    <div className="w-24 h-8 flex-shrink-0 ml-4">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
        <polygon fill="url(#graphGradient)" points={areaPoints} />
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={polylinePoints}
        />
      </svg>
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const studyItems = [
    { id: 1, title: 'Revisão de React Hooks', detail: '2h de estudo', progress: 'Avançado', icon: (
        <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
      ) },
    { id: 2, title: 'Algoritmos e Estruturas de Dados', detail: 'Próxima sessão: Seg', progress: 'Intermediário', icon: (
        <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2v-7a2 2 0 012-2h2a2 2 0 012 2v7a2 2 0 002 2h2a2 2 0 002-2v-9a2 2 0 00-2-2H9a2 2 0 00-2 2"></path></svg>
      ) },
    { id: 3, title: 'Spring Boot para Backend', detail: '1 dia atrás', progress: 'Iniciante', icon: (
        <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
      ) },
    { id: 4, title: 'Design Patterns em Java', detail: 'Progresso: 70%', progress: 'Avançado', icon: (
        <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
      ) },
  ];

  const friendActivities = [
    { id: 1, name: 'João Silva', activity: 'estudou 2h de JavaScript', time: '5 min atrás', avatar: 'JS' },
    { id: 2, name: 'Maria Souza', activity: 'conquistou "Master em Python"', time: '1h atrás', avatar: 'Py' },
    { id: 3, name: 'Pedro Alves', activity: 'iniciou um Pomodoro de Java', time: '3h atrás', avatar: 'Ja' },
    { id: 4, name: 'Ana Costa', activity: 'revisou CSS Grid', time: 'Ontem', avatar: 'CS' },
  ];

  // Novo dado para o resumo dos seus estudos
  const yourStudySummary = [
    { id: 1, topic: 'Desenvolvimento Web', time: '3h 15min', lastSession: 'Hoje', progress: '85%', avatar: 'W' },
    { id: 2, topic: 'Estruturas de Dados', time: '2h 00min', lastSession: 'Ontem', progress: '60%', avatar: 'D' },
    { id: 3, topic: 'Inteligência Artificial', time: '1h 45min', lastSession: '2 dias atrás', progress: '40%', avatar: 'AI' },
    { id: 4, topic: 'Design UX/UI', time: '1h 00min', lastSession: '3 dias atrás', progress: '25%', avatar: 'UX' },
  ];

  return (
    // Container principal do Dashboard com fundo escuro
    <div className="p-4 md:p-6 lg:p-8 bg-bg-dark-primary rounded-lg">
      {/* Abas Superiores (Visão Geral, Meus Estudos, Amigos, Conquistas) */}
      <div className="flex justify-around bg-bg-dark-secondary rounded-lg p-1 mb-6 shadow-custom-dark border border-border-dark">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 text-center text-text-light text-sm md:text-base font-semibold rounded-md transition-all duration-200 ${
            activeTab === 'overview' ? 'bg-accent-purple-dark text-text-light shadow-inner' : 'hover:bg-bg-dark-tertiary text-text-muted-dark'
          }`}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setActiveTab('exercises')}
          className={`flex-1 py-2 text-center text-text-light text-sm md:text-base font-semibold rounded-md transition-all duration-200 ${
            activeTab === 'exercises' ? 'bg-accent-purple-dark text-text-light shadow-inner' : 'hover:bg-bg-dark-tertiary text-text-muted-dark'
          }`}
        >
          Meus Estudos
        </button>
        <button
          onClick={() => setActiveTab('measurements')}
          className={`flex-1 py-2 text-center text-text-light text-sm md:text-base font-semibold rounded-md transition-all duration-200 ${
            activeTab === 'measurements' ? 'bg-accent-purple-dark text-text-light shadow-inner' : 'hover:bg-bg-dark-tertiary text-text-muted-dark'
          }`}
        >
          Amigos
        </button>
        <button
          onClick={() => setActiveTab('photos')}
          className={`flex-1 py-2 text-center text-text-light text-sm md:text-base font-semibold rounded-md transition-all duration-200 ${
            activeTab === 'photos' ? 'bg-accent-purple-dark text-text-light shadow-inner' : 'hover:bg-bg-dark-tertiary text-text-muted-dark'
          }`}
        >
          Conquistas
        </button>
      </div>

      {/* Conteúdo da Aba Visão Geral */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coluna Esquerda: Card Principal de Resumo Diário e Seu Resumo de Estudos */}
          <div className="flex flex-col gap-6">
            {/* Card Principal de Resumo Diário com Gráfico Maior */}
            <div className="bg-bg-dark-secondary p-6 rounded-lg shadow-custom-dark border border-border-dark flex flex-col justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-accent-purple mb-4">Seu Resumo Diário</h2>
                <p className="text-text-light text-base md:text-lg mb-2">
                  Você estudou <span className="font-bold text-accent-purple">1h 30min</span> hoje!
                </p>
                <p className="text-text-muted-dark text-sm md:text-base">Mantenha o bom trabalho e explore novos tópicos.</p>
              </div>
              <div className="mt-6 h-32 w-full">
                {/* Gráfico maior para o resumo diário */}
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <linearGradient id="largeGraphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity="0"/>
                  </linearGradient>
                  <polygon fill="url(#largeGraphGradient)" points="0,100 10,60 20,80 30,50 40,70 50,40 60,60 70,30 80,50 90,20 100,40 100,100" />
                  <polyline
                    fill="none"
                    stroke="var(--accent-purple)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="0,80 10,60 20,80 30,50 40,70 50,40 60,60 70,30 80,50 90,20 100,40"
                  />
                </svg>
              </div>
              <button className="mt-6 px-5 py-2 bg-accent-purple-dark hover:bg-accent-purple text-text-light font-semibold rounded-md shadow-custom-dark transition duration-300 text-sm md:text-base">
                Iniciar Novo Estudo
              </button>
            </div>

            {/* Seu Resumo de Estudos (Nova Seção) */}
            <div className="bg-bg-dark-secondary p-6 rounded-lg shadow-custom-dark border border-border-dark">
              <h3 className="text-lg md:text-xl font-bold text-accent-purple mb-4">Seu Resumo de Estudos</h3>
              <div className="divide-y divide-border-dark">
                {yourStudySummary.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 hover:bg-bg-dark-tertiary transition duration-200 rounded-md px-2 -mx-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-bg-dark-tertiary rounded-full flex items-center justify-center text-sm font-bold text-accent-purple mr-3 flex-shrink-0">
                        {item.avatar}
                      </div>
                      <div>
                        <p className="text-text-light font-medium text-sm md:text-base">{item.topic}</p>
                        <p className="text-text-muted-dark text-xs md:text-sm">Última sessão: {item.lastSession}</p>
                      </div>
                    </div>
                    <span className="text-text-muted-dark text-xs md:text-sm">{item.time} ({item.progress})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna Direita: Atividade Recente dos Amigos */}
          <div className="bg-bg-dark-secondary p-6 rounded-lg shadow-custom-dark border border-border-dark">
            <h3 className="text-lg md:text-xl font-bold text-text-light mb-4">Atividade Recente dos Amigos</h3>
            <div className="divide-y divide-border-dark">
              {friendActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-3 hover:bg-bg-dark-tertiary transition duration-200 rounded-md px-2 -mx-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-bg-dark-tertiary rounded-full flex items-center justify-center text-sm font-bold text-accent-purple mr-3 flex-shrink-0">
                      {activity.avatar}
                    </div>
                    <div>
                      <p className="text-text-light font-medium text-sm md:text-base">{activity.name}</p>
                      <p className="text-text-muted-dark text-xs md:text-sm">{activity.activity}</p>
                    </div>
                  </div>
                  <span className="text-text-muted-dark text-xs md:text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba Meus Estudos (Lista de Tópicos) */}
      {activeTab === 'exercises' && (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-accent-purple mb-4">Seus Tópicos de Estudo</h2>
          <div className="bg-bg-dark-secondary rounded-lg shadow-custom-dark border border-border-dark divide-y divide-border-dark">
            {studyItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 hover:bg-bg-dark-tertiary transition duration-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-text-light font-medium text-sm md:text-base">{item.title}</p>
                    <p className="text-text-muted-dark text-xs md:text-sm">{item.detail}</p>
                  </div>
                </div>
                <MiniGraph color="var(--accent-purple)" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo das Abas em Construção (Apenas para demonstração, as páginas reais serão carregadas via App.js) */}
      {activeTab === 'measurements' && (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center text-xl md:text-2xl text-text-muted-dark bg-bg-dark-secondary p-10 rounded-xl shadow-custom-dark-lg border border-border-dark animate-pulse-subtle">
            Página de Amigos detalhada em construção...
          </div>
        </div>
      )}

      {activeTab === 'photos' && (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center text-xl md:text-2xl text-text-muted-dark bg-bg-dark-secondary p-10 rounded-xl shadow-custom-dark-lg border border-border-dark animate-pulse-subtle">
            Página de Conquistas detalhada em construção...
          </div>
        </div>
      )}
    </div>
  );
}
