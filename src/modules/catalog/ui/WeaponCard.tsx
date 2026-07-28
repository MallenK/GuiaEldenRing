import Link from "next/link";
import type { WeaponDto } from "../types/catalog.dto";

export function WeaponCard({ weapon }: { weapon: WeaponDto }) {
  return (
    <Link
      href={`/weapons/${weapon.slug}`}
      className="block rounded-lg border border-neutral-800 p-4 transition hover:border-neutral-500"
    >
      <h3 className="text-lg font-semibold">{weapon.name}</h3>
      <p className="text-sm text-neutral-400">{weapon.category}</p>
      <dl className="mt-2 flex gap-4 text-sm">
        <div>
          <dt className="text-neutral-500">Peso</dt>
          <dd>{weapon.weight}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Fue/Des</dt>
          <dd>
            {weapon.requiredStr}/{weapon.requiredDex}
          </dd>
        </div>
      </dl>
    </Link>
  );
}
