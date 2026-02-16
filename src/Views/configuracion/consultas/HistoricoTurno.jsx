import { NavbarMenu } from "../../../components/navbar/navbar";
import { SideBar } from "../../../components/sideBar/sideBar";
import { HistoricoTurnoContent } from "../../../components/configuracion/consultas/historicoTurno/HistoricoTurnoContent";

export const HistoricoTurno = function () {
  return (
    <>
      <div className="d-flex align-items-start justify-content-start">
        <div>
          <SideBar />
        </div>
        <HistoricoTurnoContent />
      </div>
      <NavbarMenu />
    </>
  );
};
