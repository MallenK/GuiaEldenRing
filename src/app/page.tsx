import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold">GuiaEldenRing</h1>
      <p className="max-w-md text-neutral-400">
        Guía y cheatsheet de Elden Ring: jefes, armas, builds y ubicaciones,
        disponible también sin conexión.
      </p>
      <Link
        href="/bosses"
        className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
      >
        Ver jefes
      </Link>
    </main>
  );
}
