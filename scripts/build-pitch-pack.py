"""Build the team Word pack: ten slides + evidence base + comments."""

from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from docx.shared import Cm, Pt, RGBColor

# Historical generator. Current Hub copy is docs/pitch-slide-text.md + scripts/build-pitch-slide-text-docx.py.
OUT = Path(__file__).resolve().parents[1] / "docs" / "archive" / "pitch" / "SkillsAtlas_Pitch_Contents_Team_Pack.docx"

NAVY = RGBColor(0x1B, 0x2A, 0x4A)
CORAL = RGBColor(0xC4, 0x56, 0x3A)
BODY = RGBColor(0x2C, 0x2C, 0x2C)
MUTED = RGBColor(0x5A, 0x5A, 0x5A)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
HEADER_FILL = "1B2A4A"
ALT_FILL = "F4F1EA"
COMMENT_FILL = "F7EDE6"


def shade(cell, hex_color: str) -> None:
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:fill"), hex_color)
    shd.set(qn("w:val"), "clear")
    tcPr.append(shd)


def set_run(run, *, size=11, bold=False, italic=False, color=BODY, name="Calibri"):
    run.font.name = name
    run._element.rPr.rFonts.set(qn("w:eastAsia"), name)
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    run.font.color.rgb = color


def add_p(doc, text, *, size=11, bold=False, italic=False, color=BODY, space_after=8, space_before=0):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
    run = p.add_run(text)
    set_run(run, size=size, bold=bold, italic=italic, color=color)
    return p


def add_rich(doc, parts, *, space_after=8):
    """parts: list of (text, kwargs)."""
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.space_before = Pt(0)
    for text, kwargs in parts:
        run = p.add_run(text)
        set_run(run, **kwargs)
    return p


def heading(doc, text, level=1):
    p = doc.add_heading(text, level=level)
    for run in p.runs:
        run.font.color.rgb = NAVY
        run.font.name = "Calibri"
        run._element.rPr.rFonts.set(qn("w:eastAsia"), "Calibri")
    return p


def bullet(doc, text, *, bold_lead=None):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.space_before = Pt(0)
    if bold_lead:
        r = p.add_run(bold_lead)
        set_run(r, bold=True, size=11)
        r2 = p.add_run(text)
        set_run(r2, size=11)
    else:
        r = p.add_run(text)
        set_run(r, size=11)
    return p


def comment_box(doc, title, lines):
    table = doc.add_table(rows=1, cols=1)
    table.autofit = True
    cell = table.cell(0, 0)
    shade(cell, COMMENT_FILL)
    cell.text = ""
    p0 = cell.paragraphs[0]
    p0.paragraph_format.space_after = Pt(4)
    r = p0.add_run("COMMENT — " + title)
    set_run(r, size=10, bold=True, color=CORAL)
    for line in lines:
        p = cell.add_paragraph()
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.space_before = Pt(0)
        rr = p.add_run(line)
        set_run(rr, size=10.5, color=BODY)
    doc.add_paragraph().paragraph_format.space_after = Pt(10)


def add_table(doc, headers, rows, col_widths=None):
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.style = "Table Grid"
    table.autofit = True
    for i, h in enumerate(headers):
        cell = table.rows[0].cells[i]
        shade(cell, HEADER_FILL)
        cell.text = ""
        p = cell.paragraphs[0]
        r = p.add_run(h)
        set_run(r, size=10, bold=True, color=WHITE)
    for ri, row in enumerate(rows):
        for ci, val in enumerate(row):
            cell = table.rows[ri + 1].cells[ci]
            if ri % 2 == 1:
                shade(cell, ALT_FILL)
            cell.text = ""
            p = cell.paragraphs[0]
            r = p.add_run(val)
            set_run(r, size=10)
    if col_widths:
        for row in table.rows:
            for i, w in enumerate(col_widths):
                row.cells[i].width = Cm(w)
    doc.add_paragraph().paragraph_format.space_after = Pt(8)
    return table


def slide_banner(doc, number, title, idea):
    table = doc.add_table(rows=1, cols=1)
    cell = table.cell(0, 0)
    shade(cell, HEADER_FILL)
    cell.text = ""
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(2)
    r = p.add_run(f"SLIDE {number}  ·  {title.upper()}")
    set_run(r, size=14, bold=True, color=WHITE)
    p2 = cell.add_paragraph()
    p2.paragraph_format.space_after = Pt(0)
    r2 = p2.add_run(idea)
    set_run(r2, size=11, italic=True, color=RGBColor(0xF5, 0xEB, 0xCE))
    doc.add_paragraph().paragraph_format.space_after = Pt(8)


def subhead(doc, text):
    add_p(doc, text, size=12, bold=True, color=NAVY, space_after=4, space_before=8)


def build():
    doc = Document()
    section = doc.sections[0]
    section.top_margin = Cm(1.8)
    section.bottom_margin = Cm(1.8)
    section.left_margin = Cm(1.8)
    section.right_margin = Cm(1.8)

    header = section.header
    hp = header.paragraphs[0]
    hr = hp.add_run("SkillsAtlas  ·  Pitch contents for the team  ·  not a designed deck")
    set_run(hr, size=8, color=MUTED)

    footer = section.footer
    fp = footer.paragraphs[0]
    fp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    fr = fp.add_run("Hub 14 Sep 2026  ·  Galway 24 Sep  ·  slides freeze 13 Sep 2pm")
    set_run(fr, size=8, color=MUTED)

    # Cover
    add_p(doc, "SKILLSATLAS", size=12, bold=True, color=CORAL, space_after=4)
    add_p(
        doc,
        "Pitch contents for the team",
        size=26,
        bold=True,
        color=NAVY,
        space_after=6,
    )
    add_p(
        doc,
        "Ten slides, comments, evidence base, and a four-minute speech.\n"
        "Contents only — do not design yet. After research comes back we combine one picture.",
        size=12,
        color=BODY,
        space_after=10,
    )
    add_table(
        doc,
        ["When", "What"],
        [
            ["13 Sep, 2pm", "Slides freeze. Building stops."],
            ["14 Sep", "Hub showcase. Pitch + live demo. Strongest teams go through."],
            ["24 Sep", "National AI Meet, Galmont Hotel, Galway — only if we go through."],
        ],
    )
    add_p(
        doc,
        "Judges score the problem, the demo, and the team. They do not read the code. "
        "A chatbot with a pretty UI loses to a 90-second path a stranger can see.",
        size=11,
        italic=True,
        color=MUTED,
    )

    heading(doc, "How to use this pack", 1)
    bullet(doc, "Read mentor notes and the evidence rules before you rewrite a headline.")
    bullet(doc, "Pick a slide (or a research box). Decide who does what as a team — this pack does not assign people.")
    bullet(doc, "Bring back: a headline, a proof (source + date), and anything you cannot prove so we cut it.")
    bullet(doc, "Then we combine into one picture and write the spoken text. Do not design yet.")
    bullet(
        doc,
        "Persona colour (2,400 SKUs, SAP) is from the synthetic CV. Say it only while that line is on screen. It is not an Ireland statistic.",
    )
    subhead(doc, "Example — use AI as a research assistant (not as the author)")
    add_p(
        doc,
        "You pick Slide 6 (traction / conversations). You copy that slide’s “on the slide” lines, the evidence rules "
        "(only quote numbers that already have a source), and the research box. You paste this into ChatGPT, Claude, or Cursor:",
        size=10.5,
    )
    add_p(
        doc,
        "“I am researching Slide 6 of a TechIreland pitch. Mentors said open conversations with potential clients are a judging bonus. "
        "Find 3 small or mid-tier Irish employment / ETB / outplacement contacts we could actually call this week. "
        "For each: organisation, rôle, public phone or email, and why they fit small/mid-tier. "
        "Do not invent a quote. Do not invent that we already spoke to them. Do not add statistics that are not in this pack.”",
        italic=True,
        size=10.5,
        color=NAVY,
    )
    add_p(
        doc,
        "Then you do the human part: you call one of them. You log date, what they said, whether we may name them. "
        "That log is what goes on the slide. The AI list is not traction. A conversation is.",
        size=10.5,
    )

    heading(doc, "1. What mentors asked us to land", 1)
    add_p(
        doc,
        "Treat these as brief for the live ten. If a slide fights this section, the slide is wrong.",
    )

    heading(doc, "Open conversations with potential clients", 2)
    add_p(
        doc,
        "A mentor said this is a huge bonus for judging. A working demo proves you can build. "
        "A real conversation proves the problem exists outside the team.",
    )
    bullet(doc, "This week: start named conversations (ETB adult guidance, Intreo-linked provider, employer outplacement, union redundancy desk).")
    bullet(doc, "Log honestly — date, rôle, what they said, what they would try. See Slide 6.")
    bullet(doc, "“In conversation with…” beats a fake logo wall. “They signed” needs a document. “We’re booking a call” is allowed if it is true.")
    bullet(doc, "Use one mentorship slot on concept + pitch format and judging criteria, not on extra features.")

    heading(doc, "Scalability — how 10 becomes 200", 2)
    add_p(
        doc,
        "Mentors asked how we get 10, then 20, then 200 users. Not a national launch. Copy the sitting. "
        "Each gate must convert before the next opens. Lives on Slide 8. Numbers are a plan, not traction.",
    )

    heading(doc, "Defensibility — why others won’t just build it", 2)
    add_p(
        doc,
        "Large enterprises can — they have internal AI teams. We do not fight them. "
        "We focus on small and mid-tier providers whose infrastructure is outdated "
        "and who will still be printing a course list in 2026. Lives on Slides 5 and 7.",
    )
    comment_box(
        doc,
        "Do not over-claim the moat",
        [
            "Never say “nobody else can build this” or “we have a patent.” We do not.",
            "Say: a bank, a big consultancy, or Intreo HQ could stand up a similar agent. That is why they are not the first buyer.",
            "The wedge is the office that cannot staff an AI team and cannot wait for a national HRIS. Outdated case systems are the opening, not an insult.",
            "What is hard to copy as a weekend chatbot: confirm/skip, ESCO pin, two unranked routes, never-invent, sitting in the existing appointment. That is process, not a model.",
        ],
    )

    heading(doc, "2. What judges will remember — and ask", 1)
    add_p(
        doc,
        "If a judge repeats one line to another judge, it should be this:",
        space_after=4,
    )
    add_p(
        doc,
        "They have already been assessed. We turn what they have actually done into two reachable roles "
        "and a board they walk out holding. The system proposes; the person decides. Every line on that board "
        "traces to a confirmed claim.",
        italic=True,
        color=NAVY,
    )
    subhead(doc, "Three visible demo moments")
    bullet(doc, "Confirm / skip — nothing used until they say it is true. Skip is free.")
    bullet(doc, "Weak line becomes evidence — “managed stock” → number + tool + date (persona colour, on screen only).")
    bullet(doc, "Leave with the board — STAR + predicted questions; flip interview setting; stories stay; questions change. WhatsApp is bonus, not the close.")
    add_p(doc, "If the model is down: ?replay=golden. Do not narrate a spinner.", italic=True)

    subhead(doc, "Questions they will ask (20-second answers)")
    add_table(
        doc,
        ["They ask", "We say", "Proof"],
        [
            [
                "Who is this for, this week?",
                "Worker whose rôle is gone or about to go, and the adviser who sees them about every three weeks.",
                "Covalen ~700 / Meta Irish cuts (Observed). Still owed: one named reachable adviser.",
            ],
            [
                "Is this ChatGPT on a CV?",
                "ChatGPT is the broken handoff (keywords + course list). We confirm, pin to ESCO, return two unranked routes, never-invent the board.",
                "Demo Screens 2–4. Guardrails.",
            ],
            [
                "Agent or chat UI?",
                "One agent with tools. Model drafts. Code gates. Human confirms. Not a multi-agent swarm.",
                "BPMN four-screen picture. ~6 model calls.",
            ],
            [
                "Who decides?",
                "Worker confirms, skips, chooses the route. Adviser sits with them. We do not rank people or infer seniority / traits.",
                "Confirm / skip on screen. Two unranked routes.",
            ],
            [
                "GDPR / sensitive data?",
                "Demo is synthetic. Schema cannot hold protected traits. Partner (if on) gets four fields only.",
                "Section 3 GDPR paragraph.",
            ],
            [
                "Who pays?",
                "Worker is the user. Office is the buyer (provider / ETB / outplacement). Not a consumer download.",
                "Slide 7. No JobPath fee ladder until it is in the evidence base with a 2026 source.",
            ],
            [
                "What’s your traction?",
                "Live 90s path + honest “not yet.” Huge bonus: named open conversations with potential clients.",
                "Slide 6. Conversation log.",
            ],
            [
                "What if the model invents?",
                "Never-invent gate. Untraceable claims stripped and logged.",
                "Tests on the guardrail.",
            ],
            [
                "Why only two routes?",
                "A job board is the old product. Two reachable paths force a human choice.",
                "Screen 3.",
            ],
            [
                "What’s the ask?",
                "Hub: Galway. Then one introduction for one sitting / small cohort.",
                "Slide 10.",
            ],
            [
                "How do you get to 200 users?",
                "10 in one sitting → 20 as one office cohort → 200 by copying the sitting to more small/mid-tier offices. Each gate has a kill-point. Not ads.",
                "Slide 8. Path is Proposed until a conversation proves the first 10.",
            ],
            [
                "Why won’t a bank / big consultancy just build this?",
                "They can. They have internal AI teams. We are not selling to them. We sell to small and mid-tier providers whose systems are still a printout and a three-week gap.",
                "Slides 5 and 7. Do not pretend they are unable.",
            ],
        ],
    )
    subhead(doc, "Never say")
    add_p(
        doc,
        "“We autonomously redeploy people.”  ·  “We improve motivation / predict who will disengage.”  ·  "
        "“We assess employability.”  ·  “No risk.”  ·  “Platform” before they have seen the board.  ·  "
        "Market size as the opening.",
        size=10.5,
        italic=True,
        color=MUTED,
    )
    add_p(
        doc,
        "Say instead: we make the responsible human faster, better evidenced, and able to leave with proof.",
        size=11,
    )

    heading(doc, "3. Evidence base — the only numbers the deck may quote", 1)
    add_p(
        doc,
        "This section is the same store as docs/evidence-base.md, written out so the team can see "
        "where each figure came from. If a slide wants a number that is not here, it does not go on the slide. "
        "If research finds a better figure, add it to evidence-base.md with source and date first, then use it.",
    )

    heading(doc, "Where this file came from", 2)
    add_p(
        doc,
        "The evidence base was built as a pitch-governance artefact for SkillsAtlas at the start of the challenge, "
        "so the deck cannot invent statistics on stage. It is not a market-research novel. It is a short, dated list "
        "of figures the team is allowed to say out loud. Classes follow the same model as the product:",
    )
    bullet(doc, " Sourced, dated public measure we can point at (CSO, SOLAS, named government analysis).", bold_lead="Observed —")
    bullet(doc, " A provider or programme published it. Coverage must travel with the claim (e.g. Springboard outcomes reported for 76% of graduates).", bold_lead="Reported —")
    bullet(doc, " Our hypothesis. Never dressed as fact. The one-sentence pitch is Proposed. So is any price we have not tested.", bold_lead="Proposed —")
    add_p(
        doc,
        "Labour-market rows were taken from official Irish series (CSO Labour Force Survey; CSO Earnings & Labour Costs; "
        "SOLAS Skills and Labour Market Research) for Q4 2025, plus the July 2026 government analysis of tech-sector "
        "restructuring as reported via Bloomberg / LA Times, and Bloomberg Economics’ 2026 figures on the share of workers "
        "meaningfully affected by AI. The activation-gap lines come from how Ireland’s public employment service actually "
        "runs (Intreo referral to contracted providers; citizensinformation.ie; gov.ie) plus team research in the V2 brief. "
        "Springboard+ historic outcomes come from Department of Education reports; 2026 place counts from springboardcourses.ie (Mar 2026). "
        "SkillsFuture Singapore is an international precedent only — always say it is a precedent, not an Irish result.",
        size=10.5,
    )
    comment_box(
        doc,
        "How to pick the one number for Slide 2",
        [
            "Production plan: the deck quotes one real number with its source on the problem slide. Not five.",
            "Covalen ~700 / Meta Irish cuts (~20%) are “this week, named people.” Strong if we then show we can reach an adviser.",
            "ICT under-30s −33% (2023–25) is structural. Strong if we want “this is not one company.”",
            "Ireland 30% of workforce meaningfully affected by AI is a why-now line. Use it on Slide 5 only if Slide 2 used Covalen or −33%, not both 30% and −33%.",
            "Do not put Springboard 53% on the problem slide. That is a programme outcome, historic, and easy to hear as “we claim 53% jobs.”",
        ],
    )

    heading(doc, "Labour market (Observed)", 2)
    add_table(
        doc,
        ["Figure", "Value", "Source", "Date", "Where it came from / how to use"],
        [
            [
                "People in employment, Ireland",
                "2.83m",
                "CSO Labour Force Survey",
                "Q4 2025",
                "Scale of the labour market. Too big for Slide 2. Backup only.",
            ],
            [
                "Unemployment rate",
                "4.4%",
                "CSO LFS",
                "Q4 2025",
                "Ireland is not in a 2010-style crisis. Do not pitch “mass unemployment.” Pitch restructuring and silent weeks.",
            ],
            [
                "Adult lifelong learning participation",
                "15.7%",
                "SOLAS Skills and Labour Market Research",
                "Q4 2025",
                "Context for “course list is not enough.” Pair with SOLAS age/attainment note, not as a scare number.",
            ],
            [
                "Job vacancy rate",
                "1.3%",
                "CSO Earnings & Labour Costs",
                "Q4 2025",
                "Tight vacancies. Supports “match evidence to a real rôle,” not “unlimited jobs.”",
            ],
            [
                "Tech-sector jobs, year-on-year",
                "−11%",
                "Government analysis via Bloomberg / LA Times",
                "Q1 2026",
                "Why-now for tech restructuring. Caption the source. Not our measurement.",
            ],
            [
                "ICT employment, under-30s, 2023–25",
                "−33% (almost one-third)",
                "Government analysis via Bloomberg / LA Times",
                "Jul 2026",
                "Candidate for the single Slide 2 number if we want a structural fact.",
            ],
            [
                "Workers in advanced economies meaningfully affected by AI",
                "27%",
                "Bloomberg Economics",
                "2026",
                "International context. Prefer the Ireland 30% if we use this family at all.",
            ],
            [
                "Same figure for Ireland",
                "30%",
                "Bloomberg Economics",
                "2026",
                "Candidate for Slide 5 (Ireland first / why now). Not on Slide 2 if −33% already sits there.",
            ],
            [
                "Share of workforce in tech",
                ">6% (above EU average)",
                "Bloomberg / LA Times",
                "Jul 2026",
                "Ireland is unusually exposed. Support line, not the hero number.",
            ],
            [
                "Meta Irish workforce reduction",
                "~20% (double the global average)",
                "Bloomberg / LA Times",
                "Jul 2026",
                "Named employer, this quarter. Use with Covalen. Do not imply we work for Meta.",
            ],
            [
                "Covalen (Meta contractor) cuts",
                "~700 rôles",
                "Bloomberg / LA Times",
                "Jul 2026",
                "Best “named people this week” figure. Kill-sheet item 1. Still need a reachable adviser.",
            ],
        ],
    )

    heading(doc, "The activation gap (Observed + Reported)", 2)
    bullet(
        doc,
        "Ireland runs mandatory activation: Intreo refers jobseekers to contracted providers (Turas Nua in 13 counties, Seetec) under the JobPath model. Providers are paid on engagement and outcomes. Appointments run roughly every three weeks, with no structured support in between — the “silent weeks.” Sources: team research V2 brief; citizensinformation.ie; gov.ie. This is the problem beat. It is not a customer logo.",
    )
    bullet(
        doc,
        "SOLAS: adult learning participation falls with age and rises with prior educational attainment — precisely when changing work makes learning more important. Source: SOLAS, via the earlier SkillsAtlas deck notes. Use as explanation, not as a percentage on the slide unless we add the exact SOLAS table to this file.",
    )
    comment_box(
        doc,
        "JobPath fee ladder is not on this list",
        [
            "Older research (Dáil written answer, 3 Dec 2019) describes a payment-by-results schedule. "
            "It is dated. Do not quote €311 / €1,165 on stage until someone confirms the 2026 contract still pays that way "
            "and the row is added here with source and date.",
            "Same for “42% sustained 52 weeks.” Useful commercially if current. Not a slide until it is Observed/Reported in this file.",
        ],
    )

    heading(doc, "Precedents (Reported — coverage must travel with the claim)", 2)
    bullet(
        doc,
        "Springboard+ 2011–15 cohorts, outcomes at 3–6 months: 53% employment/self-employment, 19% further study, 28% looking for work. Outcomes reported for 76% of graduates — historic results, not a current prediction. Source: Department of Education Springboard reports. If you say 53%, you must also say the years and the 76% coverage.",
    )
    bullet(
        doc,
        "Springboard+ 2026: 7,274 places across 244 courses; free for unemployed, 10% fee for employed. Source: springboardcourses.ie, Mar 2026. This is supply — real courses we can point at — not our revenue.",
    )
    bullet(
        doc,
        "SkillsFuture Singapore: international precedent for a common skills language with multi-party validation. Source: SkillsAtlas deck notes, source 08. Say “precedent,” never “Ireland copied this and it worked.”",
    )

    heading(doc, "Scale path (Proposed — plan, not users we have)", 2)
    add_p(
        doc,
        "Mentors asked how we get 10, then 20, then 200. These are sitting-counts (workers who leave with a board), "
        "not app installs. Do not say them as traction. They are a plan until a sitting exists.",
    )
    add_table(
        doc,
        ["Gate", "Meaning", "Kill-point"],
        [
            ["10", "First sitting, one adviser", "No adviser will sit with us"],
            ["20", "One office copies the next week", "They will not repeat without us in the room"],
            ["200", "~10 small/mid-tier offices copy the sitting", "Next office needs HQ AI programme or a 12-month tender"],
        ],
    )
    add_p(
        doc,
        "Defensibility (mentor): large enterprises can build this — they have internal AI teams. "
        "Beachhead is small and mid-tier providers whose infrastructure is still a printout and a three-week gap. Not a patent claim.",
        size=10.5,
    )

    heading(doc, "One-sentence pitch (Proposed)", 2)
    add_p(
        doc,
        "For the worker who has just been told their rôle is gone — and the adviser who sees them once every three weeks — "
        "SkillsAtlas is an evidence agent that turns what they have actually done into two credible next rôles, a plan they can afford, "
        "and proof they can carry into an interview, unlike the assessment-and-course-list handoff that leaves them alone with a printout.",
        italic=True,
        color=NAVY,
    )
    add_p(
        doc,
        "Proposed = our sentence, not a sourced claim. Shorten for Slide 1 until it fits one breath. Do not add metrics to it.",
        size=10.5,
        italic=True,
        color=MUTED,
    )

    heading(doc, "Kill-sheet (Q&A, already answered in the evidence base)", 2)
    add_table(
        doc,
        ["#", "Question", "Current answer", "Still open"],
        [
            ["1", "Named person with the problem this week?", "~700 Covalen workers and Meta’s Irish cohort are this quarter’s visible cases.", "Problem owner: one reachable adviser or outplacement contact."],
            ["2", "Reachable in 3 days?", "ETB adult guidance, Intreo-linked providers, union redundancy networks.", "Book the conversation. See Slide 6 log."],
            ["3", "What do they do today?", "Assessment + course list + ~3-week gaps.", "A quote in their words would be stronger than ours."],
            ["4", "Would they use a rough version?", "Yes if it produces something they can carry — the board / evidence pack.", "Confirm in a real conversation this week."],
            ["5", "90-second demo from cold?", "Four screens, replay fallback.", "URL + golden replay must be real on 14 Sep."],
            ["6", "Three screens without cutting the point?", "Evidence+questions, routes, leave-with-the-board.", "Problem screen can be a static image."],
            ["7", "Legal data?", "Synthetic personas + ESCO (EUPL) + public course listings.", "No live case files in the demo."],
            ["8", "Still needed if models improve?", "Yes — value is the evidence trail and governance, not the model.", "—"],
            ["9", "Unfair angle?", "Evidence classes + never-invent + structural privacy. Most entrants demo a chatbot; we demo an audit trail.", "Client conversations make this real, not theoretical."],
            ["10", "If the hardest part fails by day 6?", "Curated route pairs per persona; show reasoning on curated data.", "Have the fallback, do not advertise it as the product."],
        ],
    )

    heading(doc, "GDPR readiness (say this if asked)", 2)
    add_p(
        doc,
        "The demo processes no personal data — both personas are synthetic. The design is GDPR-shaped for when a real adviser touches it: "
        "data minimisation by schema (the extraction schema cannot hold protected traits); purpose limitation by process structure "
        "(the accountability partner receives only the four-field handoff payload, enforced by a contract test); worker control as a hard gate "
        "(confirmation before use, skip without penalty, correction at any point); and an audit trail by default "
        "(every evidence item carries provenance, class, and confirmation metadata). "
        "If a judge asks “what about GDPR?”, the answer is: the compliance-relevant properties are in the architecture, not in a policy document.",
        size=10.5,
    )

    heading(doc, "Client conversations — not numbers yet, but they become evidence", 2)
    add_p(
        doc,
        "Until a conversation has a date and a person, it is not evidence. When it happens, log it here (or in the team board with the same columns) "
        "and only then put “in conversation with…” on Slide 6. Mentor: this is a huge judging bonus. Empty rows are honest. Invented rows are fatal.",
    )
    add_table(
        doc,
        ["Date", "Organisation / rôle", "What they said (their words)", "What they would try", "May we name them on stage?"],
        [
            ["", "ETB adult guidance", "", "", "yes / no / anonymised"],
            ["", "Intreo-linked provider (Turas Nua / Seetec office)", "", "", ""],
            ["", "Employer outplacement / redundancy lead", "", "", ""],
            ["", "Union redundancy support", "", "", ""],
            ["", "Skillnet / SOLAS / Springboard contact", "", "", ""],
        ],
    )

    heading(doc, "4. The ten slides — contents, comments, research", 1)
    add_p(
        doc,
        "Each live slide: one bold idea, then almost no text. Comments are for the team. "
        "They do not get printed on the slide. Spoken lines are a starting point for the presenter.",
    )

    # ---- SLIDE 1 ----
    slide_banner(doc, 1, "Hook", "They have already been assessed. We give them evidence they can carry.")
    subhead(doc, "On the slide")
    bullet(doc, "SkillsAtlas")
    bullet(doc, "The evidence agent for the silent weeks after a redundancy assessment.")
    bullet(doc, "Same CV. Confirmed evidence. Two reachable rôles. They leave with the board.")
    bullet(doc, "Footer: TechIreland National AI Challenge 2026 · Hub 14 Sep")
    subhead(doc, "Spoken (about 15 seconds)")
    add_p(
        doc,
        "Ireland already does the first half of this job. Someone is assessed. They get a course list. "
        "We take the same CV into the next sitting — and nothing is used until they say it is true.",
        italic=True,
    )
    subhead(doc, "Why this slide exists")
    add_p(
        doc,
        "Judges decide in seconds whether this is another careers chatbot. The hook must contain the old handoff (already assessed) "
        "and the artefact (the board). Same CV into the next sitting — nothing used until they confirm. "
        "The long Proposed sentence lives in the evidence base; this slide is the breath-length version.",
    )
    comment_box(
        doc,
        "Slide 1",
        [
            "Do not open with market size, model names, or “AI-powered platform.”",
            "No team names, no stack, no logos of Intreo / Turas Nua as if they were customers.",
        ],
    )
    subhead(doc, "Research to bring back")
    bullet(doc, "Final one-liner (problem owner + presenter). Shorten the Proposed sentence until it fits one breath.")

    # ---- SLIDE 2 ----
    slide_banner(doc, 2, "Problem", "Ireland assesses, prints a course list, and leaves them alone for about three weeks.")
    subhead(doc, "On the slide")
    bullet(doc, "Headline: You’ve been assessed. Here’s a course list. See you in three weeks.")
    bullet(doc, "Three beats, visible: Assessed → printout → silent weeks.")
    bullet(doc, "ONE number, captioned. Pick either ICT under-30s −33% (2023–25) or Covalen ~700 rôles. Source in 8pt.")
    bullet(doc, "Small line: Appointments about every three weeks. Nothing sits with them in between.")
    subhead(doc, "Spoken")
    add_p(
        doc,
        "This is the handoff Ireland actually does. You’ve been assessed. Here’s a course list. See you in three weeks. "
        "That gap is where the plan dies.",
        italic=True,
    )
    subhead(doc, "Why this slide exists")
    add_p(
        doc,
        "Highest-weighted judge lens: is the problem real? One sourced number here. "
        "The old handoff must read: assessed → course list → silent weeks.",
    )
    comment_box(
        doc,
        "Slide 2",
        [
            "Unemployment is 4.4%. Do not tell a 2010 story. Tell a restructuring + silent-weeks story.",
            "Do not stack −33%, 30%, 700, and 2.83m on one slide. One hero number. The rest wait for Q&A.",
            "Do not put 2,400 SKUs here. That is persona colour for the demo.",
            "Do not blame the worker. The system leaves them with a printout.",
            "A sentence from a real adviser about the three-week gap is stronger than another statistic. Get it this week.",
        ],
    )
    subhead(doc, "Evidence allowed here")
    add_p(doc, "Activation gap (Intreo / three-week cadence). Exactly one Observed labour figure from the table above.", size=10.5)
    subhead(doc, "Research to bring back (problem owner)")
    bullet(doc, "Which single number. Must already be in the evidence base.")
    bullet(doc, "One adviser sentence (even anonymised) — or we stay with public cadence, no fake quote.")
    bullet(doc, "Named person / office we can call (kill-sheet 1–2). This feeds Slide 6.")

    # ---- SLIDE 3 ----
    slide_banner(doc, 3, "Solution", "An evidence agent, not a recommendation engine.")
    subhead(doc, "On the slide")
    bullet(doc, "Headline: Confirm what they did. Deepen the weak lines. Two routes they can reach. A board they walk out holding.")
    bullet(doc, "Four words only: Confirm · Question · Route · Board")
    bullet(doc, "Constraint: We propose with evidence. Humans decide. We do not rank people.")
    subhead(doc, "Spoken")
    add_p(
        doc,
        "SkillsAtlas turns what they have actually done into two rôles they can reach, a plan that points at a real Irish course, "
        "and proof they can carry into an interview. We do not rank them. We do not decide who is redeployed.",
        italic=True,
    )
    subhead(doc, "Why this slide exists")
    add_p(
        doc,
        "Relief after the problem. Must match the four demo screens exactly. "
        "Uniqueness is confirmed evidence → ESCO routes → board, not a job board and not a competency matrix. WhatsApp is not on this slide.",
    )
    comment_box(
        doc,
        "Slide 3",
        [
            "If the demo later drops a screen, this slide drops the same word. Do not advertise five products.",
            "“Two routes” is a product decision, not a limitation we apologise for.",
            "“Plan they can afford” in the long pitch sentence means pointing at Skillnet / SOLAS / Springboard+ — not a price we invented.",
            "Name the redeployment risk in the spoken line before they ask: we propose, humans decide.",
        ],
    )
    subhead(doc, "Research")
    add_p(doc, "None if the four screens stay frozen.", size=10.5)

    # ---- SLIDE 4 ----
    slide_banner(doc, 4, "How the agents work", "The model drafts. Rules decide what is allowed. The person confirms.")
    subhead(doc, "On the slide")
    add_table(
        doc,
        ["AI (cheap, then one reasoning call)", "Code (always)", "Human"],
        [
            [
                "Parse CV · 2–3 questions · explain a route · draft STAR",
                "Score evidence · ESCO pin · two-route rule · never-invent · no protected traits",
                "Confirm / correct / skip · pick a route · pick interview setting",
            ]
        ],
    )
    bullet(doc, "Footer: ~6 model calls per journey. Guardrail on every AI output. Fail → regenerate once → drop the claim.")
    subhead(doc, "Spoken")
    add_p(
        doc,
        "A model reads the CV. That is the cheap, small job. Then the person confirms. Rules sit around every call. "
        "If a story cannot trace to a confirmed line, we strip it. The interesting part is not the model. It is the trail.",
        italic=True,
    )
    subhead(doc, "Why this slide exists")
    add_p(
        doc,
        "2026 theme is agentic workflows with hand-off and traceability. This is the ChatGPT answer. "
        "Role decomposition is conceptual — one agent with tools, not a swarm. Picture: docs/bpmn/skillsatlas-4-screens.bpmn.",
    )
    comment_box(
        doc,
        "Slide 4",
        [
            "Do not put Kubernetes, model IDs from memory, or “our proprietary LLM” on this slide. Models are pinned in lib/models.ts when the app exists.",
            "Cheap model for extraction/questions; expensive model only for route explanation. Say “we spend the expensive call where a human would need a why,” not a brand name fight.",
            "Technical judges may open the BPMN. Reconcile it with the built demo before 13 Sep. Mark production-only steps as production-only.",
            "Evidence classes OBSERVED / REPORTED / PROPOSED / HUMAN_REVIEW can appear as four chips, not a lecture.",
        ],
    )
    subhead(doc, "Research (builder / BPMN)")
    bullet(doc, "Screenshot of the four-row BPMN that matches the built demo.")
    bullet(doc, "One line: which steps are live vs labelled simulated.")

    # ---- SLIDE 5 ----
    slide_banner(
        doc,
        5,
        "Market (Ireland first)",
        "Ireland first — and the office that cannot staff an AI team, not the enterprise that already did.",
    )
    subhead(doc, "On the slide")
    bullet(doc, "Headline: Ireland first. The sitting already exists. The buyer is the small and mid-tier office.")
    bullet(doc, "Beachhead: workers in restructuring + advisers at small/mid-tier providers, ETB adult guidance, smaller outplacement teams.")
    bullet(doc, "Not the first buyer: large enterprises and national HQ functions with internal AI teams. They can build this. We do not fight them.")
    bullet(doc, "Why now, one line only if Slide 2 did not already use it: 30% of Ireland’s workforce meaningfully affected by AI (Bloomberg Economics, 2026).")
    bullet(doc, "Supply, small: Springboard+ 2026 — 7,274 places, 244 courses (springboardcourses.ie, Mar 2026). We point at real courses; we do not own them.")
    subhead(doc, "Spoken")
    add_p(
        doc,
        "This is Ireland first because the sitting already exists. The user is the worker. The buyer is the office that already meets them — "
        "especially the small and mid-tier provider whose case system is still a printout. A large enterprise can stand this up with an internal AI team. "
        "That is not who we sell to first.",
        italic=True,
    )
    subhead(doc, "Why this slide exists")
    add_p(
        doc,
        "“Could anyone use it?” must get a wedge, not everybody. Mentors asked for defensibility: say who we are not chasing. "
        "Ireland has ESCO, Skillnet / SOLAS / Springboard+, and a visible tech-restructuring story. "
        "2.83m employed is the TAM temptation — do not put it on the slide as if it were our market.",
    )
    comment_box(
        doc,
        "Slide 5 — beachhead vs enterprise",
        [
            "Mentor line to keep: large enterprises can do this; they have internal AI teams. We focus on small and mid-tier providers whose infrastructure is outdated.",
            "“Outdated” means: still handing a course list, still ~3 weeks between sittings, no evidence trail, no ESCO pin. It is not an insult on stage.",
            "Do not name Turas Nua or Seetec as customers. They are how activation is organised. A local office of a contracted provider can still be small/mid-tier even if the brand is national — say “the local office,” not “we have the national contract.”",
            "Never two competing hero numbers across Slides 2 and 5.",
            "Pick one first buyer for the spoken line. Not all three as if we are already in all three.",
            "Conversations from Slide 6 make this slide true. Without them it is a map.",
        ],
    )
    subhead(doc, "Research (problem owner)")
    bullet(doc, "First buyer for the spoken line — one, and confirm they are small/mid-tier (no internal AI team).")
    bullet(doc, "May we name a programme as context? Default: generic rôle + ESCO.")

    # ---- SLIDE 6 ----
    slide_banner(
        doc,
        6,
        "Traction or demo",
        "Proof is the live path — plus open conversations with people who hold the problem. Mentor: that second part is a huge judging bonus.",
    )
    subhead(doc, "On the slide — three columns, not a hockey stick")
    add_table(
        doc,
        ["Built (show it)", "In conversation (name it honestly)", "Not yet (say it)"],
        [
            [
                "Live URL · four screens · 90 seconds · synthetic personas · ESCO v1.2.0 · real Skillnet / SOLAS / Springboard+ catalogue · guardrail tests · golden replay if the API dies",
                "Named open conversations with potential clients — adviser / provider / ETB / outplacement. Date + rôle. One quote in their words if they allow it.",
                "Paying seats · signed pilot LOI · production case data · outcome percentages we did not measure",
            ]
        ],
    )
    bullet(doc, "Tiny footer: If the API dies, we replay a golden run. We do not narrate a spinner.")
    subhead(doc, "Spoken")
    add_p(
        doc,
        "What you are about to see is working now. We will not pretend we have paying seats. "
        "What we do have — and what we are doing this fortnight — is conversations with the people who already sit with that printout. "
        "That is the traction that matters in this room.",
        italic=True,
    )
    subhead(doc, "Why this slide exists")
    add_p(
        doc,
        "Hub judges have been watching chat demos all day. A before/after they can audit is product traction. "
        "A named conversation is market traction. Mentors have said the second one is a huge bonus because it proves "
        "the problem survives contact with a stranger. Say what is not true yet. Do not invent users.",
    )
    comment_box(
        doc,
        "Slide 6 — the honesty ladder (use the highest true rung only)",
        [
            "Rung 0 — We think this buyer exists. (Do not put on the slide.)",
            "Rung 1 — We have identified a named office and a phone number / email. (“We are booking.”)",
            "Rung 2 — A call or sitting happened. Date + rôle. (“In conversation with an ETB adult-guidance adviser, 8 Sep.”)",
            "Rung 3 — They said something we may quote. Written permission. This is the bonus mentors mean.",
            "Rung 4 — Letter of intent / pilot dates. Do not claim this. We do not have it.",
            "Rung 5 — Paid. Do not claim this.",
            "A logo wall of organisations we have not spoken to is worse than an empty conversation column. Judges ask “what did they say?”",
        ],
    )
    comment_box(
        doc,
        "Who to talk to this week (kill-sheet 1–4)",
        [
            "ETB adult guidance — already in the “reachable in 3 days” answer.",
            "Intreo-linked provider office (Turas Nua / Seetec) — the three-week cadence lives here. Local office manager, not a national procurement story.",
            "Employer outplacement / redundancy lead — Covalen / Meta is this quarter’s visible case; we need a person, not a headline.",
            "Union redundancy support — another door to the same worker.",
            "Optional: Skillnet / SOLAS / Springboard programme contact — they confirm the course list is real. They are not the primary buyer.",
            "Ask before showing the product: what happens in the three weeks; what they wish they knew before the next sitting; whether they would use a rough board. Their words go on this slide if allowed.",
        ],
    )
    comment_box(
        doc,
        "What counts as demo traction vs theatre",
        [
            "Counts: deployed URL, confirm/skip working, two routes with provenance, board that only prints confirmed lines, guardrail tests, recording in a second tab.",
            "Does not count: GitHub stars, “we used GPT,” unpublished interviews, a BPMN that does not match the screens.",
            "Wireframe URL today: https://skillsatlas.vercel.app — replace with the app URL when it exists. Put the URL that will actually open on 14 Sep.",
        ],
    )
    subhead(doc, "Research (problem owner + demo runner)")
    bullet(doc, "Start conversations now. Fill the log in Section 3. Even two dated calls change this slide.")
    bullet(doc, "URL, stills of Screen 2 and Screen 4, status of ?replay=golden.")
    bullet(doc, "Written permission for any name or quote.")

    # ---- SLIDE 7 ----
    slide_banner(
        doc,
        7,
        "Business model + why we are not a weekend clone",
        "The worker is the user. The small/mid-tier office is the buyer. A bank can build this — that is why it is not our sale.",
    )
    subhead(doc, "On the slide")
    bullet(doc, "Headline: We sell the sitting, not a consumer subscription.")
    bullet(doc, "Now (pilot): free, one cohort, synthetic-first then a real sitting. Success the adviser can see: they arrive at the next appointment holding a board.")
    bullet(doc, "Then (label Proposed): seat or case licence to the small/mid-tier provider / ETB / outplacement team. Worker does not pay in the activation setting.")
    bullet(doc, "Defensibility, one line: Large enterprises have AI teams — they can build this. We stay with offices that still run on a printout.")
    bullet(doc, "Comparison: better than a course-list PDF. Not a €300/seat coaching platform. Not a chatbot wrapper on ChatGPT.")
    subhead(doc, "Spoken")
    add_p(
        doc,
        "The person who was made redundant is not our customer. The office that already gets paid to stay with them is — "
        "the small and mid-tier provider that cannot stand up an internal AI lab. A large enterprise can copy the idea. "
        "We earn the right to a price after one sitting that produces a board they can see.",
        italic=True,
    )
    subhead(doc, "Why this slide exists")
    add_p(
        doc,
        "Mentors will ask who pays and why a bigger player will not just ship this. "
        "If we look like a worker app, procurement dies and the ethics look wrong. "
        "If we look like we are competing with a bank’s AI team, we lose. Every euro figure is Proposed until it sits in the evidence base.",
    )
    comment_box(
        doc,
        "Slide 7 — defensibility without theatre",
        [
            "What we may say: the moat is the sitting + the gates (confirm, skip, two unranked ESCO routes, never-invent). A weekend GPT wrapper does not have those gates.",
            "What we may say: small/mid-tier providers still have outdated infrastructure — course list, spreadsheet, three-week gap. That is the job-to-be-done.",
            "What we must not say: “unique technology,” “they cannot copy us,” “we own ESCO,” “WhatsApp is no risk.”",
            "ChatGPT / Copilot are scored on being helpful. They will keep recommending. Our product is built to propose two paths and stop. That is a product choice, not a patent.",
            "Springboard 7,274 places is public supply, not our ARR.",
            "Do not put the 2019 JobPath fee ladder on this slide.",
            "One price hypothesis or “pilot first, price after.” Mixing both sounds like we do not know.",
            "Conversations on Slide 6 should test: who can sign a 20-person pilot without national procurement — that is the 10→20 gate.",
        ],
    )
    subhead(doc, "Research (commercial / problem owner)")
    bullet(doc, "Who can sign a small pilot (local office vs HQ)? Confirm they are not an internal-AI-team buyer.")
    bullet(doc, "Price hypothesis or explicit “price after pilot.”")
    bullet(doc, "If JobPath economics: 2026 source, then add to evidence-base.md.")

    # ---- SLIDE 8 ----
    slide_banner(
        doc,
        8,
        "Go to market — how 10 becomes 200",
        "Mentors asked: how do we get 10, then 20, then 200? Copy the sitting. Each gate has a kill-point. Not ads.",
    )
    subhead(doc, "On the slide")
    add_table(
        doc,
        ["", "What it is", "How we get there", "Kill-point — stop if this fails"],
        [
            [
                "10",
                "First sitting. One adviser. About ten workers through the path. Boards in hand.",
                "Open conversations (Slide 6) → one booked sitting. Synthetic first, then real CV in the room.",
                "If no adviser will sit with us, we do not have a product. Do not skip to 20 on a slide.",
            ],
            [
                "20",
                "One office cohort. Same adviser cadence. Same four screens.",
                "The 10 worked. The office copies next week’s appointments. Local signature, not national procurement.",
                "If they will not repeat the sitting without us in the room, the 10 was a demo, not a wedge.",
            ],
            [
                "200",
                "The sitting copied: ~10 small/mid-tier offices × ~20, or one provider’s local network.",
                "Peer intro office-to-office. Same measure: boards returned at the next appointment.",
                "If the next office needs a HQ AI programme or a 12-month tender, that is the enterprise path we refused. Stay with small/mid-tier.",
            ],
        ],
    )
    bullet(doc, "Headline under the table: Do not launch nationally. Land one room, then copy the room.")
    bullet(doc, "Distribution: advisers already have the CV. We sit in that meeting. No consumer download for v1.")
    bullet(doc, "WhatsApp partner: bonus check-in on the committed step only, if the flag is on. Four fields. Helps the silent weeks between 10 and 20. Not the GTM.")
    bullet(doc, "Caption: Proposed path. 10-20-200 are plan numbers, not users we have.")
    subhead(doc, "Spoken")
    add_p(
        doc,
        "Ten people in one sitting. Twenty when that office copies the next week. Two hundred when ten small offices copy the sitting — "
        "not when we buy ads, and not when a national HQ builds an internal AI team. If the first ten do not come back holding a board, we stop.",
        italic=True,
    )
    subhead(doc, "Why this slide exists")
    add_p(
        doc,
        "Mentors asked for a scale story. Use 10 → 20 → 200 because that is honest for a two-week PoC selling sittings, not downloads. "
        "Each gate has a kill-point. A 100,000-user slide with no path is the thing they are trying to stop.",
    )
    comment_box(
        doc,
        "Slide 8 — comments on 10 / 20 / 200",
        [
            "“Users” here means workers who completed the path and left with a board — not app installs, not chat threads.",
            "10 is this fortnight’s job if conversations land. 20 is the pilot ask on Slide 10. 200 is the twelve-month shape, not a 14 Sep claim.",
            "Do not draw 2,000 or 20,000 on this slide. Mentors asked 10-20-200. Stop there.",
            "This slide is empty without Slide 6 conversations. If the log is empty on 12 Sep, the 10-box stays “we are booking,” only if true.",
            "No map of Ireland covered in logos. No “four counties by Christmas.”",
            "What we ask them for: a sitting slot, not their case database. Synthetic-first is the legal story (kill-sheet 7).",
            "WhatsApp is how some of the 10 stay in the three-week gap. It is not how we acquire the 200.",
        ],
    )
    subhead(doc, "Research")
    bullet(doc, "The actual first door (name or “we are booking X”). That is the path to 10.")
    bullet(doc, "What we ask them for: sitting slot / quote / permission to name.")
    bullet(doc, "One sentence on how the second office hears about the first (peer intro vs us cold-calling).")

    # ---- SLIDE 9 ----
    slide_banner(doc, 9, "Team", "Why this group can show this in two weeks — and what we still lack.")
    subhead(doc, "On the slide")
    bullet(doc, "Names + one line each mapped to the product (evidence / Ireland labour / demo / responsible AI / HR language). Not job titles only.")
    bullet(doc, "Gaps + dated remedies: e.g. no signed buyer yet → conversations this week + mentorship; BPMN vs live app must match before freeze.")
    bullet(doc, "Presenter and demo runner are two different people.")
    subhead(doc, "Spoken")
    add_p(
        doc,
        "We are a challenge team that can show this cold, in ninety seconds, with a recording in the next tab if the wifi dies. "
        "Here is who owns the problem, who owns the trail, and what we are still opening.",
        italic=True,
    )
    subhead(doc, "Why this slide exists")
    add_p(doc, "Team is a scored pillar. Fake completeness reads worse than named holes. Judges probe “why you?”")
    comment_box(
        doc,
        "Slide 9",
        [
            "Write real names this week. Empty owner = vague slide on the day.",
            "Unfair angles only if true: Ireland activation knowledge, already-built WhatsApp partner, Camunda picture as process proof.",
            "Do not hide that this is a two-week PoC team.",
        ],
    )
    subhead(doc, "Research (team leader)")
    bullet(doc, "Final names, rôles, who presents, who drives.")
    bullet(doc, "One unfair angle we can say without blushing.")

    # ---- SLIDE 10 ----
    slide_banner(doc, 10, "The ask", "Leave with a next step a later room can underwrite.")
    subhead(doc, "On the slide")
    bullet(doc, "Headline: Send us to Galway. Then one sitting with a real adviser.")
    bullet(doc, "14 Sep: progress to the National AI Meet, 24 Sep.")
    bullet(doc, "If / when Galway (and from mentors now): one introduction — provider, ETB adult guidance, or employer outplacement — for a scoped pilot (synthetic first, then ~20 people).")
    bullet(doc, "Measure: share who return to the next appointment with a self-authored board.")
    bullet(doc, "If conversations are live: “continue / deepen the sitting with [rôle, if allowed].” That is sharper than a cold intro.")
    bullet(doc, "Contact: one email, one URL. This slide stays up in Q&A.")
    subhead(doc, "Spoken")
    add_p(
        doc,
        "On the fourteenth we are asking to go to Galway. After that we are asking for one introduction — one adviser, one cohort — "
        "to test a simple measure: do they come back to the next appointment holding a board they wrote from their own evidence.",
        italic=True,
    )
    subhead(doc, "Why this slide exists")
    add_p(
        doc,
        "Vague “partners and funding” is a weak ask. Be specific: Galway, then one sitting. Mentorship intros help; they are not a substitute for conversations we start ourselves.",
    )
    comment_box(
        doc,
        "Slide 10",
        [
            "Do not print a five-line wishlist (mentorship, connections, guidance, collaborators, support).",
            "Do not ask for Kubernetes or a second model provider.",
            "If a mentor offers an intro, take it and put the resulting conversation on Slide 6 — that is the loop.",
        ],
    )
    subhead(doc, "Research")
    bullet(doc, "The one URL and one email that will be printed.")

    heading(doc, "5. Backup slides (Q&A only — not in the live ten)", 1)
    add_table(
        doc,
        ["Backup", "Content", "When to pull"],
        [
            ["B1 Competition", "Course-list PDF / ChatGPT / generic career bots / full HRIS competency tools. Our wedge: confirmed evidence + two unranked ESCO routes + never-invent board.", "“Who else is in this space?”"],
            ["B2 Responsible AI", "No protected-trait fields · confirm/skip · never-invent · four-field partner payload · eval harness.", "Bias / surveillance"],
            ["B3 GDPR", "The paragraph in Section 3.", "“What about GDPR?”"],
            ["B4 BPMN", "Four-screen picture.", "Technical judge"],
            ["B5 Kill-sheet", "The ten answers in Section 3.", "Hostile panel"],
            ["B6 Conversation log", "Dates and quotes we are allowed to use.", "“Have you spoken to anyone?”"],
            [
                "B7 Defensibility (longer)",
                "Large enterprises CAN build this. Beachhead = small/mid-tier providers with outdated infrastructure. Moat = sitting + confirm/skip + ESCO + two unranked routes + never-invent. No patent. ChatGPT will keep recommending; we stop at two paths.",
                "“Why won’t someone bigger just do this?”",
            ],
            [
                "B8 Scale path",
                "10 → 20 → 200 table if Slide 8 was skipped for time. Kill-points included.",
                "“How do you get users?”",
            ],
        ],
    )

    heading(doc, "6. Working four-minute speech", 1)
    add_p(
        doc,
        "Works with or without slides. After research returns, the presenter cuts this — do not invent a second speech in a side chat. "
        "The 90-second demo script stays in docs/demo-script.md. Pitch frames, demo proves, ask closes.",
        size=10.5,
        italic=True,
        color=MUTED,
    )
    subhead(doc, "0:00–0:35 · Hook + problem")
    add_p(
        doc,
        "Ireland already does the first half of this job. Someone is assessed. They get a course list. Next sitting is about three weeks away. "
        "In that gap the plan lives only in their head. We are not replacing that meeting. We take the same CV into the next sitting — "
        "the file the adviser already has, or the one they bring. Nothing on it is used until they say: this is true.",
    )
    subhead(doc, "0:35–1:10 · Solution")
    add_p(
        doc,
        "SkillsAtlas is an evidence agent. It turns what they have actually done into two rôles they can reach, "
        "a plan that points at a real Skillnet, SOLAS, or Springboard+ course, and proof they can carry into an interview. "
        "We do not rank them. We do not decide who is redeployed. We propose. They choose.",
    )
    subhead(doc, "1:10–2:10 · How it works")
    add_p(
        doc,
        "A model reads the CV. That is the cheap, small job. Then the person confirms. Watch the weak line: “managed stock.” "
        "Two questions. Skip is always allowed. When they answer, it becomes a number, a tool, a date. That is evidence. That is not a keyword. "
        "Rules sit around every model call: no protected traits, cap the questions, pin skills to ESCO, and if a story cannot trace to a confirmed line, we strip it. "
        "The interesting part is not the model. It is the trail.",
    )
    subhead(doc, "2:10–2:50 · Two routes + board")
    add_p(
        doc,
        "Exactly two reachable routes. Not a job board. Not “you would be hired.” What already transfers. What is missing. "
        "A real Irish course for the gap. They pick. They leave holding a cheat-board: STAR stories and predicted questions. "
        "They tell us who is in the room — a phone screen is not a hiring-manager panel. Same evidence, different questions. "
        "Every line traces to something they confirmed.",
    )
    subhead(doc, "2:50–3:25 · Ireland, money, honesty")
    add_p(
        doc,
        "This is Ireland first because the sitting already exists. The user is the worker. The buyer is the small or mid-tier office that already gets paid to stay with them — "
        "not a large enterprise with an internal AI team, and not a newly redundant person buying a subscription. "
        "What we have today is a two-week proof: four screens, a live URL, tests on the guardrails. "
        "We do not have paying seats and we will not pretend we do. What we are doing is talking to the people who hold the printout. "
        "Ten people in one sitting. Twenty when that office copies the next week. Two hundred when other small offices copy the sitting. "
        "If the first ten do not come back holding a board, we stop.",
    )
    subhead(doc, "3:25–4:00 · Team + ask")
    add_p(
        doc,
        "We are a challenge team that can show this cold, in ninety seconds, with a recording in the next tab if the wifi dies. "
        "On the fourteenth we are asking to go to Galway. After that we are asking for one introduction — one adviser, one cohort — "
        "to test a simple measure: do they come back to the next appointment holding a board they wrote from their own evidence. "
        "That’s the product. Not a chatbot. A trail they can trust, and something they walk out holding.",
    )

    heading(doc, "7. How we combine later", 1)
    bullet(doc, "Team decides who takes which slide. Paste research under that slide (or the conversation log).")
    bullet(doc, "One person then produces a one-page “slide text only” freeze.")
    bullet(doc, "Only then: layout. If a claim has no source, it is deleted, not typeset smaller.")
    bullet(doc, "Read the four-minute speech out loud on a clock. Cut anything that needs a footnote.")
    bullet(doc, "Upload before 13 September, 2pm.")

    add_p(
        doc,
        "Repo copies: docs/archive/pitch/pitch-contents.md (argument) · docs/evidence-base.md (numbers) · docs/demo-script.md (90-second live demo).",
        size=10,
        italic=True,
        color=MUTED,
        space_before=12,
    )

    doc.save(OUT)
    print("Wrote", OUT)


if __name__ == "__main__":
    build()
