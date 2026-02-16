import React from "react";
import { FaServer } from 'react-icons/fa';

/*
Added by: Luis A. Sierra
Added Date: 29/01/2025
*/

export const ServerInfo = function () {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;

  return (
    <> 
    <span style={{ position: "absolute",bottom: "50px", paddingLeft:"5px"}}><FaServer style={{fontSize: "13px", marginBottom:"3px"}} /> RESTful API: {baseUrl}</span>
    </>
  );
};