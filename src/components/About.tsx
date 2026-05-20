"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Tilt from "react-parallax-tilt";

const MiniIcon = dynamic(() => import("./three/MiniIcon"), {
  ssr: false,
  loading: () => null,
});

type Card = {
  number: string;
  kind: "shield" | "cpu" | "bolt";
  title: string;
  body: string;
  meta: string;
  accent: string;
  glow: string;
  ring: string;
};

const cards: Card[] = [
  {
    number: "01",
    kind: "shield",
    title: "Security-first",
    body: "From SAST/DAST pipelines to hardened deployment — security isn't bolted on, it's the product itself.",
    meta: "SAST · DAST · Hardened deploys",
    accent: "from-cyan-500/40 via-cyan-500/10 to-transparent",
    glow: "rgba(34,211,238,0.25)",
    ring: "ring-cyan-400/30",
  },
  {
    number: "02",
    kind: "cpu",
    title: "AI-native",
    body: "LLM agents that actually ship: SQL copilots, code reviewers, adaptive assessments — grounded, evaluated, observable.",
    meta: "LLM agents · RAG · Evals",
    accent: "from-violet-500/40 via-violet-500/10 to-transparent",
    glow: "rgba(167,139,250,0.25)",
    ring: "ring-violet-400/30",
  },
  {
    number: "03",
    kind: "bolt",
    title: "Production-grade",
    body: "Type-safe, monitored, and live. Real users, real subdomains, real uptime — not a demo gathering dust on a localhost.",
    meta: "Live SaaS · Monitored · Type-safe",
    accent: "from-fuchsia-500/40 via-fuchsia-500/10 to-transparent",
    glow: "rgba(240,171,252,0.25)",
    ring: "ring-fuchsia-400/30",
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
        className="mb-16 max-w-2xl"
      >
        <div className="mb-5 inline-flex items-center gap-2">
          <span className="h-px w-8 bg-cyan-400/60" />
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-400">
            What we do
          </p>
        </div>
        <h2 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
          Three principles, one
          <br className="hidden md:inline" />{" "}
          <span className="gradient-text">production playbook.</span>
        </h2>
        <p className="mt-6 max-w-xl text-balance text-slate-400">
          Toshi Consulting Services designs and ships AI platforms across LLM
          security, cloud identity, governance, and assessment — architecture,
          agents, frontend, infra, all under one roof.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Tilt
              glareEnable
              glareMaxOpacity={0.15}
              glareColor={c.glow}
              glarePosition="all"
              tiltMaxAngleX={6}
              tiltMaxAngleY={6}
              scale={1.02}
              transitionSpeed={1500}
              className="will-change-transform"
            >
              <div
                className="group glass relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all hover:border-slate-600/60"
                style={{
                  boxShadow: `0 30px 60px -25px ${c.glow}`,
                }}
              >
                {/* top accent gradient bar */}
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${c.accent}`}
                />

                {/* ambient glow on hover */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: c.glow }}
                />

                {/* header: number + 3D icon */}
                <div className="relative mb-6 flex items-start justify-between">
                  <div>
                    <div className="font-mono text-xs text-slate-500">
                      {c.number}
                    </div>
                    <div
                      className={`mt-1 h-8 w-px bg-gradient-to-b ${c.accent}`}
                    />
                  </div>
                  <div className="relative h-24 w-24">
                    <MiniIcon kind={c.kind} />
                  </div>
                </div>

                {/* title */}
                <h3 className="text-2xl font-semibold text-slate-100">
                  {c.title}
                </h3>

                {/* body */}
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {c.body}
                </p>

                {/* meta tags */}
                <div className="mt-auto pt-6">
                  <div
                    className={`inline-flex items-center gap-1.5 rounded-full bg-slate-900/60 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-300 ring-1 ${c.ring}`}
                  >
                    <span>{c.meta}</span>
                  </div>
                </div>

                {/* corner hover indicator */}
                <FiArrowUpRight className="absolute right-5 top-5 text-slate-700 transition-all duration-500 group-hover:text-slate-200" />
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
