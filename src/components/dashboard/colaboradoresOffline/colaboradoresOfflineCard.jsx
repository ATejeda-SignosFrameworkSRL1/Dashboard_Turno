import React from "react";
import { Card } from "react-bootstrap";
import { TiempoLogOut } from "./tiempoLogOut";

export const ColaboradoresOfflineCard = ({ operadoresOff, nameDivider }) => {
  return (
    <>
      <Card className="cardGray">
        <div className="d-flex rowImgNameOff">
          <div className="col-5" style={{ textAlign: "center" }}>
            <img
              src={`data:image/jpeg;base64,${operadoresOff.Foto}`}
              className={
                operadoresOff.error === 1
                  ? "cardImgOff error"
                  : "cardImgOff normal"
              }
            />
          </div>
          <div className="col-7 cardNameOff">
            {nameDivider.length === 1 ? (
              <h5> {nameDivider[0]} </h5>
            ) : nameDivider.length === 2 ? (
              <h5> {`${nameDivider[0]} ${nameDivider[1]}`} </h5>
            ) : nameDivider.length === 3 ? (
              <h5>{`${nameDivider[0]} ${nameDivider[1]} ${nameDivider[2]}`}</h5>
            ) : (
              <h5>{`${nameDivider[0]} ${nameDivider[1]} ${nameDivider[2]}`}</h5>
            )}
            <h6>
              {" "}
              {operadoresOff.MOTIVO === "Termino de jornada laboral"
                ? "Fin jornada laboral"
                : operadoresOff.MOTIVO}
            </h6>
            <TiempoLogOut operadoresOff={operadoresOff.TIEMPOLOGUSUARIO} />
          </div>
        </div>
      </Card>
    </>
  );
};
