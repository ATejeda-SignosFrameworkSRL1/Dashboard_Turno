import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Container } from "react-bootstrap";
import { BsPrinterFill } from "react-icons/bs";
import api from "../../../../config/api";

export const ModalImprimirTurno = ({ show, onHide, idTurno, apiKey }) => {
  const [turnoData, setTurnoData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTurnoDetails = async () => {
      if (!show || !idTurno || !apiKey) return;

      setLoading(true);
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

        if (Array.isArray(response.data)) {
          const turnoEncontrado = response.data.find(
            (turno) => turno.IdTurno === parseInt(idTurno, 10)
          );

          if (turnoEncontrado) {
            setTurnoData({
              IdTurno: turnoEncontrado.IdTurno,
              Turno: turnoEncontrado.Turno,
              Area: turnoEncontrado.Area,
              Fecha: turnoEncontrado["Fecha de Creación"],
              Espera: turnoEncontrado.Espera,
              Observacion: turnoEncontrado.Referencia,
              EsAreaPreferencial: turnoEncontrado.EsAreaPreferencial === true,
              EsAreaEspecial: turnoEncontrado.EsAreaEspecial === true,
            });
          } else {
            setTurnoData(null);
          }
        } else {
          setTurnoData(null);
        }
      } catch (error) {
        console.error("Error al obtener los datos del turno", error);
        setTurnoData(null);
      } finally {
        setLoading(false);
      }
    };

    getTurnoDetails();
  }, [show, idTurno, apiKey]);

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const formatDateOnly = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}/${month}/${day}`;
  };

  const handlePrint = () => {
    if (!turnoData) return;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    const isPreferencial =
      turnoData.EsAreaPreferencial === true && turnoData.EsAreaEspecial !== true;
    const isEspecial =
      turnoData.EsAreaEspecial === true && turnoData.EsAreaPreferencial !== true;
    const preferencialHtml = "";
    const turnoColor = isPreferencial ? "#237FFA" : isEspecial ? "#7B00AB" : "#000";
    const areaColor = isPreferencial ? "#237FFA" : isEspecial ? "#7B00AB" : "#333";

    doc.open();
    doc.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title></title>
          <style>
            @page { margin: 1.5cm; size: A4; }
            body {
              margin: 0;
              background: #fff;
              font-family: Arial, Helvetica, sans-serif;
            }
            .container {
              max-width: 650px;
              margin: 0 auto;
              text-align: center;
              padding: 20px 30px;
            }
            .turno {
              font-size: 5rem;
              font-weight: bold;
              margin: 0 0 15px;
              letter-spacing: 8px;
              color: ${turnoColor};
            }
            .area {
              font-size: 1.8rem;
              margin-bottom: 10px;
              color: ${areaColor};
              font-weight: 500;
            }
            .label {
              font-size: 1.1rem;
              text-transform: uppercase;
              margin-bottom: 8px;
              color: #666;
              font-weight: 600;
              letter-spacing: 2px;
            }
            .value {
              font-size: 2rem;
              font-weight: 700;
              margin-bottom: 10px;
              color: #000;
            }
            .fecha-label, .espera-label {
              font-size: 1.1rem;
              margin-bottom: 5px;
              color: #666;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .fecha-label { margin-top: 20px; }
            .fecha-value {
              font-size: 1.4rem;
              margin-bottom: 25px;
              font-weight: 500;
            }
            .espera-value {
              font-size: 1.6rem;
              font-weight: 700;
              color: #000;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="turno">${escapeHtml(turnoData.Turno)}</h1>
            <div class="area">${escapeHtml(turnoData.Area)}</div>
            ${preferencialHtml}
            <div class="label">REFERENCIA</div>
            <div class="value">${escapeHtml(turnoData.Observacion)}</div>
            <div class="fecha-label">FECHA DE CREACION</div>
            <div class="fecha-value">${escapeHtml(formatDateOnly(turnoData.Fecha))}</div>
            <div class="espera-label">TIEMPO DE ESPERA</div>
            <div class="espera-value">${escapeHtml(turnoData.Espera)}</div>
          </div>
        </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    setTimeout(() => {
      iframe.remove();
    }, 1000);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        size="lg"
        dialogClassName="print-turno-modal-dialog"
      >
        <Modal.Header closeButton className="no-print">
          <Modal.Title>Vista previa de comprobante</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {loading ? (
            <Container className="py-5 text-center">
              <h5>Cargando detalles del turno...</h5>
            </Container>
          ) : !turnoData ? (
            <Container className="py-5 text-center">
              <h5>No se encontro informacion del turno</h5>
            </Container>
          ) : (
            <div className="print-modal-printable">
              <Container
                className="mt-4 mb-5"
                style={{ maxWidth: "650px", textAlign: "center" }}
              >
                <div style={{ backgroundColor: "white", padding: "40px 30px" }}>
                  {(() => {
                    const isPreferencial =
                      turnoData.EsAreaPreferencial === true && turnoData.EsAreaEspecial !== true;
                    const isEspecial =
                      turnoData.EsAreaEspecial === true && turnoData.EsAreaPreferencial !== true;
                    return (
                      <h1
                        style={{
                          fontSize: "5rem",
                          fontWeight: "bold",
                          marginBottom: "15px",
                          letterSpacing: "8px",
                          color: isPreferencial
                            ? "#237FFA"
                            : isEspecial
                              ? "#7B00AB"
                              : "#000",
                        }}
                      >
                        {turnoData.Turno}
                      </h1>
                    );
                  })()}

                  <div
                    style={{
                      fontSize: "1.8rem",
                      marginBottom: "10px",
                      color:
                        turnoData.EsAreaPreferencial === true && turnoData.EsAreaEspecial !== true
                          ? "#237FFA"
                          : turnoData.EsAreaEspecial === true &&
                              turnoData.EsAreaPreferencial !== true
                            ? "#7B00AB"
                            : "#333",
                      fontWeight: "500",
                    }}
                  >
                    {turnoData.Area}
                  </div>

                  <div
                    style={{
                      fontSize: "1.1rem",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                      color: "#666",
                      fontWeight: "600",
                      letterSpacing: "2px",
                    }}
                  >
                    REFERENCIA
                  </div>

                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      marginBottom: "10px",
                      color: "#000",
                    }}
                  >
                    {turnoData.Observacion}
                  </div>

                  <div
                    style={{
                      fontSize: "1.1rem",
                      marginTop: "20px",
                      marginBottom: "5px",
                      color: "#666",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    FECHA DE CREACION
                  </div>
                  <div
                    style={{
                      fontSize: "1.4rem",
                      marginBottom: "25px",
                      fontWeight: "500",
                    }}
                  >
                    {formatDateOnly(turnoData.Fecha)}
                  </div>

                  <div
                    style={{
                      fontSize: "1.1rem",
                      marginBottom: "5px",
                      color: "#666",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    TIEMPO DE ESPERA
                  </div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "700", color: "#000" }}>
                    {turnoData.Espera}
                  </div>
                </div>
              </Container>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="no-print">
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
          <Button variant="dark" onClick={handlePrint} disabled={loading || !turnoData}>
            <BsPrinterFill style={{ marginRight: "8px" }} />
            Imprimir comprobante
          </Button>
        </Modal.Footer>
      </Modal>

      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }

          .print-modal-printable,
          .print-modal-printable * {
            visibility: visible !important;
          }

          .print-modal-printable {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white;
          }

          .no-print,
          .modal-header,
          .modal-footer,
          .modal-backdrop {
            display: none !important;
          }

          @page {
            margin: 1.5cm;
            size: A4;
          }
        }
      `}</style>
    </>
  );
};

ModalImprimirTurno.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  idTurno: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  apiKey: PropTypes.string.isRequired,
};
