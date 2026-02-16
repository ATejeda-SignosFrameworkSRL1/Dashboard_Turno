import React from "react";
import { Row, Col } from "react-bootstrap";
import { ConfiguracionRecomendada } from "./ConfiguracionRecomendada";
import { UltimasConfiguraciones } from "./UltimasConfiguraciones";

export const ConfiguracionContent = () => {
  let ultimasConfig = localStorage.getItem("ultimasConfig");

  if (ultimasConfig === null || ultimasConfig === "") {
    localStorage.setItem("ultimasConfig", JSON.stringify([]));
  } else {
    ultimasConfig = JSON.parse(ultimasConfig);
  }

  return (
    <>
      <div className="d-flex flex-column px-3 mt-3" style={{ width: "100%" }}>
        <div className="custom-header"><h2 className="text-white fw-bold">Configuración General</h2></div>
        {/*<hr className="mt-0" style={{ border: "1px solid white" }} /> */ }
        <Row>
          <Col md={6} sm={12}>
            <ConfiguracionRecomendada />
          </Col>
          <Col md={6} sm={12}>
            <UltimasConfiguraciones ultimasConfig={ultimasConfig} />
          </Col>
        </Row>
      </div>
    </>
  );
};
