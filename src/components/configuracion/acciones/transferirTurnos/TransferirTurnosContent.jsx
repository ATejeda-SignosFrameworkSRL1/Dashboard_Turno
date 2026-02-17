import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Loading } from "../../../utils/Loading";
import { TableTransferirTurnos } from "./TableTransferirTurnos";
import { tiempoAleatorio } from "../../../../helpers/functions";

export const TransferirTurnosContent = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [transferirTurnosData, setTransferirTurnosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pollingEnabled, setPollingEnabled] = useState(false);

  // Cargar configuración desde appsettings.json (baseUrl puede ser URL completa o ruta relativa)
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/appsettings.json');
        const config = await response.json();
        let base = (config.VITE_APP_BASEURL ?? "").trim();
        if (base && base.startsWith("http") && import.meta.env.DEV) {
          try {
            const u = new URL(base);
            base = u.pathname.replace(/\/?$/, "") + "/";
          } catch (_) {}
        }
        setBaseUrl(base);
        setApiKey(config.VITE_APP_APIKEY ?? "");
      } catch (error) {
        console.error("Error al cargar appsettings.json:", error);
        setBaseUrl(import.meta.env.VITE_APP_BASEURL ?? "");
        setApiKey(import.meta.env.VITE_APP_APIKEY ?? "");
      }
    };
    loadConfig();
  }, []);

  // GET - Obtener turnos del historial (showError: mostrar Swal solo en primera carga para evitar loop de errores)
  const getTransferirTurnos = async (showError = true) => {
    if (!baseUrl || !apiKey) return;
    try {
      const response = await axios.get(
        `${baseUrl}GenericWeb?proctoken=spTransferirOperadorTurnosDashboard`,
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
        EsAreaPreferencial: turno.EsAreaPreferencial
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
    if (baseUrl && apiKey) {
      getTransferirTurnos(true);
    }
  }, [baseUrl, apiKey]);

  // Polling solo después de al menos una respuesta exitosa (evita loop infinito por CORS/errores)
  useEffect(() => {
    if (!baseUrl || !apiKey || !pollingEnabled) return;
    const intervalId = setInterval(() => {
      getTransferirTurnos(false);
    }, tiempoAleatorio);
    return () => clearInterval(intervalId);
  }, [baseUrl, apiKey, pollingEnabled]);


  // POST - Transferir turno
  const transferirTurno = async (idTurno) => {
    try {
      await axios.post(
        `${baseUrl}GenericWeb?proctoken=spTransferirOperadorTurnosDashboard`,
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
          />
        )}
      </div>
    </>
  );
};
