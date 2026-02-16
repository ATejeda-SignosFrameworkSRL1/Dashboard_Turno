import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Loading } from "../../../utils/Loading";
import { TableTransferirTurnos } from "./TableTransferirTurnos";
import { tiempoAleatorio } from "../../../../helpers/functions";


// useEffect(() => {
//   if (baseUrl && apiKey) {
//     getTransferirTurnos();

//     const intervalId = setInterval(() => {
//       getTransferirTurnos();
//     }, tiempoAleatorio);
//     return () => clearInterval(intervalId);
//   }
// }), [baseUrl, apiKey];

export const TransferirTurnosContent = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [transferirTurnosData, setTransferirTurnosData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (baseUrl && apiKey) {
      getTransferirTurnos();
  
      const intervalId = setInterval(() => {
        getTransferirTurnos();
      }, tiempoAleatorio);
      return () => clearInterval(intervalId);
    }
  }), [baseUrl, apiKey];

  // Cargar configuración desde appsettings.json
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/appsettings.json');
        const config = await response.json();
        setBaseUrl(config.VITE_APP_BASEURL);
        setApiKey(config.VITE_APP_APIKEY);
      } catch (error) {
        console.error("Error al cargar appsettings.json:", error);
        // Fallback al .env si falla
        setBaseUrl(import.meta.env.VITE_APP_BASEURL);
        setApiKey(import.meta.env.VITE_APP_APIKEY);
      }
    };
    loadConfig();
  }, []);

  // GET - Obtener turnos del historial
  const getTransferirTurnos = async () => {
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
      
      // Validar que response.data sea un array
      if (!Array.isArray(response.data)) {
        setTransferirTurnosData([]);
        setLoading(false);
        return;
      }
      
      // Mapear datos del backend a formato del componente
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

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los turnos. Por favor, intenta nuevamente.",
        timer: 2500,
      });
      setLoading(false);
    }
  };


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

  useEffect(() => {
    // Solo ejecutar cuando tengamos la configuración cargada
    if (baseUrl && apiKey) {
      getTransferirTurnos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl, apiKey]);

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
