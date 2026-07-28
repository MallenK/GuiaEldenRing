import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiItemResponse } from "@/shared/types";
import type { BossDto } from "../types/catalog.dto";

export function useBosses(search?: string) {
  return useQuery({
    queryKey: ["catalog", "bosses", { search: search ?? null }],
    queryFn: () => {
      const params = search ? `?q=${encodeURIComponent(search)}` : "";
      return apiClient.get<ApiItemResponse<BossDto[]>>(`/api/catalog/bosses${params}`);
    },
    select: (response) => response.data,
  });
}
