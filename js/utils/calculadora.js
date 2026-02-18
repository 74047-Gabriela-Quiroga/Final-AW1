export function calcularTotal(precio, personas, seguro) {
  let total = precio * personas;
  if (seguro) total += 5000;
  return total;
}