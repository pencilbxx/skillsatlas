"""Build the Hub pitch Word draft for team comments.

Rebuild: python docs/build-pitch-slide-text-docx.py
Output: docs/SkillsAtlas_Hub_Pitch_Slide_Text_TEAM_DRAFT.docx
"""

from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

OUT = Path(__file__).with_name("SkillsAtlas_Hub_Pitch_Slide_Text_TEAM_DRAFT.docx")

NAVY = RGBColor(0x1B, 0x2A, 0x4A)
CORAL = RGBColor(0xC4, 0x56, 0x3A)
BODY = RGBColor(0x2C, 0x2C, 0x2C)
MUTED = RGBColor(0x5A, 0x5A, 0x5A)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
HEADER_FILL = "1B2A4A"
ALT_FILL = "F4F1EA"
SEAL_FILL = "FFF4D6"
CLICKER_FILL = "E8F0F7"
CALM_FILL = "F7EDE6"


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


def box(doc, title, lines, fill, title_color):
    table = doc.add_table(rows=1, cols=1)
    table.autofit = True
    cell = table.cell(0, 0)
    shade(cell, fill)
    cell.text = ""
    p0 = cell.paragraphs[0]
    p0.paragraph_format.space_after = Pt(4)
    r = p0.add_run(title)
    set_run(r, size=10, bold=True, color=title_color)
    for line in lines:
        p = cell.add_paragraph()
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.space_before = Pt(0)
        rr = p.add_run(line)
        set_run(rr, size=10.5, color=BODY)
    doc.add_paragraph().paragraph_format.space_after = Pt(10)


def not_sealed(doc, title, lines):
    box(doc, "NOT SEALED — " + title, lines, SEAL_FILL, CORAL)


def clicker_only(doc, lines):
    box(doc, "CLICKER ONLY — never say this to the room", lines, CLICKER_FILL, NAVY)


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


def on_slide(doc, lines):
    subhead(doc, "On the slide")
    for line in lines:
        bullet(doc, line)


def spoken(doc, text, time=""):
    label = "Spoken" + (f"  ({time})" if time else "")
    subhead(doc, label)
    add_p(doc, text, italic=True, space_after=8)


def not_on(doc, text):
    add_p(doc, "Not on this slide: " + text, size=10, italic=True, color=MUTED, space_after=8)


def build():
    doc = Document()
    section = doc.sections[0]
    section.top_margin = Cm(1.8)
    section.bottom_margin = Cm(1.8)
    section.left_margin = Cm(1.8)
    section.right_margin = Cm(1.8)

    header = section.header
    hp = header.paragraphs[0]
    hr = hp.add_run("SkillsAtlas  ·  Hub pitch draft for comments  ·  not a designed deck")
    set_run(hr, size=8, color=MUTED)

    footer = section.footer
    fp = footer.paragraphs[0]
    fp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    fr = fp.add_run("Hub 14 Sep 2026  ·  Galway 24 Sep  ·  slides freeze 13 Sep 2pm")
    set_run(fr, size=8, color=MUTED)

    add_p(doc, "SKILLSATLAS", size=12, bold=True, color=CORAL, space_after=4)
    add_p(doc, "Hub pitch — team draft", size=26, bold=True, color=NAVY, space_after=6)
    add_p(
        doc,
        "Words for the slides and the 7-minute talk. Not sealed. Comment here, "
        "then we lock the lines and start designing.",
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

    box(
        doc,
        "HOW TO COMMENT IN THIS FILE",
        [
            "Turn on Review → Track Changes. Add Word comments on anything you disagree with.",
            "Yellow boxes are not sealed: a line, number, name, or phrase we have not locked. Comment there.",
            "Designer: type only the “On the slide” lines. Talker: use Spoken + the script at the end. Clicker: Slide 5 only.",
            "Name on every slide: SkillsAtlas. Not RedeployMate.",
            "Do not design PowerPoint from an unsealed line. After comments come back, we seal this and then design.",
        ],
        CALM_FILL,
        CORAL,
    )

    heading(doc, "Three jobs on the day", 1)
    add_p(doc, "Never the same person talking and clicking.", space_after=8)
    add_table(
        doc,
        ["Job", "What they do"],
        [
            ["Talker", "Speaks. Never holds the mouse."],
            ["Clicker", "Runs the live product. Already on the right screen before the talker points at it."],
            ["Designer", "Types only the On the slide lines. Ignore spoken notes until layout."],
        ],
    )

    heading(doc, "The shape of the 7 minutes", 1)
    add_p(
        doc,
        "Talk less → show the 1-minute film (keep the whole thing) → click the live product "
        "so they see it is real → close and ask → 3 minutes of questions.",
        space_after=8,
    )
    add_p(
        doc,
        "The film may retell the four screens. That is intended. The live click is not a second tour. "
        "It is: this is live → confirm → they leave holding the board → flip who is in the interview.",
        space_after=8,
    )
    box(
        doc,
        "THE FILM IS SILENT",
        [
            "No voice. No music. That is on purpose — so the room is not fighting two voices, "
            "and the talker is not talking over a soundtrack.",
            "Talker: one sentence when it starts, then silence until it ends.",
            "“The model drafts. A person confirms. They leave with a board.”",
            "Do not talk through the four screens. The film does that. Local file on the laptop — not YouTube.",
        ],
        CALM_FILL,
        CORAL,
    )

    heading(doc, "Plain English", 1)
    add_p(
        doc,
        "Ireland already does the first half of this job. Someone is assessed. They get a course list. "
        "Next appointment is about three weeks. In that gap the plan lives only in their head.",
        space_after=8,
    )
    add_p(
        doc,
        "SkillsAtlas is that next sitting: they confirm what they actually did, we ask two or three sharp "
        "questions, we show two jobs they can reach, and they walk out holding a board — stories and likely "
        "interview questions they can carry. We propose. They choose. We do not rank people.",
        space_after=8,
    )
    add_p(
        doc,
        "The person does not pay. The small employment office is the buyer. We do not replace their meetings. "
        "We make the weeks between appointments count.",
        space_after=8,
    )

    heading(doc, "Words we do not say in the room", 1)
    add_p(
        doc,
        "Judges are mixed: some technical, some not. Talk like a person, not like a developer.",
        space_after=8,
    )
    add_table(
        doc,
        ["Do not say", "Say instead"],
        [
            [
                "Camunda, BPMN",
                "The agentic orchestration process — the map in the film of who does what (the model drafts, a person confirms). Not the product name.",
            ],
            [
                "LangGraph, fine-tune, model names",
                "Nothing. If asked how it works: the model drafts, rules decide what is allowed, the person confirms.",
            ],
            [
                "?replay=golden",
                "Nothing to the room. Clicker-only backup — see Slide 5.",
            ],
            [
                "ESCO, Kubernetes, “platform”",
                "The sitting / the board / two jobs they can reach",
            ],
            ["RedeployMate", "SkillsAtlas"],
            ["We rank people / show the top ten", "Two jobs. They pick."],
            [
                "They download an app / they pay",
                "The person never pays here. The office is the buyer.",
            ],
        ],
    )
    add_p(
        doc,
        "Do not put on any slide: file names, web-address codes, tool names, a second process lecture.",
        size=10,
        italic=True,
        color=MUTED,
    )

    heading(doc, "Keep the room calm", 1)
    for line in [
        "The film is silent. One sentence when it starts, then quiet until it ends.",
        "Local file on the laptop. Not YouTube (ads, autoplay, login).",
        "Test the laptop so Windows does not ping or unmute a surprise.",
        "Do not start the live product from a cold homepage.",
        "Do not talk while a spinner is spinning. The clicker already has a backup (Slide 5).",
        "After the film: do not retell all four screens. Land on the board and who is in the interview.",
        "WhatsApp only if it is switched on and you still have about 8 seconds. Bonus, not the close.",
    ]:
        bullet(doc, line)

    heading(doc, "The 7 minutes", 1)
    add_table(
        doc,
        ["Time", "What", "Projector"],
        [
            ["0:00–0:50", "Hook + problem. Short.", "Slides 1 → 2"],
            ["0:50–1:00", "Four words. Do not explain them.", "Slide 3"],
            [
                "1:00–2:00",
                "Whole film, ~1:00. Four screens + the agentic orchestration process. Silent. Let it play.",
                "Slide 4",
            ],
            ["2:00–3:20", "Live product. Do not retell the film.", "Slide 5 (dark). Browser."],
            ["3:20–6:20", "Who it’s for, who pays, scale, team, ask", "Slides 6 → 10"],
            ["6:20–7:00", "Ask stays up. Stop talking.", "Slide 10"],
            ["7:00–10:00", "Questions", "Slide 10"],
        ],
    )
    add_p(
        doc,
        "If you are late at 3:20, cut the “how 10 becomes 200” talk. Never cut the film to save the table "
        "on Slide 8. Never skip the board.",
        space_after=12,
    )

    # --- Slides ---
    slide_banner(doc, 1, "Hook", "They decide in seconds whether this is another careers chatbot.")
    on_slide(
        doc,
        [
            "SkillsAtlas",
            "Everyone else hands you a list. We hand you proof.",
            "Same CV. Confirmed. Two jobs they can reach. They leave with the board.",
            "TechIreland National AI Challenge 2026 · Hub 14 Sep",
        ],
    )
    spoken(doc, "Everyone else hands you a list. We hand you proof.", "~10s")
    not_on(doc, "team names, tech stack, the word “platform”, logos.")

    slide_banner(doc, 2, "Problem", "Assessed, handed a list, left alone for about three weeks.")
    on_slide(
        doc,
        [
            "You’ve been assessed. Here’s a course list. See you in three weeks.",
            "Assessed → list → silent weeks",
            "This quarter: ~700 contractor roles gone (Covalen / Meta)",
            "Source, small type: Bloomberg / LA Times, Jul 2026",
        ],
    )
    spoken(
        doc,
        "Ireland already does the first half of this job. Someone is assessed. They get a list. "
        "Next sitting is about three weeks. In that gap the plan lives only in their head. "
        "About 700 contractor roles gone this quarter. We are not replacing that meeting. We take the same CV.",
        "~35s",
    )
    not_sealed(
        doc,
        "pick one number, not both",
        [
            "Keep ~700 (this quarter, close to home) or switch to Live Register August 2026, 182,517 (CSO, 4 Sep 2026) if you want national scale.",
            "Both numbers are sourced. Putting both on the slide fights for attention. Comment which one.",
        ],
    )
    not_on(doc, "five statistics, JobPath money, 2,400 SKUs, blaming workers, the CSO as a customer, a file name as the source.")

    slide_banner(doc, 3, "The sitting", "Title card. Four words. Do not lecture.")
    on_slide(
        doc,
        [
            "Confirm · Question · Two jobs · Board",
            "We propose. They choose. We do not rank people.",
        ],
    )
    spoken(doc, "You are about to see that sitting. First the process. Then live.", "~8s")
    add_p(doc, "Do not read four bullet explanations. The film does that.", italic=True)
    not_on(doc, "WhatsApp, skills-taxonomy names, “full assessment”, “show more jobs”.")

    slide_banner(
        doc,
        4,
        "The film (~1:00)",
        "Keep the whole film. Four screens and the agentic orchestration process.",
    )
    add_p(
        doc,
        "Keep the whole film. Four screens and the agentic orchestration process "
        "(the map of the sitting: the model drafts, a person confirms). Do not trim to 25 seconds. "
        "Do not name the drawing tool.",
        space_after=8,
    )
    on_slide(
        doc,
        [
            "Almost full-bleed video. Local file on the laptop, not YouTube.",
            "Tiny caption: The sitting — process and four screens.",
            "No other bullets. No table. The film is the slide.",
        ],
    )
    subhead(doc, "Talker during the film (it is silent)")
    add_p(
        doc,
        "One sentence at the start only: “The model drafts. A person confirms. They leave with a board.” "
        "Then shut up until it ends. Do not talk over the four screens. Do not add music.",
        italic=True,
    )
    subhead(doc, "When it ends (~1s)")
    add_p(doc, "Same sitting. Live. Look at the browser.", italic=True)
    not_on(doc, "Camunda, LangGraph, fine-tune, model names, a second process lecture.")
    not_sealed(
        doc,
        "film file",
        [
            "Filename of the video next to the slides, copied onto the presentation laptop the night before.",
            "Test on that laptop: silent film, no system sounds, caption readable from the back.",
        ],
    )

    slide_banner(doc, 5, "Live product", "Proof it is real. Not a second tour of the four screens.")
    on_slide(
        doc,
        [
            "Dark. One line: The sitting — live.",
            "Optional tiny: the live web address",
        ],
    )
    not_sealed(
        doc,
        "the URL",
        [
            "Today the public link is still the mock: skillsatlas.vercel.app.",
            "Confirm the address that will actually be printed. Do not put a fake “live” URL on the slide.",
        ],
    )
    clicker_only(
        doc,
        [
            "Already on the confirm screen, CV loaded. Do not start from a cold homepage.",
            "If the AI is slow or the internet hiccups: the site can show a saved copy of the same four screens. "
            "The clicker adds a short code to the web address (?replay=golden). The room just sees the product. "
            "They should never hear “golden replay” or a web-address code.",
            "If wifi dies completely: recorded full run already open in the next tab. Same spoken words. "
            "Do not narrate a spinner.",
        ],
    )
    spoken(
        doc,
        "Same four screens you just saw. This one is live. Nothing is used until they say it is true. "
        "Skip is free. Watch this weak line: “managed stock.” … Now it is a number, a tool, a date. "
        "That is evidence. That is not a keyword. Two jobs. They pick. We do not rank them. "
        "This is what they walk out holding. Say who is in the room — a screen is not a hiring-manager panel. "
        "Same evidence, different questions. Every line traces to a confirmed claim.",
        "~80s — live commentary, not the 90-second tour again",
    )
    add_p(
        doc,
        "If the film already showed the first screen, skip it in the app. Land on the board and flip who is "
        "in the interview. That is the beat the film cannot do live.",
        space_after=8,
    )
    not_on(doc, "the demo script as text, WhatsApp unless it is switched on and you still have 8 seconds.")
    not_sealed(
        doc,
        "WhatsApp on the day?",
        [
            "Only if the switch is on and the clicker has practised it. Default: skip. The board is the close.",
        ],
    )

    slide_banner(doc, 6, "Who it’s for", "The person is the user. The small office is the buyer.")
    on_slide(
        doc,
        [
            "Ireland first. The sitting already exists.",
            "The person: their job is gone or about to go.",
            "The buyer: the small office that already sees them. The person does not pay.",
            "We do not replace what they run. We make the weeks between appointments count.",
            "Big companies can build this. They have AI teams. We start with offices that still hand out a printout.",
        ],
    )
    spoken(
        doc,
        "The user is the person. The buyer is the office. Not a download. Not a national tender this year.",
        "~25s",
    )
    not_on(doc, "named providers as customers, 24 market segments, a huge global market number, a second big labour number.")
    not_sealed(
        doc,
        "have we spoken to anyone?",
        [
            "Mentors said a real conversation is a judging bonus.",
            "If the conversation log is empty, say so in questions. Do not put a logo up as if they are a customer.",
        ],
    )

    slide_banner(doc, 7, "Who pays, and why this isn’t ChatGPT", "We sell the sitting. We will not invent a story.")
    on_slide(
        doc,
        [
            "We sell the sitting, not a phone app.",
            "Now: free, one group. Success = they come back holding a board they wrote.",
            "Then: the office pays per sitting or per adviser. Price after we see it work.",
            "Why a bank won’t be our first sale: they can build this. We stay with offices that still run on a printout.",
            "ChatGPT hands you another list. We will not print a story they did not confirm.",
        ],
    )
    spoken(
        doc,
        "The person never pays here. We are not promising better placement numbers. We are promising they leave with proof.",
        "~25s",
    )
    not_on(doc, "JobPath fee ladders, “unique technology”, “they cannot copy us”, patent.")
    add_p(
        doc,
        "There is no extra “what exists today” slide. The film plus the live click are the proof. "
        "No paying seats, no signed office — say that in questions if asked.",
        size=10,
        italic=True,
        color=MUTED,
    )

    slide_banner(doc, 8, "How 10 becomes 200", "Copy the sitting. Each gate has a stop. Not ads.")
    on_slide(
        doc,
        [
            "Do not launch nationally. Land one room, then copy the room.",
            "Caption: Proposed. These are not users we have.",
        ],
    )
    add_table(
        doc,
        ["", "What", "How", "We stop if"],
        [
            ["10", "One sitting. One adviser. ~10 boards.", "Someone agrees to sit.", "No adviser will sit."],
            [
                "20",
                "That office copies next week.",
                "The 10 came back with the board.",
                "They will not do it without us in the room.",
            ],
            [
                "200",
                "~10 small offices copy the sitting.",
                "Office tells office.",
                "The next office needs a year of paperwork.",
            ],
        ],
    )
    spoken(doc, "If the first ten do not come back holding a board, we stop.", "~15s")
    not_on(doc, "app downloads, ads, a logo map.")
    not_sealed(
        doc,
        "first door",
        [
            "Who is the first adviser / office we can actually book?",
            "If we do not have a name, keep the table as a plan and do not dress it as traction.",
        ],
    )

    slide_banner(doc, 9, "Team", "Why this group — and what we still lack.")
    on_slide(
        doc,
        [
            "Why this group can show this in two weeks — and what we still lack.",
            "Challenge team. No signed buyer yet. Remedy: one sitting.",
            "Talker and clicker are two different people.",
        ],
    )
    spoken(doc, "One unfair angle, only if true. Do not invent one.", "~15s")
    not_on(doc, "fake completeness.")
    not_sealed(
        doc,
        "names",
        [
            "Names. One line each that maps to the product (the sitting / Ireland / the demo / the rules). Not job titles only.",
            "Who talks. Who clicks.",
        ],
    )
    not_sealed(
        doc,
        "unfair angle",
        [
            "Only if it is true (for example: someone in the room who knows Irish activation, or someone who has already sat with workers).",
            "If we cannot say it without blushing, cut it.",
        ],
    )

    slide_banner(doc, 10, "The ask", "Galway. Then one sitting. This slide stays up in questions.")
    on_slide(
        doc,
        [
            "Send us to Galway. Then one sitting with a real adviser.",
            "14 Sep: progress to the National AI Meet, 24 Sep, Galway.",
            "After that: one introduction to one office — small pilot. Practice CVs first, then about 20 people.",
            "Measure: do they come back holding a board they wrote.",
            "This slide stays up in questions.",
        ],
    )
    spoken(doc, "Not “partners and funding.” Galway. Then one sitting.", "~15s")
    not_on(doc, "a wishlist, cloud credits, five asks.")
    not_sealed(
        doc,
        "contact",
        [
            "One email. One web address. These must be real before 13 Sep 2pm.",
        ],
    )

    heading(doc, "Backup — questions only, not on the live ten", 1)
    add_table(
        doc,
        ["If they ask", "Say"],
        [
            [
                "Who else?",
                "ChatGPT = more lists. A course catalogue = still a list. Big HR tools need months of setup. We work from one CV in one sitting.",
            ],
            [
                "Is the process map the product?",
                "The film is how we designed the sitting — the agentic orchestration process. What you clicked is the product. The drawing tool is not running the live demo this fortnight.",
            ],
            [
                "Privacy / bias?",
                "Practice CVs today. The form cannot hold age, gender, or health. Nothing is used until they confirm. Skip is free.",
            ],
            [
                "Why only two jobs?",
                "A jobs board is the old product. Two paths force a human choice. We do not rank people.",
            ],
            [
                "Have you spoken to anyone?",
                "Only what is in the conversation log. If the log is empty, say so.",
            ],
            [
                "Traction?",
                "Four screens, the film, the live path. No paying seats. We will not pretend.",
            ],
        ],
    )

    heading(doc, "Talker script (7 minutes)", 1)
    add_p(doc, "This replaces any older four-minute speech. Do not read both.", space_after=8)

    subhead(doc, "0:00–0:50 · Slides 1–2")
    add_p(
        doc,
        "Everyone else hands you a list. We hand you proof. Ireland already assesses people. "
        "They get a course list. See you in three weeks. In that gap the plan lives only in their head. "
        "About 700 contractor roles gone this quarter. We take the same CV. We do not replace the meeting.",
        italic=True,
    )

    subhead(doc, "0:50–1:00 · Slide 3")
    add_p(doc, "Confirm. Question. Two jobs. The board. First the process — then live.", italic=True)

    subhead(doc, "1:00–2:00 · Slide 4 · film (silent)")
    add_p(
        doc,
        "One sentence: The model drafts. A person confirms. They leave with a board. Then quiet. "
        "Do not narrate the four screens.",
        italic=True,
    )

    subhead(doc, "2:00–3:20 · Slide 5 · live")
    add_p(
        doc,
        "Same sitting. Live. Nothing used until they say yes. Watch “managed stock.” Two jobs. They pick. "
        "This is the board. Flip who is in the room. Same evidence, different questions. Every line traces to a confirmed claim.",
        italic=True,
    )

    subhead(doc, "3:20–6:20 · Slides 6–10")
    add_p(
        doc,
        "The person does not pay. The small office is the buyer. We make the weeks between appointments count. "
        "Big companies can copy this — we start with a printout. ChatGPT is another list. We will not invent a story. "
        "Ten boards in one sitting. Twenty when that office copies. Two hundred when other small offices copy. "
        "If the first ten do not come back holding a board, we stop. We are a challenge team. "
        "Names — not sealed. Send us to Galway. Then one adviser, one sitting.",
        italic=True,
    )

    subhead(doc, "6:20–7:00")
    add_p(doc, "Slide 10 up. Stop.", italic=True)

    heading(doc, "Still fill before 13 Sep 2pm", 1)
    add_p(doc, "Mark each as sealed in comments when you decide.", space_after=8)
    add_table(
        doc,
        ["Sealed?", "Item"],
        [
            ["Not sealed", "Slide 2: keep ~700 or switch to 182,517. Not both."],
            [
                "Not sealed",
                "Film file on the presentation laptop. Whole cut, ~1:00, four screens + agentic orchestration process. Silent. Caption readable.",
            ],
            ["Clock", "Presenter says Slides 1–2 on a clock. If it exceeds 50 seconds, cut it."],
            [
                "Clicker",
                "Confirm screen ready · saved-copy backup (never spoken) · recorded run in the next tab",
            ],
            ["Not sealed", "Slide 9: names · who talks · who clicks · unfair angle only if true"],
            ["Not sealed", "Slide 10: one email + one URL"],
            ["Not sealed", "Live URL that will actually be on the slide"],
            ["Not sealed", "First adviser / conversation — or we stay honest that we have not spoken yet"],
            ["Rehearsal", "One full run of 7:00 with silent film and live click, both people"],
        ],
    )
    add_p(
        doc,
        "When comments are in, we seal this file and start designing. Do not design from an unsealed line.",
        bold=True,
        color=NAVY,
        space_after=8,
    )

    doc.save(OUT)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
