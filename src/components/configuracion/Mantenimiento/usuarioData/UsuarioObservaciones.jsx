import React from "react";
import { Row, Col, Form } from "react-bootstrap";

export const UsuarioObservaciones = ({
  viewMode,
  usuarioObservaciones,
  setUsuarioObservaciones,
}) => {

  const handleChangeObservaciones = (e) => {
    const inputOberservaciones = e.target.value;
    setUsuarioObservaciones(inputOberservaciones);
  };

  return (
    <>
      <Row className="d-flex align-items-center">
        <Col md={8} sm={12}>
          <Row className="align-items-center mb-2">
            <Col lg={12} md={7} sm={8} xs={12}>
              <Form.Control
                as="textarea"
                rows={3}
                value={usuarioObservaciones}
                onChange={handleChangeObservaciones}
                disabled={viewMode}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
