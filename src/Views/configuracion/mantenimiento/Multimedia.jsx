import { NavbarMenu } from "../../../components/navbar/navbar";
import { SideBar } from "../../../components/sideBar/sideBar";
import { MultimediaContent } from "../../../components/configuracion/Mantenimiento/Multimedia/MultimediaContent";

export const Multimedia = () => {
  return (
    <>
      <div className="d-flex align-items-start justify-content-start">
        <div>
          <SideBar />
        </div>
        <MultimediaContent />
      </div>
      <NavbarMenu />
    </>
  );
};
