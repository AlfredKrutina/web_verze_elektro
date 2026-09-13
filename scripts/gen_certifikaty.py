#!/usr/bin/env python3
"""Anonymizované obrázky certifikátů pro docs/a/o-nas/.

Vstup (NENÍ v gitu, viz .gitignore): context/certifikaty/**/*.pdf
Výstup: docs/a/assets/media/certifikaty/<slug>.jpg  (plná velikost, vícestránkové vedle sebe)
        docs/a/assets/media/certifikaty/<slug>-thumb.jpg  (1. strana, náhled do mřížky)

Odstraňují se osobní údaje držitelů (jméno, datum/rok narození, rodné číslo,
bydliště, osobní ID). Podpisy a jména zástupců vydávajících organizací zůstávají.

- Skenované PDF: obdélníky v pixelech při 200 DPI (zjištěno OCR), vyplněné
  barvou okolního papíru.
- Textové PDF: redakce přímo v PDF (odstraní se jen text, grafika zůstává).

Spuštění z kořene repa:  python scripts/gen_certifikaty.py [--verify]
--verify  po vygenerování projede výstupy OCR (rapidocr-onnxruntime) a ověří,
          že se v nich nevyskytuje žádný z odstraněných řetězců.
"""
from __future__ import annotations

import io
import pathlib
import sys

import numpy as np
import pymupdf
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC = ROOT / "context" / "certifikaty"
OUT = ROOT / "docs" / "a" / "assets" / "media" / "certifikaty"

DPI = 200
FULL_H = 1800  # výška jedné strany v plné velikosti (px)
THUMB_W = 520
PAD = 8  # rozšíření obdélníku kolem OCR boxu (px při 200 DPI)
GAP = 28  # mezera mezi stranami u vícestránkových dokumentů (px)
TOP_HALF_PT = 300  # „Ing.“ hledat jen v horní části strany (PDF body)

# slug, glob zdroje, seznam stran, boxy pro skeny {strana: [(x0,y0,x1,y1)]}, texty {strana: [term]}
DOCS: list[dict] = [
    {
        "slug": "ticr-opravneni",
        "src": "zip1_attachments/*SKM_C22726091007160.pdf",
        "pages": [0, 1],
        # celý blok „odpovědný zástupce / datum narození / adresa bydliště“ (labely i hodnoty)
        "boxes": {0: [(130, 1158, 1400, 1243)]},
    },
    {
        "slug": "soue-ppn-nn",
        "src": "zip1_attachments/*SKM_C22726091007350.pdf",
        "pages": [0, 1],
        "boxes": {
            0: [(494, 783, 707, 813), (495, 848, 634, 875), (493, 911, 805, 944)],
            1: [(491, 784, 671, 815), (492, 850, 634, 877), (492, 914, 835, 943)],
        },
    },
    {
        "slug": "profesni-kvalifikace-fve",
        "src": "zip1_attachments/*SKM_C22726091007161.pdf",
        "pages": [0, 1],
        "boxes": {0: [(682, 1146, 956, 1186), (662, 1315, 972, 1350)]},
    },
    {
        "slug": "jablotron-100",
        "src": "zip1_attachments/*SKM_C22726091007162.pdf",
        "pages": [0],
        "boxes": {0: [(441, 927, 616, 959), (439, 1026, 512, 1059)]},
    },
    {
        "slug": "schrack-integral-montaz",
        "src": "zip2/Shrack 05_2028.pdf",
        "pages": [0],
        "text": {0: ["Petr Fusek", "Ing."]},
    },
    {
        "slug": "schrack-integral-projekce",
        "src": "zip2/Schrack projekce 10_2028.pdf",
        "pages": [0],
        "text": {0: ["Petr Fusek", "Ing."]},
    },
    {
        "slug": "schrack-aprosys",
        "src": "zip2/Aprosys.pdf",
        "pages": [0],
        "text": {0: ["Petr Fusek", "Ing."]},
    },
    {
        "slug": "schrack-potvrzeni-eps",
        "src": "zip2/EPS_Schrack*.pdf",
        "pages": [0],
        "text": {0: ["Ing. Petr Fusek"]},
    },
    {
        "slug": "honeywell-esser-projekce",
        "src": "zip2/Honeywell ESSER projekce*.pdf",
        "pages": [0],
        "boxes": {0: [(510, 738, 863, 774), (549, 829, 778, 859)]},
    },
    {
        "slug": "honeywell-esser-montaz",
        "src": "zip2/Honeywell ESSER mont*servis*.pdf",
        "pages": [0],
        "boxes": {0: [(516, 714, 860, 752), (525, 811, 770, 844)]},
    },
    {
        "slug": "zettler-eps-expert",
        "src": "zip2/Zettler*.pdf",
        "pages": [0],
        "text": {0: ["Petr FUSEK"]},
    },
    {
        "slug": "lpe-ochrana-pred-bleskem",
        "src": "zip2/ochrana p*.pdf",
        "pages": [0],
        "text": {0: ["Petr Fusek", "B3C2AAF2, platný do 15. 10. 2021"]},
    },
]

# Certifikáty ISO už jsou v repu jako PNG bez osobních údajů — jen se převedou
# na stejný formát (plná velikost + náhled), aby mřížka byla jednotná a lehká.
IMAGES: list[tuple[str, str]] = [
    ("iso-9001", "docs/a/assets/media/certifikat9001_2016__144eca3be1.png"),
    ("iso-14001", "docs/a/assets/media/certifikat14001_2016__2a2b08efc1.png"),
]

# Řetězce, které se po anonymizaci nesmí objevit (pro --verify)
FORBIDDEN = [
    "fusek", "hakl", "strejc", "luhan", "bobok", "lidak", "liďák",
    "850415", "b3c2aaf2", "klostermannova", "majova", "májová", "vilova", "vilová",
    "26.10.1989", "15. 2. 1979", "14. 1. 1988", "3. srpna 1963",
]


def find_src(pattern: str) -> pathlib.Path:
    hits = sorted(SRC.glob(pattern))
    if not hits:
        sys.exit(f"CHYBA: zdroj nenalezen: {SRC / pattern}")
    return hits[0]


def redact_text(page: pymupdf.Page, terms: list[str]) -> None:
    """Odstraní text (jen text, grafika zůstává) pro každý hledaný řetězec."""
    rects: list[pymupdf.Rect] = []
    for term in terms:
        found = page.search_for(term)
        if term == "Ing.":
            found = [r for r in found if r.y1 < TOP_HALF_PT]
        if not found:
            sys.exit(f"CHYBA: '{term}' nenalezeno na straně {page.number} v {page.parent.name}")
        rects.extend(found)
    for r in rects:
        r = pymupdf.Rect(r.x0 - 2, r.y0 - 2, r.x1 + 2, r.y1 + 2)
        page.add_redact_annot(r, fill=False)
    try:
        page.apply_redactions(
            images=pymupdf.PDF_REDACT_IMAGE_NONE,
            graphics=pymupdf.PDF_REDACT_LINE_ART_NONE,
        )
    except TypeError:  # starší PyMuPDF bez parametru graphics
        page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE)


def fill_boxes(img: np.ndarray, boxes: list[tuple[int, int, int, int]]) -> np.ndarray:
    """Vyplní obdélníky mediánovou barvou okolního papíru (prstenec kolem boxu)."""
    h, w, _ = img.shape
    out = img.copy()
    for x0, y0, x1, y1 in boxes:
        x0, y0 = max(x0 - PAD, 0), max(y0 - PAD, 0)
        x1, y1 = min(x1 + PAD, w), min(y1 + PAD, h)
        ring = 14
        rx0, ry0 = max(x0 - ring, 0), max(y0 - ring, 0)
        rx1, ry1 = min(x1 + ring, w), min(y1 + ring, h)
        region = out[ry0:ry1, rx0:rx1].copy()
        mask = np.ones(region.shape[:2], dtype=bool)
        mask[y0 - ry0 : y1 - ry0, x0 - rx0 : x1 - rx0] = False
        paper = np.median(region[mask].reshape(-1, 3), axis=0).astype(np.uint8)
        out[y0:y1, x0:x1] = paper
    return out


def render_page(page: pymupdf.Page) -> np.ndarray:
    pix = page.get_pixmap(dpi=DPI, alpha=False)
    return np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, 3)


def to_height(im: Image.Image, h: int) -> Image.Image:
    w = round(im.width * h / im.height)
    return im.resize((w, h), Image.LANCZOS)


def save_jpg(im: Image.Image, path: pathlib.Path, quality: int) -> int:
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
    path.write_bytes(buf.getvalue())
    return len(buf.getvalue())


def build() -> list[pathlib.Path]:
    OUT.mkdir(parents=True, exist_ok=True)
    written: list[pathlib.Path] = []
    for spec in DOCS:
        src = find_src(spec["src"])
        doc = pymupdf.open(src)
        pages: list[Image.Image] = []
        for pno in spec["pages"]:
            page = doc[pno]
            if spec.get("text", {}).get(pno):
                redact_text(page, spec["text"][pno])
            arr = render_page(page)
            if spec.get("boxes", {}).get(pno):
                arr = fill_boxes(arr, spec["boxes"][pno])
            pages.append(Image.fromarray(arr))

        full_pages = [to_height(p, FULL_H) for p in pages]
        if len(full_pages) == 1:
            full = full_pages[0]
        else:
            total_w = sum(p.width for p in full_pages) + GAP * (len(full_pages) - 1)
            full = Image.new("RGB", (total_w, FULL_H), (230, 232, 230))
            x = 0
            for p in full_pages:
                full.paste(p, (x, 0))
                x += p.width + GAP

        thumb = pages[0].copy()
        thumb = thumb.resize((THUMB_W, round(thumb.height * THUMB_W / thumb.width)), Image.LANCZOS)

        full_path = OUT / f"{spec['slug']}.jpg"
        thumb_path = OUT / f"{spec['slug']}-thumb.jpg"
        fs = save_jpg(full, full_path, 86)
        ts = save_jpg(thumb, thumb_path, 82)
        written += [full_path, thumb_path]
        print(f"{spec['slug']:28} {full.width}x{full.height} {fs // 1024:4} KB | thumb {ts // 1024:3} KB  <- {src.name}")

    for slug, rel in IMAGES:
        im = Image.open(ROOT / rel).convert("RGB")
        full = to_height(im, FULL_H) if im.height > FULL_H else im
        thumb = im.resize((THUMB_W, round(im.height * THUMB_W / im.width)), Image.LANCZOS)
        full_path = OUT / f"{slug}.jpg"
        thumb_path = OUT / f"{slug}-thumb.jpg"
        fs = save_jpg(full, full_path, 86)
        ts = save_jpg(thumb, thumb_path, 82)
        print(f"{slug:28} {full.width}x{full.height} {fs // 1024:4} KB | thumb {ts // 1024:3} KB  <- {pathlib.Path(rel).name}")
    return written


def verify(paths: list[pathlib.Path]) -> None:
    try:
        from rapidocr_onnxruntime import RapidOCR
    except ImportError:
        sys.exit("--verify vyžaduje: pip install rapidocr-onnxruntime")
    ocr = RapidOCR()
    leaks = []
    for p in paths:
        img = np.array(Image.open(p).convert("RGB"))
        res, _ = ocr(img)
        text = " ".join(t for _, t, _ in (res or [])).lower()
        for bad in FORBIDDEN:
            if bad in text:
                leaks.append(f"{p.name}: '{bad}'")
    if leaks:
        sys.exit("ÚNIK OSOBNÍCH ÚDAJŮ:\n  " + "\n  ".join(leaks))
    print(f"VERIFY_OK ({len(paths)} obrázků, žádný z {len(FORBIDDEN)} řetězců nenalezen)")


if __name__ == "__main__":
    out = build()
    if "--verify" in sys.argv:
        verify(out)
