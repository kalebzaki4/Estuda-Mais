// src/components/StudySummary/StudySummaryPage.js
import React from 'react';

export default function StudySummaryPage({ onSelectTopic }) { // Recebe onSelectTopic como prop
  // Dados de exemplo para o resumo dos seus estudos
  // Adicionei mais detalhes para a página de detalhes do tópico
  const yourStudySummary = [
    {
      id: 1,
      topic: 'Desenvolvimento Web',
      lastSession: 'Hoje',
      time: '3h 15min',
      progress: '85%',
      avatar: 'W',
      description: 'Este tópico abrange HTML, CSS, JavaScript, React e Node.js. Foco em construir aplicações web modernas e responsivas.',
      sessionsCompleted: 15,
      recentActivities: [
        { date: '18/07/2025', duration: '1h 30min', whatWasStudied: 'React Hooks e Context API', type: 'Estudo' },
        { date: '17/07/2025', duration: '45min', whatWasStudied: 'Tailwind CSS para responsividade', type: 'Revisão' },
      ],
      youtubeLinks: [
        { title: 'Curso Completo de React para Iniciantes', url: 'https://www.youtube.com/watch?v=some-react-course' },
        { title: 'Guia Definitivo de Tailwind CSS', url: 'https://www.youtube.com/watch?v=some-tailwind-guide' },
      ],
    },
    {
      id: 2,
      topic: 'Estruturas de Dados',
      lastSession: 'Ontem',
      time: '2h 00min',
      progress: '60%',
      avatar: 'D',
      description: 'Estudo de estruturas de dados fundamentais como listas, árvores, grafos e algoritmos de busca e ordenação. Essencial para otimização de código.',
      sessionsCompleted: 10,
      recentActivities: [
        { date: '17/07/2025', duration: '1h 00min', whatWasStudied: 'Algoritmos de Ordenação (QuickSort)', type: 'Estudo' },
        { date: '16/07/2025', duration: '1h 00min', whatWasStudied: 'Listas Encadeadas e Pilhas', type: 'Estudo' },
      ],
      youtubeLinks: [
        { title: 'Estruturas de Dados e Algoritmos em Python', url: 'https://www.youtube.com/watch?v=some-data-structures' },
      ],
    },
    {
      id: 3,
      topic: 'Inteligência Artificial',
      lastSession: '2 dias atrás',
      time: '1h 45min',
      progress: '40%',
      avatar: 'AI',
      description: 'Introdução aos conceitos de Inteligência Artificial, Machine Learning e Deep Learning. Explorando redes neurais e processamento de linguagem natural.',
      sessionsCompleted: 7,
      recentActivities: [
        { date: '16/07/2025', duration: '45min', whatWasStudied: 'Introdução a Redes Neurais', type: 'Estudo' },
        { date: '15/07/2025', duration: '1h 00min', whatWasStudied: 'Fundamentos de Machine Learning', type: 'Estudo' },
      ],
      youtubeLinks: [
        { title: 'Desvendando a Inteligência Artificial', url: 'https://www.youtube.com/watch?v=some-ai-intro' },
      ],
    },
    {
      id: 4,
      topic: 'Design UX/UI',
      lastSession: '3 dias atrás',
      time: '1h 00min',
      progress: '25%',
      avatar: 'UX',
      description: 'Aprendizado sobre a experiência do usuário (UX) e interface do usuário (UI), incluindo princípios de design, wireframing e prototipagem com Figma.',
      sessionsCompleted: 5,
      recentActivities: [
        { date: '15/07/2025', duration: '1h 00min', whatWasStudied: 'Princípios de UX Design', type: 'Estudo' },
      ],
      youtubeLinks: [
        { title: 'Curso Rápido de UI/UX Design', url: 'https://www.youtube.com/watch?v=some-uxui-course' },
      ],
    },
  ];

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
        {yourStudySummary.map((item) => (
          // Individual study summary card with dark secondary background, now clickable
          <div
            key={item.id}
            onClick={() => onSelectTopic(item)} // Passa o item completo ao clicar
            className="bg-bg-dark-secondary p-6 rounded-xl shadow-custom-dark border border-border-dark flex flex-col items-start transform transition duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex items-center mb-4 w-full">
              {/* Avatar/Icon for the topic */}
              <div className="w-12 h-12 bg-accent-purple-dark rounded-full flex items-center justify-center text-xl font-bold text-text-light flex-shrink-0 mr-4">
                {item.avatar}
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-text-light mb-1">{item.topic}</h3>
                <p className="text-text-muted-dark text-sm">Última sessão: {item.lastSession}</p>
              </div>
            </div>
            <div className="w-full flex justify-between items-end mt-auto pt-4 border-t border-border-dark">
              {/* Study time and progress */}
              <div className="text-left">
                <p className="text-text-light text-lg font-semibold">Tempo Total:</p>
                <p className="text-accent-purple text-2xl font-extrabold">{item.time}</p>
              </div>
              <div className="text-right">
                <p className="text-text-light text-lg font-semibold">Progresso:</p>
                <p className="text-info-blue text-2xl font-extrabold">{item.progress}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="text-center mt-12 animate-fade-in delay-300">
        <button className="px-8 py-4 bg-accent-purple-dark hover:bg-accent-purple text-text-light font-semibold rounded-full shadow-custom-dark transition duration-300 ease-in-out transform hover:scale-105">
          Ver Relatório Completo
        </button>
      </div>
    </div>
  );
}
