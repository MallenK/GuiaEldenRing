"use client";

import { useState, type FormEvent } from "react";
import { useCreateBuild } from "../hooks/useCreateBuild";
import type { BuildStats } from "../types/progress.dto";

const STAT_LABELS: { key: keyof BuildStats; label: string }[] = [
  { key: "vigor", label: "Vigor" },
  { key: "mind", label: "Mente" },
  { key: "endurance", label: "Resistencia" },
  { key: "strength", label: "Fuerza" },
  { key: "dexterity", label: "Destreza" },
  { key: "intelligence", label: "Inteligencia" },
  { key: "faith", label: "Fe" },
  { key: "arcane", label: "Arcano" },
];

const DEFAULT_STATS: BuildStats = {
  vigor: 10,
  mind: 10,
  endurance: 10,
  strength: 10,
  dexterity: 10,
  intelligence: 10,
  faith: 10,
  arcane: 10,
};

export function BuildForm() {
  const [name, setName] = useState("");
  const [stats, setStats] = useState<BuildStats>(DEFAULT_STATS);
  const createBuild = useCreateBuild();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    createBuild.mutate(
      { name, stats },
      {
        onSuccess: () => {
          setName("");
          setStats(DEFAULT_STATS);
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg border border-neutral-800 p-4">
      <input
        type="text"
        placeholder="Nombre de la build"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="rounded border border-neutral-700 bg-transparent px-3 py-2"
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STAT_LABELS.map(({ key, label }) => (
          <label key={key} className="flex flex-col gap-1 text-sm">
            {label}
            <input
              type="number"
              min={1}
              max={99}
              value={stats[key]}
              onChange={(e) =>
                setStats((prev) => ({ ...prev, [key]: Number(e.target.value) }))
              }
              className="rounded border border-neutral-700 bg-transparent px-2 py-1"
            />
          </label>
        ))}
      </div>
      {createBuild.isError && (
        <p className="text-sm text-red-500">No se pudo guardar la build.</p>
      )}
      <button
        type="submit"
        disabled={createBuild.isPending}
        className="self-start rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
      >
        {createBuild.isPending ? "Guardando..." : "Guardar build"}
      </button>
    </form>
  );
}
