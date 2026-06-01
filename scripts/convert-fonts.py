"""Convert the licensed Ailiur fonts to subset woff2 for self-hosting.

Subsets to Latin + punctuation/symbols actually used on the marketing site,
which keeps each face small enough for a Lighthouse 90+ performance budget.
Run: python scripts/convert-fonts.py
"""
import os
from fontTools.ttLib import TTFont
from fontTools.subset import Subsetter, Options

SRC = r"C:\ailiur\assets\fonts"
DEST = os.path.join(os.path.dirname(__file__), "..", "src", "fonts")
os.makedirs(DEST, exist_ok=True)

# Basic Latin, Latin-1 Supplement, General Punctuation (em/en dash, curly quotes,
# bullet, middot), arrows, plus a few math/symbol glyphs we render.
UNICODES = "U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-205E,U+2190-2199,U+2212,U+25CF,U+2605,U+2713"

JOBS = [
    ("PP Editorial New/PPEditorialNew-Ultralight-BF644b21500d0c0.otf", "PPEditorialNew-Ultralight.woff2"),
    ("PP Editorial New/PPEditorialNew-Regular-BF644b214ff145f.otf",    "PPEditorialNew-Regular.woff2"),
    ("PP Editorial New/PPEditorialNew-Ultrabold-BF644b21500840c.otf",  "PPEditorialNew-Ultrabold.woff2"),
    ("SF Pro Rounded.ttf", "SFProRounded.woff2"),
]


def convert(src_rel, out_name):
    src = os.path.join(SRC, src_rel)
    font = TTFont(src)
    opts = Options()
    opts.flavor = "woff2"
    opts.desubroutinize = True
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    opts.recalc_bounds = True
    sub = Subsetter(options=opts)
    sub.populate(unicodes=_parse(UNICODES))
    sub.subset(font)
    out = os.path.join(DEST, out_name)
    font.flavor = "woff2"
    font.save(out)
    size_kb = os.path.getsize(out) / 1024
    print(f"{out_name:32s} {size_kb:7.1f} KB")


def _parse(spec):
    out = []
    for part in spec.split(","):
        part = part.strip().replace("U+", "")
        if "-" in part:
            a, b = part.split("-")
            out.extend(range(int(a, 16), int(b, 16) + 1))
        else:
            out.append(int(part, 16))
    return out


if __name__ == "__main__":
    for src_rel, out_name in JOBS:
        convert(src_rel, out_name)
    print("done ->", os.path.abspath(DEST))
