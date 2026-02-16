import React from "react";
import { Accordion } from "react-bootstrap";

export const AccordionFilter = () => {
  return (
    <>
      <div className="my-2 px-1">
        <Accordion className="custom-accordion ">
          <Accordion.Item eventKey="0" className="custom-accordion custom-accordion-item">
            <Accordion.Header>
              <div className="d-flex align-items-center justify-content-center">
                <h6
                  className="d-flex align-items-center"
                  style={{ margin: "0px", fontWeight: "600" }}
                >
                  Filtrar Por:
                </h6>
                <h6
                  className="d-flex align-items-center"
                  style={{ margin: "0px", marginLeft: "10px" }}
                >
                  Ninguno
                </h6>
              </div>
            </Accordion.Header>
            <Accordion.Body>Nombre</Accordion.Body>
            <Accordion.Body>Usuario</Accordion.Body>
            <Accordion.Body>Fecha</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};
