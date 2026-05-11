"use client";

// Premium ambient background:
//   1. Layered radial gradient mesh (cyan / violet / fuchsia "aurora")
//   2. Subtle grid that fades out toward the edges
//   3. Soft grain via an inline SVG turbulence noise

const NOISE_DATA_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")";

export default function BackgroundFx() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* base color */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* mesh gradient — aurora blobs */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(139,92,246,0.28), transparent 70%)",
            "radial-gradient(ellipse 50% 40% at 92% 30%, rgba(34,211,238,0.18), transparent 70%)",
            "radial-gradient(ellipse 40% 60% at 8% 75%, rgba(240,171,252,0.12), transparent 70%)",
            "radial-gradient(ellipse 80% 50% at 50% 110%, rgba(6,182,212,0.18), transparent 70%)",
          ].join(", "),
        }}
      />

      {/* grid pattern — masked so it fades at the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%, black 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%, black 0%, transparent 80%)",
        }}
      />

      {/* grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: NOISE_DATA_URL }}
      />

      {/* top vignette */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-950/60 to-transparent" />

      {/* bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/60 to-transparent" />
    </div>
  );
}
