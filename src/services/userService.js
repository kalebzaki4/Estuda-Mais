import { apiRequest } from './api';

export const cadastrarUsuario = async (usuarioDTO) => {
    return apiRequest('/usuarios', {
        method: 'POST',
        body: JSON.stringify(usuarioDTO),
    });
};

export const loginUsuario = async (email, password) => {
    return apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
};

export const logoutUsuario = async () => {
    return apiRequest('/auth/logout', {
        method: 'POST',
    });
};

export const getUsuarioInfo = async () => {
    return apiRequest('/usuarios/me', {
        method: 'GET',
    });
};

export const atualizarUsuario = async (usuarioDTO) => {
    return apiRequest('/usuarios/me', {
        method: 'PUT',
        body: JSON.stringify(usuarioDTO),
    });
};