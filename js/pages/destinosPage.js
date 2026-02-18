import { obtenerDestinos } from "../services/api.js";

const container = document.getElementById("destinosContainer");
const destinos = await obtenerDestinos();

function renderDestinos(destinos) {
    
  container.innerHTML = destinos.map(destino => `
    <article class="card-destino">
      <img src="${destino.imagen}" alt="${destino.nombre}">
      <h3 class="card-nombre">${destino.nombre}</h3>
      <p class="card-descripcion">${destino.descripcion}</p>
      <p><strong>$${destino.precio}</strong></p>
      <a href="reserva.html?id=${destino.id}" 
        class="btn btn-primary">
        Reservar
      </a>
    </article>
  `).join("");
}
renderDestinos(destinos);