Warp Prompt — Step-Up (Second-Stage) Google Write Authorization (Same-Window Redirect)

Context

We already have:

Cookie-based auth

/api/auth/me endpoint returning { hasWriteAccess: boolean }

Write-protected API endpoints annotated with OpenAPI extension:

"x-requires-youtube-write": true

Backend Google write-consent flow at:

GET /api/auth/login/google/write?returnUrl=...

After consent, the user is redirected back to returnUrl with updated claims (yt_write_granted = true)

Goal

Implement step-up authorization for write operations without UI buttons or popups:

If a write-protected operation is attempted and write access is missing:
→ Redirect the current window to the Google write-consent endpoint

After consent and redirect back:
→ The operation can be retried by the user

Do not derive UI from write access

Do not store write access in React state

Avoid console noise on expected 401 responses

Requirements

No popup windows

Same-window redirect only

No React state for write access

Cache write access in a module-level ref

Deduplicate concurrent checks

Treat 401 from /api/auth/me as “not authenticated” (no error logging)

Do not retry the mutation automatically after redirect

Reuse OpenAPI metadata (x-requires-youtube-write) where possible

Invalidate cached write access on logout

Implementation Tasks
1️⃣ Create a write-access guard module

Create src/auth/writeAccess.ts that:

Keeps:

writeGrantedRef: boolean | null

inFlightPromise: Promise<boolean> | null

Exposes:

export async function ensureWriteAccess(): Promise<boolean>;
export function resetWriteAccessCache(): void;

Behavior

If cached true → return true

If unknown → call /api/auth/me

If hasWriteAccess === false:

Redirect current window to:

/api/auth/login/google/write?returnUrl=<currentPath>

Return false

Suppress logging for 401

2️⃣ Same-window redirect helper

Use:

window.location.assign('/api/auth/login/google/write?returnUrl=...');

Do not use axios / React Query for redirect endpoints.

3️⃣ Integrate with write mutations

Before executing any write mutation:

if (!(await ensureWriteAccess())) return;

4️⃣ Optional: OpenAPI-driven protection

If feasible:

Use x-requires-youtube-write metadata from Orval/OpenAPI

Centralize logic so only annotated endpoints require step-up auth

5️⃣ AuthContext integration

On logout:

Call resetWriteAccessCache()

Do not store write access in AuthContext state

Explicit Non-Goals

❌ No popup OAuth
❌ No UI toggle or “Grant access” button
❌ No React state for write permissions
❌ No automatic replay of write actions after redirect

Outcome

Clean step-up authorization

No rendering side effects

OAuth flow behaves like a native web app

Zero accidental re-renders

Predictable, debuggable behavior

If Warp needs clarification:

Redirect flow is intentional

Second-stage auth is action-triggered

Write permission is capability-based, not UI-driven

End of prompt

If you want, next we can:

Add automatic retry after redirect

Auto-wrap Orval write mutations

Generate typings for x-requires-youtube-write

Harden against race conditions in multi-tab scenarios
