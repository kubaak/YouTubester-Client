import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { VideoSelect } from '@/components/VideoSelect';
import { useRadixConfirmDialog } from '@/components/ui/useRadixConfirmDialog';
import {
  getGetApiVideosVideoIdQueryKey,
  useGetApiVideosVideoId,
  usePostApiVideosSaveDraft,
  usePostApiVideosUpdate,
} from '@/api/videos/videos';
import type { UpdateVideoMetadataRequest } from '@/api';

import { useVideoIdParam } from '@/hooks/useVideoIdParam';
import { useVideoSnapshotSync } from '@/hooks/useVideoSnapshotSync';

type ReviewFormValues = {
  title: string;
  description: string;
  tagsText: string;
};

function toTags(tagsText: string): string[] {
  return tagsText
    .split(/[\n,]/g)
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

export default function ReviewPage() {
  const queryClient = useQueryClient();
  const { confirm, confirmDialog } = useRadixConfirmDialog();
  const { videoId, setVideoId } = useVideoIdParam();

  const saveDraftMutation = usePostApiVideosSaveDraft();
  const updateVideoMutation = usePostApiVideosUpdate();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ReviewFormValues>({
    defaultValues: {
      title: '',
      description: '',
      tagsText: '',
    },
  });

  const videoDetailsQuery = useGetApiVideosVideoId(videoId, {
    query: {
      enabled: videoId.length > 0,
      refetchOnWindowFocus: false,
      refetchInterval: (query) => {
        const data = query.state.data?.data;
        if (data?.isAiTemplateInProgress === true) {
          return 5000;
        }
        return false;
      },
    },
  });

  const videoDetails = videoDetailsQuery.data?.data;
  const isAiTemplateInProgress = videoDetails?.isAiTemplateInProgress === true;
  const isFormLocked = isAiTemplateInProgress;

  useVideoSnapshotSync({
    videoDetails,
    videoId,
    isDirty,
    getValues,
    reset,
  });

  const handleVideoChange = useCallback(
    async (nextVideoId: string) => {
      if (isDirty) {
        const ok = await confirm('You have unsaved changes. Switch video and discard them?');
        if (!ok) return;
      }
      setVideoId(nextVideoId);
    },
    [isDirty, confirm, setVideoId],
  );

  const canSubmit = videoId.length > 0 && !isFormLocked;

  const buildRequest = (values: ReviewFormValues): UpdateVideoMetadataRequest => ({
    videoId,
    title: values.title.trim().length === 0 ? null : values.title.trim(),
    description: values.description.trim().length === 0 ? null : values.description,
    tags: toTags(values.tagsText),
  });

  const onSaveDraft = handleSubmit(async (values) => {
    const ok = await confirm('Save current metadata as a draft?');
    if (!ok) return;

    await saveDraftMutation.mutateAsync({ data: buildRequest(values) });
    await queryClient.invalidateQueries({ queryKey: getGetApiVideosVideoIdQueryKey(videoId) });
  });

  const onSubmitToYouTube = handleSubmit(async (values) => {
    const ok = await confirm('Submit these metadata changes to YouTube?');
    if (!ok) return;

    await updateVideoMutation.mutateAsync({ data: buildRequest(values) });
    await queryClient.invalidateQueries({ queryKey: getGetApiVideosVideoIdQueryKey(videoId) });
  });

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-xl font-semibold">Review Video Metadata</h1>
      <p className="mt-1 text-sm text-gray-600">
        Review and edit the AI-generated metadata, then save as a draft or submit to YouTube.
      </p>

      <form className="mt-6 space-y-6">
        <VideoSelect label="Video" value={videoId} onChange={handleVideoChange} placeholder="Choose a video…" />

        {isAiTemplateInProgress && (
          <div className="rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
            AI generation is in progress — fields are locked until it completes.
          </div>
        )}

        <fieldset className="rounded-2xl border p-4" disabled={isFormLocked}>
          <legend className="text-sm font-medium">Metadata snapshot</legend>

          {videoId.length === 0 ? (
            <p className="mt-2 text-sm text-gray-500">Select a video to load its metadata.</p>
          ) : videoDetailsQuery.isLoading ? (
            <p className="mt-2 text-sm text-gray-500">Loading snapshot…</p>
          ) : videoDetailsQuery.isError ? (
            <p className="mt-2 text-sm text-red-600">Failed to load snapshot.</p>
          ) : (
            <div className="mt-2 grid gap-3">
              <div>
                <label className="block text-sm">Title</label>
                <input
                  type="text"
                  {...register('title')}
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm">Description</label>
                <textarea
                  {...register('description')}
                  rows={6}
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm">Tags</label>
                <textarea
                  {...register('tagsText')}
                  rows={3}
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
                  placeholder="Comma or newline separated"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onSaveDraft}
                  disabled={!canSubmit || isSubmitting || saveDraftMutation.isPending || !isDirty}
                  className="rounded-xl border border-black px-4 py-2 text-sm disabled:opacity-50"
                >
                  {saveDraftMutation.isPending ? 'Saving…' : 'Save Draft'}
                </button>

                <button
                  type="button"
                  onClick={onSubmitToYouTube}
                  disabled={!canSubmit || isSubmitting || updateVideoMutation.isPending}
                  className="rounded-xl bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
                >
                  {updateVideoMutation.isPending ? 'Updating…' : 'Submit to YouTube'}
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {saveDraftMutation.isSuccess && <span className="text-sm text-green-700">Draft saved.</span>}
                {saveDraftMutation.isError && (
                  <span className="text-sm text-red-600">
                    {(saveDraftMutation.error as any)?.message ?? 'Failed to save draft'}
                  </span>
                )}
                {updateVideoMutation.isSuccess && <span className="text-sm text-green-700">Submitted to YouTube.</span>}
                {updateVideoMutation.isError && (
                  <span className="text-sm text-red-600">
                    {(updateVideoMutation.error as any)?.message ?? 'Failed to update video'}
                  </span>
                )}
              </div>
            </div>
          )}
        </fieldset>
      </form>

      {confirmDialog}
    </div>
  );
}
