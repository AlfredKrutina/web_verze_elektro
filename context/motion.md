# Pohyb na webu

Lehká inspirace [VR Education](https://vreducation.cz/) — nasunutí ze strany
a krátký dojezd karuselu. Bez přebírání scrollu a bez nekonečného autoplay.

- Hero: text zleva, fotka zprava
- Sekce s `.reveal`: při načtení první obrazovka naskakuje se zpožděním,
  další bloky se při scrollu souvou zleva. Děti (`[data-stagger]`) jdou po sobě.
  `transition` musí viset na `.reveal` pořád, ne jen na `:not(.is-visible)`.
  Jinak se při přidání `.is-visible` transition ztratí a blok naskočí bez
  pohybu. Skrytý stav se vykreslí o snímek dřív. IO má těsný rootMargin.
- Fotky (`.reveal-img`) se nevážou na rodičovský blok. Collage, galerie,
  media-row, cover a karty najíždějí ze stran (střídavě vlevo / vpravo)
  až když dojedou do viewportu. Celý `.ref-feature` / `.photo-collage`
  se proto nesmí schovávat jako jeden kus — jinak fotky jen vyskočí.
- Homepage karusely nemají `.reveal` (nesmí čekat na IO). První 2–3 slidy
  jdou `loading="eager"` + preload prvního slidu, intro delay je krátký.
- Karusel: po prvním zobrazení popojede o 1–2 slidy (na mobilu o 1), pak čeká
- Svislý scroll karusel neruší; zruší ho až vodorovný swipe nebo šipky
- Vnitřní stránky: `page-hero` plus jednotlivé bloky (realizace, služby
  včetně detailů a `media-row`, aktuality, O nás, obchod, kontakty) —
  JS doplní `.reveal` automaticky
- Head přidá `html.js` — CSS schová bloky jen když JS běží, bez JS
  zůstane obsah viditelný
- Když `main.js` nedorazí do 3,2 s, `reveals-fallback` obsah znovu ukáže
- Hash (`#certifikaty`), `load`, `pageshow` a scroll mají pojistku,
  kdyby IntersectionObserver selhal
- `prefers-reduced-motion` vypne i `page-hero`

## Proč stránka občas „zamrzla“

Tři věci se přetahovaly o scroll — ne o obsah článků.

1. **Zámek menu (`nav-locked`)** — `position: fixed` + `touch-action: none`.
   `setOpen(false)` se volalo i když menu nebylo otevřené (každý `resize`
   nad 981 px) a dělalo `window.scrollTo(0, lockScrollY)` dvousložkově.
   To dědí `html { scroll-behavior: smooth }`, takže prohlížeč (hlavně
   Safari) ignoruje prst, dokud smooth scroll nedoběhne. `resize` z iPad
   lišty to umí spouštět pořád dokola. `body { top: 0 !important }` navíc
   přebíjel offset zámku. Po návratu z bfcache lock občas zůstal viset.

2. **Karusel rewind vs `scroll-snap: mandatory`** — skok z kopií slidů
   snap hned vracel, scroll event znovu volal rewind. Dva karusely na
   homepage držely hlavní vlákno a svislý scroll přestal reagovat.

3. **Reveal na každém scroll ticku** — `getBoundingClientRect()` přes
   všechny bloky + `will-change` na skrytých sekcích. Na mobilu to
   umí scroll zabít. `overflow-x: clip` na `html` rozbíjí IO.

Opravy: lock jen když je menu opravdu otevřené, `scrollTo({ behavior: "auto" })`,
odemčení na `pageshow`/`pagehide`, rewind se vypnutým snapem, IO bez
layoutu na každém ticku, pryč `clip` a `will-change` na hidden.
