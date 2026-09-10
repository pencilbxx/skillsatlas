# AGENTS.md — SkillsAtlas challenge build

Read this file and `.cursor/rules/` before changing the repository.

## Current product

SkillsAtlas is an evidence-first workforce-transition sitting for a worker and the professional already helping them. The active demonstration uses a prepared warehouse CV and follows four screens:

1. **Problem:** a target title without the confirmed evidence, specific gap, or next step that makes the route credible.
2. **Evidence:** worker confirms original CV claims, answers or skips focused questions, and separately confirms any strengthened wording.
3. **Two routes:** exactly two credible, unranked role routes with transferable evidence, a named gap, and an illustrative learning option.
4. **SkillsAtlas Interview Board:** route-specific story, one next step, question example by interview setting, and a real text PDF.

The public URL is https://skillsatlas.vercel.app. Screen 00 is a cold-link landing page, not a fifth product step. The on-stage click starts on Screen 02.

## Source of truth

`docs/pitch-slide-text.md` controls public narrative, slide words, spoken script, Q&A, and scope. `docs/SkillsAtlas_Hub_Pitch_Slide_Text_TEAM_DRAFT.docx` is generated from it for team comments.

The current hook is:

> **A list gives you options. SkillsAtlas gives you proof.**

Do not restore superseded claims from old decks, canvases, or historical notes without a new dated decision.

## Active scope

The worker uses SkillsAtlas. The organisation hosting the candidate-present sitting is the proposed payer. This is not B2C.

The same four screens may be hosted by an employment/outplacement adviser or by a mid-tier recruiter meeting the candidate. Recruiter-alone CRM search is a different product and is not being built this week.

WhatsApp is removed from the active demo and pitch. Historical and code references may remain. The AI practice helper is a separate assigned task for Andrew and Sri Karan; do not implement or redefine it unless the user explicitly asks for that task.

## Non-negotiable safeguards

- Never infer protected traits such as age, gender, health, family status, ethnicity, or disability.
- Never rank human worth, employability, or hiring likelihood.
- Never invent worker facts, stories, tools, metrics, company internals, course availability, customer status, prices, or outcomes.
- Preserve original CV wording. Put any rewrite in a separate proposed/enriched field.
- Nothing unconfirmed may reach matching, planning, the Interview Board, or PDF as worker fact.
- The worker can skip any question without penalty.
- Show exactly two unranked role routes. The worker chooses.
- Keep existing meetings, recruiters, job boards, and course catalogues in place. SkillsAtlas wraps the sitting; it does not replace those systems.
- Do not add personality tests, SWOT intake, competency/seniority ladders, ATS keyword matching, employer-culture inference, or a blocking adviser-approval step.

## Prototype truth

The deployed experience in `docs/wireframes/` is a static clickable prototype using prepared interactions. It does not run the future production AI pipeline. Do not claim live parsing, generation, guardrails, ESCO matching, course verification, persistence, or integration unless that capability is implemented and tested.

Use these labels consistently:

| Use | Avoid |
| --- | --- |
| SkillsAtlas Interview Board | cheat-board, evidence pack |
| two credible role routes | top jobs, ranked matches |
| illustrative learning option | real course, guaranteed place |
| question example | predicted question for a fixed string |
| clickable prototype, prepared practice CV | live AI product, pilot |

## Intended future stack

The future implementation plan remains Next.js App Router + strict TypeScript, Supabase, Vercel AI SDK with OpenAI, and ESCO v1.2.0. The current repository may not contain that application scaffold.

When it exists:

- All model calls go through `lib/ai.ts` with structured output and validation.
- Model IDs are pinned in `lib/models.ts` after checking the live catalogue; never choose them from memory.
- Prompts live in versioned Markdown files under `prompts/`, not inline in routes.
- Every AI output passes deterministic guardrails before display or storage.
- Deterministic work stays deterministic: SQL, ESCO lookup, scoring, caps, and provenance checks do not become model calls.
- TypeScript remains strict and `main` remains deployable.

## UI acceptance checks

Before a prototype commit:

1. Run `node --check docs/wireframes/demo.js`.
2. Complete the golden path from Evidence through PDF.
3. Skip both questions and verify the 2,400/SAP/date wording does not appear as confirmed evidence.
4. Open Routes and Board directly and verify they are labelled seeded previews.
5. Select each route and verify the Interview Board story, next step, and question change.
6. Download and inspect the PDF for both a confirmed and preview/skip state.
7. Confirm WhatsApp is absent from the active screens.
8. Confirm the separate AI practice helper has not been added by unrelated work.

## Definition of done for the Hub

The problem is understandable in one sentence. The four-screen click is truthful and completes in about 90 seconds. The existing silent film works locally. The Interview Board PDF downloads. The talker and clicker are different people. The team can state what is built, what is proposed, and what remains unproven without overclaiming.
