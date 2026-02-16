import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { IoSaveOutline } from "react-icons/io5";
import { alertSuccess, alertFailed } from "../../../../helpers/alerts";

export const ModalPantalla = ({
  show,
  setShow,
  pantalla,
  newLoad,
  setNewLoad,
}) => {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const pantallaProc = import.meta.env.VITE_APP_API_actBarraDeMensaje;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;

  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const handleChangeMensaje = (e) => {
    const inputMensaje = e.target.value;
    setMensaje(inputMensaje);
  };

  const actualizarMensajePantalla = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        baseUrl + pantallaProc,
        {
          IdPantalla: pantalla.IdPantalla,
          mensaje: `'${mensaje}'`,
        },
        config
      );
      setLoading(false);
      alertSuccess(
        `El Mensaje de la ${pantalla.Descripcion} ha sido cambiado.`
      );
    } catch (error) {
      console.error("Error al obtener los datos", error);
      alertFailed();
    } finally {
      setShow(false);
      setNewLoad(!newLoad);
    }
  };

  useEffect(() => {
    if (pantalla) {
      setMensaje(pantalla.Mensaje);
    }
  }, [pantalla]);

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
            Editando mensaje en {pantalla.Descripcion}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "20px" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" value={pantalla.Descripcion} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={mensaje ?? ""}
                onChange={handleChangeMensaje}
              />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              disabled={loading}
              onClick={actualizarMensajePantalla}
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
