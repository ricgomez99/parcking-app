import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { saveUser, getUser } from "./services/fakeUserService";
import { getVehiculos } from "./services/fakeVehicleService";

class RegisterBikeForm extends Form {
  state = {
    data: {
      name: "",
      vehiculosId: "",
      cedulaUsuario: "",
    },
    vehiculos: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    vehiculosId: Joi.string().label("Vehiculo"),
    name: Joi.string().required().label("Nombre"),
    cedulaUsuario: Joi.string().alphanum().min(0).max(10).label("Cédula"),
  };
  componentDidMount() {
    const vehiculos = getVehiculos();
    this.setState({ vehiculos });

    const userId = this.props.match.params.id;
    if (userId === "bike") return;

    const user = getUser(userId);
    if (!user) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(user) });
  }
  mapToViewModel(user) {
    return {
      _id: user._id,
      name: user.name,
      vehiculosId: user.vehiculos._id,
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
        <h1>Registro de Bicicletas </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Nombre")}
          {this.renderSelect("vehiculosId", "Vehículo", this.state.vehiculos)}
          {this.renderInput("cedulaUsuario", "Cédula")}
          {this.renderButton("Registrar")}
        </form>
      </div>
    );
  }
}

export default RegisterBikeForm;
