import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Lock, Mail, Plane } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — VuelosDk" },
      { name: "description", content: "Accede a tu panel de VuelosDk." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Escribe tu correo y contraseña.");
      return;
    }
    setPending(true);
    // Placeholder: aquí se conectará la autenticación real (Lovable Cloud).
    setTimeout(() => {
      setPending(false);
      setError("Autenticación aún no conectada. Habilita Lovable Cloud para activarla.");
    }, 600);
  }

  return (
    <main className="min-h-dvh bg-background">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6 py-16">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Volver
        </Link>

        <div className="mb-8 flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background">
            <Plane className="h-4 w-4 -rotate-45" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            Vuelos<span className="text-muted-foreground">Dk</span>
          </span>
        </div>

        <h1 className="font-display text-4xl font-semibold tracking-tight">Iniciar sesión</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Accede a tu panel para gestionar tus vuelos.
        </p>

        {error ? (
          <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">Correo</span>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 focus-within:border-foreground">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="min-h-11 w-full bg-transparent py-2 text-sm outline-none"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">Contraseña</span>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 focus-within:border-foreground">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="min-h-11 w-full bg-transparent py-2 text-sm outline-none"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={pending}
            className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-60"
          >
            {pending ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="mt-4 text-center text-xs text-muted-foreground transition hover:text-foreground"
        >
          ¿Aún no tienes cuenta? Contáctanos.
        </button>
      </div>
    </main>
  );
}