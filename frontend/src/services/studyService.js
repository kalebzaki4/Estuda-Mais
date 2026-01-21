import { API_BASE_URL } from '../config/apiEndpoints.js';

const studyService = {
  /**
   * Prepara uma nova sessão de estudo
   * @param {string} nomeMateria 
   * @param {number} usuarioId 
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

  /**
   * Inicia a sessão com detalhes
   * @param {number} id 
   * @param {number} tempo 
   * @param {string[]} topicos 
   */
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

  /**
   * Finaliza a sessão de estudo
   * @param {number} id 
   * @param {number} minutos 
   */
  async finalizarSessao(id, minutos) {
    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': token ? `Bearer ${token}` : '',
    };

    try {
      const url = new URL(`${API_BASE_URL}/sessoes/${id}/finalizar`);
      url.searchParams.append('minutos', minutos);

      const res = await fetch(url.toString(), {
        method: 'PUT',
        headers
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

  /**
   * Lista as sessões recentes do usuário
   * @param {number} usuarioId 
   */
  async listarRecentes(usuarioId) {
    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Authorization': token ? `Bearer ${token}` : '',
    };

    try {
      const res = await fetch(`${API_BASE_URL}/sessoes/recentes/${usuarioId}`, {
        headers
      });

      if (!res.ok) return { success: false, error: "Erro ao buscar sessões recentes" };

      const data = await res.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: "Erro de conexão" };
    }
  }
};

export default studyService;
