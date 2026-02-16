import { NavbarMenu } from "../components/navbar/navbar";
import { DashboardContent } from "../components/dashboard/DashboardContent";
import { tiempoAleatorio } from "../helpers/functions.jsx"
import { ServerInfo } from "../components/serverInfo/serverInfo"; 
import React, { useEffect } from "react";

/*
Added by: Luis A. Sierra
Added Date: 20/12/2024

Remove location.reload()

*/

export const Dashboard = function () {

  //const tiempoAleatorio = Math.floor(Math.random() * (90000 - 60000 + 1)) + 60000;
  
  //setTimeout(() => {

    //location.reload();

  //}, 100); 

  return (
    <> 
      <DashboardContent />  
      <NavbarMenu />
      <ServerInfo />
    </>
  );
};
