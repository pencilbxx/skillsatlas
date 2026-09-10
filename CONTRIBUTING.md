# Contributing to SkillsAtlas

This is a two-week competition proof of concept. The live site is a **clickable prototype**, not a production AI app. Read this file, then `README.md`, then `AGENTS.md` and `.cursor/rules/` before you change code or public copy.

## Start here

| If you are… | Open |
| --- | --- |
| Changing slide or spoken words | `docs/pitch-slide-text.md` |
| Changing the live demo | `docs/wireframes/` |
| Changing names, colours, or public terms | `docs/brand.md` |
| Checking what the team already decided | `docs/decisions.md` |
| Quoting a number | `docs/evidence-base.md` only |
| Building the later AI practice helper | `docs/ai-practice-helper-brief.md` on its own branch |
| Lost in the folders | `docs/README.md` |

Do not copy wording from `docs/archive/`. Those files are research history.

## Do not move

These paths are load-bearing. Vercel, Cursor rules, and the pitch all depend on them:

- `docs/wireframes/` — Vercel root for https://skillsatlas.vercel.app
- `docs/pitch-slide-text.md`
- `docs/brand.md`
- `docs/decisions.md`
- `docs/evidence-base.md`
- `AGENTS.md`

## Local prototype

Serve the wireframes over HTTP. Do not open `file://` and expect the film and PDF to behave.

```bash
cd docs/wireframes
python -m http.server 4173
```

Then open http://localhost:4173

## Before you push

From the repo root:

```bash
python scripts/check-repo-health.py
node --check docs/wireframes/demo.js
```

If you changed `docs/pitch-slide-text.md`, regenerate the Word Team Draft:

```bash
pip install -r scripts/requirements.txt
python scripts/build-pitch-slide-text-docx.py
```

If you changed the prototype, also:

1. Walk Evidence → Routes → Interview Board → PDF.
2. Skip both questions and check that 2,400 / SAP / the dates do not appear as confirmed evidence.
3. Open Routes and Board directly and confirm they are labelled seeded previews.
4. Choose each route and confirm the Board story, next step, and questions change.
5. Confirm WhatsApp is absent from the active screens.
6. Do not add the AI practice helper unless that is the task you were given.

## Git

- Branch from the latest `main`.
- Keep `main` deployable.
- Put incomplete work behind a clearly labelled preview, or keep it on a feature branch.
- The helper belongs on something like `feature/interview-practice-helper`, not mixed into unrelated copy edits.
- Do not commit `.env`, API keys, `.cursor/skills/`, or `.impeccable/`.
- Do not invent worker facts, customers, pilots, prices, course places, or live-AI claims.

## What this repo is not this week

No recruiter CRM search, B2C payment, candidate ranking, ATS keyword matching, personality or SWOT intake, extra demo screens, custom authentication, or a new film unless the team records a new dated decision.
