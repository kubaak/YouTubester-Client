import type { CopyVideoTemplateRequest, DraftDecisionDto } from '@/api';
import type { PendingWriteAction } from '@/auth/pendingWriteAction';
import { setPendingWriteAction } from '@/auth/pendingWriteAction';
import { readHasWriteAccess, redirectToWriteConsent } from '@/auth/writeAccess';

export type ConfirmFn = (message: string) => Promise<boolean>;

const WRITE_CONSENT_WARNING_MESSAGE =
  "This action requires YouTube write permission. You’ll be redirected to Google to grant it. Continue?";

export async function ensureWriteConsentForAction(opts: {
  confirm: ConfirmFn;
  kind: 'videos.copyTemplate';
  payload: CopyVideoTemplateRequest;
}): Promise<boolean>;
export async function ensureWriteConsentForAction(opts: {
  confirm: ConfirmFn;
  kind: 'replies.approve';
  payload: DraftDecisionDto[];
}): Promise<boolean>;
export async function ensureWriteConsentForAction(opts: {
  confirm: ConfirmFn;
  kind: PendingWriteAction['kind'];
  payload: unknown;
}): Promise<boolean> {
  var hasWriteAccess = await readHasWriteAccess();
  if (hasWriteAccess) {
    return true;
  }

  var ok = await opts.confirm(WRITE_CONSENT_WARNING_MESSAGE);
  if (!ok) {
    return false;
  }

  setPendingWriteAction({
    kind: opts.kind,
    payload: opts.payload as any,
    createdAt: Date.now(),
  });

  redirectToWriteConsent();
  return false;
}
