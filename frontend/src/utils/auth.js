import jwtDecode from 'jwt-decode';

export const getTokenExpiration = (token) => {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; 
    return expirationTime;
};

export const isTokenValid = (token) => {
    const expirationTime = getTokenExpiration(token);
    if (expirationTime === null) return false;
    const currentTime = Date.now();
    return expirationTime > currentTime;
};