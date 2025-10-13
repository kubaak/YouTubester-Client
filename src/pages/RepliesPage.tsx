import React, { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { useQueryClient } from "@tanstack/react-query";
import type { ColDef, ValueGetterParams, GetRowIdParams, CellValueChangedEvent, GridApi } from "ag-grid-community";
import type { Reply, DraftDecisionDto } from "../api";
import { useGetApiReplies, usePostApiRepliesApprove, getGetApiRepliesQueryKey } from "../api/replies";
ModuleRegistry.registerModules([AllCommunityModule]);

const MAX_LEN = 10_000;

const DEFAULT_COL_DEF: ColDef<Reply> = {
  sortable: true,
  resizable: true,
  wrapText: true,
  autoHeight: true,
};

const COLUMN_DEFS: ColDef<Reply>[] = [
  {
    headerName: "",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 50,
    pinned: "left",
  },
  {
    field: "videoTitle",
    headerName: "Title",
    flex: 2,
    filter: true,
  },
  {
    field: "commentText",
    headerName: "Original Comment",
    flex: 3,
    filter: true,
  },
  {
    field: "finalText",
    headerName: `Approved Reply (max ${MAX_LEN})`,
    flex: 3,
    editable: true,
    cellEditor: "agLargeTextCellEditor",
    cellEditorParams: { maxLength: MAX_LEN, rows: 6 },
    valueGetter: (p: ValueGetterParams<Reply, string | undefined>) => p.data?.finalText ?? p.data?.suggestedText ?? "",
    filter: true,
  },
];

const getRowId = (p: GetRowIdParams<Reply>): string => p.data.commentId!;

export default function RepliesPage() {
  const {
    data: rows = [],
    refetch,
    isFetching,
  } = useGetApiReplies<Reply[]>({
    query: {
      refetchOnWindowFocus: false,
      select: (res) => res?.data ?? [],
    },
  });
  const queryClient = useQueryClient();
  const queryKey = getGetApiRepliesQueryKey();
  const approveMutation = usePostApiRepliesApprove();
  const gridApiRef = useRef<GridApi<Reply> | null>(null);

  const onCellValueChanged = (e: CellValueChangedEvent<Reply>) => {
    const updatedRow = e.data;
    queryClient.setQueryData<Reply[]>(queryKey, (prev) => {
      if (!prev) return [updatedRow];
      return prev.map((r) => (r.commentId === updatedRow.commentId ? updatedRow : r));
    });
  };

  const onApproveSelected = async () => {
    const api = gridApiRef.current;
    if (!api) return;
    const selected = api.getSelectedRows() as Reply[];
    const decisions: DraftDecisionDto[] = selected
      .map((r) => ({
        commentId: r.commentId,
        approvedText: r.finalText?.trim().slice(0, MAX_LEN),
      }))
      .filter((d) => d.approvedText && d.approvedText.length > 0);

    if (decisions.length === 0) return;

    await approveMutation.mutateAsync({ data: decisions });
    await queryClient.invalidateQueries({ queryKey });
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div className="flex items-center gap-2 p-3 border-b bg-white">
        <button onClick={() => void refetch()} disabled={isFetching} className="rounded-2xl border px-3 py-2 text-sm">
          {isFetching ? "Refreshing…" : "Refresh"}
        </button>
        <button onClick={onApproveSelected} className="rounded-2xl bg-black text-white px-4 py-2 text-sm">
          Approve Selected
        </button>
      </div>

      <AgGridReact<Reply>
        rowData={rows}
        columnDefs={COLUMN_DEFS}
        defaultColDef={DEFAULT_COL_DEF}
        rowSelection="multiple"
        animateRows
        getRowId={getRowId}
        onCellValueChanged={onCellValueChanged}
        pagination
        paginationPageSize={25}
        onGridReady={(e) => {
          gridApiRef.current = e.api;
        }}
      />
    </div>
  );
}
