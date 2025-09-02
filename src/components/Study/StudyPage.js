// src/components/Study/StudyPage.js
import React, { useState } from 'react';
import { usePomodoro } from '../../contexts/PomodoroContext';

export default function StudyPage() {
  const { 
    minutes, 
    seconds, 
    isActive, 
    isBreak, 
    message, 
    showPomodoro,
    activeStudy,
    startTimer, 
    pauseTimer, 
    resetTimer, 
    toggleBreak, 
    startStudy,
    endStudy,
    formatTime 
  } = usePomodoro();
  
  const [studyTitle, setStudyTitle] = useState('');
  const [studyDescription, setStudyDescription] = useState('');
  
  const handleStartStudy = () => {
    if (studyTitle.trim() === '') return;
    
    const newStudy = {
      id: Date.now().toString(),
      title: studyTitle,
      description: studyDescription,
      startTime: new Date().toISOString(),
      lastSession: new Date().toISOString(),
      totalTimeMinutes: 0,
      progress: 0
    };
    
    startStudy(newStudy);
    setStudyTitle('');
    setStudyDescription('');
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center p-4 md:p-6 lg:p-8 bg-bg-dark-primary">
      {/* Formulário para iniciar um novo estudo */}
      {!showPomodoro && (
        <div className="bg-bg-dark-secondary p-8 rounded-xl shadow-custom-dark-lg border border-border-dark w-full max-w-md animate-fade-in mb-8">
          <h2 className="text-3xl font-bold text-accent-purple mb-6 font-inter text-center">
            Iniciar Novo Estudo
          </h2>
          
          <div className="mb-4">
            <label htmlFor="studyTitle" className="block text-text-light mb-2 font-medium">
              Título do Estudo *
            </label>
            <input
              type="text"
              id="studyTitle"
              value={studyTitle}
              onChange={(e) => setStudyTitle(e.target.value)}
              className="w-full p-3 bg-bg-dark-tertiary border border-border-dark rounded-lg text-text-light focus:outline-none focus:ring-2 focus:ring-accent-purple"
              placeholder="Ex: Desenvolvimento Web"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="studyDescription" className="block text-text-light mb-2 font-medium">
              Descrição (opcional)
            </label>
            <textarea
              id="studyDescription"
              value={studyDescription}
              onChange={(e) => setStudyDescription(e.target.value)}
              className="w-full p-3 bg-bg-dark-tertiary border border-border-dark rounded-lg text-text-light focus:outline-none focus:ring-2 focus:ring-accent-purple min-h-[100px]"
              placeholder="Descreva o que você vai estudar..."
            />
          </div>
          
          <button
            onClick={handleStartStudy}
            disabled={!studyTitle.trim()}
            className={`w-full px-6 py-3 font-semibold rounded-full shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-105 ${studyTitle.trim() ? 'bg-accent-purple-dark hover:bg-accent-purple text-text-light' : 'bg-bg-dark-hover text-text-muted-dark cursor-not-allowed'}`}
          >
            Iniciar Estudo
          </button>
        </div>
      )}
      
      {/* Card do Pomodoro */}
      {showPomodoro && (
        <div className="bg-bg-dark-secondary p-8 rounded-xl shadow-custom-dark-lg border border-border-dark w-full max-w-md text-center animate-fade-in">
          {activeStudy && (
            <div className="mb-4 text-left">
              <h3 className="text-xl font-bold text-accent-purple">{activeStudy.title}</h3>
              {activeStudy.description && (
                <p className="text-text-muted-dark text-sm mt-1">{activeStudy.description}</p>
              )}
              <div className="mt-4 mb-2 border-t border-border-dark pt-4"></div>
            </div>
          )}
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-accent-purple mb-6 font-inter">
            Pomodoro
          </h2>
          <p className="text-lg text-text-muted-dark mb-6">
            Foque no seu estudo com o método Pomodoro.
          </p>

          {message && (
            <div className={`mb-6 p-4 rounded-md text-center font-medium ${message.includes('Concluído') || message.includes('Encerrada') ? 'bg-success-green' : 'bg-info-blue'} text-text-light animate-fade-in`}>
              {message}
            </div>
          )}

          <div className="text-7xl md:text-8xl font-bold text-text-light mb-8 font-mono">
            {formatTime(minutes)}:{formatTime(seconds)}
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            {!isActive && (
              <button
                onClick={startTimer}
                className="px-6 py-3 bg-accent-purple-dark hover:bg-accent-purple text-text-light font-semibold rounded-full shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
              >
                Iniciar
              </button>
            )}
            {isActive && (
              <button
                onClick={pauseTimer}
                className="px-6 py-3 bg-error-red hover:bg-red-700 text-text-light font-semibold rounded-full shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
              >
                Pausar
              </button>
            )}
            <button
              onClick={resetTimer}
              className="px-6 py-3 bg-bg-dark-hover hover:bg-bg-dark-tertiary text-text-light font-semibold rounded-full shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
            >
              Resetar
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <button
              onClick={() => toggleBreak(false)}
              className="px-4 py-2 bg-info-blue hover:bg-blue-700 text-text-light text-sm font-semibold rounded-full shadow-custom-dark transition duration-300 ease-in-out w-full sm:w-auto"
            >
              Pausa Curta (5min)
            </button>
            <button
              onClick={() => toggleBreak(true)}
              className="px-4 py-2 bg-accent-purple-light hover:bg-accent-purple text-text-light text-sm font-semibold rounded-full shadow-custom-dark transition duration-300 ease-in-out w-full sm:w-auto"
            >
              Pausa Longa (15min)
            </button>
          </div>
          
          <button
            onClick={endStudy}
            className="px-6 py-3 bg-error-red hover:bg-red-700 text-text-light font-semibold rounded-full shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-105 w-full"
          >
            Encerrar Estudo
          </button>
        </div>
      )}
    </div>
  );
}
