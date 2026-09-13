# UI redesign 2026-09 — „světlejší web, antracit, karusely“

Zadání (Jana): web ladit do světlejších stránek, dole místo černé tmavý **antracit**,
silně se inspirovat <https://amit-automation.cz/> (hlavně homepage), mít **karusely**
a v karuselu **obrázky překryté logem z boku** — to, co má AMiT červeně, chceme zeleně.

---

## 1. Analýza AMiT — co přesně funguje a co si vezmeme

### 1.1 Naměřené hodnoty (DevTools, viewport 1221 px)

| Vrstva | AMiT | Poznámka |
| --- | --- | --- |
| Display font | `Sofia Sans Condensed` 700, **UPPERCASE**, h2 36,6 px / h3 24–28 px | hlavní nositel „industriálního“ dojmu |
| Body font | `Montserrat` 400/500/600, 16 px | |
| Akcent | `#D20A11` (červená) | u nás zelená `#1FA03A` |
| Ink | `#101010` | |
| Světlé plochy | `#FFFFFF` a `#F7F7F7` | dvě střídající se pásma |
| Tmavé plochy | `#101010`, overlay `rgba(16,16,16,.7)` | **u nás antracit** |
| Rádiusy | `0 px` všude, tlačítka 0–3 px | ostré, technické |
| Sekce | full-bleed, container padding `40px 20px` | žádné „ostrůvky“ |
| Karusel | Swiper, `slidesPerView: 2.5`, `centeredSlides`, `loop`, gap 20/32 px | 2 kusy na homepage |
| Produkty | `effect: coverflow`, autoplay 3 s | 3D náklon boků |
| Reference | `effect: slide`, bez autoplay | boky `filter: grayscale(1)` |

### 1.2 Skladba jejich homepage (pořadí sekcí)

1. Full-bleed foto/video pás bez textu (sticky bílá hlavička nad ním, červené CTA vpravo).
2. Světlý blok s velkým uppercase claimem — **jedno slovo v akcentní barvě** — a odstavcem.
3. Tmavý pás „ODVĚTVÍ“: mřížka 4×2 foto karet, bílý spodní štítek s **akcentní svislou čárkou** před názvem.
4. Karusel „PRODUKTY“ (coverflow, autoplay).
5. Full-bleed tmavý banner: claim + akcentní CTA, foto s barevným přesvitem.
6. Světlý pás „JAK TO DĚLÁME“: 4 tmavé karty (čárka + uppercase titulek + text + foto dole) a centrovaný outline button „VÍCE“.
7. Karusel „REFERENCE“ (2,5 slidu, boky greyscale, přes fotku vypálený tmavý panel s logem a názvem projektu) + řádek log partnerů + „VÍCE“.
8. „NOVINKY A AKTUALITY“ — 3 bílé karty, akcentní odkaz „Číst více“.
9. Kontaktní blok s formulářem, pak tmavý footer, pod ním úzký foto banner s claimem + CTA a řádek s copyrightem.

### 1.3 Kritické poznámky (co **ne**kopírovat)

- **Overlay v karuselu mají AMiT vypálený do JPG/WEBP.** Proto to na jejich webu vypadá
  nekonzistentně (uprostřed čisté foto, po stranách grafika). My to uděláme **v CSS** —
  jeden zdroj pravdy, funguje na jakékoli fotce, jde lokalizovat i měnit barvu tématem.
- Jejich produktový coverflow s autoplay 3 s je pro nás nevhodný (nemáme katalog výrobků
  a autoplay bez pauzy je a11y problém). Použijeme ho maximálně na sortiment/značky a **bez autoplay**.
- Hero bez textu (jen obrázek) je pro lokální firmu slabé z pohledu SEO i konverze —
  necháme náš split hero s H1, jen ho odlehčíme.
- Nepřebíráme jejich písmo 1:1 do bodytextu (Montserrat), zůstáváme u Satoshi — je čitelnější
  v delších odstavcích, už je načtené a ladí s naší zelenou.

---

## 2. Cílový design systém Elektro Euron

### 2.1 Barvy — světlejší základ, antracit dole

```
LIGHT
--paper        #F4F6F4  →  #FFFFFF   (základ stránky bílý, pásma se odlišují)
--paper-alt    #F2F4F2            (střídavé světlé pásmo, náhrada dnešního zelenošedého #EEF0EE)
--surface      #FFFFFF            (karty)
--line         #E2E7E3
--ink          #111111
--muted        #5C635E
--panel        #23292E            ANTRACIT (dnes #111111) — footer, tmavá pásma
--panel-2      #1B2024            hlubší antracit pro copyright lištu
--panel-line   rgba(255,255,255,.12)
--on-panel     #F2F5F2
--green        #1FA03A            (beze změny — firemní)
--green-on-dark #46C964           (linky/akcenty na antracitu, kontrast ≥ 4,5:1)

DARK (zůstává, jen sladěné)
--paper #0F1210 / --surface #171B18 / --panel #14181B / --panel-2 #0E1113
```

Kontrastní kontroly, které musí projít: bílý text na `#23292E` (12,6:1),
`--green-on-dark` na `#23292E` (5,1:1), `--muted` na bílé (5,3:1),
zelené CTA `#1FA03A` s bílým textem (3,4:1 → text ≥ 16 px bold, jako dnes).

### 2.2 Typografie

- Display: **uppercase kondenzovaný** řez (`Sofia Sans Condensed` 700, Google Fonts, plná
  podpora české diakritiky) pro `h1`–`h3` v sekčních hlavičkách, karty, footer claim.
  Fallback řetězec: `"Sofia Sans Condensed", "Cabinet Grotesk", "Segoe UI Condensed", sans-serif`.
- Body: `Satoshi` (beze změny).
- Sekční hlavička: **centrovaná**, uppercase, pod ní jedna věta `--muted` (dnes doleva).
- Akcent v claimu: jedno slovo obalené `<span class="hl">` = zelené.

### 2.3 Geometrie a rytmus

- Rádiusy: `0.25rem` pro karty/obrázky, `0.25rem` tlačítka (dnes ~1 rem) → technický vzhled.
- Sekce: `padding-block: clamp(3.5rem, 7vw, 6rem)`, střídání `--paper` / `--paper-alt` / `--panel`.
- Full-bleed prvky (banner, karusel) přes pomocnou třídu `.bleed` (`margin-inline: calc(50% - 50vw)`).
- Container zůstává `--max` (64 rem), karusel jde full-bleed s centrovaným aktivním slidem.

### 2.4 Nové/změněné komponenty

| Komponenta | Stav | Popis |
| --- | --- | --- |
| `.section--alt`, `.section--panel` | nové | světlé střídavé a antracitové pásmo |
| `.tick-label` | nové | zelená svislá čárka + uppercase titulek (AMiT pattern) |
| `.card-stack` | nové | tmavá karta: čárka + titulek + text + foto dole (jako „Jak to děláme“) |
| `.carousel` | nové | vanilla, přístupný, 2,5 slidu, centrovaný, loop, greyscale boky |
| `.carousel-slide__overlay` | nové | **boční tmavý panel s logem v zelené** + název + podtitul |
| `.banner-cta` | nové | full-bleed antracit + foto + claim + CTA |
| `.logo-strip` | nové | řádek log značek, greyscale → barva na hover (máme ABB, Schneider, Kanlux, Kopos, Philips, EMOS, Jablotron) |
| `.news-grid` | úprava | `.aktualita-card` do bílé karty s zeleným „Číst více“ |
| `.site-footer` | úprava | antracit, 4 sloupce, claim pás + copyright lišta |
| `.path`, `.comp-*`, `.store`, `.cert-*`, `.service-link` | úprava | ostré hrany, tick-label, světlejší plochy |

---

## 3. Karusel — technické zadání

**Bez knihovny** (web je statický, bez build stepu; Swiper = ~150 kB navíc a CDN závislost).
Vlastní `carousel.js` (~150 řádků) uvnitř `main.js`:

- Struktura: `<section class="carousel bleed" data-carousel>` → `track` (flex, `transform: translate3d`)
  → `article.cslide` (šířka `clamp(260px, 38vw, 470px)`, gap 2 rem).
- Centrovaný aktivní slide, po stranách viditelné „peeky“ (efektivně `slidesPerView ≈ 2,5`).
- Aktivní slide: plná barva a ostrost; ostatní `filter: grayscale(1)` + tmavší overlay (jako AMiT).
- Ovládání: šipky vlevo/vpravo (na okrajích přes slidy), tečky (aktivní = zelená pilulka),
  drag/swipe (pointer events), kolečko myši ignorováno (neblokovat scroll stránky).
- Klávesnice: focusovatelný `track` s `role="group"`, `←/→`, `Home/End`, viditelný focus ring;
  slidy jsou odkazy → tabem projdou přirozeně, `aria-hidden` se nepoužívá na viditelné slidy.
- A11y: `aria-roledescription="carousel"`, `aria-live="polite"` status „Slide 3 z 7“,
  tlačítka mají `aria-label`, `prefers-reduced-motion` → žádné animace, jen okamžitý skok.
- Bez autoplay (rozhodnutí: autoplay = pohyb, který uživatel nechtěl; AMiT ho má jen u produktů).
- Resize: přepočet šířek přes `ResizeObserver`, žádný layout shift (`aspect-ratio` na médiu).
- Mobil: 1 slide + malý peek, tečky pod ním, swipe.
- Fallback bez JS: track se chová jako vodorovný scroller se `scroll-snap` (obsah zůstává dostupný).

### 3.1 Overlay „logo z boku“ (hlavní vizuální požadavek)

```
.cslide            position: relative; overflow: hidden
.cslide img        aspect-ratio 16/10; object-fit: cover
.cslide__veil      ::before  linear-gradient(100deg,
                     rgba(35,41,46,.92) 0%, rgba(35,41,46,.78) 38%, rgba(35,41,46,0) 72%)
.cslide__mark      logo-mark.svg vlevo nahoře, zelená (currentColor / mask), výška 2.5rem,
                   pod ním tenká zelená linka
.cslide__title     uppercase kondenzovaný, bílý
.cslide__sub       0.9rem, rgba(255,255,255,.82)
```

- Panel jde **z levého boku** (AMiT ho má z boku u vedlejších slidů) přes ~55 % šířky fotky.
- Logo v zelené: použijeme `assets/media/logo-mark.svg` s `fill: var(--green-on-dark)`
  (SVG přebarvíme přes `mask-image`, aby šla barva měnit tématem).
- Aktivní slide: overlay slabší (gradient do 45 %), aby fotka „žila“; boky: overlay silnější + greyscale.
- Kontrast textu na overlay hlídán na nejsvětlejší fotce (testuji na `kaple_na_hrade4`, `NMvizualizace`).

---

## 4. Nová skladba homepage (mapování AMiT → náš obsah)

| # | Sekce | Pásmo | Obsah |
| --- | --- | --- | --- |
| 1 | Hero split (ponechán, odlehčen) | bílá + foto | logo, H1, lead, CTA „Poptat montáž“, sekundárně „Otevírací doba“, šipka dolů |
| 2 | Dvě cesty (`.paths`) | bílá | „Potřebuji montáž“ / „Jdu nakoupit materiál“ — ostré hrany, tick-label, antracitový overlay |
| 3 | Claim s akcentem | `--paper-alt` | „KOMPLETNÍ **ELEKTRO** PARTNER V KARLOVARSKÉM KRAJI“ + odstavec (jako AMiT bod 2) |
| 4 | Co děláme (dnešní `.section-comp`) | antracit | mřížka 7 služeb, foto + tick-label (AMiT „Odvětví“) |
| 5 | **Karusel Realizace** | bílá | 6–8 projektů, overlay s logem zeleně — TOSTA Plesná, Národní muzeum, Chebský hrad, Skalná, FVE sídlo, VN, rozvaděče, datové sítě |
| 6 | Banner CTA | antracit + foto | „OD JISTIČE PO TRAFOSTANICI“ + „Poptat montáž“ |
| 7 | Jak pracujeme | `--paper-alt` | 4 `card-stack`: Poptávka → Návrh a projekce → Realizace → Revize a servis |
| 8 | **Karusel/strip Sortiment + značky** | bílá | kategorie sortimentu + `logo-strip` značek, CTA „Prodejna a sortiment“ |
| 9 | Prodejna Cheb | `--paper-alt` | dnešní `.store--wide`, ostré hrany |
| 10 | Aktuality | bílá | 3 nejnovější karty + „Všechny aktuality“ |
| 11 | Kontakt teaser | antracit | telefon, e-maily (info/objednávky/fakturace), CTA na formulář |
| 12 | Footer | antracit / hlubší antracit | 4 sloupce + claim pás + copyright lišta |

---

## 5. Rozsah zásahu — všech 25 stránek

Sdílené (`main.css`, `main.js`) → mění celý web naráz. Ručně dorovnat sekce na:

- `index.html` (kompletní přestavba dle bodu 4)
- `sluzby/index.html` + 13 detailů služeb (`nizke-napeti`, `vysoke-napeti`, `fve`, `rozvadece`,
  `projekce`, `revize`, `zemni-prace`, `slaboproud` + 6 podstránek) — page-hero, tick-labely, CTA řádky
- `obchod/index.html` — sortiment karusel/mřížka, `logo-strip`, prodejna
- `reference/index.html` — karusel nahoře + mřížka projektů
- `aktuality/index.html` + 4 detaily — `news-grid`, obálky, prose
- `o-nas/index.html` — foto sídla, tým, certifikáty (lightbox nechat funkční)
- `kontakt/index.html` — formulář (validace nechat), kontakty, fakturace, objednávky
- Hlavička a footer v `main.js` (šablony) + `assets/media/logo-mark.svg` (maskovací varianta)

---

## 6. Postup prací (etapy, každá ověřená)

1. **Tokeny a základ** — barvy, antracit, fonty, rádiusy, sekční pásma, tlačítka, hlavička, footer.
   → celý web je hned světlejší a má antracitový spodek; kontrola obou témat.
2. **Komponenty** — `tick-label`, `card-stack`, `banner-cta`, `logo-strip`, `news-grid`, `bleed`.
3. **Karusel** — CSS + JS + overlay s logem; testy: klávesnice, swipe, reduced-motion, bez JS, mobil.
4. **Homepage** — přestavba podle bodu 4, obsah k jednotlivým sekcím.
5. **Podstránky** — postupně: služby → obchod → reference → aktuality → o nás → kontakt.
6. **QA** — `scripts/verify-pages.py`, kontrast (WCAG AA), focus stavy, 360/768/1024/1440/2560 px,
   light + dark, screenshoty před/po, kontrola odkazů, Lighthouse-style kontrola LCP obrázků.

## 8. Responzivní QA (13. 9. 2026)

Ověřeno v prohlížeči: 360, 390, 768, 1024. Horizontální overflow stránky není
(`scrollWidth === viewport` mimo záměrný scroller karuselu).

Úpravy po auditu v `main.css`:
- split hero pod 900 px: fotka nahoře, text pod ní, šipka skrytá (ležela na leadu)
- split H1/lead bez zděděného `max-width: 30ch` (na mobilu využije šířku sloupce)
- landscape `min-height` jen u `.hero:not(.hero--split)`
- tlačítka v `.btn-group` pod 640 px sloupec na 100 %
- `news-grid` 2 sloupce na tabletu (do 880), 1 sloupec pod 560
- e-maily v contact-teaser a titulky slidů: `overflow-wrap`
- footer 2 sloupce do 980, 1 sloupec pod 560; Tel v hlavičce pod 420 px

Podstránky (služby, kontakt, obchod, o nás) na 390 px skládají mřížky do 1 sloupce,
formulář a karta prodejny nepřetékají. Desktop 1024: split hero vedle sebe, šipka
viditelná, hamburger pryč.

## 9. Konzistence interakcí (13. 9. 2026)

Jeden jazyk tlačítek:
- **primary** — plná zelená, hover tmavší zelená, bez „vyskočení“
- **ghost / secondary** — 2px obrys, hover zelený rámeček + `--green-soft`
- na antracitu (banner, panel, footer) stejný obrys ve světlé, hover `--green-on-dark`
- písmo u všech tlačítek: Sofia Sans Condensed, uppercase
- Tel v hlavičce je stejné primary tlačítko jako CTA (ne textový odkaz)
- theme/menu: stejný hover (zelený rámeček + soft výplň) a focus 3 px
- karty (news, store, tile, cert): hover `--hover-border`, foto scale 1.03 jen na myši

## 7. Rizika a jak je řeším

- **Paralelní editace**: v repu běží druhá session (commit „texty“, servery na 5173/5174).
  Redesign sahá do stejných souborů → nutná dohoda, jinak konflikty. Řeším dotazem na uživatele.
- **Fonty**: nový display font = +1 požadavek. Preload + `display=swap`, `font-size-adjust`
  proti CLS; fallback `Cabinet Grotesk` už je načtený.
- **Velké fotky** (až 3,4 MB `kaple_na_hrade4.png`) v karuselu = pomalé. Před nasazením
  přegeneruji na 1600 px JPG/WebP (skript `scripts/`), jinak karusel zabije mobilní data.
- **Certifikáty a lightbox**: styly se mění, funkčnost `<dialog>` musí zůstat (regresní test).
- **Dark mode**: každý nový prvek musí mít token, žádné hardcoded `#fff`/`#111`.
