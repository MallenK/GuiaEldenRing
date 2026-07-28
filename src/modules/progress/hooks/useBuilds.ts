import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiItemResponse } from "@/shared/types";
import type { BuildDto } from "../types/progress.dto";

export function useBuilds() {
  return useQuery({
    queryKey: ["progress", "builds"],
    queryFn: () => apiClient.get<ApiItemResponse<BuildDto[]>>("/api/progress/builds"),
    select: (response) => response.data,
  });
}
