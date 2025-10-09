// src/components/replies/Toolbar.tsx
import React from "react";
import { Search } from "lucide-react";

export function Toolbar({
  query,
  onQueryChange,
  selectAll,
  onToggleAll,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  selectAll: boolean;
  onToggleAll: (v: boolean) => void;
}) {
  return (
    <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border"
          checked={selectAll}
          onChange={(e) => onToggleAll(e.target.checked)}
        />
        Select all
      </label>

      <div className="relative w-full sm:w-80">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Filter drafts (title, comment, suggestion)"
          className="w-full rounded-2xl border border-neutral-200 bg-white px-9 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-black/20"
        />
      </div>
    </div>
  );
}
