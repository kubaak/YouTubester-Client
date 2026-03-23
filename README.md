# YouTubester Client

A React + TypeScript + Vite frontend for YouTubester – an AI‑powered assistant that helps YouTube creators manage comments, generate smart replies, and reuse video metadata templates.

## Tech stack

- React 19 + TypeScript
- Vite 7
- React Router DOM 7
- @tanstack/react-query for data fetching and caching
- Axios HTTP client
- AG Grid for tabular reply review
- Tailwind CSS–based styling utilities
- Radix UI and lucide-react icons

## Prerequisites

- Node.js and npm installed
- YouTubester backend API running locally and exposing Swagger at:
  - `http://localhost:5094/swagger/v1/swagger.json`
- The frontend expects the API to be available at `/api`, which is proxied to `http://localhost:5094` by `vite.config.ts`.

If your backend runs on a different URL or port, update both `vite.config.ts` and `orval.config.ts` accordingly.

## Installation

```bash
npm install
```

## Scripts

- `npm run dev` – Start the Vite development server (proxying `/api` to the backend)
- `npm run build` – Build the production bundle
- `npm run preview` – Preview the production build locally
- `npm run lint` – Run ESLint on the project
- `npm run gen:requiresWrite` – Regenerate the YouTube write-access map from the backend Swagger
- `npm run orval:gen` – Regenerate the TypeScript API client from the backend Swagger

### Development

1. Make sure the YouTubester backend is running on `http://localhost:5094`.
2. From this directory, install dependencies with `npm install`.
3. Run the app:

   ```bash
   npm run dev
   ```

4. Open the URL printed by Vite (typically `http://localhost:5173`).

## Generated API client and write-access metadata

The frontend relies on the backend Swagger definition for two things:

- **Typed API client** – Generated with [orval]. Configuration lives in `orval.config.ts` and outputs to `src/api` and `src/api/index.ts`.
- **Write-access metadata** – `scripts/gen-requires-write.mjs` reads the Swagger document and generates `src/auth/requiresWrite.generated.ts`, which lists all endpoints that require YouTube write access (`x-requires-youtube-write`).

These are automatically refreshed when running certain scripts, but you can also regenerate them manually:

```bash
npm run orval:gen
npm run gen:requiresWrite
```

Make sure the backend (including Swagger at `http://localhost:5094/swagger/v1/swagger.json`) is reachable before running these commands.

## Application overview

After authentication, the app uses a sidebar layout (`Layout.tsx`) with multiple sections:

- **Dashboard** – High-level stats and quick actions related to replies, templates, users, and engagement.
- **Replies** – AG Grid–based UI to review AI-suggested replies to YouTube comments, edit the final reply text, and approve or ignore in bulk.
- **Copy Template** – Copy metadata (tags, location, playlists, category, default languages) from one video to another.
- **AI Template** – Generate or enrich title, description, and tags for a selected video using AI, then submit changes back to YouTube.
- **Settings** – User and account configuration.
- **Help / About / Contact / FAQ / Privacy / Terms** – Static informational pages describing the product, support, and policies.

### Authentication

- Sign-in is handled via **Google / YouTube OAuth** on the backend.
- The frontend uses cookie-based authentication and calls `/api/auth/me` to obtain the current user.
- Login flow is initiated by redirecting the browser to `/api/auth/login/google` with an optional `returnUrl` query parameter.
- Logout clears local state and calls the backend logout endpoint before redirecting back to `/login`.

### Backend integration

- All API calls are made relative to `/api` (no hard-coded host); Vite proxies this to the backend during development.
- Endpoints that modify YouTube data are guarded by a write-access consent flow using the generated `requiresWrite` map and helper utilities in `src/auth`.

## Project structure (high level)

- `src/main.tsx` – React entry point
- `src/App.tsx` – Router and global providers (React Query, auth, routing)
- `src/pages/` – Route pages (Dashboard, Replies, AI Template, Copy Template, Settings, static content, etc.)
- `src/components/` – Reusable UI components and layout
- `src/contexts/AuthContext.tsx` – Authentication context and hooks
- `src/services/auth.ts` – Client-side authentication service helpers
- `src/api/` – Generated API client and DTO types
- `src/auth/` – Write-access utilities and generated `requiresWrite` map

## Notes

- The project uses a path alias `@` that points to `src` (configured in `vite.config.ts`), so imports such as `@/pages/RepliesPage` or `@/components/Layout` are resolved from the `src` directory.
