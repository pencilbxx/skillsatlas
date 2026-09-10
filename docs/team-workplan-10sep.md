# SkillsAtlas team workplan — 10 to 13 Sep 2026

The working source of truth is `docs/pitch-slide-text.md`. The generated Word copy is `docs/SkillsAtlas_Hub_Pitch_Slide_Text_TEAM_DRAFT.docx`. Team comments should converge there before Bridget lays out the deck.

This file plans work **after the current narrative branch is merged**. The current branch does not implement the AI practice helper.

## Ownership

| Owner | Deliverable | Main files or tools | Merge boundary |
| --- | --- | --- | --- |
| **Don** | Pitch structure, spoken text, and feedback on the existing film | Team Draft Word document; comments first | Do not create a parallel script. Accepted wording returns to `docs/pitch-slide-text.md`. |
| **Sophia** | Pitch feedback and clarity check | Team Draft Word document | Flag unsupported or awkward lines; do not redesign the product. |
| **Bridget** | Final slide design | Agreed **On the slide** lines from the Team Draft | Start layout after the opening, problem, and slide order are agreed. Do not pull copy from historical decks. |
| **Andrew + Sri Karan** | Demo polish, video polish, and separate AI practice-helper implementation | Cursor, `docs/wireframes/`, existing film source | Branch from the narrative commit. The helper gets its own feature branch and must use confirmed evidence. |

## Recommended Git workflow

1. Merge the coordinated narrative branch first. It updates the canonical Team Draft, public prototype wording and state integrity, current rules, and supporting runbooks.
2. Everyone pulls the same commit before editing in Cursor.
3. Create a separate branch for the AI practice helper, for example `feature/interview-practice-helper`.
4. Keep slide design outside the code branch unless deck files are intentionally stored in the repository.
5. Use small commits by concern: helper behavior, helper copy, film text-only changes, final rehearsal fixes.
6. Rebase or merge the latest `main` before the final demo branch is reviewed.

## AI practice-helper acceptance boundary

The helper is tomorrow’s implementation task, not part of the narrative pass. It may use only worker-confirmed evidence and the selected route. It must not invent facts, score the worker, record audio without a new explicit decision, or claim that prepared output is live generation. It should remain secondary to **Save Interview Board as PDF**.

Before adding it to the spoken pitch, the team must decide exactly what is real in the build, test both routes and the skip path, and update `docs/pitch-slide-text.md` and `docs/demo-script.md` together.

## Freeze order

| Deadline order | Gate |
| --- | --- |
| **1. Narrative** | Don and Sophia resolve hook, problem, one-breath line, and spoken script. |
| **2. Demo truth** | Andrew and Sri Karan verify confirmation, skip, two routes, route-specific Board, and PDF. |
| **3. Design** | Bridget designs only from sealed slide words. |
| **4. Film** | Keep the existing silent film. Make only small text changes that do not put the deadline at risk. |
| **5. Helper** | Merge only if implemented, labelled, and tested without disturbing the core path. |
| **6. Rehearsal** | Talker and clicker run the full seven minutes, including the failure plan. |

## Final checks before 13 Sep, 2pm

The opening must work without slides. The live click must finish from Screen 02 through the PDF in about 90 seconds. WhatsApp must be absent from the active pitch and demonstration. The team must say **clickable prototype** rather than live production AI. Turas Nua must not appear as a customer, pilot, or logo. The ask stays: Galway, then one hosted sitting.
