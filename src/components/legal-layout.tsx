import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

type LegalLayoutProps = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
};

export function LegalLayout({ eyebrow, title, updated, intro, children }: LegalLayoutProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="VuelosDk inicio">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-foreground text-background">
              <Plane className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="truncate font-display text-xl tracking-tight">
              Vuelos<span className="text-accent">Dk</span>
            </span>
          </Link>
          <Button asChild variant="outline" className="min-h-11">
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Última actualización: {updated}
          </p>
          <p className="mt-6 text-pretty text-base text-muted-foreground sm:text-lg">
            {intro}
          </p>
        </div>

        <article className="legal-prose">{children}</article>

        <div className="mt-16 flex flex-wrap gap-3 border-t border-border pt-8 text-sm">
          <LegalNav />
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} VuelosDk. Todos los derechos reservados.</p>
          <p>Este documento es informativo y editable por el responsable del sitio.</p>
        </div>
      </footer>
    </div>
  );
}

function LegalNav() {
  const items: Array<{ to: "/legal" | "/privacy" | "/terms" | "/cookies"; label: string }> = [
    { to: "/legal", label: "Aviso legal" },
    { to: "/privacy", label: "Privacidad" },
    { to: "/terms", label: "Términos" },
    { to: "/cookies", label: "Cookies" },
  ];
  return (
    <>
      {items.map((i) => (
        <Link
          key={i.to}
          to={i.to}
          className="rounded-md border border-border bg-card px-3 py-2 text-foreground/80 transition-colors hover:text-foreground"
          activeProps={{ className: "border-foreground/40 text-foreground" }}
        >
          {i.label}
        </Link>
      ))}
    </>
  );
}