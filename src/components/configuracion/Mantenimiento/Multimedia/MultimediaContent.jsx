import React, { useState, useEffect } from "react";
import axios from "axios";
import { TablePantalla } from "./TablePantalla";
import { Loading } from "../../../utils/Loading";

export const MultimediaContent = () => {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const pantallaProc = import.meta.env.VITE_APP_API_actBarraDeMensaje;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;

  const [pantallaData, setPantallaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLoad, setNewLoad] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const getPantalla = async () => {
    try {
      const response = await axios.get(baseUrl + pantallaProc, config);
      setPantallaData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  useEffect(() => {
    getPantalla();
  }, []);

  useEffect(() => {
    getPantalla();
  }, [newLoad]);

  return (
    <>
      <div className="d-flex flex-column px-3 mt-3" style={{ width: "100%" }}>
        <h2 className="text-white fw-bold custom-header">Multimedia</h2>
        <hr className="mt-0" style={{ border: "1px solid white" }} />

        {loading ? (
          <Loading />
        ) : (
          <TablePantalla
            pantallaData={pantallaData}
            newLoad={newLoad}
            setNewLoad={setNewLoad}
          />
        )}
      </div>
    </>
  );
};
