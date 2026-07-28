"use client";

import { useLocations } from "../hooks/useLocations";
import { LocationCard } from "./LocationCard";

export function LocationList() {
  const { data: locations, isLoading, isError } = useLocations();

  if (isLoading) return <p>Cargando ubicaciones...</p>;
  if (isError) return <p>No se pudieron cargar las ubicaciones.</p>;
  if (!locations || locations.length === 0) return <p>Todavía no hay ubicaciones cargadas.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
}
