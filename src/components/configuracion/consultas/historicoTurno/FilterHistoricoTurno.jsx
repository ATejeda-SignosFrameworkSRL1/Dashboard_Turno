import React from "react";
import { Row, Col, Form, FloatingLabel } from "react-bootstrap";

export const FilterHistoricoTurno = ({
  turno,
  setTurno,
  fechaIni,
  setFechaIni,
  fechaFin,
  setFechaFin,
  area,
  setArea,
}) => {
  const handleChangeTurno = (e) => {
    const inputTurno = e.target.value.toUpperCase();
    setTurno(inputTurno);
  };

  const handleChangeArea = (e) => {
    const inputArea = e.target.value;
    setArea(inputArea);
  };

  const handleChangeFechaIni = (e) => {
    const inputFechaIni = e.target.value;
    setFechaIni(inputFechaIni);
  };

  const handleChangeFechaFin = (e) => {
    const inputFechaFin = e.target.value;
    setFechaFin(inputFechaFin);
  };

  return (
    <>
      <Row className="g-2">
        <Col lg={3} md={3} sm={12}>
          <FloatingLabel controlId="floatingInputText" label="Turno">
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Turno"
              value={turno}
              onChange={handleChangeTurno}
            />
          </FloatingLabel>
        </Col>
        <Col lg={3} md={3} sm={12}>
          <FloatingLabel controlId="floatingInputText" label="Area">
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Area"
              value={area}
              onChange={handleChangeArea}
            />
          </FloatingLabel>
        </Col>
        <Col lg={3} md={3} sm={12}>
          <FloatingLabel controlId="floatingInputGrid" label="Fecha inicial">
            <Form.Control
              type="date"
              placeholder="Fecha"
              value={fechaIni}
              onChange={handleChangeFechaIni}
            />
          </FloatingLabel>
        </Col>
        <Col lg={3} md={3} sm={12}>
          <FloatingLabel controlId="floatingInputDate" label="Fecha fin">
            <Form.Control
              type="date"
              placeholder="Fecha"
              value={fechaFin}
              onChange={handleChangeFechaFin}
            />
          </FloatingLabel>
        </Col>
      </Row>
    </>
  );
};
