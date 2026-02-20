// Función para guardar la reserva en localStorage
export function guardarReserva(reserva) {
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  reservas.push(reserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));
}