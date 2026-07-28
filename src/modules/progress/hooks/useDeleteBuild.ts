import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";

export function useDeleteBuild() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (buildId: string) => apiClient.delete(`/api/progress/builds/${buildId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress", "builds"] });
    },
  });
}
