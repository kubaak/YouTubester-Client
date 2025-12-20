import type { CopyVideoTemplateRequest, DraftDecisionDto } from '@/api';

export type PendingWriteAction =
  | {
      kind: 'videos.copyTemplate';
      payload: CopyVideoTemplateRequest;
      createdAt: number;
      timeToLiveMilliseconds: number;
    }
  | {
      kind: 'replies.approve';
      payload: DraftDecisionDto[];
      createdAt: number;
      timeToLiveMilliseconds: number;
    };

const PENDING_WRITE_ACTION_KEY = 'yt:pendingWriteAction';
const DEFAULT_TIME_TO_LIVE_MILLISECONDS = 5 * 60_000;

export function setPendingWriteAction(action: Omit<PendingWriteAction, 'timeToLiveMilliseconds'> & { timeToLiveMilliseconds?: number }): void {
  var actionToStore: PendingWriteAction = {
    ...action,
    timeToLiveMilliseconds: action.timeToLiveMilliseconds ?? DEFAULT_TIME_TO_LIVE_MILLISECONDS,
  } as PendingWriteAction;

  sessionStorage.setItem(PENDING_WRITE_ACTION_KEY, JSON.stringify(actionToStore));
}

export function getPendingWriteAction(): PendingWriteAction | null {
  var rawValue = sessionStorage.getItem(PENDING_WRITE_ACTION_KEY);
  if (rawValue == null || rawValue.length === 0) {
    return null;
  }

  try {
    var parsed = JSON.parse(rawValue) as Partial<PendingWriteAction>;

    if (parsed == null || typeof parsed !== 'object') {
      return null;
    }

    if (parsed.kind !== 'videos.copyTemplate' && parsed.kind !== 'replies.approve') {
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
