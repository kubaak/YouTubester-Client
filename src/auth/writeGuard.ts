import type { AxiosError } from 'axios';
import { requiresWrite } from './requiresWrite.generated';
import { ensureWriteConsent } from './ensureWriteConsent';

interface CallWithWriteGuardArgs<T> {
  method: string;
  url: string;
  fetcher: () => Promise<T>;
}

interface ProblemDetailsLike {
  code?: string;
}

function keyOf(method: string, url: string): string {
  var upperMethod = method.toUpperCase();
  var path = url.replace(/^https?:\/\/[^/]+/i, '');
  return `${upperMethod} ${path}`;
}

function isWriteConsentError(error: unknown): boolean {
  var axiosError = error as AxiosError<ProblemDetailsLike> | undefined;
  if (!axiosError || !axiosError.response) {
    return false;
  }

  if (axiosError.response.status !== 403) {
    return false;
  }

  var data = axiosError.response.data;
  return data != null && (data as ProblemDetailsLike).code === 'WRITE_CONSENT_REQUIRED';
}

export async function callWithWriteGuard<T>(args: CallWithWriteGuardArgs<T>): Promise<T> {
  var { method, url, fetcher } = args;
  var key = keyOf(method, url);

  if (requiresWrite.has(key)) {
    var initialConsent = await ensureWriteConsent();
    if (!initialConsent) {
      throw new Error('YouTube write access is required to perform this action.');
    }
  }

  try {
    return await fetcher();
  } catch (error) {
    if (!isWriteConsentError(error)) {
      throw error;
    }

    var consent = await ensureWriteConsent();
    if (!consent) {
      throw error;
    }

    return await fetcher();
  }
}
