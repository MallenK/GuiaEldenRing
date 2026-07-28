import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiItemResponse } from "@/shared/types";
import type { BossDto } from "../types/catalog.dto";

export function useBoss(slug: string) {
  return useQuery({
    queryKey: ["catalog", "boss", slug],
    queryFn: () =>
      apiClient.get<ApiItemResponse<BossDto>>(`/api/catalog/bosses/${slug}`),
    select: (response) => response.data,
    enabled: Boolean(slug),
  });
}
