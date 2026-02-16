import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { TransferirTurnos } from './Views/configuracion/acciones/TransferirTurnos'
import { PrintTurno } from './Views/PrintTurno'

function App() {
  return (
    <Routes>
      <Route path="/" element={<TransferirTurnos />} />
      <Route path="/acciones/transferirTurnos" element={<TransferirTurnos />} />
      <Route path="/printTurno/:idTurno" element={<PrintTurno />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
