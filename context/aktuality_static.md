# Aktuality — varianta A (statické HTML)

Zvoleno místo Supabase redakce: obsah je přímo v HTML souborech.

## Veřejné stránky

| Cesta | Obsah |
|-------|--------|
| `/a/aktuality/` | Přehled |
| `/a/aktuality/tosta-plesna/` | TOSTA 2021 |
| `/a/aktuality/narodni-muzeum/` | NM 2021 |
| `/a/aktuality/fve-sidlo/` | FVE 2019 |
| `/a/aktuality/chebsky-hrad-kaple/` | Hradní kaple 2013 |

## Jak přidat novou aktualitu

1. Vytvoř složku `docs/a/aktuality/slug-nazev/index.html` (zkopíruj existující článek).
2. Doplň název, datum, text, případně fotku z `assets/media/`.
3. Přidej kartu do `docs/a/aktuality/index.html` (nahoru = nejnovější).

Žádný login, žádný backend — změna = úprava souboru (nebo commit).

## Supabase

Projekt z pokusu o variantu C můžeš v dashboardu smazat nebo nechat ležet. Web ho **nepoužívá**.
