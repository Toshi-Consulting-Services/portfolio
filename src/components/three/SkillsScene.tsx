"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Decal,
  Sparkles,
  Stars,
  useTexture,
} from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { Mesh } from "three";

type Tech = {
  name: string;
  logo: string;
  position: [number, number, number];
};

// 16 techs, honeycomb (4 / 5 / 4 / 3 rows)
const techs: Tech[] = [
  { name: "Next.js",    logo: "/logos/nextjs.svg",     position: [-4.5,  3.9, 0] },
  { name: "React",      logo: "/logos/react.svg",      position: [-1.5,  3.9, 0] },
  { name: "TypeScript", logo: "/logos/typescript.svg", position: [ 1.5,  3.9, 0] },
  { name: "Three.js",   logo: "/logos/threejs.svg",    position: [ 4.5,  3.9, 0] },
  { name: "JavaScript", logo: "/logos/javascript.svg", position: [-6.0,  1.3, 0] },
  { name: "Tailwind",   logo: "/logos/tailwind.svg",   position: [-3.0,  1.3, 0] },
  { name: "Python",     logo: "/logos/python.svg",     position: [ 0.0,  1.3, 0] },
  { name: "FastAPI",    logo: "/logos/fastapi.svg",    position: [ 3.0,  1.3, 0] },
  { name: "Node.js",    logo: "/logos/nodejs.svg",     position: [ 6.0,  1.3, 0] },
  { name: "PostgreSQL", logo: "/logos/postgresql.svg", position: [-4.5, -1.3, 0] },
  { name: "Redis",      logo: "/logos/redis.svg",      position: [-1.5, -1.3, 0] },
  { name: "Docker",     logo: "/logos/docker.svg",     position: [ 1.5, -1.3, 0] },
  { name: "Nginx",      logo: "/logos/nginx.svg",      position: [ 4.5, -1.3, 0] },
  { name: "Linux",      logo: "/logos/linux.svg",      position: [-3.0, -3.9, 0] },
  { name: "Git",        logo: "/logos/git.svg",        position: [ 0.0, -3.9, 0] },
  { name: "GitHub",     logo: "/logos/github.svg",     position: [ 3.0, -3.9, 0] },
];

const BALL_RADIUS = 1.0;
const BALL_COLOR = "#475569";

// Procedurally render a golf-ball dimple pattern to a canvas, used as bumpMap.
let _golfTex: THREE.CanvasTexture | null = null;
function getGolfBallBumpMap(): THREE.CanvasTexture | null {
  if (_golfTex) return _golfTex;
  if (typeof window === "undefined") return null;

  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // base mid-gray = "flat" surface in bumpMap terms
  ctx.fillStyle = "#888";
  ctx.fillRect(0, 0, size, size);

  // hex-packed dark circles = dimples
  const dimpleR = 16;
  const spacing = 42;
  const cols = Math.ceil(size / spacing) + 2;
  const rows = Math.ceil(size / spacing) + 2;
  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < cols; c++) {
      const offsetX = r % 2 === 0 ? 0 : spacing / 2;
      const x = c * spacing + offsetX;
      const y = r * spacing;
      const g = ctx.createRadialGradient(x, y, 0, x, y, dimpleR);
      g.addColorStop(0, "#222");
      g.addColorStop(0.65, "#666");
      g.addColorStop(1, "#888");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, dimpleR, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  _golfTex = new THREE.CanvasTexture(canvas);
  _golfTex.wrapS = THREE.RepeatWrapping;
  _golfTex.wrapT = THREE.RepeatWrapping;
  _golfTex.repeat.set(2, 2);
  _golfTex.anisotropy = 8;
  return _golfTex;
}

function TechBall({ tech }: { tech: Tech }) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const logoTex = useTexture(tech.logo);
  const golfTex = useMemo(() => getGolfBallBumpMap(), []);

  useFrame((_, dt) => {
    if (!meshRef.current) return;
    // scale only — NO rotation, ever
    const target = hovered ? 1.12 : 1.0;
    const cur = meshRef.current.scale.x;
    const next = cur + (target - cur) * Math.min(1, dt * 8);
    meshRef.current.scale.setScalar(next);
  });

  return (
    // tiny float for ambience, no rotation
    <Float speed={0.4} rotationIntensity={0} floatIntensity={0.15}>
      <group position={tech.position}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
        >
          <sphereGeometry args={[BALL_RADIUS, 64, 64]} />
          <meshStandardMaterial
            color={BALL_COLOR}
            bumpMap={golfTex ?? undefined}
            bumpScale={0.04}
            roughness={0.55}
            metalness={0.15}
            emissive={hovered ? "#22d3ee" : "#1e293b"}
            emissiveIntensity={hovered ? 0.4 : 0.15}
          />
          {/* The Decal renders a separate flat-shaded mesh on the front face,
              so the logo area looks smooth (no dimples) — exactly the
              "flat where the logo sits" effect. */}
          <Decal
            position={[0, 0, BALL_RADIUS]}
            rotation={[0, 0, 0]}
            scale={BALL_RADIUS * 1.5}
          >
            <meshStandardMaterial
              map={logoTex}
              transparent
              polygonOffset
              polygonOffsetFactor={-10}
              roughness={0.4}
              metalness={0}
              emissive="#ffffff"
              emissiveMap={logoTex}
              emissiveIntensity={0.4}
            />
          </Decal>
        </mesh>
      </group>
    </Float>
  );
}

export default function SkillsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 50 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[0, 0, 8]} intensity={1.4} color="#ffffff" />
        <pointLight position={[8, 8, 8]} intensity={1.3} color="#ffffff" />
        <pointLight position={[-8, -8, -8]} intensity={1.0} color="#a78bfa" />
        <pointLight position={[0, 4, 6]} intensity={0.8} color="#67e8f9" />

        <Stars
          radius={60}
          depth={40}
          count={2200}
          factor={2.5}
          saturation={0}
          fade
          speed={0.4}
        />
        <Sparkles
          count={60}
          scale={20}
          size={2}
          speed={0.25}
          color="#67e8f9"
          opacity={0.45}
        />

        {techs.map((t) => (
          <Suspense key={t.name} fallback={null}>
            <TechBall tech={t} />
          </Suspense>
        ))}

        {/* user-driven orbit only */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Suspense>
    </Canvas>
  );
}
