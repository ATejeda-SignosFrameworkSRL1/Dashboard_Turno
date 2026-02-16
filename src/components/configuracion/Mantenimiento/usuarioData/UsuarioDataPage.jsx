import React, { useState } from "react";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import { UsuarioGeneralInfo } from "./UsuarioGeneralInfo";
import { UsuarioGeneralChecks } from "./UsuarioGeneralChecks";
import { UsuarioActividadReciente } from "./UsuarioActividadReciente";
import { UsuarioObservaciones } from "./UsuarioObservaciones";
import { FaUserEdit, FaRegSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { alertSuccess, alertFailed } from "../../../../helpers/alerts";

export const UsuarioDataPage = ({
  usuarioData,
  newUser,
  especialidades,
  grupoUsuarios,
  viewMode,
  setViewMode,
  newLoad,
  setNewLoad,
}) => {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const totalUsuariosProc = import.meta.env.VITE_APP_API_totalUsuarios;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;

  const [loading, setLoading] = useState(false);

  const [nombreUsuario, setNombreUsuario] = useState(usuarioData.Nombre);
  const [userNameUsuario, setUserNameUsuario] = useState(usuarioData.UserName);
  const [passwordUsuario, setPasswordUsuario] = useState(
    usuarioData.Contrasena
  );
  const [especialidadUsuario, setEspecialidadUsuario] = useState(
    usuarioData.IdEspecialidad
  );
  const [grupoUsuario, setGrupoUsuario] = useState(usuarioData.IdGrupoUsuario);
  const [fotoUsuario, setFotoUsuario] = useState(usuarioData.Foto);
  const [fotoExtensionUsuario, setFotoExtensionUsuario] = useState(
    usuarioData.Ext
  );
  const [tipoUsuario, setTipoUsuario] = useState(usuarioData.TipoUsuario);
  const [autoLlamado, setAutoLlamado] = useState(usuarioData.AutoLlamado);
  const [permiteTurnoEpera, setPermiteTurnoEpera] = useState(
    usuarioData.PermiteTurnoEnEspera
  );
  const [usuarioActivo, setUsuarioActivo] = useState(usuarioData.Activo);
  const [permiteReferidos, setPermiteReferidos] = useState(
    usuarioData.PermiteReferidos
  );
  const [permiteAreaPrincipal, setPermiteAreaPrincipal] = useState(
    usuarioData.PermiteAreaPrincipal
  );
  const [permiteTicketMobile, setPermiteTicketMobile] = useState(
    usuarioData.PermiteTicketMobile
  );
  const [notificacionMobil, setNotificacionMobil] = useState(
    usuarioData.NotificacionMobile
  );
  const [usuarioObservaciones, setUsuarioObservaciones] = useState(
    usuarioData.Observacion
  );

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const usuarioDataObject = {
    Accion: newUser ? `'N'` : `'E'`,
    Nombre: `'${nombreUsuario}'`,
    Username: `'${userNameUsuario}'`,
    Pwd: `'${passwordUsuario}'`,
    IdEspecialidad: especialidadUsuario !== "" ? especialidadUsuario : null,
    IdGrupoUsuario: grupoUsuario !== "" ? grupoUsuario : null,
    // Foto: `'${fotoUsuario}'`,
    // FotoExtencion: `'${fotoExtensionUsuario}'`,
    Activo: usuarioActivo ? 1 : 0,
    TipoUsuario: `'${tipoUsuario}'`,
    AutoLlamado: autoLlamado ? 1 : 0,
    PermiteTurnoEnEspera: permiteTurnoEpera ? 1 : 0,
    PermiteReferido: permiteReferidos ? 1 : 0,
    PermiteAreaPrincipal: permiteAreaPrincipal ? 1 : 0,
    PermiteTicketMobile: permiteTicketMobile ? 1 : 0,
    NotificacionMobil: notificacionMobil ? 1 : 0,
    Observacion: `'${usuarioObservaciones}'`,
  };

  const actualizarUsuarioData = async () => {
    setLoading(true);
    setViewMode(true);

    if (!newUser) {
      usuarioDataObject.IdUsuario = usuarioData.Id;
    }

    try {
      const response = await axios.post(
        baseUrl + totalUsuariosProc,
        usuarioDataObject,
        config
      );
      alertSuccess("Los dato del usuario han sido actualizados correctamente.");
    } catch (error) {
      console.error(error);
      alertFailed();
    } finally {

      setTimeout(() => {
        setNewLoad(!newLoad);
        if (userNameUsuario !== usuarioData.UserName) {
          location.href = `/mantenimiento/usuarios/${userNameUsuario}`;
        }
      }, 1500);
      
    }

  };

  const cancelarUsuarioData = () => {
    if (newUser) {
      location.href = "/mantenimiento/usuarios/";
    } else {
    }
    setNewLoad(!newLoad);
    setLoading(false);
    setViewMode(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-white fw-bold mb-0">
          {newUser ? "Agregar Usuario" : usuarioData.Nombre}
        </h2>
        <div className="specialButtonsUser">
          <Button
            variant="secondary"
            size="sm"
            className="me-2"
            disabled={!viewMode}
            onClick={() => setViewMode(false)}
          >
            <FaUserEdit style={{ width: "28px", height: "28px" }} />
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="me-2"
            disabled={
              viewMode ||
              nombreUsuario === "" ||
              userNameUsuario === "" ||
              passwordUsuario === ""
            }
            onClick={actualizarUsuarioData}
          >
            {!loading ? (
              <FaRegSave style={{ width: "28px", height: "28px" }} />
            ) : (
              <Spinner
                animation="border"
                variant="light"
                className="d-flex justify-content-between align-items-center"
                style={{ width: "22px", height: "22px" }}
              />
            )}
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="me-2"
            disabled={viewMode}
            onClick={cancelarUsuarioData}
          >
            <MdOutlineCancel style={{ width: "28px", height: "28px" }} />
          </Button>
        </div>
      </div>
      <hr className="mt-2 mb-3" style={{ border: "1px solid white" }} />
      <div
        className="p-3"
        style={{ backgroundColor: "#eceff4", borderRadius: "0.25em" }}
      >
        <h5 className="text-black fw-bold mb-3">Información General</h5>
        <UsuarioGeneralInfo
          usuarioData={usuarioData}
          especialidades={especialidades}
          grupoUsuarios={grupoUsuarios}
          viewMode={viewMode}
          nombreUsuario={nombreUsuario}
          setNombreUsuario={setNombreUsuario}
          fotoUsuario={fotoUsuario}
          setFotoUsuario={setFotoUsuario}
          fotoExtensionUsuario={fotoExtensionUsuario}
          setFotoExtensionUsuario={setFotoExtensionUsuario}
          userNameUsuario={userNameUsuario}
          setUserNameUsuario={setUserNameUsuario}
          passwordUsuario={passwordUsuario}
          setPasswordUsuario={setPasswordUsuario}
          especialidadUsuario={especialidadUsuario}
          setEspecialidadUsuario={setEspecialidadUsuario}
          grupoUsuario={grupoUsuario}
          setGrupoUsuario={setGrupoUsuario}
        />
        <UsuarioGeneralChecks
          viewMode={viewMode}
          tipoUsuario={tipoUsuario}
          setTipoUsuario={setTipoUsuario}
          autoLLamado={autoLlamado}
          setAutoLLamado={setAutoLlamado}
          permiteTurnoEpera={permiteTurnoEpera}
          setPermiteTurnoEpera={setPermiteTurnoEpera}
          usuarioActivo={usuarioActivo}
          setUsuarioActivo={setUsuarioActivo}
          permiteReferidos={permiteReferidos}
          setPermiteReferidos={setPermiteReferidos}
          permiteAreaPrincipal={permiteAreaPrincipal}
          setPermiteAreaPrincipal={setPermiteAreaPrincipal}
          permiteTicketMobile={permiteTicketMobile}
          setPermiteTicketMobile={setPermiteTicketMobile}
          notificacionMobil={notificacionMobil}
          setNotificacionMobil={setNotificacionMobil}
        />
      </div>
      <div
        className="p-3 mt-2"
        style={{ backgroundColor: "#eceff4", borderRadius: "0.25em" }}
      >
        <h5 className="text-black fw-bold mb-3">Actividad Reciente</h5>
        <UsuarioActividadReciente usuarioData={usuarioData} />
      </div>
      <div
        className="p-3 mt-2"
        style={{ backgroundColor: "#eceff4", borderRadius: "0.25em" }}
      >
        <h5 className="text-black fw-bold mb-3">Observaciones</h5>
        <UsuarioObservaciones
          viewMode={viewMode}
          usuarioObservaciones={usuarioObservaciones}
          setUsuarioObservaciones={setUsuarioObservaciones}
        />
      </div>
    </>
  );
};
