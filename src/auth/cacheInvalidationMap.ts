import type { QueryKey } from '@tanstack/react-query';
import type { UpdateVideoMetadataRequest } from '@/api';
import { getGetApiRepliesQueryKey } from '@/api/replies/replies';
import { getGetApiVideosVideoIdQueryKey } from '@/api/videos/videos';

type CacheInvalidationResolver = (body: unknown) => QueryKey[];

const cacheInvalidationMap = new Map<string, CacheInvalidationResolver>();

cacheInvalidationMap.set('POST /api/replies/approve', () => {
  return [getGetApiRepliesQueryKey()];
});

cacheInvalidationMap.set('POST /api/videos/update', (body) => {
  if (typeof body === 'object' && body !== null && 'videoId' in body) {
    const request = body as UpdateVideoMetadataRequest;

    if (request.videoId) {
      return [getGetApiVideosVideoIdQueryKey(request.videoId)];
    }
  }

  return [];
});

export function getCacheInvalidationKeys(requestKey: string, body: unknown): QueryKey[] {
  const resolver = cacheInvalidationMap.get(requestKey);

  if (resolver == null) {
    //todo use process.env.NODE_ENV after upgrading to next.js
    if (import.meta.env.DEV) {
      console.warn(`No cache invalidation registered for ${requestKey}`);
    }

    return [];
  }

  return resolver(body);
}
