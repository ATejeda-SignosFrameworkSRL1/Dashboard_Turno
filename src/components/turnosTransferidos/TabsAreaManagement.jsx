import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';


/*
Added by: Luis A. Sierra
Added Date: 20/12/2024

Added: Table para mostrar datos
Added: Paginacion para navegar entre pantallas
Added: codigo para generar numeros de las paginas dinamicos

*/

export const TabsAreaManagement = () => {

  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("lastTab") || "verTodas"
  );


  //Generar paginacion
  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <>

      <div className="d-flex flex-column px-3 mt-3" style={{ width: "100%" }}>
      <hr className="mt-0" style={{ border: "1px solid white" }} />

      <div style={{ backgroundColor:"#ffffff", padding:"5px 0px 0px 0px", borderRadius: "5px" }}>
        <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Area</th>
            <th>Usuario</th>
            <th>Estados</th>
            <th>Estaciones</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>-</td>
            <td >-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
        </Table>
        <div>
         <Pagination size="sm" style={{ float:"right", margin:"10px" }}>{items}</Pagination>
        </div>

        {/*
        <Pagination size="sm" style={{ float:"right", margin:"10px" }} >
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination> */}
      </div>
    </div>
    </>
  );
};
