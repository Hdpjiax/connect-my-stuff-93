import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

const ROUTES = [
  { from: "MAD", to: "NRT", price: "€742", label: "Madrid → Tokio", dur: "14h 20m" },
  { from: "BCN", to: "JFK", price: "€389", label: "Barcelona → Nueva York", dur: "8h 55m" },
  { from: "LIM", to: "CDG", price: "€612", label: "Lima → París", dur: "12h 40m" },
  { from: "MEX", to: "DXB", price: "€890", label: "México → Dubái", dur: "16h 10m" },
];

function Index() {
  return (
    <main className="relative min-h-screen scene-3d">
      {/* Twinkling stars overlay */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-[2px] w-[2px] rounded-full bg-foreground animate-twinkle"
            style={{
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              animationDelay: `${(i % 7) * 0.4}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      <Nav />
      <Hero />
      <RouteDeck />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <a href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="currentColor">
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
          </svg>
        </span>
        Vuelos<span className="text-gradient">Pro</span>
      </a>
      <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
        <a href="#" className="hover:text-foreground transition">Rutas</a>
        <a href="#" className="hover:text-foreground transition">Ofertas</a>
        <a href="#" className="hover:text-foreground transition">Experiencia</a>
        <a href="#" className="hover:text-foreground transition">Ayuda</a>
      </nav>
      <button className="glass rounded-full px-5 py-2 text-sm font-medium transition hover:bg-white/10">
        Iniciar sesión
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pt-8 pb-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-16">
      <div className="animate-rise">
        <span className="font-mono inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-twinkle" />
          Motor de vuelos · v3.0
        </span>
        <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
          Vuela en
          <br />
          <span className="text-gradient">otra dimensión</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground">
          Explora el planeta como nunca antes. Rutas en tiempo real, tarifas
          transparentes y una experiencia inmersiva 3D que te lleva a bordo
          antes de reservar.
        </p>

        <SearchPanel />

        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <Stat value="2.4M" label="Rutas activas" />
          <span className="h-6 w-px bg-border" />
          <Stat value="180+" label="Aeropuertos" />
          <span className="h-6 w-px bg-border" />
          <Stat value="99.98%" label="Uptime" />
        </div>
      </div>

      <Globe3D />
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-foreground">{value}</div>
      <div className="font-mono text-[11px] uppercase tracking-widest">{label}</div>
    </div>
  );
}

function SearchPanel() {
  return (
    <div
      className="glass mt-10 rounded-3xl p-2 shadow-glow"
      style={{ transform: "perspective(1400px) rotateX(6deg)", transformStyle: "preserve-3d" }}
    >
      <div className="grid gap-2 rounded-2xl bg-black/20 p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
        <Field label="Desde" value="Madrid · MAD" />
        <Field label="Hacia" value="Tokio · NRT" />
        <Field label="Fecha" value="14 Ago 2026" />
        <button className="mt-2 h-12 rounded-xl bg-gradient-to-r from-primary to-accent px-6 font-semibold text-primary-foreground shadow-glow transition hover:brightness-110 md:mt-0">
          Buscar →
        </button>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block cursor-text rounded-xl px-4 py-3 transition hover:bg-white/5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-base font-medium text-foreground">{value}</div>
    </label>
  );
}

function Globe3D() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[520px]"
      style={{ perspective: "1400px" }}
    >
      {/* Orbital ring */}
      <div
        className="absolute inset-8 rounded-full border border-primary/30"
        style={{ transform: "rotateX(72deg) rotateZ(20deg)" }}
      />
      <div
        className="absolute inset-4 rounded-full border border-accent/20"
        style={{ transform: "rotateX(68deg) rotateZ(-30deg)" }}
      />

      {/* Globe */}
      <div
        className="absolute inset-12 rounded-full shadow-glow animate-globe"
        style={{
          transformStyle: "preserve-3d",
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.55 0.15 240), oklch(0.2 0.08 275) 60%, oklch(0.12 0.04 275))",
          boxShadow:
            "inset -30px -40px 80px oklch(0.08 0.04 275), inset 20px 20px 60px oklch(0.72 0.19 320 / 0.3), 0 30px 100px oklch(0.72 0.19 320 / 0.4)",
        }}
      >
        {/* Meridians */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-40">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx={100 - i * 12}
              ry="95"
              fill="none"
              stroke="oklch(0.82 0.18 85 / 0.4)"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={30 + i * 25}
              x2="200"
              y2={30 + i * 25}
              stroke="oklch(0.82 0.18 85 / 0.3)"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* Flight path SVG overlay */}
      <svg
        viewBox="0 0 520 520"
        className="absolute inset-0 h-full w-full"
        style={{ transform: "rotateX(15deg) rotateY(-8deg)", transformStyle: "preserve-3d" }}
      >
        <defs>
          <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.82 0.18 85)" />
            <stop offset="100%" stopColor="oklch(0.72 0.19 320)" />
          </linearGradient>
        </defs>
        <path
          id="fp"
          d="M 80 340 Q 260 40 440 200"
          fill="none"
          stroke="url(#pg)"
          strokeWidth="2"
          className="animate-dash"
        />
        <circle cx="80" cy="340" r="6" fill="oklch(0.82 0.18 85)" />
        <circle cx="440" cy="200" r="6" fill="oklch(0.72 0.19 320)" />

        {/* Plane traveling along path */}
        <g
          style={{
            offsetPath: "path('M 80 340 Q 260 40 440 200')",
            offsetRotate: "auto",
            animation: "plane-path 6s ease-in-out infinite",
          }}
        >
          <path
            d="M -8 0 L 8 0 M 0 -4 L 0 4"
            stroke="oklch(0.97 0.01 250)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle r="10" fill="oklch(0.82 0.18 85 / 0.3)" />
        </g>
      </svg>

      {/* Floating labels */}
      <FloatingBadge className="left-2 top-16" city="MAD" temp="+22°" delay="0s" />
      <FloatingBadge className="right-4 bottom-24" city="NRT" temp="+18°" delay="1.5s" />
    </div>
  );
}

function FloatingBadge({
  className,
  city,
  temp,
  delay,
}: {
  className?: string;
  city: string;
  temp: string;
  delay: string;
}) {
  return (
    <div
      className={`glass absolute rounded-2xl px-3 py-2 shadow-glow animate-float3d ${className ?? ""}`}
      style={{ animationDelay: delay }}
    >
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {city}
      </div>
      <div className="font-display text-lg font-bold">{temp}</div>
    </div>
  );
}

function RouteDeck() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // rutas destacadas
          </div>
          <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            El planeta, en <span className="text-gradient">tres capas</span>
          </h2>
        </div>
        <a href="#" className="hidden text-sm text-muted-foreground hover:text-foreground md:block">
          Ver todo →
        </a>
      </div>

      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        style={{ perspective: "1800px" }}
      >
        {ROUTES.map((r, i) => (
          <RouteCard key={r.from + r.to} route={r} index={i} />
        ))}
      </div>
    </section>
  );
}

function RouteCard({
  route,
  index,
}: {
  route: (typeof ROUTES)[number];
  index: number;
}) {
  const tilt = [-4, 3, -2, 5][index % 4];
  return (
    <article
      className="glass group relative overflow-hidden rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-2 animate-rise"
      style={{
        transform: `rotateY(${tilt}deg) rotateX(${index % 2 === 0 ? 4 : -3}deg)`,
        transformStyle: "preserve-3d",
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-70"
        style={{ background: "var(--gradient-primary)" }}
      />

      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {route.dur}
        </div>
        <div className="font-display text-2xl font-bold text-gradient">{route.price}</div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className="font-display text-3xl font-extrabold">{route.from}</span>
        <svg viewBox="0 0 40 12" className="h-3 flex-1 text-primary/60">
          <path
            d="M0 6 H36 M30 1 L36 6 L30 11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <span className="font-display text-3xl font-extrabold">{route.to}</span>
      </div>

      <div className="mt-2 text-sm text-muted-foreground">{route.label}</div>

      <button className="mt-6 w-full rounded-xl border border-border bg-white/5 py-2.5 text-sm font-medium transition group-hover:border-primary/60 group-hover:bg-primary/10">
        Reservar vuelo
      </button>
    </article>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
        <div className="font-mono text-xs uppercase tracking-widest">
          © 2026 Vuelos Pro — Coordenadas 40.4168°N, 3.7038°W
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Privacidad</a>
          <a href="#" className="hover:text-foreground">Términos</a>
          <a href="#" className="hover:text-foreground">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
