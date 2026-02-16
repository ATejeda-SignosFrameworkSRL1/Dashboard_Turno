import React from "react";
import { Card } from "react-bootstrap";
import { TiempoNotificado } from "./tiempoNotificado";
import { TiempoGlobal } from "./tiempoGlobal";
import { TiempoUltimoEstatus } from "./tiempoUltimoEstatus";

export const EstacionesCards = ({
  estColaboradores,
  nameDivider,
  clientesFiltrados,
}) => {
  return (
    <>
      <Card
        className={
          estColaboradores.ERROR === 1
            ? "cardGray"
            : estColaboradores.ERROR === 2
            ? "cardGreen"
            : estColaboradores.ERROR === 3
            ? "cardBlue"
            : estColaboradores.ERROR === 4
            ? "cardGreenSpecial"
            : "cardGray"
        }
      >
        <div className="d-flex rowImgName">
          <div className="col-5">
            <img
              src={`data:image/jpeg;base64,${estColaboradores.Foto}`}
              className="cardImg"
            />
          </div>
          {nameDivider.length === 1 ? (
            <div className="cardName">
              <h5> </h5>
              <h5> {estColaboradores.NombreEmpleado} </h5>
              <h6> {estColaboradores.GrupoEstacion} </h6>
            </div>
          ) : nameDivider.length === 2 ? (
            <div className="col-7 cardName">
              <h5 style={{ marginBottom: "0px" }}>{nameDivider[0]}</h5>
              <h5> {nameDivider[1]} </h5>
              <h6> {estColaboradores.GrupoEstacion} </h6>
            </div>
          ) : (
            <div className="cardName">
              <h5> {estColaboradores.NombreEmpleado} </h5>
              <h6> {estColaboradores.GrupoEstacion} </h6>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-between rowEstacionTurno">
          <div className="estacion">
            <h5> {estColaboradores.NumeroEstacion} </h5>
            <h6>Estación de {estColaboradores.DescripcionPantalla}</h6>
          </div>
          <div className="turno">
            <h5>Turno:</h5>
            <h6>{estColaboradores.Turno}</h6>
            {estColaboradores.TiempoGlobal === "+24 horas" ? (
              <h6>+24 horas</h6>
            ) : (
              <TiempoGlobal colaborador={estColaboradores.TiempoGlobal} />
            )}
          </div>
        </div>

        {estColaboradores.EstatusTurno === "Disponible" ? (
          <div className="d-flex rowEstatus justify-content-center align-items-center">
            <h6>{estColaboradores.EstatusTurno}</h6>
          </div>
        ) : (
          <div className="d-flex rowEstatus justify-content-around align-items-center">
            <h6>{estColaboradores.EstatusTurno}</h6>
            {estColaboradores.TiempoUltimoEstatus === "+24 horas" ? (
              <h6>+24 horas</h6>
            ) : (
              <TiempoUltimoEstatus
                colaborador={estColaboradores.TiempoUltimoEstatus}
              />
            )}
          </div>
        )}
        {clientesFiltrados.length ? (
          <>
            {estColaboradores.NombreCita !== null ? (
              <div className="d-flex rowPaciente justify-content-center align-items-center">
                <h6>{estColaboradores.NombreCita}</h6>
              </div>
            ) : estColaboradores.NombreCita !== null ? (
              <div className="d-flex rowPaciente justify-content-center align-items-center">
                <h6>{estColaboradores.NombreCita}</h6>
              </div>
            ) : (
              <div className="d-flex rowPacienteNull justify-content-center align-items-center">
                <h6>{estColaboradores.NombreCita}</h6>
              </div>
            )}
          </>
        ) : null}
      </Card>
    </>
  );
};
