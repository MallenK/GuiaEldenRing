import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiItemResponse } from "@/shared/types";
import type { ChecklistItemDto } from "../types/progress.dto";

export const checklistQueryKey = ["progress", "checklist"] as const;

export function useChecklist() {
  return useQuery({
    queryKey: checklistQueryKey,
    queryFn: () => apiClient.get<ApiItemResponse<ChecklistItemDto[]>>("/api/progress/checklists"),
    select: (response) => response.data,
  });
}

export function useChecklistStatus(refType: string, refId: string) {
  const { data: items } = useChecklist();
  return items?.some((item) => item.refType === refType && item.refId === refId && item.completed) ?? false;
}
