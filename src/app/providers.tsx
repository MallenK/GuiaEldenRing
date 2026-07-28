"use client";

import { useEffect, useState, type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createQueryClient, createQueryPersister } from "@/lib/reactQueryClient";
import { useServiceWorker } from "@/shared/offline/useServiceWorker";
import { useSyncOnReconnect } from "@/modules/progress/hooks/useSyncOnReconnect";

function AppEffects() {
  useServiceWorker();
  useSyncOnReconnect();
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  useEffect(() => {
    const persister = createQueryPersister();
    if (!persister) return;

    const [unsubscribe] = persistQueryClient({ queryClient, persister });
    return unsubscribe;
  }, [queryClient]);

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AppEffects />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
