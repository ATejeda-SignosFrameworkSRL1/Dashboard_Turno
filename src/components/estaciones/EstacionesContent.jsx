import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { EstacionesCards } from "./EstacionesCards";
import { tiempoAleatorio } from "../../helpers/functions.jsx"


/*
Added by: Luis A. Sierra
Added Date: 26/12/2024

Remove: useEffect( getEstacionesCards )
Added:  useEffect(getEstacionesCards) with setInterval()

*/

export const EstacionesContent = function () {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const estatusColaboradesProc = import.meta.env
    .VITE_APP_API_estatusColaboradores;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;
  const [colaboradores, setColaboradores] = useState(null);

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const getEstacionesCards = async () => {
    try {
      const response = await axios.get(
        baseUrl + estatusColaboradesProc,
        config
      );
      setColaboradores(response.data);
    } catch (error) {
      console.error("Error al obtener el nuevo valor del contador:", error);
    }
  };

  /*
  useEffect(() => {
    getEstacionesCards();
  }, []);*/
    
  useEffect(() => {

    setInterval(() => {
  
      getEstacionesCards();
  
    }, tiempoAleatorio);

  }, []);
  
  
  if (!colaboradores) {
    return null;
  }

  const clientesFiltrados = colaboradores?.filter(
    (colaboradores) => colaboradores.NombreCita !== null
  );

  return (
    <>
      <div>
        <Row className="rowTitle" style={{ margin: "0.5em" }}>
          <h3 className="title" style={{ textAlign: "center" }}>
          Estado de las estaciones
          </h3>
        </Row>
        <Row className="estacionesCards">
          {colaboradores.length
            ? colaboradores.map((estColaboradores, index) => {
                const name = estColaboradores.NombreEmpleado;
                const nameDivider = name.split(" ");
                return (
                  <Col
                    xs="auto"
                    key={index}
                    style={{ paddingLeft: "4px", paddingRight: "4px" }}
                  >
                    <EstacionesCards
                      estColaboradores={estColaboradores}
                      nameDivider={nameDivider}
                      clientesFiltrados={clientesFiltrados}
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
