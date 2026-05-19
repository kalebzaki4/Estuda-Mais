import { jwtDecode } from 'jwt-decode';

export const getTokenExpiration = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        if (!decodedToken.exp) return null;
        const expirationTime = decodedToken.exp * 1000; 
        return expirationTime;
    } catch (error) {
        return null;
    }
};

export const isTokenValid = (token) => {
    if (!token) return false;
    const expirationTime = getTokenExpiration(token);
    if (expirationTime === null) return false;
    const currentTime = Date.now();
    return expirationTime > currentTime;
};

export const getUserFromToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        return {
            email: decoded.sub,
            // O token não contém nome, então usamos o email ou parte dele como fallback
            name: decoded.name || decoded.sub.split('@')[0]
        };
    } catch (e) {
        return null;
    }
};
