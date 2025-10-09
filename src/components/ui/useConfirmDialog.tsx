import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function useConfirmDialog() {
  const [state, setState] = useState<{ msg: string; resolve?: (v: boolean) => void } | null>(null);

  const confirm = (msg: string) => new Promise<boolean>((resolve) => setState({ msg, resolve }));
  const close = (ok: boolean) => {
    state?.resolve?.(ok);
    setState(null);
  };

  const ui = (
    <AnimatePresence>
      {state && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            className="w-[min(560px,92vw)] rounded-2xl bg-white p-5 shadow-xl"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
              <div>
                <h2 className="text-base font-semibold">Confirm action</h2>
                <p className="mt-1 text-sm text-neutral-700">{state.msg}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-xl border px-3 py-2 text-sm" onClick={() => close(false)}>
                Cancel
              </button>
              <button className="rounded-xl bg-black px-4 py-2 text-sm text-white" onClick={() => close(true)}>
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return { confirm, ui } as const;
}
