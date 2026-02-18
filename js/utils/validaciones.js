export function validarNombre(nombre) {
  return /^[A-Za-z\s]+$/.test(nombre);
}

export function validarEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}
