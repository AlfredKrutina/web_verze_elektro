# Audit AI tells — projekt Elektro Euron (`docs/a/`)

Datum: 2026-09-08 · **aktualizace po anti-slop implementaci**  
Rozsah: varianta A (`docs/a/`).  
Checklist: `context/ai_web_tells.md`.  
Plán: anti-slop human redesign.

**Verdikt po úpravách:** Cluster SaaS/AI landing reflexů na homepage **odstraněn nebo výrazně oslaben**. Brand (zelená, Cabinet+Satoshi, reálné fotky, lokální copy) beze změny. První viewport je editorial left/bottom s **logem dominantnějším než H1**.

---

## Stav tells (po implementaci)

| Tell | Dříve | Teď |
|------|-------|-----|
| Centrovaný hero + plošný scrim | ANO | **Opraveno** — left/bottom, směrový gradient |
| Dual CTA (filled + outline) | ANO | **Opraveno** — 1 primary + textový secondary |
| Logo přehlušené H1 | riziko | **Gate** — logo větší, H1 supporting (~1.05–1.45rem) |
| Univerzální fade-up | ANO | **Opraveno** — jen `paths` + 1. ref (TOSTA) |
| Equal soft card wall (7 tiles) | ANO | **Opraveno** — 3 featured strips + typografický seznam |
| Glass header blur | ANO | **Opraveno** — solid header |
| Green glow na primary btn | ANO | **Opraveno** — flat shadow none |
| Trust SaaS strip | ANO | **Opraveno** — `.trust-line` pod prodejnami |
| Chybějící OG | ANO | **Opraveno** — OG/Twitter na veřejných `index.html` |
| Purple / Inter / shadcn / 3 karty / emoji | NE | stále NE |

---

## Brand composition gate (první viewport)

- Logo: `clamp(13.5rem, 52vw, 21rem)`
- H1: `clamp(1.05rem, 0.95rem + 0.75vw, 1.45rem)`, max-width 30ch
- Test: bez navu pořád Elektro Euron; logo vizuálně těžší než headline

---

## Soubory

- [docs/a/index.html](../docs/a/index.html) — hero, kompetence, trust, selective reveal, OG
- [docs/a/assets/css/main.css](../docs/a/assets/css/main.css) — editorial hero, chrome, featured/list, atmosféra
- [docs/a/assets/js/main.js](../docs/a/assets/js/main.js) — méně cascade delay
- [docs/a/sluzby/index.html](../docs/a/sluzby/index.html) — typografický seznam, 1 CTA + tel text
- Ostatní veřejné stránky — OG meta, odstraněné `reveal` třídy

OG image/url base: `https://alfredkrutina.github.io/web_verze_elektro/a/`
