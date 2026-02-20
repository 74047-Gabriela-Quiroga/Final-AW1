import { obtenerDestinos } from "../servicios/lectorJSON.js";

// Referencia al contenedor donde se mostrarán los destinos destacados
const container = document.getElementById("destinosDestacados");

// Función de inicialización para cargar y mostrar los destinos destacados
async function init() {
  const destinos = await obtenerDestinos();
  // Se mostraran solo los primeros 3 destinos como destacados
  const destacados = destinos.slice(0, 3);
  renderDestinos(destacados);
}

// Función para crear los cards de los destinos
function renderDestinos(destinos) {
  container.innerHTML = destinos.map(destino => `
    <article class="card-destino">
      <img src="${destino.imagen}" alt="${destino.nombre}">
      <h3 class="card-nombre">${destino.nombre}</h3>
      <p class="card-descripcion">${destino.descripcion}</p>
      <p class="card-precio"><strong>$${destino.precio}</strong></p>
      <a href="reserva.html?id=${destino.id}" class="btn btn-primary">
        Reservar
      </a>
    </article>
  `).join("");
}

init();
