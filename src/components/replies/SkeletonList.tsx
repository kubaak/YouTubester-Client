// src/components/replies/SkeletonList.tsx
import React from "react";

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <ul className="divide-y">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="grid grid-cols-12 gap-4 px-4 py-3 items-start animate-pulse">
          <div className="col-span-1 h-4 w-4 rounded bg-neutral-200" />
          <div className="col-span-3">
            <div className="h-4 w-3/4 rounded bg-neutral-200" />
            <div className="mt-2 h-3 w-1/2 rounded bg-neutral-100" />
          </div>
          <div className="col-span-4">
            <div className="h-20 w-full rounded bg-neutral-100" />
          </div>
          <div className="col-span-3">
            <div className="h-16 w-full rounded bg-neutral-100" />
          </div>
          <div className="col-span-1" />
        </li>
      ))}
    </ul>
  );
}
