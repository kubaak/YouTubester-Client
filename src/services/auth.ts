import axios from 'axios';

export interface User {
  email: string;
  name: string;
  picture?: string;
  isAuthenticated: boolean;
}

export interface AuthTokens {
  token: string;
  tokenType: string;
  expiresIn: number;
  user: Omit<User, 'isAuthenticated'>;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const authService = {
  // Token management
  setAuthData(authData: AuthTokens) {
    localStorage.setItem(TOKEN_KEY, authData.token);
    localStorage.setItem(USER_KEY, JSON.stringify(authData.user));
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser(): User | null {
    var userData = localStorage.getItem(USER_KEY);
    if (!userData) return null;
    
    try {
      var user = JSON.parse(userData);
      return { ...user, isAuthenticated: true };
    } catch {
      return null;
    }
  },

  clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  isAuthenticated(): boolean {
    var token = this.getToken();
    return !!token;
  },

  // Authentication flow
  initiateGoogleLogin(returnUrl?: string) {
    var params = new URLSearchParams();
    if (returnUrl) {
      params.append('returnUrl', returnUrl);
    }
    
    var url = `/auth/google/login${params.toString() ? `?${params.toString()}` : ''}`;
    window.location.href = `http://localhost:5094${url}`;
  },

  async validateToken(): Promise<boolean> {
    var token = this.getToken();
    if (!token) return false;

    try {
      await axios.get('http://localhost:5094/auth/validate', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch {
      this.clearAuth();
      return false;
    }
  },

  async getCurrentUser(): Promise<User | null> {
    var token = this.getToken();
    if (!token) return null;

    try {
      var response = await axios.get<User>('http://localhost:5094/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      var user = { ...response.data, isAuthenticated: true };
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    } catch {
      this.clearAuth();
      return null;
    }
  },

  logout() {
    this.clearAuth();
    window.location.href = '/login';
  }
};