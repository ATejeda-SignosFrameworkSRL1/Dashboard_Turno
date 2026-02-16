import React from "react";
import { Row, Card } from "react-bootstrap";

export const EstatusEstacionesCard = ({ estEstaciones }) => {
  return (
    <>
      <Card className="turTransferidoGray">
        <Card.Body style={{ padding: "0px" }}>
          <h6 className="turTransferidoCardTitleAll">
            {estEstaciones.Estacion.length > 15
              ? `${estEstaciones.Estacion.slice(0, 17)}...`
              : estEstaciones.Estacion}
          </h6>
          <Row>
            <div className="d-flex justify-content-around">
              <div className="turTransferidoCardBody align-middle">
                <h6 style={{ margin: "0px" }}>Onl. {estEstaciones.EnLinea}</h6>
              </div>
              <div className="turTransferidoCardBody">
                <h6 style={{ margin: "0px" }}>
                  Disp. {estEstaciones.Disponibles}
                </h6>
              </div>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
