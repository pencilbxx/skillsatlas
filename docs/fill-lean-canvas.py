"""Fill docs/LeanCanvas-Editable2_WORKING VERSION.pdf in place.

All type is black. Mark unproven lines with OPEN:.
Re-run this file after editing copy. Template chrome (labels, grid, licence) is kept.

Rev 4 — mum test. Process in plain English. Stack stays in the repo, not here.
"""

from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parent
PDF = ROOT / "LeanCanvas-Editable2_WORKING VERSION.pdf"

BLACK = "#111111"

# Content rects sit under the printed titles.
BOXES = {
    "header_project": fitz.Rect(129.7, 34.0, 324.5, 55.8),
    "header_date": fitz.Rect(456.0, 34.0, 585.5, 55.8),
    "header_rev": fitz.Rect(662.5, 34.0, 727.5, 55.8),
    "legend": fitz.Rect(78.0, 57.2, 210.0, 69.5),
    "problem": fitz.Rect(80.0, 91.5, 206.0, 365.5),
    "solution": fitz.Rect(210.0, 91.5, 336.5, 221.0),
    "uvp": fitz.Rect(340.0, 91.5, 466.0, 365.5),
    "unfair": fitz.Rect(470.0, 91.5, 596.5, 221.0),
    "customers": fitz.Rect(600.0, 91.5, 726.5, 365.5),
    "metrics": fitz.Rect(210.0, 237.0, 336.5, 365.5),
    "channels": fitz.Rect(470.0, 237.0, 596.5, 365.5),
    "cost": fitz.Rect(80.0, 382.5, 401.5, 494.5),
    "revenue": fitz.Rect(405.5, 382.5, 726.5, 494.5),
}

CSS = f"""
body {{ font-family: helvetica, arial, sans-serif; margin: 0; padding: 0; color: {BLACK}; }}
p {{ margin: 0 0 5px 0; line-height: 1.22; color: {BLACK}; }}
.k {{ color: {BLACK}; font-weight: bold; margin: 0 0 3px 0; }}
.b {{ color: {BLACK}; }}
.h {{ color: {BLACK}; font-weight: bold; margin: 7px 0 3px 0; }}
"""


def html(inner: str, size: str) -> str:
    return (
        f"<div style='font-size:{size};color:{BLACK}'>"
        f"<style>{CSS}</style>{inner}</div>"
    )


HEADER_PROJECT = (
    "<p class='b' style='margin:0;font-size:8.5pt;font-weight:bold'>"
    "SkillsAtlas</p>"
)
HEADER_DATE = (
    "<p class='b' style='margin:0;font-size:8pt;text-align:center'>"
    "8 Sep 2026</p>"
)
HEADER_REV = (
    "<p class='b' style='margin:0;font-size:10pt;text-align:center;font-weight:bold'>4</p>"
)
LEGEND = (
    "<p class='b' style='margin:0;font-size:5.7pt'><b>OPEN:</b> not proven yet.</p>"
)

PROBLEM = """
<p class='k'>WHO HURTS</p>
<p class='b'>The person who just lost their job — and the adviser who only sees them every three weeks.</p>
<p class='b'><b>Today:</b> assessed → course list → silent weeks. The plan often dies in the gap.</p>
<p class='b'>This quarter you can point at it: about <b>700</b> contractor roles gone (Covalen / Meta). Scale: <b>182,517</b> on the Live Register (Aug 2026) — already counted, often already assessed, still leave with a list.</p>
<p class='h'>WHAT THEY DO INSTEAD</p>
<p class='b'>• Wait for the next appointment.<br/>
• Ask ChatGPT — more lists.<br/>
• Another course catalogue.<br/>
• Big HR software that takes months to install. Not this office.</p>
<p class='b'><b>OPEN:</b> one adviser to say this in their own words.</p>
"""

SOLUTION = """
<p class='k'>FOUR STEPS IN ONE SITTING</p>
<p class='b'><b>1. Confirm</b> — their CV. Only keep what they say is true. Skip is fine.</p>
<p class='b'><b>2. Questions</b> — two or three. A weak line becomes a story (a number, a tool, a date).</p>
<p class='b'><b>3. Two jobs</b> they can actually reach. They pick. One real Irish course if a skill is missing.</p>
<p class='b'><b>4. The board</b> — they walk out holding it: stories, likely questions, one step this week.</p>
<p class='b'>We don’t take the adviser’s meetings or job board. We fill the weeks until they meet again.</p>
<p class='b'><b>OPEN:</b> live site is still a mock — skillsatlas.vercel.app</p>
"""

UVP = """
<p class='k'>“Everyone else hands you a list. We hand you proof.”</p>
<p class='b'>Proof = two jobs you can already reach, in your own words, plus a board you take into the interview.</p>
<p class='b'>For the office: we don’t replace what you run. We make the weeks between appointments count — and you have something to show for it. The adviser spends less time re-explaining the same CV.</p>
<p class='b'>Not a jobs website. Not a test. Not a ranking of people. They choose.</p>
<p class='b'><b>OPEN:</b> say this in one breath with the presenter. Success = they come back holding a board they wrote.</p>
"""

UNFAIR = """
<p class='k'>WHY THIS ISN’T JUST CHATGPT</p>
<p class='b'>Nothing is used until they say yes.</p>
<p class='b'>We work from one CV, in one sitting. Big HR tools need months of company setup first.</p>
<p class='b'>The board only prints what they confirmed. We will not invent a story for the interview.</p>
<p class='b'>Honest: a big company could copy this. We start with small offices that still hand out a printout. What gets hard to copy is real results from those sittings — we don’t have those yet.</p>
<p class='b'><b>OPEN:</b> one adviser who will sit with us.</p>
"""

CUSTOMERS = """
<p class='k'>THE PERSON</p>
<p class='b'>Their job is gone or about to go.</p>
<p class='h'>THE OFFICE (who pays)</p>
<p class='b'>The small employment office that already sees them. The person does not pay.</p>
<p class='b'>First door: that kind of office in Ireland. A conversation is open — not a signed customer. The other large office in the same system is the next call.</p>
<p class='b'>Later, same four steps: a training programme or a union room. Not first: big-company HR, or an app people buy.</p>
<p class='b'><b>OPEN:</b> name one adviser this week. Write down what they said. Don’t put their logo on a slide as a customer.</p>
"""

METRICS = """
<p class='k'>TODAY</p>
<p class='b'>A four-screen mock and a live link. No one is paying. A real conversation beats a logo wall.</p>
<p class='k'>WHAT WE COUNT</p>
<p class='b'>People who leave holding a board. Plan: 10 in one sitting → 20 when that office copies → 200 as more small offices copy. Not app downloads.</p>
<p class='b'><b>Success:</b> they come back to the next appointment with that board.</p>
<p class='b'><b>OPEN:</b> did the questions make the story stronger? Did they start the course?</p>
"""

CHANNELS = """
<p class='k'>THIS YEAR — IRELAND</p>
<p class='b'>Show it. Sit with one adviser. That office copies. Other offices hear from them. Not ads. Not a national contract.</p>
<p class='b'>Same four steps in a training programme or union room — only the spoken sentence changes.</p>
<p class='h'>NEXT YEAR</p>
<p class='b'>Same sitting abroad. Change the course list. Keep the four steps.</p>
<p class='b'><b>OPEN:</b> first office outside Ireland — later. No invented market size.</p>
"""

COST = """
<p class='k'>NOW</p>
<p class='b'>A two-week challenge team. Practice CVs, not real people. Cheap to run one sitting.</p>
<p class='h'>LATER</p>
<p class='b'>Teach the office. Keep the course list current. Cost of running many sittings. Extra care when real people’s details are involved.</p>
"""

REVENUE = """
<p class='k'>The person does not pay.</p>
<p class='b'><b>Today:</b> free, one group. Did they come back with the board?</p>
<p class='b'><b>Then:</b> the office pays per sitting or per adviser. Price after we see it work.</p>
<p class='b'><b>Later:</b> same offer in other countries. Same product.</p>
<p class='b'>Not this month: a paid phone app, or selling inside big companies.</p>
<p class='b'><b>OPEN:</b> one office that can try about 20 people without a year of paperwork.</p>
"""

CONTENT = {
    "header_project": (HEADER_PROJECT, "9pt"),
    "header_date": (HEADER_DATE, "9pt"),
    "header_rev": (HEADER_REV, "11pt"),
    "legend": (LEGEND, "5.7pt"),
    "problem": (PROBLEM, "7.3pt"),
    "solution": (SOLUTION, "5.7pt"),
    "uvp": (UVP, "7.4pt"),
    "unfair": (UNFAIR, "6.2pt"),
    "customers": (CUSTOMERS, "7.1pt"),
    "metrics": (METRICS, "6.15pt"),
    "channels": (CHANNELS, "6.2pt"),
    "cost": (COST, "7.2pt"),
    "revenue": (REVENUE, "6.7pt"),
}


def restore_template(doc: fitz.Document, page: fitz.Page) -> None:
    """Keep only the original Trauring grid stream; drop overlay XObjects."""
    keep = None
    for xref in page.get_contents() or []:
        data = doc.xref_stream(xref) or b""
        if b"77.88189" in data or b"728.0079" in data:
            keep = xref
            break
    if keep is None:
        contents = page.get_contents()
        if not contents:
            raise RuntimeError("PDF has no page contents")
        keep = contents[0]
    doc.xref_set_key(page.xref, "Contents", f"{keep} 0 R")


def hide_form_fields(page: fitz.Page) -> None:
    """Blank the Ravens Point field values so they cannot show through."""
    for widget in page.widgets() or []:
        widget.field_value = ""
        widget.field_display = 1  # hidden
        widget.update()


def fill(page: fitz.Page) -> list[str]:
    notes: list[str] = []
    for name, (inner, size) in CONTENT.items():
        result = page.insert_htmlbox(BOXES[name], html(inner, size), archive=None)
        spare, scale = result if isinstance(result, tuple) else (result, 1.0)
        notes.append(f"{name}: spare={float(spare):.1f} scale={float(scale):.3f}")
    return notes


def save_over(doc: fitz.Document, dest: Path) -> Path:
    tmp = ROOT / "_lean-canvas-tmp.pdf"
    doc.save(tmp, garbage=4, deflate=True)
    doc.close()
    try:
        tmp.replace(dest)
        return dest
    except PermissionError:
        fallback = ROOT / "LeanCanvas-Editable2_WORKING VERSION-filled.pdf"
        if fallback.exists():
            try:
                fallback.unlink()
            except PermissionError:
                fallback = ROOT / "LeanCanvas-Editable2_WORKING VERSION-rev2.pdf"
        tmp.replace(fallback)
        print("LOCKED: could not write", dest.name, "→ wrote", fallback.name)
        return fallback


def main() -> None:
    dest = PDF
    doc = fitz.open(PDF)
    page = doc[0]
    restore_template(doc, page)
    hide_form_fields(page)
    dest = save_over(doc, dest)

    doc = fitz.open(dest)
    page = doc[0]
    notes = fill(page)
    dest = save_over(doc, dest)

    preview = ROOT / "_lean-canvas-preview.png"
    doc2 = fitz.open(dest)
    pix = doc2[0].get_pixmap(matrix=fitz.Matrix(2.2, 2.2), alpha=False)
    pix.save(preview)
    text = doc2[0].get_text()
    doc2.close()
    print("wrote", dest)
    print("preview", preview)
    for line in notes:
        print(" ", line)
    for needle in ("RAVENS", "solopreneur", "Telegram", "Liquidating Offer"):
        print(f"old-copy leftover {needle!r}:", needle.lower() in text.lower())


if __name__ == "__main__":
    main()
