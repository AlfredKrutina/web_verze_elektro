(() => {
  const root = document.body.dataset.root || ".";

  // Web je česky — vypnout automatický překlad prohlížeče (plovoucí Czech/English lišta)
  document.documentElement.setAttribute("translate", "no");
  document.documentElement.classList.add("notranslate");

  function logo(height = 44) {
    const w = Math.round((height * 1100) / 484);
    return `<img src="${root}/assets/media/logo_nove.png" width="${w}" height="${height}" alt="ELEKTRO EURON spol. s r.o." />`;
  }

  function headerHtml(active) {
    const item = (href, label, key) =>
      `<li><a href="${root}${href}"${active === key ? ' aria-current="page"' : ""}>${label}</a></li>`;

    return `
      <a class="skip-link" href="#main">Přejít k obsahu</a>
      <header class="site-header">
        <div class="container nav" data-nav>
          <a class="brand" href="${root === "." ? "index.html" : root + "/index.html"}">
            ${logo(44)}
          </a>
          <ul class="nav-links" id="site-nav">
            ${item("/sluzby/", "Služby", "sluzby")}
            ${item("/obchod/", "Obchod", "obchod")}
            ${item("/reference/", "Realizace", "reference")}
            ${item("/aktuality/", "Aktuality", "aktuality")}
            ${item("/o-nas/", "O nás", "onas")}
            ${item("/kontakt/", "Kontakty", "kontakt")}
          </ul>
          <div class="nav-actions">
            <button class="theme-toggle" type="button" data-theme-toggle aria-label="Přepnout světlý a tmavý režim">
              <span class="theme-icon icon-sun" aria-hidden="true"></span>
              <span class="theme-icon icon-moon" aria-hidden="true"></span>
            </button>
            <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
            <a class="nav-phone" href="tel:+420354437476">+420 354 437 476</a>
          </div>
        </div>
      </header>
    `;
  }

  function footerHtml() {
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-company">
            <h2>Elektro Euron spol. s r.o.</h2>
            <p class="footer-address">Zelená 1844/6, 350 02 Cheb<br />
            IČO 49192876 · DIČ CZ49192876<br />
            Datová schránka: c3t3kpd</p>
            <ul class="footer-contact">
              <li><a href="tel:+420354437476">+420 354 437 476</a></li>
              <li><a href="mailto:info@elektro-euron.cz">info@elektro-euron.cz</a></li>
              <li>Objednávky: <a href="mailto:objednavky@elektro-euron.cz">objednavky@elektro-euron.cz</a></li>
              <li>Fakturace: <a href="mailto:fakturace@elektro-euron.cz">fakturace@elektro-euron.cz</a></li>
            </ul>
          </div>
          <div>
            <h3>Navigace</h3>
            <ul>
              <li><a href="${root}/sluzby/">Služby</a></li>
              <li><a href="${root}/obchod/">Obchod</a></li>
              <li><a href="${root}/reference/">Realizace</a></li>
              <li><a href="${root}/aktuality/">Aktuality</a></li>
              <li><a href="${root}/o-nas/">O nás</a></li>
              <li><a href="${root}/kontakt/">Kontakty</a></li>
            </ul>
          </div>
          <div>
            <h3>Co děláme</h3>
            <ul>
              <li><a href="${root}/sluzby/nizke-napeti/">Nízké napětí</a></li>
              <li><a href="${root}/sluzby/vysoke-napeti/">Vysoké napětí</a></li>
              <li><a href="${root}/sluzby/fve/">Fotovoltaika</a></li>
              <li><a href="${root}/sluzby/rozvadece/">Rozvaděče</a></li>
              <li><a href="${root}/sluzby/slaboproud/">Slaboproud</a></li>
              <li><a href="${root}/sluzby/revize/">Revize a projekce</a></li>
            </ul>
          </div>
          <div>
            <h3>Prodejna Cheb</h3>
            <ul>
              <li>Zelená 1844/6, Cheb</li>
              <li>po–pá 7:00–17:00</li>
              <li>so 8:00–12:00</li>
              <li><a href="${root}/obchod/">Sortiment a značky</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-claim">
          <div class="container footer-claim-inner">
            <p>Elektrika <span class="hl">od jističe po trafostanici</span></p>
            <a class="btn btn-primary" href="${root}/kontakt/">Poptat montáž</a>
          </div>
        </div>
        <div class="footer-bar">
          <div class="container footer-meta">
            © ${new Date().getFullYear()} Elektro Euron spol. s r.o. · Elektromontáže, projekce a prodej materiálu od roku 1993
          </div>
        </div>
      </footer>
    `;
  }

  const mountHeader = document.querySelector("[data-header]");
  const mountFooter = document.querySelector("[data-footer]");
  if (mountHeader) {
    mountHeader.outerHTML = headerHtml(document.body.dataset.page || "");
  }
  if (mountFooter) {
    mountFooter.outerHTML = footerHtml();
  }

  const THEME_KEY = "ee-theme";

  function resolveTheme(stored) {
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    const btn = document.querySelector("[data-theme-toggle]");
    if (btn) {
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Přepnout na světlý režim" : "Přepnout na tmavý režim"
      );
    }
  }

  applyTheme(resolveTheme(localStorage.getItem(THEME_KEY)));

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next =
        document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (localStorage.getItem(THEME_KEY) === "light" || localStorage.getItem(THEME_KEY) === "dark") {
      return;
    }
    applyTheme(resolveTheme(null));
  });

  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      if (document.body.classList.contains("nav-locked")) return;
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector(".nav-toggle");
  if (nav && toggle) {
    let lockScrollY = 0;

    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Zavřít menu" : "Menu");

      if (open) {
        lockScrollY = window.scrollY || window.pageYOffset || 0;
        document.body.style.top = `-${lockScrollY}px`;
        document.body.classList.add("nav-locked");
        if (header) header.classList.add("is-scrolled");
      } else {
        document.body.classList.remove("nav-locked");
        document.body.style.top = "";
        window.scrollTo(0, lockScrollY);
      }
    };

    toggle.addEventListener("click", () => {
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 981px)").matches) setOpen(false);
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealNow(el, instant) {
    if (!el || el.classList.contains("is-visible")) return;
    if (instant) el.classList.add("is-instant");
    el.classList.add("is-visible");
  }

  function revealAllPending(instant) {
    reveals.forEach((el) => {
      if (!el.classList.contains("is-visible")) revealNow(el, instant);
    });
  }

  function prepareStagger(rootEl) {
    const children = rootEl.querySelectorAll("[data-stagger], .reveal-child");
    children.forEach((child, i) => {
      if (!child.style.getPropertyValue("--reveal-delay")) {
        child.style.setProperty("--reveal-delay", `${Math.min(i * 70, 420)}ms`);
      }
      child.classList.add("reveal-child");
    });
  }

  reveals.forEach((el) => {
    prepareStagger(el);
    if (el.dataset.delay) {
      el.style.setProperty("--reveal-delay", el.dataset.delay);
    }
  });

  if (reduceMotion) {
    revealAllPending(true);
  } else if (reveals.length && "IntersectionObserver" in window) {
    let lastY = window.scrollY;
    let lastT = performance.now();
    let fast = false;
    let fastTimer = 0;

    const setFast = (on) => {
      fast = on;
      document.documentElement.classList.toggle("scroll-fast", on);
    };

    window.addEventListener(
      "scroll",
      () => {
        const now = performance.now();
        const y = window.scrollY;
        const dt = Math.max(now - lastT, 1);
        const speed = Math.abs(y - lastY) / dt; // px/ms
        lastY = y;
        lastT = now;

        if (speed > 1.8) {
          setFast(true);
          // Flush anything already near/above viewport so searchers aren't blocked
          const flushLine = y + window.innerHeight * 1.15;
          reveals.forEach((el) => {
            if (el.classList.contains("is-visible")) return;
            const top = el.getBoundingClientRect().top + y;
            if (top < flushLine) revealNow(el, true);
          });
          window.clearTimeout(fastTimer);
          fastTimer = window.setTimeout(() => setFast(false), 140);
        }
      },
      { passive: true }
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          revealNow(e.target, fast);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    reveals.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Already on screen at load → show without waiting
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        revealNow(el, true);
      } else {
        io.observe(el);
      }
    });
  } else {
    revealAllPending(true);
  }

  // Lightbox pro dokumenty (certifikáty). Bez JS odkaz otevře obrázek napřímo.
  const lightboxLinks = document.querySelectorAll("a[data-lightbox]");
  if (lightboxLinks.length && typeof HTMLDialogElement === "function") {
    const dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.setAttribute("aria-labelledby", "lightbox-caption");
    dlg.innerHTML = `
      <div class="lightbox-frame">
        <div class="lightbox-bar">
          <p class="lightbox-caption" id="lightbox-caption"></p>
          <a class="lightbox-open" href="#" target="_blank" rel="noopener">Otevřít v novém okně</a>
          <button type="button" class="lightbox-close" aria-label="Zavřít">&times;</button>
        </div>
        <img alt="" />
      </div>`;
    document.body.appendChild(dlg);

    const img = dlg.querySelector("img");
    const caption = dlg.querySelector(".lightbox-caption");
    const openNew = dlg.querySelector(".lightbox-open");
    const closeBtn = dlg.querySelector(".lightbox-close");
    let opener = null;

    const close = () => {
      if (dlg.open) dlg.close();
    };

    closeBtn.addEventListener("click", close);
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) close(); // klik na backdrop
    });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    });
    dlg.addEventListener("close", () => {
      img.removeAttribute("src");
      dlg.classList.remove("is-loading");
      if (opener) opener.focus();
    });
    img.addEventListener("load", () => dlg.classList.remove("is-loading"));
    img.addEventListener("error", () => {
      dlg.classList.remove("is-loading");
      caption.textContent = "Dokument se nepodařilo načíst — zkuste jej otevřít v novém okně.";
    });

    lightboxLinks.forEach((a) => {
      a.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        opener = a;
        const thumb = a.querySelector("img");
        caption.textContent = a.dataset.caption || (thumb && thumb.alt) || "";
        img.alt = (thumb && thumb.alt) || "";
        openNew.href = a.href;
        dlg.classList.add("is-loading");
        img.src = a.href;
        dlg.showModal();
        closeBtn.focus();
      });
    });
  }

  const form = document.querySelector("[data-inquiry-form]");
  if (form) {
    const params = new URLSearchParams(window.location.search);
    const typParam = params.get("typ");
    const typSelect = form.querySelector('[name="typ"]');
    if (typParam && typSelect) {
      const match = Array.from(typSelect.options).find(
        (o) => o.value.toLowerCase() === typParam.toLowerCase()
      );
      if (match) typSelect.value = match.value;
    }

    const field = (name) => form.querySelector(`[name="${name}"]`);
    const errorEl = (name) => form.querySelector(`#${name}-error`);

    function setError(name, message) {
      const input = field(name);
      const err = errorEl(name);
      if (!input) return;
      const invalid = Boolean(message);
      input.classList.toggle("is-invalid", invalid);
      input.setAttribute("aria-invalid", invalid ? "true" : "false");
      if (err) {
        err.hidden = !invalid;
        err.textContent = message || "";
      }
    }

    function clearError(name) {
      setError(name, "");
    }

    function digitsOnly(value) {
      return String(value || "").replace(/\D/g, "");
    }

    function sanitizePhone(raw) {
      let out = "";
      const s = String(raw || "");
      for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (/\d/.test(ch)) out += ch;
        else if (ch === "+" && out.length === 0) out += "+";
        else if (/[\s\-()/]/.test(ch) && out.length > 0) {
          const last = out[out.length - 1];
          if (!/[\s\-()/]/.test(last)) out += ch === "(" || ch === ")" ? ch : ch === "/" ? " " : ch;
        }
      }
      return out.slice(0, 20);
    }

    function isValidPhone(value) {
      const digits = digitsOnly(value);
      if (digits.length < 9) return false;
      if (digits.length > 15) return false;
      // CZ / SK common: 9 digits local, or 420/421 + 9
      if (/^(420|421)\d{9}$/.test(digits)) return true;
      if (/^\d{9}$/.test(digits)) return true;
      if (digits.length >= 9 && digits.length <= 15) return true;
      return false;
    }

    function isValidEmail(value) {
      const v = String(value || "").trim();
      if (!v) return true; // optional
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
    }

    const telefonInput = field("telefon");
    if (telefonInput) {
      telefonInput.addEventListener("beforeinput", (ev) => {
        if (ev.inputType && ev.inputType.startsWith("delete")) return;
        if (ev.inputType === "insertFromPaste") return;
        const data = ev.data;
        if (data == null) return;
        if (!/^[0-9+\s\-()/]+$/.test(data)) ev.preventDefault();
        if (data.includes("+") && (telefonInput.selectionStart > 0 || telefonInput.value.includes("+"))) {
          ev.preventDefault();
        }
      });

      telefonInput.addEventListener("input", () => {
        const cleaned = sanitizePhone(telefonInput.value);
        if (cleaned !== telefonInput.value) telefonInput.value = cleaned;
        if (telefonInput.value.trim()) {
          setError("telefon", isValidPhone(telefonInput.value) ? "" : "Zadejte platné telefonní číslo (např. +420 123 456 789).");
        } else {
          clearError("telefon");
        }
      });

      telefonInput.addEventListener("paste", (ev) => {
        ev.preventDefault();
        const text = (ev.clipboardData || window.clipboardData).getData("text");
        const start = telefonInput.selectionStart ?? telefonInput.value.length;
        const end = telefonInput.selectionEnd ?? telefonInput.value.length;
        const next = sanitizePhone(
          telefonInput.value.slice(0, start) + text + telefonInput.value.slice(end)
        );
        telefonInput.value = next;
        telefonInput.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }

    const emailInput = field("email");
    if (emailInput) {
      emailInput.addEventListener("input", () => {
        const v = emailInput.value.trim();
        if (!v) clearError("email");
        else setError("email", isValidEmail(v) ? "" : "Zadejte platný e-mail (např. jmeno@firma.cz).");
      });
      emailInput.addEventListener("blur", () => {
        emailInput.value = emailInput.value.trim();
        emailInput.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }

    const jmenoInput = field("jmeno");
    if (jmenoInput) {
      jmenoInput.addEventListener("blur", () => {
        const v = jmenoInput.value.trim();
        jmenoInput.value = v;
        if (!v) setError("jmeno", "Vyplňte jméno nebo firmu.");
        else if (v.length < 2) setError("jmeno", "Jméno je příliš krátké.");
        else clearError("jmeno");
      });
      jmenoInput.addEventListener("input", () => {
        if (jmenoInput.classList.contains("is-invalid") && jmenoInput.value.trim().length >= 2) {
          clearError("jmeno");
        }
      });
    }

    const zpravaInput = field("zprava");
    if (zpravaInput) {
      zpravaInput.addEventListener("blur", () => {
        const v = zpravaInput.value.trim();
        if (!v) setError("zprava", "Napište stručnou zprávu k poptávce.");
        else if (v.length < 10) setError("zprava", "Zpráva je příliš krátká (min. 10 znaků).");
        else clearError("zprava");
      });
      zpravaInput.addEventListener("input", () => {
        if (zpravaInput.classList.contains("is-invalid") && zpravaInput.value.trim().length >= 10) {
          clearError("zprava");
        }
      });
    }

    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const typ = (field("typ")?.value || "").trim();
      const jmeno = (field("jmeno")?.value || "").trim();
      const telefon = (field("telefon")?.value || "").trim();
      const email = (field("email")?.value || "").trim();
      const lokalita = (field("lokalita")?.value || "").trim();
      const zprava = (field("zprava")?.value || "").trim();

      let ok = true;
      if (!jmeno || jmeno.length < 2) {
        setError("jmeno", !jmeno ? "Vyplňte jméno nebo firmu." : "Jméno je příliš krátké.");
        ok = false;
      } else clearError("jmeno");

      if (!telefon) {
        setError("telefon", "Vyplňte telefonní číslo.");
        ok = false;
      } else if (!isValidPhone(telefon)) {
        setError("telefon", "Zadejte platné telefonní číslo (např. +420 123 456 789).");
        ok = false;
      } else clearError("telefon");

      if (!isValidEmail(email)) {
        setError("email", "Zadejte platný e-mail (např. jmeno@firma.cz).");
        ok = false;
      } else clearError("email");

      if (!zprava) {
        setError("zprava", "Napište stručnou zprávu k poptávce.");
        ok = false;
      } else if (zprava.length < 10) {
        setError("zprava", "Zpráva je příliš krátká (min. 10 znaků).");
        ok = false;
      } else clearError("zprava");

      if (!ok) {
        const firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (field("jmeno")) field("jmeno").value = jmeno;
      if (field("telefon")) field("telefon").value = telefon;
      if (field("email")) field("email").value = email;
      if (field("lokalita")) field("lokalita").value = lokalita;
      if (field("zprava")) field("zprava").value = zprava;

      const body = [
        `Typ poptávky: ${typ}`,
        `Jméno: ${jmeno}`,
        `Telefon: ${telefon}`,
        `E-mail: ${email}`,
        `Lokalita: ${lokalita}`,
        "",
        zprava,
      ].join("\n");

      const mailto = `mailto:info@elektro-euron.cz?subject=${encodeURIComponent(
        "Poptávka z webu — " + typ
      )}&body=${encodeURIComponent(body)}`;

      const success =
        form.parentElement?.querySelector(".form-success") ||
        form.querySelector(".form-success");
      if (success) {
        success.hidden = false;
        success.classList.add("is-visible");
        success.textContent = "Otevíráme e-mailovou aplikaci…";
      }
      window.location.href = mailto;
    });
  }

  /* ===== Karusel =====
     Posun dělá nativní scroll (scroll-snap), takže bez JS zůstane vodorovný
     scroller plně použitelný. JS jen dokresluje šipky, tečky, hlášení pro
     čtečky a označení středového slidu. */
  function setupCarousel(root) {
    const viewport = root.querySelector(".carousel-viewport");
    const track = root.querySelector(".carousel-track");
    if (!viewport || !track) return;

    const real = Array.from(track.querySelectorAll(".cslide"));
    if (real.length < 2) return;

    const label = root.dataset.carouselLabel || "Galerie";
    const smooth = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

    /* Nekonečné rolování: před a za skutečné slidy se vloží jejich kopie, takže
       po stranách nikdy nezůstane prázdné místo. Když se scroll zastaví
       v oblasti kopií, posuneme ho o šířku jedné sady — obsah je totožný,
       takže je skok neviditelný. Kopie jsou pro čtečky i tabulátor skryté. */
    const n = real.length;
    const loop = n >= 3;

    function cloneSet() {
      const frag = document.createDocumentFragment();
      real.forEach((slide) => {
        const copy = slide.cloneNode(true);
        copy.setAttribute("aria-hidden", "true");
        copy.dataset.clone = "true";
        copy.querySelectorAll("a").forEach((a) => a.setAttribute("tabindex", "-1"));
        frag.appendChild(copy);
      });
      return frag;
    }

    if (loop) {
      track.appendChild(cloneSet());
      track.insertBefore(cloneSet(), track.firstChild);
    }

    const slides = Array.from(track.querySelectorAll(".cslide"));
    const offset = loop ? n : 0;

    viewport.setAttribute("role", "group");
    viewport.setAttribute("aria-roledescription", "karusel");
    viewport.setAttribute("aria-label", label);
    viewport.setAttribute("tabindex", "0");

    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "carousel-nav carousel-prev";
    prev.setAttribute("aria-label", "Předchozí");
    prev.innerHTML = "<span aria-hidden='true'></span>";

    const next = document.createElement("button");
    next.type = "button";
    next.className = "carousel-nav carousel-next";
    next.setAttribute("aria-label", "Další");
    next.innerHTML = "<span aria-hidden='true'></span>";

    const dots = document.createElement("div");
    dots.className = "carousel-dots";

    const status = document.createElement("p");
    status.className = "sr-only";
    status.setAttribute("aria-live", "polite");

    const dotButtons = real.map((slide, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      const title = slide.querySelector(".cslide__title");
      dot.setAttribute("aria-label", title ? title.textContent.trim() : `Položka ${i + 1} z ${n}`);
      dot.addEventListener("click", () => goToDom(offset + i));
      dots.appendChild(dot);
      return dot;
    });

    root.append(prev, next, dots, status);

    let dom = offset;

    function centerOffset(slide) {
      return Math.max(
        0,
        Math.min(
          slide.offsetLeft - (viewport.clientWidth - slide.offsetWidth) / 2,
          viewport.scrollWidth - viewport.clientWidth
        )
      );
    }

    function goToDom(i) {
      const target = Math.max(0, Math.min(i, slides.length - 1));
      viewport.scrollTo({ left: centerOffset(slides[target]), behavior: smooth });
    }

    function nearestIndex() {
      const center = viewport.scrollLeft + viewport.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      slides.forEach((slide, i) => {
        const dist = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return best;
    }

    // aria-current se u neaktivních teček odebírá (ne nastavuje na "false"),
    // aby čtečky nehlásily jako aktuální všechny položky
    function markDots(i) {
      dotButtons.forEach((dot, k) => {
        if (k === i) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }

    function sync() {
      const i = nearestIndex();
      if (i === dom) return;
      dom = i;
      const realIndex = ((i - offset) % n + n) % n;
      slides.forEach((slide, k) => slide.classList.toggle("is-active", k === i));
      markDots(realIndex);
      status.textContent = `Položka ${realIndex + 1} z ${n}`;
    }

    // Posun z oblasti kopií zpět do skutečné sady — až po zastavení scrollu
    function rewind() {
      if (!loop) return;
      const setWidth = slides[2 * n].offsetLeft - slides[n].offsetLeft;
      if (!setWidth) return;
      if (dom < n) {
        viewport.scrollLeft += setWidth;
      } else if (dom >= 2 * n) {
        viewport.scrollLeft -= setWidth;
      }
      dom = nearestIndex();
      slides.forEach((slide, k) => slide.classList.toggle("is-active", k === dom));
    }

    slides[dom].classList.add("is-active");
    markDots(0);
    status.textContent = `Položka 1 z ${n}`;

    let raf = 0;
    let settle = 0;
    viewport.addEventListener(
      "scroll",
      () => {
        if (!raf) {
          raf = requestAnimationFrame(() => {
            raf = 0;
            sync();
          });
        }
        window.clearTimeout(settle);
        settle = window.setTimeout(rewind, 160);
      },
      { passive: true }
    );

    prev.addEventListener("click", () => goToDom(dom - 1));
    next.addEventListener("click", () => goToDom(dom + 1));

    viewport.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToDom(dom + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToDom(dom - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToDom(offset);
      } else if (e.key === "End") {
        e.preventDefault();
        goToDom(offset + n - 1);
      }
    });

    // Změna šířky okna mění šířku slidů — dorovnat středování
    if ("ResizeObserver" in window) {
      let first = true;
      new ResizeObserver(() => {
        if (first) {
          first = false;
          return;
        }
        viewport.scrollTo({ left: centerOffset(slides[dom]), behavior: "auto" });
      }).observe(viewport);
    }

    // Start na první skutečné položce (mezi kopiemi)
    viewport.scrollTo({ left: centerOffset(slides[dom]), behavior: "auto" });

    root.setAttribute("data-carousel-ready", "");
  }

  document.querySelectorAll("[data-carousel]").forEach(setupCarousel);
})();
