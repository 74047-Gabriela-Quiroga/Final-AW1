import { obtenerDestinos } from "../servicios/lectorJSON.js";
import { calcularTotal } from "../utilidades/calcularTotal.js";
import { validarNombre, validarEmail } from "../utilidades/validaciones.js";
import { guardarReserva } from "../servicios/persistenciaReserva.js";

// Obtener destinos y cargar el select
const destinos = await obtenerDestinos();

// Elementos del DOM para la reserva 
const form = document.getElementById("formReserva");
const select = document.getElementById("destino");
const personasInput = document.getElementById("personas");
const seguroCheck = document.getElementById("seguro");
const totalSpan = document.getElementById("total");
const mensajeDiv = document.getElementById("mensaje");

// Función para cargar el select con los destinos disponibles
function cargarSelect(destinos) {
    select.innerHTML = destinos.map(destino => `
        <option value="${destino.id}">
            ${destino.nombre} - $${destino.precio}
        </option>
    `).join("");
}

// Función para mostrar mensajes de éxito o error
function mostrarMensaje(mensaje, tipo = "success") {
  mensajeDiv.innerHTML = `
    <div class="alert alert-${tipo}">
      ${mensaje}
    </div>
  `;
}

// Función para actualizar el total cada vez que cambie el destino, número de personas o se active/desactive el seguro
function actualizarTotal() {
  const destinoSeleccionado = destinos.find(destino => destino.id === parseInt(select.value));
  const precio = destinoSeleccionado.precio;
  const personas = parseInt(personasInput.value) || 1;
  totalSpan.textContent = calcularTotal(precio, personas, seguroCheck.checked);
}

// Inicializar el select y configurar eventos
cargarSelect(destinos);
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Si se recibe un ID por URL, preseleccionar ese destino en el select
if (id) {
  select.value = id;
}

// Configurar eventos (listeners) para actualizar el total en tiempo real
select.addEventListener("change", actualizarTotal);
personasInput.addEventListener("input", actualizarTotal);
seguroCheck.addEventListener("change", actualizarTotal);

// Manejar el envío del formulario de reserva
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