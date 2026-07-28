import Link from "next/link";
import type { TalismanDto } from "../types/catalog.dto";

export function TalismanCard({ talisman }: { talisman: TalismanDto }) {
  return (
    <Link
      href={`/talismans/${talisman.slug}`}
      className="block rounded-lg border border-neutral-800 p-4 transition hover:border-neutral-500"
    >
      <h3 className="text-lg font-semibold">{talisman.name}</h3>
      <p className="text-sm text-neutral-400">{talisman.effect}</p>
      <p className="mt-2 text-sm text-neutral-500">Peso {talisman.weight}</p>
    </Link>
  );
}
