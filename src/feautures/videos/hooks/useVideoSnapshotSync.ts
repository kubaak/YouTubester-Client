import { useEffect, useRef } from 'react';
import type { UseFormGetValues, UseFormReset } from 'react-hook-form';
import type { VideoDetailsDto } from '@/api';

export type SnapshotFormFields = {
  title: string;
  description: string;
  tagsText: string;
};

export function fromVideoDetails(videoDetails: VideoDetailsDto): SnapshotFormFields {
  return {
    title: videoDetails.title ?? '',
    description: videoDetails.description ?? '',
    tagsText: (videoDetails.tags ?? []).join(', '),
  };
}

type UseVideoSnapshotSyncOptions<TForm extends SnapshotFormFields> = {
  videoDetails: VideoDetailsDto | undefined;
  videoId: string;
  isDirty: boolean;
  getValues: UseFormGetValues<TForm>;
  reset: UseFormReset<TForm>;
};

/**
 * Safely syncs server video snapshot into form fields.
 *
 * Overwrites form when:
 * - AI generation is running (inputs are locked anyway)
 * - AI generation just finished (was in-progress → not in-progress)
 * - form is not dirty (user hasn't edited anything)
 * - selected video changed
 */
export function useVideoSnapshotSync<TForm extends SnapshotFormFields>({
  videoDetails,
  videoId,
  isDirty,
  getValues,
  reset,
}: UseVideoSnapshotSyncOptions<TForm>) {
  const lastLoadedVideoIdRef = useRef('');
  const lastInProgressRef = useRef(false);

  useEffect(() => {
    if (!videoDetails || videoId.length === 0) {
      return;
    }

    const isTargetChanged = lastLoadedVideoIdRef.current !== videoId;
    const wasInProgress = lastInProgressRef.current;
    const isNowInProgress = videoDetails.isAiTemplateInProgress === true;

    const aiJustFinished = wasInProgress && !isNowInProgress;
    const shouldOverwrite = isTargetChanged || isNowInProgress || aiJustFinished || !isDirty;

    if (shouldOverwrite) {
      const currentValues = getValues();

      reset({
        ...currentValues,
        ...fromVideoDetails(videoDetails),
      } as TForm);
    }

    lastLoadedVideoIdRef.current = videoId;
    lastInProgressRef.current = isNowInProgress;
  }, [videoDetails, videoId, isDirty, getValues, reset]);
}
