import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Inicio from './pages/inicio.jsx'; 
import VistaVigilante from './pages/VistaVigilante.jsx'; // Corrige la ruta: la "i" debe ser minúscula

function App() {
    return (
        <Router>
            {/* <Navbar /> */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Registro" element={<Registro />} />
                <Route path="/Inicio" element={<Inicio />} />
                <Route path="/vigilante" element={<VistaVigilante />} />
            </Routes>
        </Router>
    );
}

export default App;