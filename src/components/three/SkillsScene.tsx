"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { Mesh } from "three";

type Ball = {
  label: string;
  color: string;
  position: [number, number, number];
  size?: number;
};

// 10 balls, generously spread out
const balls: Ball[] = [
  { label: "Next.js",     color: "#22d3ee", position: [-6,  2.6,  0  ], size: 1.0 },
  { label: "React",       color: "#67e8f9", position: [-2.8, 3.2, -1.6], size: 0.9 },
  { label: "TypeScript",  color: "#3b82f6", position: [ 0.5, 2.8,  1.5], size: 1.0 },
  { label: "Three.js",    color: "#a78bfa", position: [ 3.8, 3.2, -1.0], size: 0.9 },
  { label: "FastAPI",     color: "#10b981", position: [ 6.0, 1.6,  1.4], size: 1.0 },
  { label: "PostgreSQL",  color: "#0ea5e9", position: [-5.0,-0.5,  1.6], size: 0.95 },
  { label: "Docker",      color: "#0891b2", position: [-1.6,-1.4, -1.6], size: 0.85 },
  { label: "Llama 3.3",   color: "#f0abfc", position: [ 1.6,-1.8,  0.6], size: 0.95 },
  { label: "Groq",        color: "#fbbf24", position: [ 4.6,-1.2, -1.4], size: 0.85 },
  { label: "Semgrep",     color: "#fb7185", position: [-3.0,-3.0,  1.2], size: 0.9 },
];

function makeLabelTexture(label: string): THREE.CanvasTexture {
  const W = 1024;
  const H = 512;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // black background so emissiveMap = no glow except where text is
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, W, H);

  // auto-fit font size so long words don't overflow half-canvas (~460px usable)
  let fontSize = 150;
  ctx.font = `bold ${fontSize}px system-ui, -apple-system, "Segoe UI", sans-serif`;
  while (ctx.measureText(label).width > 460 && fontSize > 40) {
    fontSize -= 6;
    ctx.font = `bold ${fontSize}px system-ui, -apple-system, "Segoe UI", sans-serif`;
  }

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // render at u=0.25 and u=0.75 so the label is visible from front + back of sphere
  ctx.fillText(label, W * 0.25, H * 0.5);
  ctx.fillText(label, W * 0.75, H * 0.5);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function TechBall({ ball }: { ball: Ball }) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const size = ball.size ?? 0.9;

  // labels are baked once per ball
  const labelTexture = useMemo(() => makeLabelTexture(ball.label), [ball.label]);

  useFrame((_, dt) => {
    if (!meshRef.current) return;
    const target = hovered ? 1.25 : 1.0;
    const current = meshRef.current.scale.x;
    const next = current + (target - current) * Math.min(1, dt * 8);
    meshRef.current.scale.setScalar(next);
    meshRef.current.rotation.y += dt * (hovered ? 1.2 : 0.25);
  });

  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={ball.position}>
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
          <sphereGeometry args={[size, 64, 64]} />
          <meshStandardMaterial
            color={ball.color}
            emissive="#ffffff"
            emissiveMap={labelTexture}
            emissiveIntensity={hovered ? 1.3 : 0.85}
            roughness={0.4}
            metalness={0.45}
          />
        </mesh>

        {/* halo ring on hover */}
        {hovered && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[size * 1.4, 0.03, 16, 64]} />
            <meshBasicMaterial color={ball.color} transparent opacity={0.7} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

export default function SkillsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 50 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[8, 8, 8]} intensity={1.4} color="#22d3ee" />
        <pointLight position={[-8, -8, -8]} intensity={0.9} color="#a78bfa" />
        <pointLight position={[0, 5, -3]} intensity={0.5} color="#f0abfc" />

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
          count={70}
          scale={18}
          size={2}
          speed={0.25}
          color="#67e8f9"
          opacity={0.55}
        />

        {balls.map((b) => (
          <TechBall key={b.label} ball={b} />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.25}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Suspense>
    </Canvas>
  );
}
