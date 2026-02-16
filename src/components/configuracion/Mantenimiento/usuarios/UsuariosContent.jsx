import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { Search } from "../../../utils/Search";
import { AgregarRegistro } from "../../../utils/AgregarRegistro";
import { TableUsuarios } from "./TableUsuarios";
import { Loading } from "../../../utils/Loading";

export const UsuariosContent = () => {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const totalUsuariosProc = import.meta.env.VITE_APP_API_totalUsuarios;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;

  const [search, setSearch] = useState("");
  const [usuariosData, setUsuariosData] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const getTotalUsuarios = async () => {
    try {
      const response = await axios.get(baseUrl + totalUsuariosProc, config);
      setUsuariosData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  const addNewUser = () => {
    location.href = `/mantenimiento/usuarios/nuevo-usuario`;
  };

  useEffect(() => {
    getTotalUsuarios();
  }, []);

  return (
    <>
      <div className="d-flex flex-column px-3 mt-3" style={{ width: "100%" }}>
        <h2 className="text-white fw-bold custom-header">Usuarios</h2>
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
                <AgregarRegistro funcion={addNewUser} registro={"Usuario"} />
              </Col>
            </Row>
            <TableUsuarios usuariosData={usuariosData} search={search} />
          </>
        )}
      </div>
    </>
  );
};
