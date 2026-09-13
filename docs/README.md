# docs/ — kořen GitHub Pages

Tato složka je to, co Actions nasadí na Pages (`path: docs` ve workflow).

- `index.html` — okamžité přesměrování na variantu **A** (`a/`)
- `a/` — aktuální redesign (antracit, karusely)
- `b/` — snímek webu před 13. 9. 2026 (commit `678159e`)
- `c/` — archiv dalšího designu
- `shared/` — sdílená média pro C
- `.nojekyll` — vypíná Jekyll (soubory s `_` a tečkou se servírují jak jsou)

Lokálně: `npx --yes serve docs -l 5173` z kořene repa.
