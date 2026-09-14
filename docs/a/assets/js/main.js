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
    const maps =
      "https://www.google.com/maps/place/Elektro+Euron+spol.+s.r.o./@50.0843032,12.3693536,17z/data=!4m6!3m5!1s0x47a0f6a338801ae7:0xe449dc1f2c91838e!8m2!3d50.0843032!4d12.3693536!16s%2Fg%2F1tftq2g3";
    return `
      <footer class="site-footer">
        <div class="footer-place">
          <div class="container footer-place-inner">
            <div class="footer-map">
              <iframe
                title="Sídlo Elektro Euron na mapě — Zelená 1844/6, Cheb"
                src="https://www.openstreetmap.org/export/embed.html?bbox=12.3648%2C50.0818%2C12.3738%2C50.0868&amp;layer=mapnik&amp;marker=50.0843032%2C12.3693536"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div class="footer-place-copy">
              <h2>Sídlo a prodejna Cheb</h2>
              <address>
                Zelená 1844/6, 350 02 Cheb
              </address>
              <div data-hours="compact" data-hours-theme="dark"></div>
              <p><a href="tel:+420354437476">+420 354 437 476</a></p>
              <div class="btn-group">
                <a class="btn btn-primary" href="${maps}" target="_blank" rel="noopener">Navigovat</a>
                <a class="btn btn-ghost" href="${root}/kontakt/">Poptat montáž</a>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bar">
          <div class="container footer-bar-inner">
            <p class="footer-meta">© ${new Date().getFullYear()} Elektro Euron spol. s r.o. · IČO 49192876 · Cheb</p>
            <nav aria-label="Patička">
              <ul class="footer-nav">
                <li><a href="${root}/sluzby/">Služby</a></li>
                <li><a href="${root}/obchod/">Obchod</a></li>
                <li><a href="${root}/reference/">Realizace</a></li>
                <li><a href="${root}/aktuality/">Aktuality</a></li>
                <li><a href="${root}/o-nas/">O nás</a></li>
                <li><a href="${root}/kontakt/">Kontakty</a></li>
              </ul>
            </nav>
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

  const HOURS_FALLBACK = {
    source:
      "https://www.google.com/maps/place/Elektro+Euron+spol.+s.r.o./@50.0843032,12.3693536,17z",
    timezone: "Europe/Prague",
    status: "operational",
    statusNote: "",
    holidaysClosed: true,
    weekly: {
      1: [{ open: "07:00", close: "17:00" }],
      2: [{ open: "07:00", close: "17:00" }],
      3: [{ open: "07:00", close: "17:00" }],
      4: [{ open: "07:00", close: "17:00" }],
      5: [{ open: "07:00", close: "17:00" }],
      6: [{ open: "08:00", close: "12:00" }],
      0: [],
    },
    exceptions: [],
  };

  const DAY_NAMES = ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"];
  const DAY_SHORT = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function parseHm(hm) {
    const [h, m] = hm.split(":").map(Number);
    return h * 60 + m;
  }

  function formatHm(hm) {
    const [h, m] = hm.split(":");
    return `${Number(h)}:${m}`;
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
    );
  }

  function easterSundayIso(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return `${year}-${pad2(month)}-${pad2(day)}`;
  }

  function czechHoliday(iso) {
    const [y, mo, d] = iso.split("-").map(Number);
    const md = `${pad2(mo)}-${pad2(d)}`;
    const names = {
      "01-01": "Nový rok",
      "05-01": "Svátek práce",
      "05-08": "Den vítězství",
      "07-05": "Den slovanských věrozvěstů Cyrila a Metoděje",
      "07-06": "Den upálení mistra Jana Husa",
      "09-28": "Den české státnosti",
      "10-28": "Den vzniku samostatného československého státu",
      "11-17": "Den boje za svobodu a demokracii",
      "12-24": "Štědrý den",
      "12-25": "1. svátek vánoční",
      "12-26": "2. svátek vánoční",
    };
    if (names[md]) return names[md];
    const easter = easterSundayIso(y);
    if (iso === addDaysIso(easter, -2)) return "Velký pátek";
    if (iso === addDaysIso(easter, 1)) return "Velikonoční pondělí";
    return "";
  }

  function pragueParts(date) {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Prague",
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(date);
    const get = (t) => parts.find((p) => p.type === t).value;
    const wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[get("weekday")];
    return {
      weekday: wd,
      iso: `${get("year")}-${get("month")}-${get("day")}`,
      minutes: Number(get("hour")) * 60 + Number(get("minute")),
    };
  }

  function addDaysIso(iso, days) {
    const [y, m, d] = iso.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d + days));
    return `${dt.getUTCFullYear()}-${pad2(dt.getUTCMonth() + 1)}-${pad2(dt.getUTCDate())}`;
  }

  function weekdayFromIso(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  }

  function periodsFor(cfg, iso) {
    const exception = (cfg.exceptions || []).find((x) => x.date === iso);
    if (exception) {
      if (exception.closed) return { periods: [], note: exception.note || "mimořádně zavřeno", exception: true };
      return { periods: exception.periods || [], note: exception.note || "", exception: true };
    }
    if (cfg.holidaysClosed) {
      const holiday = czechHoliday(iso);
      if (holiday) return { periods: [], note: holiday, holiday: true };
    }
    const wd = weekdayFromIso(iso);
    return { periods: cfg.weekly[String(wd)] || cfg.weekly[wd] || [], note: "", holiday: false };
  }

  function isOpenNow(periods, minutes) {
    return periods.some((p) => minutes >= parseHm(p.open) && minutes < parseHm(p.close));
  }

  function untilClose(periods, minutes) {
    const cur = periods.find((p) => minutes >= parseHm(p.open) && minutes < parseHm(p.close));
    return cur ? formatHm(cur.close) : "";
  }

  function nextOpen(cfg, fromIso, fromMinutes) {
    for (let i = 0; i < 21; i += 1) {
      const iso = addDaysIso(fromIso, i);
      const { periods } = periodsFor(cfg, iso);
      if (!periods.length) continue;
      if (i === 0) {
        const later = periods.find((p) => parseHm(p.open) > fromMinutes);
        if (later) return { iso, weekday: weekdayFromIso(iso), time: later.open, today: true };
        continue;
      }
      return { iso, weekday: weekdayFromIso(iso), time: periods[0].open, today: false };
    }
    return null;
  }

  function nextOpenLabel(next, todayIso) {
    if (!next) return "";
    const when = `v ${formatHm(next.time)}`;
    if (next.today) return `Otevřeme dnes ${when}`;
    if (next.iso === addDaysIso(todayIso, 1)) return `Otevřeme zítra ${when}`;
    return `Otevřeme v ${DAY_NAMES[next.weekday]} ${when}`;
  }

  function hoursState(cfg, now = new Date()) {
    const t = pragueParts(now);
    if (cfg.status === "closed" || cfg.status === "closed_temporarily") {
      return {
        open: false,
        label: "Dočasně zavřeno",
        detail: cfg.statusNote || "Prodejna je teď mimo provoz.",
        t,
        shutdown: true,
      };
    }
    if (cfg.status === "closed_permanently") {
      return { open: false, label: "Trvale zavřeno", detail: cfg.statusNote || "", t, shutdown: true };
    }
    const today = periodsFor(cfg, t.iso);
    if (isOpenNow(today.periods, t.minutes)) {
      return {
        open: true,
        label: `Otevřeno do ${untilClose(today.periods, t.minutes)}`,
        detail: today.note,
        t,
      };
    }
    const next = nextOpen(cfg, t.iso, t.minutes);
    const detail = [today.note, nextOpenLabel(next, t.iso)].filter(Boolean).join(" · ");
    return {
      open: false,
      label: "Zavřeno",
      detail,
      t,
    };
  }

  function formatPeriods(periods) {
    if (!periods || !periods.length) return "zavřeno";
    return periods.map((p) => `${formatHm(p.open)}–${formatHm(p.close)}`).join(", ");
  }

  function weekline(cfg) {
    const days = [1, 2, 3, 4, 5, 6, 0].map((wd) => ({
      wd,
      text: formatPeriods(cfg.weekly[String(wd)] || cfg.weekly[wd] || []),
    }));
    const groups = [];
    days.forEach((day) => {
      const last = groups[groups.length - 1];
      if (last && last.text === day.text && day.wd !== 0 && last.end === day.wd - 1) {
        last.end = day.wd;
        return;
      }
      groups.push({ start: day.wd, end: day.wd, text: day.text });
    });
    return groups
      .map((group) => {
        const name =
          group.start === group.end
            ? DAY_SHORT[group.start]
            : `${DAY_SHORT[group.start]}–${DAY_SHORT[group.end].toLocaleLowerCase("cs")}`;
        return `${name} ${group.text}`;
      })
      .join(" · ");
  }

  function weekRows(cfg, todayIso) {
    const start = weekdayFromIso(todayIso) === 1 ? todayIso : (() => {
      const wd = weekdayFromIso(todayIso);
      const back = wd === 0 ? 6 : wd - 1;
      return addDaysIso(todayIso, -back);
    })();
    return [0, 1, 2, 3, 4, 5, 6].map((_, i) => {
      const iso = addDaysIso(start, i);
      const info = periodsFor(cfg, iso);
      const hours = info.periods.length ? formatPeriods(info.periods) : "Zavřeno";
      return {
        iso,
        weekday: weekdayFromIso(iso),
        hours,
        note: info.note,
        today: iso === todayIso,
      };
    });
  }

  function renderHours(el, cfg) {
    const variant = el.getAttribute("data-hours") || "compact";
    const theme = el.getAttribute("data-hours-theme") || "light";
    const state = hoursState(cfg);
    const rows = weekRows(cfg, state.t.iso);
    const statusClass = state.open ? "is-open" : "is-closed";
    const week = state.shutdown
      ? ""
      : variant === "panel"
        ? `<table class="hours-week">
            <caption class="sr-only">Otevírací doba prodejny v Chebu</caption>
            <tbody>
              ${rows
                .map(
                  (r) => `<tr${r.today ? ' class="is-today"' : ""}>
                    <th scope="row">${DAY_SHORT[r.weekday]}</th>
                    <td>${esc(r.hours)}${r.note ? ` · ${esc(r.note)}` : ""}</td>
                  </tr>`
                )
                .join("")}
            </tbody>
          </table>`
        : `<p class="hours-weekline">${esc(weekline(cfg))}</p>`;

    el.className = `hours-box hours-box--${variant} hours-box--${theme}`;
    el.innerHTML = `
      <p class="hours-status ${statusClass}" role="status">
        <span class="hours-dot" aria-hidden="true"></span>
        ${esc(state.label)}
      </p>
      ${state.detail ? `<p class="hours-detail">${esc(state.detail)}</p>` : ""}
      ${week}
      ${
        variant === "panel"
          ? `<p class="hours-source"><a href="${esc(cfg.source)}" target="_blank" rel="noopener">Otevírací doba podle Google Maps</a></p>`
          : ""
      }
    `;
  }

  function mountHours(cfg) {
    document.querySelectorAll("[data-hours]").forEach((el) => renderHours(el, cfg));
  }

  const hoursUrl = `${root}/assets/data/oteviraci-doba.json`;
  let hoursCfg = HOURS_FALLBACK;
  fetch(hoursUrl, { cache: "no-cache" })
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((data) => {
      hoursCfg = { ...HOURS_FALLBACK, ...data };
      mountHours(hoursCfg);
    })
    .catch(() => mountHours(hoursCfg));

  setInterval(() => mountHours(hoursCfg), 60000);

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

    const unlockScroll = () => {
      document.documentElement.classList.remove("nav-locked");
      document.body.classList.remove("nav-locked");
      document.body.style.removeProperty("top");
      const y = lockScrollY;
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
    };

    const setOpen = (open) => {
      const isOpen = nav.classList.contains("is-open");
      if (open === isOpen) return;

      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Zavřít menu" : "Menu");

      if (open) {
        lockScrollY = window.scrollY || window.pageYOffset || 0;
        document.documentElement.classList.add("nav-locked");
        document.body.classList.add("nav-locked");
        document.body.style.setProperty("top", `-${lockScrollY}px`);
        if (header) header.classList.add("is-scrolled");
      } else {
        unlockScroll();
      }
    };

    toggle.addEventListener("click", () => {
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    window.addEventListener("resize", () => {
      if (nav.classList.contains("is-open") && window.matchMedia("(min-width: 981px)").matches) {
        setOpen(false);
      }
    });

    // bfcache / návrat z pozadí: lock nesmí zůstat viset (stránka „zamrzne“)
    window.addEventListener("pageshow", () => setOpen(false));
    window.addEventListener("pagehide", () => setOpen(false));
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") setOpen(false);
    });
  }

  function markPageReveals() {
    const mark = (nodes, stagger) => {
      nodes.forEach((el, i) => {
        if (el.classList.contains("reveal") || el.closest(".page-hero") || el.closest(".reveal")) {
          return;
        }
        el.classList.add("reveal");
        if (stagger) {
          el.style.setProperty("--reveal-delay", `${Math.min(i * 70, 420)}ms`);
        }
      });
    };

    document.querySelectorAll(".ref-feature").forEach((el, i) => {
      if (el.classList.contains("reveal")) return;
      el.classList.add("reveal");
      if (i % 2 === 1) el.classList.add("reveal--soft");
    });

    mark(document.querySelectorAll(".service-grid > .service-link"), true);
    mark(document.querySelectorAll(".aktualita-card"), true);
    mark(document.querySelectorAll(".sortiment-card"), true);
    mark(document.querySelectorAll(".about-split > .about-card"), true);
    mark(document.querySelectorAll(".cert-grid > .cert"), true);
    mark(document.querySelectorAll(".team > article"), true);
    mark(document.querySelectorAll(".stores .store"), false);
    mark(document.querySelectorAll(".about-photo"), false);
    mark(document.querySelectorAll(".form-card, .contact-side"), false);
    mark(document.querySelectorAll(".aktualita-detail"), false);
    mark(
      document.querySelectorAll("main > .prose, .section .container > .prose, .about-band .prose"),
      false
    );
    mark(document.querySelectorAll(".brand-strip"), false);
    mark(
      document.querySelectorAll("main > .photo-collage, .section .container > .photo-collage"),
      false
    );
    mark(document.querySelectorAll("main > .media-row"), false);
    mark(document.querySelectorAll(".section-head:not(.reveal), .certs-group"), false);
  }

  markPageReveals();

  const reveals = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fallbackOn = document.documentElement.classList.contains("reveals-fallback");

  function revealNow(el, instant) {
    if (!el || el.classList.contains("is-visible")) return;
    if (instant) el.classList.add("is-instant");
    el.classList.add("is-visible");
  }

  function revealAllPending(instant) {
    reveals.forEach((el) => revealNow(el, instant));
  }

  function inView(el, bottomRatio) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * bottomRatio && rect.bottom > -48;
  }

  function revealVisible(instant, bottomRatio) {
    reveals.forEach((el) => {
      if (!el.classList.contains("is-visible") && inView(el, bottomRatio)) {
        revealNow(el, instant);
      }
    });
  }

  function revealHash() {
    const id = location.hash.slice(1);
    if (!id) return;
    let target = null;
    try {
      target = document.getElementById(id);
    } catch (e) {
      return;
    }
    if (!target) return;
    reveals.forEach((el) => {
      if (el === target || el.contains(target) || target.contains(el)) {
        revealNow(el, true);
      }
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

  document.documentElement.setAttribute("data-reveals", "");

  if (fallbackOn || reduceMotion || !reveals.length || !("IntersectionObserver" in window)) {
    revealAllPending(true);
  } else {
    let lastY = window.scrollY;
    let lastT = performance.now();
    let fast = false;
    let fastTimer = 0;

    const setFast = (on) => {
      fast = on;
      document.documentElement.classList.toggle("scroll-fast", on);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          revealNow(e.target, fast);
          io.unobserve(e.target);
        });
      },
      {
        threshold: 0.01,
        rootMargin: "12% 0px 18% 0px",
      }
    );

    revealHash();
    revealVisible(false, 0.98);

    reveals.forEach((el) => {
      if (!el.classList.contains("is-visible")) io.observe(el);
    });

    window.addEventListener(
      "scroll",
      () => {
        const now = performance.now();
        const y = window.scrollY;
        const dt = Math.max(now - lastT, 1);
        const speed = Math.abs(y - lastY) / dt;
        lastY = y;
        lastT = now;

        // IO odhalí běžný scroll. getBoundingClientRect na každém ticku
        // forsuje layout a na mobilu umí scroll úplně zabít.
        if (speed > 1.8) {
          setFast(true);
          revealVisible(true, 1.15);
          window.clearTimeout(fastTimer);
          fastTimer = window.setTimeout(() => setFast(false), 140);
        }
      },
      { passive: true }
    );

    const flush = (instant) => {
      revealHash();
      revealVisible(instant, 1.08);
      reveals.forEach((el) => {
        if (el.classList.contains("is-visible")) io.unobserve(el);
      });
    };

    window.addEventListener("load", () => flush(false));
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) flush(true);
    });
    window.addEventListener("hashchange", () => revealHash());
    window.addEventListener(
      "resize",
      () => {
        revealVisible(true, 1.02);
      },
      { passive: true }
    );
    window.setTimeout(() => flush(false), 1200);
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

    // Posun z oblasti kopií zpět do skutečné sady — až po zastavení scrollu.
    // Snap se na dobu skoku vypne, jinak se s rewindem semele do smyčky
    // a stránka přestane reagovat na svislý scroll.
    let rewinding = false;
    function rewind() {
      if (!loop || rewinding) return;
      const i = nearestIndex();
      const end = slides[2 * n];
      const start = slides[n];
      if (!end || !start) return;
      const setWidth = end.offsetLeft - start.offsetLeft;
      if (!setWidth) return;
      if (i >= n && i < 2 * n) {
        dom = i;
        return;
      }
      rewinding = true;
      const snap = viewport.style.scrollSnapType;
      viewport.style.scrollSnapType = "none";
      if (i < n) viewport.scrollLeft += setWidth;
      else viewport.scrollLeft -= setWidth;
      window.requestAnimationFrame(() => {
        sync();
        viewport.style.scrollSnapType = snap;
        rewinding = false;
      });
    }

    slides[dom].classList.add("is-active");
    markDots(0);
    status.textContent = `Položka 1 z ${n}`;

    let raf = 0;
    let settle = 0;
    viewport.addEventListener(
      "scroll",
      () => {
        if (rewinding) return;
        if (!raf) {
          raf = requestAnimationFrame(() => {
            raf = 0;
            sync();
          });
        }
        window.clearTimeout(settle);
        settle = window.setTimeout(rewind, 280);
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
      let resizeTimer = 0;
      new ResizeObserver(() => {
        if (first) {
          first = false;
          return;
        }
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          viewport.scrollTo({ left: centerOffset(slides[dom]), behavior: "auto" });
        }, 160);
      }).observe(viewport);
    }

    // Start na první skutečné položce (mezi kopiemi)
    viewport.scrollTo({ left: centerOffset(slides[dom]), behavior: "auto" });

    root.setAttribute("data-carousel-ready", "");

    let userTouched = false;
    const markTouched = () => {
      userTouched = true;
    };
    let pointerX = 0;
    let pointerY = 0;
    viewport.addEventListener(
      "pointerdown",
      (e) => {
        pointerX = e.clientX;
        pointerY = e.clientY;
      },
      { passive: true }
    );
    viewport.addEventListener(
      "pointermove",
      (e) => {
        if (userTouched || !e.isPrimary) return;
        const dx = e.clientX - pointerX;
        const dy = e.clientY - pointerY;
        if (Math.abs(dx) > 18 && Math.abs(dx) > Math.abs(dy)) markTouched();
      },
      { passive: true }
    );
    prev.addEventListener("click", markTouched);
    next.addEventListener("click", markTouched);
    dots.addEventListener("click", markTouched);
    viewport.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
        markTouched();
      }
    });

    function playIntro() {
      if (reduceMotion || userTouched || root.dataset.introPlayed) return;
      root.dataset.introPlayed = "true";
      const narrow = window.matchMedia("(max-width: 700px)").matches;
      const steps = narrow ? 1 : 2;
      const startDelay = root.getBoundingClientRect().top < window.innerHeight * 0.78 ? 720 : 240;
      let step = 0;
      const tick = () => {
        if (userTouched) return;
        goToDom(dom + 1);
        step += 1;
        if (step < steps) window.setTimeout(tick, narrow ? 560 : 640);
      };
      window.setTimeout(tick, startDelay);
    }

    if ("IntersectionObserver" in window && !reduceMotion) {
      const narrow = window.matchMedia("(max-width: 700px)").matches;
      const introIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            playIntro();
            introIo.unobserve(entry.target);
          });
        },
        {
          threshold: narrow ? 0.08 : 0.2,
          rootMargin: narrow ? "0px 0px 0px 0px" : "0px 0px -8% 0px",
        }
      );
      introIo.observe(root);
    }
  }

  document.querySelectorAll("[data-carousel]").forEach(setupCarousel);
})();
