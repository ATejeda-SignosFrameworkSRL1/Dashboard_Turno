import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { ModalPantalla } from "./ModalPantalla";

export const TablePantalla = ({ pantallaData, newLoad, setNewLoad }) => {
  const [show, setShow] = useState(false);
  const [selectedPantalla, setSelectedPantalla] = useState({});

  const openModal = (pantalla) => {
    setShow(true);
    setSelectedPantalla(pantalla);
  };

  return (
    <>
      <h5 className="text-white mb-2 mx-1">
        · Configurar los mensajes de la pantalla
      </h5>
      <div
        className="d-flex flex-column"
        style={{ backgroundColor: "white", borderRadius: "0.25em" }}
      >
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ height: "2px" }}
        />
        <Table
          striped
          bordered
          hover
          responsive
          style={{ marginBottom: "0px" }}
        >
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Descripción</th>
              <th>Mensaje</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pantallaData.map((pantalla, index) => (
              <tr className="text-center" key={`Pantalla ${index}`}>
                <td className="text-center">{index + 1}</td>
                <td style={{ width: "30%" }}>{pantalla.Descripcion}</td>
                <td style={{ width: "50%" }}>{pantalla.Mensaje}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    style={{ padding: "4px 4px" }}
                    onClick={() => openModal(pantalla)}
                  >
                    <MdModeEdit style={{ width: "20px", height: "20px" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ height: "2px" }}
        />
      </div>
      <ModalPantalla
        show={show}
        setShow={setShow}
        pantalla={selectedPantalla}
        newLoad={newLoad}
        setNewLoad={setNewLoad}
      />
    </>
  );
};