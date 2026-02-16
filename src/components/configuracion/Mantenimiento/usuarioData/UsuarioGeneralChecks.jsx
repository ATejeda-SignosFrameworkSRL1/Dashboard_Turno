import React from "react";
import { Row, Col, Form } from "react-bootstrap";

export const UsuarioGeneralChecks = ({
  viewMode,
  tipoUsuario,
  setTipoUsuario,
  autoLLamado,
  setAutoLLamado,
  permiteTurnoEpera,
  setPermiteTurnoEpera,
  usuarioActivo,
  setUsuarioActivo,
  permiteReferidos,
  setPermiteReferidos,
  permiteAreaPrincipal,
  setPermiteAreaPrincipal,
  permiteTicketMobile,
  setPermiteTicketMobile,
  notificacionMobil,
  setNotificacionMobil,
}) => {
  const handleChangeTipoUsuario = (e) => {
    const radioTipoUsuario = e.target.value;
    setTipoUsuario(radioTipoUsuario);
  };

  const handleChangeAutoLlamado = () => {
    setAutoLLamado(!autoLLamado);
  };

  const handleChangePermiteTurnoEpera = () => {
    setPermiteTurnoEpera(!permiteTurnoEpera);
  };

  const handleChangeUsuarioActivo = () => {
    setUsuarioActivo(!usuarioActivo);
  };

  const handleChangePermiteReferidos = () => {
    setPermiteReferidos(!permiteReferidos);
  };

  const handleChangeAreaPrincipal = () => {
    setPermiteAreaPrincipal(!permiteAreaPrincipal);
  };

  const handleChangeTicketApp = () => {
    setPermiteTicketMobile(!permiteTicketMobile);
  };

  const handleChangeNotificacionMobil = () => {
    setNotificacionMobil(!notificacionMobil);
  };

  return (
    <>
      <Row className="d-flex align-items-center">
        <Col md={8} sm={12}>
          <Row className="align-items-center mb-2">
            <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Label htmlFor="inputTipoUsuario" className="col-form-label">
                Tipo de Usuario
              </Form.Label>
            </Col>
            <Col lg={9} md={8} sm={8} xs={12}>
              <Form>
                <Form.Check
                  inline
                  label="Operador"
                  name="tipoUsuario"
                  type="radio"
                  value={"O"}
                  onChange={handleChangeTipoUsuario}
                  checked={tipoUsuario === "O"}
                  disabled={viewMode}
                />
                <Form.Check
                  inline
                  label="Supervisor"
                  name="tipoUsuario"
                  type="radio"
                  value={"S"}
                  onChange={handleChangeTipoUsuario}
                  checked={tipoUsuario === "S"}
                  disabled={viewMode}
                />
                <Form.Check
                  inline
                  label="Administrador"
                  name="tipoUsuario"
                  type="radio"
                  value={"A"}
                  onChange={handleChangeTipoUsuario}
                  checked={tipoUsuario === "A"}
                  disabled={viewMode}
                />
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col
          lg={3}
          md={4}
          sm={6}
          xs={12}
          className="d-flex align-items-center justify-content-start"
        >
          <Form.Check
            className="me-3"
            type="checkbox"
            onChange={handleChangeAutoLlamado}
            checked={autoLLamado}
            disabled={viewMode}
          />
          <Form.Label htmlFor="inputIdUsuario" className="col-form-label">
            Auto Llamado
          </Form.Label>
        </Col>
        <Col
          lg={3}
          md={4}
          sm={6}
          xs={12}
          className="d-flex align-items-center justify-content-start"
        >
          <Form.Check
            className="me-3"
            type="checkbox"
            onChange={handleChangePermiteTurnoEpera}
            checked={permiteTurnoEpera}
            disabled={viewMode}
          />
          <Form.Label htmlFor="inputIdUsuario" className="col-form-label">
            Turno en Espera
          </Form.Label>
        </Col>
        <Col
          lg={3}
          md={4}
          sm={6}
          xs={12}
          className="d-flex align-items-center justify-content-start"
        >
          <Form.Check
            className="me-3"
            type="checkbox"
            onChange={handleChangeUsuarioActivo}
            checked={usuarioActivo}
            disabled={viewMode}
          />
          <Form.Label htmlFor="inputIdUsuario" className="col-form-label">
            Registro Activo
          </Form.Label>
        </Col>
        <Col
          lg={3}
          md={4}
          sm={6}
          xs={12}
          className="d-flex align-items-center justify-content-start"
        >
          <Form.Check
            className="me-3"
            type="checkbox"
            onChange={handleChangePermiteReferidos}
            checked={permiteReferidos}
            disabled={viewMode}
          />
          <Form.Label htmlFor="inputIdUsuario" className="col-form-label">
            Permite Referido
          </Form.Label>
        </Col>
        <Col
          lg={3}
          md={4}
          sm={6}
          xs={12}
          className="d-flex align-items-center justify-content-start"
        >
          <Form.Check
            className="me-3"
            type="checkbox"
            onChange={handleChangeAreaPrincipal}
            checked={permiteAreaPrincipal}
            disabled={viewMode}
          />
          <Form.Label htmlFor="inputIdUsuario" className="col-form-label">
            Permite Area Principal
          </Form.Label>
        </Col>
        <Col
          lg={3}
          md={4}
          sm={6}
          xs={12}
          className="d-flex align-items-center justify-content-start"
        >
          <Form.Check
            className="me-3"
            type="checkbox"
            onChange={handleChangeTicketApp}
            checked={permiteTicketMobile}
            disabled={viewMode}
          />
          <Form.Label htmlFor="inputIdUsuario" className="col-form-label">
            Permite Ticket App
          </Form.Label>
        </Col>

        <Col
          lg={3}
          md={4}
          sm={6}
          xs={12}
          className="d-flex align-items-center justify-content-start"
        >
          <Form.Check
            className="me-3"
            type="checkbox"
            onChange={handleChangeNotificacionMobil}
            checked={notificacionMobil}
            disabled={viewMode}
          />
          <Form.Label htmlFor="inputIdUsuario" className="col-form-label">
            Notificación Movil
          </Form.Label>
        </Col>
      </Row>
    </>
  );
};
