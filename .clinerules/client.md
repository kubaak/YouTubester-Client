# Tubester Client Rules

## Stack

This repository uses:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack React Query
- generated API clients

Favor existing project patterns over generic frontend trends.

## Primary Frontend Principles

Build UI that is:

- production-ready
- polished
- consistent
- accessible
- responsive
- easy to scan
- easy to maintain

Optimize for real SaaS quality, not prototype quality.

## Product Context

Tubester is an AI-assisted SaaS product for YouTube creators.
The UI should feel:

- clean
- modern
- trustworthy
- efficient
- focused on workflow productivity

Avoid hobby-project or dashboard-template feeling.
Aim for confident, production-grade SaaS UX.

## UI Quality Standard

Every UI change should feel intentional.

Prefer:

- strong visual hierarchy
- clear spacing rhythm
- clean typography
- balanced card layouts
- consistent button/input sizing
- obvious actions
- clear empty/loading/error states

Avoid:

- clutter
- weak contrast
- inconsistent spacing
- cramped forms
- vague actions
- over-decorated layouts
- prototype-looking sections

## Component Design

Prefer decomposition into meaningful units such as:

- page shell/container
- content section
- filter/search section
- cards/tables/list items
- reusable form and feedback primitives

Guidelines:

- keep components focused
- split large pages when it improves clarity
- do not fragment into many tiny files without benefit
- keep presentational components simple
- keep page orchestration readable

Prefer components that are easy to review and easy to extend.

## State Management

Use the lightest correct approach.

Prefer:

- local state for local UI state
- React Query for server state
- derived state instead of duplicated state
- URL state for filters/search/paging when appropriate

Avoid:

- unnecessary global state
- multiple sources of truth
- effect-heavy synchronization when derivation works
- storing server data manually when React Query should own it

## React Query Discipline

Use TanStack React Query consistently.

Rules:

- use stable, meaningful query keys
- handle loading, empty, error, and success states deliberately
- preserve current pagination/infinite query semantics
- invalidate/refetch intentionally after mutations
- do not bypass existing query patterns without reason
- keep server-state behavior predictable

Be careful when changing:

- pagination
- infinite scrolling
- filters tied to query keys
- optimistic updates
- cache invalidation

## Generated API Client Discipline

Generated API clients are the contract source.

Rules:

- prefer generated types
- do not duplicate backend DTOs manually unless a separate UI model is truly needed
- keep request/response usage aligned with backend contracts
- be explicit around null/undefined handling
- be careful with enum handling
- do not weaken typing to silence errors

Whenever backend contracts change:

- update affected frontend code
- verify filters, DTO fields, and nullability
- verify mutation payloads
- verify empty/error state assumptions

## Routing

Use React Router patterns already established in the codebase.

Rules:

- keep route naming intuitive
- preserve deep-linkability where relevant
- keep auth flow behavior predictable
- do not introduce surprising navigation side effects
- preserve back-button friendliness

## Forms

Forms must be:

- easy to understand
- easy to submit
- easy to recover from errors
- visually consistent
- accessible

Prefer:

- clear labels
- clear helper/warning text
- clear validation messages
- sensible defaults
- explicit submit states
- consistent field spacing
- predictable disabled/loading behavior

Avoid:

- hidden requirements
- unclear toggles
- weak error feedback
- inconsistent spacing or button treatment
- validation behavior that feels random

## Filtering, Search, Lists, and Infinite Scroll

Tubester has list-heavy and workflow-heavy UIs.

Rules:

- keep filters understandable
- keep defaults sensible
- keep result rendering stable
- preserve infinite scrolling behavior carefully if used
- avoid mixing different pagination paradigms unless clearly needed
- prefer explicit "Apply filter" behavior where the feature calls for it
- ensure empty and no-results states are clear

When implementing filters:

- separate filter UI from results when useful
- keep advanced filters collapsible if appropriate
- do not make the page visually busy by default

## Styling with Tailwind

Use Tailwind consistently and intentionally.

Prefer:

- strong typography hierarchy
- consistent spacing scale
- consistent border radius
- consistent shadows/borders
- clear hover/focus/disabled states
- visual restraint
- reusable class patterns where appropriate

Avoid:

- arbitrary values unless justified
- inconsistent paddings/margins
- too many nested wrappers
- overuse of muted text
- weak contrast
- tiny click targets
- accidental layout shifts

## SaaS UX Bar

For major pages, aim for:

- clear title and supporting text
- obvious primary action
- clean filter/search affordance
- strong content hierarchy
- no ambiguity about what the user should do next

Prefer interfaces that feel like polished B2B/SaaS software.

## Accessibility

Do not ignore accessibility.

At minimum:

- buttons must be real buttons
- links must be real links
- inputs need labels
- keyboard interaction must work
- focus states must remain visible
- icon-only controls need accessible labels
- semantics should remain meaningful

## TypeScript Rules

Prefer strong typing.

Rules:

- avoid `any`
- avoid broad unsafe casts
- model nullable/optional behavior explicitly
- keep types close to data flow
- use unions/narrowing where it improves safety

Do not degrade type quality to get code compiling.

## Performance

Be reasonable and practical.

Prefer:

- avoiding unnecessary rerenders
- memoization only where useful
- scalable list rendering
- straightforward data flow
- lazy loading only where it provides real value

Do not micro-optimize at the expense of clarity.

## Error Handling

User-facing failures should be understandable.

Prefer:

- clear inline form errors
- meaningful empty/error states
- retry affordances for failed loads
- predictable fallbacks
- avoiding silent failures

## Dependency Policy

Do not add new npm packages lightly.

Before adding a dependency:

- check if the existing stack already solves it
- prefer browser/platform features
- prefer current utilities/components
- justify the package briefly

## Code Style

Prefer:

- readable JSX
- clear naming
- small helper functions when needed
- early returns where helpful
- composition over nested conditionals
- straightforward event handlers
- keeping business logic out of noisy JSX
- prefer using the async/await pattern instead of callbacks
- use shared ui components from src/components/ui where it makes sense

Avoid:

- giant page components with mixed concerns
- complex `useEffect` chains
- magic strings scattered everywhere
- ad hoc patterns when a local pattern already exists

## Safe Change Policy

When fixing UI bugs:

- make the smallest correct fix
- preserve business behavior
- avoid unrelated refactors

When redesigning a page:

- preserve business semantics unless explicitly changing them
- separate behavior changes from presentation changes when practical
- keep the result production-ready

## Tubester-Specific Frontend Mindset

This product helps creators move faster.
The UI should emphasize:

- clarity
- confidence
- fast scanning
- low friction
- polished workflow UX
- strong production-readiness

## Ignored Files

Respect `.clineignore`. Do not inspect or rely on ignored, generated, build, dependency, or secret files unless the task explicitly requires it.
