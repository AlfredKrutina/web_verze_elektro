# Audit AI tells — projekt Elektro Euron (`docs/a/`)

Datum: 2026-09-08  
Rozsah: varianta A (`docs/a/`), CSS `assets/css/main.css`, JS `assets/js/main.js`, homepage + vzorek podstránek.  
Checklist: `context/ai_web_tells.md`.

**Verdikt:** Web **není textbook AI slop**. Nemá purple/Inter/shadcn/3 stejné karty/emoji — tedy to, na co si Reddit stěžuje nejhlasitěji. Má ale **cluster SaaS-landing patternů** (centrovaný hero + scrim, dual CTA, univerzální fade-up, měkké karty), které při pohledu „zvenku“ mohou působit jako generický moderní AI-assisted web. Copy, fotky a brand zelená to drží u země.

Skóre (hrubě, Krebs-logika): **mild** — cca 3–5 měkkých patternů, 0–1 hard SaaS fingerprintů.

---

## A. Co na webu AI look NEPROZRAZUJE (silné)

| Tell | Stav | Důkaz v projektu |
|------|------|------------------|
| Purple / indigo / violet gradient | **NE** | Brand `--green: #1fa03a`, ink `#111` — žádné `#3b82f6` / `#8b5cf6` |
| Claudian cream `#F4F1EA` + terracotta + italic serif | **NE** | Paper `#f5f5f7`, zelený accent, Cabinet Grotesk (sans display) |
| Inter / Geist / Roboto / Space Grotesk | **NE** | `--font-display: Cabinet Grotesk`, `--font-body: Satoshi` (`index.html` Fontshare) |
| shadcn / Tailwind / Lucide / Radix | **NE** | Vlastní CSS, žádné utility class soup |
| Přesně 3 feature karty + 3 kroky + 3 pricing | **NE** | 7 kompetencí, 2 cesty (paths), žádný pricing |
| Pill badge ✨/🚀 nad H1 | **NE** | Hero bez eyebrow badge |
| Emoji jako ikony | **NE** | — |
| Prázdný buzzword copy (elevate, seamless…) | **NE** | Konkrétní: Cheb, Aš, 1993, NN/VN, TOSTA, Skalná |
| Stock Unsplash / AI bloby | **NE** | Reálné fotky `assets/media/IMG_*`, `cheb_sidlo.jpg`, realizace |
| Footer Product/Company/Resources/Legal | **NE** | Firma + Navigace + Prodejny (`main.js` footerHtml) |
| Fake „Trusted by 10K+“ | **NE** | Trust strip = 1993, ISO, region — ověřitelná fakta |
| Builder fingerprint (Lovable/v0) | **NE** | — |
| Default Next/Vite favicon | **NE** | `logo_nove.png` |
| Brand jen v navu | **NE** | Logo hero-level v `.hero-brand` — splňuje brand-first |

---

## B. Co na webu AI look ČÁSTEČNĚ / MĚKCE prozrazuje

### B1. Centrovaný hero + dark scrim *(střední)*

**Tell:** Centered everything + stock/photo za tmavým overlay, aby bílý text „fungoval“.

**Kde:**
- `docs/a/index.html` — `.hero` / `.hero-content`
- `main.css` ~563–676: `justify-items: center`, `text-align: center`, `align-items: center`
- `main.css` ~596–602: `hero-media::after` = radial + linear **dark scrim**

```596:602:docs/a/assets/css/main.css
.hero-media::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 75% 70% at 50% 48%, rgba(17, 17, 17, 0.28) 0%, rgba(17, 17, 17, 0.62) 55%, rgba(17, 17, 17, 0.78) 100%),
    linear-gradient(180deg, rgba(17, 17, 17, 0.45) 0%, rgba(17, 17, 17, 0.35) 40%, rgba(17, 17, 17, 0.7) 100%);
}
```

**Poznámka:** Fotka je reálná (ne stock) a logo je v hero — mitigace. Scrim + center je ale stále klasický landing reflex.

---

### B2. Dual CTA (filled + outline) v hero *(slabý–střední)*

**Tell:** Primární filled + sekundární ghost/outline vedle sebe.

**Kde:** `index.html` ~60–63

```60:63:docs/a/index.html
            <div class="btn-group">
              <a class="btn btn-primary" href="kontakt/">Poptat montáž</a>
              <a class="btn btn-secondary" href="#prodejny">Otevírací doba / prodejny</a>
            </div>
```

**Mitigace:** Texty CTA jsou specifické (ne „Get started / Learn more“). Pattern layoutu je ale ten kanonický.

Stejný vzorec i na `sluzby/index.html` (Poptat + Zavolat).

---

### B3. Univerzální fade-in-up / rise na scroll *(střední — Reddit #4)*

**Tell:** Jedna motion primitiva všude: opacity + translateY.

**Kde:**
- `main.css` `.reveal` / `.reveal-child` (~790–823): `translateY(32px)` / `18px` → fade up
- `main.css` `@keyframes rise` na hero brand/h1/lead/btn (~618–675)
- `main.js` IntersectionObserver + stagger delays (~178–274)

**Mitigace:** `prefers-reduced-motion`, `scroll-fast` instant path — lepší než typický AI export. Pořád ale jedna gesta na všechny sekce.

---

### B4. Soft card grid kompetencí *(slabý–střední)*

**Tell:** Stejné karty = stejný radius, border, shadow lift, rovná váha.

**Kde:**
- `index.html` `.comp-grid` — 7 stejně strukturovaných `.comp-tile` (foto + strong + small)
- `main.css` ~990–1057: `border-radius: 1rem`, hover `translateY(-4px)` + soft shadow

**Mitigace:** Není magic number 3; jsou fotky služeb (ne Lucide ikony); 4-column grid. Stále „equal card wall“.

Podobně `.service-link` na přehledu služeb, `.store` karty prodejen.

---

### B5. Glass header (backdrop-blur) *(slabý)*

**Tell:** Glassmorphism reflex.

**Kde:** `main.css` `.site-header` ~167: `backdrop-filter: blur(14px)`

Funkční (fixed nav), ne hero glass karty — nízká závažnost.

---

### B6. Colored glow na primary button *(slabý)*

**Tell:** Colored box-shadow glow (u AI často purple; u nás green).

**Kde:** `main.css` `.btn-primary` ~522–531: `box-shadow: 0 8px 22px rgba(31, 160, 58, 0.22)` (+ silnější hover)

Brand-consistent, ale „glow CTA“ je v katalogu tells.

---

### B7. Trust / „stat“ strip pattern *(slabý)*

**Tell:** Horizontální strip faktů pod obsahem (u AI často fake metriky).

**Kde:** `index.html` `.section-trust` / `.trust` — 1993 · ISO · region

**Mitigace:** Obsah je pravdivý a lokální. Pattern layoutu je příbuzný.

---

### B8. Chybějící Open Graph / social meta *(střední tech tell)*

**Tell:** Prompt-and-deploy weby často nemají OG.

**Kde:** Grep přes `docs/a/**/*.html` — **žádné** `og:`, `twitter:`, `theme-color`, schema.org.

Title + description ano; sdílení v chatu = bez preview karty.

---

### B9. Generický systémový paper `#f5f5f7` *(velmi slabý)*

**Tell:** „Safe“ světlé pozadí bez charakteru (iOS gray).

**Kde:** `--paper: #f5f5f7` — není cream Claudian, ale ani silně brandovaná atmosféra (koncept zmiňoval gradienty/texturu; CSS má `--bg-glow-*` / `--pattern` **nepoužité** → flat).

---

### B10. Section formula „H2 + jedna věta“ opakovaně *(velmi slabý)*

Každá sekce: `.section-head` h2 + p. Dobré UX; při opakování na celé homepage může působit jako „AI landing skeleton“ (hero → paths → features → refs → stores → trust).

---

## C. Mimo checklist — kvalita / hygiena (nesouvisí přímo s AI lookem, ale stojí za zmínku)

| Problém | Kde |
|---------|-----|
| Rozbitý CSS — orphan rules po `.site` (chybí selektor `.container`) | `main.css` ~127–128 |
| Nepoužité tokeny `--bg-glow-a/b`, `--bg-top/bottom`, `--pattern` | `main.css` :root — mrtvý scaffolding |
| Inline `style=` na některých podstránkách | např. `o-nas`, `sluzby` — drobná nekonzistence design systému |

---

## D. Mapa po stránkách (homepage pattern)

| Sekce homepage | AI-pattern příbuznost |
|----------------|----------------------|
| Hero full-bleed + logo + H1 + lead + 2 CTA | Centrovaný SaaS hero + scrim + dual CTA |
| Paths (2 velké fotocesty) | **Anti-slop** — asymetrie/účel, ne 3 karty |
| Kompetence 7 tiles | Soft equal-card grid |
| Realizace (TOSTA, Skalná) | **Anti-slop** — konkrétní projekty + fotky |
| Prodejny 2 store cards | Interakční karty OK; soft radius/shadow |
| Trust strip | Soft „stats“ pattern, dobrý obsah |
| Footer 3 sloupce | **Anti-slop** — firemní, ne Product/Legal |

Podstránky (`sluzby/*`, `o-nas`, `kontakt`): page-hero + prose — čisté, lidské (jména týmu, telefony, ISO certy). Nízké riziko slopu.

---

## E. Priorita úprav (když chceš snížit „AI smell“)

1. **Hero layout** — méně centrování (např. left-aligned text / logo), slabší nebo lokálně cílený scrim, jedna dominantní CTA v hero.  
2. **Motion** — nechat rise jen v hero; scroll reveal jen na 1–2 klíčových blocích, ne na všem.  
3. **Kompetence** — vizuální hierarchie (1–2 velké dlaždice, zbytek menší), ne 7 stejně důležitých karet.  
4. **OG meta** na všech stránkách (title, description, image z reálné fotky).  
5. **Atmosféra pozadí** — použít nebo smazat mrtvé `--bg-glow` tokeny; lehčí textura/gradient dle konceptu.  
6. **Opravit** broken `.container` v CSS.

Neměnit: brand zelená, Cabinet+Satoshi, reálné fotky, konkrétní copy, logo v hero, footer s IČO/prodejnami.

---

## F. Shrnutí jednou větou

**Není to purple-Inter-shadcn slop; je to moderní brandový firemní web s několika typickými AI/SaaS landing reflexy (centrovaný hero+scrim, dual CTA, univerzální fade-up, měkké karty, chybějící OG).**
