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

1. Pushněte větev `main` na GitHub.
2. **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/docs**
3. Uložte a počkejte ~1 minutu. Odkaz se zobrazí nahoře na stránce Pages.

Volitelně (CLI, pokud máte `gh`):

```bash
gh repo create web_verze_elektro --public --source=. --remote=origin --push
gh api -X PUT "repos/{owner}/{repo}/pages" -f build_type=legacy -f source[branch]=main -f source[path]=/docs
```

## Co je v mockupu

- Kompletní navigace: služby, obchod, reference, aktuality (statické ukázky), o nás, kontakt
- Varianty B/C v `docs/b/` a `docs/c/` zůstávají jako archiv návrhů

## Co záměrně není na Pages

Zaheslovaný editor aktualit, Supabase backend a scrapované starší exporty (`web_assets/`, `site/`) jsou v `.gitignore` — do veřejného repa nepatří.
