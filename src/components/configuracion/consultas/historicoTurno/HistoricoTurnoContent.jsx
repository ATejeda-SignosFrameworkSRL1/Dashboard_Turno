import React, { useState, useEffect } from "react";
import axios from "axios";
import { FilterHistoricoTurno } from "./FilterHistoricoTurno";
import { TableHistoricoTurno } from "./TableHistoricoTurno";
import { Loading } from "../../../utils/Loading";

export const HistoricoTurnoContent = () => {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const historicoTurnoProc = import.meta.env.VITE_APP_API_historicoTurno;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;

  const [turno, setTurno] = useState("");
  const [area, setArea] = useState("");
  const [fechaIni, setFechaIni] = useState(0);
  const [fechaFin, setFechaFin] = useState(0);
  const [historicoTurno, setHistoricoTurno] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const getDate = async () => {
    const fullDateFin = new Date();
    const yearFin = fullDateFin.getFullYear();
    const monthFin = String(fullDateFin.getMonth() + 1).padStart(2, "0");
    const dayFin = String(fullDateFin.getDate()).padStart(2, "0");
    const dateFin = `${yearFin}-${monthFin}-${dayFin}`;

    const fullDateIni = new Date();
    fullDateIni.setMonth(fullDateIni.getMonth() - 1);
    const yearIni = fullDateIni.getFullYear();
    const monthIni = String(fullDateIni.getMonth() + 1).padStart(2, "0");
    const dayIni = String(fullDateIni.getDate()).padStart(2, "0");
    const dateIni = `${yearIni}-${monthIni}-${dayIni}`;

    setFechaFin(dateFin);
    setFechaIni(dateIni);
  };

  const getHistoricoTurno = async () => {
    try {
      const response = await axios.post(
        baseUrl + historicoTurnoProc,
        {
          fechaini: `'${fechaIni}'`,
          fechafin: `'${fechaFin}'`,
        },
        config
      );
      setHistoricoTurno(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  useEffect(() => {
    getDate();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (fechaIni !== 0 && fechaFin !== 0) {
      getHistoricoTurno();
    }
  }, [fechaFin, fechaIni]);

  return (
    <>
      <div className="d-flex flex-column px-3 mt-3" style={{ width: "100%" }}>
        <h2 className="text-white fw-bold custom-header">Histórico Turnos</h2>
        <hr className="mt-0" style={{ border: "1px solid white" }} />

        <FilterHistoricoTurno
          turno={turno}
          setTurno={setTurno}
          area={area}
          setArea={setArea}
          fechaIni={fechaIni}
          setFechaIni={setFechaIni}
          fechaFin={fechaFin}
          setFechaFin={setFechaFin}
        />
        {loading ? (
          <Loading />
        ) : (
          <>
            <TableHistoricoTurno
              historicoTurno={historicoTurno}
              turno={turno}
              area={area}
            />
          </>
        )}
      </div>
    </>
  );
};
