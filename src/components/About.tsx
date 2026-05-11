"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const MiniIcon = dynamic(() => import("./three/MiniIcon"), {
  ssr: false,
  loading: () => null,
});

type Card = {
  kind: "shield" | "cpu" | "bolt";
  title: string;
  body: string;
};

const cards: Card[] = [
  {
    kind: "shield",
    title: "Security-first",
    body: "From SAST/DAST pipelines to hardened deployment — security is the product, not an afterthought.",
  },
  {
    kind: "cpu",
    title: "AI-native",
    body: "LLM agents that actually ship: SQL copilots, code reviewers, adaptive assessment — grounded, evaluated, observable.",
  },
  {
    kind: "bolt",
    title: "Production-grade",
    body: "Type-safe, monitored, and deployed. Real users, real subdomains, real uptime.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-6xl px-6 py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-400">
          About
        </p>
        <h2 className="mt-4 text-4xl font-bold md:text-5xl">
          What <span className="gradient-text">we do</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-slate-400">
          Toshi Consulting Services designs and ships AI platforms for the
          security and public-sector space. We do everything end-to-end —
          architecture, agents, frontend, infra.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Tilt
              glareEnable
              glareMaxOpacity={0.2}
              glareColor="#a78bfa"
              glarePosition="all"
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              scale={1.03}
              transitionSpeed={1500}
              className="will-change-transform"
            >
              <div className="glass group relative h-full rounded-2xl p-6 transition hover:border-cyan-500/30">
                <div className="relative mx-auto mb-5 h-28 w-28">
                  <MiniIcon kind={c.kind} />
                </div>
                <h3 className="text-center text-lg font-semibold text-slate-100">
                  {c.title}
                </h3>
                <p className="mt-2 text-center text-sm leading-relaxed text-slate-400">
                  {c.body}
                </p>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
