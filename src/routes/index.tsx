import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/")({
  component: Index,
});

const ROUTES = [
  { from: "MEX", to: "CUN", label: "México → Cancún", price: "$1,240", dur: "2h 20m", airline: "Aeroméxico" },
  { from: "GDL", to: "MTY", label: "Guadalajara → Monterrey", price: "$890", dur: "1h 30m", airline: "Viva Aerobus" },
  { from: "MEX", to: "MAD", label: "México → Madrid", price: "$14,500", dur: "10h 45m", airline: "Aeroméxico" },
  { from: "TIJ", to: "MEX", label: "Tijuana → CDMX", price: "$1,590", dur: "3h 40m", airline: "Volaris" },
];

const FEATURES = [
  {
    icon: Wallet,
    title: "Precios transparentes",
    desc: "Sin cargos ocultos. Ves el total con impuestos y equipaje desde el primer paso.",
  },
  {
    icon: ShieldCheck,
    title: "Reserva protegida",
    desc: "Cancelación flexible y soporte 24/7 para cualquier cambio en tu itinerario.",
  },
  {
    icon: Sparkles,
    title: "Mejores tarifas",
    desc: "Comparamos Aeroméxico, Viva Aerobus, Volaris y más para encontrar el precio justo.",
  },
];

function Index() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main id="main">
        <Hero />
        <Routes />
        <Features />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-6">
        <a href="/" className="flex min-w-0 items-center gap-2" aria-label="VuelosDk inicio">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-foreground text-background">
            <Plane className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="truncate font-display text-xl tracking-tight">
            Vuelos<span className="text-accent">Dk</span>
          </span>
        </a>
        <div className="flex items-center gap-2">
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-1 text-sm text-muted-foreground">
              <li><a href="#rutas" className="rounded-md px-3 py-2 transition-colors hover:text-foreground">Rutas</a></li>
              <li><a href="#ventajas" className="rounded-md px-3 py-2 transition-colors hover:text-foreground">Ventajas</a></li>
              <li><a href="#ayuda" className="rounded-md px-3 py-2 transition-colors hover:text-foreground">Ayuda</a></li>
            </ul>
          </nav>
          <Button variant="default" className="min-h-11">
            Iniciar sesión
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, oklch(0.62 0.06 190 / 0.12), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Reservas seguras · Precios en tiempo real
          </span>
          <h1 className="mt-6 text-balance font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Encuentra el vuelo{" "}
            <em className="italic text-accent-gradient">perfecto</em>
            <br className="hidden sm:block" /> para tu próximo viaje.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            Compara tarifas de las principales aerolíneas y reserva en segundos con una
            experiencia diseñada para viajeros exigentes.
          </p>
        </div>

        <SearchCard />
      </div>
    </section>
  );
}

function SearchCard() {
  return (
    <form
      className="mx-auto mt-10 max-w-4xl rounded-2xl border border-border bg-card p-4 shadow-card sm:p-6 animate-rise"
      style={{ animationDelay: "0.1s" }}
      onSubmit={(e) => e.preventDefault()}
      aria-label="Buscar vuelos"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
        <FieldGroup id="from" label="Origen" icon={MapPin} placeholder="Ciudad o aeropuerto" defaultValue="Ciudad de México (MEX)" />
        <FieldGroup id="to" label="Destino" icon={MapPin} placeholder="Ciudad o aeropuerto" defaultValue="Cancún (CUN)" />
        <FieldGroup id="date" label="Fecha" icon={Calendar} type="date" defaultValue="2026-08-14" />
        <Button type="submit" size="lg" className="mt-1 min-h-12 gap-2 sm:col-span-2 lg:col-span-1 lg:mt-0">
          <Search className="h-4 w-4" aria-hidden="true" />
          Buscar vuelos
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" aria-hidden="true" /> 1 adulto
        </span>
        <span aria-hidden="true">·</span>
        <span>Clase turista</span>
        <span aria-hidden="true">·</span>
        <span>Solo ida</span>
      </div>
    </form>
  );
}

type FieldGroupProps = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  placeholder?: string;
  defaultValue?: string;
  type?: string;
};

function FieldGroup({ id, label, icon: Icon, placeholder, defaultValue, type = "text" }: FieldGroupProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden={true} />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="h-12 pl-9 text-base"
        />
      </div>
    </div>
  );
}

function Routes() {
  return (
    <section id="rutas" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Rutas destacadas</p>
          <h2 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
            Los destinos más buscados de la semana
          </h2>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          Ver todas las rutas
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ROUTES.map((r) => (
          <li key={r.from + r.to}>
            <article className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-card">
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{r.airline}</span>
                  <span>{r.dur}</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="font-display text-3xl tracking-tight">{r.from}</span>
                  <Plane className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="font-display text-3xl tracking-tight">{r.to}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.label}</p>
              </div>
              <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Desde</p>
                  <p className="font-display text-2xl tracking-tight">{r.price}</p>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  Reservar
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Features() {
  return (
    <section id="ventajas" className="border-y border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Por qué VuelosDk</p>
          <h2 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
            Vuelos sin sorpresas, reservas sin fricciones
          </h2>
        </div>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <li key={title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-foreground text-background">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-2xl tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="rounded-3xl border border-border bg-foreground px-6 py-14 text-center text-background sm:px-12">
        <h2 className="mx-auto max-w-2xl text-balance font-display text-4xl leading-tight tracking-tight sm:text-5xl">
          Tu próximo destino está a un clic de distancia.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-sm text-background/70 sm:text-base">
          Crea una cuenta y guarda tus rutas favoritas, recibe alertas de precio y reserva más rápido.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" variant="secondary" className="min-h-12">
            Crear cuenta gratis
          </Button>
          <Button size="lg" variant="outline" className="min-h-12 border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background">
            Iniciar sesión
          </Button>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer id="ayuda" className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-background">
              <Plane className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-display text-lg">VuelosDk</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Plataforma de reservas de vuelos con las mejores tarifas y una experiencia
            diseñada para viajeros.
          </p>
        </div>
        <FooterCol title="Empresa" links={["Sobre nosotros", "Prensa", "Trabaja con nosotros"]} />
        <FooterCol title="Soporte" links={["Centro de ayuda", "Contacto", "Términos y privacidad"]} />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} VuelosDk. Todos los derechos reservados.</p>
          <p>Hecho con cuidado para viajeros.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="font-display text-sm uppercase tracking-widest text-muted-foreground">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-foreground/80 transition-colors hover:text-foreground">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}