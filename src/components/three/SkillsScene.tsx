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
import { Suspense, useRef, useState } from "react";
import type { Mesh } from "three";

type Tech = {
  name: string;
  logo: string;
  position: [number, number, number];
};

// 16 techs arranged in honeycomb (4 / 5 / 4 / 3 rows)
const techs: Tech[] = [
  // Row 1 — y=3.9
  { name: "Next.js",    logo: "/logos/nextjs.svg",     position: [-4.5,  3.9,  0  ] },
  { name: "React",      logo: "/logos/react.svg",      position: [-1.5,  3.9,  0  ] },
  { name: "TypeScript", logo: "/logos/typescript.svg", position: [ 1.5,  3.9,  0  ] },
  { name: "Three.js",   logo: "/logos/threejs.svg",    position: [ 4.5,  3.9,  0  ] },
  // Row 2 (offset) — y=1.3
  { name: "JavaScript", logo: "/logos/javascript.svg", position: [-6.0,  1.3,  0  ] },
  { name: "Tailwind",   logo: "/logos/tailwind.svg",   position: [-3.0,  1.3,  0  ] },
  { name: "Python",     logo: "/logos/python.svg",     position: [ 0.0,  1.3,  0  ] },
  { name: "FastAPI",    logo: "/logos/fastapi.svg",    position: [ 3.0,  1.3,  0  ] },
  { name: "Node.js",    logo: "/logos/nodejs.svg",     position: [ 6.0,  1.3,  0  ] },
  // Row 3 — y=-1.3
  { name: "PostgreSQL", logo: "/logos/postgresql.svg", position: [-4.5, -1.3,  0  ] },
  { name: "Redis",      logo: "/logos/redis.svg",      position: [-1.5, -1.3,  0  ] },
  { name: "Docker",     logo: "/logos/docker.svg",     position: [ 1.5, -1.3,  0  ] },
  { name: "Nginx",      logo: "/logos/nginx.svg",      position: [ 4.5, -1.3,  0  ] },
  // Row 4 (offset) — y=-3.9
  { name: "Linux",      logo: "/logos/linux.svg",      position: [-3.0, -3.9,  0  ] },
  { name: "Git",        logo: "/logos/git.svg",        position: [ 0.0, -3.9,  0  ] },
  { name: "GitHub",     logo: "/logos/github.svg",     position: [ 3.0, -3.9,  0  ] },
];

const HEX_RADIUS = 1.05;
const HEX_DEPTH = 0.4;
const BALL_COLOR = "#475569"; // slate-600

function TechHex({ tech }: { tech: Tech }) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const logoTex = useTexture(tech.logo);

  useFrame((_, dt) => {
    if (!meshRef.current) return;
    // smooth scale on hover
    const targetScale = hovered ? 1.15 : 1.0;
    const cur = meshRef.current.scale.x;
    const next = cur + (targetScale - cur) * Math.min(1, dt * 8);
    meshRef.current.scale.setScalar(next);

    // ONLY rotate when hovered. When not hovered, smoothly return to 0.
    if (hovered) {
      meshRef.current.rotation.y += dt * 1.6;
    } else {
      meshRef.current.rotation.y *= 1 - Math.min(1, dt * 5);
    }
  });

  return (
    // gentle bob, no auto-rotation
    <Float speed={0.5} rotationIntensity={0} floatIntensity={0.18}>
      {/* parent group rotates the hex so its flat face points at the camera */}
      <group position={tech.position} rotation={[Math.PI / 2, 0, 0]}>
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
          <cylinderGeometry
            args={[HEX_RADIUS, HEX_RADIUS, HEX_DEPTH, 6]}
          />
          <meshStandardMaterial
            color={BALL_COLOR}
            roughness={0.5}
            metalness={0.2}
            emissive={hovered ? "#22d3ee" : "#1e293b"}
            emissiveIntensity={hovered ? 0.45 : 0.18}
          />
          {/* Decal projects onto the +Y cap of the cylinder (front face after parent rotation) */}
          <Decal
            position={[0, HEX_DEPTH / 2 + 0.005, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={HEX_RADIUS * 1.45}
          >
            <meshStandardMaterial
              map={logoTex}
              transparent
              polygonOffset
              polygonOffsetFactor={-10}
              roughness={0.5}
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
        <ambientLight intensity={1.0} />
        <directionalLight position={[0, 0, 8]} intensity={1.5} color="#ffffff" />
        <pointLight position={[8, 8, 8]} intensity={1.4} color="#ffffff" />
        <pointLight position={[-8, -8, -8]} intensity={1.0} color="#a78bfa" />
        <pointLight position={[0, 4, 6]} intensity={0.9} color="#67e8f9" />

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
            <TechHex tech={t} />
          </Suspense>
        ))}

        {/* user-driven orbit only — no auto-rotation */}
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
