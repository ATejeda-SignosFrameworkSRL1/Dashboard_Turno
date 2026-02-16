import { NavbarMenu } from "../../../components/navbar/navbar";
import { SideBar } from "../../../components/sideBar/sideBar";
import { GrupoUsuariosContent } from "../../../components/configuracion/Mantenimiento/grupoUsuarios/GrupoUsuariosContent";

export const GrupoUsuarios = () => {
  return (
    <>
      <div className="d-flex align-items-start justify-content-start">
        <div>
          <SideBar />
        </div>
        <GrupoUsuariosContent />
      </div>
      <NavbarMenu />
    </>
  );
};
 