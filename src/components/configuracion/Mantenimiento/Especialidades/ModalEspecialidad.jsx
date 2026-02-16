import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { IoSaveOutline } from "react-icons/io5";
import { alertSuccess, alertFailed } from "../../../../helpers/alerts";

export const ModalEspecialidad = ({
  newEspecialidad,
  show,
  setShow,
  especialidad,
  newLoad,
  setNewLoad,
}) => {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const especialidadesProc = import.meta.env.VITE_APP_API_especialidades;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;

  const [descripcionEspecialidad, setDescripcionEspecialidad] = useState("");
  const [ordenEspecialidad, setOrdenEspecialidad] = useState(null);
  const [estatusEspecialidad, setEstatusEspecialidad] = useState(false);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const especialidadObject = {
    Accion: newEspecialidad ? `'N'` : `'E'`,
    Descripcion: `'${descripcionEspecialidad}'`,
    // Orden: ordenEspecialidad,
    Activo: estatusEspecialidad ? 1 : 0,
  };

  const handleChangeDescripcion = (e) => {
    const inputDescripcion = e.target.value;
    setDescripcionEspecialidad(inputDescripcion);
  };

  const handleChangeOrden = (e) => {
    const inputOrden = e.target.value;
    setOrdenEspecialidad(inputOrden);
  };

  const handleChangeEstatus = () => {
    setEstatusEspecialidad(!estatusEspecialidad);
  };

  const actualizarEspecialidad = async () => {
    setLoading(true);
    if (!newEspecialidad) {
      especialidadObject.Id = especialidad.Id;
    }
    try {
      const response = await axios.post(
        baseUrl + especialidadesProc,
        especialidadObject,
        config
      );
      setLoading(false);
      alertSuccess(
        `La especialidad ${descripcionEspecialidad} ha sido ${
          newEspecialidad ? "agregada" : "actualizada"
        }.`
      );
      setNewLoad(!newLoad);
    } catch (error) {
      console.error("Error al obtener los datos", error);
      alertFailed();
    } finally {
      setLoading(false);
      setShow(false);
    }
  };

  useEffect(() => {
    if (especialidad) {
      setDescripcionEspecialidad(especialidad.Descripcion);
      setEstatusEspecialidad(especialidad.Activo);
      setOrdenEspecialidad(especialidad.Orden);
    }
  }, [especialidad]);

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {!newEspecialidad
              ? `Editando - ${especialidad.Descripcion}`
              : "Agregar una Especialidad"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "20px" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={descripcionEspecialidad ?? ""}
                onChange={handleChangeDescripcion}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Orden</Form.Label>
              <Form.Control
                type="number"
                value={ordenEspecialidad ?? ""}
                onChange={handleChangeOrden}
              />
            </Form.Group> */}
            <Form.Group className="d-flex align-items-center justify-content-start mb-3">
              <Form.Check
                className="me-3 form-check-green"
                type="checkbox"
                onChange={handleChangeEstatus}
                checked={estatusEspecialidad ?? false}
              />
              <Form.Label htmlFor="inputIdUsuario" className="col-form-label">
                Activo
              </Form.Label>
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              disabled={
                (descripcionEspecialidad === especialidad.Descripcion &&
                  estatusEspecialidad === especialidad.Activo) ||
                descripcionEspecialidad === "" ||
                loading
              }
              onClick={actualizarEspecialidad}
            >
              {loading ? (
                <div className="d-flex align-items-center">
                  <Spinner
                    animation="border"
                    variant="light"
                    size="sm"
                    style={{ marginRight: "5px" }}
                  />
                  Cargando
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <IoSaveOutline style={{ marginRight: "5px" }} />
                  Guardar
                </div>
              )}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
