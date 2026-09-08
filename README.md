# Elektro Euron — web (prototyp / mockup)

Statický návrh webu pro prezentaci firmě. Veřejná varianta **A** běží z `docs/a/`.

## Rychlý odkaz po nasazení

Po zapnutí GitHub Pages bude mockup na:

`https://<uzivatel>.github.io/<nazev-repa>/`

(např. `https://alfredkrutina.github.io/web_verze_elektro/`)

Kořen přesměruje na design **A**. Přímo: `…/a/`.

## Lokálně

```bash
npx --yes serve docs -l 5173
```

Otevřete http://localhost:5173/

## GitHub Pages (deploy)

Deploy běží přes GitHub Actions (`.github/workflows/pages.yml`).

1. Repo musí být **public** (nebo mít plán s Pages pro private).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**
3. Push na `main` (nebo Actions → *Deploy GitHub Pages* → Run workflow).

Mockup URL: `https://<uzivatel>.github.io/web_verze_elektro/`

Ověření lokálně (stejný obsah jako Pages):

```bash
npx --yes serve docs -l 5173
```

## Co je v mockupu

- Kompletní navigace: služby, obchod, reference, aktuality (statické ukázky), o nás, kontakt
- Varianty B/C v `docs/b/` a `docs/c/` zůstávají jako archiv návrhů

## Co záměrně není na Pages

Zaheslovaný editor aktualit, Supabase backend a scrapované starší exporty (`web_assets/`, `site/`) jsou v `.gitignore` — do veřejného repa nepatří.
