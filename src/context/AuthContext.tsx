import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import type { AuthContextData, AuthResult, User } from '../types';

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const logoutTimer = useRef<number | null>(null);

    // Mock user data - remover quando backend estiver pronto
    const mockUser: User = {
        id: 1,
        name: 'Usuário Demo',
        email: 'demo@estudamais.com',
        role: 'student'
    };

    useEffect(() => {
        const initAuth = async (): Promise<void> => {
            try {
                // TODO: Implementar chamada ao novo backend para verificar autenticação
                // Por enquanto, verifica localStorage para manter estado entre recargas
                const storedUser = localStorage.getItem('mockUser');
                if (storedUser) {
                    setUser(JSON.parse(storedUser) as User);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (e) {
                console.error('Erro ao inicializar auth:', e);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        initAuth();

        return () => {
            if (logoutTimer.current !== null) {
                window.clearTimeout(logoutTimer.current);
            }
        };
    }, []);

    const register = async (name: string, email: string, password: string): Promise<AuthResult> => {
        // TODO: Implementar chamada ao novo backend
        // Mock implementation - remove quando backend estiver pronto
        try {
            const newUser: User = { id: Date.now(), name, email, role: 'student' };
            localStorage.setItem('mockUser', JSON.stringify(newUser));
            setUser(newUser);
            setIsAuthenticated(true);
            return { success: true, token: 'mock-token' };
        } catch (error) {
            return { success: false, error: 'Erro no registro' };
        }
    };

    const login = async (email: string, password: string): Promise<AuthResult> => {
        // TODO: Implementar chamada ao novo backend para autenticação
        // Mock implementation - remove quando backend estiver pronto
        try {
            const loggedUser: User = { ...mockUser, email };
            localStorage.setItem('mockUser', JSON.stringify(loggedUser));
            setUser(loggedUser);
            setIsAuthenticated(true);
            return { success: true, token: 'mock-token' };
        } catch (error) {
            return { success: false, error: 'Erro no login' };
        }
    };

    const logout = (): void => {
        // TODO: Implementar chamada ao novo backend para logout
        localStorage.removeItem('mockUser');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('userPoints');
        localStorage.removeItem('studyMinutesToday');
        localStorage.removeItem('pomodoroHistory');
        localStorage.removeItem('studyHistory');
        localStorage.removeItem('studyDay');
        setUser(null);
        setIsAuthenticated(false);
        if (logoutTimer.current !== null) {
            window.clearTimeout(logoutTimer.current);
        }
    };

    const refreshUser = async (): Promise<void> => {
        // TODO: Implementar chamada ao novo backend para obter dados atualizados do usuário
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser) as User);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, register, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
