import Link from "next/link";
import type { BossDto } from "../types/catalog.dto";

export function BossCard({ boss }: { boss: BossDto }) {
  return (
    <Link
      href={`/bosses/${boss.slug}`}
      className="block rounded-lg border border-neutral-800 p-4 transition hover:border-neutral-500"
    >
      <h3 className="text-lg font-semibold">{boss.name}</h3>
      <p className="text-sm text-neutral-400">{boss.region}</p>
      <dl className="mt-2 flex gap-4 text-sm">
        <div>
          <dt className="text-neutral-500">HP</dt>
          <dd>{boss.health}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Runes</dt>
          <dd>{boss.runes.toLocaleString()}</dd>
        </div>
      </dl>
    </Link>
  );
}
