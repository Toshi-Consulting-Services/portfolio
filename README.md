# Toshi Consulting Services — Portfolio

A 3D portfolio showcasing the three live platforms built and operated by Toshi Consulting Services on the `sentinal-ai.in` stack.

## Featured projects

| Project | Live | What it is |
|---|---|---|
| **URBI Command Center** | [ulbdemo.sentinal-ai.in](https://ulbdemo.sentinal-ai.in) | Bilingual AI governance copilot for Haryana ULBs — text-to-SQL on live municipal data, Llama 3.3 + Groq |
| **Sentinel SCR** | [securecode.sentinal-ai.in](https://securecode.sentinal-ai.in) | Multi-tenant secure code review SaaS — gitleaks + semgrep, CWE-mapped findings, suppressions, audit log |
| **Adaptive Assessment AI** | [examprep.sentinal-ai.in](https://examprep.sentinal-ai.in) | Live K-12 assessment platform — adaptive question banks, school + independent tiers, 170+ users, paid revenue |

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind**
- **Three.js** + **@react-three/fiber** + **@react-three/drei** for the 3D hero scene
- **framer-motion** for scroll-triggered reveals
- **react-icons** for iconography

## Local dev

```bash
nvm use 20
npm install
npm run dev
# → http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## License

© Toshi Consulting Services — all rights reserved.
