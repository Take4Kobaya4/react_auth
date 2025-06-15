/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, type ReactNode, useEffect } from "react";
import type { User } from "../types/auth";
import { authApi } from "../apis/auth";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({children}: AuthProviderProps) {
    const [ user, setUser ] = useState<User | null>(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);

    // 認証チェック
    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            setError(null)
            try {
                const userData = await authApi.getUser();
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setError('認証情報の取得に失敗しました');
                setUser(null);
                localStorage.removeItem('auth_token');
            } finally {
                setIsLoading(false);
            }
        }
        checkAuth();
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        setError(null);
        try {
            const userData = await authApi.login(email, password);
            setUser(userData);
        } catch(error: any) {
            const errorMessage = error.response?.data?.message || 'ログインに失敗しました';
            setError(errorMessage);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const register = async (name: string, email: string, password: string): Promise<void> => {
        setIsLoading(true);
        setError(null);
        try {
            const userData = await authApi.register(name, email, password);
            setUser(userData);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || '登録に失敗しました';
            setError(errorMessage);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const logout = async (): Promise<void> => {
        setIsLoading(true);
        setError(null);
        try {
            await authApi.logout();
            setUser(null);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'ログアウトに失敗しました';
            setError(errorMessage);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const value = { user, isLoading, error, login, register, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}