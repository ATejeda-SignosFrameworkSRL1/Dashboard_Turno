import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { BsPrinterFill } from "react-icons/bs";
import api from "../config/api";

export const PrintTurno = () => {
  const { idTurno } = useParams();
  const [turnoData, setTurnoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState("");

  const formatDateOnly = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}/${month}/${day}`;
  };

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

  useEffect(() => {
    const getTurnoDetails = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            APIKey: apiKey,
          },
        };
        
        // Usar el procedimiento de transferir turnos para obtener todos los turnos
        const response = await api.get(
          "GenericWeb?proctoken=spTransferirOperadorTurnosDashboard",
          config
        );
        
        // Filtrar el turno específico por ID
        if (Array.isArray(response.data)) {
          const turnoEncontrado = response.data.find(
            (turno) => turno.IdTurno === parseInt(idTurno)
          );
          
          if (turnoEncontrado) {
            // Mapear los datos al formato esperado
            const turnoMapeado = {
              IdTurno: turnoEncontrado.IdTurno,
              Turno: turnoEncontrado.Turno,
              Area: turnoEncontrado.Area,
              Fecha: turnoEncontrado["Fecha de Creación"],
              Espera: turnoEncontrado.Espera,
              Observacion: turnoEncontrado.Referencia,
              EsAreaPreferencial: turnoEncontrado.EsAreaPreferencial === true,
              EsAreaEspecial: turnoEncontrado.EsAreaEspecial === true,
              Estado: "En espera"
            };
            setTurnoData(turnoMapeado);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos del turno", error);
        setLoading(false);
      }
    };

    // Solo ejecutar cuando tengamos la configuración cargada
    if (idTurno && apiKey) {
      getTurnoDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTurno, apiKey]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <h3>Cargando detalles del turno...</h3>
      </Container>
    );
  }

  if (!turnoData) {
    return (
      <Container className="mt-5 text-center">
        <h3>No se encontró información del turno</h3>
      </Container>
    );
  }

  return (
    <>
      {/* Botones que NO se imprimen */}
      <div className="no-print" style={{ 
        padding: "20px", 
        textAlign: "center", 
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #dee2e6"
      }}>
        <Container>
          <Button 
            variant="dark" 
            size="lg" 
            onClick={handlePrint}
            style={{
              padding: "10px 30px",
              fontSize: "1rem",
              fontWeight: "500"
            }}
          >
            <BsPrinterFill style={{ marginRight: "8px" }} />
            Imprimir Comprobante
          </Button>
        </Container>
      </div>

      {/* Contenido que SÍ se imprime */}
        <Container 
        className="mt-4 mb-5" 
        style={{ maxWidth: "650px", textAlign: "center" }}
        >
        <div style={{ 
            backgroundColor: "white",
            padding: "40px 30px"
        }}>

            {/* TURNO GRANDE */}
            <h1 style={{
            fontSize: "5rem",
            fontWeight: "bold",
            marginBottom: "15px",
            letterSpacing: "8px",
            color:
              turnoData.EsAreaPreferencial === true && turnoData.EsAreaEspecial !== true
                ? "#237FFA"
                : turnoData.EsAreaEspecial === true && turnoData.EsAreaPreferencial !== true
                  ? "#7B00AB"
                  : "#000"
            }}>
            {turnoData.Turno}
            </h1>

            {/* AREA */}
            <div style={{
            fontSize: "1.8rem",
            marginBottom: "10px",
            color:
              turnoData.EsAreaPreferencial === true && turnoData.EsAreaEspecial !== true
                ? "#237FFA"
                : turnoData.EsAreaEspecial === true && turnoData.EsAreaPreferencial !== true
                  ? "#7B00AB"
                  : "#333",
            fontWeight: "500"
            }}>
            {turnoData.Area}
            </div>

            {/* REFERENCIA */}
            <div style={{
            fontSize: "1.1rem",
            textTransform: "uppercase",
            marginBottom: "8px",
            color: "#666",
            fontWeight: "600",
            letterSpacing: "2px"
            }}>
            REFERENCIA
            </div>

            {/* CÓDIGO */}
            <div style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "10px",
            color: "#000"
            }}>
            {turnoData.Observacion}
            </div>

            {/* FECHA DE CREACIÓN */}
            <div style={{ 
                fontSize: "1.1rem", 
                marginTop: "20px", 
                marginBottom: "5px", 
                color: "#666",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px"
            }}>
            FECHA DE CREACIÓN
            </div>
            <div style={{ fontSize: "1.4rem", marginBottom: "25px", fontWeight: "500" }}>
            {formatDateOnly(turnoData.Fecha)}
            </div>

            {/* TIEMPO DE ESPERA */}
            <div style={{ 
                fontSize: "1.1rem", 
                marginBottom: "5px", 
                color: "#666",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px"
            }}>
            TIEMPO DE ESPERA






            
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: "700", color: "#000" }}>
            {turnoData.Espera}
            </div>

        </div>
        </Container>


      {/* Estilos para impresión */}
      <style>{`
        body {
          font-family: Arial, Helvetica, sans-serif;
        }

        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          
          .container {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          @page {
            margin: 1.5cm;
            size: A4;
          }
        }

        @media screen {
          body {
            background-color: #f5f5f5;
            min-height: 100vh;
          }
        }
      `}</style>
    </>
  );
};

