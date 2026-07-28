import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiItemResponse } from "@/shared/types";
import type { TalismanDto } from "../types/catalog.dto";

export function useTalismans(search?: string) {
  return useQuery({
    queryKey: ["catalog", "talismans", { search: search ?? null }],
    queryFn: () => {
      const params = search ? `?q=${encodeURIComponent(search)}` : "";
      return apiClient.get<ApiItemResponse<TalismanDto[]>>(`/api/catalog/talismans${params}`);
    },
    select: (response) => response.data,
  });
}
