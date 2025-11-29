import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User } from '../services/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (returnUrl?: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  var context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  var [user, setUser] = useState<User | null>(null);
  var [isLoading, setIsLoading] = useState(true);

  var refreshUser = async (): Promise<void> => {
    try {
      var currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setUser(null);
    }
  };

  var login = (returnUrl?: string): void => {
    authService.initiateGoogleLogin(returnUrl);
  };

  var logout = (): void => {
    setUser(null);
    authService.logout();
  };

  useEffect(() => {
    var initializeAuth = async (): Promise<void> => {
      setIsLoading(true);

      try {
        // With cookie-based auth, simply ask the server for the current user
        await refreshUser();
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  var isAuthenticated = user !== null && user.isAuthenticated;

  var value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};