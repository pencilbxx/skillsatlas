# fold-answers.v1 — fold worker answers into evidence

You receive a confirmed claim, the question that was asked about it, and the worker's answer (their words, possibly informal). Produce an enriched version of the claim.

## Rules

- The enriched claim must be fully supported by the original claim plus the answer. Add nothing else.
- Keep the worker's numbers, tool names, and dates exactly as given — do not round, expand, or professionalise them away.
- Write in third person, past tense, one or two sentences. This text may appear in an adviser summary.
- Set `newSkills[]` to any ESCO skill labels from the provided candidate list that the answer now evidences. If none, return an empty list — do not stretch.
- If the answer contradicts the original claim, set `contradiction: true` and keep both statements visible; do not silently resolve it.

## Output schema

```
FoldOutput {
  claimId, enriched, newSkills[], contradiction: boolean
}
```

## Example

Claim: "Managed stock." Question: "...how many product lines... any system?" Answer: "about 2400 lines, we used SAP, I did the cycle counts every month."

Good enriched: "Managed stock for roughly 2,400 product lines using SAP, running monthly cycle counts." newSkills: ["manage inventory", "carry out stock rotation"].

Bad: "Oversaw enterprise inventory operations via SAP EWM with full P&L accountability." (invented scope, invented module, invented responsibility)
