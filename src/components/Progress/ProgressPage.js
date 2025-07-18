// src/components/Progress/ProgressPage.js
import React from 'react';

// Componente para um card de métrica
const MetricCard = ({ title, value, unit, icon, color }) => (
  // Fundo do card escuro
  <div className={`bg-bg-dark-tertiary p-6 rounded-lg shadow-custom-dark border border-border-dark flex flex-col items-center justify-center text-center transform transition duration-300 hover:scale-105`}>
    <div className={`text-4xl mb-3 ${color}`}>{icon}</div>
    <h4 className="text-xl font-bold text-text-light mb-1 font-inter">{title}</h4>
    <p className="text-4xl font-extrabold text-accent-purple">{value}<span className="text-lg font-medium text-text-muted-dark ml-1">{unit}</span></p>
  </div>
);

// Componente para uma barra de progresso simples
const ProgressBar = ({ label, progress, color }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <span className="text-text-light text-sm font-medium">{label}</span>
      <span className="text-text-muted-dark text-sm">{progress}%</span>
    </div>
    <div className="w-full bg-border-dark rounded-full h-2">
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

export default function ProgressPage() {
  const achievements = [
    { id: 1, title: 'Primeiro Pomodoro', description: 'Completou sua primeira sessão de estudo de 25 minutos.', icon: '⏰' },
    { id: 2, title: 'Explorador de Cursos', description: 'Visitou mais de 10 páginas de cursos diferentes.', icon: '🗺️' },
    { id: 3, title: 'Mestre da Consistência', description: 'Estudou por 7 dias consecutivos.', icon: '🔥' },
    { id: 4, title: 'Conectado', description: 'Adicionou 3 amigos à sua rede.', icon: '🤝' },
  ];

  return (
    // Container principal com fundo escuro
    <div className="min-h-[calc(100vh-160px)] p-4 md:p-6 lg:p-8 bg-bg-dark-primary">
      <h2 className="text-4xl md:text-5xl font-extrabold text-accent-purple mb-8 text-center font-inter animate-fade-in">
        Seu Progresso e Conquistas
      </h2>

      {/* Seção de Métricas Principais */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in delay-100">
        <MetricCard title="Horas de Estudo (Total)" value="125" unit="horas" icon="⏱️" color="text-accent-purple-light" />
        <MetricCard title="Cursos Concluídos" value="8" unit="cursos" icon="✅" color="text-success-green" />
        <MetricCard title="Pontos de XP" value="15,320" unit="XP" icon="✨" color="text-info-blue" />
      </section>

      {/* Seção de Progresso por Área */}
      <section className="bg-bg-dark-secondary p-8 rounded-xl shadow-custom-dark-lg border border-border-dark mb-12 animate-fade-in delay-200">
        <h3 className="text-2xl font-bold text-text-light mb-6 font-inter">Progresso por Área</h3>
        <ProgressBar label="Programação" progress={75} color="bg-accent-purple" />
        <ProgressBar label="Design Gráfico" progress={40} color="bg-info-blue" />
        <ProgressBar label="Marketing Digital" progress={60} color="bg-success-green" />
        <ProgressBar label="Idiomas" progress={20} color="bg-accent-purple-light" />
      </section>

      {/* Seção de Conquistas */}
      <section className="bg-bg-dark-secondary p-8 rounded-xl shadow-custom-dark-lg border border-border-dark animate-fade-in delay-300">
        <h3 className="text-2xl font-bold text-text-light mb-6 font-inter">Suas Conquistas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map(achievement => (
            <div key={achievement.id} className="bg-bg-dark-tertiary p-5 rounded-lg shadow-md border border-border-dark flex items-start space-x-4">
              <div className="text-4xl flex-shrink-0">{achievement.icon}</div>
              <div>
                <h4 className="text-xl font-semibold text-text-light mb-1">{achievement.title}</h4>
                <p className="text-text-muted-dark text-sm">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
