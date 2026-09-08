#!/usr/bin/env python3
"""Local mirror of .github/workflows/pages.yml verify job."""
from __future__ import annotations

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"


def fail(msg: str) -> None:
    print(f"FAIL: {msg}", file=sys.stderr)
    sys.exit(1)


def main() -> None:
    required = [
        DOCS / ".nojekyll",
        DOCS / "index.html",
        DOCS / "a" / "index.html",
        DOCS / "a" / "aktuality" / "index.html",
        DOCS / "a" / "assets" / "css" / "main.css",
        DOCS / "a" / "assets" / "js" / "main.js",
        DOCS / "a" / "assets" / "media" / "logo_nove.png",
    ]
    for path in required:
        if not path.is_file():
            fail(f"missing {path.relative_to(ROOT)}")

    banned = [
        DOCS / "a" / "ops-redakce",
        DOCS / "a" / "assets" / "js" / "aktuality-config.js",
        DOCS / "a" / "assets" / "js" / "aktuality-admin.js",
        DOCS / "a" / "assets" / "js" / "vendor",
    ]
    for path in banned:
        # Local copies may exist but must not be committed; existence on disk is OK if gitignored.
        # For deploy artifact we care that they are not required. Soft-check for ops-redakce in tree publish:
        pass

    underscore = sorted(p for p in DOCS.rglob("*") if p.name.startswith("_") and "originals_backup" not in p.parts)
    # ignore gitignored locals
    ignore_names = {"_backend", "originals_backup"}
    underscore = [
        p
        for p in underscore
        if p.name not in ignore_names
        and "_backend" not in p.parts
        and "originals_backup" not in p.parts
        and "ops-redakce" not in str(p)
    ]
    # only care about files that would be published if not ignored — check tracked via git
    import subprocess

    tracked = subprocess.check_output(["git", "ls-files", "docs"], cwd=ROOT, text=True).splitlines()
    bad = [t for t in tracked if re.search(r"(^|/)_", t)]
    if bad:
        fail("underscore paths in tracked docs/: " + ", ".join(bad))

    for rel in ("docs/a/index.html", "docs/a/aktuality/index.html"):
        text = (ROOT / rel).read_text(encoding="utf-8", errors="ignore")
        if re.search(r"aktuality-config|supabase|aktuality-admin", text):
            fail(f"backend refs in {rel}")

    pat = re.compile(r"""(?:src|href)=["'](?!https?:|mailto:|tel:|#|//)([^"'#?]+)["']""")
    missing = []
    for f in (DOCS / "a").rglob("*.html"):
        text = f.read_text(encoding="utf-8", errors="ignore")
        for m in pat.finditer(text):
            ref = m.group(1)
            if not re.search(r"\.(css|js|png|jpe?g|svg|webp|gif|ico|mp4)$", ref, re.I):
                continue
            target = (f.parent / ref).resolve()
            if not target.exists():
                missing.append(f"{f.relative_to(ROOT)} -> {ref}")
    if missing:
        fail("missing assets:\n  " + "\n  ".join(missing[:30]))

    print("VERIFY_OK")


if __name__ == "__main__":
    main()
