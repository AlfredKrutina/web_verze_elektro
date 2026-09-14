# Pohyb na webu

Lehká inspirace [VR Education](https://vreducation.cz/) — nasunutí ze strany
a krátký dojezd karuselu. Bez přebírání scrollu a bez nekonečného autoplay.

- Hero: text zleva, fotka zprava
- Sekce s `.reveal`: při načtení první obrazovka naskakuje se zpožděním,
  další bloky se při scrollu souvou zleva. Děti (`[data-stagger]`) jdou po sobě.
  `transition` musí viset na `.reveal` pořád, ne jen na `:not(.is-visible)`.
  Jinak se při přidání `.is-visible` transition ztratí a blok naskočí bez
  pohybu. Skrytý stav se vykreslí o snímek dřív. IO má těsný rootMargin.
- Karusel: po prvním zobrazení popojede o 1–2 slidy (na mobilu o 1), pak čeká
- Svislý scroll karusel neruší; zruší ho až vodorovný swipe nebo šipky
- Vnitřní stránky: `page-hero` plus jednotlivé bloky (realizace, služby
  včetně detailů a `media-row`, aktuality, O nás, obchod, kontakty) —
  JS doplní `.reveal` automaticky
- Head přidá `html.js` — CSS schová bloky jen když JS běží, bez JS
  zůstane obsah viditelný
- Když `main.js` nedorazí do 3,2 s, `reveals-fallback` obsah znovu ukáže
- Hash (`#certifikaty`), `load`, `pageshow` a scroll mají pojistku,
  kdyby IntersectionObserver selhal (overflow na html/body)
- `prefers-reduced-motion` vypne i `page-hero`
