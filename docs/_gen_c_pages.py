from pathlib import Path
import re

FONT = """<link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;600&family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet" />"""

pairs = [
    ("docs/b/sluzby/index.html", "docs/c/sluzby/index.html"),
    ("docs/b/obchod/index.html", "docs/c/obchod/index.html"),
    ("docs/b/reference/index.html", "docs/c/reference/index.html"),
    ("docs/b/kontakt/index.html", "docs/c/kontakt/index.html"),
]

for src, dst in pairs:
    t = Path(src).read_text(encoding="utf-8")
    t = t.replace("Design B", "Design C")
    t = re.sub(
        r'<link rel="preconnect" href="https://api\.fontshare\.com"[^>]*>\s*'
        r'<link href="https://api\.fontshare\.com/[^"]+" rel="stylesheet" />',
        FONT,
        t,
        count=1,
    )
    t = t.replace("btn-cyan", "btn-primary")
    t = t.replace("section on-dark", "section")
    Path(dst).parent.mkdir(parents=True, exist_ok=True)
    Path(dst).write_text(t, encoding="utf-8")
    print("wrote", dst)
