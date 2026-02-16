import React, { useState, useEffect } from "react";
import { Table, Form, Badge, Button } from "react-bootstrap";
import { ModalEspecialidad } from "./ModalEspecialidad";
import { usePagination } from "../../../../hooks/usePagination";
import { PaginationTable } from "../../../utils/PaginationTable";
import { MdModeEdit } from "react-icons/md";

export const TableEspecialidades = ({
  especialidades,
  search,
  selectedEspecialidad,
  setSelectedEspecialidad,
  show,
  setShow,
  newLoad,
  setNewLoad,
}) => {
  const [totalEspecialidades, setTotalEspecialidades] = useState(
    JSON.parse(sessionStorage.getItem("totalEspecialidades") ?? false)
  );
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [especialidadesList, setEspecialidadesList] = useState([]);

  const openModal = (especialidad) => {
    setShow(true);
    setSelectedEspecialidad(especialidad);
  };

  const updateEspecialidadesList = () => {
    let updatedList = especialidades;
    if (!totalEspecialidades) {
      updatedList = especialidades.filter(
        (especialidad) => especialidad.Activo
      );
    }
    setEspecialidadesList(updatedList);
    goToPage(1);
  };

  const especialidadesListFiltered = especialidadesList?.filter((especialidad) => {
    return Object.entries(especialidad).some(([clave, valor]) => {
      if (clave === "Descripcion") {
        const valorMinusculas =
          typeof valor === "string" ? valor.toLowerCase() : valor;
        const busquedaMinusculas = search.toLowerCase();
        return (
          typeof valor === "string" &&
          valorMinusculas.includes(
            busquedaMinusculas.length >= 3 ? busquedaMinusculas : ""
          )
        );
      }
      return false;
    });
  });

  const { currentPage, totalPages, goToPage, currentItems } = usePagination(
    especialidadesListFiltered,
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

  const handleChangeTotalEspecialidades = () => {
    setTotalEspecialidades(
      (prevTotalEspecialidades) => !prevTotalEspecialidades
    );
    sessionStorage.setItem("totalEspecialidades", !totalEspecialidades);
  };

  useEffect(() => {
    updateEspecialidadesList();
  }, [totalEspecialidades, itemsPerPage]);

  return (
    <>
      <div
        className="d-flex flex-column mt-3"
        style={{ backgroundColor: "white", borderRadius: "0.25em" }}
      >
        <div className="d-flex justify-content-between align-items-center p-3">
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
          <Form className="d-flex align-items-center">
            <label className="me-2"> Mostrar Todos </label>
            <Form.Check
              type="switch"
              id="custom-switch"
              style={{ margin: "0px" }}
              checked={totalEspecialidades}
              onChange={handleChangeTotalEspecialidades}
            />
          </Form>
        </div>
        <Table
          striped
          bordered
          hover
          responsive
        >
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Descripción</th>
              <th>Estatus</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length
              ? currentItems.map((especialidad) => (
                  <tr
                    className="text-center"
                    key={`Especialidad ${especialidad.Id}`}
                  >
                    <td className="text-center">{especialidad.globalIndex}</td>
                    <td>{especialidad.Descripcion}</td>
                    <td>
                      {especialidad.Activo ? (
                        <Badge
                          pill
                          bg=""
                          style={{
                            backgroundColor: "#d6f0e0",
                            color: "#0d6832",
                            fontSize: "14px",
                          }}
                        >
                          Activo
                        </Badge>
                      ) : (
                        <Badge
                          pill
                          bg=""
                          style={{
                            backgroundColor: "#fbf0da",
                            color: "#73510d",
                            fontSize: "14px",
                          }}
                        >
                          Inactivo
                        </Badge>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        style={{ padding: "4px 4px" }}
                        onClick={() => openModal(especialidad)}
                      >
                        <MdModeEdit style={{ width: "20px", height: "20px" }} />
                      </Button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between align-items-center mx-5">
          <p>
            Mostrando {firstIndex} a {lastIndex} de {especialidadesList.length}{" "}
            entradas
          </p>
          <PaginationTable
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
          />
        </div>
      </div>
      <ModalEspecialidad
        show={show}
        setShow={setShow}
        especialidad={selectedEspecialidad}
        newLoad={newLoad}
        setNewLoad={setNewLoad}
      />
    </>
  );
};
