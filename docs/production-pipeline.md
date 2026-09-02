# Production pipeline — two-week build plan

Day zero is 28 Aug (keys land). Slides freeze 13 Sep 2pm. That is twelve working days. This plan front-loads all plumbing risk into days 1–2 and all polish into days 9–11, leaving day 12 for rehearsal and contingency.

## Phase 0 — Day 1 morning: the plumbing sprint (before any feature talk)

Following the blueprint's day-one sequence, in order:

1. Repo on a **personal** GitHub account (not an org — Vercel Hobby cannot deploy org repos). Add everyone, including non-pushers.
2. Scaffold Next.js + TypeScript + Tailwind + shadcn/ui. No other configuration.
3. Create the Supabase project (EU region). Save credentials in a shared vault two people can reach.
4. Paste keys into `.env.local`; deploy to Vercel; confirm the public URL loads; send it to the group chat. **The link is now the project.**
5. Make one model call from a server route and print the answer on a white page. This is the riskiest wire in the build and it is now proven.
6. Schedule a keep-alive ping (cron-job.org hitting the URL every few hours — Supabase free pauses after a week idle; Vercel Hobby cron is too coarse for this).
7. Write the README: clone, install, run, env vars. Ten minutes, highest-value task of the day.
8. Drop `AGENTS.md`, `.cursor/rules/`, and `prompts/` from this kit into the repo. Everyone opens Cursor in the repo root so the rules load.

**Exit criteria:** live URL, one proven model call, README tested by a second person.

**Day-1 stack checkpoint (the only sanctioned revisit):** if TypeScript friction is genuinely blocking the main developer by end of day 1 — not discomfort, blockage — the sanctioned fallback is FastAPI + server-rendered Jinja/HTMX, single language, single service. Decide by end of day 1, never later. Default remains Next.js: one deploy, no CORS, best-in-class structured-output SDK, and the strongest Cursor codegen path.

## Phase 1 — Days 1–3: the evidence core

| Day | Build | Owner type |
| --- | --- | --- |
| 1 pm | Supabase schema: `workers`, `evidence_items`, `esco_cache`, `routes`, `courses`, `demo_runs`. RLS on every table as created | Builder 1 |
| 1 pm | `lib/esco.ts` with version pin + cache; seed `data/roles/` (6–10 roles) and `data/courses/` (real Skillnet/SOLAS/Springboard+ entries) | Builder 2 |
| 2 | `parse-cv` route + `WorkerProfile` schema + confirmation UI (Screen 2 first half) | Builder 1 |
| 2 | Evidence scoring rubric + question-selection rules in `lib/evidence.ts` / `lib/guardrails.ts`, with tests | Builder 2 |
| 3 | Questioning engine: `generate-questions` route, guardrail check, chat UI with skip, `fold-answers` route, loop control | Builder 1 + 2 |

**Exit criteria:** persona 1 goes CV → confirmed profile → 3 questions → strengthened evidence, end to end, on the deployed URL.

## Phase 2 — Days 4–6: matching and routes

| Day | Build |
| --- | --- |
| 4 | ESCO normalisation (AI candidate + deterministic resolve), occupation retrieval, reachability rules |
| 5 | `explain-route` route (expensive model tier), route explorer UI (Screen 3), provenance links |
| 6 | Gap plan: course join + `assemble-plan` + commit-step UI. **Hard checkpoint:** if matching does not produce two credible routes by end of day 6, fall back to a curated route pair per persona and show the reasoning on the curated data (kill-sheet question 10) |

**Exit criteria:** both personas get two route cards with provenance and a plan. Midpoint (≈5 Sep) passes with the demo path green.

## Phase 3 — Days 7–8: the board, then optional WhatsApp

| Day | Build |
| --- | --- |
| 7 | Adviser summary + `evidence-pack` + never-invent gate + cheat-board on Screen 4. This is the close — the artefact they leave the room with. |
| 8 | Bonus: WhatsApp accountability-partner webhook + receipt UI (what was sent / what was NOT sent), behind `NEXT_PUBLIC_ENABLE_PARTNER`. If it slips, the demo still ends on the board. |

## Phase 4 — Days 9–11: polish, golden runs, pitch

- Day 9: record golden runs for both personas into `demo_runs`; build `?replay=golden` fallback; freeze the demo path (only bug fixes on it from here).
- Day 10: presenter builds the deck from the finished demo (not ahead of it); BPMN diagrams exported from `docs/bpmn/` into the deck; the one real number with its source goes on slide 2; `docs/demo-script.md` frozen.
- Day 11: five full rehearsals out loud, on a clock; the three questions the team least wants asked, answered in writing; demo-runner checklist (recording in second tab, hotspot, warm-up pass).
- Day 12 (13 Sep): slides uploaded before 2pm. Building has already stopped.

## Roles (per the blueprint's seven-role model)

Team leader · problem owner · 2 builders · integrator (senior builder doubles) · designer · presenter · demo runner. Written daily updates per pair, one board attached to the repo, decisions written in `docs/decisions.md`.

## Two-developer split — and the solo fallback

The second developer gets only modules with hard interfaces, and every module has a designed "ship without it" fallback. If they deliver, it plugs in; if they don't, the demo path loses nothing. The onboarding prompt is `prompts/cursor-kickoff-prompts.md` P9.

| Module | Owner | Interface contract | If it doesn't land |
| --- | --- | --- | --- |
| Demo-path core (parse-cv → questioning → matching → routes → plan → pack → cheat-board) | Main dev | — | — |
| M1 · Seed data pack (personas, roles, courses) | Dev 2 | `data/*.json` against the Zod schemas; validated by `pnpm db:seed`. ESCO skills, not a competency matrix. Read `docs/bridget-hr-feedback.md` | Main dev hand-writes 2 personas + 6 roles + 8 courses (~3 h; P1 generates the shape) |
| M2 · WhatsApp accountability-partner handoff | Dev 2 | `POST /api/handoff` + receipt UI, behind `NEXT_PUBLIC_ENABLE_PARTNER` | Flag stays off; demo still ends on the cheat-board |
| M3 · Final BPMN in Desktop Modeler | Dev 2 | `.bpmn` opens cleanly; `modeler-notes.md` written | Deck uses the existing valid draft `.bpmn` |
| M4 · Golden-run capture + replay | Dev 2 (day 9) | `?replay=golden` renders all four screens offline | Main dev records one golden run via P7 (~2 h) |

Rules that make this safe: `lib/schemas.ts` is owned by the main dev and frozen on day 2; dev 2 works in feature branches `m1`–`m4` with draft PRs and never commits to `main`; everything dev 2 touches is behind a flag or a seed script, so half-finished work cannot break the deploy. **Solo plan:** drop M2 (WhatsApp bonus), do M1 on days 1–2, keep the draft BPMN, do M4 on day 9 — roughly one added working day, already absorbed by the schedule. The closer is still the cheat-board.

## The demo script

`docs/demo-script.md` is a first-class artefact: the 90-second narration, screen by screen, written by the presenter in week one and frozen on day 10. Judges experience the narration as much as the screens — the script is what makes the questioning-engine moment land ("watch 'managed stock' become '2,400 SKUs in SAP EWM'").

## Cost and risk shape

- ~6 LLM calls per worker journey; cheap tier for extraction/questions/folding, expensive tier only for route explanation. A full demo run costs cents.
- The three demo-day killers and their defences: model API down → `?replay=golden`; Supabase asleep → keep-alive ping; wifi dead → recorded run in a second tab plus hotspot.
