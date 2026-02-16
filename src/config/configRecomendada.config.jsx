import {
  RiSettings2Line,
  RiSearchLine,
  RiUserLine,
  RiTeamLine,
  RiUserSearchLine,
  RiStarLine,
  RiArrowDownLine,
  RiPlayLine,
} from "react-icons/ri";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BsClockHistory,BsPalette } from "react-icons/bs";

export const configRecomendada = [
  /*{
    id: "usuario",
    name: "Usuarios",
    icon: <RiSettings2Line style={{ width: "18px", height: "18px" }} />,
    route: "/mantenimiento/usuarios",
  },*/
  {
    id: "especialidades",
    name: "Especialidades",
    icon: <RiStarLine style={{ width: "20px", height: "20px" }} />,
    route: "/mantenimiento/especialidades",
  },
  {
    id: "multimedia",
    name: "Multimedia",
    icon: <RiPlayLine style={{ width: "20px", height: "20px" }} />,
    route: "/mantenimiento/multimedia",
  },
  {
    id: "declinarTurnos",
    name: "Declinar Turnos",
    icon: <RiArrowDownLine style={{ width: "18px", height: "18px" }} />,
    route: "/acciones/declinarTurnos",
  },
  {
    id: "historicoTurno",
    name: "Historial de Turnos",
    icon: <BsClockHistory style={{ width: "20px", height: "20px" }} />,
    route: "/consultas/historicoTurno",
  },
  /*{
    id: "PersonalizarSistemaTurno",
    name: "Personalizar Sistema",
    icon: <BsPalette style={{ width: "20px", height: "20px" }} />,
    route: "/mantenimiento/Personalizar",
  },*/
];
