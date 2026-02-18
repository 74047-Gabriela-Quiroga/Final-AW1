import { obtenerDestinos } from "../services/api.js";
import { calcularTotal } from "../utils/calculadora.js";
import { validarNombre, validarEmail } from "../utils/validaciones.js";
import { guardarReserva } from "../services/storage.js";

const destinos = await obtenerDestinos();

const form = document.getElementById("formReserva");
const select = document.getElementById("destino");
const personasInput = document.getElementById("personas");
const seguroCheck = document.getElementById("seguro");
const totalSpan = document.getElementById("total");
const mensajeDiv = document.getElementById("mensaje");

function cargarSelect(destinos) {
    select.innerHTML = destinos.map(destino => `
        <option value="${destino.id}">
            ${destino.nombre} - $${destino.precio}
        </option>
    `).join("");
}

function mostrarMensaje(mensaje, tipo = "success") {
  mensajeDiv.innerHTML = `
    <div class="alert alert-${tipo}">
      ${mensaje}
    </div>
  `;
}

function actualizarTotal() {
  const precio = parseInt(select.value);
  const personas = parseInt(personasInput.value) || 0;
  totalSpan.textContent = calcularTotal(precio, personas, seguroCheck.checked);
}

cargarSelect(destinos);
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
  select.value = id;
}

select.addEventListener("change", actualizarTotal);
personasInput.addEventListener("input", actualizarTotal);
seguroCheck.addEventListener("change", actualizarTotal);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!validarNombre(nombre)) {
    mostrarMensaje("Nombre inválido", "danger");
    return;
  }

  if (!validarEmail(email)) {
    mostrarMensaje("Email inválido", "danger");
    return;
  }

  guardarReserva({
    nombre,
    email,
    destino: select.options[select.selectedIndex].text,
    personas: personasInput.value,
    total: totalSpan.textContent
  });

  mostrarMensaje("Reserva confirmada correctamente!", "success");
  form.reset();
  totalSpan.textContent = 0;
});