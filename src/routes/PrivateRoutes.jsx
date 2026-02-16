import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../Views/Dashboard";
import { Estaciones } from "../Views/Estaciones";
import { TurnosTransferidos } from "../Views/TurnosTransferidos";
import { Reporte } from "../Views/Reporte";
import { ConfiguracionDashboard } from "../Views/Configuracion";
import { Usuarios } from "../Views/configuracion/mantenimiento/Usuarios";
import { UsuarioData } from "../Views/configuracion/mantenimiento/UsuarioData";
import { Especialidades } from "../Views/configuracion/mantenimiento/Especialidades";
import { GrupoUsuarios } from "../Views/configuracion/mantenimiento/GrupoUsuarios";
import { Multimedia } from "../Views/configuracion/mantenimiento/Multimedia";
import { Personalizar } from "../Views/configuracion/mantenimiento/Personalizar";

import { DeclinarTurnos } from "../Views/configuracion/acciones/DeclinarTurnos";
import { TransferirTurnos } from "../Views/configuracion/acciones/TransferirTurnos";

import { HistoricoTurno } from "../Views/configuracion/consultas/HistoricoTurno";
import { PrintTurno } from "../Views/PrintTurno";

/*
Added by: Luis A. Sierra
Added Date: 12/12/2024

Added Menu opcion para ir a personalizar sistema
*/

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/estaciones" element={<Estaciones />} />
      <Route path="/reporte" element={<Reporte />} />
      <Route path="/turnosTransferidos" element={<TurnosTransferidos />} />
      <Route path="/configuracion" element={<ConfiguracionDashboard />} />

      {/* Configuracion - Matenimiento */}
      <Route path="/mantenimiento/usuarios" element={<Usuarios />} />
      <Route
        path="/mantenimiento/usuarios/:username"
        element={<UsuarioData />}
      />
      <Route
        path="/mantenimiento/especialidades"
        element={<Especialidades />}
      />
      <Route path="/mantenimiento/grupoUsuario" element={<GrupoUsuarios />} />
      <Route path="/mantenimiento/multimedia" element={<Multimedia />} />

      {/* Configuracion - Acciones */}
      <Route path="/acciones/declinarTurnos" element={<DeclinarTurnos />} />
      <Route path="/acciones/transferirTurnos" element={<TransferirTurnos />} />

      {/* Configuracion - Consultas */}
      <Route path="/consultas/historicoTurno" element={<HistoricoTurno />} />

      {/* Configuracion - Personalizar Sistema */}
      <Route path="/mantenimiento/Personalizar" element={<Personalizar />} />

      {/* Página de impresión de turno */}
      <Route path="/printTurno/:idTurno" element={<PrintTurno />} />
    </Routes>
  );
};
