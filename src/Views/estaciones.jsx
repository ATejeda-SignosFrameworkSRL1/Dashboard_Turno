import { NavbarMenu } from "../components/navbar/navbar";
import { EstacionesContent } from "../components/estaciones/EstacionesContent";

/*
Added by: Luis A. Sierra
Added Date: 26/12/2024

Remove location.reload()

*/

export const Estaciones = function () {
  /*
  const tiempoAleatorio =
    Math.floor(Math.random() * (90000 - 60000 + 1)) + 60000;
  setTimeout(() => {
    location.reload();
  }, tiempoAleatorio);*/

  return (
    <>
      <EstacionesContent />
      <NavbarMenu />
    </>
  );
};
