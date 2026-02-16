import React, { useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { ColaboradoresOfflineCard } from "./colaboradoresOfflineCard";
import { tiempoAleatorio } from "../../../helpers/functions.jsx"

/*
Added by: Luis A. Sierra
Added Date: 26/12/2024

Remove: useEffect( getOperadoresOff )
Added:  useEffect(getOperadoresOff) with setInterval()

*/

export const ColaboradoresOffline = () => {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const estatusColaboradesProc = import.meta.env.VITE_APP_API_estatusOperadores;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;
  const [operadoresOff, setOperadoresOff] = React.useState(null);

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const getOperadoresOff = async () => {
    const response = await axios.get(baseUrl + estatusColaboradesProc, config);
    setOperadoresOff(response.data);
  };

/*
  useEffect(() => {
    getOperadoresOff();
  }, []); */

  useEffect(() => {

    setInterval(() => {
  
      getOperadoresOff();
  
    }, tiempoAleatorio);

  }, []);


  if (!operadoresOff) {
    return null;
  }

  const colaboradoresLogOut =
    operadoresOff?.length > 0 &&
    operadoresOff.filter((colaboradores) => colaboradores.ACCION === "LOGOUT");

  return (
    <>
      <div>
        <Row className="rowTitle">
          <h3 className="title" style={{ textAlign: "center" }}>
          Colaboradores Desconectados
          </h3>
        </Row>

        <Row className="colaboradoresOffline">
          {colaboradoresLogOut.length 
            ? colaboradoresLogOut.map((operadoresOff, index) => {
                const name = operadoresOff.NOMBRE;
                const nameDivider = name.split(" ");
                return (
                  <Col lg={12} md={4} sm={6} xs={12} key={index}>
                    <ColaboradoresOfflineCard
                      operadoresOff={operadoresOff}
                      nameDivider={nameDivider}
                    />
                  </Col>
                );
              })
            : null}
        </Row>
      </div>
    </>
  );
};
