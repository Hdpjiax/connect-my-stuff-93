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
  // Detailed top-down airliner silhouette
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-9 w-9 drop-shadow-[0_6px_10px_rgba(15,20,35,0.45)]"
      aria-hidden
    >
      <defs>
        <linearGradient id="planeBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.98 0 0)" />
          <stop offset="55%" stopColor="oklch(0.86 0.005 250)" />
          <stop offset="100%" stopColor="oklch(0.62 0.01 250)" />
        </linearGradient>
        <linearGradient id="planeWing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.92 0.005 250)" />
          <stop offset="100%" stopColor="oklch(0.55 0.02 250)" />
        </linearGradient>
      </defs>
      {/* Fuselage */}
      <path
        d="M32 3 C34.4 3 36 6 36.4 12 L37 30 L37 44 L34 58 L32 62 L30 58 L27 44 L27 30 L27.6 12 C28 6 29.6 3 32 3 Z"
        fill="url(#planeBody)"
        stroke="oklch(0.25 0.01 250)"
        strokeWidth="0.6"
      />
      {/* Main wings */}
      <path
        d="M4 34 L27 28 L27 36 L6 42 Z"
        fill="url(#planeWing)"
        stroke="oklch(0.25 0.01 250)"
        strokeWidth="0.6"
      />
      <path
        d="M60 34 L37 28 L37 36 L58 42 Z"
        fill="url(#planeWing)"
        stroke="oklch(0.25 0.01 250)"
        strokeWidth="0.6"
      />
      {/* Tail wings */}
      <path
        d="M20 52 L27 47 L27 52 L22 56 Z"
        fill="url(#planeWing)"
        stroke="oklch(0.25 0.01 250)"
        strokeWidth="0.5"
      />
      <path
        d="M44 52 L37 47 L37 52 L42 56 Z"
        fill="url(#planeWing)"
        stroke="oklch(0.25 0.01 250)"
        strokeWidth="0.5"
      />
      {/* Cockpit window */}
      <path
        d="M32 6 C33.4 6 34 8 34 10 L30 10 C30 8 30.6 6 32 6 Z"
        fill="oklch(0.35 0.03 240)"
        opacity="0.85"
      />
      {/* Engine nacelles */}
      <ellipse cx="18" cy="36" rx="2" ry="3.4" fill="oklch(0.3 0.01 250)" />
      <ellipse cx="46" cy="36" rx="2" ry="3.4" fill="oklch(0.3 0.01 250)" />
    </svg>
  );
}

export default EarthScene;