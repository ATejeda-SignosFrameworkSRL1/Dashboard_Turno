import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi/";
import { Sidebar, SubMenu, Menu, MenuItem } from "react-pro-sidebar";
import { goPath } from "../../helpers/functions";
import { sideBarConfig } from "../../config/sidebar.config";
import "./sideBar.css";
import { BsGearWide,BsFillWrenchAdjustableCircleFill,   } from "react-icons/bs";

/*
Added by: Luis A. Sierra
Added Date: 12/12/2024

Added Menu configuracion para ir a configuraciones
Added funcion gotoConfiguración() para ir a configuraciones

*/

export const SideBar = () => {
  const navigate = useNavigate();
  const currentPage = window.location.pathname;

  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const gotoConfiguración = () => {
    //navigate("/configuracion")
    goPath(navigate, "/configuracion",'Menu &#10132; Configuración General');
  };

  const handleConfiguracion = (item,text) => {

    if (text == 'Lista Usuarios')
    {
      goPath(navigate, item.route,'Menu &#10132; Mantenimiento &#10132; Usuarios &#10132; Lista Usuarios');
    }
    else if (text == 'Especialidades') 
    {
      goPath(navigate, item.route,'Menu &#10132; Mantenimiento &#10132; Usuarios &#10132; Especialidades');
    }
    else if (text == 'Grupo Usuarios') 
    {
      goPath(navigate, item.route,'Menu &#10132; Mantenimiento &#10132; Usuarios &#10132; Grupo Usuarios');
    }
    else if (text == 'Multimedia') 
    {
      goPath(navigate, item.route,'Menu &#10132; Mantenimiento &#10132; Multimedia');
    }
    else if (text == 'Personalizar Sistema')
    {
      goPath(navigate, item.route,'Menu &#10132; Mantenimiento &#10132; Personalizar Sistema');
    }
    else if (text == 'Declinar Turnos') 
    {
      goPath(navigate, item.route,'Menu &#10132; Acciones &#10132; Declinar Turnos');
    }
    else if (text == 'Transferir Turnos') 
    {
      goPath(navigate, item.route,'Menu &#10132; Acciones &#10132; Transferir Turnos');
    }
    else if (text == 'Historial de Turnos') 
    {
      goPath(navigate, item.route,'Menu &#10132; Consultas &#10132; Historial de Turnos');
    }

    //goPath(navigate, item.route,text);
    modificarUltimasConfig(item);
  };

  const modificarUltimasConfig = (item) => {
    let ultimasConfig = localStorage.getItem("ultimasConfig");
    ultimasConfig = JSON.parse(ultimasConfig);
    let copyUltimasConfig = [...ultimasConfig];

    const existeItem = copyUltimasConfig.findIndex(
      (config) => config.id === item.id
    );

    if (existeItem !== -1) {
      copyUltimasConfig.splice(existeItem, 1);
    }

    copyUltimasConfig.push({
      id: item.id,
      name: item.name,
      route: item.route,
    });

    if (copyUltimasConfig.length > 3) {
      copyUltimasConfig.shift();
    }
    localStorage.setItem("ultimasConfig", JSON.stringify(copyUltimasConfig));
  };

  useEffect(() => {
    localStorage.setItem("sidebar", collapsed);
  }, [collapsed]);

  return (
    <>
      <Sidebar
        style={{
          height: "100%",
          position: "fixed",
          borderColor: "#3c3f40",
          zIndex: "99",
          
        }}
        //backgroundColor="#1b253f" 
        backgroundColor="#000000" 
        collapsed={collapsed}
      >
        <main>
          <Menu>
            {collapsed ? (
              <MenuItem
                className="linkMenu"
                icon={
                  <FiChevronsRight style={{ width: "18px", height: "18px" }} />
                }
                onClick={() => handleCollapsedChange()}
              ></MenuItem>
              
            ) : (
               
              <MenuItem
                suffix={
                  <FiChevronsLeft style={{ width: "18px", height: "18px" }} />
                }
                onClick={() => handleCollapsedChange()}
              >
                <div
                  style={{
                    padding: "9px",
                    fontWeight: "bold",
                    fontSize: 14,
                    letterSpacing: "1px",
                    color: "#ffffff",  
                                     
                  }}
                >
                Opciones de Menú
                </div>
              </MenuItem>
            )}
            <hr className="hrSideBar" />
            <MenuItem icon={<BsFillWrenchAdjustableCircleFill /> } onClick={() => gotoConfiguración()} >Configuración General</MenuItem>
            {sideBarConfig.map((subMenu) => (
              <SubMenu
                label={subMenu.name}
                icon={subMenu.icon}
                key={subMenu.id}
                defaultOpen={currentPage.includes(subMenu.route)}
              >
                {subMenu?.menuItems.map((menuItem) =>
                  menuItem.type === "subMenu" ? (
                    <SubMenu
                      label={menuItem.name}
                      icon={menuItem.icon}
                      key={menuItem.id}
                      defaultOpen={menuItem.menuItems
                        ?.map((item) => item.route)
                        .includes(currentPage)}
                    >
                      {console.log()}
                      {menuItem?.menuItems.map((item) => (
                        <MenuItem
                          key={item.id}
                          icon={item.icon}
                          onClick={() => handleConfiguracion(item,item.name)}
                          active={currentPage === item.route}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </SubMenu>
                  ) : (
                    <MenuItem
                      key={menuItem.id}
                      icon={menuItem.icon}
                      onClick={() => handleConfiguracion(menuItem,menuItem.name)}
                      active={currentPage === menuItem.route}
                    >
                      {menuItem.name}
                    </MenuItem>
                  )
                )}
              </SubMenu>
            ))}
          </Menu>
        </main>
      </Sidebar>
      <div style={collapsed ? { width: "80px" } : { width: "250px" }}></div>
    </>
  );
};
