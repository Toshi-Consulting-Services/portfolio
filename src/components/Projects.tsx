"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  liveUrl: string;
  repoUrl: string;
  image: string;
  stack: string[];
  accent: string;
};

const projects: Project[] = [
  {
    title: "URBI Command Center",
    subtitle: "Urban governance copilot · Govt. of Haryana demo",
    description:
      "A bilingual (English/Hindi) AI assistant for municipal commissioners. Ask any governance question — URBI generates a safe SQL query, runs it on live ULB data, and renders an interactive dashboard. Built around Llama 3.3 on Groq.",
    liveUrl: "https://ulbdemo.sentinal-ai.in",
    repoUrl: "https://github.com/Toshi-Consulting-Services/cyber-security-llm-agents",
    image: "/projects/urbi.png",
    stack: ["Next.js", "Llama 3.3", "Groq", "PostgreSQL", "Text-to-SQL"],
    accent: "from-cyan-500/30 to-blue-500/20",
  },
  {
    title: "Sentinel SCR",
    subtitle: "Secure code review platform",
    description:
      "Multi-tenant SaaS for continuous secure code review. Runs gitleaks + semgrep across customer repos, triages findings by severity, tracks suppressions, and maps each finding to CWE classifications.",
    liveUrl: "https://securecode.sentinal-ai.in",
    repoUrl: "https://github.com/Toshi-Consulting-Services/secure-code-review",
    image: "/projects/sentinel-scr.png",
    stack: ["Next.js", "Semgrep", "Gitleaks", "CWE", "Multi-tenant"],
    accent: "from-violet-500/30 to-fuchsia-500/20",
  },
  {
    title: "Adaptive Assessment AI",
    subtitle: "ExamPrep platform · Live SaaS with revenue",
    description:
      "AI-powered adaptive assessment platform for Indian K-12. Schools and independent students get personalized question banks, analytics, and live session monitoring. Currently serving 170+ users across 6 schools with active paid revenue.",
    liveUrl: "https://examprep.sentinal-ai.in",
    repoUrl: "https://github.com/Toshi-Consulting-Services/MVP_Student_Assessment_Portal",
    image: "/projects/examprep.png",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Adaptive ML", "Stripe"],
    accent: "from-emerald-500/30 to-teal-500/20",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: 0.05 }}
      className={`glass relative overflow-hidden rounded-3xl ${
        reverse ? "md:flex-row-reverse" : ""
      } flex flex-col gap-8 p-6 md:flex-row md:p-10`}
    >
      <div
        className={`pointer-events-none absolute -top-32 ${
          reverse ? "-left-32" : "-right-32"
        } h-72 w-72 rounded-full bg-gradient-to-br ${project.accent} blur-3xl`}
      />

      <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800/80 md:w-1/2">
        <div className="aspect-video w-full bg-gradient-to-br from-slate-900 to-slate-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="h-full w-full object-cover object-top transition duration-700 hover:scale-[1.03]"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </div>

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
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="glow-cyan inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-5 py-2.5 text-sm font-medium text-cyan-200 ring-1 ring-cyan-400/30 transition hover:bg-cyan-500/25"
          >
            Live demo <FiExternalLink />
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2.5 text-sm text-slate-200 transition hover:border-violet-400 hover:text-violet-300"
          >
            <FiGithub /> Source
          </a>
        </div>
      </div>
    </motion.article>
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
          Three live <span className="gradient-text">platforms</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-slate-400">
          Every project below is deployed, monitored, and serving real users
          on the <span className="text-cyan-300">sentinal-ai.in</span> stack.
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
