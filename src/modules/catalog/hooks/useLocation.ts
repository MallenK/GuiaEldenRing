import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiItemResponse } from "@/shared/types";
import type { LocationDto } from "../types/catalog.dto";

export function useLocation(slug: string) {
  return useQuery({
    queryKey: ["catalog", "location", slug],
    queryFn: () => apiClient.get<ApiItemResponse<LocationDto>>(`/api/catalog/locations/${slug}`),
    select: (response) => response.data,
    enabled: Boolean(slug),
  });
}
