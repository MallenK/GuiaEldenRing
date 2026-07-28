"use client";

import { Suspense, useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (result?.error) {
      setError("Email o contraseña incorrectos.");
      return;
    }

    router.push(searchParams.get("callbackUrl") ?? "/builds");
    router.refresh();
  }

  return (
    <main className="mx-auto flex max-w-sm flex-1 flex-col justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded border border-neutral-700 bg-transparent px-3 py-2"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <p className="text-sm text-neutral-400">
        ¿No tienes cuenta?{" "}
        <Link href="/register" className="underline">
          Regístrate
        </Link>
      </p>
    </main>
  );
}
