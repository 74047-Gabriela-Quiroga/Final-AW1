const form = document.getElementById("formContacto");
const mensajeDiv = document.getElementById("mensajeDiv");
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
  mostrarMensaje("Mensaje enviado correctamente!", "success");
  form.reset();
});


// Validar que el campo de teléfono solo acepte números
telefonoInput.addEventListener("input", () => {
  telefonoInput.value = telefonoInput.value.replace(/\D/g, "");
});