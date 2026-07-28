import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiItemResponse } from "@/shared/types";
import type { CatalogSearchHitDto } from "@/modules/catalog";

export function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () =>
      apiClient.get<ApiItemResponse<CatalogSearchHitDto[]>>(
        `/api/search?q=${encodeURIComponent(query)}`,
      ),
    select: (response) => response.data,
    enabled: query.trim().length >= 2,
  });
}
