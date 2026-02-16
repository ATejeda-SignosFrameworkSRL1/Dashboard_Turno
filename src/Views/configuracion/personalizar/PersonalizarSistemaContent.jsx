import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  BsFillPostcardFill,
  BsDashSquareFill,
  BsWindowDesktop,
  BsLayoutSidebarInset,
  BsCardHeading,
  BsSquareFill,
  BsXCircle,
  BsFillFloppy2Fill  } from "react-icons/bs";

export const PersonalizarSistemaContent = () => {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const historicoTurnoProc = import.meta.env.VITE_APP_API_historicoTurno;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;

  const [turno, setTurno] = useState("");
  const [area, setArea] = useState("");
  const [fechaIni, setFechaIni] = useState(0);
  const [fechaFin, setFechaFin] = useState(0);
  const [historicoTurno, setHistoricoTurno] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  function Hr()
  {
    return <hr className="mt-0" style={{ border: "1px solid white" }} /> 
  }

  return (
    <>
        <div className="d-flex flex-column px-3 mt-3" style={{ width: "100%" }}>
        <h2 className="text-white fw-bold custom-header">Personalizar Sistema</h2>
        <Hr/> 
        <div class="container-fluid" style={{ backgroundColor: " #fff", borderRadius: "5px", paddingTop: "20px" }} >
        <form>

        <div class="row">
          <div class="col-sm-4" ><BsFillPostcardFill style={{ fontSize: "20px", marginBottom: "3px"}} /> Tarjeta <b>(Dashboard) <hr /></b>

          <div class="form-group">
            <label for=""><b>Color de Tarjeta:</b></label>
            <input type="text" class="form-control" id="" placeholder="Selecione un color" name="" style={{ width:"79%"}} />
            <input type="color" class="form-control" id="html5colorpicker" value="#ffffff" name="" style={{ width:"20%", height:"38px", float:"right", position:"relative", top:"-38px"}}  />
          </div>

          </div>
          <div class="col-sm-4" ><BsWindowDesktop style={{ fontSize: "20px", marginBottom: "3px"}}  /> Navbar <b>(Barra Inferior)<hr /></b>
          
          <div class="form-group">
            <label for=""><b>Color de Navbar:</b></label>
            <input type="text" class="form-control" id="" placeholder="Selecione un color" name="" style={{ width:"79%"}} />
            <input type="color" class="form-control" id="html5colorpicker" value="#ffffff" name="" style={{ width:"20%", height:"38px", float:"right", position:"relative", top:"-38px"}}  />
          </div>   
          
          </div>
          <div class="col-sm-4" ><BsCardHeading style={{ fontSize: "20px", marginBottom: "3px"}}  /> Botones <b>(Formularios)<hr /></b>
              
          <div class="form-group">
            <label for=""><b>Color de Botones:</b></label>
            <input type="text" class="form-control" id="" placeholder="Selecione un color" name="" style={{ width:"79%"}} />
            <input type="color" class="form-control" id="html5colorpicker"  name="" style={{ width:"20%", height:"38px", float:"right", position:"relative", top:"-38px"}}  />
          </div>
          
          </div>
        </div>
        
        <div class="row">
          <div class="col-sm-4" ><BsDashSquareFill style={{ fontSize: "20px", marginBottom: "3px"}} /> Titulos <b>(Color de Fondo)<hr /></b>     
          
          <div class="form-group">
            <label for=""><b>Color de fondo de los titulos:</b></label>
            <input type="text" class="form-control" id="" placeholder="Selecione un color" name="" style={{ width:"79%"}} />
            <input type="color" class="form-control" id="html5colorpicker"  name="" style={{ width:"20%", height:"38px", float:"right", position:"relative", top:"-38px"}}  />
          </div>

          </div>
          <div class="col-sm-4" ><BsLayoutSidebarInset style={{ fontSize: "20px", marginBottom: "3px"}} /> Sidebar <b>(Barra de Menu)<hr /></b>
          
          <div class="form-group">
            <label for=""><b>Color de Sidebar:</b></label>
            <input type="text" class="form-control" id="" placeholder="Selecione un color" name="" style={{ width:"79%"}} />
            <input type="color" class="form-control" id="html5colorpicker"  name="" style={{ width:"20%", height:"38px", float:"right", position:"relative", top:"-38px"}}  />
          </div>

          </div>

          <div class="col-sm-4" ><BsSquareFill style={{ fontSize: "20px", marginBottom: "3px"}} /> Fondo <b>(Fondo del Sistema)<hr /></b>
          
          <div class="form-group">
            <label for=""><b>Color de Sidebar:</b></label>
            <input type="text" class="form-control" id="" placeholder="Selecione un color" name="" style={{ width:"79%"}} />
            <input type="color" class="form-control" id="html5colorpicker"  name="" style={{ width:"20%", height:"38px", float:"right", position:"relative", top:"-38px"}}  />
          </div>

          </div>

        </div>

        <div class="row" style={{ marginBottom: "30px"}}>

        <div class="col-sm-3" >
          <button type="submit" class="btn btn-primary btn-lg" style={{ width: "90%",margin: "5px"}}><BsFillFloppy2Fill style={{ fontSize: "20px", marginBottom: "3px"}} /> Guardar</button>
        </div>

        <div class="col-sm-3">
            <button type="submit" class="btn btn-danger btn-lg"  style={{ width: "90%",margin: "5px"}}><BsXCircle style={{ fontSize: "20px", marginBottom: "3px"}} /> Cancelar</button>
        </div>

        </div>
        </form>
        </div>

       </div>
        
    </>
  );
};
