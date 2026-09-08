# Elektro Euron — web (mockup)

Statický návrh webu pro prezentaci firmě. Aktivní design je **varianta A** (`docs/a/`).

## Po nasazení

`https://alfredkrutina.github.io/web_verze_elektro/` → přesměruje na `/a/`.

## Lokálně

Z kořene repozitáře:

```bash
npx --yes serve docs -l 5173
```

Otevřete http://localhost:5173/ (stejný obsah jako GitHub Pages).

Kontrola před push:

```bash
python scripts/verify-pages.py
```

## GitHub Pages

Deploy: GitHub Actions — `.github/workflows/pages.yml` (job *verify* + *deploy*).

1. Repo **public** (nebo plán s Pages pro private).
2. **Settings → Pages → Source: GitHub Actions** (jednou).
3. `git push origin main` — workflow nasadí složku `docs/`.

Ruční spuštění: Actions → *Deploy GitHub Pages* → Run workflow.

Pomocný skript (vyžaduje `gh auth login`): `.\scripts\push-and-pages.ps1`

## Co mockup obsahuje

- Navigace: Služby, Obchod, Reference, Aktuality, O nás, Kontakty
- Statické aktuality v `docs/a/aktuality/` (žádný login, žádný backend)
- Varianty **B** a **C** v `docs/b/`, `docs/c/` — archiv návrhů (ne primární demo)

Jak přidat aktualitu: `context/aktuality_static.md`

## Co do public gitu nepatří

Ignorováno v `.gitignore` (zůstává jen lokálně, pokud existuje):

- editor / Supabase pokus (`ops-redakce/`, admin JS, `aktuality-config.js`, vendor, SQL)
- scrapovaný archiv `web_assets/`, starší strom `site/`
- `docs/a/assets/media/originals_backup/`

Veřejný web je čistě HTML/CSS/JS — vhodné pro **public** repo.
