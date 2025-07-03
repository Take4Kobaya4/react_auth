import { createContext, useEffect, useState, type ReactNode } from "react";
import { type User } from "../types/auth";
import { authApi } from "../apis/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authApi.getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const userData = await authApi.login(email, password);
      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  }

  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      const userData = await authApi.register(name, email, password);
      setUser(userData);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await authApi.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
