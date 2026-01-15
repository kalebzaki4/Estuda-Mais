import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getTokenExpiration } from '../utils/auth';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const logoutTimer = useRef(null);

    const setLogoutTimer = (token) => {
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        const expirationTime = getTokenExpiration(token);
        const remainingTime = expirationTime - Date.now();

        if (remainingTime > 0) {
            logoutTimer.current = setTimeout(() => {
                alert('Sua sessão expirou!');
                logout(); 
            }, remainingTime);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const userData = localStorage.getItem('userData');

        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
                setIsAuthenticated(true);
                setLogoutTimer(token);
            } catch {
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('userData');
                setUser(null);
                setIsAuthenticated(false);
            }
        } else {
            setUser(null);
            setIsAuthenticated(false);
        }

        return () => {
            clearTimeout(logoutTimer.current); 
        };
    }, []);

    const register = async (name, email, password) => {
        try {
            const response = await fetch('http://localhost:8080/usuarios/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    nome: name, 
                    email: email, 
                    senha: password 
                }),
            });

            const data = await response.text();

            if (response.ok) {
                return { success: true };
            } else {
                return { success: false, error: data };
            }
        } catch (error) {
            console.error("Erro no fetch de registro:", error);
            return { success: false, error: "Servidor offline. Verifique o backend!" };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:8080/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha: password }),
            });

            const data = await response.text();

            if (response.ok && data === "Login realizado!") {
                const userData = { email, name: email.split('@')[0] };
                setUser(userData);
                setIsAuthenticated(true);
                localStorage.setItem('jwtToken', 'token_' + Date.now());
                localStorage.setItem('userData', JSON.stringify(userData));
                setLogoutTimer('token_' + Date.now()); // Inicia o timer após o login
                return { success: true };
            }
            return { success: false, error: data };
        } catch (error) {
            console.error("Erro no fetch de login:", error);
            return { success: false, error: "Erro ao conectar ao servidor." };
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userData');
        clearTimeout(logoutTimer.current);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout }}>
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