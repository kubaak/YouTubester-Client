Task: Wire up second-stage YouTube write consent on the client (no server changes)
Goals

Proactively request write consent before calling write-protected endpoints.

Derive “write-required” from OpenAPI (x-requires-youtube-write) — no hardcoding.

Handle 403 WRITE_CONSENT_REQUIRED defensively and retry once.

Hydrate UI with /api/auth/me (hasWriteAccess) and offer a “Grant access” CTA.

Changes to make

1. Generate a map of write-protected endpoints from Swagger

Create scripts/gen-requires-write.mjs that reads /swagger/v1/swagger.json and emits a tiny TS module:

Input: Swagger JSON at http://localhost:5094/swagger/v1/swagger.json

Output: web/src/auth/requiresWrite.generated.ts (a Set<string> of "METHOD /path")

Add NPM scripts so this runs before dev and build.

2. Client auth store for hasWriteAccess

Create web/src/auth/authStore.ts with a small store (Context or Zustand) that:

Keeps hasWriteAccess: boolean | null

Exposes refreshAuth() → GET /api/auth/me and set hasWriteAccess

Call refreshAuth() during app bootstrap (e.g., in App.tsx useEffect).

3. Consent flow helper

Create web/src/auth/ensureWriteConsent.ts that:

If hasWriteAccess is true → return.

Otherwise opens a popup to /api/auth/google/write/start?returnUrl=<current>.
If popup blocked, full-page redirect is fine.

Polls until the popup closes, then calls refreshAuth(); resolves to true only if hasWriteAccess becomes true.

4. Guard wrapper for write calls (+ 403 retry)

Create web/src/auth/writeGuard.ts that exports:

callWithWriteGuard({ method, url, fetcher })

Normalizes method+path into "METHOD /path".

If the pair is in requiresWrite and !hasWriteAccess, runs ensureWriteConsent() first.

Executes fetcher() (your Orval call).

If it throws with 403 and code === "WRITE_CONSENT_REQUIRED", runs consent and retries once.

5. Use the guard for your two write mutations

Videos: POST /api/videos/copy-template

Replies: POST /api/replies/approve (adjust the actual Orval hook name)

Wrap those mutations at their call sites with callWithWriteGuard (pass the exact method+url your client uses). Keep the rest of your code unchanged.

6. Optional UI: Header CTA

If hasWriteAccess === false, render a small “Grant YouTube write access” button in the header that calls ensureWriteConsent() and then refreshAuth().

Implementation details (what to edit/add)

File: scripts/gen-requires-write.mjs

Fetch swagger JSON from http://localhost:5094/swagger/v1/swagger.json

For each path+method, if x-requires-youtube-write: true, add "METHOD /path" to a Set

Emit web/src/auth/requiresWrite.generated.ts:

// AUTO-GENERATED. Do not edit.
// Format: Set of "METHOD path"
export const requiresWrite = new Set<string>([
"POST /api/videos/copy-template",
"POST /api/replies/approve",
]);

package.json (client)

{
"scripts": {
"gen:requiresWrite": "node ./scripts/gen-requires-write.mjs",
"dev": "npm run gen:requiresWrite && vite",
"build": "npm run gen:requiresWrite && vite build"
}
}

File: web/src/auth/authStore.ts (Zustand example)

State: hasWriteAccess: boolean | null

refreshAuth() → GET /api/auth/me (same origin, credentials: 'include') and set hasWriteAccess to response.hasWriteAccess === true

File: web/src/auth/ensureWriteConsent.ts

If already granted → return true

const startUrl = '/api/auth/google/write/start?returnUrl=' + encodeURIComponent(location.pathname + location.search)

Try centered popup; if blocked, location.assign(startUrl)

Poll popup.closed every 500ms; when closed, await refreshAuth(); return updated hasWriteAccess

File: web/src/auth/writeGuard.ts

Import requiresWrite, ensureWriteConsent, and useAuth store getter

keyOf(method,url) → "METHOD /path" (normalize URL to path only)

If write required and not granted: await ensureWriteConsent() (abort if false)

Run fetcher()

On 403 with code === 'WRITE_CONSENT_REQUIRED': run consent and retry once

Use it on the two mutations

Wherever you call:

usePostApiVideosCopyTemplate().mutateAsync({ data: req })

usePostApiRepliesApprove().mutateAsync({ data: req }) (adjust)

Wrap:

await callWithWriteGuard({
method: 'POST',
url: '/api/videos/copy-template',
fetcher: () => copyMutation.mutateAsync({ data: req }),
});

…and similarly for replies approve.

Bootstrap

On app start, call refreshAuth() once so the store knows hasWriteAccess.

(Optional) Add a header CTA that calls ensureWriteConsent() when clicked.

Acceptance checklist

Starting with read-only session:

Clicking Copy Template or Approve:

Triggers Google consent (popup/redirect).

On success, call succeeds without manual page reload (single retry works).

/api/auth/me reflects hasWriteAccess: true after consent.

If user cancels consent, the guarded action aborts gracefully (toast/message).

No hardcoded endpoint lists: map is generated from Swagger.

Same-origin on http://localhost:5094; no CORS adjustments required.

Notes

Keep your dev routing so /api/\* is not proxied to Vite; map controllers before SPA proxy (as you already did).

If you later prefer to make this totally automatic, move the guard logic into an Axios request/response interceptor and reuse the same requiresWrite + consent helper.
