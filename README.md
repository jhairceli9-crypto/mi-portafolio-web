# Portafolio web — Jhair Ivan Celi

🔗 **Sitio:** https://jhairceli9-crypto.github.io/mi-portafolio-web/

Portafolio personal de un desarrollador web en formación. Muestra proyectos reales de práctica para conseguir los primeros clientes: páginas informativas, menús digitales y catálogos web.

> El nombre comercial («Jhair Ivan Celi»), el WhatsApp y el correo son **configurables**. No se inventan datos personales, testimonios, clientes ni estadísticas.

## Secciones

| Sección | Contenido |
|---|---|
| Inicio | Título, subtítulo, botones «Ver mis proyectos» y «Solicitar información», y capturas reales de los proyectos. |
| Sobre mí | Presentación honesta como desarrollador en formación y habilidades que ya se practican en los proyectos. |
| Servicios | 4 servicios (web informativa, menú digital, catálogo y mantenimiento) con beneficios y botón «Consultar este servicio», más una nota de lo que **todavía no** se ofrece y de que una web no garantiza ventas. |
| Proyectos | NovaTech Solutions, Sabor & Brasa y Botiquín del Barrio, con captura real, descripción, funciones, tecnologías verificadas y botón «Ver proyecto». |
| Llamada a la acción | Banda «¿Te gustaría una página así para tu negocio?» con botón de WhatsApp. |
| Cómo trabajamos | 4 pasos: conocer el negocio, propuesta, desarrollo y publicación. |
| Preguntas frecuentes | Plazos, cambios, publicación, qué tener listo, actualizaciones y precio (sin cifras inventadas). |
| Contacto | WhatsApp y correo configurados, enlace a GitHub y botón flotante de WhatsApp. |
| Pie | Navegación, GitHub y aviso de portafolio personal. |

## Archivos

```
├── index.html   → estructura y textos de todas las secciones
├── styles.css   → diseño: colores, tipografía, tarjetas, animaciones y responsive
├── script.js    → configuración (nombre y contacto), menú móvil, enlace activo y animaciones
├── img/         → capturas reales de los proyectos en .webp: escritorio (800 y 480 px) y celular (-movil, 300 px)
├── README.md    → este archivo
└── .nojekyll    → indica a GitHub Pages que publique los archivos tal cual
```

## Configuración (al inicio de `script.js`)

```js
const CONFIG = {
  brandName: "Jhair Ivan Celi",     // nombre comercial: logo, pie y título de la pestaña
  whatsappNumber: "593991849364",   // número real con código de país, sin el 0 inicial
  email: "celijhair16@gmail.com",   // correo real
  githubUser: "jhairceli9-crypto",  // tu usuario de GitHub
  whatsappMessage: "Hola, vi tu portafolio y quisiera información sobre una página web.",
  emailSubject: "Consulta sobre una página web",
};
```

**Los enlaces de la sección Contacto están en DOS lugares:**
1. `index.html` (enlaces escritos directamente): funcionan aunque JavaScript no se ejecute (código fuente, buscadores, vistas previas, navegadores con JavaScript bloqueado).
2. `CONFIG` en `script.js`: actualiza esos enlaces y arma los botones de servicios, la banda azul y el botón flotante.

Si cambias tu número o correo, **cámbialo en los dos**. Si no coinciden, la consola (`F12`) muestra un aviso y se usa el de `CONFIG`.

| Dato en `CONFIG` | Qué pasa |
|---|---|
| Válido | Todos los botones de WhatsApp/correo usan ese dato. |
| Vacío o inválido | El enlace se reemplaza por «WhatsApp/Correo no disponible por el momento», los botones de servicios llevan a #contacto, no aparece el botón flotante y la consola explica qué falta. Nunca se crea un enlace falso. |

El número se puede escribir con `+`, espacios o guiones. **Formato de Ecuador:** 593 + el número sin el 0 inicial (099… → 59399…). Los datos inválidos generan un aviso en la consola (`F12`).

## Cómo editar el contenido

- **Textos:** directamente en `index.html`; cada sección tiene un comentario `===== N. NOMBRE =====`.
- **Preguntas frecuentes:** copia un bloque `<details class="faq__item">` y cambia la pregunta (`<summary>`) y la respuesta (`<p>`).
- **Servicio nuevo:** copia un `<article class="card">` y pon el nombre del servicio en `data-service="…"` (es el texto que aparece en el mensaje de WhatsApp).
- **Colores:** variables al inicio de `styles.css` (`--bg`, `--blue`, `--sky`…). Junto a cada una está su uso.
- **Agregar un proyecto** (cada tarjeta lleva 3 capturas reales):
  1. **Captura de escritorio:** abre el sitio en Chrome con la ventana en 1280 × 800 y toma la captura (`F12` → `Ctrl + Shift + P` → «Capture screenshot»).
  2. **Captura de celular:** en `F12` → `Ctrl + Shift + M`, elige un ancho de 390 px y repite «Capture screenshot».
  3. Convierte a WebP (por ejemplo en [squoosh.app](https://squoosh.app), calidad 70–75) y guarda en `img/`:
     - `nombre-800.webp` (800 px de ancho) y `nombre-480.webp` (480 px), proporción 8:5.
     - `nombre-movil.webp` (300 px de ancho).
  4. Copia un bloque `<article class="project">` completo en `index.html` y cambia:
     las 3 imágenes y sus `alt` («Captura de la página de inicio de…» / «…de la versión para celular de…»),
     la etiqueta (`Demostración · …`), el título, la descripción, las funciones, las tecnologías y los enlaces.
  5. Los enlaces externos deben llevar `target="_blank" rel="noopener noreferrer"` y el aviso oculto «(se abre en una pestaña nueva)».
  6. No hace falta recortar exacto: el marco obliga a todas las capturas a la proporción 8:5.
- **Quitar un proyecto:** borra su bloque `<article class="project">`.

## Cómo probarlo

```bash
python -m http.server 8000
# abre http://localhost:8000
```

En Chrome: `F12` → `Ctrl + Shift + M` para ver el formato de celular.

## Publicar en GitHub Pages

1. Crea un repositorio (por ejemplo `mi-portafolio-web`) y sube los archivos.
2. En GitHub: **Settings → Pages → Branch: main / (root)**.
3. **Vista previa al compartir:** `og:image`, `og:url` y `canonical` ya apuntan a `https://jhairceli9-crypto.github.io/mi-portafolio-web/`. Si cambias el nombre del repositorio, actualiza esas tres líneas en `index.html`.
4. Cada vez que cambies `styles.css` o `script.js`, sube la versión en `index.html` (`?v=6` → `?v=7`).

## Calidad comprobada

Probado en Chrome de escritorio, con anchos simulados y servido en una subruta como en GitHub Pages:

- 360, 390, 768, 1024 y 1440 px: sin desplazamiento horizontal ni textos cortados; controles táctiles de al menos 44 × 44 px.
- Recorrido con la tecla Tab en orden lógico; contorno de foco visible en todos los controles (contraste de 8:1 a 18,8:1).
- Contraste de colores: textos ≥ 8:1; texto blanco sobre botón azul 5,17:1.
- Menú móvil: el foco entra al menú, se mantiene dentro y se cierra con `Esc`; bloqueado con `inert` cuando está cerrado.
- Contacto: sin datos no hay enlaces falsos; con datos válidos se crean los enlaces correctos (probado con valores de prueba en memoria, no guardados).
- Respeta «reducir movimiento». Sin errores en la consola. No usa cookies ni `localStorage`.
- 9 imágenes WebP (escritorio y celular), en total unos 155 KB. Todas las capturas mantienen la proporción 8:5.

## Limitaciones

- Al publicar, **tu número de WhatsApp y tu correo serán visibles** para cualquier visitante.
- Las capturas son una foto del momento: si cambias un proyecto, vuelve a tomarlas.
- La fuente Manrope se carga desde Google Fonts.
- No probado todavía en celulares físicos, Safari en iPhone ni con lectores de pantalla.
