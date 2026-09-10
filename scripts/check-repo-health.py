"""Repository health check for SkillsAtlas contributors.

Stdlib only. Run from the repo root:

    python scripts/check-repo-health.py
"""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SKIP_DIRS = {
    ".git",
    "node_modules",
    ".impeccable",
    ".cursor",
    ".venv",
    "venv",
    "out",
    ".remotion",
    "__pycache__",
}

REQUIRED_FILES = [
    "README.md",
    "AGENTS.md",
    "CONTRIBUTING.md",
    "docs/README.md",
    "docs/pitch-slide-text.md",
    "docs/SkillsAtlas_Hub_Pitch_Slide_Text_TEAM_DRAFT.docx",
    "docs/brand.md",
    "docs/decisions.md",
    "docs/evidence-base.md",
    "docs/demo-script.md",
    "docs/hub-rundown.md",
    "docs/team-workplan-10sep.md",
    "docs/ai-practice-helper-brief.md",
    "docs/pitch-deck-brand.md",
    "docs/wireframes/demo.html",
    "docs/wireframes/demo.js",
    "docs/wireframes/demo.css",
    "docs/wireframes/index.html",
    "docs/wireframes/vercel.json",
    "docs/wireframes/media/atlas-mark.webp",
    "docs/wireframes/media/atlas-hero.webp",
    "docs/wireframes/media/shore-route.webp",
    "docs/wireframes/media/pencil-team.png",
    "docs/wireframes/media/skillsatlas-process-v2.mp4",
    "docs/canvas/lean-canvas-working.pdf",
    "docs/canvas/lean-canvas-preview.png",
    "scripts/build-pitch-slide-text-docx.py",
    "scripts/fill-lean-canvas.py",
    "scripts/check-repo-health.py",
    "prompts/parse-cv.v1.md",
    "data/README.md",
    ".gitignore",
    ".env.example",
]

STALE_STRINGS = [
    "docs/LeanCanvas-Editable2_WORKING VERSION.pdf",
    "docs/_lean-canvas-preview.png",
    "docs/LeanCanvas-rev3.pdf",
    "docs/RedeployMate_Team_Presentation.pdf",
    "docs/RedeployMate_LeanCanvas_and_Moat_Options.pdf",
    "python docs/build-pitch-slide-text-docx.py",
    "C:\\Users\\IKARUS\\Desktop\\CURSOR PROJECTS\\Camunda Test",
]

MD_LINK_RE = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
HTML_REF_RE = re.compile(r"""(?:src|href)\s*=\s*["']([^"']+)["']""", re.I)
BACKTICK_PATH_RE = re.compile(
    r"`((?:docs|prompts|scripts|data)/[A-Za-z0-9_./ -]+\.[A-Za-z0-9]+)`"
)


def iter_text_files() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if path.suffix.lower() in {".md", ".mdc", ".html", ".js", ".css", ".py"}:
            files.append(path)
    return files


def is_external(target: str) -> bool:
    lowered = target.lower()
    return lowered.startswith(
        ("http://", "https://", "mailto:", "tel:", "data:", "javascript:")
    )


def strip_link(target: str) -> str:
    target = target.strip()
    if target.startswith("<") and target.endswith(">"):
        target = target[1:-1]
    target = target.split()[0] if target else target
    return target.split("#", 1)[0].split("?", 1)[0]


def resolve_link(source: Path, target: str) -> Path | None:
    clean = strip_link(target)
    if not clean or is_external(target) or target.startswith("#"):
        return None
    if clean.startswith("/"):
        return ROOT / clean.lstrip("/")
    return (source.parent / clean).resolve()


def check_required() -> list[str]:
    errors = []
    for rel in REQUIRED_FILES:
        if not (ROOT / rel).exists():
            errors.append(f"missing required file: {rel}")
    return errors


def check_markdown_and_html() -> list[str]:
    errors: list[str] = []
    for path in iter_text_files():
        text = path.read_text(encoding="utf-8")
        targets: list[str] = []
        if path.suffix.lower() in {".md", ".mdc"}:
            targets.extend(MD_LINK_RE.findall(text))
        if path.suffix.lower() == ".html":
            targets.extend(HTML_REF_RE.findall(text))
        for target in targets:
            dest = resolve_link(path, target)
            if dest is None:
                continue
            try:
                dest.relative_to(ROOT)
            except ValueError:
                continue
            if not dest.exists():
                rel_source = path.relative_to(ROOT).as_posix()
                errors.append(f"broken link in {rel_source}: {target}")
    return errors


def check_backtick_paths() -> list[str]:
    errors: list[str] = []
    skip_prefixes = (
        "data/personas/",
        "data/roles/",
        "data/courses/",
    )
    for path in iter_text_files():
        if path.suffix.lower() not in {".md", ".mdc"}:
            continue
        text = path.read_text(encoding="utf-8")
        for rel in BACKTICK_PATH_RE.findall(text):
            if "*" in rel or any(rel.startswith(prefix) for prefix in skip_prefixes):
                continue
            if not (ROOT / rel).exists():
                rel_source = path.relative_to(ROOT).as_posix()
                errors.append(f"missing path cited in {rel_source}: `{rel}`")
    return errors


def check_stale_paths() -> list[str]:
    errors: list[str] = []
    for path in iter_text_files():
        rel = path.relative_to(ROOT).as_posix()
        if rel.startswith("docs/archive/") or rel.startswith("scripts/"):
            continue
        text = path.read_text(encoding="utf-8")
        for stale in STALE_STRINGS:
            if stale in text:
                errors.append(f"stale path in {rel}: {stale}")
    return errors


def check_demo_js() -> list[str]:
    demo = ROOT / "docs" / "wireframes" / "demo.js"
    try:
        result = subprocess.run(
            ["node", "--check", str(demo)],
            capture_output=True,
            text=True,
            check=False,
        )
    except FileNotFoundError:
        return ["node is not available; install Node.js to syntax-check docs/wireframes/demo.js"]
    if result.returncode != 0:
        detail = (result.stderr or result.stdout).strip()
        return [f"node --check docs/wireframes/demo.js failed: {detail}"]
    return []


def check_gitignore_covers_tooling() -> list[str]:
    gitignore = (ROOT / ".gitignore").read_text(encoding="utf-8")
    errors = []
    for needle in (".impeccable/", ".cursor/skills/", ".env"):
        if needle not in gitignore:
            errors.append(f".gitignore is missing {needle}")
    return errors


def main() -> int:
    errors: list[str] = []
    errors.extend(check_required())
    errors.extend(check_markdown_and_html())
    errors.extend(check_backtick_paths())
    errors.extend(check_stale_paths())
    errors.extend(check_demo_js())
    errors.extend(check_gitignore_covers_tooling())

    if errors:
        print("Repo health failed:\n")
        for item in errors:
            print(f"- {item}")
        print(f"\n{len(errors)} issue(s).")
        return 1

    print("Repo health passed.")
    print("Required files, markdown/HTML links, cited paths, stale-path scan, demo.js syntax, and .gitignore checks are clean.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
