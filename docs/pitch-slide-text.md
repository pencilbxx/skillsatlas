# SkillsAtlas — Hub pitch team draft

**Status:** working source of truth for team comments. This file controls the slide words, spoken words, live-demo narration, and generated Word Team Draft.

**Hub:** 14 Sep 2026. **Slides freeze:** 13 Sep 2026, 2pm.

**Product:** SkillsAtlas. **Challenge team:** RedeployMate.

> **Core narrative:** A list gives you options. SkillsAtlas gives you proof.

## How the team should use this document

Comment on the words before Bridget turns them into slides. Do not create a parallel speech or copy old wording from another deck. When this document changes, regenerate `docs/SkillsAtlas_Hub_Pitch_Slide_Text_TEAM_DRAFT.docx` with `python scripts/build-pitch-slide-text-docx.py`.

| Owner | Work in this round |
| --- | --- |
| **Don** | Pitch structure, spoken text, and feedback on the existing video. |
| **Sophia** | Pitch feedback. Flag anything unclear, unsupported, or hard to say aloud. |
| **Bridget** | Slide design after the narrative is agreed. Use only the **On the slide** lines as slide copy. |
| **Andrew + Sri Karan** | After this narrative branch is merged: polish the demo and existing video, then implement the AI practice helper as a separate task and branch. |
| **Everyone** | Protect the boundaries: no invented claims, no customer implication, no ranking, and no CRM-search pivot this week. |

The talker never holds the mouse. The clicker starts on Screen 02, not Screen 00. The existing film stays silent. WhatsApp is removed from the active pitch and demo; historical and code references can remain.

## What the Martina conversation changed

The 10 Sep conversation strengthened the **evidence** story. Martina responded positively to questions that go beyond keyword matching and to showing only two routes because that saves time. She also liked the idea of interview practice from the person’s own CV.

It did **not** show that Turas Nua is a customer, that its office is broken, that three weeks is a standard designed gap, that a standalone external tool fits its systems, or that anyone will pay a particular price. It also surfaced a recruiter CRM-search problem. That is a different product and is not being built this week.

## The product, in plain English

SkillsAtlas is a guided workforce-transition sitting for a worker and the professional already helping them. The worker confirms or skips CV claims, answers at most two or three useful questions, sees exactly two credible role routes, identifies a learning gap only when one is real, and leaves with a **SkillsAtlas Interview Board** saved as a PDF.

The worker uses it. The organisation hosting the sitting is the proposed payer. This is not B2C unless we deliberately choose that later.

## The problem in one line

A job title or course list can show someone where they might go. It does not show the confirmed evidence, specific gap, and next step that make them credible for that route.

## The example we use everywhere

A warehouse worker’s CV says **“managed stock.”** That is a claim, not yet proof. The worker confirms the original line and answers two short questions about scale, system, and dates. They review the stronger wording: **“Managed about 2,400 product lines in SAP, including monthly cycle counts, from 2019 to 2024.”** Only after confirmation may that wording reach the routes, Interview Board, and PDF. If the worker skips, the original weak claim remains.

## One breath

> A list gives you options. SkillsAtlas gives you proof. In one sitting, a worker turns their own CV into confirmed evidence, chooses between two credible role routes, sees the one gap that matters, and leaves with a SkillsAtlas Interview Board they can use. The worker uses it with the adviser or recruiter already beside them; the host organisation is the proposed payer.

## The stage shape

| Time | What | Projector |
| --- | --- | --- |
| **0:00–0:45** | Hook and problem | Slides 1–2 |
| **0:45–0:55** | Four-step title card | Slide 3 |
| **0:55–1:55** | Existing silent film, about 52 seconds | Slide 4 |
| **1:55–3:30** | Live clickable prototype | Slide 5, then browser |
| **3:30–6:20** | User and payer, difference, validation, team, ask | Slides 6–10 |
| **6:20–7:00** | Stop. Let the ask hold. | Slide 10 |
| **7:00–10:00** | Questions | Slide 10 |

## Slide 1 — Hook

**Bold idea:** A list gives you options. SkillsAtlas gives you proof.

**Picture:** One large line on cream. SkillsAtlas in the corner. No logos, statistics, or process diagram.

**On the slide**

- SkillsAtlas
- **A list gives you options. SkillsAtlas gives you proof.**
- TechIreland National AI Challenge 2026

**Spoken**

“A list gives you options. SkillsAtlas gives you proof.”

**Bridge:** “Because seeing the title is not the same as being able to stand over it.”

## Slide 2 — Problem

**Bold idea:** You can see the title. Not yet the proof.

**Picture:** A job title on one side. Three missing pieces on the other: evidence, gap, next step. Use the warehouse CV line **“managed stock.”**

**On the slide**

- **You can see the title. Not yet the proof.**
- Confirmed evidence
- The gap that matters
- One next step
- ~700 Covalen contractor roles cut · Jul 2026
- Source, small: Bloomberg / Los Angeles Times, Jul 2026

**Spoken**

“When somebody’s role disappears, a CV, vacancy, or course list can point at another title. It does not show the evidence they can stand over in an interview, the specific gap they need to close, or what to do this week. For a warehouse worker, ‘managed stock’ is not yet proof.”

Do not say the office abandoned them. Do not say three weeks is a fixed programme. Do not say the adviser should choose the job.

**Bridge:** “We use the same CV and make the evidence visible.”

## Slide 3 — The sitting

**Bold idea:** Confirm. Question. Two routes. Interview Board.

**Picture:** Four words only. No explanation grid.

**On the slide**

- **Confirm · Question · Two routes · Interview Board**
- The worker confirms, skips, and chooses.

**Spoken**

“Confirm. Question. Two routes. Interview Board. First on film, then on the laptop.”

## Slide 4 — Existing film

**Bold idea:** The map behind the sitting.

**Picture:** Use the existing silent film full-bleed. Do not reshoot it. Do not add music or narration.

**On the slide**

- Tiny caption only: **The map behind the sitting**

**Spoken before playback**

“This is the map behind the sitting: the system proposes, the worker confirms, and the worker chooses.”

Then stay silent until it ends.

**Film feedback for the team:** If an easy text-only re-render is possible, replace **“production path”** with **“the sitting”** and align the example with the warehouse case. Do not delay the deck or reshoot footage to do this.

## Slide 5 — Live clickable prototype

**Bold idea:** Watch one weak CV line become usable evidence.

**Picture:** Dark holding slide. The browser is the visual.

**On the slide**

- **The sitting — clickable today**
- Practice CV · prepared interaction
- skillsatlas.vercel.app

**Spoken before the browser**

“This is a clickable prototype using a prepared practice CV. The production AI pipeline is not live in this demo.”

**Live commentary**

“Nothing is used until the worker confirms it. Skip is free. Watch ‘managed stock.’ Two short questions add a number, a system, and dates. The worker reviews that wording. Now it is evidence, not a keyword.

Exactly two role routes. Not jobs available now, not a hiring promise, and not a ranking. The worker chooses. A learning option appears only for a named gap; the examples in this prototype are illustrative.

This is the SkillsAtlas Interview Board. The chosen route changes the story and question. The worker can change the interview stage and who is in the room. The close is the PDF they take away.”

**Clicker path**

1. Start on Screen 02 with the practice CV ready.
2. Confirm the two visible CV lines.
3. Show the two prepared answers.
4. Review and confirm the strengthened stock wording.
5. Open the two routes and choose one.
6. On the Interview Board, change one interview setting.
7. Save the Interview Board as PDF.

Do not show Screen 00 on stage. Do not show WhatsApp. Do not mention the separate AI practice-helper task unless it has been implemented, labelled honestly, tested, and added to this script before the freeze.

## Slide 6 — Who uses it and who pays

**Bold idea:** The worker uses it. The host organisation is the proposed payer.

**Picture:** One four-screen flow in the centre. Two human settings around it, not two products.

**On the slide**

- **Same four screens. Different professional across the table.**
- Redundancy sitting: worker + employment or outplacement adviser
- Recruiter sitting: candidate + mid-tier recruiter
- Worker confirms and chooses
- Organisation is the proposed payer
- **Not B2C**

**Spoken**

“In one room, a worker facing redundancy sits with an employment or outplacement adviser. In another, the same kind of worker sits with a recruiter. The professional can guide and click. The worker confirms, answers or skips, chooses the route, and leaves with the PDF. The worker does not pay; the host organisation is the proposed payer, and that still needs validation.”

This slide describes two candidate-present host settings. It does not claim either buyer is validated.

## Slide 7 — What makes it different

**Bold idea:** The trust is in what the product refuses to do.

**Picture:** A short confirmation trail: CV claim → worker confirms → question → worker confirms → Board.

**On the slide**

- Confirm before use
- Skip without penalty
- Two unranked routes
- No protected-trait fields
- No invented interview story
- Existing meeting and job board stay

**Spoken**

“We are not replacing the adviser, recruiter, job board, or course catalogue. We are not ranking a person’s worth. The worker can skip. The Board may use only evidence the worker confirmed. That confirmation trail—not a generic chatbot—is the product difference.”

## Slide 8 — What we need to prove next

**Bold idea:** The next step is one hosted sitting, not a national launch.

**Picture:** Three questions, not a growth chart.

**On the slide**

- Does the sitting fit the host’s workflow?
- Does the worker leave with a useful Interview Board?
- Will an organisation pay to host it?
- **Open: buyer, workflow fit, price**

**Spoken**

“We have a working clickable sitting and one useful field conversation. We do not have a customer, pilot, price, or placement result. The next proof is one hosted sitting: does it fit the workflow, does the worker use the Board, and will the organisation pay?”

Do not use the old 10 → 20 → 200 table as traction.

## Slide 9 — Team

**Bold idea:** The team combines field contact, pitch judgment, design, and a working demonstration.

**Picture:** Five names with one true contribution each. No inflated job titles.

**On the slide**

- **Don** — pitch, spoken story, video feedback
- **Sophia** — pitch review and clarity
- **Bridget** — slide design
- **Andrew** — field conversation, demo and video
- **Sri Karan** — demo, video and AI practice helper
- Challenge team · no signed buyer yet

**Spoken**

“Don and Sophia are making the story clear enough to say aloud. Bridget is turning the agreed words into the deck. Andrew brought the field conversation and is polishing the demonstration with Sri Karan. We have built something we can show. We will not pretend we already have a signed buyer.”

If any contribution line is inaccurate, the named person should correct it before the slide is designed.

## Slide 10 — Ask

**Bold idea:** Send us to Galway. Then help us test one sitting.

**Picture:** Two steps only: Galway → one hosted sitting. Contact and URL in the corner.

**On the slide**

- **Send SkillsAtlas to Galway.**
- Then help us test one hosted sitting.
- Practice data first. Real data only with agreed privacy and workflow controls.
- skillsatlas.vercel.app
- One real team email before freeze

**Spoken**

“Send SkillsAtlas to Galway. Then help us test one hosted sitting with the right organisation. We know what we have built, what remains a hypothesis, and what we need to learn next.”

Then stop.

## Talker script — continuous version

### 0:00–0:45 · Slides 1–2

“A list gives you options. SkillsAtlas gives you proof.

Because seeing the title is not the same as being able to stand over it. When somebody’s role disappears, a CV, vacancy, or course list can point at another title. It does not show the evidence they can stand over in an interview, the specific gap they need to close, or what to do this week. For a warehouse worker, ‘managed stock’ is not yet proof.”

### 0:45–0:55 · Slide 3

“Confirm. Question. Two routes. Interview Board. First on film, then on the laptop.”

### 0:55–1:55 · Slide 4

“This is the map behind the sitting: the system proposes, the worker confirms, and the worker chooses.”

Stay silent for the film.

### 1:55–3:30 · Slide 5 and browser

“This is a clickable prototype using a prepared practice CV. The production AI pipeline is not live in this demo.

Nothing is used until the worker confirms it. Skip is free. Watch ‘managed stock.’ Two short questions add a number, a system, and dates. The worker reviews that wording. Now it is evidence, not a keyword.

Exactly two role routes. Not jobs available now, not a hiring promise, and not a ranking. The worker chooses. A learning option appears only for a named gap; the examples in this prototype are illustrative.

This is the SkillsAtlas Interview Board. The chosen route changes the story and question. Change the interview setting. The close is the PDF they take away.”

### 3:30–6:20 · Slides 6–10

“The same four screens can sit in two rooms. A worker facing redundancy can use them with an employment or outplacement adviser. The same kind of worker can use them with a recruiter. The professional guides. The worker confirms, skips, and chooses. The organisation is the proposed payer. This is not B2C.

The trust is in what SkillsAtlas refuses to do. We do not replace the professional or their job board. We do not rank a person’s worth. We do not ask for protected traits. We do not print an interview story the worker did not confirm.

We have a working clickable sitting and one useful field conversation. We do not have a customer, pilot, price, or placement result. The next proof is one hosted sitting: does it fit the workflow, does the worker use the Board, and will the organisation pay?

Don and Sophia are making the pitch clear enough to say aloud. Bridget is turning the agreed words into the deck. Andrew brought the field conversation and is polishing the demonstration with Sri Karan. We have built something we can show. We will not pretend we already have a signed buyer.

Send SkillsAtlas to Galway. Then help us test one hosted sitting with the right organisation.”

### 6:20–7:00

Stop. Leave Slide 10 up.

## Short Q&A answers

| If a judge asks | Answer |
| --- | --- |
| **Is the AI live in this demo?** | “No. This is a clickable prototype using a prepared practice case. It demonstrates the sitting and the controls. The production design uses model output behind confirmation and deterministic checks.” |
| **What did the adviser conversation prove?** | “It strengthened the evidence-over-keywords idea and the value of showing two routes. It did not create a customer, pilot, buyer, price, or proof that a standalone tool fits their workflow.” |
| **Why only two routes?** | “A long list repeats the problem. Two credible, unranked routes create a choice the worker can discuss with the professional beside them.” |
| **Who pays?** | “The worker uses it. The organisation hosting the sitting is the proposed payer. We still need to validate buyer authority, workflow fit, privacy requirements, and willingness to pay.” |
| **What about recruitment agencies and CRM search?** | “A recruiter CRM-search problem emerged in conversation, but it is a different product. Today we show a candidate-present sitting. We are not claiming CRM access, integration, security approval, or candidate ranking.” |
| **Are those courses live recommendations?** | “No. They are illustrative learning options in this prototype. Production would show a provider option only when it closes a named gap and its listing is current and verified.” |
| **Is Turas Nua a customer?** | “No. We had one field conversation and prototype walkthrough. It is not a contract, pilot, logo, or pipeline claim.” |
| **Why not sell to the worker?** | “We are B2B-first because the sitting already has a professional and organisational context. The worker uses the product and does not pay in this model.” |
| **What about WhatsApp?** | “It is not in the active demonstration or pitch. The Interview Board PDF is the close.” |
| **What is the AI practice helper?** | “It is a separate demo task for tomorrow. We will describe it only after it is implemented and tested. It must use confirmed evidence and must not invent or score the worker.” |

## Words and claims to keep consistent

| Use | Avoid |
| --- | --- |
| SkillsAtlas Interview Board | cheat-board, evidence pack, board they wrote |
| two credible role routes | jobs you can get, top jobs, ranked matches |
| learning option | real course, guaranteed place, available course |
| clickable prototype, prepared practice CV | live AI product, production system, pilot |
| worker confirms, skips, and chooses | the system decides, adviser chooses |
| organisation is the proposed payer | the office pays, proven buyer, price |
| field conversation | customer, traction, lead, partnership |
| question example | predicted question, unless live generation is implemented and tested |

## Freeze checklist

- [ ] Don and Sophia have commented on the opening, problem, one-breath line, and spoken script.
- [ ] Bridget has confirmed the slide words fit the design without shrinking the type.
- [ ] Andrew and Sri Karan have rehearsed the live click from Screen 02 through the PDF.
- [ ] The demo no longer shows enriched evidence after the worker skips.
- [ ] The strengthened wording has a separate worker review-and-confirm action.
- [ ] Route B uses only evidence visible and confirmed in the practice case.
- [ ] The selected route changes the Interview Board story and question.
- [ ] Course rows say **illustrative learning option** unless the listings are verified and linked.
- [ ] WhatsApp is absent from the active demo and spoken pitch.
- [ ] The AI practice helper remains outside this script until tomorrow’s implementation is tested.
- [ ] The film is copied locally and the browser backup is ready.
- [ ] Slide 9 contribution lines are confirmed by each named team member.
- [ ] Slide 10 has one real email and the correct URL.
- [ ] Full rehearsal reaches the ask by 6:20, once with the projector off.

## Files that control the active experience

| File | Role |
| --- | --- |
| `docs/pitch-slide-text.md` | Canonical narrative, slides, spoken script, Q&A |
| `docs/SkillsAtlas_Hub_Pitch_Slide_Text_TEAM_DRAFT.docx` | Team commenting copy generated from the canonical narrative |
| `docs/demo-script.md` | Short clicker/talker live-demo script |
| `docs/hub-rundown.md` | Timing and recovery plan |
| `docs/wireframes/demo.html` | Public prototype words |
| `docs/wireframes/demo.js` | Public prototype state and interactions |
| `docs/brand.md` | Naming, visual tokens, and final-artefact terminology |
| `docs/pitch-deck-brand.md` | Deck-only brand sheet for Bridget (look and names, not slide copy) |
| `docs/ai-practice-helper-brief.md` | Sri Karan’s helper brief (Screen 04 practice; not a Micro1 hiring AI) |

Older pitch drafts, canvases, and field logs remain evidence or history. They are not sources for new public wording.
