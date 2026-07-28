import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiItemResponse } from "@/shared/types";
import type { LocationDto } from "../types/catalog.dto";

export function useLocations(search?: string) {
  return useQuery({
    queryKey: ["catalog", "locations", { search: search ?? null }],
    queryFn: () => {
      const params = search ? `?q=${encodeURIComponent(search)}` : "";
      return apiClient.get<ApiItemResponse<LocationDto[]>>(`/api/catalog/locations${params}`);
    },
    select: (response) => response.data,
  });
}
