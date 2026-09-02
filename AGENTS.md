# AGENTS.md — SkillsAtlas Evidence Agent

You are a coding agent working inside a two-week competition build (TechIreland National AI Challenge 2026, 28 Aug – 13 Sep). Read this file fully before touching anything. It is the project's ground rules.

## What this project is

SkillsAtlas is an **evidence agent** for workers affected by restructuring in Ireland. It extracts evidence from a worker's experience, matches it to real role requirements via the ESCO taxonomy, identifies the smallest credible skill gaps, asks the worker targeted follow-up questions to deepen weak evidence, and produces a gap-closing pathway plus a cheat-board — the artefact the worker leaves the room with. A pre-built WhatsApp **accountability partner** is a bonus: it can receive the committed next step for check-ins. It is not the closer.

**The deliverable is a proof of concept demoed live, not a production system.** The demo is three or four screens and about ninety seconds. Anything off that path is out of scope. Slides are due 13 September at 2pm — building stops before that.

## The demo path (the only thing that matters)

1. **Screen 1 — The problem:** a synthetic CV and the mess of "you've been assessed, here's a course list, good luck."
2. **Screen 2 — Evidence + questioning:** the agent parses the CV, the worker confirms, and the agent asks 2–3 sharp contextual questions that visibly strengthen the evidence.
3. **Screen 3 — Two reachable routes:** Route Explorer cards with transferable skills, missing capabilities, evidence classes, and a gap plan pointing at real Skillnet/SOLAS/Springboard+ courses.
4. **Screen 4 — Leave with the board:** adviser summary, one committed step, then the cheat-board (the artefact they walk out holding). Bonus: WhatsApp accountability partner receives that same step.

If a task does not serve one of these four screens, say so and stop.

## Hard constraints (never violate)

- **Never** suggest custom auth, Kubernetes, fine-tuning, training a model, or a heavy agent framework. One good agent with well-scoped tools; present role decomposition conceptually in the deck.
- **Never** infer protected traits (age, gender, health, family status, ethnicity, disability). The extraction schema has no such fields — do not add them, do not let the LLM emit them.
- **Never** rank human worth or employability. The agent proposes routes with evidence; humans decide.
- **Never** invent stories, metrics, tools, or company internals in any generated output. Every claim in the interview pack must trace to a `CONFIRMED` evidence item (the never-invent gate).
- The worker can **skip any question** without penalty, and **confirm or correct** all extracted evidence before it is used. Do not build flows that remove these exits.
- The accountability-partner privacy boundary is structural: the partner receives the *plan* only, never assessment internals; nothing said to the partner flows back into scoring. Do not create a data path that breaks this.
- The partner is an **accountability partner, not a counsellor**: it never advises on the person (only tracks the plan), never assesses mood or wellbeing, and its first message in every thread states plainly what it is and is not. Any signposting-to-supports text is a static, human-written card — never generated text.
- **AI provider is OpenAI only** (organiser-supplied credits). Pin exactly two model IDs in `lib/models.ts` — `extraction` tier and `reasoning` tier — checked against OpenAI's current pricing page on day 1. Do not use model IDs from memory. Do not add a second provider.
- Route by difficulty: cheap model for extraction/classification, expensive model only for the route-explanation reasoning step.
- Do not add Google Cloud / Vertex / AI Studio to anything. A GCP coupon exists but was deliberately deferred (requires a billing account; nothing in the demo needs it). Recorded in `docs/decisions.md`.

## Stack (chosen once, day one — do not revisit)

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js (App Router) + TypeScript | one repo, server routes for model calls |
| Data | Supabase (Postgres + storage) | one signup closes DB/auth/storage; table editor for non-technical teammates |
| Login | **Skipped** — one seeded demo worker | the demo is one person doing one flow |
| AI | OpenAI API via Vercel AI SDK (`generateObject` + Zod) | structured output; organiser credits; two pinned tiers |
| UI | shadcn/ui + Tailwind | looks finished with no design work |
| Hosting | Vercel, repo on a **personal** GitHub account (not an org — Hobby plan cannot deploy org repos) | nothing sleeps |
| Reference data | ESCO web-service API, `selectedVersion=v1.2.0` pinned | free, no key, canonical skills vocabulary |
| Accountability partner | Existing WhatsApp system (Python) — integrate via one outbound webhook + one inbound ack | already built; language boundary irrelevant at the webhook |
| BPMN | Camunda Desktop Modeler diagrams in `docs/bpmn/` — **design-only**, not executed | process blueprint for the deck; final `.bpmn` authored/validated in Desktop Modeler |

## Repo layout

```
app/                    # Next.js routes: /, /evidence, /routes, /handoff
  api/                  # server routes: parse-cv, questions, match, plan, pack, handoff
components/             # shadcn/ui + app components (one file per component)
lib/
  models.ts             # ALL model IDs pinned here — the only place
  schemas.ts            # ALL Zod schemas (WorkerProfile, EvidenceItem, RouteCard, PathwayPlan, EvidencePack)
  esco.ts               # ESCO API client (version pinned)
  guardrails.ts         # deterministic rule checks (protected traits, never-invent, question caps)
  evidence.ts           # scoring rubric, provenance, evidence classes
  supabase.ts           # client + typed helpers
data/
  personas/             # synthetic CVs (persona-redundant-worker.json, persona-qualification-gap.json)
  roles/                # fixed demo role set with ESCO URIs
  courses/              # fixed catalogue: Skillnet / SOLAS STA / Springboard+ entries
docs/
  bpmn/                 # Camunda blueprint (.bpmn files + exported PNGs); final file authored in Desktop Modeler
  decisions.md          # every decision, written down when made
  demo-script.md        # the 90-second narration, written week one, frozen day 10
.cursor/rules/          # project rules (read them)
prompts/                # the prompt library — system prompts live here, not inline in code
```

## Conventions

- **All LLM calls** go through `lib/ai.ts` (a thin wrapper over the AI SDK) with a Zod schema. No raw `fetch` to OpenAI anywhere else. No streaming unless the demo screen needs it. Every call logs one line: model ID, token counts, latency, schema-valid yes/no.
- **Prompts live in `prompts/`** as versioned markdown files (`parse-cv.v1.md`). Code imports them; never inline a prompt string in a route.
- **Every AI output is validated** by `lib/guardrails.ts` before it reaches a screen or the database. If validation fails, regenerate once, then degrade gracefully (skip the claim, log it).
- **Evidence classes** are an enum: `OBSERVED | REPORTED | PROPOSED | HUMAN_REVIEW`. PROPOSED content is never styled to look like fact in the UI.
- **Deterministic before AI:** if a step can be a SQL query, an ESCO GET, or a rule table, it is. Check the BPMN blueprint (`docs/bpmn/`) — `[CODE]` steps may not become model calls.
- TypeScript strict. No `any`. Server code only in `app/api/*` and `lib/*` — never call model APIs from client components.
- Commit early, deploy daily. `main` is always deployable. Feature-flag anything half-built.

## Setup commands

```bash
pnpm install
cp .env.example .env.local   # keys: OPENAI_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, PARTNER_WEBHOOK_URL
pnpm db:push                 # drizzle/supabase schema
pnpm db:seed                 # personas, roles, courses
pnpm dev                     # http://localhost:3000
```

## Testing instructions

- `pnpm test` runs Vitest. Every guardrail in `lib/guardrails.ts` must have tests — these are the responsible-AI boundary, they are not optional.
- `pnpm eval:questions` runs the question-generation eval harness against the two personas (checks: no protected-trait questions, ≤3 questions, each question references a specific claim).
- Before any commit: `pnpm lint && pnpm test`.

## BPMN authoring note

The repo may contain draft BPMN references, but the final process artefact must be authored and validated in **Camunda Desktop Modeler** on the project machine. Use the local examples in `C:\Users\IKARUS\Desktop\CURSOR PROJECTS\Camunda Test` as implementation references, then save the final file to `docs/bpmn/skillsatlas-evidence-agent.bpmn` and confirm it opens cleanly.

## Definition of done for the challenge

- The four-screen demo runs from a cold browser in 90 seconds on the deployed URL.
- A recorded full run of the demo exists in a second tab.
- `docs/bpmn/` diagrams match what the demo actually does.
- The deck quotes one real number with a source (see `docs/evidence-base.md`).
