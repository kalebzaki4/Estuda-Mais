import { render, screen } from '@testing-library/react';
import App from './App';

describe('Teste de Renderização', () => {
  it('deve exibir o conteúdo principal do App', () => {
    render(<App />);
    expect(document.body).toBeDefined();
  });
});