//import React, { useState } from "react";
import { useState } from 'react'
import { Navbar, Nav } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  SlScreenDesktop,
  SlUser,
  SlPeople,
  SlSettings,
  SlLogout,
} from "react-icons/sl";
import { TbBrandDenodo,TbArrowsLeftRight,TbArticle,TbLayout2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { updateAuthenticationState } from "../../store/authentication";
import { goPath } from "../../helpers/functions";
import { alertSuccess, alertFailed } from "../../helpers/alerts";
import axios from "axios";

/*
Added by: Luis A. Sierra
Added Date: 17/12/2024

Added cipher encryption for save keys in localstorage;
Added showmodal para ir a configuraciones;
Added function getTurnoAdmin_Key();
Added procedure con usuarios de [DbGlobalSecurity].[dbo].[Usuarios] 
Added llamada tipo get co axios al proedure [dbo].[spc_GetAdminKeyDashBoard]
Remove showmodal hardcore de sammir;

*/

export const NavbarMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOutUser = () => {
    Swal.fire({
      title: "¿Estás seguro de cerrar sesión?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Cerrar Sesión",
    }).then((cerrarSesion) => {
      if (cerrarSesion.isConfirmed) {
        navigate("/");
        dispatch(updateAuthenticationState(false));
        sessionStorage.removeItem("nombre");
      }
    });
  };

    const goConfiguracion = () => {

    const baseUrl = import.meta.env.VITE_APP_BASEURL;
    const turnosAdmin_KeyProc = import.meta.env.VITE_APP_API_Admin_Users;
    const Login_Configuracion = import.meta.env.VITE_APP_API_Login_Configuracion;

    const ApiKey = import.meta.env.VITE_APP_APIKEY;

    const config = {
      headers: {
        "Content-Type": "application/json",
        APIKey: ApiKey,
      },
    };

    const getTurnoAdmin_Key = async () => {
      const response = await axios.get(baseUrl + turnosAdmin_KeyProc, config);
      var data = response.data;

      var size = data.length;
      var obj = {};
      var x=0;

      for (x=0;x<size;x++)
        {
          obj[x] = JSON.parse(data[x]['admin_users']);
        }

      var usr =  obj;

      var a=0;
      var option = '';


      for (a=0;a<size;a++)
      {
        option += '<option value="'+usr[a][0].user+'">' +usr[a][0].user+'</option>';
      }
      
      const { value: formValues } = await Swal.fire({
        title: "Acceso a Configuración",
        html: `   
          <select name="users" id="swal-input1" class="swal2-input" style="width:300px"> 
             `+option+`
          </select>
          <br />
          <input type="password" id="swal-input2" class="swal9-input" style="width:300px"/>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ingresar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
          return [

            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value

          ];

        }

      });

      if (formValues) {        

              var user_selected = document.getElementById("swal-input1").value;
            
              try {
                  const response_login = await axios.post(
                  baseUrl + Login_Configuracion,
                  {
                    user_name: `'${formValues[0]}'`,
                    user_pass: `'${formValues[1]}'`
                  },
                  config
                  );
              
                if (response_login.data[0].Result == 'True')
                {
                  alertSuccess("Bienvenido: "+ user_selected);

                  sessionStorage.setItem("nombre",formValues[0]);

                  //goPath(navigate, "/configuracion",'Configuracion')
                  goPath(navigate, "/configuracion",'Menu &#10132; Configuración');

                }
                else if (response_login.data[0].Result == 'False')
                {
                  Swal.fire({
                    icon: "error",
                    text: "Clave incorrecta!",
                    showCancelButton: false,
                    confirmButtonColor: "#28a745",
                    confirmButtonText: "Aceptar",
                    }).then((result) => {
                      goPath(navigate, "/dashboard",'Dashboard')
                    });  
                }

              } catch (error) {
                console.log(error);
              }

           //if ((formValues[0] == 'admin') && (formValues[1] == 'admin')) {
           /*if ((formValues[0] == user_selected) && (formValues[1] == user_key_selected_descryt)) {


              sessionStorage.setItem("nombre",formValues[0]);
              goPath(navigate, "/configuracion",'Configuracion')


             
            } else {
                
                Swal.fire({
                icon: "error",
                text: "Clave incorrecta!",
                showCancelButton: false,
                confirmButtonColor: "#28a745",
                confirmButtonText: "Aceptar",
                }).then((result) => {
                  goPath(navigate, "/dashboard",'Dashboard')
                });  
            }*/

      }

/*
       Swal.fire({
        icon: "info",
        text: "Ingrese la clave para entrar a configuracion",
        input: "password",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ingresar",
        cancelButtonText: "Cancelar",
      }).then((result) => {

         var size = data.length;
         var keys = {};
         var x=0; 
  
         for (x=0;x<size;x++)
          {
            keys[x] = JSON.parse(data[x]['admin_users']);
          }

          debugger;
        if (keys[0][0].key == result.value) {
        //if (result.value === "1414") {
          //navigate("/configuracion");
          goPath(navigate, "/configuracion",'Configuracion')
         
        } else {

            Swal.fire({
            icon: "error",
            text: "Clave incorrecta!",
            showCancelButton: false,
            confirmButtonColor: "#28a745",
            confirmButtonText: "Aceptar",
            }).then((result) => {
              goPath(navigate, "/dashboard",'Dashboard')
            });
        }
  
      });  */

    };
  
    getTurnoAdmin_Key();
  };

  return (
    <>
      <div style={{ height: "70px" }}></div>
      <Navbar className="Navbar fixed-bottom">
        <div className="container-fluid">
          {/* <Navbar.Collapse id="basic-navbar-nav"> */}
          <Nav className="ma-auto Nav">
            <Nav.Link
              className="navLink me-3"
              /* onClick={() => navigate("/dashboard")} */
              onClick={() => goPath(navigate, "/dashboard",'Dashboard')}
              title="Dashboard"
            >
              <TbLayout2 />
            </Nav.Link>
            <Nav.Link
              className="navLink mx-3"
              onClick={() => goPath(navigate, "/estaciones",'Estaciones')}
              title="Estaciones"
            >
              <SlScreenDesktop />
            </Nav.Link>
            <Nav.Link
              className="navLink mx-3"
              onClick={() => goPath(navigate, "/reporte",'Reportes')}
              title="Reportes"
            >
               <TbArticle />
            </Nav.Link>
            {/*
            <Nav.Link
              className="navLink mx-3"
              onClick={() => goPath(navigate, "/turnosTransferidos",'Estatus de Turnos Transferido')}
              title="Estatus de Turnos Transferidos"
            >
             <TbArrowsLeftRight />
            </Nav.Link> */}
          </Nav>
          {/* </Navbar.Collapse> */}   

           <Navbar.Brand className="NavbarBrand">
             <div id="OptionMenu"></div>
           </Navbar.Brand>

          <Nav className="ma-auto">
            <Nav.Link
              className="navLink mx-3"
              onClick={() => goConfiguracion()}
              title="Configuracion de Administrador"
            >
              <SlSettings />
            </Nav.Link>
            <Nav.Link className="navLink mx-3" onClick={handleLogOutUser} title="Salir">
              <SlLogout />
              
            </Nav.Link>
          </Nav>
        </div>
      </Navbar>
    </>
  );

};
