# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

YouTubester-Client is a React frontend application for managing YouTube content operations. It's built with Vite, TypeScript, and React Query for state management. The application provides two main interfaces:
- **RepliesPage**: AG Grid-based interface for reviewing and approving YouTube comment replies
- **VideoTemplatePage**: Form-based interface for copying video templates between YouTube channels with optional AI enhancements

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (proxies /api to localhost:5094)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview

# Generate API client from backend OpenAPI spec
npm run orval:gen
```

## Architecture Overview

### Backend Integration
- API calls proxy to `http://localhost:5094` during development (configured in vite.config.ts)
- Orval generates TypeScript API clients from OpenAPI spec at `/swagger/v1/swagger.json`
- Generated API code uses React Query with Axios for HTTP client
- API files are auto-generated in `src/api/` and should not be manually edited

### State Management
- React Query handles server state management and caching
- Form state managed by react-hook-form
- Local UI state uses React hooks

### UI Framework
- Tailwind CSS for styling with custom design system variables
- shadcn/ui components (configured for "new-york" style)
- Radix UI primitives for accessible components
- AG Grid Community for data tables
- Lucide React for icons

### Routing
- React Router DOM for client-side routing
- Two main routes: `/replies` and `/videoTemplate`
- Root redirects to `/replies`

## Key Components

### RepliesPage
- Uses AG Grid for displaying YouTube comment replies
- Supports batch operations (approve/ignore selected replies)
- Inline editing for reply text with 10,000 character limit
- Real-time updates via React Query mutations
- Confirmation dialogs for destructive actions

### VideoTemplatePage
- Complex form with conditional UI based on AI toggle
- Mutual exclusivity between "copy tags" and "generate tags" options
- Form validation prevents submission without required fields
- Uses react-hook-form with automatic form state management

### API Integration Pattern
- All API calls use generated hooks from Orval (e.g., `useGetApiReplies`, `usePostApiRepliesApprove`)
- Mutations automatically invalidate related queries for cache consistency
- Error handling through React Query's built-in error states

## Development Notes

### API Client Generation
- Run `npm run orval:gen` after backend API changes to regenerate client code
- Generated files in `src/api/` include TypeScript types and React Query hooks
- Backend must be running on localhost:5094 for generation to work

### Styling Conventions
- Uses Tailwind with custom CSS variables for theming
- Dark mode support through CSS variable overrides
- Component styling follows shadcn/ui patterns
- Path aliases configured: `@/*` maps to `src/*`

### Data Flow
- Server data: React Query → API hooks → Component state
- Form data: react-hook-form → Form submission → API mutation → Query invalidation
- UI state: React hooks for local component state

### Component Structure
- Pages in `src/pages/` for main route components
- Reusable UI components in `src/components/ui/`
- Generated API types and hooks in `src/api/`
- Utility functions in `src/lib/`