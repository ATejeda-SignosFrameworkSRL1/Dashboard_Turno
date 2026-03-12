/*
Added by: Anderson  Tejeda
Added Date: 19/11/2025: Módulo para transferir turnos entre áreas
*/

import { useState, useMemo } from "react";
import { Form, Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";
import { PaginationTable } from "../../../utils/PaginationTable";
import { usePagination } from "../../../../hooks/usePagination";
import { formattedDate } from "../../../../helpers/functions";
import { BsArrowLeftRight, BsPrinterFill, BsTrash, BsSearch, BsInboxes } from "react-icons/bs";

import Swal from "sweetalert2";

export const TableTransferirTurnos = ({
  transferirTurnosData,
  transferirTurno,
  eliminarTurno,
  abrirModalImpresion,
}) => {

  const data = transferirTurnosData;
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [impresosIds, setImpresosIds] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const q = searchTerm.toLowerCase();
    return data.filter(
      (t) =>
        t.Turno?.toLowerCase().includes(q) ||
        t.Area?.toLowerCase().includes(q) ||
        t.Observacion?.toLowerCase().includes(q)
    );
  }, [data, searchTerm]);

  const { currentPage, totalPages, goToPage, currentItems } = usePagination(
    filteredData,
    itemsPerPage
  );

  const firstIndex = currentItems.length > 0 ? currentItems[0].globalIndex : 0;
  const lastIndex =
    currentItems.length > 0
      ? currentItems[currentItems.length - 1].globalIndex
      : 0;

  const handleChangeItemsPerPage = (e) => {
    const selectItemsPerPage = e.target.value;
    setItemsPerPage(selectItemsPerPage);
  };
  

  const confirmTransferirTurno = async (idTurno, turno, areaActual) => {
    const { isConfirmed } = await Swal.fire({
      title: `¿Transferir turno: ${turno}?`,
      html: `
        <p>Área actual: <strong>${areaActual}</strong></p>
        <p style="margin-top: 15px;">Esta acción transferirá el turno al operador.</p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, transferir",
      cancelButtonText: "Cancelar",
    });

    if (isConfirmed) {
      transferirTurno(idTurno);
    }
  };

  const handleImprimir = (idTurno) => {
    setImpresosIds(prev => ({
      ...prev,
      [idTurno]: true
    }));

    abrirModalImpresion(idTurno);
  };

  const solicitarCodigoValidacion = async () => {
    const codigo = Math.floor(1000 + Math.random() * 9000).toString();
    const { isConfirmed, value } = await Swal.fire({
      title: "Validacion requerida",
      html: `Para continuar, escribe este codigo: <strong>${codigo}</strong>`,
      input: "text",
      inputLabel: "Codigo de 4 digitos",
      inputPlaceholder: "Ejemplo: 1234",
      showCancelButton: true,
      confirmButtonText: "Validar",
      cancelButtonText: "Cancelar",
      inputValidator: (inputValue) => {
        const limpio = (inputValue ?? "").trim();
        if (!/^\d{4}$/.test(limpio)) return "Debes escribir 4 numeros.";
        if (limpio !== codigo) return "Codigo incorrecto.";
        return undefined;
      },
    });

    return isConfirmed && (value ?? "").trim() === codigo;
  };

  const confirmEliminar = async (idTurno, turno, areaActual) => {
    const { isConfirmed } = await Swal.fire({
      title: `¿Eliminar turno: ${turno}?`,
      html: `
        <p>Área actual: <strong>${areaActual}</strong></p>
        <p style="margin-top: 15px;">Esta acción eliminará el turno.</p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (isConfirmed) {
      const codigoValido = await solicitarCodigoValidacion();
      if (!codigoValido) return;
      eliminarTurno(idTurno);
    }
  };

  const getEsperaColor = (espera) => {
    if (!espera) return null;
    const parts = espera.split(":").map(Number);
    const totalMinutos = (parts[0] || 0) * 60 + (parts[1] || 0);
    if (totalMinutos < 3) return { bg: "#e6f9ee", border: "#a3e4bc", color: "#198754" };
    if (totalMinutos < 10) return { bg: "#fff8e6", border: "#ffe0a3", color: "#cc8800" };
    return { bg: "#fce8e8", border: "#f5b3b3", color: "#dc3545" };
  };

  const getAreaChipStyle = (esPreferencial, esEspecial) => {
    if (esPreferencial) return { bg: "#EBF4FF", border: "#BDD7FF", color: "#237FFA" };
    if (esEspecial) return { bg: "#F5EBFF", border: "#D9ABFF", color: "#7B00AB" };
    return { bg: "#f1f3f5", border: "#dee2e6", color: "#495057" };
  };

  const getBorderLeftColor = (esPreferencial, esEspecial) => {
    if (esPreferencial) return "#237FFA";
    if (esEspecial) return "#7B00AB";
    return "transparent";
  };

  return (
    <>
      <div
        className="d-flex flex-column"
        style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
          overflow: "hidden",
        }}
      >
        {/* Barra de herramientas */}
        <div
          className="d-flex flex-wrap justify-content-end align-items-center px-4 py-3 gap-2"
          style={{ borderBottom: "1px solid #e9ecef" }}
        >
          <div className="d-flex align-items-center gap-3">
            <span
              style={{
                backgroundColor: "#212529",
                color: "white",
                borderRadius: "999px",
                padding: "0.25rem 0.75rem",
                fontSize: "0.78rem",
                fontWeight: "600",
                whiteSpace: "nowrap",
              }}
            >
              {data.length} turno{data.length !== 1 ? "s" : ""}
            </span>

            <div style={{ position: "relative" }}>
              <BsSearch
                style={{
                  position: "absolute",
                  left: "0.65rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#adb5bd",
                  fontSize: "0.85rem",
                  pointerEvents: "none",
                }}
              />
              <Form.Control
                type="text"
                placeholder="Buscar turno, área o referencia…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: "2rem",
                  paddingRight: searchTerm ? "2rem" : "0.75rem",
                  fontSize: "0.85rem",
                  width: "260px",
                  border: "1px solid #dee2e6",
                  borderRadius: "0.375rem",
                  height: "36px",
                  boxShadow: "none",
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  style={{
                    position: "absolute",
                    right: "0.5rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#adb5bd",
                    cursor: "pointer",
                    fontSize: "1rem",
                    lineHeight: 1,
                    padding: 0,
                  }}
                  aria-label="Limpiar búsqueda"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div style={{ overflowX: "auto" }}>
          <Table
            hover
            className="mb-0"
            style={{ fontSize: "0.875rem", borderCollapse: "separate", borderSpacing: 0 }}
          >
            <thead style={{ backgroundColor: "#212529" }}>
              <tr>
                {["#", "Área", "Turno", "Referencia", "Fecha de Creación", "Espera", "Acciones"].map(
                  (col) => (
                    <th
                      key={col}
                      className="text-center"
                      style={{
                        fontWeight: "600",
                        fontSize: "0.78rem",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        padding: "0.75rem 1rem",
                        border: "none",
                        backgroundColor: "#212529",
                        borderBottom: "1px solid #343a40",
                        whiteSpace: "nowrap",
                        color: "white",
                      }}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {currentItems.length ? (
                currentItems.map((turno, idx) => {
                  const esPreferencial =
                    turno.EsAreaPreferencial === true && turno.EsAreaEspecial !== true;
                  const esEspecial =
                    turno.EsAreaEspecial === true && turno.EsAreaPreferencial !== true;
                  const areaChip = getAreaChipStyle(esPreferencial, esEspecial);
                  const esperaColor = getEsperaColor(turno.Espera);
                  const borderLeft = getBorderLeftColor(esPreferencial, esEspecial);
                  const isOdd = idx % 2 === 1;

                  return (
                    <tr
                      key={turno.globalIndex}
                      style={{
                        borderBottom: "1px solid #f1f3f5",
                        transition: "background 0.15s",
                        backgroundColor: isOdd ? "#fafbfc" : "white",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f0f4f8"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isOdd ? "#fafbfc" : "white"; }}
                    >
                      {/* # con borde izquierdo de color */}
                      <td
                        className="text-center"
                        style={{
                          padding: "0.75rem 1rem",
                          color: "#6c757d",
                          fontWeight: "500",
                          borderLeft: `3px solid ${borderLeft}`,
                        }}
                      >
                        {turno.globalIndex}
                      </td>

                      {/* Área como chip */}
                      <td className="text-center" style={{ padding: "0.75rem 0.75rem" }}>
                        <span
                          style={{
                            display: "inline-block",
                            backgroundColor: areaChip.bg,
                            color: areaChip.color,
                            border: `1px solid ${areaChip.border}`,
                            borderRadius: "999px",
                            padding: "0.2rem 0.7rem",
                            fontSize: "0.78rem",
                            fontWeight: "600",
                          }}
                        >
                          {turno.Area}
                        </span>
                      </td>

                      {/* Turno */}
                      <td
                        className="text-center"
                        style={{
                          padding: "0.75rem 1rem",
                          fontWeight: "600",
                          color: "#212529",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {turno.Turno}
                      </td>

                      {/* Referencia */}
                      <td
                        className="text-center"
                        style={{ padding: "0.75rem 1rem", color: "#6c757d" }}
                      >
                        {turno.Observacion || (
                          <span style={{ color: "#ced4da" }}>—</span>
                        )}
                      </td>

                      {/* Fecha */}
                      <td
                        className="text-center"
                        style={{ padding: "0.75rem 1rem", color: "#495057", whiteSpace: "nowrap" }}
                      >
                        {formattedDate(turno.Fecha)}
                      </td>

                      {/* Espera con color semántico */}
                      <td className="text-center" style={{ padding: "0.75rem 1rem" }}>
                        {turno.Espera && esperaColor ? (
                          <span
                            style={{
                              backgroundColor: esperaColor.bg,
                              border: `1px solid ${esperaColor.border}`,
                              color: esperaColor.color,
                              borderRadius: "999px",
                              padding: "0.2rem 0.65rem",
                              fontSize: "0.8rem",
                              fontWeight: "600",
                            }}
                          >
                            {turno.Espera}
                          </span>
                        ) : (
                          <span style={{ color: "#ced4da" }}>—</span>
                        )}
                      </td>

                      {/* Acciones */}
                      <td className="text-center" style={{ padding: "0.6rem 1rem" }}>
                        <div className="d-flex gap-2 justify-content-center">
                          <OverlayTrigger placement="top" overlay={<Tooltip>Transferir turno</Tooltip>}>
                            <Button
                              variant="outline-dark"
                              size="sm"
                              style={{
                                borderRadius: "0.375rem",
                                padding: "5px 8px",
                                lineHeight: 1,
                                border: "1px solid #dee2e6",
                              }}
                              onClick={() =>
                                confirmTransferirTurno(turno.IdTurno, turno.Turno, turno.Area)
                              }
                            >
                              <BsArrowLeftRight style={{ width: "16px", height: "16px" }} />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip>
                                {impresosIds[turno.IdTurno] ? "Imprimir de nuevo" : "Imprimir comprobante"}
                              </Tooltip>
                            }
                          >
                            <Button
                              size="sm"
                              style={{
                                borderRadius: "0.375rem",
                                padding: "5px 8px",
                                lineHeight: 1,
                                backgroundColor: impresosIds[turno.IdTurno] ? "#78206E" : "white",
                                border: `1px solid ${impresosIds[turno.IdTurno] ? "#78206E" : "#dee2e6"}`,
                                color: impresosIds[turno.IdTurno] ? "white" : "#6c757d",
                              }}
                              onClick={() => handleImprimir(turno.IdTurno)}
                            >
                              <BsPrinterFill style={{ width: "16px", height: "16px" }} />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar turno</Tooltip>}>
                            <Button
                              size="sm"
                              style={{
                                borderRadius: "0.375rem",
                                padding: "5px 8px",
                                lineHeight: 1,
                                backgroundColor: "white",
                                border: "1px solid #f5c2c7",
                                color: "#dc3545",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#dc3545";
                                e.currentTarget.style.color = "white";
                                e.currentTarget.style.borderColor = "#dc3545";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "white";
                                e.currentTarget.style.color = "#dc3545";
                                e.currentTarget.style.borderColor = "#f5c2c7";
                              }}
                              onClick={() => confirmEliminar(turno.IdTurno, turno.Turno, turno.Area)}
                            >
                              <BsTrash style={{ width: "16px", height: "16px" }} />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} style={{ padding: "3.5rem 1rem", border: "none" }}>
                    <div className="d-flex flex-column align-items-center gap-2" style={{ color: "#adb5bd" }}>
                      <BsInboxes style={{ width: "2.5rem", height: "2.5rem" }} />
                      <span style={{ fontSize: "0.95rem", fontWeight: "500" }}>
                        {searchTerm
                          ? `Sin resultados para "${searchTerm}"`
                          : "No hay turnos disponibles para transferir"}
                      </span>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#212529",
                            fontSize: "0.82rem",
                            cursor: "pointer",
                            textDecoration: "underline",
                            padding: 0,
                          }}
                        >
                          Limpiar búsqueda
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Footer */}
        <div
          className="d-flex flex-wrap justify-content-between align-items-center px-4 py-3 gap-3"
          style={{ borderTop: "1px solid #e9ecef", backgroundColor: "#f8f9fa" }}
        >
          <span style={{ fontSize: "0.82rem", color: "#6c757d" }}>
            {filteredData.length > 0
              ? `Mostrando ${firstIndex}–${lastIndex} de ${filteredData.length} ${
                  searchTerm ? `resultado${filteredData.length !== 1 ? "s" : ""}` : `entrada${filteredData.length !== 1 ? "s" : ""}`
                }`
              : "Sin entradas"}
          </span>

          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <span style={{ fontSize: "0.82rem", color: "#6c757d", whiteSpace: "nowrap" }}>
                Mostrar
              </span>
              <Form.Select
                style={{
                  width: "4.5rem",
                  fontSize: "0.82rem",
                  border: "1px solid #dee2e6",
                  borderRadius: "0.375rem",
                  padding: "0.25rem 0.4rem",
                  color: "#212529",
                  height: "32px",
                  boxShadow: "none",
                }}
                defaultValue={10}
                onChange={handleChangeItemsPerPage}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Form.Select>
              <span style={{ fontSize: "0.82rem", color: "#6c757d", whiteSpace: "nowrap" }}>
                registros
              </span>
            </div>

            <PaginationTable
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

TableTransferirTurnos.propTypes = {
  transferirTurnosData: PropTypes.array.isRequired,
  transferirTurno: PropTypes.func.isRequired,
  eliminarTurno: PropTypes.func.isRequired,
  abrirModalImpresion: PropTypes.func.isRequired,
};

