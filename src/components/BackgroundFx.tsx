"use client";

// Premium ambient background:
//   1. Soft base gradient (not pure black — vertical wash of dark indigo)
//   2. Diffuse aurora mesh blobs (large + low-contrast for a misty feel)
//   3. Subtle grid that fades out toward the edges
//   4. Faint grain via inline SVG turbulence noise
//   5. Global haze (very light blue-white tint) to lift the shadows
//   6. Top + bottom vignettes for framing

const NOISE_DATA_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")";

export default function BackgroundFx() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* base: vertical gradient instead of pure black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a1124 0%, #060b1c 30%, #050917 60%, #070c1d 100%)",
        }}
      />

      {/* aurora: large diffuse blobs (no hard edges) */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 100% 70% at 50% -15%, rgba(139,92,246,0.32), transparent 75%)",
            "radial-gradient(ellipse 75% 60% at 95% 35%, rgba(34,211,238,0.20), transparent 75%)",
            "radial-gradient(ellipse 70% 80% at 5% 70%, rgba(240,171,252,0.16), transparent 75%)",
            "radial-gradient(ellipse 110% 70% at 50% 115%, rgba(6,182,212,0.22), transparent 75%)",
          ].join(", "),
          filter: "blur(20px)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(99,102,241,0.05), transparent 70%)",
        }}
      />

      {/* grid pattern: fades softly to the edges */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%, black 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%, black 0%, transparent 80%)",
        }}
      />

      {/* grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: NOISE_DATA_URL }}
      />

      {/* soft top + bottom vignette so sections fade into each other */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-slate-950/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-950/40 to-transparent" />
    </div>
  );
}
