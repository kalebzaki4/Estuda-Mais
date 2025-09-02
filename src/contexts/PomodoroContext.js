import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { useStudy } from './StudyContext';

const PomodoroContext = createContext();

export const usePomodoro = () => useContext(PomodoroContext);

export const PomodoroProvider = ({ children }) => {
  const { updateStudyTime } = useStudy();
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [message, setMessage] = useState('');
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [activeStudy, setActiveStudy] = useState(null);
  const intervalRef = useRef(null);

  const startTimer = () => {
    setIsActive(true);
    setMessage('');
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
    setMessage('');
  };

  const toggleBreak = (isLongBreak = false) => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsBreak(true);
    setMinutes(isLongBreak ? 15 : 5);
    setSeconds(0);
    setMessage(isLongBreak ? 'Pausa Longa! Relaxe.' : 'Pausa Curta! Estique as pernas.');
  };

  const startStudy = (studyData) => {
    setActiveStudy(studyData);
    setShowPomodoro(true);
    resetTimer();
  };

  const endStudy = () => {
    setActiveStudy(null);
    setShowPomodoro(false);
    resetTimer();
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            
            // Atualizar o tempo de estudo quando um pomodoro for concluído
            if (!isBreak && activeStudy) {
              // Adiciona 25 minutos ao tempo total do estudo (duração padrão do pomodoro)
              updateStudyTime(activeStudy.id, 25);
            }
            
            setMessage(isBreak ? 'Pausa Encerrada! Hora de voltar a estudar.' : 'Pomodoro Concluído! Faça uma pausa.');
          } else {
            setMinutes(prevMinutes => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, minutes, seconds, isBreak, activeStudy, updateStudyTime]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const value = {
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
  };

  return <PomodoroContext.Provider value={value}>{children}</PomodoroContext.Provider>;
};