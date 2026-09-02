# Brigitte HR feedback — working map (1 Sep 2026)

Not a spec. HR examples from her review of Andrew’s process talk. Product decision: `docs/decisions.md` (1 Sep 2026).

Blue text in her doc is her voice. Cyan highlights were already in Andrew’s draft. Images are ReBOOT / Workjuggle / competency-framework examples — **do not copy them into the repo or the UI.**

---

## What she is really asking for

Help the worker **name transferable skills**, **show them against a role**, and **walk into an interview with a story**. That is already Screens 2–4. She is giving us the HR names for work we planned.

She also pasted the challenge statement and the evaluation criteria. Useful reminder: judges score **USP**, working demo, and **responsible AI** — not a full HRIS.

---

## Take — implement as copy / seed / board, not new screens

| Her point | What we already have | What to do in the fortnight |
| --- | --- | --- |
| Upload CV + confirm | Screen 2 | Keep. Confirm is the trust step. |
| Questions that fit this person | Sophia’s 2–3 contextual questions | Keep. Cap 3. Skip is free. Guardrail after. |
| Transversal → transferable skills | ESCO + “what already transfers” | Use **transferable** in the UI. Do not add a second skills language. |
| Core competencies on the job spec | Role essential skills from ESCO | When seeding `data/roles/`, pull from the **skills / competencies** part of a public spec. Years and qualifications are guidelines, not a lock. |
| How do I show it? | Questioning + STAR pack | On the board, stories follow STAR. Optional on-screen hint: Situation 10% · Task 10% · Action 50% · Result 30%. |
| Achievement formula (verb + what + impact) | Evidence score 0–3 | Questioning already asks for number, tool, date. Fold-answers keeps their words. Do not invent impact. |
| CAR | Same as STAR | One method on the board: STAR. If an adviser says CAR, it is the same story. |
| Critical gap: current → future | Screen 3 missing capabilities + course | Keep. This is the uniqueness. |
| Alternate progression (her IT grid) | Two reachable routes, not a job board | Keep two cards. Do not draw a seniority ladder. |
| AI must not quietly decide redeployment | Challenge boundary | Deck line + existing gates. Do not add a risk-register screen. |
| Accountability, not counsellor | Bonus partner | Keep the name **partner**. Four fields. Flag off if time is tight. |

---

## Avoid — would erase uniqueness or break the rules

| Her example | Why we do not build it |
| --- | --- |
| Personal SWOT + personality tests (ReBOOT / People Analytics) | Not evidence of work done. Personality inventories sit next to protected-trait inference. Extra intake kills the 90-second path. |
| 16×13 competency matrix as the matcher | Replaces ESCO. We would be a generic competency tool. Matching stays evidence vs essential skills. |
| Seniority bands (Basic 0–1.5 yrs … Advanced 7+) | We do not rank the person. We do not infer seniority from the CV. Screen 4 control is **interview setting**, not a grade. |
| Competencies → ratings → Personal Development Plan | Employer HR cycle. Out of scope. The leave-with artefact is the cheat-board, not a PDP. |
| ATS keywords | Challenge says compare **evidence**, not keywords. Keywords are what the broken handoff already does. |
| Question prediction from Brand / values / culture / company targets | We have no employer org graph. Inventing culture questions is never-invent. Prediction is **role + setting (stage, who is in the room) + CONFIRMED evidence**. |
| “After approval” as a gate | Adviser **sits with** the applicant. The demo does not wait for a case-worker click. |
| “So — no risk” on WhatsApp | We reduced the *kind* of risk (not a counsellor). We do not claim zero risk. Four fields + nothing comes back. |

---

## Uncertain — ask Brigitte before anyone codes it

1. **Competency matrix:** is that a real framework we may *label against ESCO* later, or only an IT teaching example? For the fortnight we use ESCO only.
2. **CAR vs STAR:** she showed both. We ship STAR. Confirm she is fine with one method on the board.
3. **Organisational alignment:** does the demo need a *named employer*, or a generic role? Default: generic role + ESCO. No fake company values.
4. **ReBOOT / Workjuggle job spec:** can we cite the programme as *context* (adviser in the room), or is the eir evo spec confidential? Do not paste that spec into seed data unless she says yes.
5. **“Non-work achievements”:** we can allow a confirmed claim from volunteering if the worker types it. We will not scrape social profiles or run a personality test to find it.

---

## Reply Andrew can send (plain English)

Thanks for this — the HR examples help a lot, especially how a weak line becomes a story an employer can check, and the reminder that years/qualifications are guidelines.

We are taking that into the four screens we already have:

- Screen 2 still turns experience into **confirmed evidence** (not a SWOT or a personality test — that would be a different product and we cannot infer traits).
- Screen 3 still shows **two reachable routes** and a real Irish course per gap. Transferable = what they already proved, mapped to ESCO, not ATS keywords.
- Screen 4 still ends on the **cheat-board**: STAR stories + predicted questions. The person chooses **interview setting** (screen / first / panel, recruiter / hiring manager). We will not guess seniority. We will not invent company culture questions we cannot source.
- The adviser gets a page they can keep. They can sit with the applicant. The live demo does not wait for an approve click.
- WhatsApp stays a **bonus accountability partner**, not a counsellor. If time is tight we drop it. We will not say “no risk.”

What would help next: which of your examples is “must show judges” vs “good for a later HRIS.” And can we use STAR only on the board, with CAR as the same story if you brief an adviser.

---

## Second developer — do / do not

**Do:** seed roles from ESCO essential skills; courses from Skillnet / SOLAS / Springboard+; STAR pack + predict-questions per setting; skip/confirm; never-invent tests.

**Do not:** add SWOT fields, personality scores, competency ratings, year-band seniority, ATS keyword lists, employer values, or extra BPMN boxes for those.

If a ticket says “implement Brigitte’s doc,” point here and at `docs/decisions.md`.
