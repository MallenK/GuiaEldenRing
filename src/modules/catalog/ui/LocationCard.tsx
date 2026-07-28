import Link from "next/link";
import type { LocationDto } from "../types/catalog.dto";

export function LocationCard({ location }: { location: LocationDto }) {
  return (
    <Link
      href={`/locations/${location.slug}`}
      className="block rounded-lg border border-neutral-800 p-4 transition hover:border-neutral-500"
    >
      <h3 className="text-lg font-semibold">{location.name}</h3>
      <p className="text-sm text-neutral-400">{location.region}</p>
    </Link>
  );
}
