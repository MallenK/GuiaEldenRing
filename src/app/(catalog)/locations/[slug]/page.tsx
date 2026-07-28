"use client";

import { use } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useLocation } from "@/modules/catalog/hooks/useLocation";
import { ChecklistToggle } from "@/modules/progress/ui/ChecklistToggle";

export default function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: location, isLoading, isError } = useLocation(slug);
  const { status } = useSession();

  if (isLoading) return <main className="mx-auto max-w-3xl p-8">Cargando...</main>;
  if (isError || !location) {
    return <main className="mx-auto max-w-3xl p-8">Ubicación no encontrada.</main>;
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold">{location.name}</h1>
      <p className="text-neutral-400">{location.region}</p>
      {location.description && <p className="mt-4">{location.description}</p>}

      <div className="mt-6">
        {status === "authenticated" ? (
          <ChecklistToggle refType="location" refId={location.slug} label="Marcar como visitada" />
        ) : (
          <p className="text-sm text-neutral-500">
            <Link href="/login" className="underline">
              Inicia sesión
            </Link>{" "}
            para llevar el registro de tu progreso.
          </p>
        )}
      </div>
    </main>
  );
}
