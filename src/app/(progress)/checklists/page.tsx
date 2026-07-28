"use client";

import Link from "next/link";
import { useChecklist } from "@/modules/progress/hooks/useChecklist";

export default function ChecklistsPage() {
  const { data: items, isLoading, isError } = useChecklist();
  const completed = items?.filter((item) => item.completed) ?? [];

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 p-8">
      <h1 className="text-2xl font-bold">Mi progreso</h1>
      <p className="text-sm text-neutral-400">
        Marca jefes como derrotados desde su página de detalle en{" "}
        <Link href="/bosses" className="underline">
          la lista de jefes
        </Link>
        .
      </p>

      {isLoading && <p>Cargando progreso...</p>}
      {isError && <p>No se pudo cargar el progreso.</p>}
      {!isLoading && completed.length === 0 && <p>Todavía no has marcado nada como completado.</p>}

      <ul className="flex flex-col gap-2">
        {completed.map((item) => (
          <li key={item.id} className="rounded border border-neutral-800 p-3 text-sm">
            {item.refType}: {item.refId}
          </li>
        ))}
      </ul>
    </main>
  );
}
