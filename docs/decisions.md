# Decisions

Written down when made. Newest first.

## 4 Sep 2026 — Four rooms, one demo (possible later pivots)

**Decision:** Document four sittings we might wrap — Turas Nua, FIT, Women ReBOOT, Back to Work Connect. The product stays the four screens. The spoken sentence changes. Working map: `docs/partner-rooms.md`.

**This fortnight:** no APIs into those organisations. No extra screens. Do not put their logos on slides as customers. Default beachhead remains the Intreo Partner sitting (three-week gap). FIT / ReBOOT / Back to Work Connect are the same URL with a different one-liner if that office is the wrong door.

**CSO Live Register (August 2026)** is scale for the problem slide, not a fifth buyer. Quote only from `docs/evidence-base.md`. Do not ingest CSO age / sex / nationality into the schema or the demo.

**Do not:** clone ReBOOT intake, replace FIT’s catalogue, scrape Back to Work Connect, or claim a contracted provider as a signed customer.

## 1 Sep 2026 — HR feedback from Brigitte: take the language, not a second product

**Source:** Brigitte’s review of Andrew’s process talk (`Business Process Modeling - Feedback .docx`). HR examples, not a spec. Working map: `docs/bridget-hr-feedback.md`.

**Decision:** Keep SkillsAtlas as an **evidence agent**. Use her material where it already matches what we do. Do not rebuild the four screens as a competency-framework / personality / ATS product.

**Take (helps uniqueness, does not add screens):**

- Achievement statements as the *shape* of a strong claim: what they did, how, what changed. Same idea as our 0–3 score (tool + number + date).
- STAR on the cheat-board, with Action as the long part. CAR is the same story, different letters — do not add a second method.
- Treat “years of experience” and qualifications on a job spec as **guidelines**, not a gate. That is already our skills-first uniqueness.
- Name the risk: the agent must not quietly decide who is redeployed. We already designed this (confirm, skip, two routes, humans decide, never-invent). Say it in the deck. Do not claim WhatsApp is “no risk.”

**Do not build in the fortnight:**

- Personality tests, SWOT, or a second intake beside the CV.
- A 16-row competency matrix, seniority ladder (Basic → Advanced with year bands), or Personal Development Plan as product.
- ATS keyword matching. The challenge is compare **evidence**, not keywords.
- Question prediction from employer brand, values, or “organisational alignment.” We do not have that data; inventing it breaks never-invent.
- Inferring seniority from the CV, or labelling the Screen 4 control “seniority.” Setting = stage + who is in the room. Already decided 29 Aug.
- A blocking “adviser approves” step on the 90-second path.

**Why:** Her examples are how a good HR programme coaches people. Our unique thing is: confirmed evidence → two reachable ESCO routes → a board that only prints what they confirmed. If we copy ReBOOT / a competency grid, we look like every outplacement worksheet with a chatbot.

**BPMN:** no new boxes. Do not add SWOT, tests, seniority, or ATS. Optional later: one yellow note on the board that STAR spends most of the talking on Action and Result.

**Second developer:** read `docs/bridget-hr-feedback.md` before touching seed data, Screen 2, or the pack. Do not add fields for personality, SWOT, or competency ratings.

## 29 Aug 2026 — Interview setting toggle (not “seniority”)

**Decision:** Screen 4 lets the worker pick **interview setting** (stage + who is in the room). Changing it regenerates predicted questions only. STAR stories stay. Questions are a separate `[AI]` step with a cache keyed by route + setting + evidence ids, then a guardrail, then never-invent.

**Why:** Same evidence, different questions, is the live wow. A phone screen is not a hiring-manager panel.

**Do not:** infer how senior the worker is from the CV. Do not name the control “seniority.” Do not add a fifth demo screen — this is still Screen 4 (band 4b).

## 29 Aug 2026 — Cheat-board is the close; WhatsApp is bonus

**Decision:** Screen 4 ends on the cheat-board. That is the artefact the worker (and the judges) leave the room with. The WhatsApp accountability partner is a feature-flagged bonus (`NEXT_PUBLIC_ENABLE_PARTNER`). It does not block the 90-second path.

**Why:** A live room needs something you can point at and take away. A webhook receipt is easy to miss on stage. The board is visible. The partner still exists, with the same four-field privacy boundary — it is just not the last beat.

**Fallback:** if the board generator slips, ship a curated golden-run board per persona (same shape as the day-6 curated-route fallback). If the partner slips, leave the flag off.

**Do not change:** never-invent gate, worker confirm/skip, partner payload shape, no protected-trait fields.

## 28 Aug 2026 — GCP coupon deferred

**Decision:** do not add Google Cloud / Vertex / AI Studio. Organiser OpenAI credits are enough for the demo. GCP needs a billing account; nothing on the four screens needs it.

## 28 Aug 2026 — Stack frozen

**Decision:** Next.js App Router + TypeScript + Supabase + Vercel AI SDK + shadcn/ui + Vercel + ESCO v1.2.0. Login skipped (one seeded demo worker). Only sanctioned revisit: if TypeScript blocks the main developer by end of day 1, FastAPI + Jinja/HTMX. Decide that day, never later.
