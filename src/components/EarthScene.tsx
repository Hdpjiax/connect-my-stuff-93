import { Plane } from "lucide-react";
import earthMap from "@/assets/earth-map.jpg";

type Props = {
  size?: number;
  orbit?: number;
  className?: string;
};

export function EarthScene({ size = 320, orbit = 210, className = "" }: Props) {
  return (
    <div className={`scene-3d relative ${className}`} aria-hidden>
      <div className="stage-3d relative h-full w-full">
        {/* Contrail equator */}
        <div
          className="contrail-3d absolute left-1/2 top-1/2"
          style={{ width: orbit * 2, height: orbit * 2 }}
        />

        {/* Earth globe */}
        <div
          className="earth-globe absolute left-1/2 top-1/2"
          style={{
            width: size,
            height: size,
            backgroundImage: `url(${earthMap})`,
          }}
        >
          <span className="earth-shade" />
          <span className="earth-atmosphere-3d" />
        </div>

        {/* Plane orbiting in 3D — passes behind and in front */}
        <div
          className="orbit-ring absolute left-1/2 top-1/2"
          style={{ ["--orbit-r" as string]: `${orbit}px` }}
        >
          <div className="orbit-plane">
            <Plane className="h-6 w-6 text-foreground drop-shadow-md" />
          </div>
        </div>

        {/* Ground shadow */}
        <div className="absolute left-1/2 top-[88%] h-6 w-2/3 -translate-x-1/2 rounded-full bg-foreground/25 blur-2xl" />
      </div>
    </div>
  );
}

export default EarthScene;