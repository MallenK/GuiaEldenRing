"use client";

import { useWeapons } from "../hooks/useWeapons";
import { WeaponCard } from "./WeaponCard";

export function WeaponList() {
  const { data: weapons, isLoading, isError } = useWeapons();

  if (isLoading) return <p>Cargando armas...</p>;
  if (isError) return <p>No se pudieron cargar las armas.</p>;
  if (!weapons || weapons.length === 0) return <p>Todavía no hay armas cargadas.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {weapons.map((weapon) => (
        <WeaponCard key={weapon.id} weapon={weapon} />
      ))}
    </div>
  );
}
