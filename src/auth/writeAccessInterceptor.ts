import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

import { requiresWrite } from '@/auth/requiresWrite.generated';
import { setPendingWriteAction } from '@/auth/pendingWriteAction';
import type { HttpMethod } from '@/auth/pendingWriteAction';
import { checkWriteAccessCached, redirectToWriteConsent } from '@/auth/writeAccess';
import { buildRequestKey, normalizeUrl } from '@/auth/requestKey';

axios.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const requestKey = buildRequestKey(config.method ?? 'GET', config.url ?? '');

  if (!requiresWrite.has(requestKey)) {
    return config;
  }

  const hasWriteAccess = await checkWriteAccessCached();
  if (hasWriteAccess) {
    return config;
  }

  const method = (config.method ?? 'POST').toUpperCase() as HttpMethod;
  const url = normalizeUrl(config.url ?? '');

  setPendingWriteAction({
    method,
    url,
    body: config.data,
    createdAt: Date.now(),
  });

  redirectToWriteConsent();

  throw new axios.CanceledError('Write consent required – redirecting');
});
