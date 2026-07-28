"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { SearchBar } from "@/modules/search/ui/SearchBar";

export function NavBar() {
  const { status } = useSession();

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 px-6 py-4">
      <Link href="/" className="font-semibold">
        GuiaEldenRing
      </Link>
      <SearchBar />
      <nav className="flex flex-wrap items-center gap-4 text-sm">
        <Link href="/bosses">Jefes</Link>
        <Link href="/weapons">Armas</Link>
        <Link href="/armor">Armaduras</Link>
        <Link href="/talismans">Talismanes</Link>
        <Link href="/locations">Ubicaciones</Link>
        <Link href="/builds">Builds</Link>
        <Link href="/checklists">Progreso</Link>
        {status === "authenticated" ? (
          <Link href="/account">Cuenta</Link>
        ) : (
          <Link href="/login">Iniciar sesión</Link>
        )}
      </nav>
    </header>
  );
}
