# Moderní web Elektro Euron — koncept

Schválený koncept pro novou verzi webu. Živý podklad: https://www.elektro-euron.cz/  
Archiv: lokálně `web_assets/` (gitignore, není v public gitu) · analýza: `context/site_elektro_euron.md`  
Implementace: `docs/` pro GitHub Pages. Primární demo = **varianta A** (`docs/a/`). B/C jsou archiv. Kořen `docs/index.html` jen přesměruje na `a/`.

## Problém dnešního webu

Katalog služeb z éry ~2012: homepage = starý blog, hluboké menu, slabé CTA. Firma nabízí silný příběh — od 1993, Cheb + Aš, montáže + sklad + projekce/revize. Moderní verze musí ten příběh ukázat vizuálně a převést návštěvníka na telefon / návštěvu prodejny / poptávku.

## Vizuální směrnice

**„Industriální spolehlivost“**

- Barvy z loga: sytá zelená (brand), téměř černá, bílá/světle šedá
- Logo: trojúhelníkový znak, flat; v hero hero-level
- Typografie: Cabinet Grotesk (display) + Satoshi (text)
- Atmosféra: světlé gradienty + jemná textura; tmavé sekce jen u referencí
- Fotky: reálné z archivu, full-bleed
- Karty jen u interakce (provozovny, formulář)
- Motion: hero reveal, ken-burns hero fotky, scroll reveal

## IA

Navigace: Služby · Obchod · Reference · Aktuality · O nás · Kontakty (+ telefon)

```
/                  Homepage (v Pages: /a/)
/sluzby/           Přehled služeb
/sluzby/[tema]/   VN, NN, FVE, rozvaděče, slaboproud (+ podstránky), projekce, revize, zemní práce
/obchod/           Prodejny + sortiment
/reference/        Realizace
/aktuality/        Statické novinky (viz context/aktuality_static.md)
/o-nas/            Historie, certifikáty, tým
/kontakt/          Poptávka + kontakty
```

## Homepage

Hero: logo, jedna věta, podpora, CTA (Poptat montáž + Prodejny).  
Pak: dvě cesty → kompetence → reference → prodejny → důvěra → footer.

## Konverze

Primary: poptávkový formulář + `tel:`. Ne e-shop.
