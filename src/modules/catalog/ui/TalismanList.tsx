"use client";

import { useTalismans } from "../hooks/useTalismans";
import { TalismanCard } from "./TalismanCard";

export function TalismanList() {
  const { data: talismans, isLoading, isError } = useTalismans();

  if (isLoading) return <p>Cargando talismanes...</p>;
  if (isError) return <p>No se pudieron cargar los talismanes.</p>;
  if (!talismans || talismans.length === 0) return <p>Todavía no hay talismanes cargados.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {talismans.map((talisman) => (
        <TalismanCard key={talisman.id} talisman={talisman} />
      ))}
    </div>
  );
}
