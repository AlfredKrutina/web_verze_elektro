# Aktuality — statické HTML (varianta A)

Obsah je přímo v HTML. Žádný login, žádný Supabase, žádný editor.

## Stránky

| Cesta (v Pages / lokálně pod `docs/`) | Obsah |
|-------|--------|
| `a/aktuality/` | Přehled |
| `a/aktuality/tosta-plesna/` | TOSTA Plesná (2021) |
| `a/aktuality/narodni-muzeum/` | Národní muzeum (2021) |
| `a/aktuality/fve-sidlo/` | FVE na sídle (2019) |
| `a/aktuality/chebsky-hrad-kaple/` | Hradní kaple (2013) |

## Jak přidat novou aktualitu

1. Vytvoř `docs/a/aktuality/slug-nazev/index.html` (zkopíruj existující článek).
2. Doplň název, datum, text; fotku ber z `docs/a/assets/media/`.
3. Přidej kartu nahoru do `docs/a/aktuality/index.html`.
4. Commit a push — po deployi je článek živý.

## Supabase / redakce

Pokus o zaheslovanou redakci byl zrušen. Web ji **nepoužívá**. Případný starý Supabase projekt v dashboardu můžeš smazat.
