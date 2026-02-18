export async function obtenerDestinos() {
  const response = await fetch("../data/destinos.json");
  if (!response.ok) throw new Error("Error cargando destinos");
  return await response.json();
}