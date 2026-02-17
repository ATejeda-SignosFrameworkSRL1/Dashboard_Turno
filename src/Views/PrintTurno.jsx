import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { BsPrinterFill } from "react-icons/bs";
import axios from "axios";

export const PrintTurno = () => {
  const { idTurno } = useParams();
  const [turnoData, setTurnoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [baseUrl, setBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState("");

  // Cargar configuración desde appsettings.json (en localhost, URL completa se convierte a ruta relativa para usar proxy y evitar CORS)
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
        const response = await axios.get(
          `${baseUrl}GenericWeb?proctoken=spTransferirOperadorTurnosDashboard`,
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
              EsAreaPreferencial: turnoEncontrado.EsAreaPreferencial,
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
    if (idTurno && baseUrl && apiKey) {
      getTurnoDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTurno, baseUrl, apiKey]);

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
            color: "#000"
            }}>
            {turnoData.Turno}
            </h1>

            {/* AREA */}
            <div style={{
            fontSize: "1.8rem",
            marginBottom: "10px",
            color: "#333",
            fontWeight: "500"
            }}>
            {turnoData.Area}
            </div>

            {/* PREFERENCIAL */}
            {turnoData.EsAreaPreferencial && (
            <div style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                marginBottom: "30px",
                marginTop: "15px",
                color: "#000",
                letterSpacing: "3px"
            }}>
                ★ PREFERENCIAL ★
            </div>
            )}

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

            {/* NOMBRE (si lo tienes dentro de referencia o viene de API) */}
            <div style={{
            fontSize: "1.5rem",
            marginBottom: "35px",
            fontWeight: "500",
            color: "#333"
            }}>
            {turnoData.NombreCliente ?? "Nombre del Cliente"}
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
            {turnoData.Fecha}
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

