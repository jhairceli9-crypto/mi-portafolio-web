# Mi Portafolio Web

Portafolio personal de un desarrollador web en formación. Muestra proyectos reales de práctica para conseguir los primeros clientes: páginas informativas, menús digitales y catálogos web.

> El nombre comercial («Mi Portafolio Web»), el WhatsApp y el correo son **configurables**. No se inventan datos personales, testimonios, clientes ni estadísticas.

## Secciones

| Sección | Contenido |
|---|---|
| Inicio | Título, subtítulo, botones «Ver mis proyectos» y «Solicitar información», y capturas reales de los proyectos. |
| Sobre mí | Presentación honesta como desarrollador en formación y habilidades que ya se practican en los proyectos. |
| Servicios | 4 servicios y una nota clara de lo que **todavía no** se ofrece (pagos en línea, bases de datos, inicio de sesión). |
| Proyectos | NovaTech Solutions, Sabor & Brasa y Botiquín del Barrio, con captura real, descripción, funciones, tecnologías verificadas y botón «Ver proyecto». |
| Proceso | 4 pasos de trabajo. |
| Contacto | WhatsApp y correo configurables, más el enlace a GitHub. |
| Pie | Navegación, GitHub y aviso de portafolio personal. |

## Archivos

```
├── index.html   → estructura y textos de todas las secciones
├── styles.css   → diseño: colores, tipografía, tarjetas, animaciones y responsive
├── script.js    → configuración (nombre y contacto), menú móvil, enlace activo y animaciones
├── img/         → capturas reales de los proyectos en .webp (800 y 480 px)
├── README.md    → este archivo
└── .nojekyll    → indica a GitHub Pages que publique los archivos tal cual
```

## Configuración (al inicio de `script.js`)

```js
const CONFIG = {
  brandName: "Mi Portafolio Web",   // nombre comercial: logo, pie y título de la pestaña
  whatsappNumber: "",               // tu número real, con código de país (8 a 15 dígitos)
  email: "",                        // tu correo real
  githubUser: "jhairceli9-crypto",  // tu usuario de GitHub
  whatsappMessage: "Hola, vi tu portafolio y quisiera información sobre una página web.",
  emailSubject: "Consulta sobre una página web",
};
```

| Dato | Si está vacío o es inválido | Si es válido |
|---|---|---|
| `whatsappNumber` | Se muestra «Pendiente de configurar»; no hay enlace. | Botón «Escribirme por WhatsApp» que abre `wa.me` con el mensaje inicial. |
| `email` | Se muestra «Pendiente de configurar»; no hay enlace. | Enlace `mailto:` con asunto. |

El número se puede escribir con `+`, espacios o guiones. Los datos inválidos generan un aviso en la consola (`F12`).

## Cómo editar el contenido

- **Textos:** directamente en `index.html`; cada sección tiene un comentario `===== N. NOMBRE =====`.
- **Colores:** variables al inicio de `styles.css` (`--bg`, `--blue`, `--sky`…). Junto a cada una está su uso.
- **Agregar un proyecto:**
  1. Toma una captura de la página (1280 × 800) y guárdala en `img/` en dos tamaños: `nombre-800.webp` y `nombre-480.webp`.
  2. Copia un bloque `<article class="project">` completo en `index.html`.
  3. Cambia la imagen, el `alt` («Captura de la página de inicio de…»), el título, la descripción, las funciones, las tecnologías y los enlaces.
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
3. **Vista previa al compartir:** cuando tengas la dirección final, agrega en `index.html`:
   ```html
   <meta property="og:image" content="https://TU-USUARIO.github.io/mi-portafolio-web/img/sabor-y-brasa-800.webp">
   <link rel="canonical" href="https://TU-USUARIO.github.io/mi-portafolio-web/">
   ```
   (Deben ser direcciones completas; por eso no se incluyeron todavía).
4. Cada vez que cambies `styles.css` o `script.js`, sube la versión en `index.html` (`?v=1` → `?v=2`).

## Calidad comprobada

Probado en Chrome de escritorio, con anchos simulados y servido en una subruta como en GitHub Pages:

- 360, 390, 768, 1024 y 1440 px: sin desplazamiento horizontal ni textos cortados; controles táctiles de al menos 44 × 44 px.
- Recorrido con la tecla Tab en orden lógico; contorno de foco visible en todos los controles (contraste de 8:1 a 18,8:1).
- Contraste de colores: textos ≥ 8:1; texto blanco sobre botón azul 5,17:1.
- Menú móvil: el foco entra al menú, se mantiene dentro y se cierra con `Esc`; bloqueado con `inert` cuando está cerrado.
- Contacto: sin datos no hay enlaces falsos; con datos válidos se crean los enlaces correctos (probado con valores de prueba en memoria, no guardados).
- Respeta «reducir movimiento». Sin errores en la consola. No usa cookies ni `localStorage`.
- 6 imágenes WebP, en total unos 105 KB.

## Limitaciones

- WhatsApp y correo quedan **pendientes** hasta que configures datos reales.
- Las capturas son una foto del momento: si cambias un proyecto, vuelve a tomarlas.
- La fuente Manrope se carga desde Google Fonts.
- No probado todavía en celulares físicos, Safari en iPhone ni con lectores de pantalla.
