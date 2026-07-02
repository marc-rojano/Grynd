import { createContext, useState, useEffect, useCallback, PropsWithChildren } from 'react';
import api from '../services/api';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const { data: userProfile } = await api.get<User>('/auth/profile');
          setUser(userProfile);
          setIsAuthenticated(true);
        } catch (e) {
          logout();
        }
      }
      setLoading(false);
    };
    verifyAuth();
  }, [logout]);

  const login = useCallback(async (token: string) => {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const { data: userProfile } = await api.get<User>('/auth/profile');
      setUser(userProfile);
      setIsAuthenticated(true);
    } catch (e) {
      logout();
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
