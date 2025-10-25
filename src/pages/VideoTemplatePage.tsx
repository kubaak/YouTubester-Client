// src/pages/VideoTemplatePage.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePostApiVideosCopyTemplate } from "../api/videos/videos";
import type { CopyVideoTemplateRequest } from "../api";
import { useRadixConfirmDialog } from "../components/ui/useRadixConfirmDialog";

type FormValues = {
  sourceUrl: string;
  targetUrl: string;

  copyTags: boolean;
  copyLocation: boolean;
  copyPlaylists: boolean;
  copyCategory: boolean;
  copyDefaultLanguages: boolean;

  useAI: boolean;
  promptEnrichment?: string;
  generateTitle: boolean;
  generateDescription: boolean;
  generateTags: boolean;
};

export default function VideoTemplatePage() {
  const { confirm, confirmDialog } = useRadixConfirmDialog();
  const copyMutation = usePostApiVideosCopyTemplate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      sourceUrl: "",
      targetUrl: "",
      copyTags: true,
      copyLocation: false,
      copyPlaylists: false,
      copyCategory: true,
      copyDefaultLanguages: true,
      useAI: false,
      promptEnrichment: "",
      generateTitle: false,
      generateDescription: false,
      generateTags: false,
    },
  });

  const useAI = watch("useAI");
  const copyTags = watch("copyTags");
  const generateTags = watch("generateTags");

  // When AI is enabled, precheck all AI toggles; when disabled, clear them.
  useEffect(() => {
    if (useAI) {
      setValue("generateTitle", true);
      setValue("generateDescription", true);
      setValue("generateTags", true);
    } else {
      setValue("promptEnrichment", "");
      setValue("generateTitle", false);
      setValue("generateDescription", false);
      setValue("generateTags", false);
    }
  }, [useAI, setValue]);

  // Enforce mutual exclusivity between Copy Tags and Generate Tags.
  useEffect(() => {
    if (copyTags && generateTags) {
      // If both become true, prefer the last toggled (here we unset generateTags).
      setValue("generateTags", false);
    }
  }, [copyTags, generateTags, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    const ok = await confirm("Copy this video’s template to the target channel?");
    if (!ok) return;

    const ai = values.useAI
      ? {
          promptEnrichment: values.promptEnrichment?.trim() || null,
          generateTitle: values.generateTitle,
          generateDescription: values.generateDescription,
          generateTags: values.generateTags,
        }
      : undefined;

    const req: CopyVideoTemplateRequest = {
      sourceUrl: values.sourceUrl || null,
      targetUrl: values.targetUrl || null,
      copyTags: values.copyTags && !values.generateTags, // mutually exclusive
      copyLocation: values.copyLocation,
      copyPlaylists: values.copyPlaylists,
      copyCategory: values.copyCategory,
      copyDefaultLanguages: values.copyDefaultLanguages,
      aiSuggestionOptions: ai,
    };

    await copyMutation.mutateAsync({ data: req });
  });

  // Minimal disable rule: require source & target non-empty, plus at least one action.
  const disabled =
    isSubmitting ||
    copyMutation.isPending ||
    !watch("sourceUrl") ||
    !watch("targetUrl") ||
    !(
      watch("copyTags") ||
      watch("copyLocation") ||
      watch("copyPlaylists") ||
      watch("copyCategory") ||
      watch("copyDefaultLanguages") ||
      (watch("useAI") &&
        (watch("promptEnrichment")?.trim() ||
          watch("generateTitle") ||
          watch("generateDescription") ||
          watch("generateTags")))
    );

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-xl font-semibold">Copy Video Template</h1>
      <p className="mt-1 text-sm text-gray-600">
        Enter a source video URL and a target channel/video URL. Choose which elements to copy and optionally enable AI
        suggestions.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-6">
        {/* Source URL */}
        <div>
          <label className="block text-sm font-medium text-gray-900">Source URL</label>
          <input
            {...register("sourceUrl")}
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX"
            inputMode="url"
          />
        </div>

        {/* Target URL */}
        <div>
          <label className="block text-sm font-medium text-gray-900">Target URL</label>
          <input
            {...register("targetUrl")}
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            placeholder="https://www.youtube.com/@yourchannel  or  https://www.youtube.com/channel/UCxxxx..."
            inputMode="url"
          />
        </div>

        {/* Copy options */}
        <fieldset className="rounded-2xl border p-4">
          <legend className="text-sm font-medium">Copy options</legend>
          <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register("copyTags")} disabled={watch("generateTags")} />
              Tags
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register("copyLocation")} />
              Location
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register("copyPlaylists")} />
              Playlists
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register("copyCategory")} />
              Category
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register("copyDefaultLanguages")} />
              Default Languages
            </label>
            <p className="col-span-2 mt-1 text-xs text-gray-500">
              You can either copy existing tags or generate AI tags — not both.
            </p>
          </div>
        </fieldset>

        {/* Use AI */}
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("useAI")} />
            Use AI suggestions
          </label>
          {useAI && (
            <span className="text-xs text-gray-500">(All AI options are pre-checked—you can tweak them below.)</span>
          )}
        </div>

        {/* AI Suggestions (conditional) */}
        {useAI && (
          <fieldset className="rounded-2xl border p-4">
            <legend className="text-sm font-medium">AI suggestions</legend>

            <div className="mt-2 grid gap-3">
              <div>
                <label className="block text-sm">Prompt enrichment (optional)</label>
                <textarea
                  {...register("promptEnrichment")}
                  rows={4}
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                  placeholder="e.g., Emphasize benefits for creators; optimize for search on 'short-form tutorials'"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" {...register("generateTitle")} />
                  Generate Title
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" {...register("generateDescription")} />
                  Generate Description
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" {...register("generateTags")} disabled={watch("copyTags")} />
                  Generate Tags
                </label>
              </div>
            </div>
          </fieldset>
        )}

        {/* Submit */}
        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={disabled}
            className="rounded-xl bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {copyMutation.isPending ? "Copying…" : "Copy Template"}
          </button>

          {copyMutation.isSuccess && <span className="text-sm text-green-700">Job enqueued.</span>}
          {copyMutation.isError && (
            <span className="text-sm text-red-600">
              {(copyMutation.error as any)?.message ?? "Failed to enqueue job"}
            </span>
          )}
        </div>
      </form>

      {confirmDialog}
    </div>
  );
}
