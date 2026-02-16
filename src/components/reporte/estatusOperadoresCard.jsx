import React from "react";
import { Card } from "react-bootstrap";
import { TiempoReporte } from "./TiempoReporte";

export const EstatusOperadoresCard = ({ operadoresReporte, nameDivider }) => {
  return (
    <>
      <Card className="cardGray">
        <div className="d-flex rowImgName">
          <div className="col-5">
            <img
              src={`data:image/jpeg;base64,${operadoresReporte.Foto}`}
              className="cardImg"
            />
          </div>
          {nameDivider.length === 1 ? (
            <div className="cardName">
              <h5> </h5>
              <h5> {operadoresReporte.NOMBRE} </h5>
              <h6> {operadoresReporte.DESCRIPCION} </h6>
            </div>
          ) : nameDivider.length === 2 ? (
            <div className="col-7 cardName">
              <h5 style={{ marginBottom: "0px" }}>{nameDivider[0]}</h5>
              <h5> {nameDivider[1]} </h5>
              <h6> {operadoresReporte.DESCRIPCION} </h6>
            </div>
          ) : (
            <div className="cardName">
              <h5> {operadoresReporte.NOMBRE} </h5>
              <h6> {operadoresReporte.DESCRIPCION} </h6>
            </div>
          )}
        </div>
        <div className="rowReporte">
          <div className="row">
            <div className="col-8">
              <h5 className="tipoReporte"> Atendidos </h5>
            </div>
            <div className="col-4">
              <h5 className="cantidadReporte">{operadoresReporte.ATENDIDOS}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <h5 className="tipoReporte"> Finalizados </h5>
            </div>
            <div className="col-4">
              <h5 className="cantidadReporte">{operadoresReporte.FINALIZADO}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <h5 className="tipoReporte"> Declinados </h5>
            </div>
            <div className="col-4">
              <h5 className="cantidadReporte">{operadoresReporte.DECLINADOS}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <h5 className="tipoReporte"> Transferidos </h5>
            </div>
            <div className="col-4">
              <h5 className="cantidadReporte">{operadoresReporte.TRANSFERIDOS}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <h5 className="tipoReporte"> En espera </h5>
            </div>
            <div className="col-4">
              <h5 className="cantidadReporte">{operadoresReporte.ESPERA}</h5>
            </div>
          </div>
        </div>
        <div className="d-flex rowReporte justify-content-around align-items-center">
          {operadoresReporte.ACCION === "LOGIN" ? (
            <h5> Conectado: </h5>
          ) : (
            <h6> Desconectado: </h6>
          )}
          <TiempoReporte operador={operadoresReporte.TIEMPOLOGUSUARIO} />
        </div>
      </Card>
    </>
  );
};
