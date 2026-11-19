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

   IMPORTANTE: los enlaces de WhatsApp y correo de la sección Contacto también están escritos
   en index.html (para que funcionen aunque JavaScript no se ejecute). Si cambias un dato,
   cámbialo en los DOS lugares. Si no coinciden, la consola (F12) te avisa.
   Si un dato falta o es inválido, la web muestra "no disponible" y NO crea enlaces falsos. */
const CONFIG = {
  brandName: "Jhair Ivan Celi",
  whatsappNumber: "593991849364",   // +593 99 184 9364 (sin el 0 inicial del formato nacional)
  email: "celijhair16@gmail.com",
  githubUser: "jhairceli9-crypto",
  whatsappMessage: "Hola, vi tu portafolio y quisiera información sobre una página web.",
  emailSubject: "Consulta sobre una página web",
};

/* ---------- Utilidades de validación ---------- */

/** Limpia el número (quita +, espacios y guiones) y lo valida. Devuelve los dígitos o null. */
const getWhatsAppNumber = () => {
  const digits = String(CONFIG.whatsappNumber || "").replace(/[\s+\-().]/g, "");
  if (!digits) {
    console.error("[Portafolio] Falta CONFIG.whatsappNumber en script.js: el botón de WhatsApp se muestra como «no disponible».");
    return null;
  }
  if (!/^\d{8,15}$/.test(digits)) {
    console.error(`[Portafolio] CONFIG.whatsappNumber no es válido (debe tener de 8 a 15 dígitos con código de país; Ecuador: 593 + número sin el 0). Valor recibido con ${digits.length} caracteres.`);
    return null;
  }
  return digits;
};

/** Valida el correo con una regla sencilla. Devuelve el correo o null. */
const getEmail = () => {
  const email = String(CONFIG.email || "").trim();
  if (!email) {
    console.error("[Portafolio] Falta CONFIG.email en script.js: el correo se muestra como «no disponible».");
    return null;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    console.error("[Portafolio] CONFIG.email no tiene formato de correo válido (ejemplo: nombre@dominio.com).");
    return null;
  }
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
   * Los enlaces de contacto ya vienen escritos en index.html (funcionan sin JavaScript).
   * Aquí se comparan con CONFIG:
   * - CONFIG válido      → el enlace se actualiza con CONFIG (y avisa si el HTML tenía otro dato).
   * - CONFIG falta/malo  → el enlace se reemplaza por un mensaje claro "no disponible"
   *                        (nunca se deja un enlace que podría estar equivocado).
   */
  const syncContact = (type, value, href, label, srText, otherAvailable) => {
    const link = document.querySelector(`[data-contact="${type}"]`);
    if (!link) return;
    if (!value) {
      // Solo sugiere el otro medio si ese sí está disponible
      const base = type === "whatsapp" ? "WhatsApp no disponible por el momento." : "Correo no disponible por el momento.";
      const alt = type === "whatsapp" ? " Escríbeme por correo." : " Escríbeme por WhatsApp.";
      link.replaceWith(el("p", "channel__error", base + (otherAvailable ? alt : " Puedes ver mi trabajo en GitHub.")));
      return;
    }
    const htmlValue = type === "whatsapp" ? new URL(link.href).pathname.slice(1) : link.href.replace(/^mailto:/, "").split("?")[0];
    if (htmlValue !== value) {
      console.warn(`[Portafolio] El ${type === "whatsapp" ? "número" : "correo"} de index.html no coincide con CONFIG; se usa el de CONFIG. Actualiza index.html para que funcione también sin JavaScript.`);
    }
    link.href = href;
    link.replaceChildren(label, el("span", "sr-only", srText));
  };

  const wa = getWhatsAppNumber();
  const email = getEmail();
  syncContact("whatsapp", wa, wa && `https://wa.me/${wa}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`,
    "Escribirme por WhatsApp", " (se abre en una pestaña nueva)", Boolean(email));
  syncContact("email", email, email && `mailto:${email}?subject=${encodeURIComponent(CONFIG.emailSubject)}`,
    email, " (abre tu programa de correo)", Boolean(wa));
  /**
   * Botones de llamada a la acción:
   * - [data-service] → "Consultar este servicio": WhatsApp con el nombre del servicio ya escrito.
   * - [data-wa]      → botón general "Escribirme por WhatsApp".
   * Sin número válido, se quedan como enlaces a la sección #contacto (nunca a un WhatsApp falso).
   */
  const waLink = (text) => `https://wa.me/${wa}?text=${encodeURIComponent(text)}`;
  const makeWhatsApp = (a, text) => {
    a.href = waLink(text);
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.append(el("span", "sr-only", " (abre WhatsApp en una pestaña nueva)"));
  };
  if (wa) {
    document.querySelectorAll("[data-service]").forEach((a) =>
      makeWhatsApp(a, `Hola, vi tu portafolio y me interesa el servicio de ${a.dataset.service}.`));
    document.querySelectorAll("[data-wa]").forEach((a) => makeWhatsApp(a, CONFIG.whatsappMessage));

    // Botón flotante de WhatsApp (solo existe si hay número)
    const float = el("a", "wa-float");
    makeWhatsApp(float, CONFIG.whatsappMessage);
    float.setAttribute("aria-label", "Escribirme por WhatsApp (se abre en una pestaña nueva)");
    float.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8c-.9-.4-1.6-1.1-2-2l.8-1-1-2L9 9.5z"/></svg>';
    document.body.append(float);
  }

  // Enlaces de GitHub (logo del pie y contacto) con el usuario configurado
  document.querySelectorAll("[data-github]").forEach((a) => { a.href = `https://github.com/${CONFIG.githubUser}`; });

  /* ===================== 3. Menú móvil accesible ===================== */
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const navItems = nav.querySelectorAll("a");
  const mobileQuery = window.matchMedia("(max-width: 1080px)"); // igual que en styles.css

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
