// src/components/replies/ReplyRow.tsx
import React from "react";
import { Controller, type Control, type FieldValues } from "react-hook-form";
import { Trash2 } from "lucide-react";

const MAX_LEN = 320;
const toStr = (v: unknown) => (v == null ? "" : String(v));

export interface ReplyRowProps<FormShape extends FieldValues> {
  control: Control<FormShape>;
  controlIndex: number; // index in form array
  display: {
    id: string; // field.id from useFieldArray
    videoTitle: string;
    commentText: string;
    suggestedText: string;
    pulledAt?: string;
    commentId: string | null | undefined;
  };
  onDelete: () => void;
}

export function ReplyRow<FormShape extends FieldValues>({
  control,
  controlIndex,
  display,
  onDelete,
}: ReplyRowProps<FormShape>) {
  return (
    <li className="grid grid-cols-12 gap-4 px-4 py-3 items-start">
      {/* select */}
      <div className="col-span-1 pt-2">
        <Controller
          name={`rows.${controlIndex}.selected` as any}
          control={control}
          render={({ field }) => <input type="checkbox" className="h-4 w-4 rounded border" {...field} />}
        />
      </div>

      {/* video & meta */}
      <div className="col-span-3">
        <div className="text-sm font-medium line-clamp-2">{display.videoTitle}</div>
        {/* <div className="mt-1 text-xs text-neutral-500">Pulled: {display.pulledAt ?? ""}</div> */}
        {/* <div className="mt-1 text-[11px] text-neutral-400">CommentId: {display.commentId}</div> */}
      </div>

      {/* original comment */}
      <div className="col-span-3">
        <div className="rounded-xl border bg-neutral-50 p-2 text-sm text-neutral-700 whitespace-pre-wrap">
          {display.commentText}
        </div>
      </div>

      {/* approved reply editor */}
      <div className="col-span-4">
        <Controller
          name={`rows.${controlIndex}.approvedText` as any}
          control={control}
          rules={{
            validate: (v) => (v?.trim()?.length ?? 0) > 0 || "Reply cannot be empty",
            maxLength: { value: MAX_LEN, message: `Max ${MAX_LEN} characters` },
          }}
          render={({ field, fieldState }) => (
            <>
              <textarea
                {...field}
                rows={3}
                className={`mt-1 w-full resize-y rounded-xl border px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-black/20 ${
                  fieldState.error ? "border-red-300" : "border-neutral-200"
                }`}
                placeholder={
                  toStr(display.suggestedText).trim().length
                    ? "Edit the suggestion or type your own"
                    : "Type your reply"
                }
              />
              <div className="mt-1 flex items-center justify-between text-xs text-neutral-500">
                <span className={toStr(field.value).length > MAX_LEN ? "text-red-600" : ""}>
                  {toStr(field.value).length}/{MAX_LEN}
                </span>
                {fieldState.error && <span className="text-red-600">{fieldState.error.message}</span>}
              </div>
            </>
          )}
        />
      </div>

      {/* actions */}
      <div className="col-span-1 flex justify-end gap-2">
        <button
          onClick={onDelete}
          className="inline-flex items-center gap-1 rounded-xl border px-2 py-1 text-xs hover:bg-neutral-50"
          title="Delete draft"
        >
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </button>
      </div>
    </li>
  );
}
