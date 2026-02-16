import React from "react";
import { Card } from "react-bootstrap";
import { TiempoTurno } from "./tiempoTurno";

export const ColaboradoresOnlineCard = ({ operadoresOn, nameDivider, clientesFiltrados }) => {
  return (
    <>
      <Card
        className={
          operadoresOn.error === 1
            ? "cardYellow"
            : operadoresOn.error === 2
            ? "cardRed"
            : operadoresOn.error === 3
            ? "cardGreen"
            : "cardGray"
        }
      >
        <div className="d-flex rowImgName">
          <div className="col-5">
            <img
              src={`data:image/jpeg;base64,${operadoresOn.Foto}`}
              className="cardImg"
            />
          </div>
          {nameDivider.length === 1 ? (
            <div className="cardName">
              <h5> </h5>
              <h5> {operadoresOn.NOMBRE} </h5>
              <h6> {operadoresOn.DESCRIPCION} </h6>
            </div>
          ) : nameDivider.length === 2 ? (
            <div className="col-7 cardName">
              <h5 style={{ marginBottom: "0px" }}>{nameDivider[0]}</h5>
              <h5> {nameDivider[1]} </h5>
              <h6> {operadoresOn.DESCRIPCION} </h6>
            </div>
          ) : (
            <div className="cardName">
              <h5> {operadoresOn.NOMBRE} </h5>
              <h6> {operadoresOn.DESCRIPCION} </h6>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-around rowEstacionTurno">
          <div className="estacion">
            <h5> {operadoresOn.NumeroEstacion} </h5>
            <h6>Estación de {operadoresOn.DescripcionPantalla}</h6>
          </div>
          <div className="turno">
            <h5>Turno:</h5>
            <h6>{operadoresOn.TURNO}</h6>
            {operadoresOn.TIEMPO !== "--:--:--" ? (
              <TiempoTurno operadoresOn={operadoresOn.TIEMPO} />
            ) : (
              <h6> --:--:-- </h6>
            )}
          </div>
        </div>
        <div className="d-flex rowEstatus justify-content-center align-items-center">
          <h6>{operadoresOn.MENSAJE}</h6>
        </div>

        {clientesFiltrados.length ? (
          <>
            {operadoresOn.NombreCita !== null ? (
              <div className="d-flex rowPaciente justify-content-center align-items-center">
                <h6>{operadoresOn.NombreCita}</h6>
              </div>
            ) : (
              <div className="d-flex rowPacienteNull justify-content-center align-items-center">
                <h6>{operadoresOn.NombreCita}</h6>
              </div>
            )}
          </>
        ) : null}
      </Card>
    </>
  );
};