# Decisions

Written down when made. Newest first.

## 10 Sep 2026 — Repository layout for contributors

**Decision:** Keep canonical public paths stable. Reorganise everything else so a new contributor can find the live prototype, the pitch source, and historical research without mixing them.

- Do not move `docs/wireframes/` (Vercel root), `docs/pitch-slide-text.md`, `docs/brand.md`, `docs/decisions.md`, or `docs/evidence-base.md`.
- Python generators live in `scripts/`. Current Lean Canvas lives in `docs/canvas/`.
- Superseded pitch packs, teammate PDFs, and old canvas revisions live in `docs/archive/`. They are not sources for new public copy.
- Field notes live in `docs/field-logs/`.
- Local Cursor design tooling (`.cursor/skills/`, `.impeccable/`) stays untracked.

**Leave:** changing the Vercel project root, or treating archive files as current pitch copy.

## 10 Sep 2026 — Helper is the Hub WOW; PDF moves under it

**Decision:** If the AI practice helper ships in time, Screen 04 order is Interview Board → **Practice for interview** → Save Interview Board as PDF. The live-click close is the helper (one short prepared round). The PDF remains the artefact they take away, placed below, not deleted.

- Feature brief: `docs/ai-practice-helper-brief.md`.
- Do not put helper chat into the PDF.
- Do not turn the sitting into a Micro1-style hiring interview.
- If the helper is not implemented, labelled, and tested before freeze, keep the current PDF close.

**Leave:** changing `docs/pitch-slide-text.md` spoken close until the helper is on the URL and rehearsed.

## 10 Sep 2026 — Title-to-proof narrative and active-scope reset

**Decision:** Treat `docs/pitch-slide-text.md` as the canonical public narrative and generate `docs/SkillsAtlas_Hub_Pitch_Slide_Text_TEAM_DRAFT.docx` from it. The public hook is **“A list gives you options. SkillsAtlas gives you proof.”** The problem is title without proof, not a universal claim that an office leaves people alone for a fixed three weeks.

- Final artefact name: **SkillsAtlas Interview Board**.
- The live experience is described as a **clickable prototype using a prepared practice CV**, not a live production AI pipeline.
- The worker confirms, skips, and chooses. Any strengthened wording requires a separate worker-confirmation action before Routes, Board, or PDF may use it.
- Exactly two unranked role routes remain. Learning options are illustrative until a current listing is verified and linked.
- Same candidate-present sitting may be described in two rooms: worker + employment/outplacement adviser; candidate + mid-tier recruiter. The organisation is the proposed payer. This is not B2C.
- Recruiter-alone CRM search remains a different product and is not being built this week.
- WhatsApp is removed from the active demo and pitch. Historical and code references remain.
- The AI practice helper is a separate task for Andrew and Sri Karan. Do not add it to the canonical script until it is implemented and tested.

**Team ownership:** Don — pitch, spoken text, video feedback; Sophia — pitch feedback; Bridget — slide design; Andrew + Sri Karan — demo, video, and later AI practice-helper implementation.

**Field-evidence boundary:** the 10 Sep Martina conversation strengthened evidence-over-keywords and two constrained choices. It did not establish a customer, pilot, broken office, fixed three-week programme, external-tool fit, buyer, price, or CRM-search product.

## 9 Sep 2026 — Clickable sitting on the live URL

**Decision:** The Hub URL is the HTML sitting in `docs/wireframes/`, deployed to https://skillsatlas.vercel.app (Vercel project `skillsatlas`, Andrew’s Hobby). Not the Next.js app this fortnight. Brand tokens and names: `docs/brand.md`.

- **00 Start** is identity for a cold browser: SkillsAtlas / RedeployMate, shoreline, optional silent film. It is not a fifth product step on Hub slides. The sitting remains confirm → questions → two routes → board.
- Visual language follows the Ireland evidence atlas (coral `#ED6A4A`, navy, cream, shoreline). Do not pile identity onto the Problem screen.
- Last step on the board: **Save as PDF** downloads the interview board as real text. Do not screenshot an off-screen pack (that printed a blank page).
- Live URL is judge-only. No presenter script bar, no `?present=1`. Hub 90 seconds still starts at the problem / confirm (`docs/demo-script.md`, `docs/hub-rundown.md`).

**Leave:** RedeployMate as the product name on the URL or Hub slides.

## 9 Sep 2026 — Hub pitch as a story; Lean Canvas rev 5

**Source:** rewrite of `docs/pitch-slide-text.md` after the Enniscorthy conversation and the silent film landing.

**Decision:** The Hub talk is one story that works with or without slides. One bold idea per slide. Founder aha = Ireland already assessed them; the adviser cannot choose for them; they leave holding a board they wrote. Do not say “agentic orchestration” in the room — say the map of the sitting. Film is the shipped ~52s silent cut. Conversation is traction, not a customer logo.

**Lean Canvas:** `scripts/fill-lean-canvas.py` → rev 6, 9 Sep. Early-investor pass: real-world problem (titles without evidence / named gap / interview-ready) plus Ireland sitting numbers. OPEN is a booked sitting. Public URL still the walkthrough mock.

**Leave off the slides:** Turas Nua / Martina as customer; both ~700 and 182,517 on the same slide (700 on Slide 2; 182,517 as a tiny caption on Slide 6).

## 8 Sep 2026 — Answers to teammate deck “Over to You”

**Source:** `docs/archive/pitch/RedeployMate_Team_Presentation.pdf` slide 13. Full write-up for the Hub: `docs/archive/pitch/pitch-8sep-freeze.md`.

1. **Full assessment as a pre-step?** No. Confirm + 1–2 questions (cap 3, skip free) *in* their sitting. A pre-sitting replaces what they run.
2. **Flex questions if the CV is thin?** Yes, inside the cap. No deep at-home pass this fortnight.
3. **Two roles on screen; rank 5–10 inside?** Two on screen: yes. Ranked list or “show more”: no. Silent fallback if matching fails: yes.
4. **UVP + buyer gain?** Yes. List vs proof. Don’t replace the office. Time back. Something in the gap. No promised ROI.
5. **B2B-first, Turas Nua / Seetec?** Yes to office-first. Turas Nua = context, not a customer. Seetec = next office of the same type.
6. **Orchestration now, fine-tune Phase 2?** One agent + tools + confirm: yes, and true today. Fine-tune only after real outcomes. Do not pitch LangGraph or a fine-tuned model on 14 Sep.

## 8 Sep 2026 — Lean Canvas rev 4 (mum test)

**Source:** teammate deck `docs/archive/pitch/RedeployMate_Team_Presentation.pdf`, read the same way as the 7 Sep canvas pack. Fill: `scripts/fill-lean-canvas.py`.

**Decision:** The canvas is for a non-technical reader. Process in four steps. No stack, no 24-segment map, no “full assessment before the sitting,” no “show more” roles.

**Take from the deck:** today vs us (list → silent weeks vs confirm → two jobs → board); “everyone else hands you a list / we hand you proof”; we don’t replace the office; buyer gain is time back + something to show in the gap; confirm-before-use as trust; B2B office first.

**Leave in the deck, not on the canvas:** LangGraph, fine-tune, Gloat brand list, 15 B2B + 9 B2C segments, deeper at-home questions, ranking 5–10 roles, Turas Nua as a signed customer.

## 8 Sep 2026 — Lean Canvas rev 3 (teammate research: accept / leave)

**Source:** teammate pack `docs/archive/pitch/RedeployMate_LeanCanvas_and_Moat_Options.pdf` (7 Sep). Canvas fill: `scripts/fill-lean-canvas.py`. Output: `docs/canvas/lean-canvas-working.pdf`.

**Decision:** Keep SkillsAtlas, four screens, two routes, worker does not pay. Take the list-vs-proof UVP, Gloat-class as “not the beachhead,” Seetec as the next twin, and moat as orchestration + confirm-gate + partner outcome data. Do not become a B2C app, an internal-mobility platform, or a fine-tune demo this fortnight.

**Take (canvas + deck, not new screens):**

- UVP: everyone else hands a list; we hand proof (two reachable roles, confirmed, board).
- Alternatives: Gloat / Fuel50 / TechWolf need a job architecture — we run one person against ESCO on day one.
- Buyer: small/mid-tier Intreo Partner sitting. Turas Nua is context, not a logo-as-customer. Seetec is the verified twin.
- Later doors stay rooms: FIT / ReBOOT / Back to Work Connect (spoken sentence only). Unions after the hub.
- Moat: confirm/skip + guards + ESCO. Fine-tune parked until real placement outcomes exist. Not LangGraph as the product.
- Live Register 182,517 stays a problem-slide number, not a CSO pitch.

**Leave behind / not this fortnight:**

- Consumer download as a second canvas.
- Corporate HR / internal mobility as a High buyer (Gloat’s market; sounds like the agent decides who stays).
- Over-50s / women-returners / immigrants as schema segments.
- Intake as a full assessment before the caseworker sits down.
- Deeper at-home question pass; “show more” / rank 5–10 roles on screen.
- Fine-tuning on the Hub pitch. Rename to RedeployMate unless the team votes.

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
