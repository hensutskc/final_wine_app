import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('wine-cellar-auth');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setIsAuthenticated(true);
        setUser(data.email);
      } catch (error) {
        console.error('Failed to load auth:', error);
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    // Simple validation for demo - in production use real authentication
    if (email && password.length >= 6) {
      const authData = { email };
      localStorage.setItem('wine-cellar-auth', JSON.stringify(authData));
      setIsAuthenticated(true);
      setUser(email);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('wine-cellar-auth');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
