import { API_BASE_URL } from '../config/apiEndpoints.js';
import authService from './authService.js';

// Endpoints (Assumindo padrão REST, ajuste conforme necessário)
const USERS_ENDPOINT = '/users';
const ME_ENDPOINT = '/users/me';
const PASSWORD_ENDPOINT = '/users/me/password';

const userService = {
  /**
   * Atualiza o perfil do usuário (nome, foto, etc.)
   * @param {Object} data - Dados a serem atualizados { name, username, ... }
   */
  async updateProfile(data) {
    // Reutiliza o método request do authService que já trata headers e tokens
    // authService.request(url, options) precisa ser público ou acessível. 
    // Como authService exporta um objeto, vamos assumir que ele tem um método 'request' exposto 
    // ou usaremos fetch diretamente com getAuthHeaders se não estiver exposto.
    // Olhando o código do authService, 'request' não é exportado diretamente no objeto default,
    // mas é usado internamente. Vamos usar fetch direto com os headers do authService se possível,
    // ou melhor: adicionar um método 'request' público ao authService ou replicar a lógica.
    // Pelo código lido, authService exporta um objeto. Vamos verificar se podemos adicionar 'request' ou usar fetch.
    
    // Melhor abordagem: Usar o fetch com os headers do authService.
    // Mas authService não exporta getAuthHeaders.
    // Vou fazer o request aqui replicando a lógica básica de auth headers.
    
    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };

    try {
      const res = await fetch(`${API_BASE_URL}${ME_ENDPOINT}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });

      const text = await res.text();
      let json = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch (e) {
        json = { message: text };
      }

      if (!res.ok) {
        return { success: false, error: (json && json.message) || res.statusText };
      }

      // Se atualizou com sucesso, atualizar o user no localStorage/AuthContext seria ideal,
      // mas o AuthContext geralmente recarrega ou o componente chama refresh.
      return { success: true, data: json };
    } catch (error) {
      return { success: false, error: "Erro de conexão" };
    }
  },

  /**
   * Altera a senha do usuário
   * @param {string} currentPassword 
   * @param {string} newPassword 
   */
  async changePassword(currentPassword, newPassword) {
    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };

    try {
      const res = await fetch(`${API_BASE_URL}${PASSWORD_ENDPOINT}`, {
        method: 'PUT', // ou POST dependendo da API
        headers,
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) {
        const text = await res.text();
        return { success: false, error: text || "Falha ao alterar senha" };
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: "Erro de conexão" };
    }
  },

  /**
   * Exclui a conta do usuário
   */
  async deleteAccount() {
    const token = localStorage.getItem('jwtToken');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };

    try {
      const res = await fetch(`${API_BASE_URL}${ME_ENDPOINT}`, {
        method: 'DELETE',
        headers,
      });

      if (!res.ok) {
        const text = await res.text();
        return { success: false, error: text || "Falha ao excluir conta" };
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: "Erro de conexão" };
    }
  }
};

export default userService;
