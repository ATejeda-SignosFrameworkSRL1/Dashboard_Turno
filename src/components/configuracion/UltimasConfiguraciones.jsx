import { useNavigate } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import { goPath } from "../../helpers/functions";
import { IoIosArrowForward } from "react-icons/io";

/*
Added by: Luis A. Sierra
Added Date: 17/12/2024

Added function setClick para agregar ruta del menu

*/
export const UltimasConfiguraciones = ({ ultimasConfig }) => {
  const name = sessionStorage.getItem("nombre");
  const navigate = useNavigate();

   function setClick(config,text) {
    
    if (text == 'Usuarios')
    {
      goPath(navigate, config,'Menu &#10132; Mantenimiento &#10132; Usuarios &#10132; Lista Usuarios');
    }
    else if (text == 'Especialidades') 
    {
      goPath(navigate, config,'Menu &#10132; Mantenimiento &#10132; Usuarios &#10132; Especialidades');
    }
    else if (text == 'Grupo Usuarios') 
    {
      goPath(navigate, config,'Menu &#10132; Mantenimiento &#10132; Usuarios &#10132; Grupo Usuarios');
    }
    else if (text == 'Multimedia') 
    {
      goPath(navigate, config,'Menu &#10132; Mantenimiento &#10132; Multimedia');
    }
    else if (text == 'Personalizar Sistema')
    {
      goPath(navigate, config,'Menu &#10132; Mantenimiento &#10132; Personalizar Sistema');
    }
    else if (text == 'Declinar Turnos') 
    {
      goPath(navigate, config,'Menu &#10132; Acciones &#10132; Declinar Turnos');
    }
    else if (text == 'Historial de Turnos') 
    {
      goPath(navigate, config,'Menu &#10132; Consultas &#10132; Historial de Turnos');
    }

  };

  return (
    <>
      <Card style={{ backgroundColor: "#000000", borderColor: "#3c3f40" }}>
        <Card.Body className="py-4">
          <Card.Title className="text-white font-monospace mb-2">
            Historial de configuraciones
          </Card.Title>
          <Card.Text className="text-secondary">
            Hola <b style={{ color: "yellow" }} id="config_name">{name}</b>, estas son tus configuraciones recientes.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {ultimasConfig.length ? (
            ultimasConfig
              .slice()
              .reverse()
              .map((config) => (
                <ListGroup.Item
                  key={config.id}
                  className="d-flex justify-content-between align-items-center listGroup-configRecommended"
                  /*onClick={() => goPath(navigate, config.route)}*/
                  onClick={() => setClick(config.route,config.name)}
                  action
                >
                  <div className="m-2">
                    <span className="me-4">{config.icon ?? "•"}</span>
                    <span>{config.name}</span>
                  </div>
                  <IoIosArrowForward />
                </ListGroup.Item>
              ))
          ) : (
            <ListGroup.Item
              className="d-flex justify-content-between align-items-center listGroup-configRecommended"
              action
            >
              <span>No haz realizado configuraciones recientemente.</span>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </>
  );
};
