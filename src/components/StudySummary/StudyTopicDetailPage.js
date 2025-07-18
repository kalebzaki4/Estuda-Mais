// src/components/StudySummary/StudyTopicDetailPage.js
import React from 'react';

export default function StudyTopicDetailPage({ topicData, onBack }) {
  if (!topicData) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 bg-bg-dark-primary">
        <div className="bg-bg-dark-secondary p-8 rounded-xl shadow-custom-dark-lg border border-border-dark text-center text-text-muted-dark animate-fade-in">
          <p className="text-xl">Nenhum tópico de estudo selecionado.</p>
          <button
            onClick={onBack}
            className="mt-6 px-6 py-3 bg-accent-purple-dark hover:bg-accent-purple text-text-light font-semibold rounded-full shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-105"
          >
            Voltar para Meus Resumos
          </button>
        </div>
      </div>
    );
  }

  return (
    // Main container for the study topic detail page with dark background
    <div className="min-h-[calc(100vh-160px)] p-4 md:p-6 lg:p-8 bg-bg-dark-primary text-text-light">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-accent-purple hover:text-accent-purple-light transition duration-200"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Voltar para Meus Resumos
      </button>

      {/* Header section with topic title and avatar */}
      <div className="bg-bg-dark-secondary p-8 rounded-xl shadow-custom-dark-lg border border-border-dark mb-8 animate-fade-in">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-accent-purple-dark rounded-full flex items-center justify-center text-3xl font-bold text-text-light flex-shrink-0 mr-6">
            {topicData.avatar}
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-accent-purple font-inter">
              {topicData.topic}
            </h2>
            <p className="text-lg text-text-muted-dark mt-2">Última sessão: {topicData.lastSession}</p>
          </div>
        </div>
        <p className="text-text-light text-base leading-relaxed mt-4">
          {topicData.description}
        </p>
      </div>

      {/* Key Metrics Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in delay-100">
        <div className="bg-bg-dark-tertiary p-6 rounded-lg shadow-custom-dark border border-border-dark text-center">
          <p className="text-text-muted-dark text-sm">Tempo Total de Estudo</p>
          <p className="text-accent-purple text-4xl font-extrabold mt-2">{topicData.time}</p>
        </div>
        <div className="bg-bg-dark-tertiary p-6 rounded-lg shadow-custom-dark border border-border-dark text-center">
          <p className="text-text-muted-dark text-sm">Progresso Geral</p>
          <p className="text-info-blue text-4xl font-extrabold mt-2">{topicData.progress}</p>
        </div>
        <div className="bg-bg-dark-tertiary p-6 rounded-lg shadow-custom-dark border border-border-dark text-center">
          <p className="text-text-muted-dark text-sm">Sessões Concluídas</p>
          <p className="text-text-light text-4xl font-extrabold mt-2">{topicData.sessionsCompleted || 'N/A'}</p>
        </div>
      </section>

      {/* Recent Activities Section */}
      {topicData.recentActivities && topicData.recentActivities.length > 0 && (
        <section className="bg-bg-dark-secondary p-8 rounded-xl shadow-custom-dark-lg border border-border-dark mb-8 animate-fade-in delay-200">
          <h3 className="text-2xl font-bold text-text-light mb-6 font-inter">Atividades Recentes</h3>
          <div className="divide-y divide-border-dark">
            {topicData.recentActivities.map((activity, index) => (
              <div key={index} className="flex justify-between items-center py-3 hover:bg-bg-dark-tertiary transition duration-200 rounded-md px-2 -mx-2">
                <div>
                  <p className="text-text-light font-medium">{activity.date}</p>
                  <p className="text-text-muted-dark text-sm">{activity.duration} - {activity.whatWasStudied}</p>
                </div>
                <span className="text-text-muted-dark text-xs">{activity.type}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* YouTube Links Section */}
      {topicData.youtubeLinks && topicData.youtubeLinks.length > 0 && (
        <section className="bg-bg-dark-secondary p-8 rounded-xl shadow-custom-dark-lg border border-border-dark animate-fade-in delay-300">
          <h3 className="text-2xl font-bold text-text-light mb-6 font-inter">Recursos no YouTube</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topicData.youtubeLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-dark-tertiary p-4 rounded-lg shadow-md border border-border-dark flex items-center space-x-3 hover:bg-bg-dark-hover transition duration-200 group"
              >
                <svg className="w-8 h-8 text-error-red group-hover:text-accent-purple transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.5 12.497c0 .769-.619 1.389-1.389 1.389-1.077 0-3.529-.001-6.111-.001-2.583 0-5.034 0-6.111.001-.77 0-1.389-.62-1.389-1.389 0-.77.619-1.389 1.389-1.389 1.077 0 3.529 0 6.111 0 2.583 0 5.034 0 6.111 0 .77 0 1.389.619 1.389 1.389zm-10.875-2.031l4.896 2.031-4.896 2.031v-4.062z"/></svg>
                <div>
                  <p className="text-text-light font-semibold">{link.title}</p>
                  <p className="text-text-muted-dark text-xs truncate">{link.url}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
