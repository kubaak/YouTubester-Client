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
        // Check if there's a stored user
        var storedUser = authService.getUser();
        if (storedUser && authService.isAuthenticated()) {
          // Validate the token and refresh user data
          var isValid = await authService.validateToken();
          if (isValid) {
            await refreshUser();
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Handle OAuth callback
  useEffect(() => {
    var handleOAuthCallback = (): void => {
      var urlParams = new URLSearchParams(window.location.search);
      var token = urlParams.get('token');
      
      if (token) {
        // Extract user info from the URL or make an API call
        // For now, let's make an API call to get user info
        authService.setAuthData({
          token,
          tokenType: 'Bearer',
          expiresIn: 86400,
          user: { email: '', name: '', picture: '' }
        });
        
        refreshUser().then(() => {
          // Remove token from URL
          var newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        });
      }
    };

    handleOAuthCallback();
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