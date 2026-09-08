# Co prozrazuje, že web „vypadá jako AI“ (AI slop)

Přehled stížností a poznávacích znaků z designérské / UX komunity, Redditu, HN, médií a nástrojů (2024–2026).  
Účel: checklist proti generickému „AI looku“ při návrhu a úpravách webu.

**Klíčová teze:** Lidé si nestěžují primárně na to, že byl použit AI nástroj. Stěžují si na **neupravené defaulty** — statistický průměr trénovacích dat bez lidského rozhodnutí o značce, hierarchii a obsahu. Jeden znak = náhoda. Čtyři a více najednou = „vyznání“.

---

## 1. Co lidé skutečně říkají (Reddit data)

Studie [vibecoded-design-tells](https://github.com/JCarterJohnson/vibecoded-design-tells) (3,2M postů, 47 subredditů, 3033 komentářů z 125 vláken):

**Nejhlasitější stížnost není jedna věc — je to sameness:**
- „Screams AI / soulless / slop“ ~6,4 % komentářů
- „All looks the same / cookie-cutter“ ~6,1 %

**Žebříček konkrétních tells (komentáře, primární ranking):**

| # | Tell | Comment share |
|---|------|---------------|
| 1 | Default **shadcn / Tailwind** kit | 2,5 % |
| 2 | **Purple / violet** („AI purple“) | 2,3 % |
| 3 | **Gradients** / gradient hero text | 2,0 % |
| 4 | Too many animations / Framer fade-ins | 1,1 % |
| 5 | Rounded corners / pill buttons | 0,8 % |
| 6 | Dark mode + neon glow | 0,7 % |
| 7 | Emoji / ✨ / 🚀 jako ikony | 0,5 % |
| 8 | Generic sans (**Inter / Geist**) | 0,4 % |
| 9 | Hero + **3 feature cards** + CTA | 0,4 % |

**Korekce vůči Twitter memům:** bento grid, glassmorphism a mesh/aurora jsou dole nebo **zamítnuté** jako keyword artefakt. Reddit reálně řeší shadcn + purple + gradients + sameness.

Top subreddity diskuze: r/SideProject, r/SaaS, r/vibecoding, r/ChatGPT, r/ClaudeAI, r/webdev, r/indiehackers…

Topic growth: ~**150×** skok 2023→2024 (share of posts).

---

## 2. Proč to vypadá „jako AI“

1. **Distribuční konvergence** — model bez briefu vrací medián webu.
2. **Stejný dílenský sklad** — React + Tailwind + shadcn + Lucide + Inter/Geist.
3. **Safety bias** — evaluátoři chválí „safe“ > „interesting“ → průměr.
4. **„Digitální břečka“** — funkční, uhlazený, bez autora / úhlu pohledu.
5. **Kolaps modelu** — AI weby se stávají tréninkovým zdrojem → nuda se zhoršuje.
6. **Nový default po anti-slop** — když se zakáže purple/Inter, vznikne **druhá vlna** (cream + serif + terracotta) = „Claudian sameness“ (New Yorker / Kyle Chayka).

---

## 3. Vizuál a barvy

### Klasický SaaS / Tailwind default
| Znak | Proč to bolí |
|------|----------------|
| Fialovo–indigo / blue–purple (`#3b82f6`, `#8b5cf6`, `#7c3aed`) | „Purple Problem“ / „VibeCode Purple“ |
| Violet→pink (`from-purple-500 to-pink-500`) | AI-demo meme |
| Glow / neon blob / colored box-shadow | Noční klub, ne značka |
| Glassmorphism všude | Dekorace místo hierarchie |
| Gradient text (clip-text) | SaaS klišé |
| Low-contrast CTA / body v dark mode | a11y fail + „krásné nečitelné“ |
| Raw Tailwind barvy bez tokenů | Nikdo nepojmenoval brand |
| Perma dark mode bez důvodu | Safe modern průměr |

### Druhá vlna (anti-slop defaulty) — Anthropic je pojmenoval
1. **Warm cream** (~`#F4F1EA`) + high-contrast **serif display** + **terracotta** accent  
2. Near-black + acid-green / vermilion accent  
3. Broadsheet: hairline rules, zero radius, dense newspaper columns  

= „Claudian sameness“: beige/cream, rusty orange, italic serif headlines, tracked-out subheads, ticker bars, mid-century muted primaries.

**Brand test:** Sundáš nav/logo → mohl by to být kdokoli jiný?

---

## 4. Typografie

- **Inter / Geist / Roboto / Arial / system** na všechno
- Overused „safe distinctive“: **Space Grotesk**, **Instrument Serif**, Plus Jakarta Sans, Poppins, Manrope, Cal Sans
- Serif *italic* jedno slovo v jinak Inter hero
- Inter weight **700** + tracking -0.02em na display (Rottoways tell)
- Žádné párování display/body; žádný `text-wrap: balance` / feature settings

---

## 5. Layout a struktura (kanonická kostra)

1. Hero: H1 + odstavec + filled CTA + ghost CTA  
2. Pill badge nad H1 (✨/🚀/🔥 „New:…“)  
3. „Trusted by“ logo strip  
4. **Přesně 3** feature karty (ikona + nadpis + 2 řádky)  
5. How it works — **3 kroky**  
6. Bento / další card grid (méně kritizované na Redditu než očekáváno)  
7. Testimonials (kulaté fotky)  
8. Pricing — 3 tarify, prostřední „Most popular“  
9. FAQ accordion  
10. Footer — 4 sloupce Product / Company / Resources / Legal  

Další:
- Vše centrované, endless whitespace  
- Stejný `rounded-2xl` + `shadow-md` všude  
- **Colored left/top border** na kartách (Krebs: „skoro jako em-dash u textu“)  
- Stat banner („10K+ users · 99.9% · 4.9★“) — často fake  
- All-caps section labels  
- Sidebar/nav s emoji ikonami  
- Floating dashboard mockup vedle hero  
- Blob SVG za hero @ ~20% opacity  

---

## 6. Komponenty / CSS fingerprints

- Netknuté **shadcn/ui** + Radix `data-radix-*`
- Lucide všude
- `transition-all duration-300 ease-in-out`
- Scroll: jen **fade-in-up** (Framer `whileInView`)
- Icon-in-rounded-square
- Gray 1px border na každé kartě
- Chybí edge cases: empty / loading / error / focus

---

## 7. Copy

elevate, seamless, unlock, empower, effortless, transform, revolutionize, supercharge, cutting-edge, all-in-one, scale without limits, build the future, powered by AI, in just a few clicks…

- Tricolon: „Fast. Simple. Secure.“
- „It’s not just X, it’s Y“
- CTA: Get started / Learn more / Watch demo / Try it free (3+ najednou)
- Em-dashe (—) hustě
- Fake metrics / „Trusted by 10,000+“ při 0 traffic (HN rant)
- Stejný hlas Everywhere; žádná specifická čísla / místa / jména

---

## 8. Obrázky, placeholdery, tech

- Unsplash / stock / plastic AI ilustrace / 3D bloby  
- Lorem, `[Your Company]`, default favicon, „My App“, chybějící OG  
- Builder fingerprints: lovable.app, v0, Bolt, „Made with…“  
- Stejné `lastmod` v sitemap; default Next/Vercel 404  
- Skořápka bez lidských povrchů (About bez jmen, Blog bez dat)

---

## 9. Měřené studie

### Adrian Krebs — Show HN (1590 stránek)
- Heavy (4+ patterns): **22 %**
- Mild (2–3): **32 %**
- Clean (0–1): **46 %**
- Nejčastější: perma dark 34 %, gradients 27 %, icon-card grids 22 %
- Tool: [slopcop.adriankrebs.ch](https://slopcop.adriankrebs.ch) · [GitHub](https://github.com/AdrianKrebs/ai-design-checker)  
- Blog: [adriankrebs.ch/blog/design-slop](https://adriankrebs.ch/blog/design-slop/)  
- HN: [Scoring Show HN…](https://news.ycombinator.com/item?id=47864393) (~333 pts, 235 comments)

### Sailop / Slopdar / Briskly
- ~87 patternů, 21-sign 30s scan, builder fingerprints

---

## 10. Antidota (co komunita radí)

1. Brand-first + specifická typografie (ne Inter/cream-serif default)  
2. Sémantické barvy; hue mimo blue/purple pásma  
3. Reálné fotky produktu/místa/týmu  
4. Copy jako konkrétní člověk  
5. Hierarchie / asymetrie — ne 3 stejně důležité karty  
6. Účelný motion (2–3), ne univerzální fade-in  
7. **DESIGN.md / CLAUDE.md** — smlouva s agentem (tokeny + banlist)  
8. Negativní constraints > „make it modern“  
9. Visual reference (screenshot) místo jen textu  
10. Boldness **na jedné ose**, zbytek tiše (Anthropic rewrite 2026)  
11. Edge cases + lidské stopy (reference, datované aktuality)  

---

## 11. Zdroje podle platforem

### Reddit (data + diskuze)
- [JCarterJohnson/vibecoded-design-tells](https://github.com/JCarterJohnson/vibecoded-design-tells) — 3,2M postů, ranking tells, quote banky s permalinky (`comment_tell_examples.md`)
- Top subs: r/SideProject, r/SaaS, r/vibecoding, r/ClaudeAI, r/webdev, r/indiehackers, r/ChatGPT
- Typická vlákna (názvy v datech): „why do AI sites all look the same“, „dead giveaways for AI slop websites“ (až ~2445 upvotes v archive)
- Citace z Redditu často zmiňované v článcích: „Everything I generate looks like shadcn/ui“ (Cursor/v0 thread)

### Hacker News
- [AI beige slop…](https://news.ycombinator.com/item?id=46956964) — full-bleed gradient, rounded cards, no hierarchy; tip: no centered / purple / Inter
- [Scoring Show HN for AI design patterns](https://news.ycombinator.com/item?id=47864393) — Krebs, 333 pts
- [Color palette gives away AI slop](https://news.ycombinator.com/item?id=48269907) — cream/cobalt/terracotta Claude template
- [Are we in the era of AI slop landing pages?](https://news.ycombinator.com/item?id=49024805) — fake metrics, trust = 0
- [Design with a Soul / vibe-coded not slop](https://news.ycombinator.com/item?id=49287430)
- [Show HN: consistent UI from Claude Code](https://news.ycombinator.com/item?id=46699260)

### Média / longform
- [New Yorker — Kyle Chayka: The A.I.-Design Aesthetic…](https://www.newyorker.com/culture/infinite-scroll/the-ai-design-aesthetic-thats-taking-over-the-internet) — „Claudian sameness“
- [Kyle Chayka Substack](https://kylechayka.substack.com/p/the-generic-style-of-ai-web-design)
- IBTimes shrnutí: [Why AI-built websites look the same](https://www.ibtimes.sg/why-so-many-ai-built-websites-are-starting-look-same-91292)

### X / Twitter / LinkedIn / Threads
- Diskurz kolem „Purple UI Problem“, „VibeCode Purple“, GPT-5 stále defaultuje blue-purple (zmínky v [LinkedIn — Yash Kaku](https://www.linkedin.com/pulse/ai-slop-brand-design-why-every-suddenly-looks-same-2026-yash-kaku-lwwuf))
- [Ken Cheung LinkedIn](https://www.linkedin.com/posts/kenprov356_improving-frontend-design-through-skills-activity-7398621557612404736-H8Fh) — distributional convergence
- Threads (Meta): méně specializovaných „AI web design“ threads než Reddit/HN; slop diskuze spíš o obecném AI obsahu. Hledat: „AI slop“, „Claudian“, „purple gradient website“
- X: search `AI slop website`, `purple gradient Inter`, `vibe coded landing`, `shadcn every site`

### YouTube
- [Developers Digest YouTube](https://www.youtube.com/@developersdigest) — walkthroughy k AI design slop / agent loops (navázáno na jejich blog)
- YouTube také testuje user prompt „Did this feel like AI slop?“ u videí ([PCWorld](https://www.pcworld.com/article/3096317/youtube-wants-you-to-help-spot-ai-slop-videos.html)) — jiný kontext (video), ale termín je mainstream
- Hledat: `AI slop web design`, `why AI websites look the same`, `Claude frontend design skill`, `avoid AI landing page`

### Oficiální / tooling (anti-slop)
- Anthropic [frontend-design skill](https://github.com/anthropics/claude-code/blob/HEAD/plugins/frontend-design/skills/frontend-design/SKILL.md) — explicitně banuje Inter, purple gradients, cookie-cutter
- [Ken Imoto — Anthropic skill rewrite](https://kenimoto.dev/blog/anthropic-frontend-design-skill-rewrite/) — 3 pojmenované klišé + `#F4F1EA`
- [prg.sh — Why Your AI Keeps Building the Same Purple Gradient Website](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- [avoid-ai-design](https://github.com/funboy322/avoid-ai-design) · [unslop-ui skill](https://github.com/JCarterJohnson/vibecoded-design-tells)

### Články / blogy (EN)
- [Sailop: 21 signs](https://sailop.com/blog/detect-ai-generated-site-30-seconds-21-signs-2026) · [AI Slop Encyclopedia](https://sailop.com/blog/ai-slop-encyclopedia) · [Anti-slop prompt](https://sailop.com/blog/anti-slop-prompt-template-2026)
- [Slopdar: 10 signs](https://slopdar.com/guide/how-to-tell-if-a-website-is-ai-generated)
- [uxskill: 9 visible signs](https://uxskill.laithjunaidy.com/how-to-tell-if-a-website-was-ai-generated.html)
- [925studios AI slop guide](https://www.925studios.co/blog/ai-slop-web-design-guide)
- [Developers Digest: 16 patterns](https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it)
- [Rottoways: why AI sites look generic](https://rottoways.com/blog/ai-generated-website-looks-generic)
- [Authon: blame indigo-500](https://blog.authon.dev/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500)
- [Dripatch: Purple UI Problem](https://dripatch.com/purple-ui-problem/)
- [DEV: why AI websites look the same](https://dev.to/gdg/why-ai-websites-all-look-the-same-and-how-to-build-something-different-1gan)
- [Hey/Kostac: Spot the Slop](https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c)
- [VibeCodeKit AI slop design](https://vibecodekit.dev/ai-slop-design)
- [DESIGN.md contract](https://www.developersdigest.tech/blog/design-md-for-ai-agents)
- [The Adpharm: Claude Design without slop](https://www.theadpharm.com/insights/claude-design-without-the-ai-slop-look)

### Články (CZ)
- [Sonet Studio: Jsou weby postavené s AI dobré?](https://www.sonetstudio.cz/jsou-weby-postavene-s-ai-dobre/)
- [Greguš: Budou všechny weby vypadat stejně?](https://gregus.cz/budou-vsechny-weby-brzy-vypadat-stejne-diky-ai-mozna-ano/)
- [Barbora Růžičková: Web navržený AI 2026](https://barboraruzickova.com/cs/web-navrzeny-ai-v-roce-2026/)

### Detektory / scorery
- [Adrian Krebs AI Design Checker](https://github.com/AdrianKrebs/ai-design-checker) / [slopcop](https://slopcop.adriankrebs.ch)
- [VibeCheck](https://github.com/ashish-jabble/vibe-check)
- [is-this-ai-slop](https://github.com/davidcjw/is-this-ai-slop)
- [Briskly AI Slop Detector](https://briskly.tools/tools/ai-slop-detector)
- [Slopdar](https://slopdar.com)

---

## 12. Rychlý 30s scan

1. Barva mezi Tailwind blue-500 a purple-500? *(nebo cream `#F4F1EA` + terracotta?)*  
2. Inter/Geist/Space Grotesk bez druhé rodiny?  
3. Hero = H1 + odstavec + filled + ghost CTA (+ pill badge)?  
4. 3 karty / 3 pricing / colored left border?  
5. Footer Product/Company/Resources/Legal?  

0–1 spíš lidské · 2–3 assisted · 4–5 silný fingerprint.

**Fingerprint = absence směru, ne přítomnost nástroje.**

---

*Context pro kontrolu designu. Aktualizovat při posunu defaultů generatorů (purple → cream → další).*
