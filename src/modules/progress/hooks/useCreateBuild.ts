import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ApiItemResponse } from "@/shared/types";
import type { BuildDto, CreateBuildInput } from "../types/progress.dto";

export function useCreateBuild() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBuildInput) =>
      apiClient.post<ApiItemResponse<BuildDto>>("/api/progress/builds", input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress", "builds"] });
    },
  });
}
