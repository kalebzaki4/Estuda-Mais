import { API_BASE_URL } from '../config/apiEndpoints.js';

const studyService = {
  /**
   * Lista todas as matérias disponíveis no banco
   */
  async listarMaterias() {
    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': token ? `Bearer ${token}` : '',
    };

    try {
      const res = await fetch(`${API_BASE_URL}/materias`, {
        headers
      });

      if (!res.ok) return { success: false, error: "Erro ao buscar matérias" };

      const data = await res.json();
      // Retorna sucesso e os dados (espera-se um Array do Java)
      return { success: true, data };
    } catch (error) {
      return { success: false, error: "Erro de conexão ao buscar matérias" };
    }
  },

  /**
   * Prepara uma nova sessão de estudo
   */
  async prepararSessao(nomeMateria, usuarioId) {
    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': token ? `Bearer ${token}` : '',
    };

    try {
      const url = new URL(`${API_BASE_URL}/sessoes/preparar`);
      url.searchParams.append('nomeMateria', nomeMateria);
      url.searchParams.append('usuarioId', usuarioId);

      const res = await fetch(url.toString(), {
        method: 'POST',
        headers
      });

      if (!res.ok) {
        const text = await res.text();
        return { success: false, error: text || "Erro ao preparar sessão" };
      }

      const data = await res.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: "Erro de conexão" };
    }
  },

  async iniciarSessao(id, tempo, topicos = []) {
    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };

    try {
      const res = await fetch(`${API_BASE_URL}/sessoes/${id}/iniciar`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ tempo, topicos })
      });

      if (!res.ok) {
        const text = await res.text();
        return { success: false, error: text || "Erro ao iniciar sessão" };
      }

      const data = await res.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: "Erro de conexão" };
    }
  },

  async finalizarSessao(id, minutos, resumo, topicos = []) {
    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };

    try {
      const res = await fetch(`${API_BASE_URL}/sessoes/${id}/finalizar`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ minutos, resumo, topicos })
      });

      if (!res.ok) {
        const text = await res.text();
        return { success: false, error: text || "Erro ao finalizar sessão" };
      }

      const data = await res.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: "Erro de conexão" };
    }
  },

  async obterFeedSocial() {
    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': token ? `Bearer ${token}` : '',
    };

    try {
      const res = await fetch(`${API_BASE_URL}/sessoes/feed`, {
        headers
      });

      if (!res.ok) return { success: false, error: "Erro ao buscar feed social" };

      const data = await res.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: "Erro de conexão ao buscar feed" };
    }
  },

  async listarMinhasSessoes(usuarioId) {
    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': token ? `Bearer ${token}` : '',
    };

    try {
      const res = await fetch(`${API_BASE_URL}/sessoes/recentes/${usuarioId}`, {
        headers
      });

      if (!res.ok) return { success: false, error: "Erro ao buscar sessões" };

      const data = await res.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: "Erro de conexão" };
    }
  }
};

export default studyService;