import React, { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RefreshCw, MessageSquareText, Loader2 } from "lucide-react";

import { Toast } from "../components/ui/Toast";
import { useConfirmDialog } from "../components/ui/useConfirmDialog";
import { Toolbar } from "../components/replies/Toolbar";
import { ReplyRow } from "../components/replies/ReplyRow";
import { SkeletonList } from "../components/replies/SkeletonList";

import { type Reply, type DraftDecisionDto, ReplyStatus } from "../api";
import { useGetApiReplies, usePostApiRepliesApprove, useDeleteApiRepliesId } from "../api/replies";

const MAX_LEN = 320;
const clamp = (v: string) => (v ?? "").trim().slice(0, MAX_LEN);
const toStr = (v: unknown) => (v == null ? "" : String(v));
const formatDate = (iso?: string | null) => (iso ? new Date(iso).toLocaleString() : "");

interface FormRow {
  id: string;
  commentId: string | null | undefined;
  videoId: string;
  videoTitle: string;
  commentText: string;
  suggestedText: string;
  approvedText: string;
  pulledAt?: string;
  selected: boolean;
}
interface RepliesForm {
  rows: FormRow[];
  selectAll: boolean;
  q: string;
}

export const RepliesPage: React.FC = () => {
  const [banner, setBanner] = useState<{ kind: "info" | "error" | "success"; msg: string } | null>(null);
  const { confirm, ui: confirmUi } = useConfirmDialog();

  const { isLoading, isFetching, error, refetch } = useGetApiReplies<Reply[]>({
    query: {
      enabled: false,
      refetchOnWindowFocus: false,
      select: (res) => res?.data ?? [],
    },
  });

  function mapRepliesToFormRows(replies: Reply[]): FormRow[] {
    function mapReplyToFormRow(reply: Reply): FormRow {
      return {
        id: crypto.randomUUID(),
        commentId: reply.commentId,
        videoId: toStr(reply.videoId),
        videoTitle: toStr(reply.videoTitle),
        commentText: toStr(reply.commentText),
        suggestedText: toStr(reply.suggestedText),
        approvedText: clamp(toStr(reply.finalText) || toStr(reply.suggestedText)),
        pulledAt: formatDate(reply.pulledAt),
        selected: true,
      };
    }
    return (replies ?? [])
      .filter((d) => d.status === ReplyStatus.NUMBER_0 || d.status === ReplyStatus.NUMBER_1)
      .map(mapReplyToFormRow);
  }

  useEffect(() => {
    (async () => {
      try {
        const result = await refetch();
        const rows = result.data ?? [];
        const mapped = mapRepliesToFormRows(rows);
        reset({ rows: mapped, selectAll: true, q: "" });
      } catch (err) {
        console.error("Failed to load replies", err);
      }
    })();
  }, [refetch]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<RepliesForm>({ defaultValues: { rows: [], selectAll: true, q: "" } });

  const { fields, replace } = useFieldArray({ control, name: "rows" });

  const approveMutation = usePostApiRepliesApprove({
    mutation: {
      onSuccess: (res) => {
        const r = res.data;
        const succeeded = r.succeeded ?? 0;
        const failed = r.failed ?? 0;
        setBanner({ kind: "success", msg: `Succeeded ${succeeded} · Failed ${failed}` });
        void refetch();
      },
      onError: (e: unknown) => setBanner({ kind: "error", msg: (e as Error)?.message ?? String(e) }),
    },
  });

  const deleteMutation = useDeleteApiRepliesId({
    mutation: {
      onError: (e: unknown) => setBanner({ kind: "error", msg: (e as Error)?.message ?? String(e) }),
    },
  });

  const selectAll = watch("selectAll");
  useEffect(() => {
    fields.forEach((_, i) => setValue(`rows.${i}.selected`, selectAll, { shouldDirty: true }));
  }, [selectAll, fields.length]);

  const q = watch("q");
  const filtered = useMemo(() => {
    const needle = (q ?? "").toLowerCase();
    if (!needle) return fields;
    return fields.filter((f) =>
      [f.videoTitle, f.commentText, f.suggestedText].some((x) => toStr(x).toLowerCase().includes(needle))
    );
  }, [fields, q]);

  const selectedCount = useMemo(
    () => watch("rows").filter((r) => r.selected).length,
    [
      watch("rows")
        .map((r) => `${r.commentId}:${r.selected}`)
        .join("|"),
    ]
  );

  // --------- Actions ---------
  const onApprove = handleSubmit(async (values) => {
    const decisions: DraftDecisionDto[] = values.rows
      .filter((r) => r.selected && r.approvedText.trim().length > 0)
      .map((r) => ({ commentId: r.commentId, approvedText: clamp(r.approvedText) }));

    if (decisions.length === 0) {
      setBanner({ kind: "info", msg: "Nothing selected to approve." });
      return;
    }

    setBanner(null);
    await approveMutation.mutateAsync({ data: decisions });
  });

  const onDeleteAt = async (visibleIdx: number) => {
    const ok = await confirm("Delete this draft? This cannot be undone.");
    if (!ok) return;

    // map from filtered index back to absolute form index
    const targetId = filtered[visibleIdx]?.id;
    const absoluteIndex = fields.findIndex((f) => f.id === targetId);
    if (absoluteIndex === -1) return;

    const row = fields[absoluteIndex];

    // Optimistic remove
    const prev = [...fields];
    const optimistic = [...fields];
    optimistic.splice(absoluteIndex, 1);
    replace(optimistic as any);

    try {
      await deleteMutation.mutateAsync({ params: { id: row.commentId } } as any); // DELETE ?id=...
    } catch {
      // rollback on error
      replace(prev as any);
    }
  };

  // Keyboard shortcut: Ctrl/Cmd+Enter to approve
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "enter") {
        e.preventDefault();
        (document.getElementById("approve-btn") as HTMLButtonElement)?.click();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen w-full bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquareText className="h-6 w-6" />
            <h1 className="text-xl font-semibold">YouTubester · Replies</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => void refetch()}
              className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 border shadow-sm hover:shadow transition disabled:opacity-50"
              disabled={isLoading || isFetching}
              title="Reload"
            >
              {isFetching ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh
            </button>
            <button
              id="approve-btn"
              onClick={onApprove}
              disabled={isSubmitting || fields.length === 0}
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-black text-white shadow hover:opacity-90 disabled:opacity-50"
            >
              <Check className="h-4 w-4" /> Approve Selected ({selectedCount})
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Banner */}
        <AnimatePresence>
          {banner && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4"
            >
              <Toast kind={banner.kind}>{banner.msg}</Toast>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {error ? (
          <div className="mb-4">
            <Toast kind="error">{(error as Error).message}</Toast>
          </div>
        ) : null}

        {/* Toolbar */}
        <Toolbar
          query={watch("q")}
          onQueryChange={(v) => setValue("q", v)}
          selectAll={watch("selectAll")}
          onToggleAll={(v) => {
            setValue("selectAll", v);
            fields.forEach((_, i) => setValue(`rows.${i}.selected`, v, { shouldDirty: true }));
          }}
        />

        {/* Table */}
        <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 gap-0 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-600">
            <div className="col-span-1">Pick</div>
            <div className="col-span-3">Video · Meta</div>
            <div className="col-span-3">Original Comment</div>
            <div className="col-span-4">Approved Reply</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {isLoading ? (
            <SkeletonList count={5} />
          ) : filtered.length === 0 ? (
            <div className="p-6 text-sm text-neutral-500">No drafts to review.</div>
          ) : (
            <ul className="divide-y">
              {filtered.map((f, visibleIdx) => {
                const formIndex = fields.findIndex((x) => x.id === f.id);
                return (
                  <ReplyRow
                    key={f.id}
                    control={control}
                    controlIndex={formIndex}
                    display={{
                      id: f.id,
                      videoTitle: f.videoTitle,
                      commentText: f.commentText,
                      suggestedText: f.suggestedText,
                      pulledAt: f.pulledAt,
                      commentId: f.commentId,
                    }}
                    onDelete={() => onDeleteAt(visibleIdx)}
                  />
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={() => void refetch()}
            className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 border shadow-sm hover:shadow"
          >
            <RefreshCw className="h-4 w-4" /> Reload
          </button>
          <button
            id="approve-btn-bottom"
            onClick={onApprove}
            disabled={isSubmitting || fields.length === 0}
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-black text-white shadow hover:opacity-90 disabled:opacity-50"
          >
            <Check className="h-4 w-4" /> Approve Selected ({selectedCount})
          </button>
        </div>
      </main>

      {confirmUi}
    </div>
  );
};
