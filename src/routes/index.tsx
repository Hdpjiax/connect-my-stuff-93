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
    <main className="relative min-h-screen scene-3d overflow-hidden">
      {/* 3D floor grid receding into horizon */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[70vh] origin-top grid-floor animate-floor"
        style={{
          transform: "perspective(900px) rotateX(62deg)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
        }}
      />
      {/* Subtle floating orbs */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-[8%] top-[18%] z-0 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "oklch(0.85 0.03 165 / 0.5)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed right-[6%] top-[35%] z-0 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "oklch(0.88 0.02 250 / 0.45)" }}
      />

      <Nav />
      <Hero />
      <RouteDeck />
      <Experience3D />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <a
        href="/"
        className="flex items-center gap-3 font-display text-xl font-bold tracking-tight"
        style={{ transform: "translateZ(20px)" }}
      >
        <span
          className="grid h-10 w-10 place-items-center rounded-2xl shadow-3d"
          style={{
            background:
              "linear-gradient(145deg, oklch(0.98 0.006 85), oklch(0.86 0.02 165))",
            transform: "perspective(400px) rotateX(20deg) rotateY(-20deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-foreground" fill="currentColor">
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
          </svg>
        </span>
        Vuelos<span className="text-gradient">Dk</span>
      </a>
      <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
        <a href="#" className="hover:text-foreground transition">Rutas</a>
        <a href="#" className="hover:text-foreground transition">Ofertas</a>
        <a href="#" className="hover:text-foreground transition">Experiencia 3D</a>
        <a href="#" className="hover:text-foreground transition">Ayuda</a>
      </nav>
      <button className="glass rounded-full px-5 py-2 text-sm font-medium transition hover:-translate-y-0.5">
        Iniciar sesión
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pt-8 pb-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-16">
      <div className="animate-rise">
        <span className="font-mono inline-flex items-center gap-2 rounded-full border border-border bg-white/50 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground shadow-3d">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-twinkle" />
          Motor 3D · v3.0
        </span>
        <h1
          className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-[7.5rem] preserve-3d"
          style={{
            transform: "perspective(1200px) rotateX(6deg) rotateY(-4deg)",
            textShadow:
              "0 2px 0 oklch(0.24 0.015 250 / 0.06), 0 12px 30px oklch(0.24 0.015 250 / 0.12)",
          }}
        >
          Vuela
          <br />
          <span className="text-gradient">en 3D.</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground">
          VuelosDk es un universo tridimensional donde cada ruta, tarifa y
          horario cobra volumen. Explora el planeta con paletas suaves y
          profundidad real antes de reservar.
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
      className="glass mt-10 rounded-3xl p-2 preserve-3d animate-tilt-hover"
      style={{ transformOrigin: "center top" }}
    >
      <div className="grid gap-2 rounded-2xl bg-white/40 p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
        <Field label="Desde" value="Madrid · MAD" />
        <Field label="Hacia" value="Tokio · NRT" />
        <Field label="Fecha" value="14 Ago 2026" />
        <button
          className="mt-2 h-12 rounded-xl px-6 font-semibold text-primary-foreground shadow-3d transition hover:-translate-y-1 hover:brightness-105 md:mt-0"
          style={{ background: "var(--gradient-primary)", transform: "translateZ(30px)" }}
        >
          Buscar →
        </button>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block cursor-text rounded-xl px-4 py-3 transition hover:bg-white/60 hover:shadow-3d">
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
      className="relative mx-auto aspect-square w-full max-w-[520px] preserve-3d"
      style={{ perspective: "1400px" }}
    >
      {/* Orbital ring */}
      <div
        className="absolute inset-8 rounded-full border-2 border-accent/40 animate-globe"
        style={{ transform: "rotateX(72deg) rotateZ(20deg)" }}
      />
      <div
        className="absolute inset-4 rounded-full border border-primary/25"
        style={{ transform: "rotateX(68deg) rotateZ(-30deg)", animation: "globe-spin 60s linear infinite reverse" }}
      />
      <div
        className="absolute inset-0 rounded-full border border-foreground/10"
        style={{ transform: "rotateX(78deg) rotateZ(50deg)" }}
      />

      {/* Globe */}
      <div
        className="absolute inset-12 rounded-full animate-globe"
        style={{
          transformStyle: "preserve-3d",
          background:
            "radial-gradient(circle at 30% 28%, oklch(0.96 0.01 85), oklch(0.82 0.03 165) 55%, oklch(0.55 0.03 250) 100%)",
          boxShadow:
            "inset -30px -50px 90px oklch(0.4 0.02 250 / 0.35), inset 30px 30px 70px oklch(1 0 0 / 0.6), 0 40px 100px -20px oklch(0.24 0.015 250 / 0.35)",
        }}
      >
        {/* Meridians */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-50">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx={100 - i * 12}
              ry="95"
              fill="none"
              stroke="oklch(0.42 0.03 250 / 0.4)"
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
              stroke="oklch(0.42 0.03 250 / 0.3)"
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
            <stop offset="0%" stopColor="oklch(0.72 0.045 165)" />
            <stop offset="100%" stopColor="oklch(0.55 0.04 250)" />
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
        <circle cx="80" cy="340" r="6" fill="oklch(0.72 0.045 165)" />
        <circle cx="440" cy="200" r="6" fill="oklch(0.55 0.04 250)" />

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
            stroke="oklch(0.24 0.015 250)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle r="10" fill="oklch(0.72 0.045 165 / 0.35)" />
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
      className="glass group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-3 hover:rotate-0 animate-rise preserve-3d"
      style={{
        transform: `rotateY(${tilt}deg) rotateX(${index % 2 === 0 ? 6 : -4}deg) translateZ(${index * 6}px)`,
        transformStyle: "preserve-3d",
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-50 blur-3xl transition-opacity group-hover:opacity-90"
        style={{ background: "var(--gradient-primary)" }}
      />

      <div className="flex items-center justify-between" style={{ transform: "translateZ(20px)" }}>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {route.dur}
        </div>
        <div className="font-display text-2xl font-bold text-gradient">{route.price}</div>
      </div>

      <div className="mt-6 flex items-center gap-3" style={{ transform: "translateZ(30px)" }}>
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

      <button
        className="mt-6 w-full rounded-xl border border-border bg-white/50 py-2.5 text-sm font-medium transition group-hover:border-primary/60 group-hover:bg-white/80 group-hover:shadow-3d"
        style={{ transform: "translateZ(15px)" }}
      >
        Reservar vuelo
      </button>
    </article>
  );
}

function Experience3D() {
  const items = [
    { t: "Cabina", d: "Vista previa 3D del asiento antes de reservar." },
    { t: "Ruta", d: "Trayectorias esféricas con altitud y clima real." },
    { t: "Tarifa", d: "Capas transparentes: base, tasas y equipaje." },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32">
      <div className="mb-10">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          // experiencia
        </div>
        <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
          Tres dimensiones, <span className="text-gradient">cero fricción</span>
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3" style={{ perspective: "1600px" }}>
        {items.map((it, i) => (
          <div
            key={it.t}
            className="glass rounded-3xl p-8 preserve-3d animate-rise"
            style={{
              transform: `rotateX(${i === 1 ? 0 : i === 0 ? 8 : -8}deg) rotateY(${i === 1 ? 0 : i === 0 ? -6 : 6}deg)`,
              animationDelay: `${i * 0.12}s`,
            }}
          >
            <div
              className="mb-6 grid h-14 w-14 place-items-center rounded-2xl shadow-3d"
              style={{
                background: "linear-gradient(145deg, oklch(0.98 0.006 85), oklch(0.86 0.03 165))",
                transform: "translateZ(30px)",
              }}
            >
              <span className="font-display text-lg font-bold">0{i + 1}</span>
            </div>
            <h3 className="font-display text-2xl font-bold" style={{ transform: "translateZ(20px)" }}>
              {it.t}
            </h3>
            <p className="mt-3 text-muted-foreground" style={{ transform: "translateZ(10px)" }}>
              {it.d}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
        <div className="font-mono text-xs uppercase tracking-widest">
          © 2026 VuelosDk — 40.4168°N, 3.7038°W
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
