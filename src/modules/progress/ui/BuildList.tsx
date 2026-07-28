"use client";

import { useBuilds } from "../hooks/useBuilds";
import { useDeleteBuild } from "../hooks/useDeleteBuild";

export function BuildList() {
  const { data: builds, isLoading, isError } = useBuilds();
  const deleteBuild = useDeleteBuild();

  if (isLoading) return <p>Cargando builds...</p>;
  if (isError) return <p>No se pudieron cargar las builds.</p>;
  if (!builds || builds.length === 0) return <p>Todavía no tienes builds guardadas.</p>;

  return (
    <ul className="flex flex-col gap-3">
      {builds.map((build) => (
        <li
          key={build.id}
          className="flex items-center justify-between rounded-lg border border-neutral-800 p-4"
        >
          <div>
            <p className="font-semibold">{build.name}</p>
            <p className="text-sm text-neutral-400">
              VIG {build.stats.vigor} · MEN {build.stats.mind} · RES {build.stats.endurance} · FUE{" "}
              {build.stats.strength} · DES {build.stats.dexterity} · INT {build.stats.intelligence} ·
              FE {build.stats.faith} · ARC {build.stats.arcane}
            </p>
          </div>
          <button
            onClick={() => deleteBuild.mutate(build.id)}
            className="text-sm text-red-500 hover:underline"
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}
