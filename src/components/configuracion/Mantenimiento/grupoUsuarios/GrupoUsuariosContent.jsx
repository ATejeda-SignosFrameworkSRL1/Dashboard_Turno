import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Modal } from "react-bootstrap";
import { Search } from "../../../utils/Search";
import { AgregarRegistro } from "../../../utils/AgregarRegistro";
import { TableGrupoUsuarios } from "./TableGrupoUsuarios";
import { ModalGrupoUsuarios } from "./ModalGrupoUsuarios";
import { Loading } from "../../../utils/Loading";

export const GrupoUsuariosContent = () => {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const grupoUsuariosProc = import.meta.env.VITE_APP_API_grupoUsuarios;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;

  const [search, setSearch] = useState("");
  const [grupoUsuarios, setGrupoUsuarios] = useState([]);
  const [selectedGrupoUsuario, setSelectedGrupoUsuario] = useState({});
  const [newGrupoUsuario, setNewGrupoUsuario] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newLoad, setNewLoad] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const getGrupoUsuarios = async () => {
    try {
      const response = await axios.get(baseUrl + grupoUsuariosProc, config);
      setGrupoUsuarios(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  const addNewGrupoUsuario = () => {
    setNewGrupoUsuario(true);
    setShow(true);
    setSelectedGrupoUsuario(newGrupoUsuarioObject);
  };

  const newGrupoUsuarioObject = {
    Descripcion: "",
    // Orden: ordenEspecialidad,
    Activo: 0,
  };

  useEffect(() => {
    getGrupoUsuarios();
  }, []);

  useEffect(() => {
    setLoading(true);
    getGrupoUsuarios();
  }, [newLoad]);

  return (
    <>
      <div className="d-flex flex-column px-3 mt-3" style={{ width: "100%" }}>
        <h2 className="text-white fw-bold custom-header">Grupo de Usuarios</h2>
        <hr className="mt-0" style={{ border: "1px solid white" }} />
        {loading ? (
          <Loading />
        ) : (
          <>
            <Row className="d-flex justify-content-between align-items-center">
              <Col xs="auto">
                <Search searc={search} setSearch={setSearch} />
              </Col>
              <Col className="addButtonConfig" xs="auto">
                <AgregarRegistro
                  funcion={addNewGrupoUsuario}
                  registro={"Grupo Usuario"}
                />
              </Col>
            </Row>
            <TableGrupoUsuarios
              grupoUsuarios={grupoUsuarios}
              search={search}
              selectedGrupoUsuario={selectedGrupoUsuario}
              setSelectedGrupoUsuario={setSelectedGrupoUsuario}
              show={show}
              setShow={setShow}
              newLoad={newLoad}
              setNewLoad={setNewLoad}
            />
          </>
        )}
      </div>
      <ModalGrupoUsuarios
        newGrupoUsuario={newGrupoUsuario}
        show={show}
        setShow={setShow}
        grupoUsuario={selectedGrupoUsuario}
        newLoad={newLoad}
        setNewLoad={setNewLoad}
      />
    </>
  );
};
