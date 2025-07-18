// src/components/Study/StudyPage.js
import React, { useState, useEffect, useRef } from 'react';

export default function StudyPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false); // true for short/long break
  const [message, setMessage] = useState('');
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
    setMinutes(isLongBreak ? 15 : 5); // Long break 15min, Short break 5min
    setSeconds(0);
    setMessage(isLongBreak ? 'Pausa Longa! Relaxe.' : 'Pausa Curta! Estique as pernas.');
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            setMessage(isBreak ? 'Pausa Encerrada! Hora de voltar a estudar.' : 'Pomodoro Concluído! Faça uma pausa.');
            // Optionally, automatically switch to break or next pomodoro
            // if (!isBreak) {
            //   toggleBreak();
            // } else {
            //   resetTimer();
            // }
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
  }, [isActive, minutes, seconds, isBreak]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    // Container principal com fundo escuro
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 bg-bg-dark-primary">
      {/* Card do Pomodoro com fundo secundário escuro e sombra */}
      <div className="bg-bg-dark-secondary p-8 rounded-xl shadow-custom-dark-lg border border-border-dark w-full max-w-md text-center animate-fade-in">
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

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
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
      </div>
    </div>
  );
}
