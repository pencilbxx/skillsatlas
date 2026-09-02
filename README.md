# SkillsAtlas — Evidence Agent

Two-week PoC for the TechIreland National AI Challenge 2026. Four screens, ~90 seconds, live URL. Slides freeze **13 Sep 2pm**.

This repo is the **kit**. The Next.js app is not scaffolded yet. Open this folder as the Cursor workspace so `AGENTS.md` and `.cursor/rules/` load.

## Open this first

| File | What it is |
| --- | --- |
| `AGENTS.md` | Ground rules. Read before touching code. |
| `docs/decisions.md` | Decisions already made (closer = cheat-board; WhatsApp = bonus). |
| `docs/bpmn/skillsatlas-4-screens.bpmn` | Team picture. Four rows in plain English. Board is the close. |
| `docs/bpmn/skillsatlas-evidence-agent.bpmn` | Full step map. WhatsApp is a bonus side path. |
| `docs/demo-script.md` | 90-second narration. Draft. Freeze on day 10. |
| `docs/wireframes/demo.html` | Clickable 4-screen mock. Live: https://skillsatlas.vercel.app — how-to: `docs/wireframes/README.md`. |
| `docs/evidence-base.md` | The only numbers the deck may quote. |
| `docs/pitch-contents.md` | Ten-slide argument + 4-min speech + research split. Contents only. |
| `docs/SkillsAtlas_Pitch_Contents_Team_Pack.docx` | Same pack as a Word file to send the team. Rebuild: `python docs/build-pitch-pack.py`. |
| `prompts/cursor-kickoff-prompts.md` | Paste P0, then P1… in order. |

## What exists vs what does not

**In the kit (ready):** rules, versioned prompts, BPMN, evidence base, kickoff prompts, this README.

**Not built yet:** `app/`, `lib/`, `package.json`, Supabase schema, personas, roles, courses. That is P0–P1, not a missing download.

## The four screens

1. **Problem** — synthetic CV + “assessed, here’s a course list, good luck.”
2. **Evidence + questions** — parse → worker confirms → 2–3 questions that strengthen weak evidence.
3. **Two routes** — transferable skills, gaps, real Skillnet / SOLAS / Springboard+ courses.
4. **Leave with the board** — adviser summary + one committed step + the cheat-board they walk out holding.

WhatsApp accountability partner is a **bonus** (`NEXT_PUBLIC_ENABLE_PARTNER`). Same four-field privacy boundary. Not the closer.

## Next action

Paste **P0** from `prompts/cursor-kickoff-prompts.md` into a new Cursor chat in this repo. Do not skip to features.

Keys you will need after P0 (see `.env.example`):

- `OPENAI_API_KEY` (organiser credits)
- Supabase EU: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `PARTNER_WEBHOOK_URL` (only when the WhatsApp bonus is on)

Repo must live on a **personal** GitHub account (Vercel Hobby cannot deploy org repos).

## After the app exists

```bash
pnpm install
cp .env.example .env.local
pnpm db:push
pnpm db:seed
pnpm dev
```

Before any commit: `pnpm lint && pnpm test`.
