import React, { useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { TurnosTransferidosCard } from "./turnosTransferidosCard";
import { tiempoAleatorio } from "../../../helpers/functions.jsx"

/*
Added by: Luis A. Sierra
Added Date: 26/12/2024

Remove: useEffect( getTurnosTransferidos )
Added:  useEffect(getTurnosTransferidos) with setInterval()

*/

export const TurnosTransferidos = function () {
  
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
 
  const turnosTransferidosProc = import.meta.env.VITE_APP_API_turnosTransferidos;
  
  const ApiKey = import.meta.env.VITE_APP_APIKEY;

  const [turnoTransferido, setTurnoTransferido] = React.useState(null);

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const getTurnosTransferidos = async () => {
    const response = await axios.get(baseUrl + turnosTransferidosProc, config);
    setTurnoTransferido(response.data);
  };

  useEffect(() => {

    setInterval(() => {
  
      getTurnosTransferidos();
  
    }, tiempoAleatorio);

  }, []);
  
  /*
  useEffect(() => {
    getTurnosTransferidos();
  }, []); */


  if (!turnoTransferido) {
    return null;
  }

  return (
    <>
      <div>
        <Row className="rowTitle">
          <h3 className="title">Turnos transferidos</h3>
        </Row>

        <Row className="TurnosTransferidos">
          { turnoTransferido.length ? turnoTransferido.map((turTransferido, index) => (
                <Col
                  xs="auto"
                  key={index}
                  style={{ paddingLeft: "8px", paddingRight: "8px" }}
                >
                  <TurnosTransferidosCard turTransferido={turTransferido} />
                </Col>
              ))
            : null}
        </Row>
      </div>
    </>
  );

};
