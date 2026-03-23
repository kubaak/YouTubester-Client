import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

import { clearPendingWriteAction, getPendingWriteAction } from '@/auth/pendingWriteAction';
import { getCacheInvalidationKeys } from '@/auth/cacheInvalidationMap';
import { checkWriteAccessCached } from '@/auth/writeAccess';
import { buildRequestKey } from '@/auth/requestKey';

export function PendingWriteActionBootstrap(): null {
  const hasRunRef = useRef(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (hasRunRef.current) {
      return;
    }

    hasRunRef.current = true;

    const run = async (): Promise<void> => {
      const pendingAction = getPendingWriteAction();
      if (pendingAction == null) {
        return;
      }

      const hasWriteAccess = await checkWriteAccessCached();
      if (!hasWriteAccess) {
        return;
      }

      // Clear before replay to avoid duplicate execution if this bootstrap runs again.
      clearPendingWriteAction();

      try {
        console.info('Resuming your action…');

        await axios.request({
          method: pendingAction.method,
          url: pendingAction.url,
          data: pendingAction.body,
          withCredentials: true,
        });

        const requestKey = buildRequestKey(pendingAction.method, pendingAction.url);
        const queryKeys = getCacheInvalidationKeys(requestKey, pendingAction.body);

        await Promise.all(queryKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey })));
      } catch (error) {
        console.error('Failed to resume pending write action:', error);
      }
    };

    void run();
  }, [queryClient]);

  return null;
}
