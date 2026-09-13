"""Generuje výřezy 16:10 pro karusely na homepage.

Zdrojové fotky mají různé rozměry a některé přes 3 MB (PNG). Karusel načítá
několik obrázků vedle sebe, takže originály by zbytečně pálily mobilní data.
Skript z každé fotky udělá dvě šířky (1600 a 900 px) v JPEG q82 a uloží je do
docs/a/assets/media/carousel/.

Spuštění:  python scripts/gen_carousel_images.py
"""

from __future__ import annotations

import os
from PIL import Image, ImageOps

MEDIA = os.path.join("docs", "a", "assets", "media")
OUT = os.path.join(MEDIA, "carousel")
WIDTHS = (1600, 900)
RATIO = 16 / 10

# cíl -> (zdroj, svislé ukotvení výřezu 0 = horní hrana, 1 = dolní)
SOURCES = {
    # Realizace
    "tosta-plesna": ("IMG_20211020_124231__025795fbf4.jpg", 0.5),
    "narodni-muzeum": ("NMsilnoproud__661ae89d7d.png", 0.5),
    "chebsky-hrad": ("kaple_na_hrade4__646f374ccc.png", 0.45),
    "fve-sidlo": ("prezentaceFVE__734ef6e255.jpg", 0.5),
    "skalna": ("skalna1__32816c2a01.png", 0.55),
    # Služby
    "nizke-napeti": (os.path.join("brands", "schneider-acti9.jpg"), 0.45),
    "vysoke-napeti": ("VN__55be26fb82.png", 0.5),
    "fotovoltaika": ("alternativnizdroje__5679b1bc4a.png", 0.5),
    "rozvadece": ("rozvadec__7022fc0fb0.png", 0.5),
    "slaboproud": ("opticky-rozvadec__454b33af6c.jpg", 0.5),
    "projekce": ("NMvizualizace__1fefe8e149.png", 0.5),
    "revize": ("revize__0686bebeae.jpg", 0.5),
    "zemni-prace": ("DSC_0020__1c3744f436.jpg", 0.5),
}


def crop_to_ratio(img: Image.Image, anchor: float) -> Image.Image:
    w, h = img.size
    target_h = w / RATIO
    if target_h <= h:
        top = int((h - target_h) * anchor)
        return img.crop((0, top, w, top + int(target_h)))
    target_w = int(h * RATIO)
    left = (w - target_w) // 2
    return img.crop((left, 0, left + target_w, h))


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    total = 0
    for name, (src, anchor) in SOURCES.items():
        path = os.path.join(MEDIA, src)
        if not os.path.exists(path):
            print("CHYBÍ ZDROJ:", path)
            continue
        with Image.open(path) as raw:
            img = ImageOps.exif_transpose(raw)
            if img.mode in ("RGBA", "LA", "P"):
                img = img.convert("RGB")
            cropped = crop_to_ratio(img, anchor)
            for width in WIDTHS:
                height = round(width / RATIO)
                out_name = "%s-%d.jpg" % (name, width)
                out_path = os.path.join(OUT, out_name)
                resized = cropped.resize((width, height), Image.LANCZOS)
                resized.save(out_path, "JPEG", quality=82, optimize=True, progressive=True)
                size_kb = os.path.getsize(out_path) / 1024
                print("%-28s %5d x %4d  %6.1f kB" % (out_name, width, height, size_kb))
                total += 1
    print("hotovo, souborů:", total)


if __name__ == "__main__":
    main()
