import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Plane, ShieldCheck, Sparkles, Globe2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VuelosDk — Vuelos con estilo, sin fricción" },
      {
        name: "description",
        content:
          "Plataforma editorial de gestión de vuelos. Inicia sesión para cotizar, reservar y dar seguimiento a tus viajes.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <SiteHeader />
      <Hero />
      <Features />
      <Manifesto />
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background">
            <Plane className="h-4 w-4 -rotate-45" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            Vuelos<span className="text-muted-foreground">Dk</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <a href="#ventajas" className="text-muted-foreground transition hover:text-foreground">Ventajas</a>
          <a href="#manifiesto" className="text-muted-foreground transition hover:text-foreground">Manifiesto</a>
          <a href="#contacto" className="text-muted-foreground transition hover:text-foreground">Contacto</a>
        </nav>
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
        >
          Iniciar sesión
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
          Edición 2026 · México
        </div>
        <h1 className="font-display text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
          Vuelos con estilo,
          <br />
          <span className="italic text-muted-foreground">sin fricción.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
          Una plataforma editorial para cotizar, reservar y dar seguimiento a tus vuelos.
          Ingresa con tu cuenta para acceder a tu panel personal.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            Iniciar sesión
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Globe2, t: "Cobertura nacional", d: "Rutas y aerolíneas principales de México en un solo panel." },
    { icon: ShieldCheck, t: "Datos seguros", d: "Autenticación protegida y seguimiento privado de tus vuelos." },
    { icon: Sparkles, t: "Diseño claro", d: "Una experiencia editorial pensada para leer, decidir y reservar." },
  ];
  return (
    <section id="ventajas" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">§ 01 — Ventajas</p>
        <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Todo lo que necesitas, <span className="italic text-muted-foreground">nada de ruido</span>.
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="border-t border-border pt-6">
              <Icon className="h-5 w-5 text-foreground" />
              <h3 className="mt-4 font-display text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifiesto" className="border-b border-border/60 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-background/50">§ 02 — Manifiesto</p>
        <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Un vuelo no debería sentirse como <span className="italic text-background/60">un trámite</span>.
        </h2>
        <p className="mt-8 max-w-2xl text-background/70">
          VuelosDk existe para que gestionar un viaje sea claro, rápido y sin sorpresas. Inicia sesión para acceder a tu panel.
        </p>
        <div className="mt-10">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-medium text-foreground transition hover:opacity-90"
          >
            Iniciar sesión <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer id="contacto" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-4 text-xs text-muted-foreground md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-foreground text-background">
              <Plane className="h-3 w-3 -rotate-45" />
            </div>
            <span className="font-display text-sm font-semibold tracking-tight text-foreground">VuelosDk</span>
          </div>
          <span>© {new Date().getFullYear()} VuelosDk. Todos los derechos reservados.</span>
          <span>Hecho con cuidado editorial · CDMX</span>
        </div>
      </div>
    </footer>
  );
}