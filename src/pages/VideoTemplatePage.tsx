import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { usePostApiVideosCopyTemplate } from '@/api/videos/videos';
import type { CopyVideoTemplateRequest } from '@/api';
import { useRadixConfirmDialog } from '@/components/ui/useRadixConfirmDialog';
import { VideoSelect } from '@/components/VideoSelect';
import { callWithWriteGuard } from '@/auth/writeGuard';

type FormValues = {
  sourceVideoId: string;
  targetVideoId: string;

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
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      sourceVideoId: '',
      targetVideoId: '',
      copyTags: true,
      copyLocation: true,
      copyPlaylists: true,
      copyCategory: true,
      copyDefaultLanguages: true,
      useAI: false,
      promptEnrichment: '',
      generateTitle: false,
      generateDescription: false,
      generateTags: false,
    },
  });

  const useAI = watch('useAI');
  const copyTags = watch('copyTags');
  const generateTags = watch('generateTags');

  useEffect(() => {
    if (useAI) {
      setValue('generateTitle', true);
      setValue('generateDescription', true);
      setValue('generateTags', true);
    } else {
      setValue('promptEnrichment', '');
      setValue('generateTitle', false);
      setValue('generateDescription', false);
      setValue('generateTags', false);
    }
  }, [useAI, setValue]);

  useEffect(() => {
    if (copyTags && generateTags) setValue('generateTags', false);
  }, [copyTags, generateTags, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    const ok = await confirm("Copy this video's template to the target?");
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
      sourceVideoId: values.sourceVideoId,
      targetVideoId: values.targetVideoId,
      copyTags: values.copyTags,
      copyLocation: values.copyLocation,
      copyPlaylists: values.copyPlaylists,
      copyCategory: values.copyCategory,
      copyDefaultLanguages: values.copyDefaultLanguages,
      aiSuggestionOptions: ai,
    } as any;

    await callWithWriteGuard({
      method: 'POST',
      url: '/api/videos/copy-template',
      fetcher: () => copyMutation.mutateAsync({ data: req }),
    });
  });

  const disabled =
    isSubmitting ||
    copyMutation.isPending ||
    !watch('sourceVideoId') ||
    !watch('targetVideoId') ||
    !(
      watch('copyTags') ||
      watch('copyLocation') ||
      watch('copyPlaylists') ||
      watch('copyCategory') ||
      watch('copyDefaultLanguages') ||
      (watch('useAI') &&
        (watch('promptEnrichment')?.trim() ||
          watch('generateTitle') ||
          watch('generateDescription') ||
          watch('generateTags')))
    );

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-xl font-semibold">Copy Video Template</h1>
      <p className="mt-1 text-sm text-gray-600">
        Pick a source and a target video. Choose what to copy and optionally enable AI.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-6">
        <Controller
          control={control}
          name="sourceVideoId"
          render={({ field }) => (
            <VideoSelect
              label="Source video"
              value={field.value}
              onChange={field.onChange}
              placeholder="Choose the source video…"
            />
          )}
        />

        <Controller
          control={control}
          name="targetVideoId"
          render={({ field }) => (
            <VideoSelect
              label="Target video"
              value={field.value}
              onChange={field.onChange}
              placeholder="Choose the target video…"
            />
          )}
        />

        <fieldset className="rounded-2xl border p-4">
          <legend className="text-sm font-medium">Copy options</legend>
          <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('copyTags')} disabled={watch('generateTags')} />
              Tags
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('copyLocation')} />
              Location
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('copyPlaylists')} />
              Playlists
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('copyCategory')} />
              Category
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('copyDefaultLanguages')} />
              Default Languages
            </label>
            <p className="col-span-2 mt-1 text-xs text-gray-500">
              You can either copy existing tags or generate AI tags — not both.
            </p>
          </div>
        </fieldset>

        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" {...register('useAI')} />
            Use AI suggestions
          </label>
          {useAI && (
            <span className="text-xs text-gray-500">(All AI options are pre-checked—you can tweak them below.)</span>
          )}
        </div>

        {useAI && (
          <fieldset className="rounded-2xl border p-4">
            <legend className="text-sm font-medium">AI suggestions</legend>
            <div className="mt-2 grid gap-3">
              <div>
                <label className="block text-sm">Prompt enrichment (optional)</label>
                <textarea
                  {...register('promptEnrichment')}
                  rows={4}
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                  placeholder="e.g., Emphasize benefits for creators; optimize for search on 'short-form tutorials'"
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
                  <input type="checkbox" {...register('generateTags')} disabled={watch('copyTags')} />
                  Generate Tags
                </label>
              </div>
            </div>
          </fieldset>
        )}

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={disabled}
            className="rounded-xl bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {copyMutation.isPending ? 'Copying…' : 'Copy Template'}
          </button>

          {copyMutation.isSuccess && <span className="text-sm text-green-700">Job enqueued.</span>}
          {copyMutation.isError && (
            <span className="text-sm text-red-600">
              {(copyMutation.error as any)?.message ?? 'Failed to enqueue job'}
            </span>
          )}
        </div>
      </form>

      {confirmDialog}
    </div>
  );
}
