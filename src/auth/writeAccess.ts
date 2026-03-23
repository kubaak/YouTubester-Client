import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { getApiAuthMe } from '@/api/authentication/authentication';

// Module-level cached capability (no UI derived from it)
let cachedWriteAccess: boolean | null = null;

// Deduplicate concurrent checks (double click, two mutations at once)
let inFlightPromise: Promise<boolean> | null = null;

function getCurrentPath(): string {
  return window.location.pathname + window.location.search;
}

export function redirectToWriteConsent(): void {
  const returnUrl = encodeURIComponent(getCurrentPath());
  const writeConsentUrlPath = `/api/auth/login/google/write?returnUrl=${returnUrl}`;

  // Same-window redirect only (no popups)
  window.location.assign(writeConsentUrlPath);
}

export async function readHasWriteAccess(): Promise<boolean> {
  const axiosOptions: AxiosRequestConfig = {
    withCredentials: true,
  };

  try {
    // Orval types this as AxiosResponse<void>, but backend returns JSON.
    const response = await getApiAuthMe(axiosOptions);
    return response.data.hasWriteAccess === true;
  } catch (error) {
    // 401 is expected when not logged in / session expired -> treat as "not authenticated" without console noise.
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return false;
    }

    console.error('Failed to read /api/auth/me:', error);
    return false;
  }
}

/**
 * Returns cached write-access status without redirecting.
 * On first call (or after cache reset), fetches from /api/auth/me and caches the result.
 * Concurrent calls are deduplicated.
 */
export async function checkWriteAccessCached(): Promise<boolean> {
  if (cachedWriteAccess !== null) {
    return cachedWriteAccess;
  }

  if (inFlightPromise !== null) {
    return inFlightPromise;
  }

  inFlightPromise = (async () => {
    const result = await readHasWriteAccess();
    cachedWriteAccess = result;
    return result;
  })();

  try {
    return await inFlightPromise;
  } finally {
    inFlightPromise = null;
  }
}

export function resetWriteAccessCache(): void {
  cachedWriteAccess = null;
  inFlightPromise = null;
}
