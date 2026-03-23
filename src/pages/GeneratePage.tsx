import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { VideoSelect } from '@/components/VideoSelect';
import { useRadixConfirmDialog } from '@/components/ui/useRadixConfirmDialog';
import { usePostApiVideosAiTemplate } from '@/api/videos/videos';
import type { AiVideoTemplateRequest } from '@/api';

type GenerateFormValues = {
  targetVideoId: string;
  promptEnrichment: string;
  generateTitle: boolean;
  generateDescription: boolean;
  generateTags: boolean;
};

export default function GeneratePage() {
  const navigate = useNavigate();
  const { confirm, confirmDialog } = useRadixConfirmDialog();
  const aiTemplateMutation = usePostApiVideosAiTemplate();

  const { control, register, handleSubmit, watch } = useForm<GenerateFormValues>({
    defaultValues: {
      targetVideoId: '',
      promptEnrichment: '',
      generateTitle: true,
      generateDescription: true,
      generateTags: true,
    },
  });

  const targetVideoId = watch('targetVideoId');
  const promptEnrichment = watch('promptEnrichment');
  const generateTitle = watch('generateTitle');
  const generateDescription = watch('generateDescription');
  const generateTags = watch('generateTags');

  const canGenerate =
    targetVideoId.length > 0 &&
    !aiTemplateMutation.isPending &&
    (promptEnrichment.trim().length > 0 || generateTitle || generateDescription || generateTags);

  const onGenerate = handleSubmit(async (values) => {
    const ok = await confirm('Generate Metadata for the selected video?');
    if (!ok) return;

    const request: AiVideoTemplateRequest = {
      targetVideoId: values.targetVideoId,
      promptEnrichment: values.promptEnrichment.trim(),
      generateTitle: values.generateTitle,
      generateDescription: values.generateDescription,
      generateTags: values.generateTags,
    };

    try {
      await aiTemplateMutation.mutateAsync({ data: request });
      navigate(`/review?videoId=${encodeURIComponent(values.targetVideoId)}`);
    } catch {
      // error already shown via isError
    }
  });

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-xl font-semibold">Generate Metadata</h1>
      <p className="mt-1 text-sm text-gray-600">
        Select a target video and configure AI generation options. After enqueuing, you'll be redirected to review the
        results.
      </p>

      <form className="mt-6 space-y-6">
        <Controller
          control={control}
          name="targetVideoId"
          render={({ field }) => (
            <VideoSelect
              label="Target video"
              value={field.value}
              onChange={field.onChange}
              placeholder="Choose the target video…"
              disabled={aiTemplateMutation.isPending}
            />
          )}
        />

        <fieldset className="rounded-2xl border p-4" disabled={aiTemplateMutation.isPending}>
          <legend className="text-sm font-medium">AI generation options</legend>

          <div className="mt-2 grid gap-3">
            <div>
              <label className="block text-sm">Prompt</label>
              <textarea
                {...register('promptEnrichment')}
                rows={4}
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
                placeholder="e.g., Focus on beginners; include a clear benefit; optimize for search"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" {...register('generateTitle')} />
                Generate Title
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" {...register('generateDescription')} />
                Generate Description
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" {...register('generateTags')} />
                Generate Tags
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onGenerate}
                disabled={!canGenerate}
                className="rounded-xl bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
              >
                {aiTemplateMutation.isPending ? 'Generating…' : 'Generate'}
              </button>

              {aiTemplateMutation.isError && (
                <span className="text-sm text-red-600">
                  {(aiTemplateMutation.error as any)?.message ?? 'Failed to enqueue job'}
                </span>
              )}
            </div>
          </div>
        </fieldset>
      </form>

      {confirmDialog}
    </div>
  );
}
