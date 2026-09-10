"""Generate the current SkillsAtlas Lean Canvas as a clean one-page PDF.

Output: docs/canvas/lean-canvas-working.pdf
Preview: docs/canvas/lean-canvas-preview.png

The PDF is drawn from scratch on every run. This avoids old flattened copy appearing
under a new revision when the generator is run more than once.
"""

from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
CANVAS = DOCS / "canvas"
PDF = CANVAS / "lean-canvas-working.pdf"
PREVIEW = CANVAS / "lean-canvas-preview.png"

NAVY = "#102B3F"
CORAL = "#ED6A4A"
MUTED = "#49606D"
BLACK = "#111111"
CREAM = (0.969, 0.957, 0.937)
WHITE = (1, 1, 1)
LINE = (0.55, 0.58, 0.60)

CSS = f"""
body {{ font-family: Helvetica, Arial, sans-serif; margin: 0; color: {BLACK}; }}
p {{ margin: 0 0 3.2px 0; line-height: 1.13; }}
.k {{ color: {NAVY}; font-weight: bold; margin: 0 0 4px 0; }}
.h {{ color: {CORAL}; font-weight: bold; margin: 5px 0 3px 0; }}
.open {{ color: {MUTED}; }}
"""

CONTENT = {
    "problem": """
<p class='k'>THE REAL PROBLEM</p>
<p>A CV, vacancy or course list can point at another title. It does not show the confirmed <b>evidence</b>, the specific <b>gap</b>, or one next step that makes the route credible.</p>
<p>The worker still has to explain what they actually did. The professional beside them can guide, but the worker confirms the evidence and chooses the route.</p>
<p><b>Visible transition:</b> about <b>700</b> Covalen / Meta contractor roles cut in Jul 2026 (Bloomberg / Los Angeles Times).</p>
<p><b>System context:</b> Live Register Aug 2026: <b>182,517</b>; activation programmes Jul 2026: <b>29,956</b> (CSO). Not a TAM and not proof of demand.</p>
<p class='h'>WHAT THEY DO INSTEAD</p>
<p>&#8226; Apply from a vague CV claim.<br/>&#8226; Search long job and course lists.<br/>&#8226; Use general interview tools without a confirmation trail.<br/>&#8226; Use large talent systems that require organisation-wide setup.</p>
<p><b>Field conversation:</b> evidence beyond keywords and two constrained routes landed. Not a customer or pilot.</p>
<p class='open'><b>OPEN:</b> one hosted sitting, buyer authority and workflow fit.</p>
""",
    "solution": """
<p class='k'>ONE SITTING. CONFIRMED PROOF.</p>
<p>Same CV. SkillsAtlas supports the professional across the table; it does not replace the meeting or job board.</p>
<p><b>1. Evidence</b> — confirm or skip.</p>
<p><b>2. Sharpen</b> — 2–3 focused questions; review stronger wording.</p>
<p><b>3. Two routes</b> — unranked; worker chooses.</p>
<p><b>4. Interview Board</b> — route-specific story, question example and one step, saved as PDF.</p>
<p class='open'><b>OPEN:</b> production AI pipeline and verified provider catalogue.</p>
""",
    "uvp": """
<p class='k'>“A list gives you options. SkillsAtlas gives you proof.”</p>
<p><b>Proof</b> = worker-confirmed evidence + a named gap + one next step + a SkillsAtlas <b>Interview Board</b>.</p>
<p>The product is not a better assessment, job board or catalogue. It makes the worker’s evidence usable in one candidate-present sitting.</p>
<p><b>For the host:</b> keep the existing meeting and systems. SkillsAtlas structures the evidence conversation and produces a take-away artefact.</p>
<p>Not a test. Not candidate ranking. Not recruiter-alone CRM search. Not a consumer app in the current model.</p>
<p><b>Example:</b> “managed stock” becomes a number, system and date only after the worker confirms the stronger wording.</p>
<p class='open'><b>OPEN:</b> whether the Board is useful in a hosted sitting and whether an organisation will pay.</p>
""",
    "unfair": """
<p class='k'>WHY THIS IS NOT A GENERIC CHAT</p>
<p>Original words are preserved. Extracted and strengthened wording require worker confirmation. Skip is free.</p>
<p>Routes are limited to two and remain unranked. The Interview Board may use only confirmed evidence.</p>
<p>Existing meetings, recruiters, job boards and catalogues stay.</p>
<p><b>Honest:</b> the screens can be copied. Workflow fit, trust and evidence outcomes would have to become the moat.</p>
<p class='open'><b>OPEN:</b> real outcome and willingness-to-pay evidence.</p>
""",
    "customers": """
<p class='k'>USER / PROPOSED PAYER</p>
<p><b>User:</b> a worker whose role is gone or about to go. The prototype uses a synthetic warehouse CV.</p>
<p><b>Proposed payer:</b> an organisation already hosting a candidate-present transition or recruitment sitting. The worker does not pay.</p>
<p><b>Room A:</b> worker + employment or outplacement adviser.</p>
<p><b>Room B:</b> candidate + mid-tier recruiter.</p>
<p>Same four screens; different professional across the table.</p>
<p><b>Not this product:</b> recruiter-alone CRM search. It needs separate discovery on access, privacy, consent, integration and buyer value.</p>
<p><b>Field status:</b> one Enniscorthy conversation. Not a signed customer, pilot, logo or price signal.</p>
<p class='open'><b>OPEN:</b> buyer authority, workflow fit, privacy requirements and willingness to pay in each room.</p>
""",
    "metrics": """
<p class='k'>WHAT EXISTS TODAY</p>
<p>Clickable four-screen sitting, existing silent film, downloadable Interview Board PDF and one field conversation.</p>
<p>€0 revenue. No customer, pilot or signed buyer.</p>
<p class='h'>NEXT SITTING MUST TEST</p>
<p>&#8226; Fits the host workflow?<br/>&#8226; Board useful to the worker?<br/>&#8226; Skip / confirmation prevents invented detail?<br/>&#8226; Organisation willing to pay?</p>
""",
    "channels": """
<p class='k'>THIS YEAR — IRELAND</p>
<p>Hub 14 Sep → Galway 24 Sep if selected. Show the sitting. Seek one hosted test with agreed workflow and practice data first.</p>
<p>The host keeps its meetings, systems, job board and catalogue.</p>
<p class='h'>LATER</p>
<p>Only after validation: repeat the same candidate-present sitting in another organisation or region.</p>
<p class='open'><b>OPEN:</b> which host type has the clearest problem, authority and workflow fit.</p>
""",
    "cost": """
<p class='k'>NOW</p>
<p>Two-week challenge team. Practice CVs, not live case files. Existing static prototype and film. Organiser model credits. No new film and no second product.</p>
<p class='h'>LATER</p>
<p>Production build, verified learning catalogue, host onboarding, privacy and security review, model and storage costs, evidence-quality monitoring, and support.</p>
""",
    "revenue": """
<p class='k'>THE WORKER DOES NOT PAY.</p>
<p><b>Today: €0.</b> No customer, pilot, price or willingness-to-pay evidence.</p>
<p><b>Proposed model:</b> the organisation hosting the sitting pays. Test adviser-host and recruiter-host buying separately.</p>
<p><b>Validation sequence:</b> practice data → agreed hosted sitting → workflow and privacy review → price research. Do not assume per-sitting or per-seat yet.</p>
<p>Not this year: paid consumer app, national tender, recruiter CRM search or invented ARR.</p>
<p class='open'><b>OPEN:</b> buyer authority, procurement route, deployment constraints and willingness to pay.</p>
""",
}


def html(inner: str, size: float) -> str:
    return f"<div style='font-size:{size}pt'><style>{CSS}</style>{inner}</div>"


def draw_label(page: pymupdf.Page, rect: pymupdf.Rect, number: str, title: str) -> pymupdf.Rect:
    page.insert_text((rect.x0 + 4, rect.y0 + 11), number, fontsize=6.5, fontname="helv", color=(0.45, 0.48, 0.50))
    page.insert_text((rect.x0 + 22, rect.y0 + 11), title.upper(), fontsize=6.5, fontname="helv", color=(0.45, 0.48, 0.50))
    return pymupdf.Rect(rect.x0 + 5, rect.y0 + 17, rect.x1 - 5, rect.y1 - 5)


def build() -> None:
    doc = pymupdf.open()
    page = doc.new_page(width=842, height=595)
    page.draw_rect(page.rect, color=WHITE, fill=WHITE)

    # Header
    page.insert_text((36, 27), "SKILLSATLAS — LEAN CANVAS", fontsize=14, fontname="hebo", color=(0.063, 0.169, 0.247))
    page.insert_text((36, 44), "Title-to-proof narrative · 10 Sep 2026 · revision 7", fontsize=8, fontname="helv", color=(0.286, 0.376, 0.427))
    page.insert_text((595, 29), "STATUS", fontsize=7, fontname="hebo", color=(0.286, 0.376, 0.427))
    page.draw_rect(pymupdf.Rect(636, 17, 806, 42), color=(0.929, 0.416, 0.290), fill=CREAM, width=0.8)
    page.insert_text((646, 33), "WORKING · OPEN ITEMS MARKED", fontsize=7.5, fontname="hebo", color=(0.063, 0.169, 0.247))
    page.insert_text((36, 61), "Worker uses · host organisation is the proposed payer · no customer, pilot or price claim", fontsize=7, fontname="helv", color=(0.286, 0.376, 0.427))

    m = 36
    x = [36, 190, 344, 498, 652, 806]
    top, middle, bottom = 76, 244, 412
    foot = 548

    boxes = {
        "problem": (pymupdf.Rect(x[0], top, x[1], bottom), "1", "Problem", 5.65),
        "solution": (pymupdf.Rect(x[1], top, x[2], middle), "3", "Solution", 5.45),
        "metrics": (pymupdf.Rect(x[1], middle, x[2], bottom), "8", "Key metrics", 5.5),
        "uvp": (pymupdf.Rect(x[2], top, x[3], bottom), "2", "Unique value proposition", 5.65),
        "unfair": (pymupdf.Rect(x[3], top, x[4], middle), "9", "Defensibility", 5.35),
        "channels": (pymupdf.Rect(x[3], middle, x[4], bottom), "5", "Channels", 5.45),
        "customers": (pymupdf.Rect(x[4], top, x[5], bottom), "4", "Customer segments", 5.55),
        "cost": (pymupdf.Rect(x[0], bottom, 421, foot), "7", "Cost structure", 6.2),
        "revenue": (pymupdf.Rect(421, bottom, x[5], foot), "6", "Revenue streams", 6.05),
    }

    for rect, _, _, _ in boxes.values():
        page.draw_rect(rect, color=LINE, fill=WHITE, width=0.55)

    for name, (rect, number, title, size) in boxes.items():
        content_rect = draw_label(page, rect, number, title)
        spare, scale = page.insert_htmlbox(content_rect, html(CONTENT[name], size))
        if spare < -0.1:
            raise RuntimeError(f"Content overflow in {name}: {spare=}, {scale=}")

    page.insert_text((36, 566), "Lean Canvas format adapted from Ash Maurya / Business Model Canvas by Alex Osterwalder · CC BY-SA 3.0", fontsize=6, fontname="helv", color=(0.40, 0.42, 0.44))
    page.insert_text((806, 566), "SkillsAtlas", fontsize=6, fontname="hebo", color=(0.063, 0.169, 0.247), rotate=0)

    tmp = CANVAS / "_lean-canvas-clean.pdf"
    doc.save(tmp, garbage=4, deflate=True, clean=True)
    doc.close()
    tmp.replace(PDF)

    check = pymupdf.open(PDF)
    pix = check[0].get_pixmap(matrix=pymupdf.Matrix(2.2, 2.2), alpha=False)
    pix.save(PREVIEW)
    text = check[0].get_text()
    check.close()
    for expected in (
        "A list gives you options",
        "WORKING · OPEN ITEMS MARKED",
        "THE WORKER DOES NOT PAY",
        "recruiter-alone CRM search",
    ):
        if expected.lower() not in text.lower():
            raise RuntimeError(f"Missing generated Lean Canvas text: {expected}")
    for stale in ("Everyone else hands you a list", "silent weeks", "REVISION 6"):
        if stale.lower() in text.lower():
            raise RuntimeError(f"Stale generated Lean Canvas text: {stale}")
    print("wrote", PDF)
    print("preview", PREVIEW)


if __name__ == "__main__":
    build()
