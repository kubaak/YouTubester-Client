Warp prompt — Add “redirect warning” + auto-resume write action after step-up auth (YouTubester-Client)

You are working in YouTubester-Client (React + Vite + TS) with:

cookie-based auth

backend endpoint GET /api/auth/me returning JSON including hasWriteAccess: boolean

step-up flow starts at: GET /api/auth/login/google/write?returnUrl=...

after consent, server redirects back to returnUrl and claim yt_write_granted=true is present

We already implemented a write-guard (ensureWriteAccess() / writeAccess.ts) that redirects current window when write access is missing, and caches capability in module-level variables (no React state).

Goal

Improve UX:

Warn user before redirecting to Google (“This action needs YouTube write access. You’ll be redirected. Continue?”)

After the user returns from Google, automatically perform the action they originally tried (auto-resume), once, safely.

Constraints

Keep core guard logic UI-free (no dialogs inside writeAccess.ts)

Do NOT derive UI from write access generally (no “grant access” button); only show a warning when an action triggers step-up.

No popup. Use same-window redirect.

Use sessionStorage (not localStorage) for pending action.

Add TTL for pending actions (e.g. 5 minutes).

Prevent double execution (React strict mode / rerenders).

401 from /api/auth/me is expected when not logged in: do not spam console.error.

Implement

1. Pending action storage helper

Create src/auth/pendingWriteAction.ts:

Types:

export type PendingWriteAction =
| { kind: 'videos.copyTemplate'; payload: import('@/api').CopyVideoTemplateRequest; createdAt: number; ttlMs: number }
| { kind: 'replies.approve'; payload: { commentId: string /_ or whatever _/ }; createdAt: number; ttlMs: number };

Functions:

export function setPendingWriteAction(action: PendingWriteAction): void;
export function getPendingWriteAction(): PendingWriteAction | null; // returns null if missing/expired/bad json
export function clearPendingWriteAction(): void;

Key: yt:pendingWriteAction
TTL default: 5 \* 60_000

2. UI wrapper: “warn then step-up”

Create src/auth/ensureWriteConsentForAction.ts:

It should accept:

type ConfirmFn = (message: string) => Promise<boolean>;
export async function ensureWriteConsentForAction<TPayload>(
opts: {
confirm: ConfirmFn;
kind: PendingWriteAction['kind'];
payload: any; // typed by overloads
}
): Promise<boolean>;

Behavior:

Call readHasWriteAccess() (reuse from writeAccess.ts or export a helper).

If already has write → return true.

Else:

show confirm dialog:
"This action requires YouTube write permission. You’ll be redirected to Google to grant it. Continue?"

if canceled → return false

if confirmed:

store pending action via setPendingWriteAction(...)

redirect to /api/auth/login/google/write?returnUrl=<currentPath>

return false (because navigation happens)

Important: keep redirect logic in one place (call existing redirect helper if available).

3. Auto-resume bootstrap

Create src/auth/PendingWriteActionBootstrap.tsx:

On mount, run exactly once using a useRef(false) guard.

Steps:

Read pending action: getPendingWriteAction(). If null → do nothing.

Call /api/auth/me (withCredentials) to confirm hasWriteAccess === true. If false → do nothing (keep pending action? or clear if expired).

If true:

Execute the action using a small registry.

Clear pending action immediately before executing (to avoid duplicates).

Optionally show a toast / console.info: “Resuming your action…”

Registry approach:

accept an actions object prop with handlers so hooks can be used in a parent.

OR use react-query’s QueryClient and call Orval functions directly (not hooks), whichever fits repo best.

Must handle failures gracefully and not infinite loop.

4. Wire it into the app

Wrap app root with <PendingWriteActionBootstrap /> somewhere that has access to:

query client

auth initialization (cookies ready)

router ready

If simplest: put it inside Layout (top-level) or inside AuthProvider after initialization.

5. Update the two write actions

For:

Videos/copy-template submit handler

Replies/approve handler

Change flow:

before calling mutation, call ensureWriteConsentForAction({ confirm, kind, payload })

if it returns false → exit (redirect will happen or user canceled)

if it returns true → proceed with mutation

For copy-template:

use your existing useRadixConfirmDialog() confirm for BOTH:

the normal “Copy this template?” confirm

the new “You’ll be redirected to grant write access” confirm
(You can reuse the same confirm function with different messages.)

6. Cache reset on logout

Ensure resetWriteAccessCache() and clearPendingWriteAction() are called on logout to avoid stale resume.

Acceptance criteria

Clicking a write action without write permission shows a confirm warning.

If user confirms, app redirects to Google write consent.

After returning to SPA, the app automatically performs the originally intended action once.

No repeated auto execution on refresh (clears pending action).

Pending action expires after TTL.

No noisy console.error on expected 401.

Implement this cleanly with minimal files and correct imports for this repo.
