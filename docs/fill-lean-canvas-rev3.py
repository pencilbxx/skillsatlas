"""One-shot: rebuild Lean Canvas rev 3 into docs/LeanCanvas-rev3.pdf.

Does not touch the current mum-test canvas (WORKING VERSION.pdf).
Uses that file only as the blank grid source.
"""

from pathlib import Path
import shutil

import fitz

ROOT = Path(__file__).resolve().parent
TEMPLATE = ROOT / "LeanCanvas-Editable2_WORKING VERSION.pdf"
DEST = ROOT / "LeanCanvas-rev3.pdf"
TMP = ROOT / "_lean-canvas-rev3-tmp.pdf"
PREVIEW = ROOT / "_lean-canvas-rev3-preview.png"

BLACK = "#111111"

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
p {{ margin: 0 0 5px 0; line-height: 1.18; color: {BLACK}; }}
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
    "SkillsAtlas — Evidence Agent</p>"
)
HEADER_DATE = (
    "<p class='b' style='margin:0;font-size:8pt;text-align:center'>"
    "8 Sep 2026</p>"
)
HEADER_REV = (
    "<p class='b' style='margin:0;font-size:10pt;text-align:center;font-weight:bold'>3</p>"
)
LEGEND = (
    "<p class='b' style='margin:0;font-size:5.7pt'><b>OPEN:</b> not proven yet. "
    "Everything else is sourced or in hand.</p>"
)

PROBLEM = """
<p class='k'>WHO HURTS, THIS WEEK</p>
<p class='b'>The worker just told their role is gone — and the adviser who sees them once every ~3 weeks. Visible cases: Meta’s Irish workforce ~20% down; <b>~700 Covalen</b> contractor roles gone.</p>
<p class='b'><b>Scale (problem slide, not a CSO pitch):</b> Live Register Aug 2026 <b>182,517</b> already counted; <b>29,956</b> on activation programmes on top of that. Most on the register &lt;1 year. Already assessed. Still leave with a list.</p>
<p class='b'><b>Why it matters:</b> ~850,000 people in Ireland sit in jobs AI will meaningfully change (30% of 2.83m; Bloomberg 2026 × CSO Q4 2025). Unemployment is only 4.4%. The shock is inside employment.</p>
<p class='b'>What they get today: <b>assessed → course-list printout → silent weeks</b>. JobPath already cost the State <b>€249.1m (2016–20)</b> + <b>€42m</b> to wind down — and still left them alone with a list.</p>
<p class='h'>ALTERNATIVES (incl. doing nothing)</p>
<p class='b'>• Do nothing / wait for the next slot — the default.<br/>
• ChatGPT / generic LLM: keywords + courses. That <i>is</i> the broken handoff.<br/>
• Assessment PDF / course catalogue (FIT, ReBOOT, Skillnet): training exists; the sitting still ends on a list. We wrap it; we do not replace it.<br/>
• Gloat / Fuel50 / TechWolf + €300/seat HRIS: need a job architecture and an AI team. Not the beachhead.</p>
<p class='b'><b>OPEN:</b> one named quote from an adviser or ETB. Price the silent weeks (€/head). Confirm 2025/26 Intreo Partner invoices before quoting this year’s spend.</p>
"""

SOLUTION = """
<p class='k'>They leave holding proof, not a printout.</p>
<p class='b'>We use the same CV the adviser already has. Nothing is used until they say it is true. Skip any question — no penalty.</p>
<p class='b'>Two or three questions turn a weak line into something they can prove: a number, a tool, a date.</p>
<p class='b'>Then two roles they can already reach. Not a job board. They pick. If a gap is real, we name one Irish course that closes it.</p>
<p class='b'>They walk out holding a board — stories they confirmed, questions they can practise, one step this week. The adviser’s appointments and job board stay theirs.</p>
<p class='b'><b>Live:</b> skillsatlas.vercel.app (wireframe). <b>OPEN:</b> working app not on that URL yet.</p>
"""

UVP = """
<p class='k'>“Everyone else hands you a list. We hand you proof — two roles you can already reach, confirmed by you, with a board to walk into the interview holding.”</p>
<p class='b'>Evidence agent for Irish restructuring. Not a recommendation engine. Not ATS keywords. Not a personality test. Not a job board.</p>
<p class='b'>LLM drafts. <b>Agentic orchestration</b> (BPMN + code) decides what is allowed. The person confirms. Exactly two ESCO routes. Humans decide. We do not rank people.</p>
<p class='b'><b>No job architecture required.</b> We run one person against ESCO on day one — the office that will never plug into Gloat.</p>
<p class='b'><b>High concept:</b> Agentic redeployment with an audit trail — confirmed evidence, transferable skills, a plan they can afford, STAR they can carry into the room.</p>
<p class='b'>Flip interview setting: same evidence, different questions. Every line traces to a CONFIRMED claim. GDPR-shaped by architecture (no protected-trait fields). Demo uses synthetic personas.</p>
<p class='b'><b>Not this week:</b> consumer download, internal-mobility platform, more-than-two roles on screen, a fine-tuned model.</p>
<p class='b'>Same product abroad: swap the catalogue. ESCO stays. Year 2 after Ireland copies. Enterprises can copy this — we sell to the office with no AI team.</p>
<p class='b'><b>OPEN:</b> freeze the one-breath line with the presenter. Pilot metric (not a claim): share who return to the next appointment holding a self-authored board.</p>
"""

UNFAIR = """
<p class='k'>HARD TO COPY (not the model)</p>
<p class='b'>• Trust as a gate: nothing used until they confirm. Skip is free. A caseworker can allow it — it cannot override their judgement.<br/>
• Governance as code: OBSERVED / REPORTED / PROPOSED / HUMAN_REVIEW. Never-invent. Two unranked routes.<br/>
• ESCO pin — no pre-built job architecture. Day-one usable where Gloat cannot land.<br/>
• Every [AI] wrapped in a [CODE] guardrail. Fail → retry once → drop the claim.<br/>
• HR in the room (Brigitte) without a competency-matrix product.</p>
<p class='b'>Honest moat: outcome data from a live sitting. Thin today. Compounds if an Intreo Partner office copies. Fine-tune parked.</p>
<p class='b'><b>OPEN:</b> named champion adviser. First sitting that copies without us in the room.</p>
"""

CUSTOMERS = """
<p class='k'>INITIAL CUSTOMER (this fortnight)</p>
<p class='b'><b>User:</b> worker whose role is gone or about to go (warehouse, contractor, qualification-gap). Demo: two synthetic personas. This quarter: Meta / Covalen (~700).</p>
<p class='b'><b>Buyer:</b> small / mid-tier Intreo Partner office — Turas Nua as <i>context</i> (not a logo-as-customer), Seetec as the verified twin. ETB adult guidance, smaller outplacement. Printout + 3-week gap. No internal LLM. Worker does not pay.</p>
<p class='b'><b>Early adopter:</b> the adviser who already runs the sitting and hates sending them out with a course list.</p>
<p class='b'><b>Not this week:</b> corporate HR / internal mobility (Gloat’s market). Not a consumer app. Age / gender / immigrant are not schema segments — ReBOOT etc. are rooms.</p>
<p class='h'>LATER DOORS (same URL, different sentence)</p>
<p class='b'>FIT / Women ReBOOT / Back to Work Connect. Unions (SIPTU / Fórsa) after the hub — not Hub traction.</p>
<p class='h'>EXPORT CUSTOMER (Year 2)</p>
<p class='b'>Same pair: jobseeker + PES counsellor / contracted provider. 32 PES. All EURES countries have mapped or adopted ESCO occupations (Oct 2025); the <i>skills</i> layer is still uneven — that is the gap we sell into.</p>
<p class='b'>Not first: LU / BE-VDAB / SE. Not first: UK (SSC). Not a consumer download in any country.</p>
<p class='b'><b>OPEN:</b> name one reachable Irish adviser this week. Log date, role, what they said. Do not put a provider brand on a slide as a customer.</p>
"""

METRICS = """
<p class='k'>PROOF SO FAR (honest)</p>
<p class='b'>Four-screen wireframe, live URL, versioned prompts, BPMN, guardrail spec. No paying seats. No LOI. Two-week PoC. A conversation is traction; a logo wall is not.</p>
<p class='k'>SITTING-COUNTS (plan, not traction)</p>
<p class='b'>10 boards in one sitting → 20 when that office copies → 200 across ~10 small/mid-tier offices. Kill-points between gates. Not B2C installs.</p>
<p class='b'><b>Success:</b> they come back holding a board they wrote from their own evidence.</p>
<p class='b'><b>OPEN:</b> % weak claims lifted 0–1 → 2–3 after questions. Next-appointment show-rate with board vs without. Named course actually started.</p>
"""

CHANNELS = """
<p class='k'>YEAR 1 — IRELAND</p>
<p class='b'>Hub 14 Sep → Galway 24 Sep. One adviser sitting. Copy office-to-office (Intreo Partner → Seetec as next call). Not ads. Not a national DSP tender.</p>
<p class='b'>Same four screens in FIT / ReBOOT / Back to Work Connect — spoken sentence only. Unions later if that office is the wrong door.</p>
<p class='h'>YEAR 2 — EXPORT</p>
<p class='b'>What travels: ESCO + confirm/skip + two routes + board. Swap the course catalogue. First: contracted PES with no national AI matcher. UK SSC later.</p>
<p class='b'>Commission: complement PES counsellors, not replace them. That is the product.</p>
<p class='b'><b>OPEN:</b> first overseas door (one PES contractor). No invented €bn TAM.</p>
"""

COST = """
<p class='k'>NOW (challenge build)</p>
<p class='b'>Organiser OpenAI credits · two pinned LLM tiers (cheap extraction / expensive route-reasoning only) · ESCO v1.2.0 free · Vercel Hobby · Supabase EU · Camunda as a drawing, not a cluster. ~6 structured LLM calls / journey = cents. Synthetic data. No custom auth. No fine-tune (no labelled outcome data). No second agent framework. Two-week team.</p>
<p class='h'>LATER</p>
<p class='b'>DPIA when a real adviser touches data · catalogue ops per country · adviser training · API cost at 200 sittings · sales time to the first office that can sign without an HQ AI programme · production Camunda 8 only if a buyer wants Operate-grade audit · fine-tune only after real placement outcomes exist.</p>
"""

REVENUE = """
<p class='k'>HOW IT MAKES MONEY</p>
<p class='b'>Worker does not pay in activation. <b>Today: €0.</b> We sell the sitting, not a consumer SaaS. B2C free tool is awareness later — not a second canvas. No invented ARR.</p>
<p class='b'><b>Pilot:</b> free, one cohort, synthetic-first then a real sitting. Measure: boards in hand at the next appointment.</p>
<p class='b'><b>Then (Ireland):</b> case / seat licence to the small/mid-tier provider, ETB, or outplacement team — price after the pilot.</p>
<p class='b'><b>Then (export, Year 2):</b> same licence to contracted PES / activation offices. Same SKU. Local catalogue. No second product.</p>
<p class='b'><b>Parked SKUs:</b> union member benefit; outplacement white-label. After the Ireland sitting copies — not this fortnight.</p>
<p class='b'><b>OPEN:</b> one office that can sign ~20 people without national procurement. Do not quote a JobPath fee ladder on stage until a current source is in evidence-base.md.</p>
"""

CONTENT = {
    "header_project": (HEADER_PROJECT, "9pt"),
    "header_date": (HEADER_DATE, "9pt"),
    "header_rev": (HEADER_REV, "11pt"),
    "legend": (LEGEND, "5.7pt"),
    "problem": (PROBLEM, "5.55pt"),
    "solution": (SOLUTION, "5.4pt"),
    "uvp": (UVP, "5.5pt"),
    "unfair": (UNFAIR, "5.0pt"),
    "customers": (CUSTOMERS, "5.45pt"),
    "metrics": (METRICS, "5.55pt"),
    "channels": (CHANNELS, "5.1pt"),
    "cost": (COST, "6.15pt"),
    "revenue": (REVENUE, "5.8pt"),
}


def restore_template(doc: fitz.Document, page: fitz.Page) -> None:
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
    for widget in page.widgets() or []:
        widget.field_value = ""
        widget.field_display = 1
        widget.update()


def fill(page: fitz.Page) -> list[str]:
    notes: list[str] = []
    for name, (inner, size) in CONTENT.items():
        result = page.insert_htmlbox(BOXES[name], html(inner, size), archive=None)
        spare, scale = result if isinstance(result, tuple) else (result, 1.0)
        notes.append(f"{name}: spare={float(spare):.1f} scale={float(scale):.3f}")
    return notes


def save_over(doc: fitz.Document, dest: Path) -> Path:
    doc.save(TMP, garbage=4, deflate=True)
    doc.close()
    TMP.replace(dest)
    return dest


def main() -> None:
    if not TEMPLATE.exists():
        raise FileNotFoundError(TEMPLATE)
    shutil.copyfile(TEMPLATE, DEST)

    doc = fitz.open(DEST)
    page = doc[0]
    restore_template(doc, page)
    hide_form_fields(page)
    save_over(doc, DEST)

    doc = fitz.open(DEST)
    page = doc[0]
    notes = fill(page)
    save_over(doc, DEST)

    doc2 = fitz.open(DEST)
    pix = doc2[0].get_pixmap(matrix=fitz.Matrix(2.2, 2.2), alpha=False)
    pix.save(PREVIEW)
    doc2.close()
    print("wrote", DEST)
    print("preview", PREVIEW)
    print("left unchanged", TEMPLATE)
    for line in notes:
        print(" ", line)


if __name__ == "__main__":
    main()
