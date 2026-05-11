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
  { name: "Next.js",    logo: "/logos/nextjs.svg",     position: [-4.5,  3.9,  0.2] },
  { name: "React",      logo: "/logos/react.svg",      position: [-1.5,  3.9, -0.3] },
  { name: "TypeScript", logo: "/logos/typescript.svg", position: [ 1.5,  3.9,  0.2] },
  { name: "Three.js",   logo: "/logos/threejs.svg",    position: [ 4.5,  3.9, -0.3] },
  // Row 2 (offset) — y=1.3
  { name: "JavaScript", logo: "/logos/javascript.svg", position: [-6.0,  1.3,  0.0] },
  { name: "Tailwind",   logo: "/logos/tailwind.svg",   position: [-3.0,  1.3,  0.3] },
  { name: "Python",     logo: "/logos/python.svg",     position: [ 0.0,  1.3, -0.3] },
  { name: "FastAPI",    logo: "/logos/fastapi.svg",    position: [ 3.0,  1.3,  0.3] },
  { name: "Node.js",    logo: "/logos/nodejs.svg",     position: [ 6.0,  1.3,  0.0] },
  // Row 3 — y=-1.3
  { name: "PostgreSQL", logo: "/logos/postgresql.svg", position: [-4.5, -1.3, -0.3] },
  { name: "Redis",      logo: "/logos/redis.svg",      position: [-1.5, -1.3,  0.2] },
  { name: "Docker",     logo: "/logos/docker.svg",     position: [ 1.5, -1.3, -0.3] },
  { name: "Nginx",      logo: "/logos/nginx.svg",      position: [ 4.5, -1.3,  0.2] },
  // Row 4 (offset) — y=-3.9
  { name: "Linux",      logo: "/logos/linux.svg",      position: [-3.0, -3.9,  0.0] },
  { name: "Git",        logo: "/logos/git.svg",        position: [ 0.0, -3.9,  0.3] },
  { name: "GitHub",     logo: "/logos/github.svg",     position: [ 3.0, -3.9,  0.0] },
];

const BALL_SIZE = 0.95;
const BALL_COLOR = "#1e293b";

function TechBall({ tech }: { tech: Tech }) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const logoTex = useTexture(tech.logo);

  useFrame((_, dt) => {
    if (!meshRef.current) return;
    const target = hovered ? 1.2 : 1.0;
    const current = meshRef.current.scale.x;
    const next = current + (target - current) * Math.min(1, dt * 8);
    meshRef.current.scale.setScalar(next);
    meshRef.current.rotation.y += dt * (hovered ? 0.8 : 0.15);
  });

  return (
    <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.4}>
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
          <sphereGeometry args={[BALL_SIZE, 48, 48]} />
          <meshStandardMaterial
            color={BALL_COLOR}
            roughness={0.4}
            metalness={0.5}
            emissive={hovered ? "#22d3ee" : "#000000"}
            emissiveIntensity={hovered ? 0.25 : 0}
          />
          <Decal
            position={[0, 0, BALL_SIZE]}
            rotation={[0, 0, 0]}
            scale={BALL_SIZE * 1.4}
          >
            <meshStandardMaterial
              map={logoTex}
              transparent
              polygonOffset
              polygonOffsetFactor={-5}
              roughness={0.5}
              metalness={0}
            />
          </Decal>
        </mesh>

        {hovered && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[BALL_SIZE * 1.35, 0.03, 16, 64]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

export default function SkillsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 13], fov: 55 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[8, 8, 8]} intensity={1.6} color="#ffffff" />
        <pointLight position={[-8, -8, -8]} intensity={1.0} color="#a78bfa" />
        <pointLight position={[0, 0, 5]} intensity={0.6} color="#22d3ee" />

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

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Suspense>
    </Canvas>
  );
}
