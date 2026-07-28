"use client";

import { use } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTalisman } from "@/modules/catalog/hooks/useTalisman";
import { ChecklistToggle } from "@/modules/progress/ui/ChecklistToggle";

export default function TalismanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: talisman, isLoading, isError } = useTalisman(slug);
  const { status } = useSession();

  if (isLoading) return <main className="mx-auto max-w-3xl p-8">Cargando...</main>;
  if (isError || !talisman) {
    return <main className="mx-auto max-w-3xl p-8">Talismán no encontrado.</main>;
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold">{talisman.name}</h1>
      <p className="text-neutral-400">{talisman.effect}</p>
      <p className="mt-4 text-sm text-neutral-500">Peso {talisman.weight}</p>

      <div className="mt-6">
        {status === "authenticated" ? (
          <ChecklistToggle refType="talisman" refId={talisman.slug} label="Marcar como obtenido" />
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
