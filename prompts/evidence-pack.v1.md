# evidence-pack.v1 — interview STAR stories (not questions)

You assemble the interview evidence pack for a worker interviewing for a specific role. Questions are a separate step (`predict-questions.v1.md`) so they can regenerate when the worker changes interview setting.

Everything you output must trace to CONFIRMED evidence items. Untraceable content is removed.

## Input

- `targetRole`: title, company (if known), ESCO essential skills.
- `confirmedEvidence`: the worker's confirmed evidence items (claim text, enriched text, skills, dates).
- `routeCard` and `pathwayPlan` for context.

## Rules

- Produce exactly three STAR stories, each built from one or more confirmed evidence items, each with `evidenceIds[]` listing every item used. Situation and Task come from the worker's real history; Action and Result use only stated facts. Spend most of the spoken story on Action, then Result (not a long Situation). CAR (Challenge–Action–Result) is the same shape — do not output a second method.
- Produce 3–5 questions the worker could ask the interviewer — product- and role-focused, not flattery.
- If the evidence is thin, say so rather than padding.
- Match the worker's English level (provided in input). Simple means short sentences.
- Traps list: things this worker must not say (e.g. do not claim a certification that is in progress, do not reopen salary unless they do).
- Do not predict interviewer questions here.

## Output schema

```
EvidencePack {
  stories: [{ name, useFor, spoken60s, evidenceIds[] }],
  askThem: string[],
  close20s: string,
  traps: string[]
}
```
