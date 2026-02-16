// import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { AccordionFilter } from "./AccordionFilter";
import { TabsAreaManagement } from "./TabsAreaManagement";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'

/*
Added by: Luis A. Sierra
Added Date: 20/12/2024

Remove: AccordionFilter Component, este componente no estaba correctamente desarrollado.
Added: label filtar por
Added: combo o select para seleccionar tipo de filtro a filtrar
Added: TextBox o Edit para buscar los parametros solicitados
Added: DataPicker o date para filtrar por fechas
Added: boton buscar y boton limpiar
Added: funcion para establecer fecha actual por default en los DataPicker
Added: funcion para placeholder por tipo de filtro
Added: funcion para activar y desactivar datapicker si de seleccion el filtro fecha

*/

function getDateFormated()
{
  const date = new Date();
  const dd = date.getDate()
  const mm = date.getMonth() + 1; // Months start at 0!
  const yyyy = date.getFullYear();
  var formattedDate = yyyy +'-'+mm+'-'+dd;  
  return formattedDate ;
}

export const TurnosTransferidosContent = () => {

  const [PlaceholderSelected, setPlaceholderSelected] = useState("Buscar");

  function setplaceholder()
  {
    var selected = document.getElementById('selBuscar').value;
    setPlaceholderSelected("Buscar aqui por " + selected);

    if (selected == "fecha")
    {
      document.getElementById('startDate').disabled = false;
      document.getElementById('endDate').disabled = false;
    }
    else
    {
      document.getElementById('startDate').disabled = true;
      document.getElementById('endDate').disabled = true;
    }
    //document.getElementById('selBuscar').
    //alert("data: "+selected);
  }

  return (
    <>
      <Row className="rowTitle" style={{ margin: "0.5em" }}>
        <h3 className="title" style={{ textAlign: "center" }}>
          Estatus Turnos Transferidos
        </h3>
      </Row>
      
      { /*<Row className="m-2">
        <AccordionFilter />
      </Row> */}
      <div style={{ marginLeft:"20px",marginRight:"20px" }}>
        <div>
        <Form.Label htmlFor="selBuscar" style={{ color:"#ffffff",fontWeight:"bold" }} >Filtrar por:</Form.Label>
        <select 
              style={{ 
                width:"100%", 
                backgroundColor: "#000000",
                backgroundImage: "linear-gradient(180deg, #dee2e64f, #000000)", 
                color: "#ffffff",
                height: "40px",
                border: "none",
                borderRadius:"0.375rem",
                marginBottom:"10px",
                padding:"5x"                
              }}
              id="selBuscar"
              onChange={setplaceholder}
              >
                <option style={{backgroundColor: "#ffffff",color:"#000000",border: "none"}}>Seleccionar.....</option>
                <option style={{backgroundColor: "#ffffff",color:"#000000" }} value="area">Area</option>
                <option style={{backgroundColor: "#ffffff",color:"#000000" }} value="usuario">Usuario</option>
                <option style={{backgroundColor: "#ffffff",color:"#000000" }} value="Estatus">Estatus</option>
                <option style={{backgroundColor: "#ffffff",color:"#000000" }} value="estaciones">Estaciones</option>
                <option style={{backgroundColor: "#ffffff",color:"#000000" }} value="fecha">Fecha</option>
              </select> 
              <Form.Control
                type="text"
                id="txtBusar"
                placeholder={PlaceholderSelected}        
               />
        </div>
        <br/>
        <Row>
          <Col style={{ }}>
            <Form.Label htmlFor="txtBuscar" style={{ color:"#ffffff",fontWeight:"bold" }} >Fecha Inicio:</Form.Label>
            <Form.Control
              type="date"
              id="startDate" 
              value={getDateFormated()}
              disabled
            />  
          </Col>
          <Col style={{ }}>
            <Form.Label htmlFor="txtBuscar" style={{ color:"#ffffff",fontWeight:"bold" }} >Fecha Final:</Form.Label>
            <Form.Control
                type="date"
                id="endDate" 
                value={getDateFormated()}
                disabled
              />  
          </Col>
          <Col>
              <div  style={{ marginTop:"30px" }}>
              <center><Button variant="primary" style={{ marginRight:"10px", width:"100%" }}>Buscar</Button></center>
              </div>
          </Col>
          <Col>
              <div  style={{ marginTop:"30px" }}>
              <center><Button variant="secondary" style={{ width:"100%" }}>Limpiar</Button></center>
              </div>
          </Col>
        </Row>
      </div>
      <TabsAreaManagement />
    </>
  );
};
