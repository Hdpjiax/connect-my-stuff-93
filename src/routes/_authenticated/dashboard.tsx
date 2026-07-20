import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, Plane } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Panel — VuelosDk" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background">
              <Plane className="h-4 w-4 -rotate-45" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">
              Vuelos<span className="text-muted-foreground">Dk</span>
            </span>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-foreground transition hover:border-foreground"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">Bienvenido</p>
        <h1 className="font-display text-5xl font-semibold tracking-tight">
          Hola{email ? "," : ""} <span className="italic text-muted-foreground">{email}</span>
        </h1>
        <p className="mt-6 max-w-lg text-muted-foreground">
          Estás dentro de tu panel de VuelosDk. Aquí aparecerán tus vuelos y reservas próximamente.
        </p>
      </main>
    </div>
  );
}