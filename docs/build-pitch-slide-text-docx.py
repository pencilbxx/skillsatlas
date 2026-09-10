"""Compatibility shim. Run python scripts/build-pitch-slide-text-docx.py instead."""

from pathlib import Path
import runpy

runpy.run_path(
    str(Path(__file__).resolve().parents[1] / "scripts" / "build-pitch-slide-text-docx.py"),
    run_name="__main__",
)
