import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Check, RefreshCcw } from 'lucide-react';

import type { Reply, DraftDecisionDto, BatchDecisionRequest } from '../api';
import {
  useGetApiReplies,
  usePostApiRepliesApprove,
  usePostApiRepliesBatchIgnore,
  getGetApiRepliesQueryKey,
} from '../api/replies/replies';
import { useRadixConfirmDialog } from '../components/ui/useRadixConfirmDialog';

const MAX_LEN = 10_000;

function getReplyText(reply: Reply): string {
  return reply.finalText ?? reply.suggestedText ?? '';
}

function CommentLink({ reply }: { reply: Reply }) {
  const text = reply.commentText ?? '';
  const videoId = reply.videoId;
  const commentId = reply.commentId;

  if (!videoId || !commentId || !text) {
    return <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{text || '—'}</p>;
  }

  const url = `https://www.youtube.com/watch?v=${videoId}&lc=${commentId}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whitespace-pre-wrap text-sm leading-6 text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
    >
      {text}
    </a>
  );
}

function ReplyCard({
  reply,
  selected,
  disabled,
  onToggleSelected,
  onFinalTextChange,
}: {
  reply: Reply;
  selected: boolean;
  disabled: boolean;
  onToggleSelected: (commentId: string, checked: boolean) => void;
  onFinalTextChange: (commentId: string, value: string) => void;
}) {
  const commentId = reply.commentId;
  const replyText = getReplyText(reply);
  const thumbnailUrl = reply.thumbnailUrl;
  const textareaId = commentId ? `reply-${commentId}` : undefined;

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="p-5 sm:p-6">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="h-20 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:h-16 sm:w-28 sm:shrink-0">
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt={reply.videoTitle || 'Video thumbnail'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">No image</div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Video</div>
              <h2 className="mt-1 truncate text-base font-semibold leading-6 text-slate-900 sm:text-lg">
                {reply.videoTitle || 'Untitled video'}
              </h2>
            </div>
          </div>

          <section className="space-y-2">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Original comment</div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <CommentLink reply={reply} />
            </div>
          </section>

          <section className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor={textareaId}
                className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500"
              >
                Reply
              </label>
              <span className="text-xs text-slate-400">
                {replyText.length}/{MAX_LEN}
              </span>
            </div>

            <textarea
              id={textareaId}
              value={replyText}
              onChange={(e) => {
                if (!commentId) return;
                onFinalTextChange(commentId, e.target.value);
              }}
              rows={6}
              maxLength={MAX_LEN}
              disabled={!commentId}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              placeholder="Write or edit the reply"
            />
          </section>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50/80 px-5 py-4 sm:px-6">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selected}
            disabled={disabled}
            onChange={(e) => {
              if (!commentId) return;
              onToggleSelected(commentId, e.target.checked);
            }}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <span className="text-sm font-medium text-slate-900">{disabled ? 'Unavailable' : 'Select'}</span>
        </label>
      </div>
    </article>
  );
}

export default function RepliesPage() {
  const {
    data: rows = [],
    refetch,
    isFetching,
  } = useGetApiReplies<Reply[]>({
    query: {
      refetchOnWindowFocus: false,
      select: (res) => res?.data ?? [],
    },
  });

  const queryClient = useQueryClient();
  const queryKey = getGetApiRepliesQueryKey();
  const approveMutation = usePostApiRepliesApprove();
  const ignoreMutation = usePostApiRepliesBatchIgnore();
  const { confirm, confirmDialog } = useRadixConfirmDialog();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const safeRows = useMemo(() => (Array.isArray(rows) ? rows.filter((row) => row.status === 1) : []), [rows]);

  const rowMap = useMemo(() => {
    const map = new Map<string, Reply>();
    for (const row of safeRows) {
      if (row.commentId) {
        map.set(row.commentId, row);
      }
    }
    return map;
  }, [safeRows]);

  const selectedRows = useMemo(
    () =>
      Array.from(selectedIds)
        .map((id) => rowMap.get(id))
        .filter(Boolean) as Reply[],
    [selectedIds, rowMap],
  );

  useEffect(() => {
    setSelectedIds((prev) => {
      const next = new Set<string>();
      for (const id of prev) {
        if (rowMap.has(id)) {
          next.add(id);
        }
      }

      if (next.size === prev.size) {
        let identical = true;
        for (const id of prev) {
          if (!next.has(id)) {
            identical = false;
            break;
          }
        }
        if (identical) return prev;
      }

      return next;
    });
  }, [rowMap]);

  const updateReplyText = useCallback(
    (commentId: string, nextText: string) => {
      queryClient.setQueryData<Reply[]>(queryKey, (prev) => {
        const list = Array.isArray(prev) ? prev : [];
        const idx = list.findIndex((r) => r.commentId === commentId);

        if (idx === -1) {
          return prev;
        }

        if ((list[idx].finalText ?? list[idx].suggestedText ?? '') === nextText) {
          return prev;
        }

        const nextList = list.slice();
        nextList[idx] = { ...list[idx], finalText: nextText };

        return nextList;
      });
    },
    [queryClient, queryKey],
  );

  const onToggleSelected = useCallback((commentId: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(commentId);
      } else {
        next.delete(commentId);
      }
      return next;
    });
  }, []);

  const onToggleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectedIds(() => {
        if (!checked) {
          return new Set();
        }

        return new Set(safeRows.map((row) => row.commentId).filter(Boolean) as string[]);
      });
    },
    [safeRows],
  );

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const onApproveSelected = async () => {
    const decisions: DraftDecisionDto[] = selectedRows
      .map((r) => ({
        commentId: r.commentId,
        approvedText: getReplyText(r),
      }))
      .filter((d) => d.commentId && d.approvedText && d.approvedText.length > 0);

    if (decisions.length === 0) return;

    const ok = await confirm(`Approve ${decisions.length} selected ${decisions.length === 1 ? 'reply' : 'replies'}?`);
    if (!ok) return;

    try {
      const request: BatchDecisionRequest = { decisions };
      await approveMutation.mutateAsync({ data: request });
      await queryClient.invalidateQueries({ queryKey });
      clearSelection();
    } catch (error) {
      console.error('Failed to approve replies.', error);
    }
  };

  const onIgnoreSelected = async () => {
    const ids = selectedRows.map((r) => r.commentId).filter(Boolean) as string[];
    if (ids.length === 0) return;

    const ok = await confirm(`Ignore ${ids.length} selected ${ids.length === 1 ? 'reply' : 'replies'}?`);
    if (!ok) return;

    try {
      await ignoreMutation.mutateAsync({ data: ids });
      await queryClient.invalidateQueries({ queryKey });
      clearSelection();
    } catch (error) {
      console.error('Failed to ignore replies.', error);
    }
  };

  const isBusy = approveMutation.isPending || ignoreMutation.isPending;

  const selectableRows = safeRows.filter((row) => !!row.commentId);
  const selectedCount = selectedIds.size;
  const allSelected = selectableRows.length > 0 && selectedCount === selectableRows.length;

  return (
    <div className="min-h-full">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Replies to review</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Check the reply suggestions, adjust the wording if you want, and then approve or ignore the ones you
                choose.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => void refetch()}
                disabled={isFetching || isBusy}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCcw className="h-4 w-4" />
                <span>{isFetching ? 'Refreshing…' : 'Refresh'}</span>
              </button>

              <button
                onClick={onApproveSelected}
                disabled={selectedCount === 0 || isBusy}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <Check className="h-4 w-4" />
                <span>Post{selectedCount > 0 ? ` (${selectedCount})` : ''}</span>
              </button>

              <button
                onClick={onIgnoreSelected}
                disabled={selectedCount === 0 || isBusy}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Ignore{selectedCount > 0 ? ` (${selectedCount})` : ''}
              </button>
            </div>
          </div>
        </div>

        <div className="border-b border-slate-200 bg-slate-50/80 px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-sm text-slate-500">
              {selectedCount === 0
                ? 'No replies selected.'
                : `${selectedCount} ${selectedCount === 1 ? 'reply' : 'replies'} selected.`}
            </div>

            {selectableRows.length > 0 && (
              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onToggleSelectAll(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                />
                <span>Select all</span>
              </label>
            )}
          </div>
        </div>

        <div className="space-y-4 bg-slate-50/40 p-4 sm:p-6">
          {safeRows.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-sm text-slate-500">
              {isFetching ? 'Loading replies…' : 'No replies to review right now.'}
            </div>
          ) : (
            safeRows.map((reply, index) => {
              const commentId = reply.commentId;
              const key = commentId || `reply-${index}`;

              return (
                <ReplyCard
                  key={key}
                  reply={reply}
                  selected={commentId ? selectedIds.has(commentId) : false}
                  disabled={!commentId}
                  onToggleSelected={onToggleSelected}
                  onFinalTextChange={updateReplyText}
                />
              );
            })
          )}
        </div>
      </div>

      {confirmDialog}
    </div>
  );
}
