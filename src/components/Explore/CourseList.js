// src/components/Explore/CourseList.js
import React from 'react';

// Componente de Cartão de Curso individual
const CourseCard = ({ title, description, instructor, imageUrl }) => { // Removido 'price' do props
  return (
    // Fundo do card escuro
    <div className="bg-bg-dark-secondary rounded-xl shadow-custom-dark overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-custom-dark-lg border border-border-dark">
      {/* Imagem do Curso - Placeholder para demonstração */}
      <img
        src={imageUrl || `https://placehold.co/400x200/6a1aae/ffffff?text=${encodeURIComponent(title)}`}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x200/6a1aae/ffffff?text=${encodeURIComponent(title)}`; }}
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-text-light mb-2 font-inter">{title}</h3>
        <p className="text-text-muted-dark text-sm mb-3 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-text-muted-dark font-medium">Instrutor: {instructor}</span>
          <span className="text-lg font-bold text-success-green">Grátis</span> {/* Alterado para "Grátis" */}
        </div>
        <button className="w-full bg-accent-purple-dark text-text-light py-3 rounded-full text-lg font-semibold hover:bg-accent-purple transition duration-300 ease-in-out">
          Ver Curso
        </button>
      </div>
    </div>
  );
};

// Componente da Lista de Cursos
const CourseList = () => {
  // Dados de exemplo para os cursos
  const courses = [
    {
      id: 1,
      title: "Introdução à Programação com Python",
      description: "Aprenda os fundamentos da programação usando Python, a linguagem mais popular para iniciantes e profissionais. Inclui vídeos, exercícios e projetos práticos no YouTube.",
      instructor: "Ana Paula Silva",
      imageUrl: "https://placehold.co/400x200/10B981/FFFFFF?text=Python"
    },
    {
      id: 2,
      title: "Desenvolvimento Web com React e Tailwind CSS",
      description: "Construa interfaces de usuário modernas e responsivas com React e estilize-as rapidamente com Tailwind CSS. Aulas completas disponíveis no YouTube.",
      instructor: "Carlos Eduardo",
      imageUrl: "https://placehold.co/400x200/EF4444/FFFFFF?text=React+Web"
    },
    {
      id: 3,
      title: "Banco de Dados SQL Essencial",
      description: "Domine os conceitos de bancos de dados relacionais e escreva consultas SQL eficientes. Conteúdo gratuito com exemplos práticos.",
      instructor: "Fernanda Costa",
      imageUrl: "https://placehold.co/400x200/F97316/FFFFFF?text=SQL+Database"
    },
    {
      id: 4,
      title: "Marketing Digital para Iniciantes",
      description: "Entenda as estratégias de marketing online, SEO, mídias sociais e publicidade digital. Todo o material é gratuito e acessível.",
      instructor: "Ricardo Mendes",
      imageUrl: "https://placehold.co/400x200/6366F1/FFFFFF?text=Marketing"
    },
    {
      id: 5,
      title: "Inteligência Artificial e Machine Learning",
      description: "Explore os fundamentos da IA e Machine Learning com exemplos práticos e projetos. Disponível para todos sem custo.",
      instructor: "Mariana Oliveira",
      imageUrl: "https://placehold.co/400x200/EC4899/FFFFFF?text=IA+ML"
    },
    {
      id: 6,
      title: "Design Gráfico com Figma",
      description: "Crie designs incríveis para web e mobile usando a ferramenta Figma, do básico ao avançado. Acesso gratuito a todas as aulas.",
      instructor: "João Pedro",
      imageUrl: "https://placehold.co/400x200/06B6D4/FFFFFF?text=Figma+Design"
    },
  ];

  return (
    // Container da seção de cursos com fundo secundário escuro
    <section id="courses" className="container mx-auto my-12 p-6 bg-bg-dark-secondary shadow-custom-dark-lg rounded-xl">
      <h3 className="text-4xl font-bold text-text-light text-center mb-10 font-inter">Nossos Cursos Populares</h3>
      {/* Grid responsivo para os cards de curso */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            instructor={course.instructor}
            imageUrl={course.imageUrl}
          />
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="bg-accent-purple-dark text-text-light px-8 py-4 rounded-full text-xl font-semibold shadow-custom-dark hover:bg-accent-purple transition duration-300 ease-in-out transform hover:scale-105">
          Explorar Todos os Cursos
        </button>
      </div>
    </section>
  );
};

export default CourseList;
