You are a senior React + TypeScript engineer working on a production-ready SaaS frontend.

I want you to refactor and redesign the Replies page into a clean, maintainable component structure and switch it to a new API endpoint called `SearchSuggestedReplies`.

Tech/context assumptions:

- React
- TypeScript
- Tailwind CSS
- Existing project already has a Replies page and a current `ReplyCard`
- Existing project likely uses generated API clients/hooks
- Code should be PR-quality, production-ready, and easy to review
- Do not over-engineer

## Goal

Implement a new Replies UI with this recommended structure:

- `RepliesPage`
- `RepliesFilterSection`
- `RepliesContent`
- `ReplyCard`
- optionally `useRepliesSearch` hook if it makes the logic cleaner

## Responsibility split

### `RepliesPage`

This should be the page/container component.
Responsibilities:

- page-level orchestration only
- owns:
  - `isFilterOpen`
  - draft filter state
  - applied filter state

- wires up the search/pagination logic
- renders the filter toggle button
- renders the filter section conditionally
- passes prepared state/data into `RepliesContent`

This component should stay relatively thin and readable.

### `RepliesFilterSection`

This should be a presentational filter form component.
Responsibilities:

- render filter controls
- accept current draft filter values via props
- emit callbacks for:
  - changing filter values
  - apply filter
  - reset filter
  - close/hide section

- should NOT fetch data directly
- filters should NOT auto-apply on input change

### `RepliesContent`

This should own the rendering of the results area.
Responsibilities:

- render initial loading state
- render empty state
- render the list of replies
- render loading-more state
- render optional end-of-list state
- contain the infinite-scroll sentinel element
- map items to `ReplyCard`

This component should keep list rendering and state-display logic out of `RepliesPage`.

### `ReplyCard`

This should render one reply item only.
Responsibilities:

- presentation of a single reply
- reuse/refactor the current `ReplyCard`
- no page orchestration logic inside it

### Optional: `useRepliesSearch`

If useful, extract the data-loading logic into a hook.
Responsibilities:

- call `SearchSuggestedReplies`
- handle `pageToken`
- handle reset when applied filters change
- handle next-page loading
- prevent duplicate concurrent fetches

Use this only if it clearly improves readability.

---

## Functional requirements

### Filter section behavior

- The filter section must be hidden by default
- Initially show only a button with a filter icon
- Clicking the button opens the filter section
- Filters are editable in the filter section, but they should only affect the query after clicking a `Filter` button
- Keep a distinction between:
  - draft filters
  - applied filters

- Include a `Reset` action that clears filters and reloads unfiltered results
- Include a way to close the filter section

### Data source

- Replace the old replies loading logic with the new API endpoint: `SearchSuggestedReplies`
- The API supports:
  - filtering
  - paging using `pageToken`

### Infinite scrolling

- Load the first page on initial render
- Load subsequent pages when the user scrolls near the bottom
- Use the returned `pageToken` to request the next page
- Stop loading when there is no next `pageToken`
- Prevent duplicate requests
- Prevent multiple simultaneous next-page fetches
- An `IntersectionObserver` approach is preferred if suitable

### Filter application behavior

- When the user clicks `Filter`:
  - clear current accumulated items
  - restart from first page
  - call `SearchSuggestedReplies` with the applied filters

- Do NOT auto-apply filters while typing/changing inputs

---

## State expectations

Use a clean and explicit state model. A structure similar to this is expected:

- `isFilterOpen`
- `draftFilters`
- `appliedFilters`

And for query/loading state:

- accumulated replies
- `nextPageToken`
- `hasNextPage`
- `isInitialLoading`
- `isFetchingNextPage`
- any error state if needed

Keep the state flow predictable and easy to review.

---

## UX expectations

- production-ready SaaS styling
- clean spacing and hierarchy
- polished filter toggle button
- no clutter
- smooth UX
- no janky re-renders
- useful empty state when no results are found
- clear initial loading state
- clear loading-more indicator during infinite scroll

---

## Code quality expectations

- strong TypeScript typing
- small, readable components
- practical abstractions only
- no unnecessary libraries
- avoid deeply nested logic in the page component
- keep the final structure easy for a human reviewer to understand
- prefer simple maintainable code over clever abstractions

---

## What I want from you

1. Briefly explain the proposed component structure and state flow
2. Refactor the page into:
   - `RepliesPage`
   - `RepliesFilterSection`
   - `RepliesContent`
   - `ReplyCard`
   - optional `useRepliesSearch`

3. Replace the old data loading with `SearchSuggestedReplies`
4. Implement infinite scrolling using `pageToken`
5. Implement hidden-by-default filter UI with a filter icon button
6. Ensure filters apply only when the user clicks `Filter`
7. Add reset behavior for filters
8. Keep the solution production-ready and PR-ready

## Output format

- First, explain the proposed structure briefly
- Then provide the code changes
- Prefer complete file contents for changed files
- Make reasonable assumptions and proceed
- Do not stop to ask unnecessary questions

## Important

Optimize for a clean PR-quality implementation that fits an existing React codebase.
