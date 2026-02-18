/*
Added by: Anderson  Tejeda
Added Date: 19/11/2025: Módulo para transferir turnos entre áreas
*/

import { useState } from "react";
import { Form, Table, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { PaginationTable } from "../../../utils/PaginationTable";
import { usePagination } from "../../../../hooks/usePagination";
import { formattedDate } from "../../../../helpers/functions";
import { BsArrowLeftRight, BsPrinterFill } from "react-icons/bs";

import Swal from "sweetalert2";

export const TableTransferirTurnos = ({
  transferirTurnosData,
  transferirTurno,
  abrirModalImpresion,
}) => {

  const data = transferirTurnosData;
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [impresosIds, setImpresosIds] = useState({});

  const { currentPage, totalPages, goToPage, currentItems } = usePagination(
    data,
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
  
  return (
    <>
      <div
        className="d-flex flex-column"
        style={{ backgroundColor: "white", borderRadius: "0.25em" }}
      >
        <div className="d-flex justify-content-between align-items-center px-3 py-3">
          <div className="d-flex align-items-center">
            <span>Mostrar</span>
            <Form.Select
              className="mx-1"
              style={{ width: "5em" }}
              defaultValue={10}
              onChange={handleChangeItemsPerPage}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </Form.Select>
            <span>registros</span>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Área</th>
              <th>Turno</th>
              <th>Referencia</th>
              <th>Fecha de Creación</th>
              <th>Espera</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length ? (
              currentItems?.map((turno) => {
                const esPreferencial =
                  turno.EsAreaPreferencial === true && turno.EsAreaEspecial !== true;
                const esEspecial =
                  turno.EsAreaEspecial === true && turno.EsAreaPreferencial !== true;
                const estiloPreferencial = {
                  color: esPreferencial
                    ? '#237FFA'
                    : esEspecial
                      ? '#7B00AB'
                      : '#6c757d',
                  fontWeight: esPreferencial || esEspecial ? '600' : 'normal'
                };
                return (
                <tr 
                  className="text-center" 
                  key={turno.globalIndex}
                >
                  <td style={estiloPreferencial}>{turno.globalIndex}</td>
                  <td style={estiloPreferencial}>{turno.Area}</td>
                  <td style={estiloPreferencial}>{turno.Turno}</td>
                  <td style={estiloPreferencial}>{turno.Observacion || '-'}</td>
                  <td style={estiloPreferencial}>{formattedDate(turno.Fecha)}</td>
                  <td style={estiloPreferencial}>{turno.Espera || '-'}</td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button
                        variant="light"
                        size="sm"
                        style={{ padding: "4px 4px",
                        borderColor: "#DCDDDE"
                        }}
                        onClick={() =>
                          confirmTransferirTurno(
                            turno.IdTurno,
                            turno.Turno,
                            turno.Area
                          )
                        }
                      >
                        <BsArrowLeftRight
                          style={{ 
                            width: "20px", 
                            height: "20px" 
                          }}
                        />
                      </Button>
                      <Button
                      variant="light"
                      size="sm"
                      style={{ 
                        padding: "4px 4px",
                        backgroundColor: impresosIds[turno.IdTurno] ? '#78206E' : '',
                        borderColor: impresosIds[turno.IdTurno] ? '#78206E' : '#DCDDDE'
                      }}
                      onClick={() => handleImprimir(turno.IdTurno)}
                    >
                      <BsPrinterFill
                        style={{ 
                          width: "20px", 
                          height: "20px",
                          color: impresosIds[turno.IdTurno] ? 'white' : '#6c757d'
                        }}
                      />
                    </Button>
                    </div>
                  </td>
                </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center font-monospace">
                  No hay turnos disponibles para transferir
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between align-items-center mx-5">
          <p>
            Mostrando {firstIndex} a {lastIndex} de {data.length} entradas
          </p>
          <PaginationTable
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
          />
        </div>
      </div>
    </>
  );
};

TableTransferirTurnos.propTypes = {
  transferirTurnosData: PropTypes.array.isRequired,
  transferirTurno: PropTypes.func.isRequired,
  abrirModalImpresion: PropTypes.func.isRequired,
};

