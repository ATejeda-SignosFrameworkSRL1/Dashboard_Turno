import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import dayjs from "dayjs";

export const UsuarioActividadReciente = ({ usuarioData }) => {
  return (
    <>
      <Row className="d-flex align-items-center">
        <Col md={8} sm={12}>
          <Row className="align-items-center mb-2">
            <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Label htmlFor="inputIdUsuario" className="col-form-label">
                Ultima Sesión
              </Form.Label>
            </Col>
            <Col lg={5} md={7} sm={8} xs={12}>
              <Form.Control
                type="text"
                className="form-control border border-secondary-subtle"
                value={
                  usuarioData.LastLogin
                    ? dayjs(usuarioData.LastLogin).format("DD/MM/YYYY h:m:s a")
                    : ""
                }
                disabled
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Label htmlFor="inputIdUsuario" className="col-form-label">
                Ultima Actividad
              </Form.Label>
            </Col>
            <Col lg={5} md={7} sm={8} xs={12}>
              <Form.Control
                type="text"
                className="form-control border border-secondary-subtle"
                value={
                  usuarioData.LastActivity
                    ? dayjs(usuarioData.LastActivity).format(
                        "DD/MM/YYYY h:m:s a"
                      )
                    : ""
                }
                disabled
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-2">
            <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Label htmlFor="inputIdUsuario" className="col-form-label">
                Ultima Posición
              </Form.Label>
            </Col>
            <Col lg={5} md={7} sm={8} xs={12}>
              <Form.Control
                type="text"
                className="form-control border border-secondary-subtle"
                value={""}
                disabled
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
