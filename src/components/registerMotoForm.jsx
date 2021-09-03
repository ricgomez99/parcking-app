import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { saveUser, getUser } from "./services/fakeUserService";
import {
  getVehiculos,
  getCilindraje,
  getTiempos,
} from "./services/fakeVehicleService";

class RegisterMotoForm extends Form {
  state = {
    data: {
      name: "",
      vehiculosId: "",
      cilindrajeId: "",
      tiemposId: "",
      modelo: "",
      numeroDePlaca: "",
      cedulaUsuario: "",
    },
    vehiculos: [],
    cilindraje: [],
    tiempos: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Nombre"),
    vehiculosId: Joi.string().label("Vehiculo"),
    cilindrajeId: Joi.string().label("Cilindraje"),
    tiemposId: Joi.string().label("Tiempos"),
    modelo: Joi.string().label("Modelo"),
    numeroDePlaca: Joi.string().min(0).max(7).label("Número de Placa"),
    cedulaUsuario: Joi.string().alphanum().min(0).max(10).label("Cédula"),
  };
  componentDidMount() {
    const vehiculos = getVehiculos();
    this.setState({ vehiculos });
    const cilindraje = getCilindraje();
    this.setState({ cilindraje });
    const tiempos = getTiempos();
    this.setState({ tiempos });

    const userId = this.props.match.params.id;
    if (userId === "mot") return;

    const user = getUser(userId);
    if (!user) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(user) });
  }
  mapToViewModel(user) {
    return {
      _id: user._id,
      name: user.name,
      vehiculosId: user.vehiculos._id,
      cilindrajeId: user.cilindraje._id,
      tiemposId: user.tiempos._id,
      modelo: user.modelo,
      numeroDePlaca: user.numeroDePlaca,
      cedulaUsuario: user.cedulaUsuario,
    };
  }
  doSubmit() {
    saveUser(this.state.data);

    this.props.history.push("/users");
  }

  render() {
    return (
      <div className="col-md-4 offset-md-4">
        <h1>Registro de Motocicletas </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Nombre")}
          {this.renderSelect("vehiculosId", "Vehículo", this.state.vehiculos)}
          {this.renderInput("modelo", "Modelo")}
          {this.renderSelect(
            "cilindrajeId",
            "Cilindraje",
            this.state.cilindraje
          )}
          {this.renderSelect("tiemposId", "Tiempos", this.state.tiempos)}
          {this.renderInput("numeroDePlaca", "Número de Placa")}
          {this.renderInput("cedulaUsuario", "Cédula")}
          {this.renderButton("Registrar")}
        </form>
      </div>
    );
  }
}

export default RegisterMotoForm;
