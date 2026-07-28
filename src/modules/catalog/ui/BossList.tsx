"use client";

import { useBosses } from "../hooks/useBosses";
import { BossCard } from "./BossCard";

export function BossList() {
  const { data: bosses, isLoading, isError } = useBosses();

  if (isLoading) return <p>Cargando jefes...</p>;
  if (isError) return <p>No se pudieron cargar los jefes.</p>;
  if (!bosses || bosses.length === 0) return <p>Todavía no hay jefes cargados.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {bosses.map((boss) => (
        <BossCard key={boss.id} boss={boss} />
      ))}
    </div>
  );
}
