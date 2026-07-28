"use client";

import { useEffect, useState, type ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createQueryClient, createQueryPersister } from "@/lib/reactQueryClient";
import { useServiceWorker } from "@/shared/offline/useServiceWorker";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  useServiceWorker();

  useEffect(() => {
    const persister = createQueryPersister();
    if (!persister) return;

    const [unsubscribe] = persistQueryClient({ queryClient, persister });
    return unsubscribe;
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
