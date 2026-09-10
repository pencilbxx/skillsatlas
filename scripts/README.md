# Scripts

Run these from the **repository root**.

```bash
pip install -r scripts/requirements.txt
python scripts/check-repo-health.py
python scripts/build-pitch-slide-text-docx.py
python scripts/fill-lean-canvas.py
python scripts/verify_narrative_assets.py
```

| Script | What it does |
| --- | --- |
| `check-repo-health.py` | Stdlib check: required files, markdown links, wireframe assets, `demo.js` syntax. Run before a push. |
| `build-pitch-slide-text-docx.py` | Builds `docs/SkillsAtlas_Hub_Pitch_Slide_Text_TEAM_DRAFT.docx` from `docs/pitch-slide-text.md`. |
| `fill-lean-canvas.py` | Rebuilds `docs/canvas/lean-canvas-working.pdf`. |
| `verify_narrative_assets.py` | Extra narrative checks (needs PyMuPDF and python-docx). |
| `build-pitch-pack.py` | Historical Word pack generator. Writes into `docs/archive/pitch/`. Do not treat it as current Hub copy. |

Thin shims remain at `docs/build-pitch-slide-text-docx.py` and `docs/fill-lean-canvas.py` so an old command still runs the new scripts.
