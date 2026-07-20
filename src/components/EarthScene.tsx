import { useEffect, useRef, useState } from "react";
import earthMap from "@/assets/earth-map.jpg";

type Props = {
  size?: number;
  orbit?: number;
  className?: string;
};

export function EarthScene({ size = 320, orbit = 210, className = "" }: Props) {
  const [spin, setSpin] = useState(0); // background-position offset (px)
  const [tilt, setTilt] = useState(-8); // vertical tilt in deg
  const [dragging, setDragging] = useState(false);
  const auto = useRef(true);
  const last = useRef<{ x: number; y: number } | null>(null);

  // Auto-rotation loop (paused while dragging)
  useEffect(() => {
    let raf = 0;
    let prev = performance.now();
    const tick = (t: number) => {
      const dt = t - prev;
      prev = t;
      if (auto.current) setSpin((s) => s + dt * 0.02); // ~20px/s
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function onDown(e: React.PointerEvent) {
    (e.target as Element).setPointerCapture(e.pointerId);
    setDragging(true);
    auto.current = false;
    last.current = { x: e.clientX, y: e.clientY };
  }
  function onMove(e: React.PointerEvent) {
    if (!last.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setSpin((s) => s - dx * 2);
    setTilt((t) => Math.max(-45, Math.min(45, t - dy * 0.4)));
  }
  function onUp() {
    setDragging(false);
    last.current = null;
    // resume auto after a beat
    window.setTimeout(() => (auto.current = true), 1200);
  }

  return (
    <div className={`scene-3d relative select-none ${className}`}>
      <div className="stage-3d relative h-full w-full">
        {/* Contrail equator */}
        <div
          className="contrail-3d absolute left-1/2 top-1/2"
          style={{ width: orbit * 2, height: orbit * 2 }}
          aria-hidden
        />

        {/* Earth globe — draggable */}
        <div
          role="img"
          aria-label="Planeta Tierra interactivo. Arrastra para girarlo."
          tabIndex={0}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="earth-globe absolute left-1/2 top-1/2 outline-none ring-0 focus-visible:ring-2 focus-visible:ring-foreground/50"
          style={{
            width: size,
            height: size,
            backgroundImage: `url(${earthMap})`,
            backgroundPosition: `${-spin}px 50%`,
            transform: `translate3d(-50%, -50%, 0) rotateX(${tilt}deg)`,
            cursor: dragging ? "grabbing" : "grab",
            touchAction: "none",
          }}
        >
          <span className="earth-shade" />
          <span className="earth-atmosphere-3d" />
        </div>

        {/* Plane orbiting in 3D — passes behind and in front */}
        <div
          aria-hidden
          className="orbit-ring absolute left-1/2 top-1/2"
          style={{ ["--orbit-r" as string]: `${orbit}px` }}
        >
          <div className="orbit-plane">
            <PlaneMark />
          </div>
        </div>

        {/* Ground shadow */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[88%] h-6 w-2/3 -translate-x-1/2 rounded-full bg-foreground/25 blur-2xl"
        />
      </div>
    </div>
  );
}

function PlaneMark() {
  // Photorealistic top-down airliner
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-12 w-12 drop-shadow-[0_10px_16px_rgba(10,18,40,0.55)]"
      aria-hidden
    >
      <defs>
        {/* Fuselage cylindrical shading */}
        <linearGradient id="fuselage" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6a7183" />
          <stop offset="18%" stopColor="#c8cddb" />
          <stop offset="42%" stopColor="#ffffff" />
          <stop offset="58%" stopColor="#ffffff" />
          <stop offset="82%" stopColor="#b7bccb" />
          <stop offset="100%" stopColor="#5b6274" />
        </linearGradient>
        {/* Belly / underside darker band */}
        <linearGradient id="belly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f2a44" stopOpacity="0" />
          <stop offset="70%" stopColor="#1f2a44" stopOpacity="0" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.45" />
        </linearGradient>
        {/* Wing airfoil shading */}
        <linearGradient id="wing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eef1f7" />
          <stop offset="45%" stopColor="#c3c9d8" />
          <stop offset="100%" stopColor="#6a7285" />
        </linearGradient>
        <linearGradient id="wingBack" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#eef1f7" />
          <stop offset="45%" stopColor="#c3c9d8" />
          <stop offset="100%" stopColor="#6a7285" />
        </linearGradient>
        {/* Cockpit glass */}
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9ec1ff" />
          <stop offset="60%" stopColor="#2b3a63" />
          <stop offset="100%" stopColor="#0a1128" />
        </linearGradient>
        {/* Engine metallic */}
        <radialGradient id="engine" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#dfe4ee" />
          <stop offset="55%" stopColor="#5a6273" />
          <stop offset="100%" stopColor="#111827" />
        </radialGradient>
        {/* Body highlight streak */}
        <linearGradient id="hiLite" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="60" cy="112" rx="26" ry="3" fill="#0b1220" opacity="0.35" />

      {/* Rear stabilizers (behind fuselage) */}
      <path d="M60 96 L40 108 L46 110 L60 104 Z" fill="url(#wingBack)" stroke="#2a3244" strokeWidth="0.5" />
      <path d="M60 96 L80 108 L74 110 L60 104 Z" fill="url(#wingBack)" stroke="#2a3244" strokeWidth="0.5" />

      {/* Main wings */}
      <path
        d="M60 52 L8 74 L14 80 L60 66 Z"
        fill="url(#wing)"
        stroke="#2a3244"
        strokeWidth="0.6"
      />
      <path
        d="M60 52 L112 74 L106 80 L60 66 Z"
        fill="url(#wing)"
        stroke="#2a3244"
        strokeWidth="0.6"
      />
      {/* Wing highlights */}
      <path d="M18 74 L58 60 L58 62 L20 76 Z" fill="#ffffff" opacity="0.35" />
      <path d="M102 74 L62 60 L62 62 L100 76 Z" fill="#ffffff" opacity="0.35" />

      {/* Engines under wings */}
      <ellipse cx="34" cy="72" rx="4.5" ry="7" fill="url(#engine)" stroke="#0b1220" strokeWidth="0.5" />
      <ellipse cx="86" cy="72" rx="4.5" ry="7" fill="url(#engine)" stroke="#0b1220" strokeWidth="0.5" />
      <ellipse cx="34" cy="66" rx="2.6" ry="1.6" fill="#0b1220" />
      <ellipse cx="86" cy="66" rx="2.6" ry="1.6" fill="#0b1220" />

      {/* Fuselage */}
      <path
        d="M60 8
           C 66 8 69 14 70 24
           L 71 60
           L 71 88
           L 66 104
           L 60 112
           L 54 104
           L 49 88
           L 49 60
           L 50 24
           C 51 14 54 8 60 8 Z"
        fill="url(#fuselage)"
        stroke="#2a3244"
        strokeWidth="0.7"
      />
      {/* Belly shadow overlay */}
      <path
        d="M60 8
           C 66 8 69 14 70 24
           L 71 60 L 71 88 L 66 104 L 60 112 L 54 104 L 49 88 L 49 60 L 50 24
           C 51 14 54 8 60 8 Z"
        fill="url(#belly)"
      />
      {/* Long metallic highlight */}
      <path d="M58 14 L58 100 L62 100 L62 14 Z" fill="url(#hiLite)" opacity="0.55" />

      {/* Window row */}
      <g fill="#0b1a36" opacity="0.85">
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x="58.4" y={28 + i * 4} width="3.2" height="1.6" rx="0.6" />
        ))}
      </g>

      {/* Cockpit glass */}
      <path
        d="M60 9 C 64 9 66 13 66 18 L 54 18 C 54 13 56 9 60 9 Z"
        fill="url(#glass)"
        stroke="#0b1220"
        strokeWidth="0.5"
      />
      <path d="M57 12 L63 12" stroke="#9ec1ff" strokeWidth="0.5" opacity="0.7" />

      {/* Nose highlight */}
      <ellipse cx="60" cy="10" rx="2.2" ry="1" fill="#ffffff" opacity="0.7" />

      {/* Tail fin (vertical stabilizer seen from top) */}
      <path d="M58.5 100 L60 88 L61.5 100 Z" fill="#2a3244" />
    </svg>
  );
}

export default EarthScene;