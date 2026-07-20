import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Lock, Mail, Plane } from "lucide-react";
import { EarthScene } from "@/components/EarthScene";
import { supabase } from "@/integrations/supabase/client";

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
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!email || !password) {
      setError("Escribe tu correo y contraseña.");
      return;
    }
    setPending(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/dashboard" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/dashboard" },
        });
        if (error) throw error;
        setInfo("Cuenta creada. Revisa tu correo para confirmar (si aplica) o inicia sesión.");
        setMode("signin");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="min-h-dvh bg-background">
      <div className="mx-auto grid min-h-dvh max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:py-16">
        <LoginScene3D />
        <div className="mx-auto w-full max-w-md">
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

        <h1 className="font-display text-4xl font-semibold tracking-tight">
          {mode === "signin" ? "Iniciar sesión" : "Crear cuenta"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Accede a tu panel para gestionar tus vuelos."
            : "Regístrate para empezar a gestionar tus vuelos."}
        </p>

        {error ? (
          <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}
        {info ? (
          <div className="mt-6 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-foreground">
            {info}
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
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                required
                minLength={6}
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
            {pending ? "Procesando…" : mode === "signin" ? "Entrar" : "Crear cuenta"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
            setInfo(null);
          }}
          className="mt-6 text-center text-xs text-muted-foreground transition hover:text-foreground"
        >
          {mode === "signin" ? "¿No tienes cuenta? Crear una" : "¿Ya tienes cuenta? Iniciar sesión"}
        </button>
        </div>
      </div>
    </main>
  );
}

function LoginScene3D() {
  return (
    <EarthScene
      size={320}
      orbit={210}
      className="hidden h-[520px] lg:block"
    />
  );
}