"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Stars, Text } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

type Ball = {
  label: string;
  color: string;
  position: [number, number, number];
  size?: number;
};

const balls: Ball[] = [
  { label: "Next.js", color: "#22d3ee", position: [-4, 1.6, 0], size: 0.95 },
  { label: "React", color: "#67e8f9", position: [-2.4, 2.4, -1], size: 0.85 },
  { label: "TypeScript", color: "#3b82f6", position: [-1, 1.2, 0.5], size: 1 },
  { label: "Three.js", color: "#a78bfa", position: [0.6, 2.4, -0.8], size: 0.9 },
  { label: "FastAPI", color: "#10b981", position: [2.2, 1.5, 0.3], size: 1 },
  { label: "PostgreSQL", color: "#0ea5e9", position: [3.8, 2, -0.5], size: 0.95 },
  { label: "Docker", color: "#0891b2", position: [-3.6, -0.4, 0.6], size: 0.85 },
  { label: "Llama 3.3", color: "#f0abfc", position: [-1.8, -0.6, -0.4], size: 0.95 },
  { label: "Groq", color: "#fbbf24", position: [-0.2, -1.4, 0.5], size: 0.8 },
  { label: "OpenAI", color: "#34d399", position: [1.4, -0.8, -0.6], size: 0.85 },
  { label: "Anthropic", color: "#fb7185", position: [2.8, -1.5, 0.4], size: 0.9 },
  { label: "Semgrep", color: "#a78bfa", position: [-3, -2, -0.3], size: 0.85 },
  { label: "Gitleaks", color: "#f97316", position: [-1, -2.4, 0.4], size: 0.85 },
  { label: "Nginx", color: "#84cc16", position: [1.4, -2.6, -0.4], size: 0.85 },
  { label: "Tailwind", color: "#06b6d4", position: [3.4, -0.3, 0.6], size: 0.85 },
];

function TechBall({ ball }: { ball: Ball }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.x += dt * 0.2;
      ref.current.rotation.y += dt * 0.3;
    }
  });
  const size = ball.size ?? 0.9;
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group position={ball.position}>
        <mesh ref={ref}>
          <icosahedronGeometry args={[size, 1]} />
          <meshStandardMaterial
            color={ball.color}
            emissive={ball.color}
            emissiveIntensity={0.35}
            roughness={0.4}
            metalness={0.5}
            wireframe={false}
          />
        </mesh>
        <Text
          position={[0, -size - 0.35, 0]}
          fontSize={0.22}
          color="#e2e8f0"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#0f172a"
        >
          {ball.label}
        </Text>
      </group>
    </Float>
  );
}

export default function SkillsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.4} color="#22d3ee" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#a78bfa" />
        <pointLight position={[0, 5, -3]} intensity={0.6} color="#f0abfc" />

        <Stars
          radius={40}
          depth={30}
          count={1500}
          factor={2}
          saturation={0}
          fade
          speed={0.5}
        />
        <Sparkles
          count={60}
          scale={12}
          size={2}
          speed={0.3}
          color="#67e8f9"
          opacity={0.6}
        />

        {balls.map((b) => (
          <TechBall key={b.label} ball={b} />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 2.6}
        />
      </Suspense>
    </Canvas>
  );
}
