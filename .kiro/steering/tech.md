---
inclusion: always
---

# Tech

- Frontend: Next.js 15 (App Router, TypeScript, Tailwind 4) at the repo root, deployed on Vercel. It talks to the trial API over HTTPS + SSE and never runs analyzed code.
- Trial API: FastAPI (Python 3.12), one worker, asyncio queue, one concurrent run, SQLite for runs, events and certificates. Hosted on one EC2 box behind Caddy.
- Sandbox image: one image, two interpreters. py3.12 runs the Hypothesis driver and the new code; py2.7.18 runs `oracle27.py` over JSON-lines with tagged values `{t: int|float|bytes|text|list|tuple|dict|set|none|bool|obj|exc}`.
- LLM: Amazon Bedrock. Agent system prompts live in `.kiro/agents/*.md` (single source of truth).
- Budget guard: daily spend cap, rate limit, KILL_SWITCH. On any failure, fall back to a labeled replay.
- Live and replay share one event schema: `phase, function, beat, divergence, patch, rerun, verdict, metric`.
