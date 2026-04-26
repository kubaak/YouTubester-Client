import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { VideoSelect } from '@/feautures/videos/components/VideoSelect';
import { useRadixConfirmDialog } from '@/components/dialogs/useRadixConfirmDialog';
import { usePostApiVideosAiTemplate } from '@/api/videos/videos';
import { VideoVisibility, type AiVideoTemplateRequest } from '@/api';
import { useMemo } from 'react';

type GenerateFormValues = {
  targetVideoId: string;
  promptEnrichment: string;
  generateTitle: boolean;
  generateDescription: boolean;
  generateTags: boolean;
  suggestPlaylists: boolean;
};

export default function ImprovePage() {
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
      suggestPlaylists: true,
    },
  });

  const targetVideoId = watch('targetVideoId');
  const promptEnrichment = watch('promptEnrichment');
  const generateTitle = watch('generateTitle');
  const generateDescription = watch('generateDescription');
  const generateTags = watch('generateTags');
  const suggestPlaylists = watch('suggestPlaylists');

  const canGenerate =
    targetVideoId.length > 0 &&
    !aiTemplateMutation.isPending &&
    (promptEnrichment.trim().length > 0 || generateTitle || generateDescription || generateTags || suggestPlaylists);

  const onGenerate = handleSubmit(async (values) => {
    const ok = await confirm('Improve this video with AI?');
    if (!ok) return;

    const request: AiVideoTemplateRequest = {
      targetVideoId: values.targetVideoId,
      promptEnrichment: values.promptEnrichment.trim(),
      generateTitle: values.generateTitle,
      generateDescription: values.generateDescription,
      generateTags: values.generateTags,
      suggestPlaylists: values.suggestPlaylists,
    };

    try {
      await aiTemplateMutation.mutateAsync({ data: request });
      navigate(`/review?videoId=${encodeURIComponent(values.targetVideoId)}`);
    } catch {
      // error already exposed via isError
    }
  });

  const defaultVisibilities = useMemo(() => [VideoVisibility.Unlisted], []);

  return (
    <div className="min-h-full bg-slate-50/70">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Improve your video with AI
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Select a video that you want to improve, add a short description or context, and let AI prepare title,
            description, and tag suggestions for you. You’ll review and edit everything before anything is applied.
          </p>
        </div>

        <form className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-6">
              <div>
                <Controller
                  control={control}
                  name="targetVideoId"
                  render={({ field }) => (
                    <VideoSelect
                      label="Choose your video"
                      value={field.value}
                      defaultVisibilities={defaultVisibilities}
                      onChange={field.onChange}
                      placeholder="Start typing or pick a video…"
                      disabled={aiTemplateMutation.isPending}
                    />
                  )}
                />
              </div>

              <fieldset disabled={aiTemplateMutation.isPending} className="space-y-6">
                <div>
                  <label htmlFor="promptEnrichment" className="block text-sm font-medium text-slate-900">
                    Tell the AI what this video is about
                  </label>
                  <p className="mt-1 text-sm text-slate-500">
                    Add context, audience, tone, keywords, or anything you want the AI to consider.
                  </p>
                  <textarea
                    id="promptEnrichment"
                    {...register('promptEnrichment')}
                    rows={5}
                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="e.g., Funny cat compilation"
                  />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-4">
                    <h2 className="text-sm font-semibold text-slate-900">What should the AI improve?</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Choose which parts you want to improve. You can select one, two, or all three.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow">
                      <input
                        type="checkbox"
                        {...register('generateTitle')}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                      />
                      <div>
                        <div className="text-sm font-medium text-slate-900">Title</div>
                        <div className="mt-1 text-xs leading-5 text-slate-500">
                          Make stronger, more clickable title.
                        </div>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow">
                      <input
                        type="checkbox"
                        {...register('generateDescription')}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                      />
                      <div>
                        <div className="text-sm font-medium text-slate-900">Description</div>
                        <div className="mt-1 text-xs leading-5 text-slate-500">
                          Make clearer, more useful video description.
                        </div>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow">
                      <input
                        type="checkbox"
                        {...register('generateTags')}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                      />
                      <div>
                        <div className="text-sm font-medium text-slate-900">Tags</div>
                        <div className="mt-1 text-xs leading-5 text-slate-500">
                          Suggest tags that better match the content.
                        </div>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow">
                      <input
                        type="checkbox"
                        {...register('suggestPlaylists')}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                      />
                      <div>
                        <div className="text-sm font-medium text-slate-900">Suggest Playlists</div>
                        <div className="mt-1 text-xs leading-5 text-slate-500">
                          Suggest playlists to add this video to.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {aiTemplateMutation.isError && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {(aiTemplateMutation.error as any)?.message ?? 'Failed to generate suggestions.'}
                  </div>
                )}

                <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-500">
                    Suggestions will open in review so you can edit them before applying.
                  </p>

                  <button
                    type="button"
                    onClick={onGenerate}
                    disabled={!canGenerate}
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {aiTemplateMutation.isPending ? 'Improving video…' : 'Improve video'}
                  </button>
                </div>
              </fieldset>
            </div>
          </div>
        </form>

        {confirmDialog}
      </div>
    </div>
  );
}
