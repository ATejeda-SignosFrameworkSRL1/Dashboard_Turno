import React from "react";
import { Row, Col } from "react-bootstrap";
import { CantidadDeTurnos } from "./cantidadDeTurnos/cantidadDeTurnos";
import { TurnosTransferidos } from "./turnosTransferidos/turnosTransferidos";
import { EstatusEstaciones } from "./estatusEstaciones/estatusEstaciones";
import { ColaboradoresOnline } from "./colaboradoresOnline/colaboradoresOnline";
import { ColaboradoresOffline } from "./colaboradoresOffline/colaboradoresOffline";

export const DashboardContent = () => {
  return (
    <>
      <Row style={{ margin: "0px", display: "flex", justifyContent: "center" }}>
        
        <Col xl={3} lg={3} md={12}>
          <CantidadDeTurnos />
          <TurnosTransferidos/>
          <EstatusEstaciones />
        </Col>

        <Col xl={7} lg={6} md={12}>
          <ColaboradoresOnline />
        </Col>

        <Col xl={2} lg={3} md={12}>
          <ColaboradoresOffline />
        </Col>
      </Row>
    </>
  );
};
