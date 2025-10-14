import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./dialog";
import { Button } from "./button";

export function useRadixConfirmDialog() {
  const [state, setState] = useState<{ open: boolean; msg: string; resolve?: (v: boolean) => void }>({
    open: false,
    msg: "",
  });

  const confirm = (msg: string) => new Promise<boolean>((resolve) => setState({ open: true, msg, resolve }));

  const close = (ok: boolean) => {
    state.resolve?.(ok);
    setState({ open: false, msg: "", resolve: undefined });
  };

  const confirmDialog = (
    <Dialog open={state.open} onOpenChange={(v) => !v && close(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm action</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">{state.msg}</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => close(false)}>
            Cancel
          </Button>
          <Button onClick={() => close(true)}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return { confirm, confirmDialog } as const;
}
