import { Check, X } from 'lucide-react';
import { VideoVisibility } from '@/api';
import type { VideoVisibility as VideoVisibilityValue } from '@/api';
import { cn } from '@/lib/cn';

const VISIBILITY_OPTIONS = Object.values(VideoVisibility) as VideoVisibilityValue[];

type Props = {
  filter: string;
  onFilterChange: (value: string) => void;
  selectedVisibilities: readonly VideoVisibilityValue[];
  onVisibilityToggle: (visibility: VideoVisibilityValue) => void;
};

export function VideoSelectFilters({ filter, onFilterChange, selectedVisibilities, onVisibilityToggle }: Props) {
  return (
    <div className="p-2 border-b flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Type to filter…"
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
          autoFocus
        />
        {filter && (
          <button
            type="button"
            aria-label="Clear filter"
            className="p-2 rounded-lg border hover:bg-gray-50"
            onClick={() => onFilterChange('')}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {VISIBILITY_OPTIONS.map((option) => {
          const active = selectedVisibilities.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onVisibilityToggle(option)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                active ? 'border-black bg-black text-white' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
              )}
              aria-pressed={active}
            >
              {active && <Check className="w-3 h-3" />}
              <span>{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
