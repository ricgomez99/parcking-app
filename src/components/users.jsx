import React, { Component } from "react";
import UsersTable from "./usersTable";
import Pagination from "./pagination";
import _ from "lodash";
import { Link } from "react-router-dom";
import { getUsers } from "./services/fakeUserService";
import { paginate } from "../utils/paginate";
import {
  getVehiculos,
  getCilindraje,
  getTiempos,
  getNumeroDePuertas,
} from "./services/fakeVehicleService";

class Users extends Component {
  state = {
    users: [],
    vehiculos: [],
    cilindraje: [],
    tiempos: [],
    numeroDePuertas: [],
    currentPage: 1,
    pageSize: 3,
    sortColumn: { path: "name", order: "asc" },
  };

  componentDidMount() {
    const vehiculos = [{ _id: "", name: "Vehiculos" }, ...getVehiculos()];
    const cilindraje = [{ _id: "", name: "Cilindraje" }, ...getCilindraje()];
    const tiempos = [{ _id: "", name: "Tiempos" }, ...getTiempos()];
    const numeroDePuertas = [
      { _id: "", name: "#Puertas" },
      ...getNumeroDePuertas(),
    ];
    this.setState({
      users: getUsers(),
      vehiculos,
      cilindraje,
      tiempos,
      numeroDePuertas,
    });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPageData = () => {
    const { currentPage, sortColumn, pageSize, users: allUsers } = this.state;

    let filtered = allUsers;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const users = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: users };
  };

  render() {
    const { length: count } = this.state.users;
    const { sortColumn, currentPage, pageSize } = this.state;
    const { totalCount, data: users } = this.getPageData();

    if (count === 0)
      return (
        <p className="alert alert-danger" role="alert">
          No hay vehiculos en la base de datos.
        </p>
      );

    return (
      <div className="d-flex justify-content-center">
        <div className="col-md-5">
          <UsersTable
            users={users}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
          <Link
            to="/users/car"
            className="btn btn-primary m-2"
            style={{ marginBottom: 20 }}
          >
            Registrar Carro
          </Link>
          <Link
            to="/users-2/mot"
            className="btn btn-primary m-2"
            style={{ marginBottom: 20 }}
          >
            Registrar Moto
          </Link>
          <Link
            to="/users-3/bike"
            className="btn btn-primary m-2"
            style={{ marginBottom: 20 }}
          >
            Registrar Bicicleta
          </Link>
        </div>
      </div>
    );
  }
}

export default Users;
