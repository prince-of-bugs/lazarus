# LAZARUS

**Put the rewrite on trial.**

AI can rewrite old code in seconds. Lazarus puts the rewrite on trial against the original, then hands you a certificate and a Kiro spec of every behavior that changed.

> Built for the Kiroween 2026 hackathon (Resurrection category). Work in progress.

## How it works

1. **Autopsy**: inspect an abandoned Python 2 library: its public functions and Python 2-only constructs.
2. **Trial**: run the original (Python 2.7) and the rewrite (Python 3.12) side by side on thousands of generated inputs, and minimize every disagreement.
3. **Certificate**: a per-function report graded on held-out inputs the repair step never saw.
4. **Kiro spec**: every behavior change becomes an EARS requirement in a generated `.kiro/specs/` folder.

## Repository layout

- `src/`: Next.js web app (deployed on Vercel)
- `.kiro/`: Kiro steering, specs and hooks used to build this project
- `docs/PLAN.md`: build plan

## Run locally

```bash
npm install
npm run dev
```

## Third-party material

- Next.js starter generated with `create-next-app`.
- `.kiro/steering/ponytail.md` comes from [Ponytail](https://github.com/DietrichGebert/ponytail) (MIT).

## License

MIT
