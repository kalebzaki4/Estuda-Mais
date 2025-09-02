import React, { createContext, useState, useContext, useEffect } from 'react';

const StudyContext = createContext();

export const useStudy = () => useContext(StudyContext);

export const StudyProvider = ({ children }) => {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar estudos do localStorage ao iniciar
  useEffect(() => {
    const loadStudies = () => {
      try {
        const savedStudies = localStorage.getItem('studies');
        if (savedStudies) {
          setStudies(JSON.parse(savedStudies));
        }
      } catch (error) {
        console.error('Erro ao carregar estudos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStudies();
  }, []);

  // Salvar estudos no localStorage quando houver alterações
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('studies', JSON.stringify(studies));
    }
  }, [studies, loading]);

  // Adicionar um novo estudo
  const addStudy = (study) => {
    setStudies(prevStudies => [...prevStudies, study]);
  };

  // Atualizar um estudo existente
  const updateStudy = (updatedStudy) => {
    setStudies(prevStudies => 
      prevStudies.map(study => 
        study.id === updatedStudy.id ? updatedStudy : study
      )
    );
  };

  // Remover um estudo
  const removeStudy = (studyId) => {
    setStudies(prevStudies => 
      prevStudies.filter(study => study.id !== studyId)
    );
  };

  // Atualizar o tempo total de um estudo
  const updateStudyTime = (studyId, additionalMinutes) => {
    setStudies(prevStudies => 
      prevStudies.map(study => {
        if (study.id === studyId) {
          const updatedStudy = {
            ...study,
            totalTimeMinutes: (study.totalTimeMinutes || 0) + additionalMinutes,
            lastSession: new Date().toISOString()
          };
          return updatedStudy;
        }
        return study;
      })
    );
  };

  const value = {
    studies,
    loading,
    addStudy,
    updateStudy,
    removeStudy,
    updateStudyTime
  };

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
};