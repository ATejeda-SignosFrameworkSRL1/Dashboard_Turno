import React, { useState, useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import { PaginationTable } from "../../../utils/PaginationTable";
import { usePagination } from "../../../../hooks/usePagination";
import { capitalizeWord } from "../../../../helpers/functions";
import { formattedDate } from "../../../../helpers/functions";

export const TableHistoricoTurno = ({ historicoTurno, turno, area }) => {
  const filteredData = historicoTurno.filter((register) => {
    return (
      register.Turno.toUpperCase().includes(turno.toUpperCase()) &&
      register.Area.toLowerCase().includes(area.toLowerCase())
    );
  });

  const [itemsPerPage, setItemsPerPage] = useState(10);

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
    const selectItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(selectItemsPerPage);
  };

  return (
    <>
      <div
        className="d-flex flex-column mt-4"
        style={{ backgroundColor: "white", borderRadius: "0.25em" }}
      >
        <div className="d-flex align-items-center px-3 py-2">
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
        <Table striped bordered hover responsive>
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Turno</th>
              <th>Area</th>
              <th>Acción</th>
              <th>Fecha de creación</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length ? (
              currentItems?.map((turno) => (
                <tr className="text-center" key={turno.globalIndex}>
                  <td className="text-center">{turno.globalIndex}</td>
                  <td>{turno.Turno}</td>
                  <td>{turno.Area}</td>
                  <td>{capitalizeWord(turno.Accion)}</td>
                  <td>{formattedDate(turno.Fecha)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center font-monospace">
                  No hay turno disponibles en esta búsqueda
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between align-items-center mx-5">
          <p>
            Mostrando {firstIndex} a {lastIndex} de {filteredData.length}{" "}
            entradas
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
