"use client";

import { use } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useWeapon } from "@/modules/catalog/hooks/useWeapon";
import { ChecklistToggle } from "@/modules/progress/ui/ChecklistToggle";

export default function WeaponDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: weapon, isLoading, isError } = useWeapon(slug);
  const { status } = useSession();

  if (isLoading) return <main className="mx-auto max-w-3xl p-8">Cargando...</main>;
  if (isError || !weapon) {
    return <main className="mx-auto max-w-3xl p-8">Arma no encontrada.</main>;
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold">{weapon.name}</h1>
      <p className="text-neutral-400">{weapon.category}</p>
      <dl className="mt-4 flex gap-6">
        <div>
          <dt className="text-neutral-500">Peso</dt>
          <dd className="text-lg">{weapon.weight}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Fuerza req.</dt>
          <dd className="text-lg">{weapon.requiredStr}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Destreza req.</dt>
          <dd className="text-lg">{weapon.requiredDex}</dd>
        </div>
      </dl>

      <div className="mt-6">
        {status === "authenticated" ? (
          <ChecklistToggle refType="weapon" refId={weapon.slug} label="Marcar como obtenida" />
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
