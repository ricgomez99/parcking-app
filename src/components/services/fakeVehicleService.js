export const vehiculos = [
  { _id: "1", name: "Carro" },
  { _id: "2", name: "Moto" },
  { _id: "3", name: "Bicicleta" },
];

export function getVehiculos() {
  return vehiculos.filter((v) => v);
}

export const cilindraje = [
  { _id: "1.1", name: "125" },
  { _id: "1.2", name: "250" },
  { _id: "1.3", name: "500" },
];

export function getCilindraje() {
  return cilindraje.filter((c) => c);
}

export const tiempos = [
  { _id: "2.1", name: "2T" },
  { _id: "2.2", name: "4T" },
];

export function getTiempos() {
  return tiempos.filter((t) => t);
}

export const numeroDePuertas = [
  { _id: "3.1", name: "2P" },
  { _id: "3.2", name: "3P" },
  { _id: "3.3", name: "5P" },
];

export function getNumeroDePuertas() {
  return numeroDePuertas.filter((n) => n);
}
