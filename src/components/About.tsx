"use client";

import { motion } from "framer-motion";
import { FiShield, FiCpu, FiZap } from "react-icons/fi";

const cards = [
  {
    icon: FiShield,
    title: "Security-first",
    body: "From SAST/DAST pipelines to hardened deployment — security is the product, not an afterthought.",
  },
  {
    icon: FiCpu,
    title: "AI-native",
    body: "LLM agents that actually ship: SQL copilots, code reviewers, adaptive assessment — grounded, evaluated, observable.",
  },
  {
    icon: FiZap,
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
            className="glass group rounded-2xl p-6 transition hover:border-cyan-500/30"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-300 transition group-hover:scale-110">
              <c.icon size={22} />
            </div>
            <h3 className="text-lg font-semibold text-slate-100">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {c.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
