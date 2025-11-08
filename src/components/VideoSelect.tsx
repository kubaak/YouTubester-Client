import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import { useGetApiVideos } from '@/api/videos/videos';
import type { GetApiVideosParams, VideoListItemDto } from '@/api';
import { cn } from '@/lib/cn';

type Props = {
  label: string;
  value?: string;
  onChange: (videoId: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

const DEBOUNCE_MS = 1000;

export function VideoSelect({ label, value, onChange, placeholder = 'Select a video…', disabled, className }: Props) {
  const [open, setOpen] = useState(false);
  const [pageToken, setPageToken] = useState<string | undefined>(undefined);
  const [items, setItems] = useState<VideoListItemDto[]>([]);
  const [filter, setFilter] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Debounce the text filter before sending to server (?title=)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedFilter(filter.trim()), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [filter]);

  // Build query params for orval hook (server-side filter + paging)
  const queryParams = useMemo<GetApiVideosParams>(
    () => ({
      // only include title if non-empty
      title: debouncedFilter || undefined,
      pageToken: pageToken || undefined,
    }),
    [debouncedFilter, pageToken],
  );

  // Fetch current page
  const { data, isFetching } = useGetApiVideos(queryParams, {
    query: {
      staleTime: 60_000, // 1 min: use cached data for identical params
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      // placeholderData: (prev) => prev, // optional: keep previous data visible during refetch
    },
  });

  // Merge/replace items based on pageToken
  useEffect(() => {
    if (!data) return;
    const next = data.data.items ?? [];
    setItems((prev) => (pageToken ? [...prev, ...next] : next));
  }, [data, pageToken]);

  const nextPageToken = data?.data.nextPageToken ?? undefined;

  // Close on click outside (ignore clicks on trigger)
  useEffect(() => {
    if (!open) return;

    function onDocMouseDown(e: MouseEvent) {
      const target = e.target as Node;
      const panel = panelRef.current;
      const trigger = triggerRef.current;
      const clickedInsidePanel = !!panel && panel.contains(target);
      const clickedTrigger = !!trigger && trigger.contains(target);

      if (!clickedInsidePanel && !clickedTrigger) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [open]);

  // Reset paging whenever dropdown opens or the *debounced* server filter changes
  useEffect(() => {
    if (!open) return;
    setPageToken(undefined);
  }, [open, debouncedFilter]);

  const selected = useMemo(() => items.find((i) => i.videoId === value), [items, value]);

  return (
    <div className={cn('relative', className)}>
      <label className="block text-sm font-medium text-gray-900 mb-1">{label}</label>

      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
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
                className="w-10 h-6 rounded object-cover border"
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

      {open && (
        <div
          ref={panelRef}
          className="absolute z-50 mt-2 w-full max-h-[26rem] overflow-hidden rounded-xl border bg-white shadow-lg"
          role="listbox"
        >
          {/* Server-side filter input (debounced) */}
          <div className="p-2 border-b flex items-center gap-2">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Type to filter…"
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
              autoFocus
            />
            {filter && (
              <button
                type="button"
                aria-label="Clear filter"
                className="p-2 rounded-lg border hover:bg-gray-50"
                onClick={() => setFilter('')}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-auto p-1">
            {items.length === 0 ? (
              <div className="p-3 text-sm text-gray-500">
                {isFetching ? 'Loading…' : 'No videos match your filter.'}
              </div>
            ) : (
              <ul className="space-y-1">
                {items.map((v) => {
                  const active = v.videoId === value;
                  const key = v.videoId;
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        className={cn(
                          'w-full flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-gray-100 text-left',
                          active && 'bg-gray-100',
                        )}
                        onClick={() => {
                          onChange(v.videoId);
                          setOpen(false);
                        }}
                      >
                        {v.thumbnailUrl && (
                          <img
                            src={v.thumbnailUrl}
                            alt=""
                            className="w-12 h-7 rounded object-cover border"
                            loading="lazy"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="truncate" title={v.title ?? v.videoId ?? ''}>
                            {v.title ?? v.videoId}
                          </div>
                          {v.publishedAt && (
                            <div className="text-xs text-gray-500">{new Date(v.publishedAt).toLocaleDateString()}</div>
                          )}
                        </div>
                        {active && <Check className="w-4 h-4 text-primary" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Load more (uses server nextPageToken) */}
          <div className="p-2 border-t">
            <button
              type="button"
              className="w-full rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
              disabled={!nextPageToken || isFetching}
              onClick={() => setPageToken(nextPageToken)}
            >
              {isFetching ? 'Loading…' : nextPageToken ? 'Load more' : 'No more videos'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
