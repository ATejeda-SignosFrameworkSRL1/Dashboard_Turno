import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loading } from "../../../utils/Loading";
import { UsuarioDataPage } from "./UsuarioDataPage";

export const UsuarioDataContent = () => {
  const { username } = useParams();
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const totalUsuariosProc = import.meta.env.VITE_APP_API_totalUsuarios;
  const especialidadesProc = import.meta.env.VITE_APP_API_especialidades;
  const grupoUsuariosProc = import.meta.env.VITE_APP_API_grupoUsuarios;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;

  const [usuarioData, setUsuarioData] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [grupoUsuarios, setGrupoUsuarios] = useState([]);
  const [newUser, setNewUser] = useState(false);
  const [viewMode, setViewMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [newLoad, setNewLoad] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const getUsuarioData = async () => {
    try {
      const response = await axios.post(
        baseUrl + totalUsuariosProc,
        {
          username: `'${username}'`,
        },
        config
      );
      setUsuarioData(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  const getEspecialidades = async () => {
    try {
      const response = await axios.get(baseUrl + especialidadesProc, config);
      setEspecialidades(response.data);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  const getGrupoUsuarios = async () => {
    try {
      const response = await axios.get(baseUrl + grupoUsuariosProc, config);
      setGrupoUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  const newUserObject = {
    Nombre: "",
    UserName: "",
    Contrasena: "",
    IdEspecialidad: null,
    IdGrupoUsuario: null,
    Foto: null,
    Ext: null,
    TipoUsuario: false,
    AutoLlamado: false,
    PermiteTurnoEnEspera: false,
    Activo: false,
    PermiteReferidos: false,
    PermiteAreaPrincipal: false,
    PermiteTicketMobile: false,
    NotificacionMobile: false,
    Observacion: "",
  };

  useEffect(() => {
    getEspecialidades();
    getGrupoUsuarios();
    if (username !== "nuevo-usuario") {
      getUsuarioData();
      return;
    }
  }, []);

  useEffect(() => {
    if (username === "nuevo-usuario") {
      setNewUser(true);
      setViewMode(false);
      setLoading(false);
    }
  }, [especialidades]);

  useEffect(() => {
    setLoading(true);
    getUsuarioData();
  }, [newLoad]);

  return (
    <>
      <div className="d-flex flex-column px-3 mt-3" style={{ width: "100%" }}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <UsuarioDataPage
              usuarioData={newUser ? newUserObject : usuarioData}
              newUser={newUser}
              especialidades={especialidades}
              grupoUsuarios={grupoUsuarios}
              viewMode={viewMode}
              setViewMode={setViewMode}
              newLoad={newLoad}
              setNewLoad={setNewLoad}
            />
          </>
        )}
      </div>
    </>
  );
};