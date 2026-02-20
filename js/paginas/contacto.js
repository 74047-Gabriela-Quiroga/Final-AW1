import { validarNombre, validarEmail, validarTelefono } from "../utilidades/validaciones.js";

const form = document.getElementById("formContacto");
const mensajeDiv = document.getElementById("mensajeDiv");
const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const telefonoInput = document.getElementById("telefono");

// Función para mostrar mensaje de éxito
function mostrarMensaje(mensaje, tipo = "success") {
  mensajeDiv.innerHTML = `
    <div class="alert alert-${tipo}">
      ${mensaje}
    </div>
  `;
}

// Manejar el envío del mensaje de contacto
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();
  const telefono = telefonoInput.value.trim();
  
  // Validar nombre
  if (!validarNombre(nombre)) {
    mostrarMensaje("El nombre solo debe contener letras y espacios", "danger");
    return;
  }
  
  // Validar email
  if (!validarEmail(email)) {
    mostrarMensaje("Por favor, ingresa un email válido", "danger");
    return;
  }
  
  // Validar teléfono
  if (!validarTelefono(telefono)) {
    mostrarMensaje("El teléfono solo debe contener números", "danger");
    return;
  }
  
  mostrarMensaje("Mensaje enviado correctamente!", "success");
  form.reset();
});


// Validar que el campo de teléfono solo acepte números
telefonoInput.addEventListener("input", () => {
  telefonoInput.value = telefonoInput.value.replace(/\D/g, "");
});