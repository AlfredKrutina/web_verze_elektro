(() => {
  const root = document.body.dataset.root || ".";

  function logo(height = 44) {
    const w = Math.round((height * 261) / 95);
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
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
          <ul class="nav-links" id="site-nav">
            ${item("/sluzby/", "Služby", "sluzby")}
            ${item("/obchod/", "Obchod", "obchod")}
            ${item("/reference/", "Reference", "reference")}
            ${item("/aktuality/", "Aktuality", "aktuality")}
            ${item("/o-nas/", "O nás", "onas")}
            ${item("/kontakt/", "Kontakty", "kontakt")}
          </ul>
          <a class="nav-phone" href="tel:+420354437476">+420 354 437 476</a>
        </div>
      </header>
    `;
  }

  function footerHtml() {
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <h2>ELEKTRO EURON spol. s r.o.</h2>
            <p>Zelená 1844/6, 350 02 Cheb<br />
            IČO 49192876 · DIČ CZ49192876<br />
            Datová schránka: c3t3kpd</p>
            <p>
              <a href="mailto:info@elektro-euron.cz">info@elektro-euron.cz</a><br />
              Fakturace: <a href="mailto:fakturace@elektro-euron.cz">fakturace@elektro-euron.cz</a>
            </p>
          </div>
          <div>
            <h3>Navigace</h3>
            <ul>
              <li><a href="${root}/sluzby/">Služby</a></li>
              <li><a href="${root}/obchod/">Obchod</a></li>
              <li><a href="${root}/reference/">Reference</a></li>
              <li><a href="${root}/aktuality/">Aktuality</a></li>
              <li><a href="${root}/o-nas/">O nás</a></li>
              <li><a href="${root}/kontakt/">Kontakty</a></li>
            </ul>
          </div>
          <div>
            <h3>Prodejny</h3>
            <ul>
              <li>Cheb · po–pá 7:00–17:00 · so 8:00–12:00</li>
              <li>Aš · po, st–pá 8:00–16:00 · út do 14:30</li>
              <li><a href="tel:+420354437476">Cheb +420 354 437 476</a></li>
              <li><a href="tel:+420354525284">Aš +420 354 525 284</a></li>
            </ul>
          </div>
        </div>
        <div class="container footer-meta">
          © ${new Date().getFullYear()} Elektro Euron spol. s r.o. · Elektromontáže, projekce a prodej materiálu od 1993
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

  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector(".nav-toggle");
  if (nav && toggle) {
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-locked", open);
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

  reveals.forEach((el, i) => {
    prepareStagger(el);
    if (!el.style.getPropertyValue("--reveal-delay") && el.dataset.delay == null) {
      // light cascade between adjacent section reveals
      el.style.setProperty("--reveal-delay", `${Math.min((i % 3) * 60, 180)}ms`);
    }
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
})();
