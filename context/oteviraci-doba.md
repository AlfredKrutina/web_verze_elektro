# Otevírací doba na webu

Živý stav **Otevřeno / Zavřeno** počítá prohlížeč v pásmu `Europe/Prague`.
Statický GitHub Pages nemůže volat Google Places API (klíč + účtování) ani
scrapovat Maps (CORS, prázdné HTML). Na webu proto platí **stejná týdenní
doba, kterou firma publikuje na Google Maps**, plus české svátky a ruční
výjimky.

Google: [Elektro Euron spol. s r.o., Cheb](https://www.google.com/maps/place/Elektro+Euron+spol.+s.r.o./@50.0843032,12.3693536,17z)

Zdroj dat: `docs/a/assets/data/oteviraci-doba.json`

## Týdenní doba (stav 13. 9. 2026)

| Den | Hodiny |
|-----|--------|
| Po–pá | 7:00–17:00 |
| So | 8:00–12:00 |
| Ne | zavřeno |

## Kde se zobrazuje

- Patička všech stránek — kompaktní badge + týdenní souhrn
- `docs/a/obchod/index.html` — tabulka týdne
- `docs/a/kontakt/index.html` — tabulka týdne

Otevřeno platí pro interval `open ≤ teď < close`. Stav se překreslí každou minutu.

## Mimořádné zavření / zkrácená doba

V JSON:

```json
"status": "operational"
```

- `operational` — počítat podle týdne, svátků a výjimek
- `closed` nebo `closed_temporarily` — dočasně zavřeno (`statusNote` je důvod)
- `closed_permanently` — trvale zavřeno

Jednorázové dny v `exceptions` (mají přednost před svátkem):

```json
"exceptions": [
  {
    "date": "2026-12-31",
    "closed": false,
    "periods": [{ "open": "07:00", "close": "12:00" }],
    "note": "zkrácená doba"
  },
  {
    "date": "2026-04-02",
    "closed": true,
    "note": "inventura"
  }
]
```

`holidaysClosed: true` zavře prodejnu o českých státních svátcích
(včetně Velkého pátku a Velikonočního pondělí).

Když se změní doba na Google Maps, uprav stejné hodiny v JSON a v případě
potřeby přidej výjimku. Live napojení na Places API dává smysl až s vlastním
klíčem a backendem — na statický hosting ho nedávej.
