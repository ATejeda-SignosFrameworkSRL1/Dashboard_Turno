import {
  RiSettings2Line,
  RiSearchLine,
  RiUserLine,
  RiTeamLine,
  RiUserSearchLine,
  RiStarLine,
  RiArrowDownLine,
  RiPlayLine,
  RiChat2Fill
} from "react-icons/ri";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BsClockHistory, BsArrowLeftRight  } from "react-icons/bs";
import { Menu, MenuItem } from "react-pro-sidebar";
import { goPath } from "../helpers/functions";

export const sideBarConfig = [
  {
    id: "mantenimiento",
    name: "Mantenimiento",
    icon: <RiSettings2Line style={{ width: "18px", height: "18px" }} />,
    route: "/mantenimiento",
    menuItems: [
      {
        id: "Usuarios",
        name: "Usuarios",
        icon: <RiUserLine />,
        route: "",
        type: "subMenu",
        menuItems: [
          /*{
            id: "ListaUsuarios",
            name: "Lista Usuarios",
            icon: <RiUserSearchLine />,
            route: "/mantenimiento/usuarios",
          },*/
          {
            id: "Especialidades",
            name: "Especialidades",
            icon: <RiStarLine />,
            route: "/mantenimiento/especialidades",
          },
          {
            id: "GrupoUsuario",
            name: "Grupo Usuarios",
            icon: <RiTeamLine />,
            route: "/mantenimiento/grupoUsuario",
          }        
        ],
      },
      {
        id: "Multimedia",
        name: "Multimedia",
        icon: <RiPlayLine style={{ width: "20px", height: "20px" }} />,
        route: "/mantenimiento/multimedia",
        type: "menuItem",
        menuItems: [],
      },
     /* {
        id: "PersonalizarSistema",
        name: "Personalizar Sistema",
        icon: <RiPlayLine style={{ width: "20px", height: "20px" }} />,
        route: "/mantenimiento/Personalizar",
        type: "menuItem",
        menuItems: [],
      },*/
    ],
  },
  {
    id: "acciones",
    name: "Acciones",
    icon: <AiOutlineThunderbolt style={{ width: "18px", height: "18px" }} />,
    route: "/acciones",
    menuItems: [
      {
        id: "declinarTurnos",
        name: "Declinar Turnos",
        icon: <RiArrowDownLine />,
        route: "/acciones/declinarTurnos",
      },
      {
        id: "transferirTurnos",
        name: "Transferir Turnos",
        icon: <BsArrowLeftRight />,
        route: "/acciones/transferirTurnos",
      },
    ],
  },
  {
    id: "subMenu3",
    name: "Consultas",
    icon: <RiSearchLine style={{ width: "18px", height: "18px" }} />,
    route: "/consultas",
    menuItems: [
      {
        id: "historicoTurno",
        name: "Historial de Turnos",
        icon: <BsClockHistory />,
        route: "/consultas/historicoTurno",
      },
    ],
  }
];
