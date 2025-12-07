import type { AxiosError, AxiosRequestConfig } from 'axios';
import { getApiAuthMe } from '@/api/authentication/authentication';
import { requiresWrite } from '@/auth/requiresWrite.generated';

type AuthMeDto = {
  hasWriteAccess?: boolean;
};

// Module-level cached capability (no UI derived from it)
var writeGrantedRef: boolean | null = null;

// Deduplicate concurrent checks (double click, two mutations at once)
var inFlightPromise: Promise<boolean> | null = null;

function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}

function getCurrentPath(): string {
  return window.location.pathname + window.location.search;
}

export function redirectToWriteConsent(): void {
  var returnUrl = encodeURIComponent(getCurrentPath());
  var writeConsentUrlPath = `/api/auth/login/google/write?returnUrl=${returnUrl}`;

  // Same-window redirect only (no popups)
  window.location.assign(writeConsentUrlPath);
}

export async function readHasWriteAccess(): Promise<boolean> {
  var axiosOptions: AxiosRequestConfig = {
    withCredentials: true,
  };

  try {
    // Orval types this as AxiosResponse<void>, but backend returns JSON.
    var response = await getApiAuthMe(axiosOptions);
    var authMeResponse = (response?.data ?? {}) as AuthMeDto;
    return authMeResponse.hasWriteAccess === true;
  } catch (error) {
    // 401 is expected when not logged in / session expired -> treat as "not authenticated" without console noise.
    if (isAxiosError(error) && error.response?.status === 401) {
      return false;
    }

    console.error('Failed to read /api/auth/me:', error);
    return false;
  }
}

/**
 * Ensures the user has YouTube write access.
 * - If cached true -> returns true.
 * - If cached false -> redirects to write-consent endpoint and returns false.
 * - If unknown -> calls /api/auth/me and decides.
 *
 * Note: This does not automatically retry any mutation after redirect.
 */
export async function ensureWriteAccess(): Promise<boolean> {
  if (writeGrantedRef === true) {
    return true;
  }

  if (writeGrantedRef === false) {
    redirectToWriteConsent();
    return false;
  }

  if (inFlightPromise !== null) {
    return inFlightPromise;
  }

  inFlightPromise = (async () => {
    var hasWriteAccess = await readHasWriteAccess();

    if (hasWriteAccess) {
      writeGrantedRef = true;
      return true;
    }

    writeGrantedRef = false;
    redirectToWriteConsent();
    return false;
  })();

  try {
    return await inFlightPromise;
  } finally {
    inFlightPromise = null;
  }
}

export function resetWriteAccessCache(): void {
  writeGrantedRef = null;
  inFlightPromise = null;
}

function keyOf(method: string, url: string): string {
  var upperMethod = method.toUpperCase();
  var path = url.replace(/^https?:\/\/[^/]+/i, '');
  return `${upperMethod} ${path}`;
}

/**
 * Optional helper: only step-up when the OpenAPI-generated metadata indicates the endpoint is write-protected.
 */
export async function ensureWriteAccessForRequest(method: string, url: string): Promise<boolean> {
  var requestKey = keyOf(method, url);

  if (!requiresWrite.has(requestKey)) {
    return true;
  }

  return await ensureWriteAccess();
}
