(() => {
  const root = document.body.dataset.root || ".";
  const shared = root === "." ? "../shared" : root === ".." ? "../../shared" : "../../../shared";
  const hub = root === "." ? "../index.html" : root === ".." ? "../../index.html" : "../../../index.html";

  if (!document.querySelector('link[data-back-chip]')) {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = `${shared}/back-chip.css`;
    l.dataset.backChip = "1";
    document.head.appendChild(l);
  }
  if (!document.querySelector(".back-chip")) {
    const a = document.createElement("a");
    a.className = "back-chip";
    a.href = hub;
    a.textContent = "← Zpět k výběru designu";
    document.body.appendChild(a);
  }

  const mark = () =>
    `<img src="${root}/assets/media/mark.svg" width="44" height="14" alt="" />`;

  const item = (href, label, key, active) =>
    `<li><a href="${root}${href}"${active === key ? ' aria-current="page"' : ""}>${label}</a></li>`;

  const header = document.querySelector("[data-header]");
  if (header) {
    const active = document.body.dataset.page || "";
    header.outerHTML = `
      <a class="skip-link" href="#main">Přejít k obsahu</a>
      <header class="site-header">
        <div class="container nav" data-nav>
          <a class="brand" href="${root}/index.html">${mark()}<span class="brand-text">ELEKTRO EURON<span>spol. s r.o.</span></span></a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
          <ul class="nav-links">
            ${item("/sluzby/", "Služby", "sluzby", active)}
            ${item("/obchod/", "Obchod", "obchod", active)}
            ${item("/reference/", "Reference", "reference", active)}
            ${item("/kontakt/", "Kontakt", "kontakt", active)}
          </ul>
          <a class="nav-phone" href="tel:+420354437476">+420 354 437 476</a>
        </div>
      </header>`;
  }

  const footer = document.querySelector("[data-footer]");
  if (footer) {
    footer.outerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <h2>ELEKTRO EURON spol. s r.o.</h2>
            <p>Zelená 1844/6, 350 02 Cheb<br>IČO 49192876 · DIČ CZ49192876</p>
            <p><a href="mailto:info@elektro-euron.cz">info@elektro-euron.cz</a></p>
          </div>
          <div>
            <h3>Navigace</h3>
            <ul>
              <li><a href="${root}/sluzby/">Služby</a></li>
              <li><a href="${root}/obchod/">Obchod</a></li>
              <li><a href="${root}/reference/">Reference</a></li>
              <li><a href="${root}/kontakt/">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h3>Prodejny</h3>
            <ul>
              <li>Cheb · po–pá 7–17 · so 8–12</li>
              <li>Aš · po, st–pá 8–16 · út do 14:30</li>
            </ul>
          </div>
        </div>
      </footer>`;
  }

  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector(".nav-toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Pause video if reduced motion
  const vid = document.querySelector("[data-hero-video]");
  if (vid && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    vid.removeAttribute("autoplay");
    vid.pause();
    vid.style.display = "none";
  }

  const reveals = document.querySelectorAll(".reveal");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const show = (el, instant) => {
    if (!el || el.classList.contains("is-visible")) return;
    if (instant) el.classList.add("is-instant");
    el.classList.add("is-visible");
  };
  if (reduce) {
    reveals.forEach((el) => show(el, true));
  } else if (reveals.length && "IntersectionObserver" in window) {
    let lastY = scrollY,
      lastT = performance.now(),
      fast = false,
      t = 0;
    addEventListener(
      "scroll",
      () => {
        const now = performance.now();
        const y = scrollY;
        const speed = Math.abs(y - lastY) / Math.max(now - lastT, 1);
        lastY = y;
        lastT = now;
        if (speed > 1.8) {
          fast = true;
          document.documentElement.classList.add("scroll-fast");
          const line = y + innerHeight * 1.15;
          reveals.forEach((el) => {
            if (!el.classList.contains("is-visible") && el.getBoundingClientRect().top + y < line)
              show(el, true);
          });
          clearTimeout(t);
          t = setTimeout(() => {
            fast = false;
            document.documentElement.classList.remove("scroll-fast");
          }, 140);
        }
      },
      { passive: true }
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show(e.target, fast);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.92 && r.bottom > 0) show(el, true);
      else io.observe(el);
    });
  } else {
    reveals.forEach((el) => show(el, true));
  }

  const form = document.querySelector("[data-inquiry-form]");
  if (form) {
    const params = new URLSearchParams(location.search);
    const typ = params.get("typ");
    const sel = form.querySelector('[name="typ"]');
    if (typ && sel) {
      const m = [...sel.options].find((o) => o.value.toLowerCase() === typ.toLowerCase());
      if (m) sel.value = m.value;
    }
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const d = new FormData(form);
      if (!d.get("jmeno") || !d.get("telefon") || !d.get("zprava")) {
        form.reportValidity();
        return;
      }
      const body = [
        `Typ: ${d.get("typ")}`,
        `Jméno: ${d.get("jmeno")}`,
        `Telefon: ${d.get("telefon")}`,
        `E-mail: ${d.get("email")}`,
        `Lokalita: ${d.get("lokalita")}`,
        "",
        d.get("zprava"),
      ].join("\n");
      location.href = `mailto:info@elektro-euron.cz?subject=${encodeURIComponent(
        "Poptávka — " + d.get("typ")
      )}&body=${encodeURIComponent(body)}`;
    });
  }
})();
