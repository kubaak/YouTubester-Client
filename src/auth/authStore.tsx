import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AxiosRequestConfig } from 'axios';
import { getApiAuthMe } from '@/api/authentication/authentication';

interface AuthState {
  hasWriteAccess: boolean | null;
  refreshAuth: () => Promise<void>;
}

const AuthStoreContext = createContext<AuthState | undefined>(undefined);

interface AuthMeResponse {
  hasWriteAccess?: boolean;
}

async function fetchAuthState(): Promise<AuthMeResponse> {
  const axiosOptions: AxiosRequestConfig = {
    withCredentials: true,
  };

  const response = await getApiAuthMe(axiosOptions as any);
  return (response?.data ?? {}) as AuthMeResponse;
}

interface AuthStoreProviderProps {
  children: ReactNode;
}

export function AuthStoreProvider({ children }: AuthStoreProviderProps): JSX.Element {
  var [hasWriteAccess, setHasWriteAccess] = useState<boolean | null>(null);

  var refreshAuth = async (): Promise<void> => {
    try {
      var auth = await fetchAuthState();
      var value = auth.hasWriteAccess === true;
      setHasWriteAccess(value);
    } catch (error) {
      console.error('Failed to refresh auth state:', error);
      setHasWriteAccess(false);
    }
  };

  useEffect(() => {
    void refreshAuth();
  }, []);

  return (
    <AuthStoreContext.Provider
      value={{
        hasWriteAccess,
        refreshAuth,
      }}
    >
      {children}
    </AuthStoreContext.Provider>
  );
}

export function useAuthStore(): AuthState {
  var context = useContext(AuthStoreContext);
  if (context === undefined) {
    throw new Error('useAuthStore must be used within an AuthStoreProvider');
  }

  return context;
}

interface WriteAuthBootstrapProps {
  children: ReactNode;
}

export function WriteAuthBootstrap({ children }: WriteAuthBootstrapProps): JSX.Element {
  return <AuthStoreProvider>{children}</AuthStoreProvider>;
}
