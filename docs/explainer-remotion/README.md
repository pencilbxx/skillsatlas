# SkillsAtlas Process Explainer (Remotion)

> **This is the Remotion project for the silent branded process explainer — not the Next.js app.**
> Lives under `docs/explainer-remotion/` inside the SkillsAtlas kit repo. Run install / studio / render from **this directory**.

Silent branded process cut explaining the SkillsAtlas CV to evidence to adviser flow.
Built with Remotion; primary composition is **SkillsAtlasExplainerV2** (V2.8).

## Deliverable

| Path | Notes |
|------|--------|
| `docs/explainer-remotion/deliverables/skillsatlas-process-v2.mp4` | **Ship this.** Final V2.8 render (1920x1080 @ 30fps). |
| `out/` (local, gitignored) | Render scratch under this folder. Copy a good render into `deliverables/` when shipping. |

Composition ID: `SkillsAtlasExplainerV2`.

## Brand tokens

Aligned with SkillsAtlas demo.css / Ireland evidence atlas / Manus:

| Token | Value | Role |
|-------|--------|------|
| **Coral** | `#ED6A4A` | Accent, path token, chip-accent |
| **Navy** | `#102B3F` | Dark panels, ink on cream, chip-wire |
| **Teal** | `#1E5D5E` | AI language, flow-active, chip-obs |
| **Cream** | `#F7F4EF` (`bg`) | Paper chrome; soft `#F3EEE6` |
| **Card** | `#FFFCFA` | Near-white surfaces |
| **Ink** | `#183143` / muted `#49606D` | Text on cream |

**Type**

- Titles / brand: **DM Serif Display**
- UI body / chrome: **Manrope**
- Mono (URL / parse): JetBrains Mono

See `src/theme.ts` and `src/fonts.ts`. Same tokens as the live sitting: `docs/brand.md`.

## Quality bar

Hard constraints for this cut — do not regress:

1. **No Modeler screenshots** — diagram is SVG BPMN / branded UI, not product Modeler captures.
2. **Path token** — coral `#ED6A4A` travels the process; not a random yellow/dot.
3. **One brand** — single coral / navy / teal / cream system; no competing palettes.
4. **Matching cutaways** — vignettes match the live product language (same chips, panels, typography).
5. **FETCH hold + scroll** — explain-routes cutaway holds, then scrolls the FETCH crop (not a static flash).
6. **Evidence wow** — evidence beats read as payoff, not filler.
7. **Pick-2** — route-card cutaway for the two-route choice.
8. **STAR board** — Interview Board artefact (STAR panel), not the problem screen.
9. **Practice helper close** — last diagram box and last cutaway are the shipped Screen 04 helper (Practice for interview). PDF remains the takeaway, not deleted.
10. **No overlaps** — no stacked text/UI collisions across fades and cutaways.

## Version history

| Version | What changed |
|---------|----------------|
| **V1** | First Remotion explainer (`SkillsAtlasExplainer`): open, diagram + AI vignettes, email, end card (~760 frames). |
| **V2** | New timeline (~52s): SVG BPMN diagram flow, branded open/email/end, AI cutaways under `src/scenes/v2/`. |
| **V2.1** | Framing / fold / parse / questions vignette polish. |
| **V2.2** | FETCH crop + STAR board artefact (leave with the board), not the problem screen. |
| **V2.3** | Pick-2 route cards; FETCH hold-then-scroll; layout / two-routes clarity. |
| **V2.4** | Brand-unified tokens; path token; matching cutaways; quality bar locked; deliverable MP4 shipped. |
| **V2.5** | Last diagram step is **Practice helper** (Screen 04 WOW). STAR stays, PDF end remains. Inter-phase token hops are faster so length stays ~52s. |
| **V2.6** | ESCO search cutaway from the official portal (`Classification → Occupations`). First three checkpoints (parse / questions / fold) are shorter so length stays ~52s. |
| **V2.7** | Write-questions and fold stay open longer. Back-row captions in simple English sit under the UI, not on top of it. |
| **V2.8** | Captions stay put through token hops (crossfade, no blink). Extra reading pauses on longer lines. About +10s. |
| **V2.9** | Pop-ups centred. Parse / STAR / Leave-with-PDF hold longer. Evidence column gets a quiet glow when a claim is saved. |

Legacy V1 compositions remain registered under Remotion Studio folder `Scenes-V1` for comparison.
Rejected V1 Modeler screenshot PNGs live in `archive/` (do not use in the ship composition).

## Commands

Work from this folder (`docs/explainer-remotion/`):

**Install**

```console
cd docs/explainer-remotion
npm i
```

**Remotion Studio (preview)**

```console
npm run dev
```

(Equivalent: `npx remotion studio`)

**Render V2 deliverable**

```console
npx remotion render SkillsAtlasExplainerV2 out/skillsatlas-process-v2.mp4
```

Then copy into the ship folder when ready:

```console
mkdir -p deliverables && cp out/skillsatlas-process-v2.mp4 deliverables/skillsatlas-process-v2.mp4
```

**Other**

```console
npm run build
npm run lint
npx remotion upgrade
```

## Layout

```
docs/explainer-remotion/
  src/
    SkillsAtlasExplainerV2.tsx   # V2.8 main timeline
    SkillsAtlasExplainer.tsx     # V1
    theme.ts / fonts.ts
    scenes/                      # V1 shared open/email + vignettes
    scenes/v2/                   # BPMN, diagram flow, evidence, AiVignetteV2
  public/brand/                  # Intro art + style ref
  public/recordings/             # Cropped product clips + stills
  deliverables/                  # Committed ship MP4
  archive/                       # Rejected V1 Modeler PNGs
  out/                           # Gitignored local renders
```

## License

UNLICENSED / private.
