import { apiRequest } from './api';
import type { LoginCredentials, UsuarioDTO } from '../types';

export const cadastrarUsuario = async (usuarioDTO: UsuarioDTO): Promise<Response> => {
    return apiRequest('/usuarios', {
        method: 'POST',
        body: JSON.stringify(usuarioDTO),
    });
};

export const loginUsuario = async ({ email, password }: LoginCredentials): Promise<Response> => {
    return apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
};

export const logoutUsuario = async (): Promise<Response> => {
    return apiRequest('/auth/logout', {
        method: 'POST',
    });
};

export const getUsuarioInfo = async (): Promise<Response> => {
    return apiRequest('/usuarios/me', {
        method: 'GET',
    });
};

export const atualizarUsuario = async (usuarioDTO: UsuarioDTO): Promise<Response> => {
    return apiRequest('/usuarios/me', {
        method: 'PUT',
        body: JSON.stringify(usuarioDTO),
    });
};