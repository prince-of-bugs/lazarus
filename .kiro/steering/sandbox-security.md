---
inclusion: always
---

# Sandbox security (non-negotiable)

Every `docker run` of analyzed code must include:
`--runtime=runsc --network none --read-only --tmpfs /tmp:size=64m --pids-limit 64 --memory 768m --cpus 1 --user 65534 --cap-drop ALL --security-opt no-new-privileges`

- 120s outer kill, 10s per-call timeout, 1MB output cap, Hypothesis database off.
- Mount only under `/work`. Package tarballs are fetched and unpacked without executing any of their code (never run setup.py).
- The hosted service runs allowlisted libraries only. The public demo accepts no pasted code.
