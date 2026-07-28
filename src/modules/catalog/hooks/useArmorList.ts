import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiItemResponse } from "@/shared/types";
import type { ArmorDto } from "../types/catalog.dto";

export function useArmorList(search?: string) {
  return useQuery({
    queryKey: ["catalog", "armor", { search: search ?? null }],
    queryFn: () => {
      const params = search ? `?q=${encodeURIComponent(search)}` : "";
      return apiClient.get<ApiItemResponse<ArmorDto[]>>(`/api/catalog/armor${params}`);
    },
    select: (response) => response.data,
  });
}
