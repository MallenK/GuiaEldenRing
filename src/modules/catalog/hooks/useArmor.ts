import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiItemResponse } from "@/shared/types";
import type { ArmorDto } from "../types/catalog.dto";

export function useArmor(slug: string) {
  return useQuery({
    queryKey: ["catalog", "armorPiece", slug],
    queryFn: () => apiClient.get<ApiItemResponse<ArmorDto>>(`/api/catalog/armor/${slug}`),
    select: (response) => response.data,
    enabled: Boolean(slug),
  });
}
