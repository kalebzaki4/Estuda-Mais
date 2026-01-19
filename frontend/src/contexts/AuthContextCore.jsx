import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getTokenExpiration } from '../utils/auth';
import authService from '../services/authService';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const logoutTimer = useRef(null);

    const setLogoutTimer = (token) => {
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        
        try {
            const expirationTime = getTokenExpiration(token);
            if (!expirationTime) return;
            const remainingTime = expirationTime - Date.now();

            if (remainingTime > 0) {
                logoutTimer.current = setTimeout(() => {
                    logout(); 
                    window.location.href = '/#/login'; 
                }, remainingTime);
            } else {
                logout();
            }
        } catch (error) {
            console.error("Erro ao calcular expiração do token:", error);
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            try {
                if (authService.isAuthenticated()) {
                    const res = await authService.getCurrentUser();
                    if (res.success) {
                        setUser(res.data);
                        setIsAuthenticated(true);
                        setLogoutTimer(authService.getToken());
                    } else {
                        logout();
                    }
                } else {
                    authService.clearAuthData();
                }
            } catch (e) {
                logout();
            } finally {
                setLoading(false);
            }
        };
        initAuth();

        return () => {
            if (logoutTimer.current) clearTimeout(logoutTimer.current); 
        };
    }, []);

    const register = async (name, email, password) => {
        return await authService.register(name, email, password);
    };

    const login = async (email, password) => {
        const res = await authService.login(email, password);
        if (res.success) {
            const userRes = await authService.getCurrentUser();
            if (userRes.success) {
                setUser(userRes.data);
                setIsAuthenticated(true);
                setLogoutTimer(res.token);
                return { success: true, token: res.token };
            }
        }
        return res;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};
