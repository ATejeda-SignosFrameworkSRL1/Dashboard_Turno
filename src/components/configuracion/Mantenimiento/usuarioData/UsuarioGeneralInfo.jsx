import React, { useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import {
  MdOutlineAddPhotoAlternate,
  MdPhotoCamera,
  MdOutlineNoPhotography,
} from "react-icons/md";
import { userNotPhotoSRC } from "../../../../helpers/base64Images";

export const UsuarioGeneralInfo = ({
  usuarioData,
  especialidades,
  grupoUsuarios,
  viewMode,
  nombreUsuario,
  setNombreUsuario,
  fotoUsuario,
  setFotoUsuario,
  fotoExtensionUsuario,
  setFotoExtensionUsuario,
  userNameUsuario,
  setUserNameUsuario,
  passwordUsuario,
  setPasswordUsuario,
  especialidadUsuario,
  setEspecialidadUsuario,
  grupoUsuario,
  setGrupoUsuario,
}) => {
  const handleChangeNombre = (e) => {
    const inputNombre = e.target.value;
    setNombreUsuario(inputNombre);
  };

  const handleChangeUsername = (e) => {
    const inputUsername = e.target.value;
    setUserNameUsuario(inputUsername);
  };

  const handleChangePassword = (e) => {
    const inputPassword = e.target.value;
    setPasswordUsuario(inputPassword);
  };

  const handleChangeEspecialidad = (e) => {
    const selectEspecialidad = e.target.value;
    setEspecialidadUsuario(selectEspecialidad);
  };

  const handleChangeGrupoUsuarios = (e) => {
    const selectGrupoUsuario = e.target.value;
    setGrupoUsuario(selectGrupoUsuario);
    console.log(selectGrupoUsuario);
  };

  const addNewPhoto = () => {
    document.getElementById("fotoInput").click();
  };

  const handleChangeFoto = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 800;
          const maxHeight = 600;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const base64 = canvas.toDataURL("image/jpeg", 0.7);
          setFotoUsuario(
            base64.split(",")[1].replace(/=+$/, "").replace(/\s/g, "")
          );
          const fileName = file.name;
          setFotoExtensionUsuario(`.${fileName.split(".").pop()}`);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const noAutoComplete = () => {
    const inputs = document.querySelectorAll('input[autoComplete="off"]');
    inputs.forEach((input) => {
      input.setAttribute("autoComplete", "new-password");
    });
  };

  useEffect(() => {
    noAutoComplete();
  }, []);

  return (
    <>
      <Row className="d-flex align-items-center">
        <Col md={{ order: "first", span: 8 }} sm={{ order: "last", span: 12 }}>
          <Row className="align-items-center mb-2">
            <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Label htmlFor="inputIdUsuario" className="col-form-label">
                ID Usuario
              </Form.Label>
            </Col>
            <Col lg={4} md={4} sm={8} xs={12}>
              <Form.Control
                type="text"
                className="form-control border border-secondary-subtle"
                value={usuarioData.Id}
                disabled
              />
            </Col>
          </Row>
          <Row className="d-flex align-items-center mb-2">
            <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Label htmlFor="inputName" className="col-form-label">
                Nombre
              </Form.Label>
            </Col>
            <Col lg={9} md={8} sm={8} xs={12}>
              <Form.Control
                type="text"
                className="form-control border border-secondary-subtle"
                value={nombreUsuario}
                onChange={handleChangeNombre}
                disabled={viewMode}
              />
            </Col>
          </Row>
          <Row className="d-flex align-items-center mb-2">
            <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Label htmlFor="inputName" className="col-form-label">
                User Name
              </Form.Label>
            </Col>
            <Col lg={9} md={8} sm={8} xs={12}>
              <Form.Control
                type="text"
                className="form-control border border-secondary-subtle"
                autoComplete="off"
                value={userNameUsuario}
                onChange={handleChangeUsername}
                disabled={viewMode}
              />
            </Col>
          </Row>
          <Row className="d-flex align-items-center mb-2">
            <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Label htmlFor="inputName" className="col-form-label">
                Password
              </Form.Label>
            </Col>
            <Col lg={9} md={8} sm={8} xs={12}>
              <Form.Control
                type="password"
                className="form-control border border-secondary-subtle"
                autoComplete="off"
                value={passwordUsuario}
                onChange={handleChangePassword}
                disabled={viewMode}
              />
            </Col>
          </Row>
          <Row className="d-flex align-items-center mb-2">
            <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Label htmlFor="inputName" className="col-form-label">
                Especialidad
              </Form.Label>
            </Col>
            <Col lg={9} md={8} sm={8} xs={12}>
              <Form.Select
                aria-label="Default select example"
                onChange={handleChangeEspecialidad}
                value={especialidadUsuario ?? ""}
                disabled={viewMode}
              >
                <option value="">Selecciona una especialidad</option>
                {especialidades?.map((especialidad) => (
                  <option
                    value={especialidad.Id}
                    key={especialidad.Descripcion}
                  >
                    {especialidad.Descripcion}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className="d-flex align-items-center mb-2">
            <Col lg={3} md={4} sm={4} xs={12}>
              <Form.Label htmlFor="inputName" className="col-form-label">
                Grupo Usuarios
              </Form.Label>
            </Col>
            <Col lg={9} md={8} sm={8} xs={12}>
              <Form.Select
                aria-label="Default select example"
                onChange={handleChangeGrupoUsuarios}
                value={grupoUsuario ?? ""}
                disabled={viewMode}
              >
                <option value="">Selecciona un grupo usuario</option>
                {grupoUsuarios?.map((grupoUsuario) => (
                  <option
                    value={grupoUsuario.Id}
                    key={grupoUsuario.Descripcion}
                  >
                    {grupoUsuario.Descripcion}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Col>
        <Col
          md={{ order: "last", span: 4 }}
          sm={{ order: "first", span: 12 }}
          xs={{ order: "first", span: 12 }}
        >
          <Row xs={12}>
            <Col sm={{ span: 6, offset: 3 }} xs={{ span: 8, offset: 2 }}>
              <img
                src={
                  fotoUsuario !== null
                    ? `data:image/${fotoExtensionUsuario
                        ?.split(".")
                        ?.pop()};base64,${fotoUsuario}`
                    : userNotPhotoSRC
                }
                className="rounded-circle"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row xs={12} className="my-3">
            <div className="d-flex justify-content-center items-center">
              <Form.Control
                id="fotoInput"
                type="file"
                style={{ display: "none" }}
                onChange={handleChangeFoto}
                accept="image/png"
              />
              <Button
                size="sm"
                variant="primary"
                disabled={viewMode}
                onClick={addNewPhoto}
              >
                <MdOutlineAddPhotoAlternate className="btn-iconUser" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="mx-2"
                disabled={viewMode}
              >
                <MdPhotoCamera className="btn-iconUser" />
              </Button>
              <Button
                size="sm"
                variant="danger"
                disabled={viewMode}
                onClick={() => setFotoUsuario(null)}
              >
                <MdOutlineNoPhotography className="btn-iconUser" />
              </Button>
            </div>
          </Row>
        </Col>
      </Row>
    </>
  );
};
