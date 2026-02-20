// Funciones de validación para los formularios

// Validar que el nombre solo contenga letras y espacios
export function validarNombre(nombre) {
  return /^[A-Za-z\s]+$/.test(nombre);
}

// Validar formato de email
export function validarEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}
// Validar que el teléfono solo contenga números
export function validarTelefono(telefono) {
  return /^\d+$/.test(telefono);
}