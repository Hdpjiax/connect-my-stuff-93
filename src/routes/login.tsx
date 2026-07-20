import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Lock, Mail, Plane } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

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

  async function onGoogle() {
    setError(null);
    setPending(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError(result.error.message ?? "No se pudo iniciar sesión con Google.");
      setPending(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/dashboard" });
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

        <button
          type="button"
          onClick={onGoogle}
          disabled={pending}
          className="mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition hover:border-foreground disabled:opacity-60"
        >
          <GoogleIcon /> Continuar con Google
        </button>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          o
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
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
    <div className="relative hidden h-[520px] scene-3d lg:block" aria-hidden>
      <div className="relative h-full w-full">
        {/* Contrail orbit */}
        <div className="contrail absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2" />
        {/* Earth */}
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2">
          <span className="earth-atmosphere" />
          <div className="earth h-full w-full" />
        </div>
        {/* Orbiting plane */}
        <div className="absolute left-1/2 top-1/2 anim-orbit" style={{ ["--orbit-r" as string]: "210px" }}>
          <div className="-translate-x-1/2 -translate-y-1/2">
            <div className="rounded-full bg-background/80 p-2 shadow-lg backdrop-blur">
              <Plane className="h-6 w-6 -rotate-45 text-foreground" />
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 top-[86%] h-6 w-64 -translate-x-1/2 rounded-full bg-foreground/20 blur-2xl" />
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.5l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 7-10.3 7-17.7z"/>
      <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"/>
      <path fill="#34A853" d="M24 48c6.3 0 11.6-2.1 15.5-5.7l-7.7-6c-2.1 1.4-4.8 2.2-7.8 2.2-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/>
    </svg>
  );
}