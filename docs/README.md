# docs/ — kořen GitHub Pages

Tato složka je to, co Actions nasadí na Pages (`path: docs` ve workflow).

- `index.html` — okamžité přesměrování na variantu **A** (`a/`)
- `a/` — finální mockup pro firmu
- `b/`, `c/` — archiv dalších designů
- `shared/` — sdílená média pro B/C
- `.nojekyll` — vypíná Jekyll (soubory s `_` a tečkou se servírují jak jsou)

Lokálně: `npx --yes serve docs -l 5173` z kořene repa.
