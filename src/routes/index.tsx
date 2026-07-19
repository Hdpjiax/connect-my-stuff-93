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
    <section className="relative z-10 mx-auto max-w-7xl px-6 pt-4 pb-16 lg:pt-8">
      <div className="flex flex-col items-center text-center animate-rise">
        <span className="font-mono inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground shadow-3d">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-twinkle" />
          Bienvenido al aire · Motor 3D
        </span>
      </div>

      <PlaneStage />

      <div className="mx-auto mt-4 max-w-2xl text-center">
        <p className="font-serif text-2xl leading-snug text-muted-foreground sm:text-3xl">
          Un aeropuerto tridimensional. Rutas suspendidas, tarifas transparentes
          y las aerolíneas de México orbitando tu próximo destino.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        <SearchPanel />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
        <Stat value="2.4M" label="Rutas activas" />
        <span className="h-6 w-px bg-border" />
        <Stat value="180+" label="Aeropuertos" />
        <span className="h-6 w-px bg-border" />
        <Stat value="99.98%" label="Puntualidad" />
      </div>
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

function PlaneStage() {
  const airlines = [
    { name: "Aeroméxico", color: "oklch(0.55 0.04 250)", delay: "0s", dur: "34s", r: 360 },
    { name: "Viva Aerobus", color: "oklch(0.68 0.14 55)", delay: "-11s", dur: "34s", r: 360 },
    { name: "Volaris", color: "oklch(0.7 0.12 320)", delay: "-22s", dur: "34s", r: 360 },
  ];
  const chips = [
    { t: "MEX", s: "México", top: "8%", left: "6%", d: "0s" },
    { t: "CUN", s: "Cancún", top: "18%", right: "6%", d: "0.6s" },
    { t: "GDL", s: "Guadalajara", bottom: "22%", left: "4%", d: "1.2s" },
    { t: "MTY", s: "Monterrey", bottom: "12%", right: "8%", d: "1.8s" },
  ] as const;

  return (
    <div
      className="relative mx-auto mt-6 h-[560px] w-full max-w-[1100px] preserve-3d sm:h-[640px]"
      style={{ perspective: "1600px" }}
    >
      {/* Soft orbital rings */}
      <div
        aria-hidden
        className="absolute inset-x-10 top-1/2 aspect-[2/1] -translate-y-1/2 rounded-full border border-foreground/10"
        style={{ transform: "translateY(-50%) rotateX(72deg)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-20 top-1/2 aspect-[2/1] -translate-y-1/2 rounded-full border border-foreground/15"
        style={{ transform: "translateY(-50%) rotateX(72deg) rotateZ(20deg)" }}
      />

      {/* Giant 3D VUELOS DK title behind plane */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-6 flex justify-center preserve-3d"
        style={{ transform: "translateZ(-120px)" }}
      >
        <h1
          className="font-display font-extrabold uppercase leading-[0.82] tracking-[-0.06em] text-3d"
          style={{
            fontSize: "clamp(5rem, 16vw, 15rem)",
            transform: "perspective(1400px) rotateX(18deg) rotateY(-6deg)",
            background:
              "linear-gradient(180deg, oklch(0.42 0.03 250) 0%, oklch(0.72 0.045 165) 60%, oklch(0.9 0.02 60 / 0.4) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Vuelos
          <br />
          <span className="font-serif italic" style={{ letterSpacing: "-0.03em" }}>
            Dk
          </span>
        </h1>
      </div>

      {/* Airline orbit layer */}
      <div className="absolute left-1/2 top-1/2 h-0 w-0 preserve-3d" style={{ transform: "translate(-50%, -50%) rotateX(70deg)" }}>
        {airlines.map((a, i) => (
          <div
            key={a.name}
            className="absolute left-0 top-0 animate-orbit"
            style={{
              // @ts-expect-error custom css vars
              "--r": `${a.r}px`,
              "--dur": a.dur,
              animationDelay: a.delay,
            }}
          >
            <div
              className="glass -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-2"
              style={{ transform: "translate(-50%, -50%) rotateX(-70deg)" }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: a.color, boxShadow: `0 0 12px ${a.color}` }}
                />
                <span className="font-display text-sm font-bold">{a.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  · vuelo {i + 1}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Airport chips floating in 3D */}
      {chips.map((c) => (
        <FloatingChip key={c.t} chip={c} />
      ))}

      {/* Central giant plane */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d animate-plane-hover"
        style={{ width: "min(90%, 900px)" }}
      >
        <BigPlane />
      </div>

      {/* Ground shadow */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-[50%] blur-2xl"
        style={{ background: "oklch(0.24 0.015 250 / 0.28)" }}
      />
    </div>
  );
}

function BigPlane() {
  return (
    <svg
      viewBox="0 0 900 380"
      className="h-auto w-full drop-shadow-[0_40px_60px_oklch(0.24_0.015_250/0.25)]"
    >
      <defs>
        <linearGradient id="fuselage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.99 0.005 85)" />
          <stop offset="55%" stopColor="oklch(0.92 0.008 85)" />
          <stop offset="100%" stopColor="oklch(0.72 0.02 250)" />
        </linearGradient>
        <linearGradient id="wing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.86 0.02 165)" />
          <stop offset="100%" stopColor="oklch(0.55 0.04 250)" />
        </linearGradient>
        <linearGradient id="stripe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.72 0.045 165)" />
          <stop offset="100%" stopColor="oklch(0.55 0.04 250)" />
        </linearGradient>
        <radialGradient id="engine" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor="oklch(0.98 0.005 85)" />
          <stop offset="100%" stopColor="oklch(0.35 0.02 250)" />
        </radialGradient>
      </defs>

      {/* Contrail */}
      <g className="animate-contrail">
        <rect x="20" y="182" width="180" height="10" rx="5" fill="oklch(1 0 0 / 0.7)" />
        <rect x="60" y="196" width="120" height="6" rx="3" fill="oklch(1 0 0 / 0.4)" />
      </g>

      {/* Back wing */}
      <path d="M540 170 L720 90 L780 100 L640 200 Z" fill="url(#wing)" opacity="0.75" />
      {/* Tail */}
      <path d="M660 190 L780 60 L820 70 L740 200 Z" fill="url(#wing)" />
      <path d="M730 130 L800 80 L810 85 L760 140 Z" fill="oklch(0.42 0.03 250)" opacity="0.6" />

      {/* Fuselage */}
      <path
        d="M100 190 Q 220 150 480 155 L780 175 Q 820 190 780 205 L480 225 Q 220 230 100 190 Z"
        fill="url(#fuselage)"
        stroke="oklch(0.24 0.015 250 / 0.15)"
        strokeWidth="1"
      />

      {/* Cockpit windows */}
      <path d="M120 188 Q 140 178 175 178 L175 195 Q 145 195 120 192 Z" fill="oklch(0.35 0.03 250)" />
      {/* Passenger windows */}
      {Array.from({ length: 18 }).map((_, i) => (
        <circle
          key={i}
          cx={210 + i * 26}
          cy={188}
          r={3.2}
          fill="oklch(0.55 0.04 250)"
          opacity="0.85"
        />
      ))}

      {/* Stripe */}
      <path
        d="M110 205 Q 260 218 780 205 L780 213 Q 260 226 110 213 Z"
        fill="url(#stripe)"
        opacity="0.7"
      />

      {/* Front wing */}
      <path d="M360 210 L260 320 L420 315 L510 230 Z" fill="url(#wing)" />
      <path d="M360 210 L340 320 L420 315 Z" fill="oklch(0.42 0.03 250)" opacity="0.35" />

      {/* Engine */}
      <ellipse cx="360" cy="270" rx="42" ry="18" fill="url(#engine)" />
      <ellipse cx="345" cy="270" rx="10" ry="12" fill="oklch(0.15 0.015 250)" />

      {/* Nose highlight */}
      <path
        d="M100 190 Q 130 175 175 178 Q 140 190 175 202 Q 130 205 100 190 Z"
        fill="oklch(1 0 0 / 0.35)"
      />

      {/* Livery text */}
      <text
        x="360"
        y="192"
        fontFamily="Bricolage Grotesque, sans-serif"
        fontSize="20"
        fontWeight="800"
        fill="oklch(0.24 0.015 250)"
        letterSpacing="1"
      >
        VUELOS DK
      </text>
    </svg>
  );
}

function FloatingChip({
  chip,
}: {
  chip: {
    t: string;
    s: string;
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    d: string;
  };
}) {
  return (
    <div
      className="glass absolute rounded-2xl px-3 py-2 animate-float3d preserve-3d"
      style={{
        top: chip.top,
        bottom: chip.bottom,
        left: chip.left,
        right: chip.right,
        animationDelay: chip.d,
        transform: "translateZ(40px)",
      }}
    >
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {chip.s}
      </div>
      <div className="font-display text-lg font-bold">{chip.t}</div>
    </div>
  );
}

function _UnusedGlobe3D() {
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
