"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FiExternalLink, FiLock } from "react-icons/fi";
import Tilt from "react-parallax-tilt";
import type { ShapeKind } from "./three/ProjectShape";

const ProjectShape = dynamic(() => import("./three/ProjectShape"), {
  ssr: false,
  loading: () => null,
});

type Project = {
  title: string;
  subtitle: string;
  description: string;
  liveUrl?: string;
  stack: string[];
  accent: string;
  shape: ShapeKind;
  privateDemo?: boolean;
};

const projects: Project[] = [
  {
    title: "URBI Command Center",
    subtitle: "Urban governance copilot · Govt. of Haryana demo",
    description:
      "A bilingual (English/Hindi) AI assistant for municipal commissioners. Ask any governance question — URBI generates a safe SQL query, runs it on live ULB data, and renders an interactive dashboard. Built around Llama 3.3 on Groq.",
    liveUrl: "https://ulbdemo.sentinal-ai.in",
    stack: ["Next.js", "Llama 3.3", "Groq", "PostgreSQL", "Text-to-SQL"],
    accent: "from-cyan-500/30 to-blue-500/20",
    shape: "globe",
  },
  {
    title: "Sentinel SCR",
    subtitle: "Secure code review platform",
    description:
      "Multi-tenant SaaS for continuous secure code review. Runs gitleaks + semgrep across customer repos, triages findings by severity, tracks suppressions, and maps each finding to CWE classifications.",
    liveUrl: "https://securecode.sentinal-ai.in",
    stack: ["Next.js", "Semgrep", "Gitleaks", "CWE", "Multi-tenant"],
    accent: "from-violet-500/30 to-fuchsia-500/20",
    shape: "shield",
  },
  {
    title: "Adaptive Assessment AI",
    subtitle: "ExamPrep platform · Live SaaS with revenue",
    description:
      "AI-powered adaptive assessment platform for Indian K-12. Schools and independent students get personalized question banks, analytics, and live session monitoring. Currently serving 170+ users across 6 schools with active paid revenue.",
    liveUrl: "https://examprep.sentinal-ai.in",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Adaptive ML", "Stripe"],
    accent: "from-emerald-500/30 to-teal-500/20",
    shape: "brain",
  },
  {
    title: "SentinalAI",
    subtitle: "AI-Native Security OS · LLM & AI supply-chain defense",
    description:
      "Real-time detection and blocking of AI threats — prompt injection, jailbreaks, training-data extraction, agent hijacking — mapped to the MITRE ATLAS taxonomy. Ships with an Auto-Response Engine and a policy engine that sits in front of LLMs, agents, and API gateways. Reduces AI vulnerabilities by 78%.",
    liveUrl: "https://sentinal-ai.com",
    stack: ["LLM Security", "MITRE ATLAS", "Auto-Response", "Policy Engine", "AI Gateway"],
    accent: "from-amber-500/30 to-orange-500/20",
    shape: "aegis",
  },
  {
    title: "Escalion",
    subtitle: "Exploit-path intelligence · AWS IAM",
    description:
      "Identity-native attack-path analysis for AWS. Builds a directed identity graph (CAN_ASSUME, TRUSTS, HAS_POLICY, cross-account) from read-only IAM snapshots and enumerates real privilege-escalation chains — the paths CSPM/CIEM scanners miss. Deterministic, with SHA-256 content-addressed snapshots.",
    liveUrl: "https://escalion.io",
    stack: ["AWS IAM", "Graph Analysis", "Cross-Account", "CloudTrail", "Identity Security"],
    accent: "from-indigo-500/30 to-sky-500/20",
    shape: "graph",
  },
  {
    title: "HRMS Portal",
    subtitle: "Internal HR platform · Private deployment",
    description:
      "Full-stack HR management portal — employee directory, attendance and leave tracking, payroll runs, and role-based admin dashboards. Built for an internal customer; not publicly accessible. Demo available on request.",
    stack: ["Next.js", "PostgreSQL", "Role-based Access", "Payroll", "Attendance"],
    accent: "from-rose-500/30 to-pink-500/20",
    shape: "team",
    privateDemo: true,
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: 0.05 }}
    >
      <Tilt
        glareEnable
        glareMaxOpacity={0.12}
        glareColor="#22d3ee"
        glarePosition="all"
        tiltMaxAngleX={3}
        tiltMaxAngleY={3}
        scale={1.005}
        transitionSpeed={1500}
        className="will-change-transform"
      >
        <article
          className={`glass relative overflow-hidden rounded-3xl ${
            reverse ? "md:flex-row-reverse" : ""
          } flex flex-col gap-8 p-6 md:flex-row md:p-10`}
        >
          <div
            className={`pointer-events-none absolute -top-32 ${
              reverse ? "-left-32" : "-right-32"
            } h-72 w-72 rounded-full bg-gradient-to-br ${project.accent} blur-3xl`}
          />

          {/* 3D scene fills the visual half */}
          <div className="relative w-full md:w-1/2">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 to-slate-950 md:aspect-video">
              <ProjectShape kind={project.shape} />
              <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-slate-900/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-slate-400 backdrop-blur">
                drag to spin
              </div>
            </div>
          </div>

          {/* text + ctas */}
          <div className="relative flex w-full flex-col justify-center md:w-1/2">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
              {project.subtitle}
            </p>
            <h3 className="mt-3 text-3xl font-bold text-slate-100 md:text-4xl">
              {project.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1 text-xs text-slate-300"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.privateDemo ? (
                <a
                  href={`mailto:info@toshiconsulting.com?subject=Demo%20request%20—%20${encodeURIComponent(
                    project.title,
                  )}`}
                  className="inline-flex items-center gap-2 rounded-full bg-rose-500/15 px-5 py-2.5 text-sm font-medium text-rose-200 ring-1 ring-rose-400/30 transition hover:bg-rose-500/25"
                >
                  <FiLock /> Private &mdash; request demo
                </a>
              ) : (
                project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="glow-cyan inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-5 py-2.5 text-sm font-medium text-cyan-200 ring-1 ring-cyan-400/30 transition hover:bg-cyan-500/25"
                  >
                    Live demo <FiExternalLink />
                  </a>
                )
              )}
            </div>
          </div>
        </article>
      </Tilt>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-400">
          Selected Work
        </p>
        <h2 className="mt-4 text-4xl font-bold md:text-5xl">
          Six shipped <span className="gradient-text">platforms</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-slate-400">
          Production builds across AI security, cloud identity, and applied AI
          — each card spins in 3D. Click <span className="text-cyan-300">Live demo</span> to open the real platform, or request access to the private ones.
        </p>
      </motion.div>

      <div className="flex flex-col gap-10">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
