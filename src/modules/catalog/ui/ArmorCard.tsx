import Link from "next/link";
import type { ArmorDto } from "../types/catalog.dto";

export function ArmorCard({ armor }: { armor: ArmorDto }) {
  return (
    <Link
      href={`/armor/${armor.slug}`}
      className="block rounded-lg border border-neutral-800 p-4 transition hover:border-neutral-500"
    >
      <h3 className="text-lg font-semibold">{armor.name}</h3>
      <p className="text-sm text-neutral-400">{armor.slot}</p>
      <dl className="mt-2 flex gap-4 text-sm">
        <div>
          <dt className="text-neutral-500">Peso</dt>
          <dd>{armor.weight}</dd>
        </div>
        <div>
          <dt className="text-neutral-500">Aguante</dt>
          <dd>{armor.poise}</dd>
        </div>
      </dl>
    </Link>
  );
}
