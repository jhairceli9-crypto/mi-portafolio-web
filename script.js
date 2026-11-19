/* =========================================================
   MI PORTAFOLIO WEB — Interacciones
   Funciona sin servidor (ideal para GitHub Pages) y no guarda datos de los visitantes.
   ========================================================= */

/* ===================== CONFIGURACIÓN (edita solo esto) =====================
   brandName      → nombre comercial del portafolio (aparece en el logo, pie y título).
   whatsappNumber → tu número REAL con código de país, solo dígitos (8 a 15). Vacío = pendiente.
   email          → tu correo REAL. Vacío = pendiente.
   githubUser     → tu usuario de GitHub (para los enlaces "GitHub").
   whatsappMessage / emailSubject → texto inicial que verá la persona al escribirte.
   Mientras whatsappNumber o email estén vacíos, la web muestra "Pendiente de configurar"
   y NO crea enlaces falsos ni simula mensajes enviados. */
const CONFIG = {
  brandName: "Jhair Ivan Celi",
  whatsappNumber: "",
  email: "",
  githubUser: "jhairceli9-crypto",
  whatsappMessage: "Hola, vi tu portafolio y quisiera información sobre una página web.",
  emailSubject: "Consulta sobre una página web",
};

/* ---------- Utilidades de validación ---------- */

/** Limpia el número (quita +, espacios y guiones) y lo valida. Devuelve los dígitos o null. */
const getWhatsAppNumber = () => {
  const digits = String(CONFIG.whatsappNumber || "").replace(/[\s+\-().]/g, "");
  if (!digits) return null;
  if (!/^\d{8,15}$/.test(digits)) { console.warn("[Portafolio] whatsappNumber no es válido: se muestra como pendiente."); return null; }
  return digits;
};

/** Valida el correo con una regla sencilla. Devuelve el correo o null. */
const getEmail = () => {
  const email = String(CONFIG.email || "").trim();
  if (!email) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { console.warn("[Portafolio] email no es válido: se muestra como pendiente."); return null; }
  return email;
};

/** Crea un elemento con clase y texto (el texto nunca se interpreta como HTML). */
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

document.addEventListener("DOMContentLoaded", () => {

  /* ===================== 1. Nombre del portafolio ===================== */
  /** Escribe CONFIG.brandName en el logo, el pie y el título de la pestaña. */
  const applyBrand = () => {
    const name = CONFIG.brandName.trim() || "Mi Portafolio Web";
    document.querySelectorAll("[data-brand]").forEach((node) => { node.textContent = name; });
    // El título de la pestaña es "Nombre | Páginas web…": se reemplaza solo la parte del nombre
    document.title = `${name} | ${document.title.split(" | ").slice(1).join(" | ")}`;
  };
  applyBrand();

  /* ===================== 2. Canales de contacto ===================== */
  /**
   * Convierte el aviso "Pendiente de configurar" en un botón real,
   * SOLO si el dato está configurado y es válido.
   */
  const setChannel = (id, href, label, srText) => {
    const body = document.querySelector(`#${id} .channel__body`);
    const pending = body.querySelector(".channel__pending");
    const link = el("a", "channel__link", label);
    link.href = href;
    if (href.startsWith("https://")) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
    link.append(el("span", "sr-only", srText));
    pending.replaceWith(link);
  };

  const wa = getWhatsAppNumber();
  if (wa) {
    setChannel("channelWhatsApp", `https://wa.me/${wa}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`,
      "Escribirme por WhatsApp", " (se abre en una pestaña nueva)");
  }
  const email = getEmail();
  if (email) {
    setChannel("channelEmail", `mailto:${email}?subject=${encodeURIComponent(CONFIG.emailSubject)}`,
      email, " (abre tu programa de correo)");
  }
  // Enlaces de GitHub (logo del pie y contacto) con el usuario configurado
  document.querySelectorAll("[data-github]").forEach((a) => { a.href = `https://github.com/${CONFIG.githubUser}`; });

  /* ===================== 3. Menú móvil accesible ===================== */
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const navItems = nav.querySelectorAll("a");
  const mobileQuery = window.matchMedia("(max-width: 900px)"); // igual que en styles.css

  const backdrop = el("div", "nav-backdrop");
  document.body.append(backdrop);

  const isOpen = () => nav.classList.contains("is-open");
  /** "inert" bloquea el menú cerrado en móviles: no recibe foco ni lo leen los lectores de pantalla. */
  const syncInert = () => { nav.inert = mobileQuery.matches && !isOpen(); };
  syncInert();

  /** Abre o cierra el menú. Al abrir, el foco entra al menú; al cerrar con teclado, vuelve al botón. */
  const setMenu = (open, returnFocus = false) => {
    nav.classList.toggle("is-open", open);
    syncInert();
    backdrop.classList.toggle("is-visible", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    if (open) navItems[0].focus();
    else if (returnFocus) toggle.focus();
  };

  toggle.addEventListener("click", () => setMenu(!isOpen()));
  backdrop.addEventListener("click", () => setMenu(false));
  navItems.forEach((a) => a.addEventListener("click", () => setMenu(false)));
  mobileQuery.addEventListener("change", (e) => { if (!e.matches) setMenu(false); else syncInert(); });

  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;
    if (e.key === "Escape") setMenu(false, true);
    if (e.key === "Tab") { // el foco no sale del menú mientras está abierto
      const items = [toggle, ...navItems];
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ===================== 4. Encabezado y enlace activo ===================== */
  const navLinks = [...document.querySelectorAll(".nav__link")];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);

  /** Marca en el menú la sección visible (al final de la página, la última). */
  const updateActiveLink = () => {
    const line = header.offsetHeight + window.innerHeight * 0.3;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    let current = null;
    sections.forEach((s) => { if (s.getBoundingClientRect().top <= line) current = s; });
    if (atBottom) current = sections[sections.length - 1];
    navLinks.forEach((a) => {
      const active = current && a.getAttribute("href") === `#${current.id}`;
      a.classList.toggle("is-active", Boolean(active));
      if (active) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  };

  let ticking = false;
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
    updateActiveLink();
    ticking = false;
  };
  onScroll();
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  /* ===================== 5. Aparición suave al hacer scroll ===================== */
  const revealItems = document.querySelectorAll(".reveal");
  revealItems.forEach((item) => {
    const siblings = [...item.parentElement.children].filter((c) => c.classList.contains("reveal"));
    item.style.transitionDelay = `${Math.min(siblings.indexOf(item), 3) * 80}ms`;
  });
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); } });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  revealItems.forEach((item) => observer.observe(item));

  /* ===================== 6. Año del pie de página ===================== */
  document.getElementById("year").textContent = new Date().getFullYear();
});
