import { obtenerDestinos } from "../services/api.js";

const container = document.getElementById("destinosDestacados");

async function init() {
  const destinos = await obtenerDestinos();

  // 👇 SOLO LOS PRIMEROS 3
  const destacados = destinos.slice(0, 3);

  renderDestinos(destacados);
}

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
