I have an existing page that combines two responsibilities:

1. Generating AI metadata for a YouTube video (enqueue background job + polling)
2. Reviewing/editing a metadata snapshot and submitting it to YouTube

I want to refactor this into two separate pages:

1. Generate page

- Allows selecting a video
- Allows setting AI generation options (prompt, toggles)
- Calls an API to enqueue an AI generation job
- After success, redirects to the Review page with the selected videoId

2. Review page

- Reads videoId from the URL (query param or route param)
- Allows selecting a different video via a VideoSelect component
- Loads video snapshot using React Query
- Polls while AI generation is in progress
- Displays editable fields: title, description, tags
- Allows:
  - Saving draft metadata (without submitting to YouTube) - new endpoint usePostApiVideosSaveDraft
  - Submitting metadata to YouTube

Technical constraints and requirements:

- Use query invalidation after mutations
- Preserve good UX:
  - Disable inputs while AI generation is in progress
  - Avoid overwriting user edits incorrectly when new server data arrives
  - Handle “unsaved changes” when switching videos

- The Review page should treat the URL as the source of truth for selected videoId
- Changing selected video should update the URL
- Avoid duplicated state between URL and form

Architecture goals:

- Clean separation of concerns between pages
- Extract reusable hooks where appropriate (e.g., snapshot syncing, polling logic)
- Keep components readable and maintainable
- Avoid unnecessary re-renders
- Prefer const over var
- Avoid unsafe casts when possible

What I want you to produce:

1. Proposed folder/component structure
2. Example React Router setup for the two pages
3. Implementation for:
   - Generate page
   - Review page

4. custom hooks (if useful)
5. How to handle:
   - syncing server snapshot into form without clobbering user edits
   - draft saving vs submit to YouTube
   - URL ↔ state synchronization

6. Any improvements or pitfalls in this architecture
