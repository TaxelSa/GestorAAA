// src/App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import Inicio from './Inicio';
import Proyecto from './Proyecto';
import Tareas from './Tareas';
import Equipos from './Equipos';
import './App.css';


function App() {
  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <h2>Menú</h2>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/proyecto">Proyecto</Link></li>
            <li><Link to="/tareas">Tareas</Link></li>
            <li><Link to="/equipos">Equipos</Link></li>
           
            {/*<li><Link to="/consulta">Consulta</Link></li>
            <li><Link to="/vacuna">Vacuna</Link></li>
           */}
          </ul>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/proyecto" element={<Proyecto />} />
            <Route path="/tareas" element={<Tareas />} />
            <Route path="/equipos" element={<Equipos />} />
       
            {/*<Route path="/consulta" element={<Consulta />} />
            */}
           
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
