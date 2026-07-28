"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiClient, ApiClientError } from "@/shared/api/apiClient";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await apiClient.post("/api/progress/register", {
        email,
        password,
        ...(name ? { name } : {}),
      });

      await signIn("credentials", { email, password, redirect: false });
      router.push("/builds");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "No se pudo completar el registro.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex max-w-sm flex-1 flex-col justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Crear cuenta</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre (opcional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border border-neutral-700 bg-transparent px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded border border-neutral-700 bg-transparent px-3 py-2"
        />
        <input
          type="password"
          placeholder="Contraseña (mín. 8 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="rounded border border-neutral-700 bg-transparent px-3 py-2"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
        >
          {isSubmitting ? "Creando..." : "Crear cuenta"}
        </button>
      </form>
      <p className="text-sm text-neutral-400">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="underline">
          Inicia sesión
        </Link>
      </p>
    </main>
  );
}
