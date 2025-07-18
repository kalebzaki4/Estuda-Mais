// src/components/Explore/ExplorePage.js
import React from 'react';
import CourseList from './CourseList'; // Caminho ajustado para estar na mesma pasta

export default function ExplorePage() {
  return (
    // Container principal com fundo escuro
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-start p-4 md:p-6 lg:p-8 bg-bg-dark-primary">
      <h2 className="text-4xl md:text-5xl font-extrabold text-accent-purple mb-8 text-center font-inter animate-fade-in">
        Explore Nossos Cursos
      </h2>
      <p className="text-lg md:text-xl text-text-muted-dark mb-12 text-center max-w-3xl animate-fade-in delay-100">
        Descubra uma vasta gama de tópicos e aprimore suas habilidades com nossos cursos cuidadosamente selecionados.
      </p>
      <CourseList /> {/* Reutiliza o componente CourseList */}
    </div>
  );
}
