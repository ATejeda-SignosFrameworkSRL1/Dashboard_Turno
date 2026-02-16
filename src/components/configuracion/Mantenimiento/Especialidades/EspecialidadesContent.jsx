import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { Search } from "../../../utils/Search";
import { AgregarRegistro } from "../../../utils/AgregarRegistro";
import { TableEspecialidades } from "./TableEspecialidades";
import { ModalEspecialidad } from "./ModalEspecialidad";
import { Loading } from "../../../utils/Loading";

export const EspecialidadesContent = () => {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const especialidadesProc = import.meta.env.VITE_APP_API_especialidades;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;

  const [search, setSearch] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState({});
  const [newEspecialidad, setNewEspecialidad] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newLoad, setNewLoad] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const getEspecialidades = async () => {
    try {
      const response = await axios.get(baseUrl + especialidadesProc, config);
      setEspecialidades(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  const addNewEspecialidad = () => {
    setNewEspecialidad(true);
    setShow(true);
    setSelectedEspecialidad(newEspecialidadObject);
  };

  const newEspecialidadObject = {
    Descripcion: "",
    // Orden: ordenEspecialidad,
    Activo: 0,
  };

  useEffect(() => {
    getEspecialidades();
  }, []);

  useEffect(() => {
    setLoading(true);
    setNewEspecialidad(false);
    getEspecialidades();
  }, [newLoad]);

  return (
    <>
      <div className="d-flex flex-column px-3 mt-3" style={{ width: "100%" }}>
        <h2 className="text-white fw-bold custom-header">Especialidades</h2>
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
                  funcion={addNewEspecialidad}
                  registro={"Especialidad"}
                />
              </Col>
            </Row>
            <TableEspecialidades
              especialidades={especialidades}
              search={search}
              selectedEspecialidad={selectedEspecialidad}
              setSelectedEspecialidad={setSelectedEspecialidad}
              show={show}
              setShow={setShow}
              newLoad={newLoad}
              setNewLoad={setNewLoad}
            />
          </>
        )}
      </div>
      <ModalEspecialidad
        newEspecialidad={newEspecialidad}
        show={show}
        setShow={setShow}
        especialidad={selectedEspecialidad}
        newLoad={newLoad}
        setNewLoad={setNewLoad}
      />
    </>
  );
};
