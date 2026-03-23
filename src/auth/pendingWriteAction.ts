import { normalizeUrl } from '@/auth/requestKey';

export type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const allowedMethods: HttpMethod[] = ['POST', 'PUT', 'PATCH', 'DELETE'];

function isHttpMethod(value: unknown): value is HttpMethod {
  return typeof value === 'string' && allowedMethods.includes(value as HttpMethod);
}

export type PendingWriteAction = {
  method: HttpMethod;
  url: string;
  body: unknown;
  createdAt: number;
  timeToLiveMilliseconds: number;
};

const PENDING_WRITE_ACTION_KEY = 'tubester:pendingWriteAction';
const DEFAULT_TIME_TO_LIVE_MILLISECONDS = 5 * 60_000;

export function setPendingWriteAction(
  action: Omit<PendingWriteAction, 'timeToLiveMilliseconds'> & { timeToLiveMilliseconds?: number },
): void {
  const actionToStore: PendingWriteAction = {
    ...action,
    url: normalizeUrl(action.url),
    timeToLiveMilliseconds: action.timeToLiveMilliseconds ?? DEFAULT_TIME_TO_LIVE_MILLISECONDS,
  };

  sessionStorage.setItem(PENDING_WRITE_ACTION_KEY, JSON.stringify(actionToStore));
}

export function getPendingWriteAction(): PendingWriteAction | null {
  const rawValue = sessionStorage.getItem(PENDING_WRITE_ACTION_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<PendingWriteAction>;

    if (parsed == null || typeof parsed !== 'object') {
      return null;
    }

    if (!isHttpMethod(parsed.method)) {
      return null;
    }

    if (typeof parsed.url !== 'string' || parsed.url.length === 0) {
      return null;
    }

    if (!parsed.url.startsWith('/')) {
      return null;
    }

    if (typeof parsed.createdAt !== 'number') {
      return null;
    }

    if (typeof parsed.timeToLiveMilliseconds !== 'number') {
      return null;
    }

    if (Date.now() > parsed.createdAt + parsed.timeToLiveMilliseconds) {
      clearPendingWriteAction();
      return null;
    }

    return parsed as PendingWriteAction;
  } catch {
    return null;
  }
}

export function clearPendingWriteAction(): void {
  sessionStorage.removeItem(PENDING_WRITE_ACTION_KEY);
}
