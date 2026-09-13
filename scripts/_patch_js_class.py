from pathlib import Path

root = Path(__file__).resolve().parents[1] / "docs" / "a"
needle = "      (function () {\n        var p = location.pathname;"
insert = """      (function () {
        document.documentElement.classList.add("js");
        window.setTimeout(function () {
          if (!document.documentElement.hasAttribute("data-reveals")) {
            document.documentElement.classList.add("reveals-fallback");
          }
        }, 3200);
        var p = location.pathname;"""

patched = 0
for path in root.rglob("*.html"):
    text = path.read_text(encoding="utf-8")
    if 'classList.add("js")' in text:
        print("skip", path)
        continue
    if needle not in text:
        print("NO MATCH", path)
        continue
    path.write_text(text.replace(needle, insert, 1), encoding="utf-8")
    patched += 1
    print("ok", path)

print("patched", patched)
