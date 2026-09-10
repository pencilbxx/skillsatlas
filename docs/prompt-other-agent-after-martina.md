# Copy everything below this line into the other agent. Do not add repo paths.

> **Historical prompt — do not use to generate current pitch or demo copy.** Active decisions now live in `docs/pitch-slide-text.md` and `docs/decisions.md`.

---

You are a product-and-pitch editor. You have not seen this repo. All context is in this prompt. Do not ask me to open files. Do not invent quotes, customers, metrics, prices, or company internals.

Write a **short** answer a founder can read in five minutes. Use **one concrete example** (a warehouse worker whose CV says “managed stock”) so roles stay obvious. End with a **do / don’t edit** list for the current demo and pitch. No methodology jargon. No invented character names.

## What I need from you

1. One paragraph: what this product is, in plain English.
2. One paragraph: the problem (prefer the “title without proof” angle if it is clearer than “you’ve been assessed”).
3. A tiny journey: who sits down, who clicks, who answers questions, who leaves with the PDF, who pays. Cover **two rooms** only — (a) a person just made redundant, sitting with an outplacement or local employment adviser; (b) the same kind of person sitting with a recruiter at a mid-tier agency. Make it obvious these are the **same four screens**, different human across the table.
4. Say clearly: this is **not** B2C unless we choose that later. The worker uses it; the organisation pays.
5. Say clearly: we are **not** building a recruiter CRM-search product this week.
6. Recommend: keep / change the Hub pitch, keep / change demo words, build / skip the voice AI helper on the last screen.
7. A post-challenge slide idea (one slide, later rooms) only if it does not confuse Saturday.
8. **Do not edit vs do edit** — screens, spoken lines, slides. Effort: we have about three days. Slides freeze 13 Sep 2026, 2pm. Hub pitch is 14 Sep. Judges score problem, demo, team. They do not read code.

If something would take a new product, say “don’t build — say it in one sentence instead.”

## The competition and the product (current, already built)

TechIreland National AI Challenge 2026. Challenge team name: RedeployMate. Product name on slides and URL: **SkillsAtlas**. Live clickable demo (HTML prototype, not a live model API): https://skillsatlas.vercel.app

The product is **one sitting, four screens after a start page**:

- **00 Start** — who we are, optional silent film. Judges who open the URL cold see this. On stage, the clicker must **not** start here.
- **01 Problem** — headline today: “You’ve been assessed. Here’s a course list.” Then left alone ~three weeks. A synthetic CV (warehouse operative): lines like “managed stock”, “helped new staff with safety”. A generic digital-skills PDF. Button: same CV as evidence.
- **02 Evidence** — agent parsed the CV. Person **confirms** each line (nothing is used until they say yes). Skip is free, no penalty. Then **2–3 questions** that make a weak line real (example: “managed stock” becomes ~2,400 SKUs in SAP, with a date). On-screen idea: **evidence, not a keyword**.
- **03 Two routes** — **exactly two** reachable job paths, not a job board, not “you would be hired.” Transferable skills, named gaps, one real Irish course (Skillnet / SOLAS Skills to Advance / Springboard+) only if a gap is real. Person clicks **Choose this path**. We do not rank people.
- **04 Board** — one next step this week; a one-pager for the adviser; STAR story from confirmed claims only; flip interview setting (phone / first / panel) and who is in the room (recruiter / hiring manager) — stories stay, questions change; **Save as PDF**. WhatsApp accountability partner is a **bonus**, not the close (four fields only; nothing said there comes back into scoring). A **voice AI helper** on the answers (from the CV, more questions, how to present better) was described in a field demo and **is in scope to add** on this screen. It is not fully on the page yet. The founder says it is feasible this week.

Silent process film (~52 seconds) already exists. Keep it. Do not recommend a reshoot unless unavoidable.

Hub talk is ~7 minutes: short problem → whole silent film → live click (~80s) starting on confirm/evidence, not 00 → who pays / scale / team / ask (Galway, then one sitting). Two people: talker never holds the mouse.

**Current locked ideas (still true unless you give a strong reason):** worker never pays; small organisation is the buyer; wrap their meetings and job board, do not replace them; confirm before use; max ~3 questions; skip free; two unranked jobs; never invent a story; no protected-trait fields (age, gender, health, etc.); no ranking human worth; no personality tests / SWOT intake / ATS keyword matching as the product; OpenAI only; no custom auth this fortnight.

**Numbers you may quote (already sourced):** this quarter ~700 contractor roles gone (Covalen / Meta, Jul 2026 press); 182,517 on the Live Register (Ireland, Aug 2026, CSO). Do not invent placement %, savings, or a price.

**Current pitch hook:** “Everyone else hands you a list. We hand you proof.” Spoken story still leans on: Ireland assesses people, course list, three silent weeks, “the adviser cannot choose the job for them,” office is the buyer. Deck design has **not** started. Spoken text is **not** locked. Demo words **can** change.

**Current buyer on slides:** small/mid Irish employment office (Intreo Partner–style sitting). Turas Nua / Enniscorthy is **context**, not a customer, not a logo.

## Field interview (10 Sep 2026) — facts only

Andrew (founder) phoned Martina, a Turas Nua officer in Enniscorthy, Ireland. Not a contract. He also walked her through the live URL.

**Jobseeker / office side**

- She does **not** decide the job. The **client chooses** where they want to work. She can guide and talk transferable skills.
- Support she named: interview practice (in person, mocks), speaking to employers, CV, toolkits, personal development — not “we place them in meeting 1.”
- Gap between appointments: she did **not** call it a designed three-week programme. She said it comes down to **caseload / time**.
- AI replacing her: many clients on a **long-term payment who do not want to work**; AI will not “manipulate that”; need a **person** for encouragement, coaching, case management.
- They already use some AI-ish interview help: she named **Flex** and **TN Connect** (as heard). TN Connect as she described it: add interview videos, a “complete story,” tailored interview for an industry, leave as a task.
- Asked if her process has gaps: **no**. Strong office. No success-rate numbers. Do not invent any.
- Walk-away: she will **mention it to managers**; **as an external tool it will not work** (must fit their workflow / sit in their systems for privacy); she suggested **focus on recruitment agencies**.

**Demo reactions (she clicked the site)**

- Problem screen: she recognised “you’ve been assessed, here’s a course list” — that **probably could be better**.
- Evidence: extra questions about experience; would be **really, really good if it beats keyword matching**.
- Two roles, not a job board: **quite good, saves them time** vs lots of choices. She chose a path.
- Board: STAR, then the **AI helper** idea (voice, from CV, better answers) — **“pretty cool actually.”**

**Agency side (conversation moved here; mixed turns; names as heard, not verified)**

- CRM is full of people; hard to search without **opening each CV**.
- Title can say **systems administrator** when they only did **training**, not the job.
- Limited emails per month; 100 emails, zero replies; then back to own CRM.
- Two hours in a rabbit hole, **no candidate**. **Time is money.** Saving time = gold.
- Evidence-in-the-CV (not just LinkedIn keywords) plus asking a few more questions if unsure = even better.
- Bigger money in **recruitment agencies** than employability companies (she agreed). Mix of big and small agencies. Would **not start** with a huge firm that has its own IT team (she mentioned AirEvo as heard — recruitment is only a branch).
- Price for SkillsAtlas: **she has no idea**. LinkedIn Recruiter she remembered as **thousands per month** (version, seats, job-ad caps). Jobs posted to many boards (LinkedIn, Irish Jobs, Indeed, etc.). Do not put a SkillsAtlas price on a slide.

**A teammate (recruiter brain) had asked before the call:** why can’t the adviser choose a job; can they advise local jobs in meeting 1; is three weeks mandatory; office data; drop-off after assessment 1; AI roadmap 2026; how we add value next to “700+ live roles” on their public site; would jobs outside their network be a problem. Several of those were **not answered**. Do not fill them in.

## What the founder is unsure about (you must help)

- “You’ve been assessed” **confused some people**. Maybe drop it.
- “The adviser cannot pick the job” was used as a spoken hook. The founder does **not** think it serves the one-breath. (It is still a **product rule**: we don’t rank; the person chooses.) You may keep the rule and drop it from the hook.
- Angle they like: **workforce transition + education.** Problem sentence: *workers facing redundancy can see the job title they should aim for, not the evidence, gaps, or steps that make them a credible candidate for it.* Is that B2C? They hope **not necessarily**.
- They will **not** build “B” this week: a recruiter-alone tool that searches the agency CRM and filters CVs by evidence with no candidate in the room.
- They **might** add one slide after the challenge: same sitting useful later for HR tech, recruitment, education, outplacement, regional workforce — **explain how** without a second product.
- AI helper on the board: **in scope**, they can build it. Close should stay Save as PDF.
- Design not started; pitch words not locked; demo copy can move.

## Hard no’s for your output

Do not claim Turas Nua or Martina as a customer. Do not diagnose her office as broken (she said it works well). Do not recommend ranking candidates. Do not recommend the worker paying. Do not invent a price. Do not recommend replacing their job board, CRM, LinkedIn, or TN Connect. Do not recommend a new film, Kubernetes, extra screens, or a consumer app this week.

## Output shape (keep it short)

Use these headings only:

**What it is**  
**The problem in one line**  
**Example (warehouse / “managed stock”)**  
**Room A — redundancy sitting (who does what)**  
**Room B — recruiter sitting (who does what)**  
**Who pays**  
**Saturday: change the current project?** (table: item / edit or leave / one-line why)  
**One-breath spoken (replacement)**  
**If a judge asks about agencies / CRM**

Write like a person. Short sentences. If two options are equal, pick one.
