import { useEffect, useRef, useState } from 'react';
import { Settings, Loader2, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import {
  useGetApiChannelSettings,
  usePutApiChannelSettings,
  getGetApiChannelSettingsQueryKey,
} from '@/api/channel-settings/channel-settings';
import type { UpdateChannelSettingsRequest } from '@/api';
import { Button } from '@/components/ui/button';

type ChannelSettingsFormValues = {
  isCommentAssistantEnabled: boolean;
  isSuggestRepliesForTopLevelCommentsOnly: boolean;
  maxSuggestedRepliesPerSync: number;
  maxCommentAgeDays: number;
  replyLanguage: string;
  responseForNonTextualComments: string;
};

const REPLY_LANGUAGES = [
  'Arabic',
  'Bengali',
  'Bulgarian',
  'Chinese',
  'Czech',
  'Danish',
  'Dutch',
  'English',
  'Estonian',
  'Finnish',
  'French',
  'German',
  'Greek',
  'Hebrew',
  'Hindi',
  'Hungarian',
  'Indonesian',
  'Italian',
  'Japanese',
  'Korean',
  'Latvian',
  'Lithuanian',
  'Norwegian',
  'Polish',
  'Portuguese',
  'Romanian',
  'Russian',
  'Slovak',
  'Slovenian',
  'Spanish',
  'Swedish',
  'Thai',
  'Turkish',
  'Ukrainian',
  'Vietnamese',
] as const;

function toFormValues(settings: Partial<UpdateChannelSettingsRequest> | undefined): ChannelSettingsFormValues {
  return {
    isCommentAssistantEnabled: settings?.isCommentAssistantEnabled ?? false,
    isSuggestRepliesForTopLevelCommentsOnly: settings?.isSuggestRepliesForTopLevelCommentsOnly ?? false,
    maxSuggestedRepliesPerSync: settings?.maxSuggestedRepliesPerSync ?? 0,
    maxCommentAgeDays: settings?.maxCommentAgeDays ?? 0,
    replyLanguage: settings?.replyLanguage ?? '',
    responseForNonTextualComments: settings?.responseForNonTextualComments ?? '',
  };
}

export default function ChannelSettingsPage() {
  const { data: settingsResponse, isLoading, isError } = useGetApiChannelSettings();
  const updateMutation = usePutApiChannelSettings();
  const queryClient = useQueryClient();

  const settings = settingsResponse?.data;

  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const saveStatusTimeoutRef = useRef<number | null>(null);
  const hasInitializedRef = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isValid },
  } = useForm<ChannelSettingsFormValues>({
    mode: 'onChange',
    defaultValues: toFormValues(undefined),
  });

  useEffect(() => {
    if (!settings) {
      return;
    }

    if (!hasInitializedRef.current) {
      reset(toFormValues(settings));
      hasInitializedRef.current = true;
      return;
    }

    if (!isDirty) {
      reset(toFormValues(settings));
    }
  }, [settings, reset, isDirty]);

  useEffect(() => {
    return () => {
      if (saveStatusTimeoutRef.current !== null) {
        window.clearTimeout(saveStatusTimeoutRef.current);
      }
    };
  }, []);

  const scheduleSaveStatusReset = (delayMs: number) => {
    if (saveStatusTimeoutRef.current !== null) {
      window.clearTimeout(saveStatusTimeoutRef.current);
    }

    saveStatusTimeoutRef.current = window.setTimeout(() => {
      setSaveStatus('idle');
      saveStatusTimeoutRef.current = null;
    }, delayMs);
  };

  const [isCommentAssistantEnabled, isSuggestRepliesForTopLevelCommentsOnly, replyLanguage] = watch([
    'isCommentAssistantEnabled',
    'isSuggestRepliesForTopLevelCommentsOnly',
    'replyLanguage',
  ]);

  const onSubmit = handleSubmit(async (values) => {
    const trimmedReplyLanguage = values.replyLanguage.trim();
    const trimmedResponseForNonTextualComments = values.responseForNonTextualComments.trim();

    const request: UpdateChannelSettingsRequest = {
      isCommentAssistantEnabled: values.isCommentAssistantEnabled,
      isSuggestRepliesForTopLevelCommentsOnly: values.isSuggestRepliesForTopLevelCommentsOnly,
      maxSuggestedRepliesPerSync: Math.max(0, values.maxSuggestedRepliesPerSync),
      maxCommentAgeDays: Math.max(0, values.maxCommentAgeDays),
      replyLanguage: trimmedReplyLanguage,
      responseForNonTextualComments: trimmedResponseForNonTextualComments || null,
    };

    setSaveStatus('idle');

    try {
      await updateMutation.mutateAsync({ data: request });

      setSaveStatus('success');
      await queryClient.invalidateQueries({
        queryKey: getGetApiChannelSettingsQueryKey(),
      });

      reset({
        ...values,
        replyLanguage: trimmedReplyLanguage,
        responseForNonTextualComments: trimmedResponseForNonTextualComments,
      });

      scheduleSaveStatusReset(3000);
    } catch (error) {
      console.error('Failed to save channel settings:', error);
      setSaveStatus('error');
      scheduleSaveStatusReset(5000);
    }
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-5xl animate-fade-in">
        <div className="glass rounded-3xl border border-destructive/50 p-8 text-center shadow-moderate">
          <AlertCircle className="mx-auto mb-4 h-10 w-10 text-destructive" />
          <p className="text-lg font-medium text-destructive">Failed to load channel settings.</p>
          <p className="mt-2 text-sm text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 animate-fade-in">
      <div className="glass rounded-3xl border border-border/50 p-8 shadow-moderate">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Channel Settings</h1>
        <p className="text-lg text-muted-foreground">Configure the comment assistant behavior for your channel.</p>
      </div>

      <form onSubmit={onSubmit} noValidate>
        <div className="glass animate-slide-up rounded-3xl border border-border/50 p-8 shadow-moderate">
          <div className="mb-8 flex items-center space-x-4">
            <div className="rounded-2xl bg-gradient-primary p-3 shadow-moderate">
              <Settings className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Comment Assistant</h3>
          </div>

          <div className="space-y-6">
            <div className="group -mx-4 flex items-start justify-between rounded-2xl border-b border-border/30 px-4 py-6 transition-all duration-300 hover:bg-accent/20 last:border-b-0">
              <div className="flex-1 space-y-2">
                <label
                  htmlFor="comment-assistant-enabled"
                  className="text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary"
                >
                  Enable Comment Assistant
                </label>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Automatically suggest replies to comments on your videos.
                </p>
                <div className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                  <AlertTriangle className="h-4 w-4" />
                  Each generated reply suggestion costs 3 credits.
                </div>
              </div>

              <div className="ml-6 flex-shrink-0">
                <div className="relative">
                  <input
                    id="comment-assistant-enabled"
                    type="checkbox"
                    className="sr-only"
                    {...register('isCommentAssistantEnabled')}
                  />
                  <label htmlFor="comment-assistant-enabled" className="flex cursor-pointer items-center">
                    <div
                      className={`relative h-8 w-14 rounded-full shadow-inner transition-colors duration-300 ${
                        isCommentAssistantEnabled ? 'bg-green-600' : 'bg-muted'
                      }`}
                    >
                      <div
                        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-moderate transition-transform duration-300 ${
                          isCommentAssistantEnabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </div>
                    <span className="ml-4 text-sm font-medium text-foreground">
                      {isCommentAssistantEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="group -mx-4 flex items-start justify-between rounded-2xl border-b border-border/30 px-4 py-6 transition-all duration-300 last:border-b-0">
              <div className="flex-1 space-y-2">
                <label htmlFor="top-level-only" className="text-base font-semibold text-foreground">
                  Top-Level Comments Only
                </label>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Only suggest replies for top-level comments, not nested replies.
                </p>
                <p className="text-sm text-amber-700">This option is not implemented yet and cannot be changed.</p>
              </div>

              <div className="ml-6 flex-shrink-0 opacity-60">
                <div className="relative">
                  <input
                    id="top-level-only"
                    type="checkbox"
                    disabled
                    checked={isSuggestRepliesForTopLevelCommentsOnly}
                    readOnly
                    className="sr-only"
                  />
                  <label htmlFor="top-level-only" className="flex cursor-not-allowed items-center">
                    <div
                      className={`relative h-8 w-14 rounded-full shadow-inner transition-colors duration-300 ${
                        isSuggestRepliesForTopLevelCommentsOnly ? 'bg-green-600' : 'bg-muted'
                      }`}
                    >
                      <div
                        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-moderate transition-transform duration-300 ${
                          isSuggestRepliesForTopLevelCommentsOnly ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </div>
                    <span className="ml-4 text-sm font-medium text-foreground">
                      {isSuggestRepliesForTopLevelCommentsOnly ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="group -mx-4 flex items-start justify-between rounded-2xl border-b border-border/30 px-4 py-6 transition-all duration-300 hover:bg-accent/20 last:border-b-0">
              <div className="flex-1 space-y-1">
                <label
                  htmlFor="max-suggested-replies"
                  className="text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary"
                >
                  Max Suggested Replies Per Sync
                </label>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The maximum number of reply suggestions generated during each sync cycle.
                </p>
              </div>

              <div className="ml-6 flex-shrink-0">
                <input
                  id="max-suggested-replies"
                  type="number"
                  min={0}
                  className="glass w-32 rounded-2xl border border-border/50 bg-input px-4 py-3 text-sm transition-all duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  {...register('maxSuggestedRepliesPerSync', {
                    valueAsNumber: true,
                    min: 0,
                  })}
                />
              </div>
            </div>

            <div className="group -mx-4 flex items-start justify-between rounded-2xl border-b border-border/30 px-4 py-6 transition-all duration-300 hover:bg-accent/20 last:border-b-0">
              <div className="flex-1 space-y-1">
                <label
                  htmlFor="max-comment-age"
                  className="text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary"
                >
                  Max Comment Age (Days)
                </label>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Only process comments that are newer than this number of days.
                </p>
              </div>

              <div className="ml-6 flex-shrink-0">
                <input
                  id="max-comment-age"
                  type="number"
                  min={0}
                  className="glass w-32 rounded-2xl border border-border/50 bg-input px-4 py-3 text-sm transition-all duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  {...register('maxCommentAgeDays', {
                    valueAsNumber: true,
                    min: 0,
                  })}
                />
              </div>
            </div>

            <div className="group -mx-4 flex items-start justify-between rounded-2xl border-b border-border/30 px-4 py-6 transition-all duration-300 hover:bg-accent/20 last:border-b-0">
              <div className="flex-1 space-y-1">
                <label
                  htmlFor="reply-language"
                  className="text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary"
                >
                  Reply Language
                </label>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The language used for generated reply suggestions.
                </p>
              </div>

              <div className="ml-6 flex-shrink-0">
                <select
                  id="reply-language"
                  className="glass w-64 rounded-2xl border border-border/50 bg-input px-4 py-3 text-sm transition-all duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  {...register('replyLanguage', {
                    validate: (value) => value.trim().length > 0,
                  })}
                >
                  <option value="">Select a language</option>
                  {REPLY_LANGUAGES.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="group -mx-4 flex items-start justify-between rounded-2xl border-b border-border/30 px-4 py-6 transition-all duration-300 hover:bg-accent/20 last:border-b-0">
              <div className="flex-1 space-y-1">
                <label
                  htmlFor="non-textual-response"
                  className="text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary"
                >
                  Response for Non-Textual Comments
                </label>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  A default reply used for comments that contain only emojis, images, or other non-textual content.
                  Leave empty to skip these comments.
                </p>
              </div>

              <div className="ml-6 flex-shrink-0">
                <textarea
                  id="non-textual-response"
                  rows={3}
                  maxLength={500}
                  placeholder="e.g. Thanks for the reaction!"
                  className="glass w-64 resize-none rounded-2xl border border-border/50 bg-input px-4 py-3 text-sm transition-all duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  {...register('responseForNonTextualComments')}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="glass mt-8 rounded-3xl border border-border/50 p-8 shadow-moderate">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {saveStatus === 'success' && (
                <div className="animate-fade-in flex items-center gap-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Settings saved successfully.</span>
                </div>
              )}

              {saveStatus === 'error' && (
                <div className="animate-fade-in flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Failed to save settings. Please try again.</span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={updateMutation.isPending || !isDirty || !isValid || replyLanguage.trim().length === 0}
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
