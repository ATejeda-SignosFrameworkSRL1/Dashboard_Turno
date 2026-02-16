import { NavbarMenu } from "../../../components/navbar/navbar";
import { SideBar } from "../../../components/sideBar/sideBar";
import { UsuarioDataContent } from "../../../components/configuracion/Mantenimiento/usuarioData/UsuarioDataContent";

export const UsuarioData = () => {
  return (
    <>
      <div className="d-flex align-items-start justify-content-start">
        <div>
          <SideBar />
        </div>
        <UsuarioDataContent />
      </div>
      <NavbarMenu />
    </>
  );
};
