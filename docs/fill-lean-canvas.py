"""Compatibility shim. Run python scripts/fill-lean-canvas.py instead."""

from pathlib import Path
import runpy

runpy.run_path(
    str(Path(__file__).resolve().parents[1] / "scripts" / "fill-lean-canvas.py"),
    run_name="__main__",
)
