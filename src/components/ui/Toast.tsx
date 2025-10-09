// src/components/ui/Toast.tsx
import React from "react";

type Kind = "info" | "error" | "success";

const KLASSES: Record<Kind, string> = {
  info: "rounded-xl border p-3 text-sm bg-neutral-50 border-neutral-200 text-neutral-700",
  error: "rounded-xl border p-3 text-sm bg-red-50 border-red-200 text-red-700",
  success: "rounded-xl border p-3 text-sm bg-green-50 border-green-200 text-green-700",
};

export function Toast({ kind = "info", children }: { kind?: Kind; children: React.ReactNode }) {
  return <div className={KLASSES[kind]}>{children}</div>;
}
