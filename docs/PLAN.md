# LAZARUS v3: Final Plan
*Marcus's final call after the judge's red-team. Kiroween 2026, solo build, Nov 17 to Dec 3. Execution starts today.*

---

## 0. Judge feedback addressed

| # | Must-fix | Decision | How |
|---|---|---|---|
| 1 | Cut scope hard now | **Adopted** | MVP is one vertical slice: CLI trial, then hosted Trial view, then Certificate. **Cut from MVP:** Power, Crew, Kiro Web session, hooks 5 and 7, the BigQuery board, mutation teeth (it moves to stretch, see #2b), bring-your-own upload UI, paste-your-own, adversarial-hardening day, Judgment J-rule UI beyond one ruling, OG image generator (replaced by one static OG per certificate). That frees about 4.5 days, which go to UI polish and the video. |
| 2 | Make the Tribunal fair | **Adopted** | The repairer only sees **dev seeds and dev strategies**. The graded trial uses a **held-out seed set plus an independent strategy set** (type-driven generic strategies and an LLM strategy prompt the repairer never sees), and it runs after the rewrite is frozen and hashed. On screen: "Graded on 5,000 inputs the repairer never saw." Lazarus's number is reported whatever it turns out to be. If it isn't 0, we show it and the remaining divergences get rulings. |
| 2b | Teeth score is tautological | **Adopted** | Teeth is out of the MVP and the video. Stretch S2 uses **5 generic mutants** (arithmetic/relational operator swap, off-by-one constant, dropped branch) that are deliberately *not* py2/3 traps, labeled "harness sanity check." |
| 3 | round(2.5) wow moment is trivia | **Adopted** | round stays as the 7s cold open only. The core wow is a **real consequence in a real library**: a money, date or encoding function where the naive rewrite gives a wrong total or corrupted bytes. Chosen by script and hand-verified by Nov 19. Gate: if no real lib shows a consequence-level divergence, the wow becomes the Tribunal number on real libs. We never stage one. |
| 4 | Prove "any migration" | **Adopted** | **numpy 1.26 to 2.x defendant** on one real function (NEP 50 scalar promotion changes result dtype and precision). It uses the same oracle protocol with two py3.12 venvs in one image. 12-second video beat, one certificate. Cut line: if it isn't green by Nov 28, the "any migration" claim is removed from the pitch, not softened. |
| 5 | One real human validation | **Adopted** | Starting today: respectful 1:1 outreach (email, Python Discord/forums) to 10 people, either maintainers of orphaned libs or engineers at teams with legacy py2. We send the actual certificate and ask permission to quote. **Never** a drive-by comment on stale issues. If no quote is approved by Dec 1, we make no validation claim. |
| 6 | Collapse vocabulary | **Adopted** | The video, Devpost and README use **Autopsy, Trial, Certificate, Kiro spec** and nothing else. Agent names, Séance, R/J rule codes and "defibrillated" stay inside the UI as secondary labels or are dropped. The "Tribunal" is now called "Comparison." |
| 7 | Live path that can't fail | **Adopted** | **"Run live" is the primary button** on one small allowlisted lib, with a 30-45s target. The trial runs live in the sandbox, and the rewrite is served from a frozen cache unless "fresh rewrite" is ticked and budget allows. Replay is the *fallback* (budget hit, Bedrock down, sandbox error) and is labeled. |
| 8 | Honesty gaps | **Adopted** | The shrinking copy now says "Hypothesis found a failing input and minimized it to `to_cents(Decimal('2.675'))`" and quotes only real counts from Hypothesis statistics. The arXiv citation is **deleted** unless it is verified on Nov 18 (title, authors, ID). **Kiro formats (agents, hooks, steering keys, MCP matcher) are verified on Nov 18**, before specs are written. |
| 9 | Move the Kiro spec export earlier | **Adopted** | It goes into the one-line pitch, the Devpost first paragraph, and the video at about 0:55, right after the Trial. |
| — | "Python 2 is yesterday's problem" (critique) | **Partially adopted** | We don't pivot, because py2 is the only setting where two real runtimes and Hypothesis fit in 16 days. Instead py2 is framed as **case #1**, and numpy 1 to 2 is shown as case #2. The pitch is "AI migrations," not "Python 2." |

---

## 1. Final idea

| | |
|---|---|
| **Name** | **LAZARUS** |
| **One-line pitch** | *AI can rewrite old code in seconds. Lazarus puts the rewrite on trial against the original, then hands you a certificate and a Kiro spec of every behavior that changed.* |
| **Tagline** | "Put the rewrite on trial." |
| **Category** | Resurrection. Also targeting Best Startup, Best Demo, Blog, Social Blitz, and Ghost of Kiroween Past if the criteria fit (read today). |
| **Startup line** | "Verification for AI code migrations. Works on any migrator's output — futurize, an LLM, a human PR — and turns every behavior change into a reviewable spec." |
| **Wow moment** | A real library's money/date/encoding function (picked by Nov 19) flatlines in the Trial view. The Divergence Card shows the minimized input with the py2 result next to the rewrite's wrong total or corrupted bytes. The repair re-runs and goes green. Then the Comparison table: **futurize N · one-shot LLM M · Lazarus K, graded on inputs the repairer never saw.** |

**How it works:** (1) **Autopsy** of the old library inside py2. (2) A rewrite: ours (codemod plus per-function LLM repair) or a baseline. (3) **Trial**: py3 Hypothesis drives a live py2 oracle in one sandbox and minimizes every disagreement. (4) Intentional changes are ruled on explicitly. (5) **Certificate** at a permanent URL, plus a generated `.kiro/specs/` folder where every ruling becomes an EARS requirement.

---

## 2. What changed and why (decision log)

### Kept from v2
Trial-court positioning; one sandbox image with two interpreters over JSON-lines; tagged serializer; normalizer rules R1-R5 with PYTHONHASHSEED=0; `assume()` filtering with at least 200 meaningful examples per function for "Equivalent"; autopsy inside py2; futurize then per-function repair (3 rounds per function, 8 calls per run); "intentionally changed" only through a named rule chosen by a human; one EC2 box (Docker + gVisor + Caddy + FastAPI + static Next.js + SQLite); safe tarball fetch with no code execution; demo libs chosen by script; the generated `.kiro/specs` export; lazarus-mcp; Pre Tool Use docker gate and on-save property tests; evidence capture from day 1; the spec vs vibe experiment; credits requested today.

### New in v3 (from the judge)
| # | Change | Why |
|---|---|---|
| 1 | Held-out graded trial (separate seeds, separate strategy generator, rewrite frozen and hashed before grading) | Removes self-grading. Credibility *is* the product. |
| 2 | Real-consequence wow moment; round only in the cold open | round(2.5) is trivia to experienced judges. |
| 3 | numpy 1 to 2 second defendant (one function) | Backs up "any migration" with something real. |
| 4 | Live-first "Run live" (30-45s), with replay as fallback | Avoids "canned demo." |
| 5 | Human validation outreach from day 1 | Impact. |
| 6 | Four public terms only | Comprehension in 3 minutes. |
| 7 | Kiro formats verified Nov 18, citation verified or deleted Nov 18 | Honesty before specs are written. |
| 8 | Kiro spec export moved into the pitch | It's the most novel, sponsor-aligned idea. |

### Cut (from v2)
Power, Crew repo, Kiro Web triage, hooks 5 (Session Start) and 7 (File Create), BigQuery/Most Wanted analytics (replaced by a small static list with pypistats.org numbers and a source line), the mutation teeth MVP (moved to stretch as generic mutants), bring-your-own upload UI (baselines are generated by the CLI), paste-your-own (live runs allowlist-only, so no untrusted code), the full adversarial-hardening day (reduced to a 2-hour smoke test, since there's no untrusted input), the J-rule UI beyond one ruling flow, the OG image generator, 404 polish beyond a one-liner, and the `uvx` publishing step (the CLI runs from the repo). Also cut: the "1,284 to 1" shrink copy, the unverified arXiv quote, and "Lazarus: 0" as a guaranteed headline.

---

## 3. Target user and problem

**Problem:** AI migrations *look* right. Reviewers can't see behavior changes in a diff (division, rounding, bytes vs text, ordering, dtype promotion). Teams either freeze ("can't risk it") or ship silent regressions.

**Users:**
1. **Demo persona:** someone who depends on, or maintains, an orphaned py2-only library that still gets downloaded.
2. **Startup buyer:** platform teams running AI or codemod migrations (py2 to 3, numpy 1 to 2, and so on) who need evidence before merging. Lazarus is migrator-agnostic.
3. **Private-code teams:** labs, ops tooling and VFX pipelines that run the CLI locally so code never leaves the machine.

**Evidence to cite (all measured or real, never invented):**
- **[MEASURED]** the count of curated py2-only packages in a static snapshot (`data/graveyard.json`) with last-month downloads from pypistats.org, sourced on screen. Caveat in the README: downloads include CI mirrors.
- **[REAL]** 1 or 2 quotes from human outreach (with permission), or none.
- **[MEASURED]** Comparison numbers on the demo libs, held-out graded.
- arXiv: **only if verified Nov 18.** Otherwise not mentioned.

---

## 4. Scope

### MVP (must ship), one vertical slice
1. **Autopsy:** PyPI name or allowlisted graveyard entry. Safe tarball fetch, then an AST pass inside py2: public functions, py2-construct chips, verdict (Resurrectable / Not dead / Too big / Unraisable).
2. **Rewrite:** futurize, then LLM cleanup, then a per-function repair loop on **dev** seeds and strategies only (caps: 3 rounds per function, 8 calls per run).
3. **Trial:** dual-interpreter gVisor sandbox. Deterministic seeds (doctests, README literals, defaults), LLM strategies restricted to `st.*`, AST-checked and validated on 50 draws, with a generic fallback. R1-R5, `assume()`, at least 200 meaningful examples per function, deadline 2s.
4. **Graded trial (held-out):** the rewrite is frozen and hashed; then a fresh seed and an independent strategy set run against all three defendants (futurize-only, one-shot LLM, Lazarus). This produces the Comparison table.
5. **Rulings:** each remaining divergence gets "Bug" or "Intentional (rule + reason)," one click, with the counterexample shown. The LLM can propose a rule but never waive a divergence.
6. **Certificate:** `/c/{pkg}-{hash}`, a per-function table (Equivalent / Repaired / Intentional / Unverified with example counts), py2 branch coverage (coverage.py 5.x), rule versions, a README badge, one static OG image, and a zip containing the package, certificate.json and **`.kiro/specs/<lib>-resurrection/`** (EARS requirements per ruling plus a steering file of preserved quirks plus properties as tests). "Sealed" requires at least 80% coverage of the reachable public API; anything below is "Provisional."
7. **Live-first web:** a "Run live" button on one small allowlisted lib (30-45s, cached rewrite), with replay at 1x/4x as the labeled fallback. Three graveyard libs plus the numpy case have recorded runs.
8. **CLI** (`lazarus autopsy|trial|certify`) and the **lazarus-mcp** stdio wrapper.
9. **numpy 1.26 to 2.x defendant:** one function, same protocol, one certificate. Cut line Nov 28.

### Stretch (only after Cut Line B is green, in order)
- S1: hand-made PR on my own fork of one demo lib (video beat)
- S2: harness sanity check with 5 generic mutants (not py2/3 traps)
- S3: seeding from settrace of the lib's own test suite

### Hard cuts
Power, Crew, Kiro Web, BigQuery, Most Wanted analytics, paste-your-own, bring-your-own upload UI, accounts, Postgres, Vercel/Fly, GitHub Action/auto-PR, jQuery/TS, C extensions, IO/network libs, stateful/class testing beyond simple constructor plus method, fog and particles, full mutmut.

---

## 5. Architecture and stack

```
Browser ──HTTPS──> Caddy (one EC2 t3.large)
                    ├─ /           static Next.js export (Tailwind, minimal Framer)
                    └─ /api,/sse   FastAPI (1 worker, asyncio queue, 1 concurrent)
                                    ├─ SQLite: runs, append-only events, certificates
                                    ├─ budget ($15/day, fail closed to replay), rate limit, KILL_SWITCH
                                    ├─ Amazon Bedrock: system prompts = .kiro/agents/*.md
                                    └─ docker --runtime=runsc lazarus-sandbox
                                         ├─ py3.12: Hypothesis driver, new lib, numpy2 venv
                                         └─ py2.7.18: oracle27.py (JSON-lines), old lib, coverage 5.x
                                            (+ py3.12 numpy1.26 venv as oracle for case #2)
lazarus CLI (same core) ── wrapped by lazarus-mcp (stdio)
```

- **Sandbox flags:** `--runtime=runsc --network none --read-only --tmpfs /tmp:size=64m --pids-limit 64 --memory 768m --cpus 1 --user 65534 --cap-drop ALL --security-opt no-new-privileges`. 120s outer kill, 10s per-call timeout, 1MB output cap, Hypothesis database off. Only allowlisted code runs on the hosted box.
- **Oracle protocol:** tagged values `{t:int|float|bytes|text|list|tuple|dict|set|none|bool|obj|exc}`. Bytes are base64. Floats are stored as repr plus flags. The protocol is interpreter-agnostic, which is what makes the numpy case cheap.
- **Fairness mechanics:** `dev_seed` plus dev strategies feed repair. The rewrite is frozen (sha256 in certificate.json), then `held_seed` plus held strategies (generic `from_type` strategies and a separate LLM strategy prompt with no access to repair transcripts) grade it. Both seeds and both strategy hashes are printed on the certificate.
- **Normalizer:** R1 ASCII str equality, R2 list equals materialized iterator, R3 order-insensitive sets and dicts, R4 exceptions by type family, R5 objects by type plus `__dict__` to depth 3. Rulings: J1 bytes to text, J2 py3 rounding, J3 true division, plus N1 numpy-2 promotion. Each cites its counterexample.
- **Event schema** (locked Nov 19): `phase, function, beat{ok}, divergence{id,input,old,new,line,found_after,shrink_steps}, patch{diff}, rerun{n}, verdict, metric{coverage}`. Live and replay share one renderer.
- **Ops:** `restart: always`, UptimeRobot on `/healthz` (which runs a cached replay), nightly prune, image pre-pulled.

### Riskiest bets
| Risk | Mitigation | Cut line |
|---|---|---|
| Oracle bridge with shrinking | First technical task today | Nov 18: fall back to batch replay (py3 generates, py2 replays, py3 shrinks on recorded failures) |
| No real consequence-level divergence | Script plus hand-check of money/date/encoding libs Nov 18-19 | Nov 19: the wow becomes the held-out Comparison number. Never fake. |
| Held-out trial shows Lazarus at more than 0 | Report it honestly and rule on the remainder | Not a cut, it's a feature: "here's what's left, with evidence" |
| Live run exceeds 45s | Smallest allowlisted lib, cached rewrite, `max_examples` tuned | Nov 30: live runs the trial only, with fewer functions shown |
| gVisor issues | Provision today | Fall back to runc plus all flags (allowlist-only input) |
| numpy case | Same protocol, one function | Nov 28: drop the claim entirely |
| Scope | Slice order: CLI, then Trial view, then Certificate | **A** Nov 23, **B** Nov 29 (see §8) |

---

## 6. Kiro usage blueprint

**Positioning:** Lazarus *outputs* Kiro specs (a product feature), is *usable from* Kiro (lazarus-mcp), and was *built with* Kiro's spec-driven method and property testing. The first point leads.

### `.kiro/` tree (committed Nov 17-19)
```
.kiro/
  specs/   autopsy/  trial/  rewrite/  web/  lazarus-mcp/   {requirements,design,tasks}.md
  steering/ product.md  tech.md  testing.md  sandbox-security.md   (always)
            py2-semantics.md (src/lazarus/rewrite/**, prompts/**)  ui-theme.md (web/**)
  agents/   coroner  necromancer  inquisitor  scribe   (format verified Nov 18)
  hooks/    5 JSON files (below)
  settings/mcp.json   lazarus-mcp, GitHub MCP
docs/kiro/ spec-trace.md  trial-log.jsonl  hook-blocks.md  vibe-vs-spec.md  screenshots/
DEVLOG.md  KIRO.md
```
**Nov 18 verification (before specs are written):** steering front-matter keys, agent profile format (IDE `.md` vs CLI JSON), hook JSON fields and tool-matcher syntax, kiro-cli headless terms. Anything unverifiable is dropped from the plan that day, not caveated later.

### Specs
EARS requirements, so Kiro can derive properties. `Kiro-Task: trial#3.2` trailers on commits.

### Hooks (5)
1. **File Save** `src/lazarus/oracle/**`: `pytest -m property -x --hypothesis-profile=fast`
2. **Pre Tool Use** (shell): `scripts/gate_docker.py` blocks a `docker run` missing `--network none/--memory/--pids-limit/--read-only` or mounting outside /work, logged to hook-blocks.md. **Security showpiece.**
3. **Post Tool Use** (lazarus-mcp `trial`): appends divergence counts to trial-log.jsonl
4. **Post Task Execution**: task ID, SHA and test result go to spec-trace.md
5. **Agent Stop**: ruff plus `mypy --strict` on changed files

### Agents
Four profiles with restricted tools. The same `.md` prompts are the Bedrock system prompts, so there is one source of truth. kiro-cli headless regenerates replay fixtures locally, but only if the terms allow it.

### MCP
**Built:** lazarus-mcp (`autopsy`, `trial`, `certify`), dogfooded by certifying the graveyard libs from Kiro chat (video clip). **Consumed:** GitHub MCP.

### Property tests on Lazarus itself
P1 normalizer idempotence · P2 comparator reflexive and symmetric · P3 non-collapse (`1`, `'1'`, `True`, `1.0`) · P4 cross-interpreter round-trip · **P5 metamorphic: original vs itself gives 0 divergences** · P6 sandbox determinism · P7 shrinker preserves divergence · **P8 held-out independence: graded inputs ∩ repair inputs = ∅**. P5 and P8 are the write-up headlines.

### Spec vs vibe
The animation layer (EKG, seal) is vibe-coded; everything else is spec-first. Log time, rework commits and bugs found later, and put the table in KIRO.md.

### Evidence capture (today)
OBS hotkey, DEVLOG rows (date | Kiro feature | what | spec/vibe | SHA), a daily 10s capture. Must-capture moments: the first on-save PBT failure, a full spec flow, a Pre Tool Use block, an MCP certify run, and every naive-rewrite divergence.

---

## 7. Design system and key screens

**Rule:** the theme lives in chrome and headings, never in data. **Public words:** Autopsy, Trial, Certificate, Kiro spec.

**Tokens (AA-checked):** bg `#0B0D0C`, surface `#141816`, border `#2A302C`, text `#E8E2D0`, muted `#9A9686`, green `#A3E635` (pass and focus), ember `#FF6A3D` (divergence), amber `#F2B84B` (intentional), grey `#6B7280` (unverified). Every state has a shape too: tick, X, triangle, clock.

**Type:** Cormorant Garamond for the H1 and certificate title only; Inter for UI; JetBrains Mono with tabular numerals.

**Motion (two signatures):** EKG beats driven by real events, and the seal stamp (600ms, once). Everything else is a 150ms fade. Reduced motion gives a stepped sparkline and a static seal.

**Screens (3 plus How-it-works):**
1. **Landing:** headline, then one primary **"Run live (≈40s)"** button on the featured lib, a small graveyard list (name, last release, monthly downloads with source, certificate link), the PyPI-name input (allowlist), and the CLI one-liner. The Kiro-spec line sits above the fold.
2. **Trial view:** stepper (Autopsy > Rewrite > Trial > Graded > Certificate) with elapsed time and `aria-live=polite`; per-function EKG lanes; the **Divergence Card** (input, old output, new output, diff, line, patch, re-run); the **Comparison** tab with the "graded on N inputs the repairer never saw" caption; and a collapsible agent log (agent names live here only). A replay banner appears only in fallback mode.
3. **Certificate** `/c/{id}`: seal; summary ("41 functions · 38 equivalent · 2 repaired · 1 intentional · 48,210 meaningful inputs · held-out seed 0x… · coverage 87%"); a real `<table>`; a reason for each intentional row; badge; zip; and a **Kiro spec preview pane** showing the generated EARS requirement for each ruling. Mobile-friendly, with a static OG image.

**States:** Not dead, Too big, Unraisable, per-function timeout (Unverified), partial success (green seal plus amber notes), rate-limited ("watch the recorded run"), Bedrock down (fallback to replay, labeled), Died in sandbox.

---

## 8. Day-by-day schedule

| Date | Work | Gate |
|---|---|---|
| **Mon Nov 17** | Request credits. Public repo, MIT license, 4 always-on steering files, DEVLOG and OBS. EC2, Docker, gVisor. Two-interpreter image, then **hello-oracle round-trip with shrinking**. Read the Ghost of Kiroween Past and Startup criteria. Send the first 5 outreach messages. Social #1. | Oracle works |
| **Tue Nov 18** | **Verify Kiro formats** and **verify or delete the arXiv citation**. Graveyard snapshot script (pypistats). Demo-lib hunt focused on **money/date/encoding** functions; shortlist 8. Write the autopsy and trial specs. | Formats locked |
| **Wed Nov 19** | Rewrite, web and mcp specs. Serializer, R1-R5, P1-P4, on-save hook. Hand-verify and keep 3 libs (at least 1 with a consequence-level divergence). Event schema and ui-theme tokens. Trial view and certificate mockups. | Wow lib locked |
| **Thu Nov 20** | Trial harness on hand-futurized lib #1 gives real divergences with minimized inputs (no LLM). Pre Tool Use gate. Outreach batch 2 (5 more). | No-LLM CLI shows real divergences |
| **Fri Nov 21** | Autopsy in py2. Deterministic seeds, LLM strategies with AST check, fallback, `assume()`. P5 and P6. Social #2. | |
| **Sat Nov 22** | Rewrite: futurize, LLM, repair loop on dev split. Shared agent prompts. Coverage on 2.7. | |
| **Sun Nov 23** | **Held-out graded trial** (frozen hash, separate seed and strategies, P8). Comparison of 3 defendants on 3 libs. lazarus-mcp. **CUT LINE A:** if the graded CLI trial isn't end to end, hosted becomes replay plus CLI and the effort goes to the certificate and video. | A |
| **Mon Nov 24** | FastAPI queue, SSE, SQLite events, replay endpoint. **Certificate page from fixtures** plus the `.kiro/specs` export. | |
| **Tue Nov 25** | Ruling flow (1-click) plus EARS generation from rulings. Budget, rate limit, kill switch. Badge, static OG. Certify the libs from Kiro chat via MCP (recorded). | |
| **Wed Nov 26 (half day)** | Landing and Run-live button. **Video script locked, scratch VO recorded.** | |
| **Thu Nov 27** | Trial view: stepper, EKG (vibe, logged), Divergence Card, Comparison tab. | |
| **Fri Nov 28** | **numpy 1 to 2 case** (one function, certificate). States, How-it-works. **numpy cut line.** | numpy green or claim dropped |
| **Sat Nov 29** | Polish day (this is what the cuts bought): AA, reduced motion, mobile certificate, live-run timing under 45s. **Rough cut of the video.** **CUT LINE B:** if the UI isn't done, drop everything but the EKG and seal. | B |
| **Sun Nov 30** | Deploy with Caddy TLS. Record fallback replays on prod. UptimeRobot. S1 fork PR if B is green. | |
| **Mon Dec 1** | 2h sandbox smoke test (fork bomb, infinite loop, huge output → "Died in sandbox"). Final video capture after UI freeze. Blog draft. Confirm the outreach quote and permission. Social #3. Credits fallback deadline. | Live run green on prod |
| **Tue Dec 2** | Final cut, upload unlisted, check timing, then make it public. Blog on dev.to. README, KIRO.md, Devpost draft. | Video public |
| **Wed Dec 3** | Checklist (§10). **Submit by noon PT.** Social #4. | Submitted |
| Thu Dec 4 | Untouched buffer (deadline 2:00 PM PT). | |

---

## 9. Three-minute video (target 2:50, ceiling 2:58)

Own voiceover, burned-in captions, 1080p, 125% zoom, highlighted cursor, every speed-up labeled, CC0 or self-made music, no logos. Public vocabulary only: **Autopsy, Trial, Certificate, Kiro spec.**

| Time | Shot | VO |
|---|---|---|
| 0:00–0:07 | Terminal: py2 `round(2.5)` gives `3.0`, py3 gives `2`. | "Same code. Same input. Different answer." |
| 0:07–0:18 | Graveyard list with sourced download numbers. Optional quote card from outreach. | "AI can rewrite old code in seconds. Nobody can tell you what it broke." Title: **LAZARUS: Put the rewrite on trial.** |
| 0:18–0:26 | Click **Run live** (real-time clock visible). Autopsy chips. | "Autopsy: what's in the old code." |
| 0:26–0:55 | **Trial:** EKG lanes. A lane flatlines on the real-lib function. The card shows minimized input, old vs new, **the wrong total or corrupted bytes**. Hold 2s. Patch, re-run, green. | "Hypothesis runs the original and the rewrite side by side, sealed off from the network, and minimizes every disagreement to one input. This one changes an invoice total." |
| 0:55–1:10 | **Kiro spec beat:** click "Intentional, py3 text behavior." The generated EARS requirement appears in the `.kiro/specs` preview. | "Every intentional change becomes a Kiro spec, so the next maintainer knows exactly what changed and why." |
| 1:10–1:25 | **Comparison table**, caption "graded on 5,000 inputs the repairer never saw." | "We graded every migrator on held-out inputs. Here's what each one silently broke." |
| 1:25–1:37 | **numpy 1 to 2** case: same Trial view, a dtype divergence, certificate. | "Same engine, different migration: numpy 1 to 2." |
| 1:37–1:52 | Certificate seal, summary, badge into README, zip containing the `.kiro/` folder. | "Not a promise. Evidence." |
| 1:52–2:35 | **How Kiro built it (real footage):** spec flow (8s); on-save property test fails on a real normalizer counterexample, then passes (10s); Pre Tool Use **blocks** an unsafe `docker run` (7s); lazarus-mcp certifying a lib from Kiro chat (8s); stats card with tasks, properties, hook runs and the spec vs vibe result (8s). | "Kiro tested Lazarus the same way Lazarus tests your code." |
| 2:35–2:45 | CLI running locally on a private folder. | "Runs locally for private code." |
| 2:45–2:52 | Green EKG, URL, repo, "Built with Kiro." | "Lazarus. Put the rewrite on trial." |

**Title:** "LAZARUS: My AI rewrite changed an invoice total. Hypothesis caught it | Kiroween 2026" (adjust to the real consequence). **Thumbnail:** the ember Divergence Card.

---

## 10. Submission and bonus checklist

**Core**
- [ ] Public repo, MIT LICENSE at the root, `/.kiro` committed (specs, 5 hooks, steering, agents), `.gitignore` checked Dec 1
- [ ] Logged-out incognito: **Run live finishes in under 45s**. With the kill switch on, the labeled fallback replay works.
- [ ] YouTube public, under 3:00, no copyrighted music or logos, Devpost embed plays
- [ ] Devpost under 600 words: pitch (with the Kiro spec line in paragraph 1), "Try it live in 45s," what it does (Autopsy, Trial, Certificate, Kiro spec), how fairness works (held-out grading), architecture image, real numbers, the quote (if approved), what's next. Divergence GIF at the top.
- [ ] KIRO.md (also in Devpost): feature | path | what it did | evidence. Covers specs, 5 hooks with real results, steering (a quoted rule and its effect), agents, MCP built and consumed, P1-P8, spec vs vibe table, "Where we fought Kiro." No rows for unshipped features.
- [ ] README first screen: tagline, 6s GIF, Live · Video · KIRO.md links, `docker compose up`, one safety line, the downloads-include-mirrors caveat
- [ ] Every claim checked: no unverified citation, shrink copy uses real stats only, "any migration" only if numpy shipped, quote only with written permission
- [ ] Cold viewer test: a friend can repeat "it checks whether an AI rewrite changed behavior, and writes down the changes as a spec"

**Bonuses**
- [ ] Best Startup: startup line, migrator-agnostic, numpy case, local CLI, human quote
- [ ] Best Demo: §9
- [ ] Blog (dev.to, Dec 2), with Kiroween 2026 in paragraph 1
- [ ] Social Blitz: 4 posts starting exactly `#KiroweenHackathon26`, each with one real observation and a screenshot, tagging the accounts the rules require
- [ ] Ghost of Kiroween Past: state the fit explicitly if the criteria (read Nov 17) match
- [ ] Student: only with proof of enrollment
- [ ] Credits requested Nov 17

---

## 11. Top 5 ways this could lose, and the counter for each

1. **"Another AI migration tool / py2 is old news."** **Counter:** lead with verification plus Kiro spec output, not the rewrite. Show a second migration (numpy 1 to 2), the held-out Comparison, and a real human quote. py2 is framed as case #1.
2. **"Self-graded / canned demo."** **Counter:** frozen-hash held-out grading with seeds printed on the certificate, P8 as a tested property, a Lazarus number reported even when it isn't 0, and live-first web with replay only as a labeled fallback.
3. **"Trivia wow."** **Counter:** the core moment is a real library producing a wrong total or corrupted bytes. round stays a 7s hook. If no real consequence exists, the Comparison number is the wow; we never stage one.
4. **Built but not finished.** **Counter:** scope cut on day 0 (no Power, Crew, BigQuery, teeth, Web, upload or paste), slice order CLI then Trial view then Certificate, certificate from fixtures Nov 24, script locked Nov 26, Nov 29 as a polish-only day, cut lines A, B and numpy decided in advance, and Dec 4 untouched.
5. **Kiro usage reads as a checklist, or as gaps.** **Counter:** formats verified Nov 18 and unverifiable features dropped before specs exist. Kiro is part of the product (generated specs, lazarus-mcp, shared agent prompts) and appears on video doing real work (failing property test, docker block, MCP certify), with `Kiro-Task:` trailers, hook logs and the spec vs vibe table as evidence.