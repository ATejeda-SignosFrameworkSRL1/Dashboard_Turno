import React from "react";
import { Row, Card } from "react-bootstrap";

export const CantidadDeTurnosCard = ({ canturno }) => {
  return (
    <>
      <Card
        className={
          canturno.ERROR === 1 && canturno.TIEPOESPERA < 1000
            ? "canturnoYellow"
            : canturno.ERROR === 2 && canturno.TIEPOESPERA < 1000
            ? "canturnoRed"
            : canturno.TIEPOESPERA > 999
            ? "canturnoOrange"
            : "canturnoGray"
        }
      >
        <Card.Body style={{ padding: "0px" }}>
          <h6
            className={
              canturno.ERROR === 1 && canturno.TIEPOESPERA < 1000
                ? "canturnoCardTitleYellow"
                : "canturnoCardTitleAll"
            }
          >
            {canturno.DESCRIPCION.length > 15
              ? `${canturno.DESCRIPCION.slice(0, 17)}...`
              : canturno.DESCRIPCION}
          </h6>
          <Row>
            <div className="d-flex justify-content-around">
              <div className="canturnoCardBody align-middle">
                <h6 style={{ margin: "0px" }}>{canturno.CANTIDAD} Turno</h6>
              </div>
              <div className="canturnoCardBody">
                <h6 style={{ margin: "0px" }}>
                  {canturno.TIEPOESPERA > 999
                    ? "∞ min"
                    : `${canturno.TIEPOESPERA} min`}
                </h6>
              </div>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
