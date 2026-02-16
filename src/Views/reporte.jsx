import { NavbarMenu } from "../components/navbar/navbar";
import { ReporteContent } from "../components/reporte/ReporteContent";

/*
Added by: Luis A. Sierra
Added Date: 26/12/2024

Remove location.reload()

*/

export const Reporte = function () {
  /*
  const tiempoAleatorio =
    Math.floor(Math.random() * (90000 - 60000 + 1)) + 60000;
  setTimeout(() => {
    location.reload();
  }, tiempoAleatorio);*/

  return (
    <>
      <ReporteContent />
      <NavbarMenu />
    </>
  );
};
