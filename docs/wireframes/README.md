# SkillsAtlas clickable prototype

This folder is the Hub prototype. Product and pitch wording follows `docs/pitch-slide-text.md`; names and visual tokens follow `docs/brand.md`.

**Live URL:** https://skillsatlas.vercel.app

This is a **clickable prototype using a prepared practice CV**, not the future Next.js application and not a live production AI pipeline.

## Demo path

A judge opening the link lands on Screen **00 Start**. On stage, the clicker starts on Screen **02 Evidence**.

| Screen | What to do |
| --- | --- |
| 00 Start | Cold-link identity and optional existing silent film; do not tour it on stage |
| 01 Problem | Title without proof; click **Turn this CV into evidence** |
| 02 Evidence | Confirm the two CV lines → show both prepared answers → **Confirm stronger wording** → See two routes |
| 03 Routes | Choose one of exactly two prepared route examples |
| 04 Interview Board | Change one interview setting → **Practice for interview** → **Save Interview Board as PDF** |

## State rules

- An extracted CV line is labelled **From CV · awaiting confirmation**.
- The worker may skip either question without penalty.
- If any detail is skipped, the original **“managed stock”** wording remains. No number, system, or date may appear as worker-confirmed evidence.
- After both prepared answers, the stronger wording remains proposed until the worker clicks **Confirm stronger wording**.
- Direct navigation to Routes or the Interview Board is a **seeded preview**, not confirmed worker evidence.
- The selected route changes the Interview Board story, next step, question set, and prepared practice helper.
- The helper may use only confirmed evidence. If the worker skipped, it must not introduce 2,400, SAP, or dates.
- The helper is labelled **prepared practice helper**. It does not score the worker and does not write into the PDF.
- The PDF reflects the current route and evidence state.

## Public terminology

Use **SkillsAtlas Interview Board**, **two credible role routes**, **illustrative learning option**, and **question example**.

Do not call fixed prepared strings live AI output. Do not call the displayed learning options verified/current unless a real provider listing is checked and linked.

WhatsApp is removed from the active prototype and pitch. Historical/code references remain elsewhere. Screen 04 saves the Interview Board as a PDF, then shows a **prepared practice helper** as an attachment.

## Local use

Serve this directory over HTTP rather than opening `file://` directly. Example:

```bash
cd docs/wireframes
python3 -m http.server 4173
```

The film file is `media/skillsatlas-process-v2.mp4`. Keep the existing silent film unless the team makes a small text-only re-render.
