import React, { useState, useEffect } from 'react';
import LoginPage from './components/Auth/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import ExplorePage from './components/Explore/ExplorePage';
import StudyPage from './components/Study/StudyPage';
import ProgressPage from './components/Progress/ProgressPage';
import ProfilePage from './components/Profile/ProfilePage';
import StudySummaryPage from './components/StudySummary/StudySummaryPage';
import StudyTopicDetailPage from './components/StudySummary/StudyTopicDetailPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PomodoroProvider } from './contexts/PomodoroContext';
import { StudyProvider } from './contexts/StudyContext'; 

export default function App() {
  return (
    <AuthProvider>
      <StudyProvider>
        <PomodoroProvider>
          <AppContent />
        </PomodoroProvider>
      </StudyProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { isLoggedIn, logout, currentUser, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedStudyTopic, setSelectedStudyTopic] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoginSuccess = () => {
    setActiveSection('dashboard');
  };

  const handleLogout = () => {
    logout();
    setActiveSection('dashboard');
  };

  const handleSelectStudyTopic = (topic) => {
    setSelectedStudyTopic(topic);
    setActiveSection('study-topic-detail');
  };

  const handleBackToStudySummary = () => {
    setSelectedStudyTopic(null);
    setActiveSection('study-summary');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-dark-primary flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-accent-purple border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-text-light text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-bg-dark-primary text-text-light flex flex-col font-inter antialiased">
      <header className="bg-bg-dark-secondary p-4 shadow-custom-dark flex justify-between items-center border-b border-border-dark">
        <h1 className="text-3xl md:text-4xl font-extrabold text-accent-purple tracking-wide">Estuda+</h1>
        {!isMobile && (
          <nav className="flex-grow flex justify-center space-x-8">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`px-4 py-2 rounded-md text-lg font-semibold transition duration-300 ease-in-out ${
                activeSection === 'dashboard'
                  ? 'bg-accent-purple-dark text-text-light shadow-md'
                  : 'text-text-muted-dark hover:text-accent-purple-light hover:bg-bg-dark-tertiary'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => setActiveSection('explore')}
              className={`px-4 py-2 rounded-md text-lg font-semibold transition duration-300 ease-in-out ${
                activeSection === 'explore'
                  ? 'bg-accent-purple-dark text-text-light shadow-md'
                  : 'text-text-muted-dark hover:text-accent-purple-light hover:bg-bg-dark-tertiary'
              }`}
            >
              Explorar
            </button>
            <button
              onClick={() => setActiveSection('study')}
              className={`px-4 py-2 rounded-md text-lg font-semibold transition duration-300 ease-in-out ${
                activeSection === 'study'
                  ? 'bg-accent-purple-dark text-text-light shadow-md'
                  : 'text-text-muted-dark hover:text-accent-purple-light hover:bg-bg-dark-tertiary'
              }`}
            >
              Estudar
            </button>
            <button
              onClick={() => setActiveSection('progress')}
              className={`px-4 py-2 rounded-md text-lg font-semibold transition duration-300 ease-in-out ${
                activeSection === 'progress'
                  ? 'bg-accent-purple-dark text-text-light shadow-md'
                  : 'text-text-muted-dark hover:text-accent-purple-light hover:bg-bg-dark-tertiary'
              }`}
            >
              Progresso
            </button>
            <button
              onClick={() => setActiveSection('study-summary')}
              className={`px-4 py-2 rounded-md text-lg font-semibold transition duration-300 ease-in-out ${
                activeSection === 'study-summary' || activeSection === 'study-topic-detail' // Highlight if on summary or detail page
                  ? 'bg-accent-purple-dark text-text-light shadow-md'
                  : 'text-text-muted-dark hover:text-accent-purple-light hover:bg-bg-dark-tertiary'
              }`}
            >
              Meus Resumos
            </button>
            <button
              onClick={() => setActiveSection('profile')}
              className={`px-4 py-2 rounded-md text-lg font-semibold transition duration-300 ease-in-out ${
                activeSection === 'profile'
                  ? 'bg-accent-purple-dark text-text-light shadow-md'
                  : 'text-text-muted-dark hover:text-accent-purple-light hover:bg-bg-dark-tertiary'
              }`}
            >
              Você
            </button>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {currentUser && (
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 bg-accent-purple rounded-full flex items-center justify-center text-sm font-bold text-text-light">
                {currentUser.name.charAt(0)}
              </div>
              <span className="text-text-light">{currentUser.name}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-accent-purple-dark hover:bg-accent-purple text-text-light font-semibold rounded-full shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-105"
          >
            Sair
          </button>
        </div>
      </header>

      <main className={`flex-grow p-4 md:p-6 lg:p-8 ${isMobile ? 'pb-20' : ''} overflow-y-auto`}>
        {activeSection === 'dashboard' && <Dashboard />}
        {activeSection === 'explore' && <ExplorePage />}
        {activeSection === 'study' && <StudyPage />}
        {activeSection === 'progress' && <ProgressPage />}
        {activeSection === 'study-summary' && <StudySummaryPage onSelectTopic={handleSelectStudyTopic} />} {/* Pass the handler */}
        {activeSection === 'study-topic-detail' && ( // NEW: Render detail page
          <StudyTopicDetailPage topicData={selectedStudyTopic} onBack={handleBackToStudySummary} />
        )}
        {activeSection === 'profile' && <ProfilePage />}
      </main>

      {isMobile && (
        <footer className="fixed bottom-0 left-0 w-full bg-bg-dark-secondary border-t border-border-dark shadow-custom-dark-lg z-50">
          <nav className="flex justify-around items-center h-16">
            <button
              onClick={() => { setActiveSection('dashboard'); setSelectedStudyTopic(null); }} // Clear on dashboard
              className={`flex flex-col items-center justify-center text-xs font-medium w-1/5 py-1 rounded-md transition-colors duration-200 ${
                activeSection === 'dashboard' ? 'text-accent-purple' : 'text-text-muted-dark hover:text-accent-purple-light'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7m-10-7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1h3v-3a2 2 0 012-2h2a2 2 0 012 2v3h3a1 1 0 001-1v-9.666a1 1 0 00-.5-.866l-7-4a1 1 0 00-1 0l-7 4a1 1 0 00-.5.866V12z"></path></svg>
              Início
            </button>
            <button
              onClick={() => { setActiveSection('explore'); setSelectedStudyTopic(null); }} // Clear on explore
              className={`flex flex-col items-center justify-center text-xs font-medium w-1/5 py-1 rounded-md transition-colors duration-200 ${
                activeSection === 'explore' ? 'text-accent-purple' : 'text-text-muted-dark hover:text-accent-purple-light'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              Explorar
            </button>
            <button
              onClick={() => { setActiveSection('study'); setSelectedStudyTopic(null); }} // Clear on study
              className={`flex flex-col items-center justify-center text-xs font-medium w-1/5 py-1 rounded-md transition-colors duration-200 ${
                activeSection === 'study' ? 'text-accent-purple' : 'text-text-muted-dark hover:text-accent-purple-light'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Estudar
            </button>
            <button
              onClick={() => { setActiveSection('progress'); setSelectedStudyTopic(null); }} // Clear on progress
              className={`flex flex-col items-center justify-center text-xs font-medium w-1/5 py-1 rounded-md transition-colors duration-200 ${
                activeSection === 'progress' ? 'text-accent-purple' : 'text-text-muted-dark hover:text-accent-purple-light'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3m0 0l3 3m-3-3v8m-10-4a8 8 0 1116 0 8 8 0 01-16 0z"></path></svg>
              Progresso
            </button>
            {/* NEW: Botão para a página de Resumo de Estudos (Mobile) */}
            <button
              onClick={() => { setActiveSection('study-summary'); setSelectedStudyTopic(null); }} // Clear on study-summary
              className={`flex flex-col items-center justify-center text-xs font-medium w-1/5 py-1 rounded-md transition-colors duration-200 ${
                activeSection === 'study-summary' || activeSection === 'study-topic-detail' ? 'text-accent-purple' : 'text-text-muted-dark hover:text-accent-purple-light'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Resumos
            </button>
            <button
              onClick={() => { setActiveSection('profile'); setSelectedStudyTopic(null); }} // Clear on profile
              className={`flex flex-col items-center justify-center text-xs font-medium w-1/5 py-1 rounded-md transition-colors duration-200 ${
                activeSection === 'profile' ? 'text-accent-purple' : 'text-text-muted-dark hover:text-accent-purple-light'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Você
            </button>
          </nav>
        </footer>
      )}
    </div>
  );
}
