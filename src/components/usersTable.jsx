import React, { Component } from "react";
import Table from "./table";
import { Link } from "react-router-dom";

class UsersTable extends Component {
  columns = [
    {
      path: "name",
      label: "Nombre",
      content: (user) => (
        <Link className="link-light" to={`/users/${user._id}`}>
          {user.name}
        </Link>
      ),
    },
    { path: "vehiculo.name", label: "Vehiculo" },
    { path: "numeroDePuertas.name", label: " #Puertas" },
    { path: "cilindraje.name", label: "Cilindraje" },
    { path: "tiempos.name", label: "Tiempos" },
    { path: "modelo", label: "Modelo" },
    { path: "numeroDePlaca", label: "#Placa" },
    { path: "cedulaUsuario", label: "Cédula" },
  ];
  render() {
    const { users, sortColumn, onSort } = this.props;
    return (
      <Table
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.columns}
      />
    );
  }
}

export default UsersTable;
