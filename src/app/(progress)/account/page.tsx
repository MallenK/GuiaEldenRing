"use client";

import { useSession, signOut } from "next-auth/react";

export default function AccountPage() {
  const { data: session } = useSession();

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold">Mi cuenta</h1>
      <p className="text-neutral-400">{session?.user?.email}</p>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="self-start rounded-full border border-neutral-700 px-4 py-2 text-sm"
      >
        Cerrar sesión
      </button>
    </main>
  );
}
