import * as vehiculosAPI from "./fakeVehicleService";
import * as cilindrajeAPI from "./fakeVehicleService";
import * as tiemposAPI from "./fakeVehicleService";
import * as numeroDePuertasAPI from "./fakeVehicleService";

const users = [
  {
    _id: "4a",
    name: "Alejandro Velandia",
    vehiculo: { _id: "1", name: "Carro" },
    modelo: "Ford-Explorer",
    numeroDePuertas: { _id: "3.3", name: "5P" },
    numeroDePlaca: "123-ABC",
    cedulaUsuario: "1234567821",
  },
  {
    _id: "5b",
    name: "Alfredo Lozada",
    vehiculo: { _id: "2", name: "Moto" },
    cilindraje: { _id: "1.2", name: "250" },
    tiempos: { _id: "2.2", name: "4T" },
    numeroDePlaca: "334-CCD",
    cedulaUsuario: "1018522822",
  },
  {
    _id: "6c",
    name: "Juan Tirri",
    vehiculo: { _id: "3", name: "Bicicleta" },
    cedulaUsuario: "1345980965",
  },
  {
    _id: "7d",
    name: "Andres Restrepo",
    vehiculo: { _id: "1", name: "Carro" },
    modelo: "Peougeot 208",
    numeroDePuertas: { _id: "3.3", name: "5P" },
    numeroDePlaca: "778-ESP",
    cedulaUsuario: "1018512922",
  },
];

export function getUsers() {
  return users;
}

export function getUser(id) {
  return users.find((u) => u._id === id);
}

export function saveUser(user) {
  let userInDb = users.find((u) => u._id === user._id || {});
  userInDb.name = user.name;
  userInDb.modelo = user.modelo;
  userInDb.numeroDePlaca = user.numeroDePlaca;
  userInDb.cedulaUsuario = user.cedulaUsuario;
  userInDb.vehiculo = vehiculosAPI.vehiculos.find(
    (v) => v._id === user.vehiculoId
  );
  userInDb.cilindraje = cilindrajeAPI.cilindraje.find(
    (c) => c._id === user.cilindrajeId
  );
  userInDb.tiempos = tiemposAPI.tiempos.find((t) => t._id === user.tiemposId);
  userInDb.numeroDePuertas = numeroDePuertasAPI.numeroDePuertas.find(
    (n) => n._id === user.numeroDePuertasId
  );

  if (!userInDb._id) {
    userInDb._id = Date.now().toString();
    users.push(userInDb);
  }

  return userInDb;
}
