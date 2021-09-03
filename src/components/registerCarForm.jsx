import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { saveUser, getUser } from "./services/fakeUserService";
import {
  getVehiculos,
  getNumeroDePuertas,
} from "./services/fakeVehicleService";

class RegisterCarForm extends Form {
  state = {
    data: {
      name: "",
      vehiculosId: "",
      numeroDePuertasId: "",
      modelo: "",
      numeroDePlaca: "",
      cedulaUsuario: "",
    },
    vehiculos: [],
    numeroDePuertas: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Nombre"),
    vehiculosId: Joi.string().label("Vehiculo"),
    numeroDePuertasId: Joi.string().label("Número de Puertas"),
    modelo: Joi.string().label("Modelo"),
    numeroDePlaca: Joi.string().min(0).max(7).label("Número de Placa"),
    cedulaUsuario: Joi.string().alphanum().min(0).max(10).label("Cédula"),
  };

  componentDidMount() {
    const vehiculos = getVehiculos();
    this.setState({ vehiculos });
    const numeroDePuertas = getNumeroDePuertas();
    this.setState({ numeroDePuertas });

    const userId = this.props.match.params.id;
    if (userId === "car") return;

    const user = getUser(userId);
    if (!user) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(user) });
  }

  mapToViewModel(user) {
    return {
      _id: user._id,
      name: user.name,
      vehiculosId: user.vehiculos._id,
      numeroDePuertasId: user.numeroDePuertas._id,
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
        <h1>Registro</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Nombre")}
          {this.renderSelect("vehiculosId", "Vehículo", this.state.vehiculos)}
          {this.renderInput("modelo", "Modelo")}
          {this.renderSelect(
            "numeroDePuertasId",
            "Número de Puertas",
            this.state.numeroDePuertas
          )}
          {this.renderInput("numeroDePlaca", "Número de Placa")}
          {this.renderInput("cedulaUsuario", "Cédula")}
          {this.renderButton("Registrar")}
        </form>
      </div>
    );
  }
}

export default RegisterCarForm;
