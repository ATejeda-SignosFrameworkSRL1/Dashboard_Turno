# Documentación Dashboard - Turnos v2.0 (dashboard_v2.0_developer) #

## Version 2.0 by Luis A. Sierra

En el archivo .env se encuentran todos los procedures y el Apikey del proyecto.

Las llamadas se realizan a traves del método GET para traer información o con el método POST para enviar data.

Si queremos traer o buscar un registro en especifico en una tabla se pasará el parametro indicado en la URL utilizando el método GET.

A la hora de pasar un parametro a traves de un objeto utilizando POST debemos utilizar la técnica "Escape" para las variables que sean tipo string. Ejemplo de la técnica escape en javascript:

```js
const tecnica = "Escape"
const Ejemplo = `Esto es un ejemplo de la técnica '${tecnica}'`
```

En el manejador de los colores de las cards, existe una propiedad que llega de la base de datos llamada `ERROR` esta propiedad nos indica dependiendo el numero entero de que color debemos pintar nuestra tarjeta. Este pintado la hacemos con css usando el atributo de className, por ejemplo:

```js
className={
  canturno.ERROR === 1 && canturno.TIEPOESPERA < 1000
    ? "canturnoYellow"
    : canturno.ERROR === 2 && canturno.TIEPOESPERA < 1000
    ? "canturnoRed"
    : canturno.TIEPOESPERA > 999
    ? "canturnoOrange"
    : "canturnoGray"
}
```

Cuando queramos editar o agregar un registro vamos a depender de un useState que va indicar cuando se va a editar o cuando se va agregar, por defecto este siempre vendra `false`. Cada mantenimiento, acción o consulta tendra lo siguiente:

* Un useState que será true si es agregando o false si es editando.
* Un useState donde se almacena el registro.
* Un objeto `newObject` que sera un objeto con las propiedades que se esperan pero vacias.
* Un objeto final (Este ubicado en el componente donde esta el boton) que sera el objeto que le pasaremos al endpoint.

```js
  const [newRegistro, setNewRegistro] = useState(false);
  const [registro, setRegistro] = useState({});

  const newRegistroObject = {
    Id: null,
    Nombre: "",
    Edad: null,
    usuarioActivo: false,    
  }

  const registroObject = {
    Accion: newRegistro ? `'N'` : `'E'`,
    Nombre: nombre,
    Edad: edad,
    usuarioActivo: usuarioActivo,      
  }
```

Para agregar un registro le se seteara el objeto nuevo al registro. De esta manera el formulario de editado o llenado llegue vacio.

```js
setRegistro(newRegistroObject)
```

Para editar un registro es esencial pasarle como parametro el Id del objeto del cual estamos editando, pero como este Id no lo necesitamos a la hora de agregar un registro nuevo, debemos hacer una condicional en el boton para indicar que si la variable `newRegistro` esta apagada incluyamos la propiedad del Id a nuestro objeto, en caso de que este encendida, va omitir la propiedad.

```js
  if (!newRegistro) {
    registroObject.Id = registro.Id;
  }
```

Tambien se utiliza una propiedad sumamente importante llamada `Accion`, esta propiedad le pasaramos dos posibles parametros: `'N'` Cuando queramos agregar un nuevo registro, `'E'` cuando queramos editar un registro. Esto tambien dependera de nuestro `newRegistro`.

## Base URL ##

Aquí se configura la base Url. Esto para poder asigar la Url dependiendo el cliente.

La base URL por lo general será el nombre de la maquina en el servidor del cliente seguido de un slash mas el nombre del dominio.

Por ejemplo para MCA sería: `http://win-gv0qm4l1f9q/TurnosWebAPI`

```js
VITE_APP_BASEURL = http://NombreMaquina/NombreDominio/
```

## API Key ##

Este se pasa en la configuración del header. Actualmente se hace de esta manera:

```js
  const config = {
    headers: {
      "Content-Type": "application/json",
    APIKey: ApiKey,
    },
  };
```

## Login Procedure ##

Procedure: spLoginUser

Procedimiento para el inicio de sesión. Se envia el parametro @Username y @Password a traves del método POST.

```js
  const response = await axios.post(
    baseUrl + loginProc,
    {
    Username: `'${username}'`,
    Password: `'${password}'`,
    },
    config
  );
```

## Turnos en Espera Procedure ##

Procedure: SPREPORTEAREASDASBOARD

Procedimiento que trae la cantidad de turnos en espera que tiene cada area.

```js
  const response = await axios.get(baseUrl + cantidadDeTurnosProc, config)
```

## Turnos Transferidos Procedure ##

Procedure: spReporteAreasTransferenciasDashBoard

Procedimiento que trae la cantidad de turnos espera que acaban de ser transferidos.

```js
  const response = await axios.get(baseUrl + turnosTransferidosProc, config);
```

## Estatus Estaciones Procedure ##

Procedure: spReporteEstatusEstaciones

Procedimiento que trae el estatus de las estaciones, cuantas hay online y cuantas hay disponible.

```js
  const response = await axios.get(baseUrl + estatusEstacionesProc, config);
```

## Colaboradores Online y Offline Procedure ##

Procedure: SPREPORTEUSUARIOSESTATUSV2

Procedimiento que trae todos los colabores, tanto los que esta en estado de Online, como los que estan en estados Offline.

```js
  const response = await axios.get(baseUrl + estatusColaboradesProc, config);
```

Con este procedimiento aplicamos dos filtros para poder separar los operadores que estan online con los operadores que estan offline.

* Operadores Online Filtro:

```js
  const colaboradoresLogin =
    operadoresOn?.length > 0 &&
    operadoresOn.filter((colaboradores) => colaboradores.ACCION === "LOGIN");
```

* Operadores Offline Filtro:

```js
  const colaboradoresLogOut =
    operadoresOff?.length > 0 &&
    operadoresOff.filter((colaboradores) => colaboradores.ACCION === "LOGOUT");
```

## Estatus estaciones (Operadores) Procedure ##

Procedure: spReporteEstacionesEstatusDashBoard

Procedimiento que trae el estatus de las estaciones del operador. Este visualiza si el operador ha sido notificado y su tiempo. Tiene colores diferente dependiendo si el turno esta atendido, transferido, puesto en espera.

```js
  const response = await axios.get(baseUrl + estatusColaboradesProc, config);
```

## Estatus Operadores (Reporte) Procedure ##

Procedure: SPREPORTEUSUARIOSESTATUSV2

Este procedimiento es compartido con el de colaboradores Online y Offline, pero en este caso solo extraemos la estadistica del día de ese operador. Agregando el tiempo que lleva conectado o el tiempo que lleva desconectado.

```js
  const response = await axios.get(baseUrl + estatusOperadores, config);
```

## Configuracion > Mantenimiento > Usuarios Procedure ##

Procedure: spc_GetAllUsuariosDashBoard

Este procedimiento maneja y configura todos los usuarios. Con este procedimiento listamos todos los usuarios, poemos buscar un usuario en especifico por el UserName, editamos un usuario y podemos agregar un usuario nuevo.

* Traer todos los usuarios

```js
  const response = await axios.get(baseUrl + totalUsuariosProc, config);
```

* Buscar usuario por el Username

Este proceso de buscar el usuario por el Username lo hace a traves de la url, por lo cual en la tabla donde listamos lo usuarios, le pasamos la siguiente url al dar click a un usuario: `/mantenimiento/usuarios/:username` y esto le crea al usuario un estilo de perfil.

```js
  const response = await axios.post(
    baseUrl + totalUsuariosProc,
    {
      username: `'${username}'`,
    },
    config
  );
```

**Importante:** Utilizamos el hook de React Router Dom para extraer el username de la ruta, importando `useParams`

```js
  const { username } = useParams();
```

* Editar y agregar un usuario

Para agregar un usuario nuevo o editar un usuario existente, va a depender del useState `newUser` este viene por default en false. Cuando este estado esta en false significa que el usuario esta en modo edicion y cuando esta true es que esta agregando un nuevo usuario. Toda esta logica es para poder reutilizar el componente que representa el formulario.

Para editar un usuario, se utiliza el objeto `usuarioDataObject` que va a recibir las variables de estado.

```js
  const usuarioDataObject = {
    Accion: newUser ? `'N'` : `'E'`,
    Nombre: `'${nombreUsuario}'`,
    Username: `'${userNameUsuario}'`,
    Pwd: `'${passwordUsuario}'`,
    IdEspecialidad: especialidadUsuario !== "" ? especialidadUsuario : null,
    IdGrupoUsuario: grupoUsuario !== "" ? grupoUsuario : null,
    Foto: `'${fotoUsuario}'`, // Esta en proceso
    FotoExtencion: `'${fotoExtensionUsuario}'`, // Esta en proceso
    Activo: usuarioActivo ? 1 : 0,
    TipoUsuario: `'${tipoUsuario}'`,
    AutoLlamado: autoLlamado ? 1 : 0,
    PermiteTurnoEnEspera: permiteTurnoEpera ? 1 : 0,
    PermiteReferido: permiteReferidos ? 1 : 0,
    PermiteAreaPrincipal: permiteAreaPrincipal ? 1 : 0,
    PermiteTicketMobile: permiteTicketMobile ? 1 : 0,
    NotificacionMobil: notificacionMobil ? 1 : 0,
    Observacion: `'${usuarioObservaciones}'`,
  };
```

Para agregar un usuario se creara el objeto vacio, en esta parte usaremos el ternary operator antes de pasar  por props, si es newUser es true, pasaremos el `newUserObject` y si es false el `usuarioData`.

```js
  const newUserObject = {
    Nombre: "",
    UserName: "",
    Contrasena: "",
    IdEspecialidad: null,
    IdGrupoUsuario: null,
    Foto: null,
    Ext: null,
    TipoUsuario: false,
    AutoLlamado: false,
    PermiteTurnoEnEspera: false,
    Activo: false,
    PermiteReferidos: false,
    PermiteAreaPrincipal: false,
    PermiteTicketMobile: false,
    NotificacionMobile: false,
    Observacion: "",
  };
```

La logica del agregar/Editar un usuario, seria la siguiente:

```js
  const actualizarUsuarioData = async () => {
    setLoading(true);
    setViewMode(true);

    if (!newUser) {
      usuarioDataObject.IdUsuario = usuarioData.Id;
    }

    try {
      const response = await axios.post(
        baseUrl + totalUsuariosProc,
        usuarioDataObject,
        config
      );
      alertSuccess("Los dato del usuario han sido actualizados correctamente.");
    } catch (error) {
      console.error(error);
      alertFailed();
    } finally {
      setTimeout(() => {
        setNewLoad(!newLoad);
        if (userNameUsuario !== usuarioData.UserName) {
          location.href = `/mantenimiento/usuarios/${userNameUsuario}`;
        }
      }, 1500);
    }
  };
```

## Configuracion > Mantenimiento > Especialidades Procedure ##

Procedure: spc_GetAllEspecialidadesDashBoard

Este procedimiento trae todas las especialidades y con este mismo procedimiento podemos editar las especialidades, pasandole los parametros necesarios mostrados debajo.

* Traer todas las especialidades

```js
  const response = await axios.get(baseUrl + especialidadesProc, config);
```

* Editar y agregar una especialidad

Para agregar una especialidad nueva o editar una existente, va a depender del useState `newEspecialidad` este viene por default en false. Cuando este estado esta en false significa que la especialidad esta en modo edicion y cuando esta true, es que esta agregando una nueva especialidad. Toda esta logia es para poder reutilizar el modal correspondiente.

Para editar una especialidad, se utiliza el objeto `especialidadObject` que va a recibir las variables que usamos en el modal, estas variables dependen del useState `selectedEspecialidad` el cual lo seteamos a traves de la tabla para pasarle la informacion de la especialidad en donde hemos clickeado con el boton.

```js
  const especialidadObject = {
    Accion: newEspecialidad ? `'N'` : `'E'`,
    Descripcion: `'${descripcionEspecialidad}'`,
    Orden: ordenEspecialidad, // Fuera de uso momentaneamente
    Activo: estatusEspecialidad ? 1 : 0,
  };
```

Para agregar una especialidad se le pasara el objeto vacio al useSate de `selectedEspecialidad`, para que cuando se abra el modal, las variables lleguen vacias y podamos agregar.

```js
  const newEspecialidadObject = {
    Descripcion: "",
    Orden: ordenEspecialidad, // Fuera de uso momentaneamente
    Activo: 0,
  };
```

La logica del agregar/Editar una especialidad, seria la siguiente:

```js
  const actualizarEspecialidad = async () => {
    setLoading(true);
    if (!newEspecialidad) {
      especialidadObject.Id = especialidad.Id;
    }
    try {
      const response = await axios.post(
        baseUrl + especialidadesProc,
        especialidadObject,
        config
      );
      setLoading(false);
      alertSuccess(
        `La especialidad ${descripcionEspecialidad} ha sido ${
          newEspecialidad ? "agregada" : "actualizada"
        }.`
      );
      setNewLoad(!newLoad);
    } catch (error) {
      console.error("Error al obtener los datos", error);
      alertFailed();
    } finally {
      setLoading(false);
      setShow(false);
    }
  };
```

## Configuracion > Mantenimiento > Grupo Usuario Procedure ##

Procedure: spc_GetAllGruposUsuariosDashboard

Este procedimiento trae todos los grupos usuarios y con este mismo procedimiento podemos editar el grupo de usuario, pasandole los parametros necesarios mostrados debajo.

* Traer todos los grupos usuarios

```js
  const response = await axios.get(baseUrl + grupoUsuariosProc, config);
```

* Editar y agregar un Grupo usuario

Para agregar un Grupo Usuario nuevo o editar un existente, va a depender del useState `newGrupoUsuario` este viene por default en false. Cuando este estado esta en false significa que el Grupo Usuario esta en modo edicion y cuando esta true, es que esta agregando una nuevo Grupo Usuario. Toda esta logia es para poder reutilizar el modal correspondiente.

Para editar un Grupo Usuario, se utiliza el objeto `grupoUsuarioObject` que va a recibir las variables que usamos en el modal, estas variables dependen del useState `selectedGrupoUsuario` el cual lo seteamos a traves de la tabla para pasarle la informacion del  en donde hemos clickeado con el boton.

```js
  const grupoUsuarioObject = {
    Accion: newGrupoUsuario ? `'N'` : `'E'`,
    Descripcion: `'${descripcionGrupoUsuario}'`,
    Orden: ordenEspecialidad, // Fuera de uso momentaneamente
    Activo: estatusGrupoUsuario ? 1 : 0,
  };
```

Para agregar un Grupo Usuario se le pasara el objeto vacio al useSate de `selectedGrupoUsuario`, para que cuando se abra el modal, las variables lleguen vacias y podamos agregar.

```js
  const newGrupoUsuarioObject = {
    Descripcion: "",
    Orden: ordenEspecialidad, // Fuera de uso momentaneamente
    Activo: 0,
  };
```

La logica del agregar/Editar una especialidad, seria la siguiente:

```js
  const actualizarEspecialidad = async () => {
    setLoading(true);
    if (!newGrupoUsuario) {
      grupoUsuarioObject.Id = grupoUsuario.Id;
    }
    try {
      const response = await axios.post(
        baseUrl + grupoUsuariosProc,
        grupoUsuarioObject,
        config
      );
      setLoading(false);
      alertSuccess(
        `El Grupo Usuario ${descripcionGrupoUsuario} ha sido ${
          newGrupoUsuario ? "agregada" : "actualizada"
        }.`
      );
      setNewLoad(!newLoad);
    } catch (error) {
      console.error("Error al obtener los datos", error);
      alertFailed();
    } finally {
      setLoading(false);
      setShow(false);
    }
  };
```

## Configuracion > Mantenimiento > Multimedia (Pantalla) Procedure ##

Procedure: spc_pantalla

Este procedimiento nos trae todas las pantallas disponibles y con este mismo procedimiento podemos editar el mensaje de la pantalla, pasandole el ID de la pantalla y el nuevo mensaje.

* Traer todas las pantallas disponibles

```js
  const response = await axios.get(baseUrl + pantallaProc, config);
```

* Editar una pantalla por el ID

```js
  const response = await axios.post(
    baseUrl + pantallaProc,
    {
      IdPantalla: pantalla.IdPantalla,
      mensaje: `'${mensaje}'`,
    },
    config
  );
```

## Configuracion > Acciones > Declinar Turno Procedure ##

Procedure: spHistoricoTurnoDashBoard

Este procedimiento nos muestra todos los turnos que estan activo y con este mismo procedimiento enviandole como parametro el ID del turno.

* Traer todos los turnos activos

```js
  const response = await axios.get(baseUrl + declinarTurnosProc, config);
```

* Declinar un turno por el ID

```js
  const response = await axios.post(
    baseUrl + declinarTurnosProc,
    {
      IdTurno: idTurno,
    },
    config
  );
```

## Configuracion > Consultas > Historico Turno Procedure ##

Procedure: spHistoricoTurno

Este procedicimiento trae el hitorial de todos los turno,  se puede filtrar por fecha y en caso de no enviarle parametros, te trae todos los turnos. Actualmente esta configurado para que traiga los turnos de la fecha de un mes atras.  

```js
  const response = await axios.post(
    baseUrl + historicoTurnoProc,
    {
      fechaini: `'${fechaIni}'`,
      fechafin: `'${fechaFin}'`,
    },
    config
  );
```
