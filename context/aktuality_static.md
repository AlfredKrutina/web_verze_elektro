# Aktuality — statické HTML (varianta A)

Obsah je přímo v HTML. Žádný login, žádný Supabase, žádný editor.

Přehled (`a/aktuality/`) drží krátké perexy. Po „Číst celý článek“ je na detailu **celý text ze starého webu** (elektro-euron.cz), včetně galerie fotek tam, kde ji původní příspěvek měl.

Do detailů se nepřenášely provozní oznámení z archivu (vánoční zavíračky 2014/2019, inventura, Facebook 2015) — na novém webu by vypadaly jako živé informace.

## Stránky

| Cesta (v Pages / lokálně pod `docs/`) | Obsah |
|-------|--------|
| `a/aktuality/` | Přehled |
| `a/aktuality/tosta-plesna/` | TOSTA Plesná (2021) — plný text + galerie |
| `a/aktuality/narodni-muzeum/` | Národní muzeum (2021) — plný text + vizualizace |
| `a/aktuality/fve-sidlo/` | FVE na sídle (2019) — plný text + prezentace FVE |
| `a/aktuality/chebsky-hrad-kaple/` | Hradní kaple (2013) — plný text otevření před sezónou |

## Jak přidat novou aktualitu

1. Vytvoř `docs/a/aktuality/slug-nazev/index.html` (zkopíruj existující článek).
2. Doplň název, datum, **celý** text; fotku ber z `docs/a/assets/media/`.
3. Přidej kartu nahoru do `docs/a/aktuality/index.html` (jen perex + odkaz „Číst celý článek“).
4. Commit a push — po deployi je článek živý.

## Supabase / redakce

Pokus o zaheslovanou redakci byl zrušen. Web ji **nepoužívá**. Případný starý Supabase projekt v dashboardu můžeš smazat.
