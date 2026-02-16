import { NavbarMenu } from "../../../components/navbar/navbar";
import { SideBar } from "../../../components/sideBar/sideBar";
import { EspecialidadesContent } from "../../../components/configuracion/Mantenimiento/Especialidades/EspecialidadesContent";

export const Especialidades = () => {
  return (
    <>
      <div className="d-flex align-items-start justify-content-start">
        <div>
          <SideBar />
        </div>
        <EspecialidadesContent />
      </div>
      <NavbarMenu />
    </>
  );
};
