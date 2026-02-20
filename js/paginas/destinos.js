import { obtenerDestinos } from "../servicios/lectorJSON.js";

// Referencia al contenedor donde se mostrarán los destinos y obtención de datos
const container = document.getElementById("destinosContainer");
const destinos = await obtenerDestinos();

// Función para crear los cards de los destinos
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