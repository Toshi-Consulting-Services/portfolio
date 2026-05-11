"use client";

import { motion } from "framer-motion";

const groups = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind", "Three.js", "R3F"],
  },
  {
    title: "Backend",
    items: ["FastAPI", "Node.js", "PostgreSQL", "Redis", "Docker"],
  },
  {
    title: "AI / LLM",
    items: ["Llama 3.3", "Groq", "OpenAI", "Anthropic", "RAG", "Text-to-SQL"],
  },
  {
    title: "Security",
    items: ["Semgrep", "Gitleaks", "CWE", "SAST/DAST", "Hardened deploy"],
  },
  {
    title: "Infra",
    items: ["Contabo VPS", "Nginx", "Certbot", "UFW", "Fail2ban", "GitHub Actions"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-400">
          The Stack
        </p>
        <h2 className="mt-4 text-4xl font-bold md:text-5xl">
          What <span className="gradient-text">we build with</span>
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="glass rounded-2xl p-6"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
              {g.title}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1 text-xs text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
