import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiItemResponse } from "@/shared/types";
import { useOnlineStatus } from "@/shared/hooks/useOnlineStatus";
import { enqueueMutation } from "@/shared/offline/mutationQueue";
import { checklistQueryKey } from "./useChecklist";
import type { ChecklistItemDto, ToggleChecklistInput } from "../types/progress.dto";

type ChecklistCache = ApiItemResponse<ChecklistItemDto[]>;

export function useToggleChecklistItem() {
  const queryClient = useQueryClient();
  const isOnline = useOnlineStatus();

  return useMutation({
    mutationFn: async (input: ToggleChecklistInput) => {
      if (isOnline) {
        await apiClient.post("/api/progress/checklists", input);
        return;
      }
      // Offline: queue the write. It's applied optimistically below and
      // reconciled against /api/progress/sync once the connection returns.
      await enqueueMutation("checklist:toggle", input);
    },
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: checklistQueryKey });
      const previous = queryClient.getQueryData<ChecklistCache>(checklistQueryKey);

      queryClient.setQueryData<ChecklistCache>(checklistQueryKey, (old) => {
        const items = old?.data ?? [];
        const exists = items.some(
          (item) => item.refType === input.refType && item.refId === input.refId,
        );
        const next = exists
          ? items.map((item) =>
              item.refType === input.refType && item.refId === input.refId
                ? { ...item, completed: input.completed }
                : item,
            )
          : [
              ...items,
              {
                id: `local-${input.refType}-${input.refId}`,
                refType: input.refType,
                refId: input.refId,
                completed: input.completed,
              },
            ];
        return { data: next };
      });

      return { previous };
    },
    onError: (_error, _input, context) => {
      if (context?.previous) queryClient.setQueryData(checklistQueryKey, context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: checklistQueryKey });
    },
  });
}
