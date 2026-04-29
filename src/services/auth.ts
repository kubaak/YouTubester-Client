import axios from 'axios';
import { postApiAuthLogout } from '../api/authentication/authentication';

export interface User {
  email: string;
  name: string;
  picture?: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const authService = {
  // Authentication flow using cookie-based auth
  initiateGoogleLogin(returnUrl?: string) {
    const authenticationSearchParameters = new URLSearchParams();
    if (returnUrl) {
      authenticationSearchParameters.append('returnUrl', returnUrl);
    }

    const authenticationUrlPath = `/api/auth/login/google${authenticationSearchParameters.toString() ? `?${authenticationSearchParameters.toString()}` : ''}`;
    // Same-origin redirect – no hard-coded host
    window.location.href = authenticationUrlPath;
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      // With cookie-based auth, the server reads the auth cookie and returns the current user
      const response = await axios.get<{ email: string; name: string; picture?: string; isAdmin: boolean }>('/api/auth/me');
      const authenticatedUser: User = {
        email: response.data.email,
        name: response.data.name,
        picture: response.data.picture,
        isAuthenticated: true,
        isAdmin: response.data.isAdmin ?? false,
      };
      return authenticatedUser;
    } catch {
      // Any error (including 401) is treated as "not authenticated" on the client side
      return null;
    }
  },

  async logout() {
    try {
      await postApiAuthLogout();
    } catch {
      // Ignore logout errors and proceed with client-side redirect
    }

    window.location.href = '/';
  },
};
