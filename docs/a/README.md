# Varianta A — aktivní mockup

Finální design pro prezentaci firmě. Koncept: `context/modern_web_concept.md`.

## Spuštění

Z **kořene repozitáře** (ne z této složky):

```bash
npx --yes serve docs -l 5173
```

Otevřete http://localhost:5173/a/

Na GitHub Pages je stejná cesta pod `/a/` (kořen Pages přesměruje sem automaticky).

## Struktura

| Cesta | Obsah |
|-------|--------|
| `index.html` | Homepage |
| `sluzby/` | Přehled + NN, VN, FVE, rozvaděče, projekce, revize, zemní práce, slaboproud |
| `obchod/` | Prodejny Cheb/Aš + sortiment |
| `reference/` | Realizace |
| `aktuality/` | Statické novinky / články |
| `o-nas/` | Historie, certifikáty, tým |
| `kontakt/` | Poptávka (mailto) + telefony |
| `assets/` | CSS, JS, media |

## Poznámky

- Formulář otevírá `mailto:info@elektro-euron.cz` s vyplněným tělem.
- Query `?typ=FVE` předvybere typ poptávky.
- Aktuality nemají CMS — postup v `context/aktuality_static.md`.
