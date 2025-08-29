import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { storageUtils } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedAuth = storageUtils.getAuth();
    if (savedAuth?.isAuthenticated) {
      setUser({ username: 'admin', isAuthenticated: true });
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Simple hardcoded credentials for demo
    if (username === 'admin' && password === '1234') {
      const userData = { username: 'admin', isAuthenticated: true };
      setUser(userData);
      setIsAuthenticated(true);
      storageUtils.setAuth(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    storageUtils.clearAuth();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};