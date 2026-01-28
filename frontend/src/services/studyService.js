import { API_BASE_URL } from '../config/apiEndpoints.js';

const studyService = {
  /**
   * Lista todas as matérias disponíveis no banco
   */
  async listarMaterias() {
    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Adicionar token se existir
    if (token && token.trim()) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      console.log('📡 Iniciando requisição GET /materias');
      console.log('🔗 URL:', `${API_BASE_URL}/materias`);
      
      // Usar AbortController com timeout manualel
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const res = await fetch(`${API_BASE_URL}/materias`, {
        method: 'GET',
        headers,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      console.log('📊 Status HTTP:', res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ HTTP Error:', res.status, errorText);
        return { 
          success: false, 
          error: `HTTP ${res.status}: ${errorText || res.statusText}` 
        };
      }

      const data = await res.json();
      console.log('📦 Dados recebidos:', data);
      
      // Tratamento flexível da resposta
      if (Array.isArray(data)) {
        console.log(`✅ Sucesso! ${data.length} matérias carregadas`);
        return { success: true, data };
      }
      
      if (data && typeof data === 'object') {
        // Se é um objeto, retornar array vazio ou tentar extrair os dados
        if (data.data && Array.isArray(data.data)) {
          return { success: true, data: data.data };
        }
        return { success: true, data: [] };
      }
      
      return { success: true, data: [] };
    } catch (error) {
      console.error('❌ Erro na requisição:', error.name, error.message);
      const errorMsg = error.name === 'AbortError' 
        ? 'Timeout - servidor não respondeu' 
        : error.message;
      return { success: false, error: errorMsg };
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