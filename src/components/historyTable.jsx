import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
} from "@material-ui/core";

//API source y CSS styling
const baseUrl = "http://localhost:3002/usuarios/";
const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px #c9c9c9",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: { cursor: "pointer" },
  inputMaterial: {
    width: "80%",
  },
}));

//Toma de datos
const HistoryTable = () => {
  const [data, setData] = useState([]);
  const styles = useStyles();
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    nombre: "",
    apellido_paterno: "",
    username: "",
    id: "",
  });
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  //Typing change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(usuarioSeleccionado);
  };

  // Peticiones
  const peticionGet = async () => {
    await axios.get(baseUrl).then((response) => {
      setData(response.data);
    });
  };
  const peticionPost = async () => {
    await axios.post(baseUrl, usuarioSeleccionado).then((response) => {
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    });
  };
  const peticionPut = async () => {
    await axios
      .put(baseUrl + usuarioSeleccionado.id, usuarioSeleccionado)
      .then((response) => {
        let dataNueva = data;
        dataNueva.map((usuario) => {
          if (usuarioSeleccionado.id === usuario.id) {
            usuario.nombre = usuarioSeleccionado.nombre;
            usuario.apellido_paterno = usuarioSeleccionado.apellido_paterno;
            usuario.username = usuarioSeleccionado.username;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      });
  };
  const peticionDelete = async () => {
    await axios.delete(baseUrl + usuarioSeleccionado.id).then((response) => {
      setData(data.filter((usuario) => usuario.id !== usuarioSeleccionado.id));
      abrirCerrarModalEliminar();
    });
  };
  // Final de Peticiones

  // Metodos: Eliminar, Editar, selección
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };
  const seleccionarUsuario = (usuario, caso) => {
    setUsuarioSeleccionado(usuario);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };
  useEffect(async () => {
    await peticionGet();
  }, []);

  //Inserción de datos en Modal(Insertar)
  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar nuevo usuario</h3>
      <TextField
        name="nombre"
        className={styles.inputMaterial}
        label="Nombre"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="apellido_paterno"
        className={styles.inputMaterial}
        label="Apellido"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="username"
        className={styles.inputMaterial}
        label="Username"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="id"
        className={styles.inputMaterial}
        label="Celda"
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  );
  //Inserción de datos en Modal(Editar)
  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar usuario</h3>
      <TextField
        name="nombre"
        className={styles.inputMaterial}
        label="Nombre"
        onChange={handleChange}
        value={usuarioSeleccionado && usuarioSeleccionado.nombre}
      />
      <br />
      <TextField
        name="apellido_paterno"
        className={styles.inputMaterial}
        label="Apellido"
        onChange={handleChange}
        value={usuarioSeleccionado && usuarioSeleccionado.apellido_paterno}
      />
      <br />
      <TextField
        name="username"
        className={styles.inputMaterial}
        label="Username"
        onChange={handleChange}
        value={usuarioSeleccionado && usuarioSeleccionado.username}
      />
      <br />
      <TextField
        name="id"
        className={styles.inputMaterial}
        label="Celda"
        onChange={handleChange}
        value={usuarioSeleccionado && usuarioSeleccionado.id}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>
          Editar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );
  //Inserción de datos en Modal(Eliminar)
  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        <b>
          Estas seguro de querer eliminar el usuario
          {usuarioSeleccionado && usuarioSeleccionado.username}?
        </b>
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>
          Si
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );

  //Render de Modal y Tabla (Material UI)
  return (
    <div className="table md-2">
      <br />
      <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
      <br />
      <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Celda</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.apellido_paterno}</TableCell>
                <TableCell>{usuario.username}</TableCell>
                <TableCell>{usuario.id}</TableCell>
                <TableCell>
                  <Edit
                    className={styles.iconos}
                    onClick={() => seleccionarUsuario(usuario, "Editar")}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <Delete
                    className={styles.iconos}
                    onClick={() => seleccionarUsuario(usuario, "Eliminar")}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>
      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>
      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
};

export default HistoryTable;
