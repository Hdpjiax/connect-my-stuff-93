import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Plane, Search, Calendar, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VuelosDk — Vuelos con estilo, sin fricción" },
      {
        name: "description",
        content:
          "Comparador editorial de vuelos en México. Aeroméxico, Viva Aerobus, Volaris y más — precios claros, reserva en minutos.",
      },
    ],
  }),
  component: LandingPage,
});

const airlines = [
  "Aeroméxico",
  "Viva Aerobus",
  "Volaris",
  "American Airlines",
  "United",
  "Delta",
  "Iberia",
  "Copa",
];

const popularRoutes = [
  { from: "CDMX", to: "Cancún", code: "MEX → CUN", price: "1,890", duration: "2h 35m" },
  { from: "Monterrey", to: "Tijuana", code: "MTY → TIJ", price: "2,340", duration: "3h 40m" },
  { from: "Guadalajara", to: "Mérida", code: "GDL → MID", price: "2,120", duration: "2h 55m" },
];

function LandingPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <Hero />
      <AirlineStrip />
      <PopularRoutes />
      <Manifesto />
      <FooterCTA />
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
          <a href="#rutas" className="text-muted-foreground transition hover:text-foreground">Rutas</a>
          <a href="#manifiesto" className="text-muted-foreground transition hover:text-foreground">Manifiesto</a>
          <a href="#contacto" className="text-muted-foreground transition hover:text-foreground">Contacto</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden text-sm text-muted-foreground transition hover:text-foreground md:inline">
            Iniciar sesión
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90">
            Crear cuenta
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
        {/* Left: editorial copy */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
            Edición 2026 · México
          </div>
          <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            Vuelos
            <br />
            con estilo,
            <br />
            <span className="italic text-muted-foreground">sin fricción.</span>
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            Comparamos <span className="text-foreground">Aeroméxico</span>,{" "}
            <span className="text-foreground">Viva Aerobus</span> y{" "}
            <span className="text-foreground">Volaris</span> en tiempo real. Reservas en minutos, sin sorpresas, con la
            claridad de un diario editorial.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8 text-sm">
            <Stat value="120+" label="rutas nacionales" />
            <div className="h-8 w-px bg-border" />
            <Stat value="8" label="aerolíneas aliadas" />
            <div className="h-8 w-px bg-border" />
            <Stat value="98%" label="reservas sin fallo" />
          </div>
        </div>

        {/* Right: search card */}
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute -right-12 -top-12 hidden h-64 w-64 rounded-full bg-foreground/[0.03] blur-3xl lg:block" />
          <SearchCard />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-semibold tracking-tight">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function SearchCard() {
  return (
    <div className="relative w-full rounded-2xl border border-border bg-background p-2 shadow-[0_30px_80px_-40px_rgba(15,15,20,0.35)]">
      <div className="rounded-xl border border-border bg-muted/30 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex gap-1 rounded-full bg-background p-1 text-xs">
            <button className="rounded-full bg-foreground px-3 py-1 text-background">Redondo</button>
            <button className="rounded-full px-3 py-1 text-muted-foreground">Solo ida</button>
            <button className="rounded-full px-3 py-1 text-muted-foreground">Multi</button>
          </div>
          <span className="text-xs uppercase tracking-wider text-muted-foreground">MXN</span>
        </div>

        <div className="grid gap-3">
          <Field label="Origen" placeholder="Ciudad de México (MEX)" icon={<Plane className="h-4 w-4 -rotate-45" />} />
          <Field label="Destino" placeholder="Cancún (CUN)" icon={<Plane className="h-4 w-4 rotate-45" />} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Salida" placeholder="12 mar 2026" icon={<Calendar className="h-4 w-4" />} />
            <Field label="Regreso" placeholder="19 mar 2026" icon={<Calendar className="h-4 w-4" />} />
          </div>
          <Field label="Pasajeros" placeholder="1 adulto · Turista" icon={<Users className="h-4 w-4" />} />
        </div>

        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-3.5 text-sm font-medium text-background transition hover:opacity-90">
          <Search className="h-4 w-4" />
          Buscar vuelos
        </button>
      </div>

      <div className="flex items-center justify-between px-4 py-3 text-xs text-muted-foreground">
        <span>Precios reales en vivo</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Motor Amadeus activo
        </span>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  icon,
}: {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
}) {
  return (
    <label className="group block cursor-text rounded-lg border border-border bg-background px-4 py-3 transition focus-within:border-foreground">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-center gap-3">
        <span className="text-muted-foreground group-focus-within:text-foreground">{icon}</span>
        <input
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
          placeholder={placeholder}
        />
      </div>
    </label>
  );
}

function AirlineStrip() {
  const doubled = [...airlines, ...airlines];
  return (
    <section aria-label="Aerolíneas aliadas" className="overflow-hidden border-b border-border/60 bg-muted/40 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          Motor de comparación en vivo con
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-14 whitespace-nowrap">
            {doubled.map((a, i) => (
              <span key={i} className="font-display text-2xl font-medium tracking-tight text-foreground/70">
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PopularRoutes() {
  return (
    <section id="rutas" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">§ 01 — Rutas del mes</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Lo que la gente<br />está reservando.
            </h2>
          </div>
          <a href="#" className="hidden items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground md:inline-flex">
            Ver todas las rutas <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {popularRoutes.map((r) => (
            <article
              key={r.code}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background p-8 transition hover:border-foreground"
            >
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{r.code}</div>
                <div className="mt-4 font-display text-3xl font-semibold tracking-tight">
                  {r.from} <span className="text-muted-foreground">→</span> {r.to}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">Vuelo directo · {r.duration}</div>
              </div>
              <div className="mt-10 flex items-end justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">desde</div>
                  <div className="font-display text-2xl font-semibold">
                    $ {r.price} <span className="text-sm font-normal text-muted-foreground">MXN</span>
                  </div>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-full border border-border transition group-hover:bg-foreground group-hover:text-background">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-foreground/[0.02] transition group-hover:bg-foreground/[0.05]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  const items = [
    { n: "01", t: "Sin comisiones ocultas", d: "El precio que ves es el que pagas. Impuestos incluidos, siempre." },
    { n: "02", t: "Búsqueda en vivo", d: "Consultamos Amadeus en tiempo real: sin caché engañoso, sin ofertas fantasma." },
    { n: "03", t: "Reserva en minutos", d: "Un flujo diseñado para que emites tu boleto en menos tiempo del que tarda un café." },
  ];
  return (
    <section id="manifiesto" className="border-b border-border/60 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-background/50">§ 02 — Manifiesto</p>
        <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Un vuelo no debería sentirse como <span className="italic text-background/60">un trámite</span>.
        </h2>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.n} className="border-t border-background/15 pt-6">
              <div className="text-xs tracking-[0.18em] text-background/50">{it.n}</div>
              <h3 className="mt-2 font-display text-xl font-semibold">{it.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-background/70">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterCTA() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">§ 03 — Listo para volar</p>
        <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">
          Reserva tu próximo vuelo <span className="italic text-muted-foreground">hoy</span>.
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:opacity-90">
            Buscar vuelos ahora <ArrowUpRight className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition hover:border-foreground">
            Crear cuenta gratis
          </button>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer id="contacto" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background">
                <Plane className="h-4 w-4 -rotate-45" />
              </div>
              <span className="font-display text-lg font-semibold tracking-tight">VuelosDk</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Un comparador editorial de vuelos, hecho en México.
            </p>
          </div>
          <FooterCol title="Producto" items={["Buscar vuelos", "Rutas", "Ofertas", "Aerolíneas"]} />
          <FooterCol title="Compañía" items={["Manifiesto", "Prensa", "Contacto"]} />
          <FooterCol title="Legal" items={["Aviso legal", "Privacidad", "Términos", "Cookies"]} />
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} VuelosDk. Todos los derechos reservados.</span>
          <span>Hecho con cuidado editorial · CDMX</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{title}</div>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((it) => (
          <li key={it}>
            <a href="#" className="text-foreground/80 transition hover:text-foreground">
              {it}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
