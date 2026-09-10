# AI practice helper — brief for Sri Karan

**From:** Andrew  
**For:** Sri Karan  
**Date:** 10 Sep 2026  
**Hub:** 14 Sep 2026 · **slides freeze:** 13 Sep, 2pm

Read this file before you write code. Attach it in Cursor with the repo root open so the project rules load.

Andrew will pull your current commit first and reply. Do not merge to `main` until that review.

---

## In one breath

SkillsAtlas is not Micro1. Micro1 is an AI that **interviews people for a job**. Our helper is a **practice coach on Screen 04**, after the worker has confirmed their own CV evidence and chosen a route. They practise standing over **their** story. We do not hire, screen, or score them.

Sophia’s idea is the Hub WOW: a **Practice for interview** beat, a short back-and-forth, and tips on how to say the confirmed points more clearly. That must not become a hiring AI, and it must not turn the live click into a five-minute chat.

**Screen 04 order:** Board (STAR + setting + question) → **practice helper (demo close / WOW)** → Save Interview Board as PDF (they still take it away).

The PDF moves **below** the helper. It stays real. It is no longer the last spoken beat. If the helper is not ready for Saturday, the PDF is the fallback close.

---

## What is already live (do not rebuild this)

| Thing | Truth |
| --- | --- |
| Public URL | https://skillsatlas.vercel.app |
| Code | `docs/wireframes/demo.html`, `demo.js`, `demo.css` |
| What it is | A **clickable prototype** with a prepared warehouse CV |
| What it is not | A live Next.js / OpenAI / Supabase product |

There is **no** `lib/ai.ts` and **no** Next.js app in this repo. Ignore `docs/production-pipeline.md` and `prompts/cursor-kickoff-prompts.md` for this task. Those describe a future stack. This week’s Hub demo is the HTML sitting.

Hub clicker path (about 90–110 seconds, starts on Screen **02**, not 00):

1. Confirm CV lines → prepared answers → confirm stronger wording  
2. Choose one of two unranked routes  
3. Change one interview setting  
4. **Practice for interview** ← WOW / spoken close. One prepared round only on stage.  
5. Save Interview Board as PDF ← quieter, after the WOW. They still walk out holding it.

On the page, put the helper **before** the PDF row. Make **Practice for interview** the primary button. Make **Save Interview Board as PDF** a normal button underneath, not the climax.

Keep the helper moment to about **15–20 seconds**. Two clicks: open practice → show prepared answer / one follow-up + tips. Do not run a long Micro1-style interview on stage. Extra turns are fine in the product; the Hub clicker stops after the WOW.

---

## Micro1 and Sophia — what we take, what we leave

You shared [Micro1’s AI interview prep](https://www.micro1.ai/interview-prep/ai-engineer-interview-questions). Sophia said: if the user can click **practice for interviews** and get a similar interaction, plus feedback and tips, that would be great.

**Take**

- A clear **Practice for interview** control on the Board  
- Follow-up that uses **what they just said** and **what they already confirmed**  
- Tips that help them **say the confirmed evidence better** (shorter, STAR order, use the number / system / dates they confirmed)

**Leave**

- AI as the recruiter, screener, or hiring decision  
- Scoring the person, ranking “strong candidate”, or employability %  
- A full screening → technical → behavioural pipeline  
- A new product for “how recruiters find talent”  
- Recruiter CRM search (different product; not this week)

If a judge asks “are you Micro1?” the honest line is:

> They run an AI interviewer for hiring. We confirm evidence first, then the worker practises from that evidence. The professional stays in the room. They still leave with the Interview Board PDF.

---

## Must-ship this week (do this first)

A visible helper panel on Screen 04, **between the Board and the PDF**. This is the last thing the room should notice.

**Label it honestly.** Until a real model is wired and tested, say **prepared practice helper**, not “live AI interviewer”.

**Button copy:** **Practice for interview** (primary).  
**PDF copy:** **Save Interview Board as PDF** (secondary, below).

**One round is enough for Hub:**

1. Ask the current question example (already changes with route + interview setting).  
2. Worker types a short answer, or taps **Show a prepared answer**.  
3. Helper replies with:  
   - one follow-up question from the **same confirmed evidence**  
   - two or three tips on **how to say it**, not on whether they would be hired  
4. PDF stays visible **below**. Do not hide it. Do not make the worker finish practice before they can save.

**Voice extra (nice, not required):** play the question aloud (browser speech, or a short prepared clip). **Do not record the microphone** unless Andrew writes that decision down.

**Branch:** `feature/interview-practice-helper` from latest `main`.

**Files you should touch:** `docs/wireframes/demo.html`, `demo.js`, `demo.css`. Maybe a short note in `docs/wireframes/README.md`. Do not add a fifth screen.

---

## What the helper is allowed to know

`demo.js` already has this state. Use it. Do not invent a second source of truth.

| `evidenceState` | Helper may use |
| --- | --- |
| `base` (confirmed original CV, or they skipped detail) | Original **“managed stock”** / safety-paperwork line only. **Never** 2,400, SAP, or 2019–2024 |
| `enriched` (worker confirmed the stronger wording) | The confirmed stock wording, plus the chosen route’s STAR story |
| `unconfirmed` or `proposed` | Refuse. Say they need to finish Evidence first. No practice story. |

Also follow:

- `selectedRoute` (`a` or `b`) — story and questions change  
- interview setting (phone / first / panel + recruiter / hiring manager) — **question changes, facts do not**

If they skipped, a good helper line is: *“You confirmed ‘managed stock’. Practise standing over that. Do not add a number or system you did not confirm.”*

---

## Extra mile (only after must-ship works)

Do this in order. Stop when Hub rehearsal needs a frozen demo.

1. **Prepared conversation that feels like a chat** — 2–3 turns, still scripted, still honest.  
2. **Tips panel** — “use the number”, “put Action in the middle”, “one minute for a phone screen”. Tips must quote **confirmed** lines only.  
3. **One real model call** — only if you can label it live, keep a prepared fallback when the API fails, and still block unconfirmed facts. Keys stay in Vercel env / `.env.local`, never in git.  
4. **Voice out** — speak the question. No mic in.  

Do **not** spend the remaining days on a Micro1 clone, video interview, candidate scoring, or a new stack. Judges will watch one short practice beat, then know the PDF is still there. If the helper is slow or fragile, we drop back to PDF-as-close.

---

## Hard no

- Invent tools, numbers, dates, employers, or a better job story  
- Score, grade, or rank the worker  
- Put helper chat into the PDF (unless the whole team later agrees)  
- WhatsApp, CRM search, personality tests, extra screens  
- Claim prepared strings are a live model  
- Break skip, two routes, or the PDF download  
- Put the PDF above the helper, or make PDF the only primary button on Screen 04  
- Commit API keys  

Look and names: `docs/brand.md` (coral `#ED6A4A`, navy `#102B3F`, cream `#F7F4EF`, titles **DM Serif Display**, body **Manrope**). Product name **SkillsAtlas**. Artefact **SkillsAtlas Interview Board**.

---

## Done when

1. `node --check docs/wireframes/demo.js` passes  
2. Golden path: Board → helper WOW → PDF still downloads  
3. Skip path: helper never says 2,400 / SAP / 2019–2024  
4. Changing route or interview setting changes the helper  
5. On-stage helper is one short round (about 15–20 seconds)  
6. PDF remains available under the helper if we need the old close  
7. On-screen label matches reality (prepared vs live)

Andrew reviews the branch before anyone deploys.

---

## Cursor prompt (paste this)

```
You are adding the SkillsAtlas AI practice helper for the Hub demo.

Read AGENTS.md, .cursor/rules/, and docs/ai-practice-helper-brief.md first.

Work on a new branch feature/interview-practice-helper from current main.
Touch only docs/wireframes/ demo.html, demo.js, and demo.css unless a tiny README note is needed.

Build the must-ship helper on Screen 04 BETWEEN the Interview Board and the PDF row.
Practice for interview is the primary button and the Hub WOW / spoken close.
Save Interview Board as PDF moves below it as a secondary button. Keep the download working. Do not put helper chat in the PDF.
Use only confirmed evidence from existing demo.js state (evidenceState, selectedRoute, interview setting).
If the worker skipped, never introduce 2,400 / SAP / dates.
Label it prepared practice helper unless a real model is actually wired.
Do not record the microphone. Do not score the worker.
Do not scaffold Next.js. Do not add WhatsApp or a fifth screen.

When the must-ship path works, stop and summarise. Extra-mile chat / tips / live model only if I ask.
```

---

## If you are stuck

Open `docs/wireframes/README.md` and walk the sitting locally:

```bash
cd docs/wireframes
python -m http.server 4173
```

Then Screen 02 → skip once → Screen 04, and check the helper does not “help” by inventing the strong wording.
