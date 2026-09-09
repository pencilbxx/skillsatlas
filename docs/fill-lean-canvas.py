"""Fill docs/LeanCanvas-Editable2_WORKING VERSION.pdf in place.

All type is black. Mark unproven lines with OPEN:.
Re-run this file after editing copy. Template chrome (labels, grid, licence) is kept.

Rev 6 — early-investor pass on rev 5. Sourced numbers. Plain English.
Problem and solution first. No pitch-internal notes. No stack jargon.
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
p {{ margin: 0 0 4px 0; line-height: 1.18; color: {BLACK}; }}
.k {{ color: {BLACK}; font-weight: bold; margin: 0 0 2px 0; }}
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
    "9 Sep 2026</p>"
)
HEADER_REV = (
    "<p class='b' style='margin:0;font-size:10pt;text-align:center;font-weight:bold'>6</p>"
)
LEGEND = (
    "<p class='b' style='margin:0;font-size:5.5pt'><b>OPEN:</b> not proven. "
    "Other figures are sourced.</p>"
)

PROBLEM = """
<p class='k'>THE REAL PROBLEM</p>
<p class='b'>Someone’s job is gone. They can see job titles. They cannot see the <b>evidence</b> they already have, the smallest skill <b>gap</b>, or a short next step that makes them <b>interview-ready</b>.</p>
<p class='b'>Ireland already assessed them. They get a course list. Next appointment is about <b>three weeks</b>. In those silent weeks the plan lives only in their head. The adviser cannot choose the next job for them.</p>
<p class='b'><b>This quarter:</b> ~<b>700</b> contractor roles gone (Covalen / Meta). Meta Ireland ~20% down (Bloomberg / LA Times, Jul 2026).</p>
<p class='b'><b>Already sitting in that system</b> (not a made-up market): Live Register Aug 2026 <b>182,517</b>; <b>127,708</b> of them less than a year; <b>29,956</b> more on activation programmes (CSO, 4 Sep 2026).</p>
<p class='b'><b>Why now:</b> ~<b>850,000</b> people in Ireland sit in jobs AI will change (30% of 2.83m). Unemployment is only <b>4.4%</b>. The shock is inside work.</p>
<p class='b'><b>Money already in the sitting:</b> JobPath paid contractors €<b>249.1m</b> (2016–20) + €<b>42m</b> to wind down — people still left with a list. Historic. Not this year’s invoice.</p>
<p class='h'>WHAT THEY DO INSTEAD</p>
<p class='b'>• Wait — the default.<br/>
• ChatGPT — more lists. That <i>is</i> the broken handoff.<br/>
• Another catalogue. Springboard+ 2026: <b>7,274</b> places, 244 courses. Training exists. The sitting still ends on a list.<br/>
• Big-company talent software: months of setup. Not this office.</p>
<p class='b'><b>Heard (Sep 2026):</b> sat with an adviser. She cannot decide for the applicant. Not a customer. <b>OPEN:</b> a booked sitting. Current-year office invoices.</p>
"""

SOLUTION = """
<p class='k'>ONE SITTING. INTERVIEW-READY.</p>
<p class='b'>Same CV the office already has. We wrap the meeting. We do not take their diary or their jobs board.</p>
<p class='b'><b>1. Evidence</b> — they confirm what they did. Skip is free. Nothing used until they say yes.</p>
<p class='b'><b>2. Sharpen</b> — two or three questions. “Managed stock” → 2,400 SKUs, a tool, a date.</p>
<p class='b'><b>3. Two jobs</b> they pick. Named gap = <b>one</b> real Irish course (Skillnet / SOLAS / Springboard+), not 200.</p>
<p class='b'><b>4. The board</b> — confirmed stories, likely questions, one step this week. They walk out holding it.</p>
<p class='b'>We propose. They choose. We do not rank people. <b>OPEN:</b> public walkthrough is still a mock.</p>
"""

UVP = """
<p class='k'>“Everyone else hands you a list. We hand you proof.”</p>
<p class='b'><b>Proof</b> = confirmed <b>evidence</b> + a <b>named gap</b> + they leave <b>interview-ready</b> (the board they take into the room).</p>
<p class='b'>Ireland already assessed them. The product is not a better list and not a better assessment. It is what they walk out holding.</p>
<p class='b'><b>For the office:</b> you still run the appointments. We make the three weeks count. You are not asked to pick their job.</p>
<p class='b'>Not a jobs website. Not a test. Not a ranking of people. Not ChatGPT on a CV. You are buying a sitting that produces an artefact — not a chatbot seat.</p>
<p class='b'><b>Picture it:</b> a warehouse CV that says “managed stock” walks into an interview able to say the number, the system, and the date — and which of two honest next jobs they are aiming at.</p>
<p class='b'><b>OPEN:</b> we will measure, not claim: they come back to the next appointment holding a board they wrote.</p>
"""

UNFAIR = """
<p class='k'>WHY A LIST-MAKER CANNOT DO THIS</p>
<p class='b'>Nothing is used until they confirm. Skip is free. The board only prints what they said was true. We will not invent a story for the interview. HR in the room holds that line.</p>
<p class='b'>One CV, one sitting. Big talent platforms need months of company setup first.</p>
<p class='b'><b>Honest:</b> a bank with an AI team can copy the screens. We start with offices that still hand out a printout. Sitting results are the moat — we do not have them yet.</p>
<p class='b'><b>OPEN:</b> one adviser who will sit. A conversation (9 Sep) is not a booked sitting. Outcome data is the real moat.</p>
"""

CUSTOMERS = """
<p class='k'>USER / BUYER</p>
<p class='b'><b>User:</b> job gone or about to go. Practice CVs (not real people): warehouse worker after a long spell in one site; a strong worker whose qualification does not map cleanly to Irish job titles. This quarter: ~700 Covalen roles.</p>
<p class='b'><b>Buyer:</b> the small employment office the State already pays to see them (~every three weeks). The person never pays.</p>
<p class='b'><b>Early adopter:</b> the adviser who already runs the sitting and hates sending them out with a course list.</p>
<p class='b'><b>First door:</b> Ireland, that kind of office. Conversation 9 Sep (Enniscorthy). Not a signed customer. No logo. Next: another office of the same type.</p>
<p class='b'><b>Later, same four steps:</b> a training programme or a union room. <b>Not first:</b> a bank’s HR team, or an app people buy. Same sitting: any room that already assesses, then leaves them with a list.</p>
<p class='b'><b>OPEN:</b> a sitting in the diary. An office that can try ~20 people without a year of paperwork.</p>
"""

METRICS = """
<p class='k'>WHAT WE CAN SHOW TODAY</p>
<p class='b'>Four-screen walkthrough, process film, one named conversation. €0 revenue. No signed office. A conversation is traction. A logo wall is not.</p>
<p class='k'>WHAT WE WILL COUNT (plan — not users we have)</p>
<p class='b'><b>10</b> boards, one sitting → <b>20</b> when that office copies → <b>200</b> across ~10 small offices. Stop if no adviser will sit, or they cannot copy without us in the room.</p>
<p class='b'><b>Success:</b> they come back holding a board they wrote from their own evidence.</p>
<p class='b'><b>OPEN:</b> did questions turn a weak line into a story? Did they start the named course?</p>
"""

CHANNELS = """
<p class='k'>THIS YEAR — IRELAND</p>
<p class='b'>Hub 14 Sep → Galway 24 Sep if we go through. Show the sitting. Book one adviser. That office copies. Other offices hear from them. Not ads. Not a national contract.</p>
<p class='b'>Courses already exist (Springboard+ 7,274 places). We do not become the catalogue. We point at <b>one</b> course that closes a named gap.</p>
<p class='h'>NEXT YEAR</p>
<p class='b'>Same sitting abroad. Change the course list. Keep evidence → named gap → interview-ready. 32 public employment services in the European network. No invented €bn market.</p>
<p class='b'><b>OPEN:</b> first office outside Ireland — after Ireland copies.</p>
"""

COST = """
<p class='k'>NOW</p>
<p class='b'>Two-week challenge team. Practice CVs, not live case files. Organiser model credits. A sitting is cheap to run. No fine-tune. No second product.</p>
<p class='h'>LATER</p>
<p class='b'>Teach the office. Keep the Irish course list current. Extra care (and a privacy review) when a real adviser touches real people. Cost of running many sittings. Time to the first office that can sign without an HQ AI programme.</p>
"""

REVENUE = """
<p class='k'>THE PERSON DOES NOT PAY.</p>
<p class='b'><b>Today: €0.</b> We sell the sitting to the office, not a phone app. No invented ARR.</p>
<p class='b'><b>Pilot:</b> free, one group, practice CVs first then about 20 people. Measure: did they come back with the board?</p>
<p class='b'><b>Then:</b> the office pays per sitting or per adviser. Price after we see it work — not a fee ladder from an old scheme.</p>
<p class='b'><b>Later:</b> same offer in other countries. Same product. Swap the course list.</p>
<p class='b'>Not this year: a paid consumer app, or selling into a bank that can build this itself.</p>
<p class='b'><b>OPEN:</b> one office that can try ~20 people without a year of paperwork.</p>
"""

CONTENT = {
    "header_project": (HEADER_PROJECT, "9pt"),
    "header_date": (HEADER_DATE, "9pt"),
    "header_rev": (HEADER_REV, "11pt"),
    "legend": (LEGEND, "5.5pt"),
    "problem": (PROBLEM, "5.25pt"),
    "solution": (SOLUTION, "5.2pt"),
    "uvp": (UVP, "5.4pt"),
    "unfair": (UNFAIR, "5.3pt"),
    "customers": (CUSTOMERS, "5.35pt"),
    "metrics": (METRICS, "5.4pt"),
    "channels": (CHANNELS, "5.3pt"),
    "cost": (COST, "6.1pt"),
    "revenue": (REVENUE, "5.7pt"),
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
