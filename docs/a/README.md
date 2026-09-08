# Elektro Euron — nový web

Statická implementace konceptu z `context/modern_web_concept.md`.

## Spuštění

Z kořene projektu:

```bash
npx --yes serve site
```

Nebo otevřete `site/index.html` (fonty vyžadují síť).

## Struktura

- `index.html` — homepage (hero, dvě cesty, kompetence, reference, prodejny)
- `sluzby/` — přehled + NN, VN, FVE, rozvaděče, projekce, revize, zemní práce, slaboproud
- `obchod/` — prodejny Cheb/Aš + sortiment
- `reference/` — TOSTA, NM, region
- `o-nas/` — historie, certifikáty, tým
- `kontakt/` — poptávkový formulář (mailto) + telefony
- `assets/` — CSS, JS, media z archivu

## Poznámky

- Formulář otevírá `mailto:info@elektro-euron.cz` s vyplněným tělem.
- Query `?typ=FVE` předvybere typ poptávky.
