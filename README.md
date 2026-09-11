# SkillsAtlas — evidence-first workforce transition

SkillsAtlas is a two-week proof-of-concept for the TechIreland National AI Challenge 2026. The active demonstration is one candidate-present sitting: confirm evidence → ask focused questions → choose between two role routes → save a SkillsAtlas Interview Board as PDF.

**Hub:** 14 Sep 2026. **Slides freeze:** 13 Sep 2026, 2pm.

**Live URL:** https://skillsatlas.vercel.app — clickable prototype in `docs/wireframes/`. Root `vercel.json` maps `/` onto that folder so a whole-repo Vercel deploy still opens the sitting.

## Source of truth

| File | Role |
| --- | --- |
| `docs/pitch-slide-text.md` | Canonical slide words, spoken script, Q&A, ownership, and freeze checklist |
| `docs/SkillsAtlas_Hub_Pitch_Slide_Text_TEAM_DRAFT.docx` | Team-commenting copy generated from the canonical Markdown |
| `docs/demo-script.md` | Short live-click narration |
| `docs/hub-rundown.md` | Timing and stage recovery plan |
| `docs/team-workplan-10sep.md` | Team ownership, branch order, helper boundary, and freeze gates |
| `docs/wireframes/demo.html` | Public prototype copy |
| `docs/wireframes/demo.js` | Public prototype state and interaction |
| `docs/brand.md` | Names, palette, and public terminology |
| `docs/pitch-deck-brand.md` | Deck-only brand sheet for Bridget |
| `docs/ai-practice-helper-brief.md` | Sri Karan’s Screen 04 practice-helper brief |
| `docs/decisions.md` | Product boundaries and dated decisions |
| `docs/evidence-base.md` | The only numbers the deck may quote |

The documentation map is `docs/README.md`. How to contribute is `CONTRIBUTING.md`. Older pitch drafts, canvases, field logs, and BPMN files remain research or design history. They are not sources for new public copy unless the canonical Team Draft explicitly adopts a line.

## Repository map

| Path | What it is |
| --- | --- |
| `docs/wireframes/` | Live clickable prototype. **Do not move** — this is the Vercel root. |
| `docs/` | Active pitch, brand, decisions, evidence |
| `docs/canvas/` | Current Lean Canvas |
| `docs/field-logs/` | Conversation notes. Not customer proof. |
| `docs/archive/` | Superseded decks and old canvases |
| `docs/bpmn/` | Design-only process drawings |
| `docs/explainer-remotion/` | Silent film source |
| `prompts/` | Future model prompts, not used by the live HTML demo |
| `scripts/` | Generators and `check-repo-health.py` |
| `data/` | Empty on purpose until the later Next.js seed work |

## Current story

> **A list gives you options. SkillsAtlas gives you proof.**

A job title or course list can show someone where they might go. It does not show the confirmed evidence, specific gap, and next step that make them credible for that route.

A warehouse worker’s CV says **“managed stock.”** The worker confirms the original line, answers or skips two short questions, and reviews any stronger wording before it may be used. Exactly two unranked role routes follow. The worker chooses and leaves with a **SkillsAtlas Interview Board**.

## The four active screens

The public URL includes **00 Start** for a judge opening it cold. The on-stage product path remains Screens 01–04, and the clicker starts on Screen 02.

1. **Problem** — a target title without the proof, gap, or next step.
2. **Evidence** — confirm the CV wording, answer or skip at most three questions, and separately confirm any strengthened wording.
3. **Two routes** — exactly two credible, unranked role routes. Learning options in the clickable prototype are illustrative unless verified and linked.
4. **SkillsAtlas Interview Board** — one next step, route-specific evidence story, question example by interview setting, and a real text PDF.

## Current commercial boundary

The worker uses SkillsAtlas. The organisation hosting the sitting is the proposed payer. The current model is not B2C.

The same candidate-present sitting may be hosted by an employment or outplacement adviser, or by a mid-tier recruiter meeting the candidate. A recruiter-alone CRM-search tool is a separate product and is not being built this week.

No organisation is presented as a customer, pilot, signed lead, or price signal.

## Active and parked work

**This narrative branch:** canonical narrative, prototype state integrity, two route-specific Boards, Interview Board PDF, existing silent film guidance, deck handoff, and rehearsal material.

**Next separate Cursor branch:** the AI practice-helper task assigned to Andrew and Sri Karan. Brief: `docs/ai-practice-helper-brief.md`. It is not implemented in this narrative branch.

**Removed from the active pitch and demo:** WhatsApp. Historical and code references remain for project history.

**Out of scope this week:** recruiter CRM search, B2C payment, candidate ranking, ATS keyword matching, personality or SWOT intake, extra screens, custom authentication, and a new film.

## Development notes

The deployed experience is a static clickable prototype, not the future Next.js application. Open this repository in Cursor so `AGENTS.md` and `.cursor/rules/` load before making code changes.

Local prototype:

```bash
cd docs/wireframes
python -m http.server 4173
```

Before a push, from the repo root:

```bash
python scripts/check-repo-health.py
node --check docs/wireframes/demo.js
```

If you changed `docs/pitch-slide-text.md`, regenerate the Word Team Draft with `python scripts/build-pitch-slide-text-docx.py`. Then inspect the complete click path, the skip path, direct Board navigation, and the downloaded PDF. Full contributor notes: `CONTRIBUTING.md`.
