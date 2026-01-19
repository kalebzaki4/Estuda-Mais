import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getTokenExpiration } from '../utils/auth';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const logoutTimer = useRef(null);

    const setLogoutTimer = (token) => {
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        
        try {
            const expirationTime = getTokenExpiration(token);
            const remainingTime = expirationTime - Date.now();

            if (remainingTime > 0) {
                logoutTimer.current = setTimeout(() => {
                    alert('Sua sessão expirou!');
                    logout(); 
                }, remainingTime);
            }
        } catch (error) {
            console.error("Erro ao calcular expiração do token:", error);
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
            } catch (err) {
                logout();
            }
        }
        return () => {
            if (logoutTimer.current) clearTimeout(logoutTimer.current); 
        };
    }, []);

    const register = async (name, email, password) => {
        try {
            const response = await fetch('http://localhost:8080/usuarios/cadastrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: name, email: email, senha: password }),
            });

            if (response.ok) {
                return { success: true };
            } else {
                const errorText = await response.text();
                return { success: false, error: errorText };
            }
        } catch (error) {
            return { success: false, error: "Servidor offline." };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:8080/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha: password }),
            });

            // Como o backend agora retorna {"token": "..."}, usamos .json()
            const data = await response.json();

            if (response.ok && data.token) {
                const userData = { email, name: email.split('@')[0] };
                
                // Salva os dados
                localStorage.setItem('jwtToken', data.token);
                localStorage.setItem('userData', JSON.stringify(userData));
                
                setUser(userData);
                setIsAuthenticated(true);
                setLogoutTimer(data.token);

                return { success: true, token: data.token };
            } else {
                return { success: false, error: data.error || "E-mail ou senha incorretos." };
            }
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
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
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