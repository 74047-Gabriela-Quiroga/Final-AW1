**Córdoba Turismo — Proyecto Web**

Aplicación Web Tradicional Multi-Página (MPA - Multi-Page Application) que muestra destinos turísticos, permite reservar y enviar mensajes de contacto. Usa HTML, CSS (Bootstrap) y módulos ES de JavaScript.

┌─────────────────────────────────────────────────────────────┐
│                   CÓRDOBA TURISMO                           │
│                  Aplicación Web MPA                         │
└─────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
    ┌───▼────┐      ┌─────▼─────┐    ┌──────▼────┐
    │  HTML  │      │   CSS     │    │ JavaScript│
    │ Pages  │      │  Styles   │    │ Modules   │
    └────────┘      └───────────┘    └───────────┘


**Estructura principal**
- **Archivos HTML**: [index.html](index.html), [destinos.html](destinos.html), [reserva.html](reserva.html), [contacto.html](contacto.html)
- **Estilos**: [css/styles.css](css/styles.css)
- **Imágenes**: [img/](img)
- **Datos**: [data/destinos.json](data/destinos.json)
- **JS - Páginas**: [js/paginas/](js/paginas) (contiene `contacto.js`, `destinos.js`, `destinosDestacados.js`, `reserva.js`)
- **JS - Servicios**: [js/servicios/](js/servicios) (lector de JSON y persistencia)
- **JS - Utilidades**: [js/utilidades/](js/utilidades) (validaciones, cálculo de totales)


**Flujo Visual Completo**
USUARIO ENTRA A index.html
        ↓
   ┌─────────────────────────┐
   │ 1. DESCUBRE PÁGINA      │
   │    - Lee sobre nosotros │
   │    - Ve 3 destinos      │
   │      destacados         │
   │    - Click en "Reservar"│
   │      (destino 1)        │
   └────────┬────────────────┘
            │
   ┌────────▼─────────────┐
   │ 2. VA A reserva.html │
   │    ?id=1             │
   └────────┬─────────────┘
            │
   ┌────────▼────────────────────┐
   │ 3. FORMULARIO PRE-LLENADO   │
   │    - Destino = "City Tour"  │
   │    - Completa:              │
   │      * Nombre               │
   │      * Email                │
   │      * Personas             │
   │      * Seguro (opcional)    │
   └────────┬────────────────────┘
            │
   ┌────────▼──────────────────────┐
   │ 4. CALCULA AUTOMÁTICAMENTE    │
   │    - Total = precio × personas│
   │    - +$5000 si seguro         │
   │    - Muestra en tiempo real   │
   └────────┬──────────────────────┘
            │
   ┌────────▼────────────────────┐
   │ 5. VALIDA Y CONFIRMA        │
   │    - Nombre: letras         │
   │    - Email: formato         │
   │    - Guarda en localStorage │
   └────────┬────────────────────┘
            │
   ┌────────▼────────────────┐
   │ 6. CONFIRMACIÓN         │
   │       "¡Reserva         │
   │       confirmada!"      │
   │    Formulario limpio    │
   └────────┬────────────────┘
            │
   ┌────────▼────────────────┐
   │ 7. USUARIO PUEDE:       │
   │    - Ver contacto       │
   │    - Ver destinos       │
   │    - Nueva reserva      │
   │    - Hacer contacto     │
   └─────────────────────────┘


**End-to-end (walkthrough técnico)**
Este apartado explica cómo fluye la información en la aplicación para que cualquier desarrollador lo entienda rápidamente.

1. Carga inicial
	- El usuario abre `index.html` (o cualquier página). Los scripts se cargan con `type="module"` y arrastran la lógica de cada página desde `js/paginas/`.

2. Obtención de datos
	- `js/servicios/lectorJSON.js` hace `fetch` a `data/destinos.json` y expone `obtenerDestinos()` para devolver la lista de destinos.
	- Los módulos de página (`destinosDestacados.js`, `destinos.js`) importan `obtenerDestinos()` y renderizan tarjetas en el DOM (elementos `#destinosDestacados` y `#destinosContainer`).

3. Interacción en `destinos.html`
	- `destinos.js` muestra todas las cards de destinos y puede enlazar a la reserva.

4. Flujo de Reserva (`reserva.html`)
	- `reserva.js` importa `obtenerDestinos()` para poblar el `<select id="destino">`.
	- Cuando el usuario cambia el destino, la cantidad de personas o selecciona seguro, `js/utilidades/calcularTotal.js` calcula el total y actualiza `#total`.
	- Al enviar el formulario, `reserva.js` utiliza `js/utilidades/validaciones.js` para validar `nombre` y `email`.
	- Si la validación pasa, `js/servicios/persistenciaReserva.js` guarda la reserva (en `localStorage`).

5. Formulario de Contacto (`contacto.html`)
	- `contacto.js` valida `nombre`, `email` y `telefono` con `js/utilidades/validaciones.js`.
	- Muestra mensajes en `#mensajeDiv` (actualmente el envío es simulado).


**Stack tecnológico**
┌──────────────────────────────────────────┐
│      CÓRDOBA TURISMO TECH STACK          │
├──────────────────────────────────────────┤
│                                          │
│ FRONTEND:                                │
│ ├─ HTML5                                 │
│ ├─ CSS3                                  │
│ │  └─ Bootstrap 5.3.2 (Framework)        │
│ │     ├─ Grid system                     │
│ │     ├─ Componentes predefinidos        │
│ │     ├─ Utilidades (spacing, etc)       │
│ │     └─ Responsive design               │
│ │                                        │
│ └─ JavaScript (Vanilla)                  │
│    ├─ ES6+ (módulos, async/await)        │
│    ├─ Fetch                              │
│    ├─ localStorage                       │
│    ├─ DOM Manipulation                   │
│    └─ Event Listeners                    │
│                                          │
│ DATA:                                    │
│ └─ JSON estático                         │
│                                          │    
│ ARQUITECTURA:                            │
│ ├─ MPA (Multi-Page)                      │
│ ├─ Modular (paginas/servicios/utilidades)│
│ └─ Vanilla JS (sin JS framework)         │
│                                          │
└──────────────────────────────────────────┘

**Resumen**
La aplicación es un MPA que:
- Carga datos dinámicamente desde JSON.
- Valida entrada del usuario con regex.
- Calcula precios en tiempo real.
- Guarda datos localmente en localStorage.
- Es completamente responsiva con Bootstrap.
- Usa arquitectura modular (servicios, utils, pages).