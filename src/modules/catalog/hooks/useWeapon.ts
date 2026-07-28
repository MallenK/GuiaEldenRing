import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiItemResponse } from "@/shared/types";
import type { WeaponDto } from "../types/catalog.dto";

export function useWeapon(slug: string) {
  return useQuery({
    queryKey: ["catalog", "weapon", slug],
    queryFn: () => apiClient.get<ApiItemResponse<WeaponDto>>(`/api/catalog/weapons/${slug}`),
    select: (response) => response.data,
    enabled: Boolean(slug),
  });
}
