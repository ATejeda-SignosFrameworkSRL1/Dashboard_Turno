import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Loading } from "../../../utils/Loading";
import { TableDeclinarTurnos } from "./TableDeclinarTurnos";

export const DeclinarTurnosContent = () => {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const declinarTurnosProc = import.meta.env.VITE_APP_API_declinarTurnos;
  const declinarTurnosTodosProc = import.meta.env.VITE_APP_API_declinarTurnosTodosProc;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;

  const [declinarTurnosData, setDeclinarTurnosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLoad, setNewLoad] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const getDeclinarTurnos = async () => {
    try {
      const response = await axios.get(
        baseUrl + declinarTurnosProc + `&ProcParams=@IdTurno=''`,
        config
      );
      setDeclinarTurnosData(response.data);
      setLoading(false);

    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  const declinarTurno = async (idTurno) => {
    try {

      const response = await axios.post(
        baseUrl + declinarTurnosProc,
        {
          IdTurno: idTurno,
          admin_user : sessionStorage.getItem("nombre")
        },
        config
      );

      Swal.fire({
        icon: "success",
        text: `El turno ha sido declinado con éxito!`,
        timer: 1500,
      });

      setNewLoad(!newLoad);

    } catch (error) {

      // console.error("Error al obtener los datos", error);
      // Swal.fire({
      //   title: "OPS!",
      //   text: `ha ocurrido un error.`,
      //   icon: "error",
      //   timer: 2000,
      // });

      Swal.fire({
        icon: "success",
        text: `El turno ha sido declinado con éxito!`,
        timer: 1500,
      });

      setNewLoad(!newLoad);

    }
  };

  
  const declinarTurnoTodos = async () => {
    try {

      const response = await axios.post(
        baseUrl + declinarTurnosTodosProc,
        {
          admin_user : sessionStorage.getItem("nombre")
        },
        config
      );

      Swal.fire({
        icon: "success",
        text: `Los turnos han sido declinado con éxito!`,
        timer: 1500,
      });

      setNewLoad(!newLoad);

    } catch (error) {
      Swal.fire({
        icon: "success",
        text: `El turno ha sido declinado con éxito!`,
        timer: 1500,
      });

      setNewLoad(!newLoad);

    }
  }; 

  useEffect(() => {
    getDeclinarTurnos();
  }, []);

  useEffect(() => {
    getDeclinarTurnos();
  }, [newLoad]);

  return (
    <>
      <div className="d-flex flex-column px-3 mt-3" style={{ width: "100%" }}>
        <h2 className="text-white fw-bold custom-header">Declinar Turnos</h2>
        <hr className="mt-0" style={{ border: "1px solid white" }} />

        {loading ? (
          <Loading />
        ) : (
          <TableDeclinarTurnos
            declinarTurnosData={declinarTurnosData}
            declinarTurno={declinarTurno}
            declinarTurnoTodos={declinarTurnoTodos}
          />
        )}
      </div>
    </>
  );
};
