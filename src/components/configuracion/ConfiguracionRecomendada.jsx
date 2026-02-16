import { useNavigate } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import { goPath } from "../../helpers/functions";
import { configRecomendada } from "../../config/configRecomendada.config";
import { IoIosArrowForward } from "react-icons/io";

export const ConfiguracionRecomendada = () => {
  const navigate = useNavigate();

  /*
  const handleConfiguracion = (item) => {
    goPath(navigate, item.route);
    modificarUltimasConfig(item);
  }; */

  const handleConfiguracion = (item,text) => {
  
      if (text == 'Usuarios')
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

  return (
    <>
      <Card style={{ backgroundColor: "#000000", borderColor: "#3c3f40" }}>
        <Card.Body className="py-4">
          <Card.Title className="text-white font-monospace mb-2">
            Configuraciones recomendadas
          </Card.Title>
          <Card.Text className="text-secondary">
            Configuraciones recomendadas y comúnmente utilizadas.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {configRecomendada.map((config) => (
            <ListGroup.Item
              key={config.id}
              className="d-flex justify-content-between align-items-center listGroup-configRecommended"
              onClick={() => handleConfiguracion(config,config.name)}
              action
            >
              {console.log(config)}
              <div className="m-2">
                <span className="me-4">{config.icon}</span>
                <span>{config.name}</span>
              </div>
              <IoIosArrowForward />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </>
  );
};
