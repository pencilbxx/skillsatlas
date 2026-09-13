"""Prepare local deck assets: mark, lighthouse crop, circular team photos."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
DUMP = ROOT / ".tmp" / "feedback-pptx-dump" / "slide-images"
MEDIA = ROOT / "docs" / "wireframes" / "media"
OUT = Path(__file__).resolve().parent / "assets"
TEAM = OUT / "team"
OUT.mkdir(parents=True, exist_ok=True)
TEAM.mkdir(parents=True, exist_ok=True)

CREAM = (247, 244, 239, 255)
NAVY = (16, 43, 63, 255)


def circle_crop(src: Image.Image, size: int = 512, zoom: float = 1.0, offset=(0, 0)) -> Image.Image:
    im = src.convert("RGBA")
    w, h = im.size
    side = int(min(w, h) / zoom)
    cx = w / 2 + offset[0]
    cy = h / 2 + offset[1]
    left = int(max(0, min(w - side, cx - side / 2)))
    top = int(max(0, min(h - side, cy - side / 2)))
    crop = im.crop((left, top, left + side, top + side)).resize((size, size), Image.Resampling.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((1, 1, size - 2, size - 2), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(0.6))
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(crop, (0, 0))
    out.putalpha(mask)
    return out


def ring(im: Image.Image, color=NAVY, width: int = 10) -> Image.Image:
    size = im.size[0]
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(canvas)
    d.ellipse((0, 0, size - 1, size - 1), fill=color)
    inner = size - width * 2
    inset = Image.new("RGBA", (inner, inner), (0, 0, 0, 0))
    canvas.paste(im.resize((inner, inner), Image.Resampling.LANCZOS), (width, width), im.resize((inner, inner), Image.Resampling.LANCZOS))
    return canvas


def convert_mark() -> None:
    src = MEDIA / "atlas-mark.webp"
    im = Image.open(src).convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            chroma = max(r, g, b) - min(r, g, b)
            if chroma < 28:
                px[x, y] = (r, g, b, 0)
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im = im.resize((256, 256), Image.Resampling.LANCZOS)
    im.save(OUT / "atlas-mark.png")
    print("mark", im.size)


def convert_hero() -> None:
    return


def crop_lighthouse() -> None:
    src = DUMP / "slide1_1.jpg"
    im = Image.open(src).convert("RGB")
    w, h = im.size
    # Stairs through lighthouse, below the old subtitle and above the page number.
    crop = im.crop((int(w * 0.40), int(h * 0.56), int(w * 0.98), int(h * 0.86)))
    crop.save(OUT / "lighthouse-run.jpg", quality=94)
    print("lighthouse", crop.size)


def team_photos() -> None:
    # Positions from the annotated deck: Andrew, Brigitte, Don, Sophia, Sri Karan
    specs = {
        "andrew": (DUMP / "slide9_3.jpg", 1.0, (0, 0)),
        "brigitte": (DUMP / "slide9_2.jpg", 1.08, (0, -40)),
        "don": (DUMP / "slide9_4.jpg", 1.0, (0, 0)),
        "sophia": (DUMP / "slide9_5.jpg", 1.0, (0, 0)),
        # Cut the LinkedIn #OPENTOWORK badge
        "sri-karan": (DUMP / "slide9_6.jpg", 1.35, (0, -55)),
    }
    for name, (path, zoom, offset) in specs.items():
        im = Image.open(path)
        circled = circle_crop(im, size=512, zoom=zoom, offset=offset)
        circled.save(TEAM / f"{name}.png")
        print(name, im.size)


if __name__ == "__main__":
    convert_mark()
    convert_hero()
    crop_lighthouse()
    team_photos()
