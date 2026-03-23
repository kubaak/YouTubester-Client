import { useForm, Controller } from 'react-hook-form';
import { usePostApiVideosCopyTemplate } from '@/api/videos/videos';
import type { CopyVideoTemplateRequest } from '@/api';
import { useRadixConfirmDialog } from '@/components/ui/useRadixConfirmDialog';
import { VideoSelect } from '@/components/VideoSelect';

type FormValues = {
  sourceVideoId: string;
  targetVideoId: string;

  copyTags: boolean;
  copyLocation: boolean;
  copyPlaylists: boolean;
  copyCategory: boolean;
  copyDefaultLanguages: boolean;
};

export default function VideoTemplatePage() {
  var { confirm, confirmDialog } = useRadixConfirmDialog();
  var copyMutation = usePostApiVideosCopyTemplate();

  var {
    control,
    register,
    handleSubmit,
    watch,
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
    },
  });

  var onSubmit = handleSubmit(async (values) => {
    var ok = await confirm("Copy this video's template to the target?");
    if (!ok) return;

    var request: CopyVideoTemplateRequest = {
      sourceVideoId: values.sourceVideoId,
      targetVideoId: values.targetVideoId,
      copyTags: values.copyTags,
      copyLocation: values.copyLocation,
      copyPlaylists: values.copyPlaylists,
      copyCategory: values.copyCategory,
      copyDefaultLanguages: values.copyDefaultLanguages,
    };

    await copyMutation.mutateAsync({ data: request });
  });

  var disabled =
    isSubmitting ||
    copyMutation.isPending ||
    !watch('sourceVideoId') ||
    !watch('targetVideoId') ||
    !(
      watch('copyTags') ||
      watch('copyLocation') ||
      watch('copyPlaylists') ||
      watch('copyCategory') ||
      watch('copyDefaultLanguages')
    );

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-xl font-semibold">Copy Video Template</h1>
      <p className="mt-1 text-sm text-gray-600">Pick a source and a target video, then choose what to copy.</p>

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
              <input type="checkbox" {...register('copyTags')} />
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
          </div>
        </fieldset>

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
