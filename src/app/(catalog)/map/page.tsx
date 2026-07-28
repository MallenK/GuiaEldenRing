import Link from "next/link";
import { LocationList } from "@/modules/catalog/ui/LocationList";

export default function MapPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-2 text-2xl font-bold">Mapa</h1>
      <p className="mb-6 text-sm text-neutral-400">
        El mapa interactivo todavía no está implementado — requiere assets de mapa y un sistema de
        coordenadas propios. Mientras tanto, aquí tienes el listado de{" "}
        <Link href="/locations" className="underline">
          ubicaciones
        </Link>
        .
      </p>
      <LocationList />
    </main>
  );
}
