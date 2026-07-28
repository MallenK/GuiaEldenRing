import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 24 * 60 * 60 * 1000,
        retry: 1,
      },
    },
  });
}

export function createQueryPersister() {
  if (typeof window === "undefined") return undefined;

  return createSyncStoragePersister({
    storage: window.localStorage,
    key: "guiaeldenring-query-cache",
  });
}
