import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { IoSaveOutline } from "react-icons/io5";
import { alertSuccess, alertFailed } from "../../../../helpers/alerts";

export const ModalGrupoUsuarios = ({
  newGrupoUsuario,
  show,
  setShow,
  grupoUsuario,
  newLoad,
  setNewLoad,
}) => {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const grupoUsuariosProc = import.meta.env.VITE_APP_API_grupoUsuarios;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;

  const [descripcionGrupoUsuario, setDescripcionGrupoUsuario] = useState("");
  const [ordenGrupoUsuario, setOrdenGrupoUsuario] = useState(null);
  const [estatusGrupoUsuario, setEstatusGrupoUsuario] = useState(false);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const grupoUsuarioObject = {
    Accion: newGrupoUsuario ? `'N'` : `'E'`,
    Descripcion: `'${descripcionGrupoUsuario}'`,
    // Orden: ordenEspecialidad,
    Activo: estatusGrupoUsuario ? 1 : 0,
  };

  const handleChangeDescripcion = (e) => {
    const inputDescripcion = e.target.value;
    setDescripcionGrupoUsuario(inputDescripcion);
  };

  const handleChangeOrden = (e) => {
    const inputOrden = e.target.value;
    setOrdenEspecialidad(inputOrden);
  };

  const handleChangeEstatus = () => {
    setEstatusGrupoUsuario(!estatusGrupoUsuario);
  };

  const actualizarEspecialidad = async () => {
    setLoading(true);
    if (!newGrupoUsuario) {
      grupoUsuarioObject.Id = grupoUsuario.Id;
    }
    try {
      const response = await axios.post(
        baseUrl + grupoUsuariosProc,
        grupoUsuarioObject,
        config
      );
      setLoading(false);
      alertSuccess(
        `El Grupo Usuario ${descripcionGrupoUsuario} ha sido ${
          newGrupoUsuario ? "agregada" : "actualizada"
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
    if (grupoUsuario) {
      setDescripcionGrupoUsuario(grupoUsuario.Descripcion);
      setEstatusGrupoUsuario(grupoUsuario.Activo);
      setOrdenGrupoUsuario(grupoUsuario.Orden);
    }
  }, [grupoUsuario]);

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
            {!newGrupoUsuario
              ? `Editando - ${grupoUsuario.Descripcion}`
              : "Agregar un Grupo Usuario"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "20px" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={descripcionGrupoUsuario ?? ""}
                onChange={handleChangeDescripcion}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Orden</Form.Label>
              <Form.Control
                type="number"
                value={ordenGrupoUsuario ?? ""}
                onChange={handleChangeOrden}
              />
            </Form.Group> */}
            <Form.Group className="d-flex align-items-center justify-content-start mb-3">
              <Form.Check
                className="me-3 form-check-green"
                type="checkbox"
                onChange={handleChangeEstatus}
                checked={estatusGrupoUsuario ?? false}
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
                (descripcionGrupoUsuario === grupoUsuario.Descripcion &&
                  estatusGrupoUsuario === grupoUsuario.Activo) ||
                descripcionGrupoUsuario === "" ||
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
