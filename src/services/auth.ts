import axios from 'axios';
import { postApiAuthLogout } from '../api/authentication/authentication';

export interface User {
  email: string;
  name: string;
  picture?: string;
  isAuthenticated: boolean;
}

export const authService = {
  // Authentication flow using cookie-based auth
  initiateGoogleLogin(returnUrl?: string) {
    var authenticationSearchParameters = new URLSearchParams();
    if (returnUrl) {
      authenticationSearchParameters.append('returnUrl', returnUrl);
    }

    var authenticationUrlPath = `/api/auth/login/google${authenticationSearchParameters.toString() ? `?${authenticationSearchParameters.toString()}` : ''}`;
    // Same-origin redirect – no hard-coded host
    window.location.href = authenticationUrlPath;
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      // With cookie-based auth, the server reads the auth cookie and returns the current user
      var response = await axios.get<User>('/api/auth/me');
      var authenticatedUser: User = { ...response.data, isAuthenticated: true };
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

    window.location.href = '/login';
  }
};
