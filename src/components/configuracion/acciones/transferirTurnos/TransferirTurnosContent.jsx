import { useState, useEffect } from "react";
import api from "../../../../config/api";
import Swal from "sweetalert2";
import { Loading } from "../../../utils/Loading";
import { TableTransferirTurnos } from "./TableTransferirTurnos";
import { ModalImprimirTurno } from "./ModalImprimirTurno";
import { tiempoAleatorio } from "../../../../helpers/functions";

export const TransferirTurnosContent = () => {
  const [apiKey, setApiKey] = useState("");
  const [transferirTurnosData, setTransferirTurnosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pollingEnabled, setPollingEnabled] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedTurnoId, setSelectedTurnoId] = useState(null);

  // Cargar configuración desde appsettings.json
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/appsettings.json');
        const config = await response.json();
        localStorage.setItem("VITE_APP_BASEURL", config.VITE_APP_BASEURL ?? "");
        setApiKey(config.VITE_APP_APIKEY ?? "");
      } catch (error) {
        console.error("Error al cargar appsettings.json:", error);
        setApiKey(import.meta.env.VITE_APP_APIKEY ?? "");
      }
    };
    loadConfig();
  }, []);

  // GET - Obtener turnos del historial (showError: mostrar Swal solo en primera carga para evitar loop de errores)
  const getTransferirTurnos = async (showError = true) => {
    if (!apiKey) return;
    try {
      const response = await api.get(
        "GenericWeb?proctoken=spTransferirOperadorTurnosDashboard",
        {
          headers: {
            "Content-Type": "application/json",
            APIKey: apiKey,
          },
        }
      );

      if (!Array.isArray(response.data)) {
        setTransferirTurnosData([]);
        setLoading(false);
        return;
      }

      const turnosMapeados = response.data.map((turno, index) => ({
        globalIndex: index + 1,
        IdTurno: turno.IdTurno,
        Turno: turno.Turno,
        Area: turno.Area,
        Fecha: turno["Fecha de Creación"],
        Espera: turno.Espera,
        Observacion: turno.Referencia,
        EsAreaPreferencial: turno.EsAreaPreferencial === true,
        EsAreaEspecial: turno.EsAreaEspecial === true,
      }));

      setTransferirTurnosData(turnosMapeados);
      setLoading(false);
      setPollingEnabled(true);
    } catch (error) {
      setLoading(false);
      if (showError) {
        const isCors = error?.message?.includes("CORS") || error?.code === "ERR_NETWORK";
        Swal.fire({
          icon: "error",
          title: "Error al conectar con la API",
          text: isCors
            ? "CORS o red: asegúrate de usar 'npm run dev' (el proxy evita CORS) y de que la API esté en marcha en la URL de appsettings.json."
            : "No se pudieron cargar los turnos. Revisa appsettings.json (VITE_APP_BASEURL) y que la API esté ejecutándose.",
          timer: 4000,
        });
      }
    }
  };

  // Primera carga cuando tengamos baseUrl y apiKey (solo una vez; si falla no se inicia polling)
  useEffect(() => {
    if (apiKey) {
      getTransferirTurnos(true);
    }
  }, [apiKey]);

  // Polling solo después de al menos una respuesta exitosa (evita loop infinito por CORS/errores)
  useEffect(() => {
    if (!apiKey || !pollingEnabled) return;
    const intervalId = setInterval(() => {
      getTransferirTurnos(false);
    }, tiempoAleatorio);
    return () => clearInterval(intervalId);
  }, [apiKey, pollingEnabled]);


  // POST - Transferir turno
  const transferirTurno = async (idTurno) => {
    try {
      await api.post(
        "GenericWeb?proctoken=spTransferirOperadorTurnosDashboard",
        {
          IdTurno: idTurno
        },
        {
          headers: {
            "Content-Type": "application/json",
            APIKey: apiKey,
          },
        }
      );

      // Eliminar el turno transferido de la tabla inmediatamente
      setTransferirTurnosData(prevData => 
        prevData
          .filter(turno => turno.IdTurno !== idTurno)
          .map((turno, index) => ({
            ...turno,
            globalIndex: index + 1
          }))
      );

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: `El turno ha sido transferido con éxito!`,
        timer: 1500,
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Ha ocurrido un error al transferir el turno.`,
        timer: 2000,
      });
    }
  };

  const abrirModalImpresion = (idTurno) => {
    setSelectedTurnoId(idTurno);
    setShowPrintModal(true);
  };

  const cerrarModalImpresion = () => {
    setShowPrintModal(false);
    setSelectedTurnoId(null);
  };

  return (
    <>
      <div className="d-flex flex-column px-3 mt-3" style={{ width: "100%" }}>
        <h2 className="text-white fw-bold custom-header">Transferir Turnos</h2>
        <hr className="mt-0" style={{ border: "1px solid white" }} />

        {loading ? (
          <Loading />
        ) : (
          <TableTransferirTurnos
            transferirTurnosData={transferirTurnosData}
            transferirTurno={transferirTurno}
            abrirModalImpresion={abrirModalImpresion}
          />
        )}
      </div>
      <ModalImprimirTurno
        show={showPrintModal}
        onHide={cerrarModalImpresion}
        idTurno={selectedTurnoId}
        apiKey={apiKey}
      />
    </>
  );
};
