import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import type { VideoListItemDto } from '@/api';
import { cn } from '@/lib/cn';

type Props = {
  label: string;
  selected?: VideoListItemDto;
  placeholder?: string;
  disabled?: boolean;
  open: boolean;
  onClick: () => void;
};

export const VideoSelectTrigger = forwardRef<HTMLButtonElement, Props>(function VideoSelectTrigger(
  { label, selected, placeholder = 'Select a video…', disabled, open, onClick },
  ref,
) {
  return (
    <div className={cn('relative')}>
      <label className="block text-sm font-medium text-gray-900 mb-1">{label}</label>

      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black text-left flex items-center justify-between',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected ? (
          <span className="inline-flex items-center gap-3">
            {selected.thumbnailUrl && (
              <img
                src={selected.thumbnailUrl}
                alt={selected.title!}
                className="w-15 h-9 rounded object-cover border"
                loading="lazy"
              />
            )}
            <span className="truncate max-w-[28ch]" title={selected.title ?? selected.videoId ?? ''}>
              {selected.title ?? selected.videoId}
            </span>
          </span>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <ChevronDown className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />
      </button>
    </div>
  );
});
