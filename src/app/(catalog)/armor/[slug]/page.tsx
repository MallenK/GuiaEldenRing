"use client";

import { use } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useArmor } from "@/modules/catalog/hooks/useArmor";
import { ChecklistToggle } from "@/modules/progress/ui/ChecklistToggle";

export default function ArmorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: armor, isLoading, isError } = useArmor(slug);
  const { status } = useSession();

  if (isLoading) return <main className="mx-auto max-w-3xl p-8">Cargando...</main>;
  if (isError || !armor) {
    return <main className="mx-auto max-w-3xl p-8">Armadura no encontrada.</main>;
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold">{armor.name}</h1>
      <p className="text-neutral-400">{armor.slot}</p>
      <dl className="mt-4 flex gap-6">
        <div>
          <dt className="text-neutral-500">Peso</dt>
          <dd className="text-lg">{armor.weight}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Aguante</dt>
          <dd className="text-lg">{armor.poise}</dd>
        </div>
      </dl>

      <div className="mt-6">
        {status === "authenticated" ? (
          <ChecklistToggle refType="armor" refId={armor.slug} label="Marcar como obtenida" />
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
