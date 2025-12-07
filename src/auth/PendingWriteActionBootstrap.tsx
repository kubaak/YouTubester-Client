import { useEffect, useRef } from 'react';
import type { AxiosRequestConfig } from 'axios';
import { useQueryClient } from '@tanstack/react-query';

import { postApiRepliesApprove, getGetApiRepliesQueryKey } from '@/api/replies/replies';
import { postApiVideosCopyTemplate } from '@/api/videos/videos';
import { clearPendingWriteAction, getPendingWriteAction } from '@/auth/pendingWriteAction';
import { readHasWriteAccess } from '@/auth/writeAccess';

const RESUME_MESSAGE = 'Resuming your action…';

export function PendingWriteActionBootstrap(): null {
  var hasRunRef = useRef(false);
  var queryClient = useQueryClient();

  useEffect(() => {
    if (hasRunRef.current) {
      return;
    }

    hasRunRef.current = true;

    var run = async (): Promise<void> => {
      var pendingWriteAction = getPendingWriteAction();
      if (pendingWriteAction == null) {
        return;
      }

      var hasWriteAccess = await readHasWriteAccess();
      if (!hasWriteAccess) {
        return;
      }

      // Clear first to prevent double execution on StrictMode/rerender.
      clearPendingWriteAction();

      var axiosOptions: AxiosRequestConfig = {
        withCredentials: true,
      };

      try {
        console.info(RESUME_MESSAGE);

        if (pendingWriteAction.kind === 'replies.approve') {
          await postApiRepliesApprove(pendingWriteAction.payload, axiosOptions);
          await queryClient.invalidateQueries({ queryKey: getGetApiRepliesQueryKey() });
          return;
        }

        if (pendingWriteAction.kind === 'videos.copyTemplate') {
          await postApiVideosCopyTemplate(pendingWriteAction.payload, axiosOptions);
          return;
        }
      } catch (error) {
        console.error('Failed to resume pending write action:', error);
      }
    };

    void run();
  }, [queryClient]);

  return null;
}
