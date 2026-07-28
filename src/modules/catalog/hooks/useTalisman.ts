import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiItemResponse } from "@/shared/types";
import type { TalismanDto } from "../types/catalog.dto";

export function useTalisman(slug: string) {
  return useQuery({
    queryKey: ["catalog", "talisman", slug],
    queryFn: () => apiClient.get<ApiItemResponse<TalismanDto>>(`/api/catalog/talismans/${slug}`),
    select: (response) => response.data,
    enabled: Boolean(slug),
  });
}
