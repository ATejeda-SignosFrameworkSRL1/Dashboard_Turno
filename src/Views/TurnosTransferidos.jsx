import { NavbarMenu } from "../components/navbar/navbar";
import { TurnosTransferidosContent } from "../components/turnosTransferidos/TurnosTransferidosContent";

/*
Added by: Luis A. Sierra
Added Date: 20/12/2024

Remove location.reload()

*/

export const TurnosTransferidos = function () {

  /*
  const tiempoAleatorio =
    Math.floor(Math.random() * (90000 - 60000 + 1)) + 60000;
  setTimeout(() => {
    location.reload();
  }, tiempoAleatorio); */

  return (
    <>
      <TurnosTransferidosContent />
      <NavbarMenu />
    </>
  );
};
