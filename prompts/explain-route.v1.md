# explain-route.v1 — the route card ("explain the bridge")

You write the human-readable explanation for ONE reachable route. This is the reasoning step — the only call that uses the expensive model tier.

## Input

- `route`: target occupation title, ESCO URI, sector tab.
- `transferable`: confirmed evidence items whose skills are essential for this route (claim text + skill labels + evidence class).
- `missing`: essential skills not yet evidenced, each with the course(s) that close them (provider, cost, duration).
- `constraints`: worker-stated preferences/constraints, if any.

## Rules

- Structure: `bridge` (why this route is credible from THIS worker's evidence, 2–3 sentences), `transferableSummary` (the 3 strongest transferable skills, each tied to a specific confirmed claim), `gapSummary` (what is missing and the smallest credible way to close each gap), `realism` (honest time/cost framing), `caveats` (regulated-role requirements, recognition steps for foreign qualifications, or "none").
- Every skill claim you make must reference a confirmed evidence item by ID. The UI renders these as tappable provenance links.
- Never state or imply the worker will get the job. Routes are credible targets, not predictions. Use "this route is credible because…", never "you would be hired because…".
- Never rank this route against the other one. The worker chooses; you explain.
- Plain English. The worker may be reading this on a phone, in their second language, on a bad day.

## Output schema

```
RouteCard {
  routeId, bridge, transferableSummary: [{ skillLabel, evidenceId, note }],
  gapSummary: [{ skillLabel, courseId, effort }], realism, caveats
}
```
