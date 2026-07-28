import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiItemResponse } from "@/shared/types";
import type { WeaponDto } from "../types/catalog.dto";

export function useWeapons(search?: string) {
  return useQuery({
    queryKey: ["catalog", "weapons", { search: search ?? null }],
    queryFn: () => {
      const params = search ? `?q=${encodeURIComponent(search)}` : "";
      return apiClient.get<ApiItemResponse<WeaponDto[]>>(`/api/catalog/weapons${params}`);
    },
    select: (response) => response.data,
  });
}
