/*
Added by: Luis A. Sierra
Added Date: 29/01/2025: se agrego la funcion confirmDeclinarTodos
*/

import React, { useState } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { PaginationTable } from "../../../utils/PaginationTable";
import { usePagination } from "../../../../hooks/usePagination";
import { capitalizeWord } from "../../../../helpers/functions";
import { formattedDate } from "../../../../helpers/functions";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";

export const TableDeclinarTurnos = ({ declinarTurnosData, declinarTurno,declinarTurnoTodos }) => {

  const data = declinarTurnosData;

  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  const confirmDeclinarTurno = (idTurno, turno) => {
    Swal.fire({
      title: `Estas seguro de que quieres declinar este turno: ${turno}?`,
      icon: "warning",
      showCancelButton: ["Cancelar", true],
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Si, declinar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
            declinarTurno(idTurno);     
      }
    });
  };

  const confirmDeclinarTurnoTodos = () => {
    Swal.fire({
         title: `Estas seguro de que declinar todos los turnos?`,
         icon: "warning",
         showCancelButton: ["Cancelar", true],
         confirmButtonColor: "#d33",
         cancelButtonColor: "#6c757d",
         confirmButtonText: "Si, declinar todos",
         cancelButtonText: "Cancelar",
       }).then((result) => {
         if (result.isConfirmed) { 
            declinarTurnoTodos();
          }       
    });
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
          <Button variant="danger" disabled={data.length === 0} onClick={confirmDeclinarTurnoTodos}>
            Declinar Todos
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Turno</th>
              <th>Area</th>
              <th>Acción</th>
              <th>Fecha de creación</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length ? (
              currentItems?.map((turno) => (
                <tr className="text-center" key={turno.globalIndex}>
                  <td>{turno.globalIndex}</td>
                  <td>{turno.Turno}</td>
                  <td>{turno.Area}</td>
                  <td>{capitalizeWord(turno.Accion)}</td>
                  <td>{formattedDate(turno.Fecha)}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      style={{ padding: "4px 4px" }}
                      onClick={() =>
                        confirmDeclinarTurno(turno.IdTurno, turno.Turno)
                      }
                    >
                      <RiDeleteBinLine
                        style={{ width: "20px", height: "20px" }}
                      />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center font-monospace">
                  No hay turnos disponibles para declinar
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
