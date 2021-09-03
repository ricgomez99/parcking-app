import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import axios from "axios";
import md5 from "md5";
import Calendar from "./calendar";
import Cookies from "universal-cookie";

const baseUrl = "http://localhost:3002/usuarios";
const cookies = new Cookies();

class IngresoForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Name"),
    password: Joi.string().required().min(0).max(10).label("Numero de Cedula"),
  };

  iniciarSesion = async () => {
    await axios
      .get(baseUrl, {
        params: {
          username: this.state.data.username,
          password: md5(this.state.data.password),
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          let respuesta = response[0];
          cookies.set("id", respuesta.id, { path: "/" });
          cookies.set("apellido_paterno", respuesta.apellido_paterno, {
            path: "/",
          });
          cookies.set("nombre", respuesta.nombre, { path: "/" });
          cookies.set("username", respuesta.username, { path: "/" });
          alert(`Ingresando ${respuesta.nombre} ${respuesta.apellido_paterno}`);
        } else {
          alert("El usuario o contraseña, no son correctos.");
        }
      })
      .catch((error) => console.log(error));
  };

  doSubmit() {
    console.log("submitted");
  }

  render() {
    return (
      <div className="col-md-4 offset-md-4">
        <h1>Ingreso</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Nombre de usuario")}
          {this.renderInput("password", "Numero de Cedula")}
          {<Calendar />}
          <button
            className="btn btn-primary m-2 "
            onClick={() => this.iniciarSesion}
          >
            Ingresar
          </button>
        </form>
      </div>
    );
  }
}

export default IngresoForm;
