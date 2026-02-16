import { NavbarMenu } from "../../../components/navbar/navbar";
import { SideBar } from "../../../components/sideBar/sideBar";
import { PersonalizarSistemaContent } from "../../../Views/configuracion/personalizar/PersonalizarSistemaContent";

export const Personalizar = () => { 
  return (
    <>
      <div className="d-flex align-items-start justify-content-start">
        <div>
          <SideBar />
        </div>
           <PersonalizarSistemaContent />
        </div>
      <NavbarMenu />
    </>
  );
};

