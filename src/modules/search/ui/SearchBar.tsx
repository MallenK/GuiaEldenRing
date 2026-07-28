"use client";

import { useState } from "react";
import Link from "next/link";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { useSearch } from "../hooks/useSearch";
import type { CatalogEntryType } from "@/modules/catalog";

const PATH_BY_TYPE: Record<CatalogEntryType, string> = {
  boss: "/bosses",
  weapon: "/weapons",
  armor: "/armor",
  talisman: "/talismans",
  location: "/locations",
};

const LABEL_BY_TYPE: Record<CatalogEntryType, string> = {
  boss: "Jefe",
  weapon: "Arma",
  armor: "Armadura",
  talisman: "Talismán",
  location: "Ubicación",
};

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 250);
  const { data: hits, isFetching } = useSearch(debouncedQuery);

  const showResults = isFocused && debouncedQuery.trim().length >= 2;

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="search"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        className="w-full rounded border border-neutral-700 bg-transparent px-3 py-1.5 text-sm"
      />
      {showResults && (
        <div className="absolute z-10 mt-1 w-full rounded border border-neutral-800 bg-background shadow-lg">
          {isFetching && <p className="p-2 text-sm text-neutral-500">Buscando...</p>}
          {!isFetching && hits?.length === 0 && (
            <p className="p-2 text-sm text-neutral-500">Sin resultados.</p>
          )}
          {!isFetching &&
            hits?.map((hit) => (
              <Link
                key={`${hit.type}-${hit.slug}`}
                href={`${PATH_BY_TYPE[hit.type]}/${hit.slug}`}
                className="flex items-center justify-between px-3 py-2 text-sm hover:bg-neutral-900"
              >
                <span>{hit.name}</span>
                <span className="text-xs text-neutral-500">{LABEL_BY_TYPE[hit.type]}</span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
