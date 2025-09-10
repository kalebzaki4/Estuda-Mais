import { useState, useEffect } from 'react';

/**
 * Hook customizado para gerenciar dados no localStorage
 * @param {string} key - Chave do localStorage
 * @param {any} initialValue - Valor inicial
 * @returns {[any, function]} - [valor, função para atualizar]
 */
const useLocalStorage = (key, initialValue) => {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Obter do localStorage local
      const item = window.localStorage.getItem(key);
      // Analisar JSON armazenado ou retornar initialValue se não houver nenhum
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Se erro também retorna initialValue
      console.error(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Retorna uma versão envolvida da função setter do useState que ...
  // ... persiste o novo valor no localStorage.
  const setValue = (value) => {
    try {
      // Permite que value seja uma função para que tenhamos a mesma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Salvar estado
      setStoredValue(valueToStore);
      // Salvar no localStorage local
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Uma implementação mais avançada lidaria com o caso de erro
      console.error(`Erro ao definir localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;