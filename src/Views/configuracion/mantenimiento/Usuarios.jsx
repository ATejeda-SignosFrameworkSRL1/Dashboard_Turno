import { NavbarMenu } from "../../../components/navbar/navbar";
import { SideBar } from "../../../components/sideBar/sideBar";
import { UsuariosContent } from "../../../components/configuracion/Mantenimiento/usuarios/UsuariosContent";

export const Usuarios = () => {
  return (
    <>
      <div className="d-flex align-items-start justify-content-start">
        <div>
          <SideBar />
        </div>
        <UsuariosContent />
      </div>
      <NavbarMenu />
    </>
  );
};
