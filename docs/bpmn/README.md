# SkillsAtlas — Camunda BPMN Blueprint (Design-Only)

**Status:** design artefact for the pitch deck and repo docs. The two-week demo runs on the lightweight stack (Next.js + Supabase + Vercel AI SDK); this BPMN model documents the process as it *would* run on Camunda 8 in production, and doubles as the architecture map for the demo build.

**Two files** — open in **Camunda Desktop Modeler**. If a tab still shows the old order, close it without saving and open these paths again.

| File | Use it for |
| --- | --- |
| `docs/bpmn/skillsatlas-4-screens.bpmn` | Team picture. Four rows, plain English. For a first-time viewer, not a developer. |
| `docs/bpmn/skillsatlas-evidence-agent.bpmn` | Full step map. Happy path ends on the board. WhatsApp is a side box, marked bonus. |

**How to read the colours** (same idea as the Ravens Point lab): amber = pitch slide, green = the person, blue = a model call, grey = a rule, teal = AI draft then ESCO pin, purple = another system, yellow sticky = the line you say out loud.

**Screenshot:** open the first tab → `Ctrl+0` (fit) → File → Export as image, or Win+Shift+S. The first tab is sized for one picture.

**Important:** this file is still design-only. A technical judge may open it later; reconcile it against the built demo before slides freeze. Local Camunda examples live in `C:\Users\IKARUS\Desktop\CURSOR PROJECTS\Camunda Test`.

**Modelling convention used throughout:**

| Marker | Meaning | Implementation in the demo |
| --- | --- | --- |
| **[CODE]** | Deterministic, programmed step. No model call. | TypeScript function, SQL query, ESCO API GET, rule check |
| **[AI]** | Non-deterministic step. LLM API call with structured output. | Vercel AI SDK `generateObject` with Zod schema |
| **[HUMAN]** | Human task. A person confirms, corrects, or decides. | UI screen / user task form |
| **[EXT]** | External system boundary. | Webhook / API call to an existing service |

Every **[AI]** step is followed by a deterministic validation or governance gate — this is the core Camunda agentic pattern (ad-hoc agent work wrapped in deterministic guardrails) and the answer to the challenge's responsible-AI boundary.

---

## Process 0 — Top level: `redeployment-evidence.bpmn`

One pool, four lanes. The demo path is the happy path from "CV uploaded" to "they leave with the cheat-board".

**Pool:** SkillsAtlas Evidence Agent
**Lanes:** `Worker` (the person) · `Evidence Agent` (the system) · `Adviser` (caseworker/provider, human review) · `External Services` (ESCO, course catalogues, WhatsApp accountability partner, cheat-board)

```
START: Worker referred / uploads CV
  │
  ▼
SUB-PROCESS: 1 · Capture & Confirm Evidence  ────────────────┐
  │                                                           │  (loop back if
  ▼                                                           │   worker corrects)
SUB-PROCESS: 2 · Questioning Engine (evidence deepening)      │
  │                                                           │
  ▼                                                           │
SUB-PROCESS: 3 · Match & Explain Routes                       │
  │                                                           │
  ▼                                                           │
SUB-PROCESS: 4 · Gap plan + adviser summary
  │
  ├── (bonus, does not block) [EXT] WhatsApp accountability partner
  │
  ▼
SERVICE TASK [AI]: Generate interview evidence pack
  │
  ▼
BUSINESS RULE [CODE]: Never-invent gate
  │
  ▼
SERVICE TASK [EXT]: Generate cheat-board   ← they leave the room with this
  │
  ▼
END: Worker walks out holding the board
```

**Timer event (boundary, on the WhatsApp bonus):** `P21D` — the three-week gap between appointments. Only relevant if the partner bonus is live. When it fires, the partner's check-in loop is already active (Process 5), and the worker returns to Process 1 with new evidence.

---

## Process 1 — Capture & Confirm Evidence

Maps to the SkillsAtlas "Capture" step: *tasks, skills, evidence, preferences and constraints — confirmed by the person.*

| # | BPMN element | Type | What happens |
| --- | --- | --- | --- |
| 1.1 | Start event "CV / case file received" | — | Synthetic CV uploaded (demo) or referred by provider |
| 1.2 | "Parse CV into structured profile" | Service task **[AI]** | LLM extracts roles, tasks, tools, achievements into `WorkerProfile` JSON (Zod schema). Never infers protected traits — schema has no fields for them |
| 1.3 | "Validate profile completeness" | Business rule task **[CODE]** | DMN-style rule table: minimum fields present? dates parse? If not → error event back to 1.2 with specific gaps |
| 1.4 | "Worker confirms the profile" | User task **[HUMAN]** | The governance gate. The person sees what was extracted, edits, removes, approves. *Nothing proceeds unconfirmed* — this is the "confirmed by the person" requirement |
| 1.5 | "Store confirmed evidence" | Service task **[CODE]** | Insert into Supabase `evidence_items` with provenance: `source=cv`, `status=CONFIRMED`, `confirmed_at`, `confirmed_by=worker` |

**Governance annotation:** every evidence item carries one of the four SkillsAtlas evidence classes — `OBSERVED` (sourced, dated), `REPORTED` (worker-supplied, coverage shown), `PROPOSED` (system hypothesis, never presented as fact), `HUMAN REVIEW` (person can correct/inspect/request adviser).

---

## Process 2 — Questioning Engine (the AI core)

The differentiator. The agent finds the *weakest* evidence and asks the worker targeted questions to strengthen it — context-aware, driven by what it already knows.

| # | BPMN element | Type | What happens |
| --- | --- | --- | --- |
| 2.1 | "Score evidence strength per skill claim" | Service task **[CODE]** | Deterministic rubric: specificity (has numbers/tools/dates?), recency, verifiability. Outputs `evidence_score` 0–3 per claim. No model call — cheap, fast, auditable |
| 2.2 | "Select weakest claims worth deepening" | Business rule task **[CODE]** | DMN table: score < 2 AND skill is load-bearing for a reachable route (checked against ESCO essential skills) → candidate for questioning. Cap at 3 questions per session (agency + fatigue guardrail) |
| 2.3 | "Generate contextual questions" | Service task **[AI]** | LLM receives: the weak claim, the worker's confirmed profile, the target ESCO skill labels. Generates one specific question per claim ("You wrote 'managed stock' — how many SKUs, and what system?"). Structured output: `{question, targets_skill, why_it_matters}` |
| 2.4 | "Guardrail check on questions" | Business rule task **[CODE]** | DMN rules: no questions about protected traits, health, family, age; no question the worker already answered; reading level ≤ simple English. Violation → error event, regenerate once, else skip claim |
| 2.5 | "Worker answers (or skips)" | User task **[HUMAN]** | Chat-style UI. Skip is always one tap and never penalised — worker agency is a scored criterion |
| 2.6 | "Fold answers into evidence" | Service task **[AI]** | LLM rewrites the claim with the new detail, preserving the worker's words. Output marked `status=CONFIRMED, source=cv+interview` |
| 2.7 | "Re-score and loop or exit" | Exclusive gateway **[CODE]** | Improved? Loop to 2.1 (max 2 iterations — demo constraint). Done → Process 3 |

**Why this is agent-shaped:** 2.1–2.7 is a perceive → decide → act → observe loop with deterministic guardrails around a non-deterministic core. In Camunda terms it is an ad-hoc sub-process wrapped in DMN gates; in the demo it is a server route with the same shape.

---

## Process 3 — Match & Explain Routes

Maps to "Connect" + "Explain": *role, demand, learning, regulation signals — with adjacency, missing capabilities, source dates, confidence and alternatives.*

| # | BPMN element | Type | What happens |
| --- | --- | --- | --- |
| 3.1 | "Normalise skills to ESCO" | Service task **[AI+CODE]** | LLM maps free-text skills to ESCO skill labels (candidate generation), then deterministic ESCO API `search?type=skill` resolves each to a canonical URI. Version pinned (`selectedVersion=v1.2.0`) |
| 3.2 | "Retrieve candidate occupations" | Service task **[CODE]** | ESCO API: for each confirmed skill, `resource/skill` → occupations where it is essential. Union, dedupe, filter to the demo's fixed role set (per the V2 "keep the evidence side thin" constraint) |
| 3.3 | "Score route reachability" | Business rule task **[CODE]** | DMN table per occupation: % essential skills already evidenced, gap size ≤ N, course exists for the gap, regulated-role flag. Outputs exactly **two reachable routes** (the challenge's own success shape) |
| 3.4 | "Explain the bridge" | Service task **[AI]** | LLM writes the human-readable route card: which confirmed skills transfer, which are missing, why this route is credible, what it would take. Every claim carries its evidence class and source date |
| 3.5 | "Worker inspects the routes" | User task **[HUMAN]** | Route Explorer screen. The person can reject a route, ask "why this?", or request adviser review → escalation event to the Adviser lane |
| 3.6 | Escalation sub-process "Adviser review" | User task **[HUMAN]** | Adviser sees the same evidence trail (never the partner layer). Can annotate, override, or hand back. Non-exclusionary by design: the agent proposes, humans dispose |

**Anti-keyword-matching note:** matching runs on ESCO essential/optional skill graphs and *evidenced* claims, not CV keyword overlap — this is the challenge's "compare evidence rather than keywords" requirement, and the OECD skills-first critique of credential-led screening.

---

## Process 4 — Gap plan, adviser page, then the board

Screen 4 is the leave-the-room artefact. WhatsApp is a bonus side path from the committed step — it does not block the close.

| # | BPMN element | Type | What happens |
| --- | --- | --- | --- |
| 4.1 | "Resolve gap-closing options" | Service task **[CODE]** | For each missing essential skill on the chosen route: look up the fixed catalogue — Skillnet networks, SOLAS Skills to Advance (via ETBs), Springboard+ courses. Deterministic join on skill label → course. Cost/duration/eligibility attached |
| 4.2 | "Assemble the pathway plan" | Service task **[AI]** | LLM sequences the smallest credible gap-closing steps into a plan with time/cost realism (a scored criterion). Output: `PathwayPlan` JSON — steps, course links, effort estimate, evidence each step produces |
| 4.3 | "Worker commits to one next step" | User task **[HUMAN]** | Not the whole plan — one step. This step is printed on the cheat-board. The WhatsApp bonus may also take it. |
| 4.4 | "Generate adviser summary" | Service task **[AI]** | One-page readable summary: confirmed evidence, chosen route, plan, open questions. Marked `HUMAN REVIEW` available |

---

## Process 5 — Accountability Partner Loop (bonus, integration only)

The accountability partner is already built. This process is **bonus** — the 90-second close does not depend on it. The demo shows it only if the webhook is live and the flag is on. Privacy rules do not relax: four fields out, nothing comes back.

```
[EXT] WhatsApp accountability partner (existing system)
  │  daily check-in, reflective MI-style conversation
  │  catches the repeating thought, names it back
  ▼
Message event: "Check-in completed / decision made / plan updated"
  │
  ▼
SERVICE TASK [CODE]: Update pathway progress (starts, completions)   ← "Learn" step
  │
  ▼
EXCLUSIVE GATEWAY: Appointment due? (timer P21D)
  ├─ no  → loop, keep partner active
  └─ yes → message worker back into Process 1 with new evidence
```

**What the demo shows if the bonus is on:** one receipt — the partner thread getting the committed step and the first check-in. Nothing more is built here. If the bonus is off, Screen 4 still ends on the cheat-board.

---

## Process 6 — Interview Evidence Pack & Cheat-Board (the close)

This is the last step of the 90-second demo. The worker (and the judges) leave the room holding it.

| # | BPMN element | Type | What happens |
| --- | --- | --- | --- |
| 6.1 | "Interview pack (STAR stories)" | Service task **[AI]** | Three stories from CONFIRMED evidence. Runs once. Questions are a later step. STAR only — do not add a competency-ladder or SWOT box here. |
| 6.2 | "Choose interview setting" | User task **[HUMAN]** | Worker picks stage and who is in the room. Not inferred. Not a seniority rank. |
| 6.3 | "Cache check for this setting" | Business rule **[CODE]** | Key: route + setting + evidence ids. Hit → reuse. Miss → predict. |
| 6.4 | "Predict interview questions" | Service task **[AI]** | 5–7 questions, each with a CONFIRMED `evidenceHook`. Cheap tier. |
| 6.5 | "Guardrail predicted questions" | Business rule **[CODE]** | No protected traits. Every hook is CONFIRMED. Cap 5–7. |
| 6.6 | "Never-invent gate" | Business rule **[CODE]** | Stories and questions must trace to CONFIRMED evidence. Untraceable content stripped. |
| 6.7 | "Cheat-board" | Send task **[EXT]** | They leave with this. |
| 6.8 | "Change setting?" | Exclusive gateway | Yes → regenerate questions only (`regenerate`). No → end. |

---

## Programmed vs AI — the summary table for the deck

| Layer | Programmed (deterministic, free, auditable) | AI (LLM API calls, structured output) |
| --- | --- | --- |
| Capture | Validation rules, storage, provenance | CV parsing into structured profile |
| Questioning | Evidence scoring rubric, question selection, guardrail DMN, loop control | Question generation, answer folding |
| Matching | ESCO API graph traversal, reachability DMN, two-route selection | ESCO label normalisation, route explanation |
| Gap plan | Course catalogue join, cost/time lookup | Pathway sequencing, adviser summary |
| Leave with the board | Cache, question guardrail, never-invent | STAR pack (once) + question prediction (per setting) |
| WhatsApp bonus | Webhook send, privacy boundary (four fields only) | — (partner AI lives in the existing system) |

**Cost shape:** roughly 6 LLM calls per full worker journey, all with structured output and cheap-model routing for extraction (per the blueprint's "route by difficulty" rule). Everything else is SQL, ESCO GETs, and rule tables.

## Responsible-AI boundary as process design

The challenge boundary ("do not infer protected traits or rank human worth; give users control; test for bias") is implemented as process structure, not policy text: the extraction schema has no protected-trait fields (1.2); every AI output passes a DMN guardrail before a human sees it (2.4, 6.2); the worker confirms all evidence before it is used (1.4) and can skip any question without penalty (2.5); adviser escalation is available at the decision point (3.6); and the partner privacy boundary is enforced by message shape on the WhatsApp bonus — surveillance is structurally impossible, not a setting. The closer is the cheat-board (6.3), which only prints CONFIRMED evidence.
