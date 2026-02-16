import React from "react";
import { Button } from "react-bootstrap";

export const AgregarRegistro = ({ funcion, registro }) => {
  return (
    <>
      <Button variant="primary" size="lg" onClick={funcion}>
        Agregar {registro}
      </Button>
    </>
  );
};