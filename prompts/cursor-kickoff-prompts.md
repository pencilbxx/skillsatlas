# Cursor kickoff prompts

> **Current scope, 10 Sep:** read `docs/pitch-slide-text.md` before using any prompt below. WhatsApp is removed from the active demo and pitch. The final artefact is the **SkillsAtlas Interview Board**. The AI practice helper is a separate Andrew + Sri Karan task and needs its own agreed brief and branch.

Ready-to-paste prompts for the build. Each assumes the agent has read `AGENTS.md` and the rules (automatic when Cursor opens the repo root). Paste one, review the diff, commit, move to the next.

## P0 — Scaffold (day 1)

```
Scaffold the SkillsAtlas repo per AGENTS.md: Next.js App Router + TypeScript strict + Tailwind + shadcn/ui, lib/ folder with stubs for models.ts, schemas.ts, esco.ts, guardrails.ts, evidence.ts, ai.ts, supabase.ts, copy.ts (each with a header comment describing its contract from AGENTS.md), app/ with four placeholder routes (/, /evidence, /routes, /handoff) each rendering its screen name in large type, and a /api/health route that makes one cheap model call via lib/ai.ts and returns the response. In lib/models.ts, pin exactly two OpenAI model IDs as `extraction` and `reasoning` — check the current model catalogue first, do not use IDs from memory; leave a TODO comment with today's date if it cannot be reached. lib/ai.ts must log one line per call: model ID, token counts, latency, schema-valid yes/no. Add .env.example with exactly: OPENAI_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY. Do not add auth, WhatsApp, Google integrations, or any other dependency without asking.
```

## P1 — Schema and seeds (day 1–2)

```
Create the Supabase schema per AGENTS.md and .cursor/rules/40-data.mdc: workers, evidence_items (with the full field list from 20-evidence-domain.mdc), esco_cache, roles, courses, demo_runs. Enable RLS on every table with a single demo-anon policy (this is a seeded single-user demo — document that choice in docs/decisions.md). Write scripts/seed.ts that loads data/personas, data/roles, data/courses idempotently. Generate the two personas and the fixed role set now, following 40-data.mdc exactly: persona-redundant-worker, persona-qualification-gap, 8 roles across the four sector tabs with real ESCO URIs (query the ESCO API with selectedVersion=v1.2.0 to resolve them), and 12 real course entries from Skillnet, SOLAS Skills to Advance and Springboard+ with URLs.
```

## P2 — Evidence capture (day 2)

```
Build the parse-cv flow per .cursor/rules/10-ai-calls.mdc: POST /api/parse-cv taking raw CV text, using prompts/parse-cv.v1.md and the WorkerProfile Zod schema, models.extraction. Then the /evidence screen: left panel shows the parsed profile, every claim editable/removable, a confirm-all action that writes evidence_items with status=CONFIRMED and provenance. Follow 30-ui.mdc for states and evidence-class chips. The persona selector at the top loads data/personas/*.json as the CV source.
```

## P3 — Questioning engine (day 3)

```
Build the questioning engine per 20-evidence-domain.mdc: lib/evidence.ts scoring rubric with Vitest coverage, question selection (score<2 AND load-bearing, cap 3), POST /api/questions using prompts/generate-questions.v1.md, the checkQuestions guardrail (no protected traits, no repeats, reading level) with tests, the chat UI one-question-at-a-time with a visible Skip action, POST /api/fold-answers using prompts/fold-answers.v1.md writing enriched claims, and the loop (max 2 iterations) back through scoring. Show the score improvement on screen — before/after per claim.
```

## P3b — Questioning-engine eval harness (day 3, after P3)

```
Create scripts/eval-questions.ts wired to `pnpm eval:questions`: run the generate-questions route against both personas 5 times each (temperature as configured) and assert the three guardrails on every run: (1) no protected-trait content — check against the blocklist in lib/guardrails.ts, (2) at most 3 questions per run, (3) every question references an existing claim ID from the input profile. Print a one-line pass/fail summary per persona and a total. This harness is the responsible-AI evidence we show judges — "we test the boundary" — so keep the output readable enough to screenshot for the deck.
```

## P4 — Matching and routes (day 4–5)

```
Build matching per 20-evidence-domain.mdc: POST /api/match that normalises confirmed skills to ESCO (LLM candidates + deterministic resolve, cached), retrieves candidate occupations, applies the reachability rule, and returns exactly two routes. Then POST /api/explain-route using prompts/explain-route.v1.md on models.reasoning, and the /routes screen: two route cards with transferable skills (tappable provenance to the source claim), missing capabilities, courses, realism, caveats. Worker can reject a route or request adviser review (a simple flag + note field is enough).
```

## P5 — Plan and the board (day 6–7)

```
Build POST /api/plan using prompts/assemble-plan.v1.md, the commit-one-step UI, POST /api/adviser-summary, POST /api/evidence-pack using prompts/evidence-pack.v1.md (STAR stories only), POST /api/predict-questions using prompts/predict-questions.v1.md, a cache keyed by route + interview setting + evidence ids, and the never-invent gate in lib/guardrails.ts (every evidenceIds / evidenceHook must exist and be CONFIRMED; strip and log anything else, with tests). Screen 4 (/handoff) closes on the **SkillsAtlas Interview Board** and Save Interview Board as PDF. The Board has an interview-setting control (stage + who is in the room). Changing it regenerates questions only, not stories. Do not label it seniority. Do not add WhatsApp.
```

## P6 — Retired integration prompt

```
Do not run an integration task here. WhatsApp is removed from the active demo and pitch. Preserve historical code only if it already exists; do not surface it in the active UI. The current close is Save Interview Board as PDF.
```

## P7 — Golden run (day 9)

```
Add demo_runs capture: a script that runs both personas through the whole pipeline against the live APIs and stores every screen's data as a golden run. Add ?replay=golden support to all four screens so the full demo renders from stored data with zero live calls. Verify by disabling network and walking the demo.
```

## P8 — Final BPMN in Camunda Desktop Modeler

Use the dedicated prompt in `prompts/camunda-desktop-modeler-bpmn.md`.

That prompt tells Cursor to inspect local Camunda examples if they exist on the machine, author the real BPMN 2.0 file in Camunda Desktop Modeler, validate that it opens cleanly, reconcile it against the built demo routes, and save the final deliverable to `docs/bpmn/skillsatlas-evidence-agent.bpmn`.

## P9 — Second-developer onboarding (hand this to dev 2 on day 1)

```
You are joining the SkillsAtlas build as developer 2. Read AGENTS.md and .cursor/rules/ first — they are the ground rules. You own four modules with hard interfaces; the main developer owns the demo-path core and never shares files with you except lib/schemas.ts, which is frozen on day 2 (do not edit it — request changes via the main developer).

M1 · Seed data pack (days 1–3): data/personas/*.json, data/roles/*.json, data/courses/*.json per .cursor/rules/40-data.mdc. Two personas, 8 roles with real ESCO v1.2.0 URIs, 12 real courses with verifiable URLs. Done = `pnpm db:seed` runs clean and idempotent.

M2 · AI practice helper: follow `docs/ai-practice-helper-brief.md`. Create a separate branch and preserve the confirmed-evidence boundary. It must not invent facts or score the worker. On Screen 04 it sits before the PDF as the Hub WOW; the PDF stays the takeaway underneath. If the brief is not available, leave the helper out.

M3 · BPMN finalisation (days 8–10): follow prompts/camunda-desktop-modeler-bpmn.md exactly. Done = docs/bpmn/skillsatlas-evidence-agent.bpmn opens cleanly in Camunda Desktop Modeler and matches the built demo flow.

M4 · Golden-run capture (day 9): per P7. Done = `?replay=golden` walks all four screens with network disabled.

Work in feature branches named m1/m2/m3/m4, open draft PRs early, never commit directly to main. If a module slips, say so the same day — every module has a designed fallback and slipping is recoverable, silence is not.

Do not implement teammate HR worksheets as product: no SWOT, personality tests, competency-seniority ladders, ATS keyword matching, or employer-culture questions. Read docs/bridget-hr-feedback.md and the 1 Sep 2026 decision in docs/decisions.md. Matching stays ESCO evidence overlap. Screen 4 setting is stage + who is in the room, never seniority.
```
