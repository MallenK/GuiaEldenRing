"use client";

import { useArmorList } from "../hooks/useArmorList";
import { ArmorCard } from "./ArmorCard";

export function ArmorList() {
  const { data: armor, isLoading, isError } = useArmorList();

  if (isLoading) return <p>Cargando armaduras...</p>;
  if (isError) return <p>No se pudieron cargar las armaduras.</p>;
  if (!armor || armor.length === 0) return <p>Todavía no hay armaduras cargadas.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {armor.map((piece) => (
        <ArmorCard key={piece.id} armor={piece} />
      ))}
    </div>
  );
}
