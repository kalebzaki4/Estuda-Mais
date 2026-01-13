import { createContext, useContext, useState } from 'react';
export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

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

            // 4. Verificando a mensagem exata que seu backend retorna no login
            if (response.ok && data === "Login realizado!") {
                setUser({ email });
                return { success: true };
            }
            return { success: false, error: data };
        } catch (error) {
            console.error("Erro no fetch de login:", error);
            return { success: false, error: "Erro ao conectar ao servidor." };
        }
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
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