"use client";

import { use } from "react";
import { useBoss } from "@/modules/catalog/hooks/useBoss";

export default function BossDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: boss, isLoading, isError } = useBoss(slug);

  if (isLoading) return <main className="mx-auto max-w-3xl p-8">Cargando...</main>;
  if (isError || !boss) {
    return <main className="mx-auto max-w-3xl p-8">Jefe no encontrado.</main>;
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold">{boss.name}</h1>
      <p className="text-neutral-400">{boss.region}</p>
      <dl className="mt-4 flex gap-6">
        <div>
          <dt className="text-neutral-500">HP</dt>
          <dd className="text-lg">{boss.health}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Runas</dt>
          <dd className="text-lg">{boss.runes.toLocaleString()}</dd>
        </div>
      </dl>
    </main>
  );
}
