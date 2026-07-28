"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import { useOnlineStatus } from "@/shared/hooks/useOnlineStatus";
import { drainMutationQueue } from "@/shared/offline/mutationQueue";
import { checklistQueryKey } from "./useChecklist";

type SyncResponse = { appliedIds: string[] };

// Drains the offline mutation queue against /api/progress/sync whenever the
// connection transitions from offline back to online.
export function useSyncOnReconnect() {
  const isOnline = useOnlineStatus();
  const queryClient = useQueryClient();
  const wasOffline = useRef(false);

  useEffect(() => {
    if (!isOnline) {
      wasOffline.current = true;
      return;
    }
    if (!wasOffline.current) return;
    wasOffline.current = false;

    drainMutationQueue((mutations) =>
      apiClient.post<SyncResponse>("/api/progress/sync", { mutations }),
    )
      .then(() => queryClient.invalidateQueries({ queryKey: checklistQueryKey }))
      .catch((error) => console.error("Failed to sync offline mutations", error));
  }, [isOnline, queryClient]);
}
