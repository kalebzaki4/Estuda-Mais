// src/components/StudySummary/StudySummaryPage.js
import React from 'react';
import { useStudy } from '../../contexts/StudyContext';

export default function StudySummaryPage({ onSelectTopic }) { // Recebe onSelectTopic como prop
  const { studies, loading } = useStudy();
  
  // Função para formatar o tempo total em horas e minutos
  const formatTotalTime = (totalMinutes) => {
    if (!totalMinutes) return '0min';
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes > 0 ? `${minutes}min` : ''}`;
    }
    return `${minutes}min`;
  };
  
  // Função para formatar a data da última sessão
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
  
  // Função para obter a inicial do tópico para o avatar
  const getTopicInitial = (title) => {
    if (!title) return '?';
    return title.charAt(0).toUpperCase();
  };

  return (
    // Main container for the study summary page with dark background
    <div className="min-h-[calc(100vh-160px)] p-4 md:p-6 lg:p-8 bg-bg-dark-primary">
      <h2 className="text-4xl md:text-5xl font-extrabold text-accent-purple mb-8 text-center font-inter animate-fade-in">
        Seu Resumo de Estudos
      </h2>
      <p className="text-lg md:text-xl text-text-muted-dark mb-12 text-center max-w-3xl mx-auto animate-fade-in delay-100">
        Aqui você encontra um panorama detalhado de todo o seu progresso e tempo dedicado aos estudos.
      </p>

      {/* Grid for study summary cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in delay-200">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-accent-purple border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-text-light text-lg">Carregando estudos...</p>
            </div>
          </div>
        ) : studies.length > 0 ? (
          studies.map((study) => {
            // Preparar os dados para exibição
            const studyItem = {
              id: study.id,
              topic: study.title,
              lastSession: formatLastSession(study.lastSession),
              time: formatTotalTime(study.totalTimeMinutes),
              progress: `${study.progress || 0}%`,
              avatar: getTopicInitial(study.title),
              description: study.description || 'Sem descrição disponível.',
              startTime: study.startTime,
              totalTimeMinutes: study.totalTimeMinutes || 0,
              // Campos adicionais para compatibilidade com a página de detalhes
              sessionsCompleted: 0,
              recentActivities: [],
              youtubeLinks: []
            };
            
            return (
              <div
                key={studyItem.id}
                onClick={() => onSelectTopic(studyItem)}
                className="bg-bg-dark-secondary p-6 rounded-xl shadow-custom-dark border border-border-dark flex flex-col items-start transform transition duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <div className="flex items-center mb-4 w-full">
                  {/* Avatar/Icon for the topic */}
                  <div className="w-12 h-12 bg-accent-purple-dark rounded-full flex items-center justify-center text-xl font-bold text-text-light flex-shrink-0 mr-4">
                    {studyItem.avatar}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-text-light mb-1">{studyItem.topic}</h3>
                    <p className="text-text-muted-dark text-sm">Última sessão: {studyItem.lastSession}</p>
                  </div>
                </div>
                <div className="w-full flex justify-between items-end mt-auto pt-4 border-t border-border-dark">
                  {/* Study time and progress */}
                  <div className="text-left">
                    <p className="text-text-light text-lg font-semibold">Tempo Total:</p>
                    <p className="text-accent-purple text-2xl font-extrabold">{studyItem.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-text-light text-lg font-semibold">Progresso:</p>
                    <p className="text-info-blue text-2xl font-extrabold">{studyItem.progress}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-bg-dark-secondary p-8 rounded-xl shadow-custom-dark border border-border-dark text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-text-muted-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <h3 className="text-2xl font-bold text-text-light mb-2">Nenhum estudo encontrado</h3>
            <p className="text-text-muted-dark mb-6">Você ainda não iniciou nenhum estudo. Vá para a seção "Estudar" para começar.</p>
          </div>
        )}
      </section>

      <div className="text-center mt-12 animate-fade-in delay-300">
        <button className="px-8 py-4 bg-accent-purple-dark hover:bg-accent-purple text-text-light font-semibold rounded-full shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-105">
          Ver Relatório Completo
        </button>
      </div>
    </div>
  );
}
