import React, { useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { CantidadDeTurnosCard } from "./cantidadDeTurnosCard";
import { tiempoAleatorio } from "../../../helpers/functions.jsx"

/*
Added by: Luis A. Sierra
Added Date: 26/12/2024

Remove: useEffect( getCantidadDeTurnos )
Added:  useEffect(getCantidadDeTurnos) with setInterval()

*/

export const CantidadDeTurnos = function () {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const cantidadDeTurnosProc = import.meta.env.VITE_APP_API_cantidadDeTurnos;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;
  const [cantidadTurno, setCantidadTurno] = React.useState(null);

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const getCantidadDeTurnos = async () => {
    const response = await axios.get(baseUrl + cantidadDeTurnosProc, config);
    setCantidadTurno(response.data);
  };

  useEffect(() => {

    setInterval(() => {
  
      getCantidadDeTurnos();
  
    }, tiempoAleatorio);

  }, []);
  
  /*
  useEffect(() => {
    getCantidadDeTurnos();
  }, []); */


  if (!cantidadTurno) {
    return null;
  }

  return (
    <>
      <div>
        <Row className="rowTitle">
          <h3 className="title">Turnos en espera</h3>
        </Row>

        <Row className="cantidadDeTurnos">
          {cantidadTurno.length
            ? cantidadTurno.map((canturno, index) => (
                <Col
                  xs="auto"
                  key={index}
                  style={{ paddingLeft: "8px", paddingRight: "8px" }}
                >
                  <CantidadDeTurnosCard canturno={canturno} />
                </Col>
              ))
            : null}
        </Row>
      </div>
    </>
  );
};
