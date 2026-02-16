import React from "react";
import { Card, Row } from "react-bootstrap";

export const TurnosTransferidosCard = ({ turTransferido }) => {
  return (
    <>
      <Card
        className={
          turTransferido.ERROR === 1 && turTransferido.TIEMPOESPERA < 1000
            ? "turTransferidoYellow"
            : turTransferido.ERROR === 2 && turTransferido.TIEMPOESPERA < 1000
            ? "turTransferidoRed"
            : turTransferido.TIEMPOESPERA > 999
            ? "turTransferidoOrange"
            : "turTransferidoGray"
        }
      >
        <Card.Body style={{ padding: "0px" }}>
          <h6
            className={
              turTransferido.ERROR === 1 && turTransferido.TIEMPOESPERA < 1000
                ? "turTransferidoCardTitleYellow"
                : "turTransferidoCardTitleAll"
            }
          >
            {turTransferido.Descripcion.length > 15
              ? `${turTransferido.Descripcion.slice(0, 17)}...`
              : turTransferido.Descripcion}
          </h6>
          <Row>
            <div className="d-flex justify-content-around">
              <div className="turTransferidoCardBody align-middle">
                <h6 style={{ margin: "0px" }}>
                  {turTransferido.CANTIDAD} Turno
                </h6>
              </div>
              <div className="turTransferidoCardBody">
                <h6 style={{ margin: "0px" }}>
                  {turTransferido.TIEMPOESPERA > 999
                    ? "∞ min"
                    : `${turTransferido.TIEMPOESPERA} min`}
                </h6>
              </div>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
