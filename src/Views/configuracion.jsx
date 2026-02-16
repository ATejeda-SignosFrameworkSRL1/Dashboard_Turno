import { NavbarMenu } from "../components/navbar/navbar";
import { SideBar } from "../components/sideBar/sideBar";
import { ConfiguracionContent } from "../components/configuracion/ConfiguracionContent";

export const ConfiguracionDashboard = function () {
  return (
    <>
      <div className="d-flex align-items-start justify-content-start">
        <div>
          <SideBar />
        </div>
        <ConfiguracionContent />
      </div>
      <NavbarMenu />
    </>
  );
};
